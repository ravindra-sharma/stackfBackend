(this.webpackJsonpshare9=this.webpackJsonpshare9||[]).push([[0],{103:function(e,t){},106:function(e,t,a){},112:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(45),c=a.n(l),u=(a(54),a(20)),o=a.n(u),i=a(46),s=a(6),m=(a(56),a(21)),E=a.n(m),d=a(47),f=a.n(d),h=a(114),p=a(115),b=a(48);a(106);function g(e){var t=Object(n.useState)(""),a=Object(s.a)(t,2),l=a[0],c=a[1],u=Object(n.useState)(""),o=Object(s.a)(u,2),i=o[0],m=o[1];return r.a.createElement("div",{className:"Login"},r.a.createElement("form",null,r.a.createElement(h.a,{controlId:"email",bsSize:"large"},r.a.createElement("p",null,"Email"),r.a.createElement(p.a,{autoFocus:!0,type:"email",value:l,onChange:function(e){return c(e.target.value)}})),r.a.createElement(h.a,{controlId:"password",bsSize:"large"},r.a.createElement("p",null,"Password"),r.a.createElement(p.a,{value:i,onChange:function(e){return m(e.target.value)},type:"password"})),r.a.createElement(b.a,{onClick:function(){return e.login(l,i)}},"Login")))}E.a.interceptors.request.use((function(e){var t=localStorage.getItem("token");return e.headers.authorization="Bearer ".concat(t),e}),(function(e){return Promise.reject(e)}));var v=function(){var e=Object(n.useState)(null),t=Object(s.a)(e,2),a=t[0],l=(t[1],Object(n.useState)([])),c=Object(s.a)(l,2),u=c[0],m=c[1],d=Object(n.useState)([]),h=Object(s.a)(d,2),p=h[0],b=h[1],v=localStorage.getItem("token"),O=Object(n.useState)(v),j=Object(s.a)(O,2),S=j[0],y=j[1];Object(n.useEffect)((function(){if(console.log("In use effect"),v){console.log(S,"In if condition");var e=f()("/",{query:{token:S}});e.on("share-live",(function(e){m(JSON.parse(e))})),e.on("user-share",(function(e){b(JSON.parse(e))}))}}),[S]);var k=function(){var e=Object(i.a)(o.a.mark((function e(t,a){var n,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.a.post("/users/authenticate",{username:t,password:a});case 2:n=e.sent,r=n.data,localStorage.setItem("token",r.token),y(r.token);case 6:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}();return r.a.createElement(r.a.Fragment,null,S?r.a.createElement("section",null,r.a.createElement("table",{id:"shares"},r.a.createElement("tr",null,r.a.createElement("th",null,"Company"),r.a.createElement("th",null,"Bought Value"),r.a.createElement("th",null,"Current Value"),r.a.createElement("th",null,"Profit/Loss")),p.map((function(e,t){return r.a.createElement("tr",null,r.a.createElement("td",null,e.listed_id),r.a.createElement("td",null,e.initialTotalPrice.toFixed(2)),r.a.createElement("td",null,e.currentTotalPrice.toFixed(2)),r.a.createElement("td",null,(e.initialTotalPrice.toFixed(2)-e.currentTotalPrice.toFixed(2)).toFixed(2)))}))),r.a.createElement("table",{id:"shares"},r.a.createElement("tr",null,r.a.createElement("th",null,"Company"),r.a.createElement("th",null,"Bought Value"),r.a.createElement("th",null,"Current Value"),r.a.createElement("th",null,"Profit/Loss")),u.map((function(e,t){return r.a.createElement("tr",null,r.a.createElement("td",null,e.listed_id),r.a.createElement("td",null,e.listed_name),r.a.createElement("td",null,e.baseSharePrice.toFixed(2)),r.a.createElement("td",null,r.a.createElement("div",null,r.a.createElement("input",{hint:"How many shares you want to buy.",disabled:!0}),r.a.createElement("button",{onClick:function(){alert("Functionality was not asked in assignment.")}}," Buy"))))}))),a&&r.a.createElement("p",{style:{color:"red"}},a)):r.a.createElement(g,{login:k}))};c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(v,null)),document.getElementById("root"))},49:function(e,t,a){e.exports=a(112)},54:function(e,t,a){},56:function(e,t,a){}},[[49,1,2]]]);
//# sourceMappingURL=main.67d8a820.chunk.js.map