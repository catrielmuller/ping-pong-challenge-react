(this["webpackJsonpping-pong-challenge-react"]=this["webpackJsonpping-pong-challenge-react"]||[]).push([[0],[,,,,,,function(e,t,a){e.exports=a.p+"static/media/loop.1395a2aa.mp3"},function(e,t,a){e.exports=a.p+"static/media/ball-incoming.09c537af.mp3"},function(e,t,a){e.exports=a.p+"static/media/ball-outgoing.177649ca.mp3"},function(e,t,a){e.exports=a.p+"static/media/game-over.f945164c.mp3"},function(e,t,a){e.exports=a(17)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var r=a(0),c=a.n(r),n=a(4),i=a.n(n),u=(a(15),a(1)),l=a(5),o=a(2),s=a.n(o),m=(a(16),a(6)),v=a.n(m),d=a(7),b=a.n(d),f=a(8),p=a.n(f),g=a(9),E=a.n(g),O=new s.a(v.a,{volume:.2,loop:!0}),h=new s.a(b.a,{volume:.8}),j=new s.a(p.a,{volume:.8}),N=new s.a(E.a,{volume:.8}),R=!1,y=600,k=200,w=1e3,S=3e3,P=10,M="start",x=0,A=0;var T=function(){var e=Object(l.a)("maxScore",A),t=Object(u.a)(e,2),a=t[0],n=t[1],i=Object(r.useState)(0),o=Object(u.a)(i,2),s=o[0],m=o[1],v=Object(r.useState)(M),d=Object(u.a)(v,2),b=d[0],f=d[1],p=Object(r.useState)(x),g=Object(u.a)(p,2),E=g[0],T=g[1],F=Object(r.useState)(!1),C=Object(u.a)(F,2),q=C[0],B=C[1],D=Object(r.useRef)(M),G=Object(r.useRef)(!1),J=Object(r.useRef)(),W=Object(r.useRef)(),z=Object(r.useRef)(x),I=Object(r.useRef)(),L=Object(r.useRef)(),X=Object(r.useRef)(),$=Object(r.useRef)(),H=Object(r.useRef)(),K=Object(r.useRef)(),Q=function e(t){if(void 0===W.current)I.current=t;else{var r=t-W.current,c=Math.trunc(1e3/r);m(c)}if(void 0===L.current){L.current=t;var i=Math.trunc(z.current/10)/10,u=1-i,l=1+i;j.setPlaybackRate(l),h.setPlaybackRate(l),O.setPlaybackRate(l),X.current=t+(Math.floor(Math.random()*(y+k-y+1))+y)*u,$.current=X.current+w*u,j.play()}return t>=X.current&&0===K.current&&(h.play(),K.current=1),1===K.current&&(void 0!==H.current&&H.current>=X.current&&H.current<=$.current&&(z.current+=1,T(z.current),L.current=void 0,K.current=0,H.current=void 0),t>=$.current)?(N.play(),z.current>=a&&n(z.current),O.setPlaybackRate(1),D.current="over",f(D.current),void setTimeout((function(){D.current="start",f(D.current)}),S)):z.current>=100?(N.play(),O.setPlaybackRate(1),D.current="hack",f(D.current),void setTimeout((function(){D.current="start",f(D.current)}),S)):(W.current=t,void(J.current=requestAnimationFrame(e)))},U=function(){"start"===D.current?(W.current=void 0,z.current=x,T(z.current),I.current=void 0,L.current=void 0,X.current=void 0,$.current=void 0,H.current=void 0,K.current=0,O.setPlaybackRate(1),j.setPlaybackRate(1),h.setPlaybackRate(1),D.current="game",f(D.current),J.current=requestAnimationFrame(Q)):H.current=W.current},V=function(e){if(!G.current){var t=e.acceleration,a=t.x,r=t.y,c=t.z,n=0;Math.abs(a)>=P&&(n+=1),Math.abs(r)>=P&&(n+=1),Math.abs(c)>=P&&(n+=1),n>=2&&(G.current=!0,setTimeout((function(){G.current=!1}),300),U())}};Object(r.useEffect)((function(){O.play(),cancelAnimationFrame(J.current)}),[]),Object(r.useEffect)((function(){window.DeviceMotionEvent?(window.addEventListener("devicemotion",V,!0),B(!1)):B(!0)}));var Y=q?"Touch":"Swing";return c.a.createElement("div",{className:"app",onClick:function(){q&&U()}},"start"===b&&c.a.createElement("div",{className:"stage"},a>=1&&c.a.createElement("div",{className:"max-score"},"MAX SCORE: ",a),c.a.createElement("div",{className:"title"},c.a.createElement("div",{className:"big-title"},"Ping Pong"),"Challenge!"),c.a.createElement("div",{className:"blink"},"Turn up the volume and ",Y," your phone to start")),"game"===b&&c.a.createElement("div",{className:"game"},c.a.createElement("div",{className:"title"},c.a.createElement("div",{className:"big-title"},"Score"),c.a.createElement("div",{className:"big-title"},E))),"over"===b&&c.a.createElement("div",{className:"game"},c.a.createElement("div",{className:"title"},c.a.createElement("div",{className:"title"},c.a.createElement("div",{className:"big-title"},"Game Over!")),c.a.createElement("div",{className:"blink"},"Score: ",E))),"hack"===b&&c.a.createElement("div",{className:"game"},c.a.createElement("div",{className:"title"},c.a.createElement("div",{className:"title"},c.a.createElement("div",{className:"big-title"},"Are you a GOD?")))),R&&c.a.createElement("div",{className:"debug"},c.a.createElement("ul",null,c.a.createElement("li",null,"FPS: ",s),c.a.createElement("li",null,"Stage: ",b),c.a.createElement("li",null,"Score: ",E))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(c.a.createElement(T,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[10,1,2]]]);
//# sourceMappingURL=main.b0b42ae8.chunk.js.map