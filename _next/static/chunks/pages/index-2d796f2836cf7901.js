(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,o,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(85)}])},85:function(e,o,n){"use strict";n.r(o);var l=n(5893),t=n(7294),s=n(2729),i=n.n(s);let a=[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]],c=()=>{let[e,o]=(0,t.useState)(a),n=JSON.parse(JSON.stringify(e)),[s,c]=(0,t.useState)(a),r=JSON.parse(JSON.stringify(s)),f=[[-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1]],d=s.some(e=>e.includes(1)),_=e.some((e,o)=>e.some((e,n)=>1===e&&1===s[o][n])),p=[[-1,0],[-1,-1],[0,-1],[1,-1],[1,0],[1,1],[0,1],[-1,1]],u=(e,o)=>{if(void 0!==f[o]&&void 0!==f[o][e]&&-1===f[o][e]){let n=0;for(let l of p){let t=e+l[0],i=o+l[1];void 0!==s[i]&&void 0!==s[i][t]&&1===s[i][t]&&(n+=1)}if(1!==s[o][e]&&(f[o][e]=n),0===n)for(let n of p){let l=e+n[0],t=o+n[1];u(l,t)}}},x=()=>{for(let e=0;e<s.length;e++)for(let o=0;o<s[e].length;o++)1===n[o][e]&&u(e,o)},g=()=>Math.floor(9*Math.random()),m=()=>{let e=g(),o=g();1===r[o][e]?m():r[o][e]=1},h=()=>{console.log("game over"),s.map((e,o)=>{e.map((e,n)=>{1===e&&(f[o][n]=11)})})},N=(e,l)=>{if(n[l][e]=1,o(n),!1===d){r[l][e]=1;for(let e=0;e<10;e++)m();r[l][e]=0,c(r),x()}console.log("x,y",e,l)};x(),console.table(s),console.table(f),console.log(d),console.log(r.flat().filter(Boolean).length);let v=0,w=(e,o)=>n=>{n.preventDefault(),_||(0===v?(f[o][e]=12,v=1,console.log("1")):1===v?(f[o][e]=13,v=2,console.log("2")):2===v&&(f[o][e]=-1,v=0,console.log("3")))};return(0,l.jsx)("div",{className:i().container,children:(0,l.jsx)("div",{className:i().map,children:f.map((e,o)=>e.map((e,n)=>(0,l.jsx)("div",{className:i().cell,onClick:_?()=>h:()=>N(n,o),onContextMenu:w(n,o),style:11===e?{boxShadow:"0 0"}:{boxShadow:-1===e?"4px 4px 3px #fff inset, -4px -4px 3px #808080 inset":"0 0"},children:d&&(0,l.jsx)("div",{className:i().sign,style:{backgroundPositionX:30*(1-e)}})},"".concat(n,"-").concat(o))))})})};o.default=c},2729:function(e){e.exports={container:"index_container__gnN1f",map:"index_map__GXdJd",cell:"index_cell__3W8ZQ",sign:"index_sign__ZkPLG"}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);