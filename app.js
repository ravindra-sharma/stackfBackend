require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./jwt');
const http = require('http');
const socketIO = require("socket.io");
const shares = require("./shares");
const MongoClient = require('mongodb').MongoClient;
const jsonwebtoken = require('jsonwebtoken');

const url = 'mongodb://ravindra:stack123@ds113938.mlab.com:13938/stackfinance';

let client = null;

(async function(){
  client = await MongoClient.connect(url, { useNewUrlParser: true }).catch(err => { console.log(err); });
  if (!client) {
      return;
  }
  console.log("DB connected");
})();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(jwt());
app.use(express.static(__dirname + '/public/'))
app.use(express.static(__dirname + '/public/static/'))
app.use(async function(req, res,next){
  const token = req.headers.authentication;
  if(req.url === "/users/authenticate"){
    next();
    return;
  }
  console.log(req.url);
  const jwtSecret = "Ravindra's Secret. Wont tell you";
  if(token){
    let decoded;
    try{
      decoded = await jsonwebtoken.verify(token, jwtSecret);
    }catch(err){
      return res.status(401).send("auth_token_not_found");
    }
    const userId = decoded.userId;
    if(!userId){
      return res.status(401).send("auth_token_not_found");
    }
    req.userId = userId;
    next();   
  }else{
    res.status(401).send("auth_token_not_found");
  }
})

app.post('/users/authenticate', async (req,res)=>{
  try {
    const db = client.db("stackfinance");
  const {username, password} = req.body;
  var query = { username, password};
  const user = await db.collection("users").findOne(query);
  if (!user) throw 'Username or password is incorrect';
  const secret = "Ravindra's Secret. Wont tell you";
  console.log(user);
  const token = jsonwebtoken.sign({ userId: user._id }, secret, { expiresIn: '7d' });
  res.json({
    username: user.username,
    token
});
  } catch(e){
    console.log(e);
    res.status(401).send("Wrong username and password");
  }
});

const port = 4000;

const server = http.createServer(app);

const io = socketIO(server); 

io.on("connection", async (socket) => {
  console.log("New client connected");
  const token = socket.handshake.query["token"];
  console.log(token);
  const jwtSecret = "Ravindra's Secret. Wont tell you";
  let decoded;
  if(token){
    try{
      decoded = await jsonwebtoken.verify(token, jwtSecret);
    }catch(err){
      console.log(err);
      return console.log("auth_token_not_found");
    }
  }
  let interval = setInterval(async () => {
    const latestShareValues = await randomShareValue();
    const userShares = await getUserShares(latestShareValues, decoded.userId);
    socket.emit("share-live", JSON.stringify(latestShareValues));
    socket.emit("user-share", JSON.stringify(userShares));

  }, 5000);

  socket.on("disconnect", () => {
    clearInterval(interval);
    console.log("Client Disconnected");
  });

});

async function getUserShares(shareValues, userId){
  console.log(shareValues, userId);
  try {
    const db = client.db("stackfinance");
    var query = {user_id: userId};
    const userShares = await db.collection("user-shares").find(query).toArray();
    const fullUserShares = [];
    for(let userShare of userShares){
      const currentValue  =  shareValues.find(share => share.listed_id === userShare.listed_id).baseSharePrice;
      fullUserShares.push({
        ...userShare,
        currentTotalPrice: userShare.no_of_shares * currentValue,
        initialTotalPrice: userShare.no_of_shares * userShare.buy_price
      })
    }
    return fullUserShares;
  } catch (e){
    console.log(e);
  }
}

app.get('/',function(req,res){
  res.sendFile(__dirname + '/public/index.html');
});


async function randomShareValue(){
  const randomShareValueArr = [];
  const operators = ['-','+'];
  try {
    const db = client.db("stackfinance");
  var query = {};
  const companies = await db.collection("companies").find(query).toArray();;
  for(let share of companies){
    let baseValue = share.current_share_price;
    let randomVal = Math.random() / 10;
    const randomOperator = operators[Math.floor(Math.random() * operators.length)];
    let newValue = randomOperator === "-" ? baseValue - (randomVal * baseValue)  : baseValue + (randomVal * baseValue);
    var myobj = { listed_id: share.listed_id, value: newValue, time: new Date().getTime() };
    db.collection("shares").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
    });
    randomShareValueArr.push({
      ...share,
      baseSharePrice: newValue
    });
  }
  } catch(e){
    console.log(e);
    res.status(401).send("Wrong username and password");
  }
  
  return randomShareValueArr;
}

server.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}`));
