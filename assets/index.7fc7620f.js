var e=Object.defineProperty,a=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,l=(a,t,r)=>t in a?e(a,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):a[t]=r,n=(e,n)=>{for(var c in n||(n={}))t.call(n,c)&&l(e,c,n[c]);if(a)for(var c of a(n))r.call(n,c)&&l(e,c,n[c]);return e},c=(e,l)=>{var n={};for(var c in e)t.call(e,c)&&l.indexOf(c)<0&&(n[c]=e[c]);if(null!=e&&a)for(var c of a(e))l.indexOf(c)<0&&r.call(e,c)&&(n[c]=e[c]);return n};import{R as m,S as s,a as o,b as i,c as _,H as v,d as E}from"./vendor.9b9cf814.js";const u=()=>m.createElement("div",null,m.createElement("h1",null,"home")),f=()=>m.createElement("div",null,m.createElement("h1",null,"home")),N=()=>m.createElement(s,null,m.createElement(o,{exact:!0,path:"/market",component:f}),m.createElement(o,{exact:!0,path:"/faqs",component:u}),m.createElement(i,{to:"/market"})),d=new URL("/Mystery-Box-Interface/assets/logo.7271d3b4.png",window.location).href;var h={button:"_button_1rkve_1",small:"_small_1rkve_5",middle:"_middle_1rkve_9",large:"_large_1rkve_13"};const p=e=>{var a=e,{className:t,size:r}=a,l=c(a,["className","size"]);return m.createElement("button",n({className:_(h.button,r?h[r]:null,t)},l))};var b="_neonButton_jzzo7_1";const k=e=>{var a=e,{className:t}=a,r=c(a,["className"]);return m.createElement(p,n({className:_(b,t)},r))};var g={pageHeader:"_pageHeader_1vaw7_1",nav:"_nav_1vaw7_9",navItem:"_navItem_1vaw7_15",operations:"_operations_1vaw7_20"};const y=e=>{var a=e,{className:t}=a,r=c(a,["className"]);return m.createElement("div",n({className:_(g.pageHeader,t)},r),m.createElement("div",{className:g.brand},m.createElement("a",{className:g.logo,href:"/",title:"NFTBOX"},m.createElement("img",{src:d,height:"36",width:"36",alt:"NFTBOX"}))),m.createElement("nav",{className:g.nav},m.createElement("a",{className:g.navItem,href:"/#Market"},"Market"),m.createElement("a",{className:g.navItem,href:"/#faqs"},"FAQS")),m.createElement("div",{className:g.operations},m.createElement(k,null,"Connect Wallet")))};var w={footer:"_footer_1uuvc_1",links:"_links_1uuvc_12",link:"_link_1uuvc_12"};const O=e=>{var a=e,{className:t}=a,r=c(a,["className"]);return m.createElement("footer",n({className:_(w.footer,t)},r),m.createElement("ul",{className:w.links},m.createElement("li",{className:w.link},m.createElement("a",{href:"#"},"Twitter")),m.createElement("li",{className:w.link},m.createElement("a",{href:"#"},"Medium")),m.createElement("li",{className:w.link},m.createElement("a",{href:"#"},"Telegram")),m.createElement("li",{className:w.link},m.createElement("a",{href:"#"},"FAQS")),m.createElement("li",{className:w.link},m.createElement("a",{href:"#"},"GitHub"))),m.createElement("div",{className:w.copyright},"Copyright © 2018-2021 NFTBOX"))};var I="_container_4trre_9",B="_main_4trre_14",j="_header_4trre_17",x="_footer_4trre_18";const M=({children:e})=>m.createElement("div",{className:I},m.createElement(y,{className:j}),m.createElement("main",{className:B},e),m.createElement(O,{className:x}));function F(){return m.createElement(v,{basename:"/Mystery-Box-Interface"},m.createElement(M,null,m.createElement(N,null)))}E.render(m.createElement(m.StrictMode,null,m.createElement(F,null)),document.getElementById("root"));
