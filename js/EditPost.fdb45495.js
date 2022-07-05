var x=Object.defineProperty;var d=Object.getOwnPropertySymbols;var y=Object.prototype.hasOwnProperty,v=Object.prototype.propertyIsEnumerable;var c=(s,e,o)=>e in s?x(s,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):s[e]=o,p=(s,e)=>{for(var o in e||(e={}))y.call(e,o)&&c(s,o,e[o]);if(d)for(var o of d(e))v.call(e,o)&&c(s,o,e[o]);return s};import{V as w}from"./LoadingOverlay.a8746287.js";import{_ as k,m as L,r as u,o as h,c as m,d as f,w as V,a as t,k as i,v as T,l as b,g as B,t as M,F as S}from"./index.dc3639a3.js";import{s as U}from"./postStore.fbf06d71.js";const z={components:{VueLoader:w},data(){return{post:{content:"",image:"",privacy:"private"},errorMsg:""}},computed:p({},L(U,["isLoading"])),methods:{addPost(){this.isLoading=!0;let s="https://fierce-headland-11812.herokuapp.com/posts";const e=document.cookie.split("AUTH_TOKEN=").pop().split(";").shift();this.axios({method:"POST",url:s,headers:{Authorization:`Bearer ${e}`},data:this.post}).then(o=>{this.isLoading=!1,this.$router.push("/main")}).catch(o=>{this.isLoading=!1,console.dir(o)}),this.post={content:"",image:""}},uploadImg(s){this.isLoading=!0;let e="https://fierce-headland-11812.herokuapp.com/upload";const o=document.cookie.split("AUTH_TOKEN=").pop().split(";").shift();let l=new FormData;const a=s.target.files[0];l.append("file",a),this.axios({method:"POST",url:e,headers:{Authorization:`Bearer ${o}`},data:l}).then(n=>{this.isLoading=!1,this.errorMsg="",this.post.image=n.data.imgUrl}).catch(n=>{this.isLoading=!1,this.errorMsg=n.response.data.message})}}},C=t("div",{class:"themeBanner mb-4"},[t("div",{class:"h-20 flex items-center justify-center bg-white border-2 border-secondary"},[t("p",{class:"font-azeret-mono text-xl font-bold text-center"},"\u5F35\u8CBC\u52D5\u614B")])],-1),I={class:"dialogue w-full border-2 border-secondary bg-white rounded-lg mb-4"},N={class:"p-8"},P=t("p",{class:"font-noto-sans-tc text-base mb-2"},"\u8CBC\u6587\u96B1\u79C1\u72C0\u614B",-1),j=t("option",{value:"private"},"\u53EA\u9650\u672C\u4EBA",-1),A=t("option",{value:"public"},"\u516C\u958B",-1),E=[j,A],O=t("p",{class:"font-noto-sans-tc text-base mb-2"},"\u8CBC\u6587\u5167\u5BB9",-1),D=t("p",{class:"font-noto-sans-tc text-base mb-2"},"\u8CBC\u6587\u9644\u5716",-1),F={for:"uploadImg",class:"relative block mb-5"},H={for:"file",class:"relative mb-4 flex items-center justify-center text-white bg-black w-30 h-10"},K=t("button",{type:"button",class:"whitespace-nowrap py-1 px-6"}," \u4E0A\u50B3\u5716\u7247\u6A94 ",-1),q={key:0,class:"w-full h-40 border-2 border-secondary rounded-lg overflow-hidden"},G=["src"],J={class:"text-red-1 text-base font-bold"},Q={class:"mt-8 w-full flex justify-center"},R=t("p",{class:"font-azeret-mono font-bold text-base text-center"}," \u9001\u51FA\u8CBC\u6587 ",-1),W=[R];function X(s,e,o,l,a,n){const g=u("VueLoader"),_=u("VLoading");return h(),m(S,null,[f(_,{active:s.isLoading,"z-index":3e3},{default:V(()=>[f(g)]),_:1},8,["active"]),C,t("div",I,[t("div",N,[P,i(t("select",{"onUpdate:modelValue":e[0]||(e[0]=r=>a.post.privacy=r),class:"border-2 border-secondary focus:border-indigo-300 text-sm py-2 px-4 mb-4"},E,512),[[T,a.post.privacy]]),O,i(t("textarea",{class:"mb-4 placeholder:italic placeholder:text-slate-400 block bg-white w-full border-2 border-secondary py-3 px-4 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1",placeholder:"\u8F38\u5165\u60A8\u7684\u8CBC\u6587\u5167\u5BB9",name:"post",rows:"7","onUpdate:modelValue":e[1]||(e[1]=r=>a.post.content=r)},null,512),[[b,a.post.content]]),D,t("label",F,[i(t("input",{type:"text",name:"uploadImg",class:"p-2 placeholder:italic placeholder:text-slate-400 placeholder:text-sm w-full block bg-white border border-slate-300 rounded-md focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1","aria-label":"\u8ACB\u8F38\u5165\u5716\u7247\u7DB2\u5740\u6216\u4E0A\u50B3\u5716\u6A94",placeholder:"\u8ACB\u8F38\u5165\u5716\u7247\u9023\u7D50\u4F4D\u5740","onUpdate:modelValue":e[2]||(e[2]=r=>a.post.image=r)},null,512),[[b,a.post.image]])]),t("label",H,[t("input",{onChange:e[3]||(e[3]=(...r)=>n.uploadImg&&n.uploadImg(...r)),type:"file",class:"absolute top-0 left-0 cursor-pointer opacity-0 w-full h-full"},null,32),K]),a.post.image?(h(),m("div",q,[t("img",{class:"object-cover w-full h-full",src:a.post.image,alt:"post image"},null,8,G)])):B("",!0),t("p",J,M(a.errorMsg),1),t("div",Q,[t("button",{type:"button",onClick:e[4]||(e[4]=r=>n.addPost()),class:"py-4 border-2 border-secondary bg-gray-2 hover:bg-warning rounded-lg w-80"},W)])])])],64)}var te=k(z,[["render",X]]);export{te as default};