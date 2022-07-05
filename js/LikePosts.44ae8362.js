var k=Object.defineProperty;var c=Object.getOwnPropertySymbols;var L=Object.prototype.hasOwnProperty,y=Object.prototype.propertyIsEnumerable;var l=(s,o,t)=>o in s?k(s,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[o]=t,i=(s,o)=>{for(var t in o||(o={}))L.call(o,t)&&l(s,t,o[t]);if(c)for(var t of c(o))y.call(o,t)&&l(s,t,o[t]);return s};import{V as w}from"./LoadingOverlay.a8746287.js";import{_ as $,m as h,r as u,o as n,c as r,d as p,w as V,F as f,p as E,a as e,t as _,h as m}from"./index.dc3639a3.js";import{u as T,s as B}from"./postStore.fbf06d71.js";const A={components:{VueLoader:w},computed:i(i({},h(T,["user"])),h(B,["isLoading"])),data(){return{favLists:[]}},methods:{getFavList(){this.isLoading=!0;let s=`https://fierce-headland-11812.herokuapp.com/posts/user/${this.user._id}`;const o=document.cookie.split("AUTH_TOKEN=").pop().split(";").shift();this.axios({method:"GET",url:s,headers:{Authorization:`Bearer ${o}`}}).then(t=>{this.isLoading=!1,this.favLists=t.data.data,console.log(t.data.data)}).catch(t=>{this.isLoading=!1,console.dir(t)})},unLike(s){this.isLoading=!0;let o=`https://fierce-headland-11812.herokuapp.com/posts/${s}/like`;const t=document.cookie.split("AUTH_TOKEN=").pop().split(";").shift();this.axios({method:"DELETE",url:o,headers:{Authorization:`Bearer ${t}`}}).then(()=>{this.isLoading=!1,this.getFavList()}).catch(d=>{this.isLoading=!1,console.dir(d)})}},mounted(){this.getFavList()}},F=e("div",{class:"themeBanner mb-4"},[e("div",{class:"h-20 flex items-center justify-center bg-white border-2 border-secondary"},[e("p",{class:"font-azeret-mono text-xl font-bold text-center"},"\u6211\u6309\u8B9A\u7684\u8CBC\u6587")])],-1),N={class:"flex p-4"},S={class:"h-11 w-11 border-2 border-secondary rounded-full overflow-hidden mr-2.5"},z=["src","alt"],C={class:"grow flex justify-between"},j={class:"font-noto-sans-tc font-bold text-base mb-1"},D={class:"font-noto-sans-tc text-sm text-brown-1"},H={class:"flex items-center"},K={class:"flex items-center"},O={class:"text-center"},U=["onClick"],G=m('<div class="group"><div class="block group-hover:hidden group-focus:hidden"><span class="iconify text-xl font-extrabold text-primary" data-icon="bi:hand-thumbs-up"></span></div><div class="hidden group-hover:block group-focus:block"><span class="iconify text-xl font-extrabold text-primary" data-icon="bi:hand-thumbs-up-fill"></span></div></div>',1),P=[G],q=e("p",{class:"text-sm font-bold font-noto-sans-tc"},"\u6536\u56DE\u8B9A",-1),I=m('<div class="ml-8 mr-4 text-center"><button type="button"><div class="group"><div class="block group-hover:hidden group-focus:hidden"><span class="iconify text-xl font-extrabold text-primary" data-icon="eva:arrow-circle-right-outline"></span></div><div class="hidden group-hover:block group-focus:block"><span class="iconify text-xl font-extrabold text-primary" data-icon="eva:arrow-circle-right-fill"></span></div></div></button><p class="text-sm font-bold font-noto-sans-tc">\u67E5\u770B</p></div>',1),J=e("div",null,null,-1);function M(s,o,t,d,v,b){const x=u("VueLoader"),g=u("VLoading");return n(),r(f,null,[p(g,{active:s.isLoading,"z-index":3e3},{default:V(()=>[p(x)]),_:1},8,["active"]),F,(n(!0),r(f,null,E(v.favLists,a=>(n(),r("div",{key:a._id,class:"hover:dialogue w-full border-2 border-secondary bg-white rounded-lg mb-4"},[e("div",N,[e("div",S,[e("img",{class:"object-cover w-full h-full",src:a.author.avatar,alt:`${a.author.name}'s avatar`},null,8,z)]),e("div",C,[e("div",null,[e("p",j,_(a.author.name),1),e("p",D," \u767C\u6587\u6642\u9593\uFF1A"+_(s.$filters.transferToDate(a.createdAt)),1)]),e("div",H,[e("div",null,[e("div",K,[e("div",O,[e("button",{onClick:Q=>b.unLike(a._id),type:"button"},P,8,U),q]),I])]),J])])])]))),128))],64)}var Z=$(A,[["render",M]]);export{Z as default};
