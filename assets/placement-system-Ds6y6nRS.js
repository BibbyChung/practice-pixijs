import{B as a,E as i}from"./index-YpI8y5Bw.js";class s extends a{getQuery(){return this._ge.miniplexECS.without("createComponent").with("placementComponent").onEntityAdded}execute(){this.getQuery().subscribe(e=>{var o,p;const n=e;if(e.placementComponent.parentLabel===i.none&&(this._ge.pixiApp.stage.addChild(n.pixiElem),n.pixiElem.zIndex=e.placementComponent.zIndex,this._ge.pixiApp.stage.sortChildren()),e.placementComponent.parentLabel===i.root){const m=this._ge.miniplexECS.with("containerComponent").where(t=>t.containerComponent.label===i.root).first;if(m){const t=m;(o=t.pixiElem)==null||o.addChild(n.pixiElem),n.pixiElem.zIndex=e.placementComponent.zIndex,(p=t.pixiElem)==null||p.sortChildren()}}})}}export{s as PlacementSystem};
