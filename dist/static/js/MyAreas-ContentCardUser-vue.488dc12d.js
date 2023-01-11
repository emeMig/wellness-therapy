(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["MyAreas-ContentCardUser-vue"],{"16b7":function(t,e,i){"use strict";i("a9e3");var n=i("2b0e");e["a"]=n["a"].extend().extend({name:"delayable",props:{openDelay:{type:[Number,String],default:0},closeDelay:{type:[Number,String],default:0}},data:function(){return{openTimeout:void 0,closeTimeout:void 0}},methods:{clearDelay:function(){clearTimeout(this.openTimeout),clearTimeout(this.closeTimeout)},runDelay:function(t,e){var i=this;this.clearDelay();var n=parseInt(this["".concat(t,"Delay")],10);this["".concat(t,"Timeout")]=setTimeout(e||function(){i.isActive={open:!0,close:!1}[t]},n)}}})},"21be":function(t,e,i){"use strict";i("99af"),i("caad"),i("2532");var n=i("2909"),a=i("2b0e"),s=i("80d2");e["a"]=a["a"].extend().extend({name:"stackable",data:function(){return{stackElement:null,stackExclude:null,stackMinZIndex:0,isActive:!1}},computed:{activeZIndex:function(){if("undefined"===typeof window)return 0;var t=this.stackElement||this.$refs.content,e=this.isActive?this.getMaxZIndex(this.stackExclude||[t])+2:Object(s["u"])(t);return null==e?e:parseInt(e)}},methods:{getMaxZIndex:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=this.$el,i=[this.stackMinZIndex,Object(s["u"])(e)],a=[].concat(Object(n["a"])(document.getElementsByClassName("v-menu__content--active")),Object(n["a"])(document.getElementsByClassName("v-dialog__content--active"))),o=0;o<a.length;o++)t.includes(a[o])||i.push(Object(s["u"])(a[o]));return Math.max.apply(Math,i)}}})},"297c":function(t,e,i){"use strict";i("a9e3");var n=i("2b0e"),a=(i("c7cd"),i("5530")),s=i("ade3"),o=(i("6ece"),i("0789")),r=i("90a2"),c=i("a9ad"),l=i("fe6c"),h=i("a452"),u=i("7560"),d=i("80d2"),f=i("58df"),p=Object(f["a"])(c["a"],Object(l["b"])(["absolute","fixed","top","bottom"]),h["a"],u["a"]),v=p.extend({name:"v-progress-linear",directives:{intersect:r["a"]},props:{active:{type:Boolean,default:!0},backgroundColor:{type:String,default:null},backgroundOpacity:{type:[Number,String],default:null},bufferValue:{type:[Number,String],default:100},color:{type:String,default:"primary"},height:{type:[Number,String],default:4},indeterminate:Boolean,query:Boolean,reverse:Boolean,rounded:Boolean,stream:Boolean,striped:Boolean,value:{type:[Number,String],default:0}},data:function(){return{internalLazyValue:this.value||0,isVisible:!0}},computed:{__cachedBackground:function(){return this.$createElement("div",this.setBackgroundColor(this.backgroundColor||this.color,{staticClass:"v-progress-linear__background",style:this.backgroundStyle}))},__cachedBar:function(){return this.$createElement(this.computedTransition,[this.__cachedBarType])},__cachedBarType:function(){return this.indeterminate?this.__cachedIndeterminate:this.__cachedDeterminate},__cachedBuffer:function(){return this.$createElement("div",{staticClass:"v-progress-linear__buffer",style:this.styles})},__cachedDeterminate:function(){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__determinate",style:{width:Object(d["h"])(this.normalizedValue,"%")}}))},__cachedIndeterminate:function(){return this.$createElement("div",{staticClass:"v-progress-linear__indeterminate",class:{"v-progress-linear__indeterminate--active":this.active}},[this.genProgressBar("long"),this.genProgressBar("short")])},__cachedStream:function(){return this.stream?this.$createElement("div",this.setTextColor(this.color,{staticClass:"v-progress-linear__stream",style:{width:Object(d["h"])(100-this.normalizedBuffer,"%")}})):null},backgroundStyle:function(){var t,e=null==this.backgroundOpacity?this.backgroundColor?1:.3:parseFloat(this.backgroundOpacity);return t={opacity:e},Object(s["a"])(t,this.isReversed?"right":"left",Object(d["h"])(this.normalizedValue,"%")),Object(s["a"])(t,"width",Object(d["h"])(Math.max(0,this.normalizedBuffer-this.normalizedValue),"%")),t},classes:function(){return Object(a["a"])({"v-progress-linear--absolute":this.absolute,"v-progress-linear--fixed":this.fixed,"v-progress-linear--query":this.query,"v-progress-linear--reactive":this.reactive,"v-progress-linear--reverse":this.isReversed,"v-progress-linear--rounded":this.rounded,"v-progress-linear--striped":this.striped,"v-progress-linear--visible":this.isVisible},this.themeClasses)},computedTransition:function(){return this.indeterminate?o["d"]:o["e"]},isReversed:function(){return this.$vuetify.rtl!==this.reverse},normalizedBuffer:function(){return this.normalize(this.bufferValue)},normalizedValue:function(){return this.normalize(this.internalLazyValue)},reactive:function(){return Boolean(this.$listeners.change)},styles:function(){var t={};return this.active||(t.height=0),this.indeterminate||100===parseFloat(this.normalizedBuffer)||(t.width=Object(d["h"])(this.normalizedBuffer,"%")),t}},methods:{genContent:function(){var t=Object(d["s"])(this,"default",{value:this.internalLazyValue});return t?this.$createElement("div",{staticClass:"v-progress-linear__content"},t):null},genListeners:function(){var t=this.$listeners;return this.reactive&&(t.click=this.onClick),t},genProgressBar:function(t){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__indeterminate",class:Object(s["a"])({},t,!0)}))},onClick:function(t){if(this.reactive){var e=this.$el.getBoundingClientRect(),i=e.width;this.internalValue=t.offsetX/i*100}},onObserve:function(t,e,i){this.isVisible=i},normalize:function(t){return t<0?0:t>100?100:parseFloat(t)}},render:function(t){var e={staticClass:"v-progress-linear",attrs:{role:"progressbar","aria-valuemin":0,"aria-valuemax":this.normalizedBuffer,"aria-valuenow":this.indeterminate?void 0:this.normalizedValue},class:this.classes,directives:[{name:"intersect",value:this.onObserve}],style:{bottom:this.bottom?0:void 0,height:this.active?Object(d["h"])(this.height):0,top:this.top?0:void 0},on:this.genListeners()};return t("div",e,[this.__cachedStream,this.__cachedBackground,this.__cachedBuffer,this.__cachedBar,this.genContent()])}}),m=v;e["a"]=n["a"].extend().extend({name:"loadable",props:{loading:{type:[Boolean,String],default:!1},loaderHeight:{type:[Number,String],default:2}},methods:{genProgress:function(){return!1===this.loading?null:this.$slots.progress||this.$createElement(m,{props:{absolute:!0,color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,height:this.loaderHeight,indeterminate:!0}})}}})},"2fa4":function(t,e,i){"use strict";i("20f6");var n=i("80d2");e["a"]=Object(n["j"])("spacer","div","v-spacer")},"36a7":function(t,e,i){},"3a2f":function(t,e,i){"use strict";i("a9e3");var n=i("ade3"),a=(i("9734"),i("4ad4")),s=i("a9ad"),o=i("16b7"),r=i("b848"),c=i("f573"),l=i("80d2"),h=i("d9bd"),u=i("58df");e["a"]=Object(u["a"])(s["a"],o["a"],r["a"],c["a"]).extend({name:"v-tooltip",props:{closeDelay:{type:[Number,String],default:0},disabled:Boolean,openDelay:{type:[Number,String],default:0},openOnHover:{type:Boolean,default:!0},openOnFocus:{type:Boolean,default:!0},tag:{type:String,default:"span"},transition:String},data:function(){return{calculatedMinWidth:0,closeDependents:!1}},computed:{calculatedLeft:function(){var t=this.dimensions,e=t.activator,i=t.content,n=!this.bottom&&!this.left&&!this.top&&!this.right,a=!1!==this.attach?e.offsetLeft:e.left,s=0;return this.top||this.bottom||n?s=a+e.width/2-i.width/2:(this.left||this.right)&&(s=a+(this.right?e.width:-i.width)+(this.right?10:-10)),this.nudgeLeft&&(s-=parseInt(this.nudgeLeft)),this.nudgeRight&&(s+=parseInt(this.nudgeRight)),"".concat(this.calcXOverflow(s,this.dimensions.content.width),"px")},calculatedTop:function(){var t=this.dimensions,e=t.activator,i=t.content,n=!1!==this.attach?e.offsetTop:e.top,a=0;return this.top||this.bottom?a=n+(this.bottom?e.height:-i.height)+(this.bottom?10:-10):(this.left||this.right)&&(a=n+e.height/2-i.height/2),this.nudgeTop&&(a-=parseInt(this.nudgeTop)),this.nudgeBottom&&(a+=parseInt(this.nudgeBottom)),!1===this.attach&&(a+=this.pageYOffset),"".concat(this.calcYOverflow(a),"px")},classes:function(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left,"v-tooltip--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},computedTransition:function(){return this.transition?this.transition:this.isActive?"scale-transition":"fade-transition"},offsetY:function(){return this.top||this.bottom},offsetX:function(){return this.left||this.right},styles:function(){return{left:this.calculatedLeft,maxWidth:Object(l["h"])(this.maxWidth),minWidth:Object(l["h"])(this.minWidth),top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount:function(){var t=this;this.$nextTick((function(){t.value&&t.callActivate()}))},mounted:function(){"v-slot"===Object(l["t"])(this,"activator",!0)&&Object(h["b"])("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate:function(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},deactivate:function(){this.runDelay("close")},genActivatorListeners:function(){var t=this,e=a["a"].options.methods.genActivatorListeners.call(this);return this.openOnFocus&&(e.focus=function(e){t.getActivator(e),t.runDelay("open")},e.blur=function(e){t.getActivator(e),t.runDelay("close")}),e.keydown=function(e){e.keyCode===l["y"].esc&&(t.getActivator(e),t.runDelay("close"))},e},genActivatorAttributes:function(){return{"aria-haspopup":!0,"aria-expanded":String(this.isActive)}},genTransition:function(){var t=this.genContent();return this.computedTransition?this.$createElement("transition",{props:{name:this.computedTransition}},[t]):t},genContent:function(){var t;return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:(t={},Object(n["a"])(t,this.contentClass,!0),Object(n["a"])(t,"menuable__content__active",this.isActive),Object(n["a"])(t,"v-tooltip__content--fixed",this.activatorFixed),t),style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.getContentSlot())}},render:function(t){var e=this;return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[this.showLazyContent((function(){return[e.genTransition()]})),this.genActivator()])}})},"4ad4":function(t,e,i){"use strict";i("caad"),i("45fc"),i("b0c0"),i("b64b");var n=i("53ca"),a=i("16b7"),s=i("f2e7"),o=i("58df"),r=i("80d2"),c=i("d9bd"),l=Object(o["a"])(a["a"],s["a"]);e["a"]=l.extend({name:"activatable",props:{activator:{default:null,validator:function(t){return["string","object"].includes(Object(n["a"])(t))}},disabled:Boolean,internalActivator:Boolean,openOnClick:{type:Boolean,default:!0},openOnHover:Boolean,openOnFocus:Boolean},data:function(){return{activatorElement:null,activatorNode:[],events:["click","mouseenter","mouseleave","focus"],listeners:{}}},watch:{activator:"resetActivator",openOnFocus:"resetActivator",openOnHover:"resetActivator"},mounted:function(){var t=Object(r["t"])(this,"activator",!0);t&&["v-slot","normal"].includes(t)&&Object(c["b"])('The activator slot must be bound, try \'<template v-slot:activator="{ on }"><v-btn v-on="on">\'',this),this.addActivatorEvents()},beforeDestroy:function(){this.removeActivatorEvents()},methods:{addActivatorEvents:function(){if(this.activator&&!this.disabled&&this.getActivator()){this.listeners=this.genActivatorListeners();for(var t=Object.keys(this.listeners),e=0,i=t;e<i.length;e++){var n=i[e];this.getActivator().addEventListener(n,this.listeners[n])}}},genActivator:function(){var t=Object(r["s"])(this,"activator",Object.assign(this.getValueProxy(),{on:this.genActivatorListeners(),attrs:this.genActivatorAttributes()}))||[];return this.activatorNode=t,t},genActivatorAttributes:function(){return{role:this.openOnClick&&!this.openOnHover?"button":void 0,"aria-haspopup":!0,"aria-expanded":String(this.isActive)}},genActivatorListeners:function(){var t=this;if(this.disabled)return{};var e={};return this.openOnHover?(e.mouseenter=function(e){t.getActivator(e),t.runDelay("open")},e.mouseleave=function(e){t.getActivator(e),t.runDelay("close")}):this.openOnClick&&(e.click=function(e){var i=t.getActivator(e);i&&i.focus(),e.stopPropagation(),t.isActive=!t.isActive}),this.openOnFocus&&(e.focus=function(e){t.getActivator(e),e.stopPropagation(),t.isActive=!t.isActive}),e},getActivator:function(t){if(this.activatorElement)return this.activatorElement;var e=null;if(this.activator){var i=this.internalActivator?this.$el:document;e="string"===typeof this.activator?i.querySelector(this.activator):this.activator.$el?this.activator.$el:this.activator}else if(1===this.activatorNode.length||this.activatorNode.length&&!t){var n=this.activatorNode[0].componentInstance;e=n&&n.$options.mixins&&n.$options.mixins.some((function(t){return t.options&&["activatable","menuable"].includes(t.options.name)}))?n.getActivator():this.activatorNode[0].elm}else t&&(e=t.currentTarget||t.target);return this.activatorElement=(null===e||void 0===e?void 0:e.nodeType)===Node.ELEMENT_NODE?e:null,this.activatorElement},getContentSlot:function(){return Object(r["s"])(this,"default",this.getValueProxy(),!0)},getValueProxy:function(){var t=this;return{get value(){return t.isActive},set value(e){t.isActive=e}}},removeActivatorEvents:function(){if(this.activator&&this.activatorElement){for(var t=Object.keys(this.listeners),e=0,i=t;e<i.length;e++){var n=i[e];this.activatorElement.removeEventListener(n,this.listeners[n])}this.listeners={}}},resetActivator:function(){this.removeActivatorEvents(),this.activatorElement=null,this.getActivator(),this.addActivatorEvents()}}})},"615b":function(t,e,i){},"6ece":function(t,e,i){},"75eb":function(t,e,i){"use strict";i("4160"),i("a630"),i("caad"),i("45fc"),i("2532"),i("3ca3"),i("159b");var n=i("ade3"),a=i("53ca"),s=i("9d65"),o=i("80d2"),r=i("58df"),c=i("d9bd");function l(t){var e=Object(a["a"])(t);return"boolean"===e||"string"===e||t.nodeType===Node.ELEMENT_NODE}function h(t){t.forEach((function(t){t.elm&&t.elm.parentNode&&t.elm.parentNode.removeChild(t.elm)}))}e["a"]=Object(r["a"])(s["a"]).extend({name:"detachable",props:{attach:{default:!1,validator:l},contentClass:{type:String,default:""}},data:function(){return{activatorNode:null,hasDetached:!1}},watch:{attach:function(){this.hasDetached=!1,this.initDetach()},hasContent:function(){this.$nextTick(this.initDetach)}},beforeMount:function(){var t=this;this.$nextTick((function(){if(t.activatorNode){var e=Array.isArray(t.activatorNode)?t.activatorNode:[t.activatorNode];e.forEach((function(e){if(e.elm&&t.$el.parentNode){var i=t.$el===t.$el.parentNode.firstChild?t.$el:t.$el.nextSibling;t.$el.parentNode.insertBefore(e.elm,i)}}))}}))},mounted:function(){this.hasContent&&this.initDetach()},deactivated:function(){this.isActive=!1},beforeDestroy:function(){this.$refs.content&&this.$refs.content.parentNode&&this.$refs.content.parentNode.removeChild(this.$refs.content)},destroyed:function(){var t=this;if(this.activatorNode){var e=Array.isArray(this.activatorNode)?this.activatorNode:[this.activatorNode];if(this.$el.isConnected){var i=new MutationObserver((function(n){n.some((function(e){return Array.from(e.removedNodes).includes(t.$el)}))&&(i.disconnect(),h(e))}));i.observe(this.$el.parentNode,{subtree:!1,childList:!0})}else h(e)}},methods:{getScopeIdAttrs:function(){var t=Object(o["p"])(this.$vnode,"context.$options._scopeId");return t&&Object(n["a"])({},t,"")},initDetach:function(){var t;this._isDestroyed||!this.$refs.content||this.hasDetached||""===this.attach||!0===this.attach||"attach"===this.attach||(t=!1===this.attach?document.querySelector("[data-app]"):"string"===typeof this.attach?document.querySelector(this.attach):this.attach,t?(t.appendChild(this.$refs.content),this.hasDetached=!0):Object(c["c"])("Unable to locate target ".concat(this.attach||"[data-app]"),this))}}})},"8a79":function(t,e,i){"use strict";var n=i("23e7"),a=i("06cf").f,s=i("50c4"),o=i("5a34"),r=i("1d80"),c=i("ab13"),l=i("c430"),h="".endsWith,u=Math.min,d=c("endsWith"),f=!l&&!d&&!!function(){var t=a(String.prototype,"endsWith");return t&&!t.writable}();n({target:"String",proto:!0,forced:!f&&!d},{endsWith:function(t){var e=String(r(this));o(t);var i=arguments.length>1?arguments[1]:void 0,n=s(e.length),a=void 0===i?n:u(s(i),n),c=String(t);return h?h.call(e,c,a):e.slice(a-c.length,a)===c}})},"8efc":function(t,e,i){},9734:function(t,e,i){},"995c":function(t,e,i){"use strict";i.r(e);var n=i("8336"),a=i("b0af"),s=i("99d9"),o=i("62ad"),r=i("132d"),c=i("adda"),l=i("0fd9"),h=i("2fa4"),u=i("3a2f"),d=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",["Texto"===t.publication.type?i(a["a"],{staticClass:"px-4 py-3 relief"},[i("div",{staticClass:"d-flex justify-space-between px-5 mb-3 publication-author"},[i("span",[t._v(" "+t._s(t.publication.authorName)+" / "+t._s(t.publication.authorId)+" "),i(u["a"],{attrs:{"content-class":"custom-tooltip",right:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,s=e.attrs;return[i(n["a"],t._g(t._b({staticClass:"pa-0",attrs:{icon:"",color:"primary",dark:""},on:{click:function(e){return t.openValoration({id:t.publication.authorId,name:t.publication.authorName})}}},"v-btn",s,!1),a),[i(r["a"],{attrs:{dense:""}},[t._v("mdi-star-circle")])],1)]}}],null,!1,4290855324)},[i("span",[t._v("Valorar Profesional")])])],1),i("span",{staticClass:"mt-1"},[t._v(t._s(t.formatDate(t.publication.date)))])]),i(s["c"],[i("div",{staticClass:"d-flex justify-space-between"},[i("span",[t._v(t._s(t.publication.header))])]),i("h2",{staticClass:"primary--text my-4"},[t._v(t._s(t.publication.title))]),i("div",{staticClass:"text--primary"},[t.expansion?i("div",[t._v(" "+t._s(t.publication.content)+" ")]):i("div",{staticClass:"text-ellipsis"},[t._v(" "+t._s(t.publication.content)+" ")])])]),i(s["a"],[i(n["a"],{attrs:{text:"",color:"teal accent-4"},on:{click:function(e){t.expansion=!t.expansion}}},[t._v(" "+t._s(t.expansion?"Reducir contenido":"Expandir contenido")+" ")]),i(h["a"])],1)],1):t._e(),"Video"===t.publication.type?i(a["a"],{staticClass:"px-4 py-3 relief",attrs:{"min-height":"300px"}},[i("div",{staticClass:"d-flex justify-space-between px-5 mb-3 publication-author"},[i("span",[t._v(t._s(t.publication.authorName)+" / "+t._s(t.publication.authorId)+" "),i(u["a"],{attrs:{"content-class":"custom-tooltip",right:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,s=e.attrs;return[i(n["a"],t._g(t._b({staticClass:"pa-0",attrs:{icon:"",color:"primary",dark:""},on:{click:function(e){return t.openValoration({id:t.publication.authorId,name:t.publication.authorName})}}},"v-btn",s,!1),a),[i(r["a"],{attrs:{dense:""}},[t._v("mdi-star-circle")])],1)]}}],null,!1,3425533852)},[i("span",[t._v("Valorar Profesional")])])],1),i("span",{staticClass:"mt-1"},[t._v(t._s(t.formatDate(t.publication.date)))])]),i(l["a"],[i(o["a"],{attrs:{cols:"8","min-height":"280px"}},[i(s["c"],[i("div",{staticClass:"d-flex justify-space-between"},[i("span",[t._v(t._s(t.publication.header))]),i("span",[t._v(t._s(t.formatDate(t.publication.date)))])]),i("h2",{staticClass:"primary--text my-4"},[t._v(t._s(t.publication.title))]),i("div",{staticClass:"text--primary"},[t.expansion?i("div",[t._v(" "+t._s(t.publication.content)+" ")]):i("div",{staticClass:"text-ellipsis"},[t._v(" "+t._s(t.publication.content)+" ")])])])],1),i(o["a"],{attrs:{cols:"4"}},[i("iframe",{staticClass:"pt-2",attrs:{width:"83%",height:"280px",src:t.publication.url,title:"publication.title",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:""}})])],1),i(s["a"],[i(n["a"],{attrs:{text:"",color:"teal accent-4"},on:{click:function(e){t.expansion=!t.expansion}}},[t._v(" "+t._s(t.expansion?"Reducir contenido":"Expandir contenido")+" ")]),i(h["a"])],1)],1):t._e(),"Imagen"===t.publication.type?i(a["a"],{staticClass:"px-4 py-3 relief"},[i("div",{staticClass:"d-flex justify-space-between px-5 mb-3 publication-author"},[i("span",[t._v(t._s(t.publication.authorName)+" / "+t._s(t.publication.authorId)+" "),i(u["a"],{attrs:{"content-class":"custom-tooltip",right:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,s=e.attrs;return[i(n["a"],t._g(t._b({staticClass:"pa-0",attrs:{icon:"",color:"primary",dark:""},on:{click:function(e){return t.openValoration({id:t.publication.authorId,name:t.publication.authorName})}}},"v-btn",s,!1),a),[i(r["a"],{attrs:{dense:""}},[t._v("mdi-star-circle")])],1)]}}],null,!1,4181703996)},[i("span",[t._v("Valorar Profesional")])])],1),i("span",{staticClass:"mt-1"},[t._v(t._s(t.formatDate(t.publication.date)))])]),i(l["a"],[i(o["a"],{attrs:{cols:"6","min-height":"200px"}},[i(s["c"],[i("div",{staticClass:"d-flex justify-space-between"},[i("span",[t._v(t._s(t.publication.header))]),i("span",[t._v(t._s(t.formatDate(t.publication.date)))])]),i("h2",{staticClass:"primary--text my-4"},[t._v(t._s(t.publication.title))]),i("div",{staticClass:"text--primary"},[t.expansion?i("div",[t._v(" "+t._s(t.publication.content)+" ")]):i("div",{staticClass:"text-ellipsis"},[t._v(" "+t._s(t.publication.content)+" ")])])])],1),i(o["a"],{attrs:{cols:"6"}},[i(c["a"],{attrs:{src:t.publication.url,alt:t.publication.title,gradient:"to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"}})],1)],1),i(s["a"],[i(n["a"],{attrs:{text:"",color:"teal accent-4"},on:{click:function(e){t.expansion=!t.expansion}}},[t._v(" "+t._s(t.expansion?"Reducir contenido":"Expandir contenido")+" ")]),i(h["a"])],1)],1):t._e()],1)},f=[],p=(i("a9e3"),i("c1df")),v=i.n(p),m={name:"ContentCardUser",props:{publication:{Type:Object},index:{Type:Number}},data:function(){return{expansion:!1}},methods:{formatDate:function(t){return v()(t).format("hh:mm DD-MM-YYYY")},openValoration:function(t){this.$emit("open-valoration",t)}}},g=m,b=i("2877"),y=Object(b["a"])(g,d,f,!1,null,null,null);e["default"]=y.exports},"99d9":function(t,e,i){"use strict";i.d(e,"a",(function(){return s})),i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return r})),i.d(e,"d",(function(){return c}));var n=i("b0af"),a=i("80d2"),s=Object(a["j"])("v-card__actions"),o=Object(a["j"])("v-card__subtitle"),r=Object(a["j"])("v-card__text"),c=Object(a["j"])("v-card__title");n["a"]},"9d65":function(t,e,i){"use strict";var n=i("d9bd"),a=i("2b0e");e["a"]=a["a"].extend().extend({name:"bootable",props:{eager:Boolean},data:function(){return{isBooted:!1}},computed:{hasContent:function(){return this.isBooted||this.eager||this.isActive}},watch:{isActive:function(){this.isBooted=!0}},created:function(){"lazy"in this.$attrs&&Object(n["e"])("lazy",this)},methods:{showLazyContent:function(t){return this.hasContent&&t?t():[this.$createElement()]}}})},adda:function(t,e,i){"use strict";i("a15b"),i("a9e3"),i("8a79"),i("2ca0");var n=i("53ca"),a=(i("8efc"),i("90a2")),s=(i("36a7"),i("24b2")),o=i("58df"),r=i("80d2"),c=Object(o["a"])(s["a"]).extend({name:"v-responsive",props:{aspectRatio:[String,Number],contentClass:String},computed:{computedAspectRatio:function(){return Number(this.aspectRatio)},aspectStyle:function(){return this.computedAspectRatio?{paddingBottom:1/this.computedAspectRatio*100+"%"}:void 0},__cachedSizer:function(){return this.aspectStyle?this.$createElement("div",{style:this.aspectStyle,staticClass:"v-responsive__sizer"}):[]}},methods:{genContent:function(){return this.$createElement("div",{staticClass:"v-responsive__content",class:this.contentClass},Object(r["s"])(this))}},render:function(t){return t("div",{staticClass:"v-responsive",style:this.measurableStyles,on:this.$listeners},[this.__cachedSizer,this.genContent()])}}),l=c,h=i("7560"),u=i("d9f7"),d=i("d9bd"),f="undefined"!==typeof window&&"IntersectionObserver"in window;e["a"]=Object(o["a"])(l,h["a"]).extend({name:"v-img",directives:{intersect:a["a"]},props:{alt:String,contain:Boolean,eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:function(){return{root:void 0,rootMargin:void 0,threshold:void 0}}},position:{type:String,default:"center center"},sizes:String,src:{type:[String,Object],default:""},srcset:String,transition:{type:[Boolean,String],default:"fade-transition"}},data:function(){return{currentSrc:"",image:null,isLoading:!0,calculatedAspectRatio:void 0,naturalWidth:void 0,hasError:!1}},computed:{computedAspectRatio:function(){return Number(this.normalisedSrc.aspect||this.calculatedAspectRatio)},normalisedSrc:function(){return this.src&&"object"===Object(n["a"])(this.src)?{src:this.src.src,srcset:this.srcset||this.src.srcset,lazySrc:this.lazySrc||this.src.lazySrc,aspect:Number(this.aspectRatio||this.src.aspect)}:{src:this.src,srcset:this.srcset,lazySrc:this.lazySrc,aspect:Number(this.aspectRatio||0)}},__cachedImage:function(){if(!(this.normalisedSrc.src||this.normalisedSrc.lazySrc||this.gradient))return[];var t=[],e=this.isLoading?this.normalisedSrc.lazySrc:this.currentSrc;this.gradient&&t.push("linear-gradient(".concat(this.gradient,")")),e&&t.push('url("'.concat(e,'")'));var i=this.$createElement("div",{staticClass:"v-image__image",class:{"v-image__image--preload":this.isLoading,"v-image__image--contain":this.contain,"v-image__image--cover":!this.contain},style:{backgroundImage:t.join(", "),backgroundPosition:this.position},key:+this.isLoading});return this.transition?this.$createElement("transition",{attrs:{name:this.transition,mode:"in-out"}},[i]):i}},watch:{src:function(){this.isLoading?this.loadImage():this.init(void 0,void 0,!0)},"$vuetify.breakpoint.width":"getSrc"},mounted:function(){this.init()},methods:{init:function(t,e,i){if(!f||i||this.eager){if(this.normalisedSrc.lazySrc){var n=new Image;n.src=this.normalisedSrc.lazySrc,this.pollForSize(n,null)}this.normalisedSrc.src&&this.loadImage()}},onLoad:function(){this.getSrc(),this.isLoading=!1,this.$emit("load",this.src),this.image&&(this.normalisedSrc.src.endsWith(".svg")||this.normalisedSrc.src.startsWith("data:image/svg+xml"))&&(this.image.naturalHeight&&this.image.naturalWidth?(this.naturalWidth=this.image.naturalWidth,this.calculatedAspectRatio=this.image.naturalWidth/this.image.naturalHeight):this.calculatedAspectRatio=1)},onError:function(){this.hasError=!0,this.$emit("error",this.src)},getSrc:function(){this.image&&(this.currentSrc=this.image.currentSrc||this.image.src)},loadImage:function(){var t=this,e=new Image;this.image=e,e.onload=function(){e.decode?e.decode().catch((function(e){Object(d["c"])("Failed to decode image, trying to render anyway\n\n"+"src: ".concat(t.normalisedSrc.src)+(e.message?"\nOriginal error: ".concat(e.message):""),t)})).then(t.onLoad):t.onLoad()},e.onerror=this.onError,this.hasError=!1,this.sizes&&(e.sizes=this.sizes),this.normalisedSrc.srcset&&(e.srcset=this.normalisedSrc.srcset),e.src=this.normalisedSrc.src,this.$emit("loadstart",this.normalisedSrc.src),this.aspectRatio||this.pollForSize(e),this.getSrc()},pollForSize:function(t){var e=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,n=function n(){var a=t.naturalHeight,s=t.naturalWidth;a||s?(e.naturalWidth=s,e.calculatedAspectRatio=s/a):t.complete||!e.isLoading||e.hasError||null==i||setTimeout(n,i)};n()},genContent:function(){var t=l.options.methods.genContent.call(this);return this.naturalWidth&&this._b(t.data,"div",{style:{width:"".concat(this.naturalWidth,"px")}}),t},__genPlaceholder:function(){var t=Object(r["s"])(this,"placeholder");if(t){var e=this.isLoading?[this.$createElement("div",{staticClass:"v-image__placeholder"},t)]:[];return this.transition?this.$createElement("transition",{props:{appear:!0,name:this.transition}},e):e[0]}}},render:function(t){var e=l.options.render.call(this,t),i=Object(u["a"])(e.data,{staticClass:"v-image",attrs:{"aria-label":this.alt,role:this.alt?"img":void 0},class:this.themeClasses,directives:f?[{name:"intersect",modifiers:{once:!0},value:{handler:this.init,options:this.options}}]:void 0});return e.children=[this.__cachedSizer,this.__cachedImage,this.__genPlaceholder(),this.genContent()],t(e.tag,i,e.children)}})},b0af:function(t,e,i){"use strict";i("0481"),i("4069"),i("a9e3");var n=i("5530"),a=(i("615b"),i("10d2")),s=i("297c"),o=i("1c87"),r=i("58df");e["a"]=Object(r["a"])(s["a"],o["a"],a["a"]).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes:function(){return Object(n["a"])({"v-card":!0},o["a"].options.computed.classes.call(this),{"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised},a["a"].options.computed.classes.call(this))},styles:function(){var t=Object(n["a"])({},a["a"].options.computed.styles.call(this));return this.img&&(t.background='url("'.concat(this.img,'") center center / cover no-repeat')),t}},methods:{genProgress:function(){var t=s["a"].options.methods.genProgress.call(this);return t?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[t]):null}},render:function(t){var e=this.generateRouteLink(),i=e.tag,n=e.data;return n.style=this.styles,this.isClickable&&(n.attrs=n.attrs||{},n.attrs.tabindex=0),t(i,this.setBackgroundColor(this.color,n),[this.genProgress(),this.$slots.default])}})},b848:function(t,e,i){"use strict";var n=i("2909"),a=i("58df");function s(t){for(var e=[],i=0;i<t.length;i++){var a=t[i];a.isActive&&a.isDependent?e.push(a):e.push.apply(e,Object(n["a"])(s(a.$children)))}return e}e["a"]=Object(a["a"])().extend({name:"dependent",data:function(){return{closeDependents:!0,isActive:!1,isDependent:!0}},watch:{isActive:function(t){if(!t)for(var e=this.getOpenDependents(),i=0;i<e.length;i++)e[i].isActive=!1}},methods:{getOpenDependents:function(){return this.closeDependents?s(this.$children):[]},getOpenDependentElements:function(){for(var t=[],e=this.getOpenDependents(),i=0;i<e.length;i++)t.push.apply(t,Object(n["a"])(e[i].getClickableDependentElements()));return t},getClickableDependentElements:function(){var t=[this.$el];return this.$refs.content&&t.push(this.$refs.content),this.overlay&&t.push(this.overlay.$el),t.push.apply(t,Object(n["a"])(this.getOpenDependentElements())),t}}})},f573:function(t,e,i){"use strict";i("a9e3"),i("d3b7");var n=i("5530"),a=i("21be"),s=i("fe6c"),o=i("4ad4"),r=i("75eb"),c=i("58df"),l=i("80d2"),h=Object(c["a"])(a["a"],Object(s["b"])(["top","right","bottom","left","absolute"]),o["a"],r["a"]);e["a"]=h.extend().extend({name:"menuable",props:{allowOverflow:Boolean,light:Boolean,dark:Boolean,maxWidth:{type:[Number,String],default:"auto"},minWidth:[Number,String],nudgeBottom:{type:[Number,String],default:0},nudgeLeft:{type:[Number,String],default:0},nudgeRight:{type:[Number,String],default:0},nudgeTop:{type:[Number,String],default:0},nudgeWidth:{type:[Number,String],default:0},offsetOverflow:Boolean,positionX:{type:Number,default:null},positionY:{type:Number,default:null},zIndex:{type:[Number,String],default:null}},data:function(){return{activatorNode:[],absoluteX:0,absoluteY:0,activatedBy:null,activatorFixed:!1,dimensions:{activator:{top:0,left:0,bottom:0,right:0,width:0,height:0,offsetTop:0,scrollHeight:0,offsetLeft:0},content:{top:0,left:0,bottom:0,right:0,width:0,height:0,offsetTop:0,scrollHeight:0}},relativeYOffset:0,hasJustFocused:!1,hasWindow:!1,inputActivator:!1,isContentActive:!1,pageWidth:0,pageYOffset:0,stackClass:"v-menu__content--active",stackMinZIndex:6}},computed:{computedLeft:function(){var t=this.dimensions.activator,e=this.dimensions.content,i=(!1!==this.attach?t.offsetLeft:t.left)||0,n=Math.max(t.width,e.width),a=0;if(a+=i,(this.left||this.$vuetify.rtl&&!this.right)&&(a-=n-t.width),this.offsetX){var s=isNaN(Number(this.maxWidth))?t.width:Math.min(t.width,Number(this.maxWidth));a+=this.left?-s:t.width}return this.nudgeLeft&&(a-=parseInt(this.nudgeLeft)),this.nudgeRight&&(a+=parseInt(this.nudgeRight)),a},computedTop:function(){var t=this.dimensions.activator,e=this.dimensions.content,i=0;return this.top&&(i+=t.height-e.height),!1!==this.attach?i+=t.offsetTop:i+=t.top+this.pageYOffset,this.offsetY&&(i+=this.top?-t.height:t.height),this.nudgeTop&&(i-=parseInt(this.nudgeTop)),this.nudgeBottom&&(i+=parseInt(this.nudgeBottom)),i},hasActivator:function(){return!!this.$slots.activator||!!this.$scopedSlots.activator||!!this.activator||!!this.inputActivator},absoluteYOffset:function(){return this.pageYOffset-this.relativeYOffset}},watch:{disabled:function(t){t&&this.callDeactivate()},isActive:function(t){this.disabled||(t?this.callActivate():this.callDeactivate())},positionX:"updateDimensions",positionY:"updateDimensions"},beforeMount:function(){this.hasWindow="undefined"!==typeof window,this.hasWindow&&window.addEventListener("resize",this.updateDimensions,!1)},beforeDestroy:function(){this.hasWindow&&window.removeEventListener("resize",this.updateDimensions,!1)},methods:{absolutePosition:function(){return{offsetTop:this.positionY||this.absoluteY,offsetLeft:this.positionX||this.absoluteX,scrollHeight:0,top:this.positionY||this.absoluteY,bottom:this.positionY||this.absoluteY,left:this.positionX||this.absoluteX,right:this.positionX||this.absoluteX,height:0,width:0}},activate:function(){},calcLeft:function(t){return Object(l["h"])(!1!==this.attach?this.computedLeft:this.calcXOverflow(this.computedLeft,t))},calcTop:function(){return Object(l["h"])(!1!==this.attach?this.computedTop:this.calcYOverflow(this.computedTop))},calcXOverflow:function(t,e){var i=t+e-this.pageWidth+12;return t=(!this.left||this.right)&&i>0?Math.max(t-i,0):Math.max(t,12),t+this.getOffsetLeft()},calcYOverflow:function(t){var e=this.getInnerHeight(),i=this.absoluteYOffset+e,n=this.dimensions.activator,a=this.dimensions.content.height,s=t+a,o=i<s;return o&&this.offsetOverflow&&n.top>a?t=this.pageYOffset+(n.top-a):o&&!this.allowOverflow?t=i-a-12:t<this.absoluteYOffset&&!this.allowOverflow&&(t=this.absoluteYOffset+12),t<12?12:t},callActivate:function(){this.hasWindow&&this.activate()},callDeactivate:function(){this.isContentActive=!1,this.deactivate()},checkForPageYOffset:function(){this.hasWindow&&(this.pageYOffset=this.activatorFixed?0:this.getOffsetTop())},checkActivatorFixed:function(){if(!1===this.attach){var t=this.getActivator();while(t){if("fixed"===window.getComputedStyle(t).position)return void(this.activatorFixed=!0);t=t.offsetParent}this.activatorFixed=!1}else this.activatorFixed=!1},deactivate:function(){},genActivatorListeners:function(){var t=this,e=o["a"].options.methods.genActivatorListeners.call(this),i=e.click;return i&&(e.click=function(e){t.openOnClick&&i&&i(e),t.absoluteX=e.clientX,t.absoluteY=e.clientY}),e},getInnerHeight:function(){return this.hasWindow?window.innerHeight||document.documentElement.clientHeight:0},getOffsetLeft:function(){return this.hasWindow?window.pageXOffset||document.documentElement.scrollLeft:0},getOffsetTop:function(){return this.hasWindow?window.pageYOffset||document.documentElement.scrollTop:0},getRoundedBoundedClientRect:function(t){var e=t.getBoundingClientRect();return{top:Math.round(e.top),left:Math.round(e.left),bottom:Math.round(e.bottom),right:Math.round(e.right),width:Math.round(e.width),height:Math.round(e.height)}},measure:function(t){if(!t||!this.hasWindow)return null;var e=this.getRoundedBoundedClientRect(t);if(!1!==this.attach){var i=window.getComputedStyle(t);e.left=parseInt(i.marginLeft),e.top=parseInt(i.marginTop)}return e},sneakPeek:function(t){var e=this;requestAnimationFrame((function(){var i=e.$refs.content;i&&"none"===i.style.display?(i.style.display="inline-block",t(),i.style.display="none"):t()}))},startTransition:function(){var t=this;return new Promise((function(e){return requestAnimationFrame((function(){t.isContentActive=t.hasJustFocused=t.isActive,e()}))}))},updateDimensions:function(){var t=this;this.hasWindow="undefined"!==typeof window,this.checkActivatorFixed(),this.checkForPageYOffset(),this.pageWidth=document.documentElement.clientWidth;var e={activator:Object(n["a"])({},this.dimensions.activator),content:Object(n["a"])({},this.dimensions.content)};if(!this.hasActivator||this.absolute)e.activator=this.absolutePosition();else{var i=this.getActivator();if(!i)return;e.activator=this.measure(i),e.activator.offsetLeft=i.offsetLeft,!1!==this.attach?e.activator.offsetTop=i.offsetTop:e.activator.offsetTop=0}this.sneakPeek((function(){if(t.$refs.content){if(t.$refs.content.offsetParent){var i=t.getRoundedBoundedClientRect(t.$refs.content.offsetParent);t.relativeYOffset=window.pageYOffset+i.top,e.activator.top-=t.relativeYOffset,e.activator.left-=window.pageXOffset+i.left}e.content=t.measure(t.$refs.content)}t.dimensions=e}))}}})}}]);
//# sourceMappingURL=MyAreas-ContentCardUser-vue.488dc12d.js.map