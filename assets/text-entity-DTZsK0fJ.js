import{f as i,g as l,s as a,t as p,a as r,h as m,b as c,C as g,P as h,B as x,T as d,c as y}from"./index-CtoaWr90.js";class C extends i{getTextElem(){return this.entity.pixiElem}getElemStyleFill(){return this.getTextElem().style.fill}setElemStyleFill(e){const t=this.getTextElem();t.style.fill=e}}class E extends x{constructor(e,t){super(),this.wording=e,this.style=t}create(){const e=new d({text:this.wording,style:this.style});e.anchor.set(.5),e.position.set(this.pixiApp.app.screen.width/2,this.pixiApp.app.screen.height/2),this.pixiElem=e,e.addEventListener("pointertap",t=>{console.log(`text pointerdown => ${t.client}`)})}}const s=l(),u=()=>s.next(!0);s.pipe(a(()=>r()),p(n=>{const e=y(),t=new E("Hello, BB!",{fontSize:154,fill:m(),align:"center",fontFamily:"Jaro Regular"}),o=c({createComponent:new g(t),placementComponent:new h(t,"game",20),randomColorFillComponent:new C(t)});e.addEntityWithComponent(t,o)})).subscribe();export{u as init};
