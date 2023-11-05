(function(_,m){typeof exports=="object"&&typeof module<"u"?module.exports=m():typeof define=="function"&&define.amd?define(m):(_=typeof globalThis<"u"?globalThis:_||self,_.peeker=m())})(this,function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _=window,m=_.ShadowRoot&&(_.ShadyCSS===void 0||_.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,W=Symbol(),at=new WeakMap;let ut=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==W)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(m&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=at.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&at.set(e,t))}return t}toString(){return this.cssText}};const q=s=>new ut(typeof s=="string"?s:s+"",void 0,W),ct=(s,...t)=>{const e=s.length===1?s[0]:t.reduce((i,n,o)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+s[o+1],s[0]);return new ut(e,s,W)},Rt=(s,t)=>{m?s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const i=document.createElement("style"),n=_.litNonce;n!==void 0&&i.setAttribute("nonce",n),i.textContent=e.cssText,s.appendChild(i)})},dt=m?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return q(e)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Z;const N=window,pt=N.trustedTypes,jt=pt?pt.emptyScript:"",vt=N.reactiveElementPolyfillSupport,J={toAttribute(s,t){switch(t){case Boolean:s=s?jt:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},ft=(s,t)=>t!==s&&(t==t||s==s),Q={attribute:!0,type:String,converter:J,reflect:!1,hasChanged:ft},X="finalized";let S=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const n=this._$Ep(i,e);n!==void 0&&(this._$Ev.set(n,i),t.push(n))}),t}static createProperty(t,e=Q){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i=typeof t=="symbol"?Symbol():"__"+t,n=this.getPropertyDescriptor(t,i,e);n!==void 0&&Object.defineProperty(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(n){const o=this[t];this[e]=n,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||Q}static finalize(){if(this.hasOwnProperty(X))return!1;this[X]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,i=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const n of i)this.createProperty(n,e[n])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const n of i)e.unshift(dt(n))}else t!==void 0&&e.push(dt(t));return e}static _$Ep(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,i;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((i=t.hostConnected)===null||i===void 0||i.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return Rt(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostConnected)===null||i===void 0?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostDisconnected)===null||i===void 0?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=Q){var n;const o=this.constructor._$Ep(t,i);if(o!==void 0&&i.reflect===!0){const r=(((n=i.converter)===null||n===void 0?void 0:n.toAttribute)!==void 0?i.converter:J).toAttribute(e,i.type);this._$El=t,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$El=null}}_$AK(t,e){var i;const n=this.constructor,o=n._$Ev.get(t);if(o!==void 0&&this._$El!==o){const r=n.getPropertyOptions(o),a=typeof r.converter=="function"?{fromAttribute:r.converter}:((i=r.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?r.converter:J;this._$El=o,this[o]=a.fromAttribute(e,r.type),this._$El=null}}requestUpdate(t,e,i){let n=!0;t!==void 0&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||ft)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,i))):n=!1),!this.isUpdatePending&&n&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((n,o)=>this[o]=n),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),(t=this._$ES)===null||t===void 0||t.forEach(n=>{var o;return(o=n.hostUpdate)===null||o===void 0?void 0:o.call(n)}),this.update(i)):this._$Ek()}catch(n){throw e=!1,this._$Ek(),n}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(i=>{var n;return(n=i.hostUpdated)===null||n===void 0?void 0:n.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,i)=>this._$EO(i,this[i],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};S[X]=!0,S.elementProperties=new Map,S.elementStyles=[],S.shadowRootOptions={mode:"open"},vt==null||vt({ReactiveElement:S}),((Z=N.reactiveElementVersions)!==null&&Z!==void 0?Z:N.reactiveElementVersions=[]).push("1.6.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Y;const R=window,E=R.trustedTypes,$t=E?E.createPolicy("lit-html",{createHTML:s=>s}):void 0,F="$lit$",y=`lit$${(Math.random()+"").slice(9)}$`,_t="?"+y,Lt=`<${_t}>`,g=document,T=()=>g.createComment(""),x=s=>s===null||typeof s!="object"&&typeof s!="function",yt=Array.isArray,Dt=s=>yt(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",G=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,mt=/-->/g,gt=/>/g,A=RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),At=/'/g,bt=/"/g,St=/^(?:script|style|textarea|title)$/i,It=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),Et=It(1),$=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),wt=new WeakMap,b=g.createTreeWalker(g,129,null,!1);function Ct(s,t){if(!Array.isArray(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return $t!==void 0?$t.createHTML(t):t}const zt=(s,t)=>{const e=s.length-1,i=[];let n,o=t===2?"<svg>":"",r=O;for(let a=0;a<e;a++){const l=s[a];let h,u,c=-1,p=0;for(;p<l.length&&(r.lastIndex=p,u=r.exec(l),u!==null);)p=r.lastIndex,r===O?u[1]==="!--"?r=mt:u[1]!==void 0?r=gt:u[2]!==void 0?(St.test(u[2])&&(n=RegExp("</"+u[2],"g")),r=A):u[3]!==void 0&&(r=A):r===A?u[0]===">"?(r=n??O,c=-1):u[1]===void 0?c=-2:(c=r.lastIndex-u[2].length,h=u[1],r=u[3]===void 0?A:u[3]==='"'?bt:At):r===bt||r===At?r=A:r===mt||r===gt?r=O:(r=A,n=void 0);const f=r===A&&s[a+1].startsWith("/>")?" ":"";o+=r===O?l+Lt:c>=0?(i.push(h),l.slice(0,c)+F+l.slice(c)+y+f):l+y+(c===-2?(i.push(void 0),a):f)}return[Ct(s,o+(s[e]||"<?>")+(t===2?"</svg>":"")),i]};class U{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let o=0,r=0;const a=t.length-1,l=this.parts,[h,u]=zt(t,e);if(this.el=U.createElement(h,i),b.currentNode=this.el.content,e===2){const c=this.el.content,p=c.firstChild;p.remove(),c.append(...p.childNodes)}for(;(n=b.nextNode())!==null&&l.length<a;){if(n.nodeType===1){if(n.hasAttributes()){const c=[];for(const p of n.getAttributeNames())if(p.endsWith(F)||p.startsWith(y)){const f=u[r++];if(c.push(p),f!==void 0){const be=n.getAttribute(f.toLowerCase()+F).split(y),V=/([.?@])?(.*)/.exec(f);l.push({type:1,index:o,name:V[2],strings:be,ctor:V[1]==="."?Kt:V[1]==="?"?Wt:V[1]==="@"?qt:j})}else l.push({type:6,index:o})}for(const p of c)n.removeAttribute(p)}if(St.test(n.tagName)){const c=n.textContent.split(y),p=c.length-1;if(p>0){n.textContent=E?E.emptyScript:"";for(let f=0;f<p;f++)n.append(c[f],T()),b.nextNode(),l.push({type:2,index:++o});n.append(c[p],T())}}}else if(n.nodeType===8)if(n.data===_t)l.push({type:2,index:o});else{let c=-1;for(;(c=n.data.indexOf(y,c+1))!==-1;)l.push({type:7,index:o}),c+=y.length-1}o++}}static createElement(t,e){const i=g.createElement("template");return i.innerHTML=t,i}}function w(s,t,e=s,i){var n,o,r,a;if(t===$)return t;let l=i!==void 0?(n=e._$Co)===null||n===void 0?void 0:n[i]:e._$Cl;const h=x(t)?void 0:t._$litDirective$;return(l==null?void 0:l.constructor)!==h&&((o=l==null?void 0:l._$AO)===null||o===void 0||o.call(l,!1),h===void 0?l=void 0:(l=new h(s),l._$AT(s,e,i)),i!==void 0?((r=(a=e)._$Co)!==null&&r!==void 0?r:a._$Co=[])[i]=l:e._$Cl=l),l!==void 0&&(t=w(s,l._$AS(s,t.values),l,i)),t}class Bt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:n}=this._$AD,o=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:g).importNode(i,!0);b.currentNode=o;let r=b.nextNode(),a=0,l=0,h=n[0];for(;h!==void 0;){if(a===h.index){let u;h.type===2?u=new M(r,r.nextSibling,this,t):h.type===1?u=new h.ctor(r,h.name,h.strings,this,t):h.type===6&&(u=new Zt(r,this,t)),this._$AV.push(u),h=n[++l]}a!==(h==null?void 0:h.index)&&(r=b.nextNode(),a++)}return b.currentNode=g,o}v(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class M{constructor(t,e,i,n){var o;this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cp=(o=n==null?void 0:n.isConnected)===null||o===void 0||o}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=w(this,t,e),x(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==$&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):Dt(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==d&&x(this._$AH)?this._$AA.nextSibling.data=t:this.$(g.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:n}=t,o=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=U.createElement(Ct(n.h,n.h[0]),this.options)),n);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===o)this._$AH.v(i);else{const r=new Bt(o,this),a=r.u(this.options);r.v(i),this.$(a),this._$AH=r}}_$AC(t){let e=wt.get(t.strings);return e===void 0&&wt.set(t.strings,e=new U(t)),e}T(t){yt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const o of t)n===e.length?e.push(i=new M(this.k(T()),this.k(T()),this,this.options)):i=e[n],i._$AI(o),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,e);t&&t!==this._$AB;){const n=t.nextSibling;t.remove(),t=n}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class j{constructor(t,e,i,n,o){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=d}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,n){const o=this.strings;let r=!1;if(o===void 0)t=w(this,t,e,0),r=!x(t)||t!==this._$AH&&t!==$,r&&(this._$AH=t);else{const a=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=w(this,a[i+l],e,l),h===$&&(h=this._$AH[l]),r||(r=!x(h)||h!==this._$AH[l]),h===d?t=d:t!==d&&(t+=(h??"")+o[l+1]),this._$AH[l]=h}r&&!n&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Kt extends j{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}}const Vt=E?E.emptyScript:"";class Wt extends j{constructor(){super(...arguments),this.type=4}j(t){t&&t!==d?this.element.setAttribute(this.name,Vt):this.element.removeAttribute(this.name)}}class qt extends j{constructor(t,e,i,n,o){super(t,e,i,n,o),this.type=5}_$AI(t,e=this){var i;if((t=(i=w(this,t,e,0))!==null&&i!==void 0?i:d)===$)return;const n=this._$AH,o=t===d&&n!==d||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,r=t!==d&&(n===d||o);o&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;typeof this._$AH=="function"?this._$AH.call((i=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&i!==void 0?i:this.element,t):this._$AH.handleEvent(t)}}class Zt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){w(this,t)}}const Pt=R.litHtmlPolyfillSupport;Pt==null||Pt(U,M),((Y=R.litHtmlVersions)!==null&&Y!==void 0?Y:R.litHtmlVersions=[]).push("2.8.0");const Jt=(s,t,e)=>{var i,n;const o=(i=e==null?void 0:e.renderBefore)!==null&&i!==void 0?i:t;let r=o._$litPart$;if(r===void 0){const a=(n=e==null?void 0:e.renderBefore)!==null&&n!==void 0?n:null;o._$litPart$=r=new M(t.insertBefore(T(),a),a,void 0,e??{})}return r._$AI(s),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var tt,et;class C extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Jt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return $}}C.finalized=!0,C._$litElement$=!0,(tt=globalThis.litElementHydrateSupport)===null||tt===void 0||tt.call(globalThis,{LitElement:C});const Tt=globalThis.litElementPolyfillSupport;Tt==null||Tt({LitElement:C}),((et=globalThis.litElementVersions)!==null&&et!==void 0?et:globalThis.litElementVersions=[]).push("3.3.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const xt=s=>t=>typeof t=="function"?((e,i)=>(customElements.define(e,i),i))(s,t):((e,i)=>{const{kind:n,elements:o}=i;return{kind:n,elements:o,finisher(r){customElements.define(e,r)}}})(s,t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qt=(s,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(e){e.createProperty(t.key,s)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(e){e.createProperty(t.key,s)}},Xt=(s,t,e)=>{t.constructor.createProperty(e,s)};function Ot(s){return(t,e)=>e!==void 0?Xt(s,t,e):Qt(s,t)}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var it;((it=window.HTMLSlotElement)===null||it===void 0?void 0:it.prototype.assignedElements)!=null;let st=0,Ut=[];function Yt(){return st+=1,()=>{if(st-=1,st===0){let s=Ut;Ut=[];for(let t of s)t()}}}let L=Symbol(),D=Symbol(),Ft=0,Gt=(s,t,e,i)=>{let n=++Ft,o={...s};o.set=(...h)=>{s[L]=t,s[D]=n,s.set(...h),delete s[L],delete s[D]},s.setKey&&(o.setKey=(...h)=>{s[L]=t,s[D]=n,s.setKey(...h),delete s[L],delete s[D]});let r,a;s.action&&([r,a]=s.action(n,t,i));let l=e(o,...i);if(l instanceof Promise){let h=Yt();return l.catch(u=>{throw r&&r(u),u}).finally(()=>{h(),a&&a()})}return a&&a(),l},nt=(s,t,e)=>(...i)=>Gt(s,t,e,i),v=[],te=(s,t)=>{let e=[],i={get(){return i.lc||i.listen(()=>{})(),i.value},l:t||0,lc:0,listen(n,o){return i.lc=e.push(n,o||i.l)/2,()=>{let r=e.indexOf(n);~r&&(e.splice(r,2),--i.lc||i.off())}},notify(n){let o=!v.length;for(let r=0;r<e.length;r+=2)v.push(e[r],e[r+1],i.value,n);if(o){for(let r=0;r<v.length;r+=4){let a;for(let l=r+1;!a&&(l+=4)<v.length;)v[l]<v[r+1]&&(a=v.push(v[r],v[r+1],v[r+2],v[r+3]));a||v[r](v[r+2],v[r+3])}v.length=0}},off(){},set(n){i.value!==n&&(i.value=n,i.notify())},subscribe(n,o){let r=i.listen(n,o);return n(i.value),r},value:s};return i};const I=((s={})=>{let t=te(s);return t.setKey=function(e,i){typeof i>"u"?e in t.value&&(t.value={...t.value},delete t.value[e],t.notify(e)):t.value[e]!==i&&(t.value={...t.value,[e]:i},t.notify(e))},t})({show:!1,position:{x:0,y:0}}),ee=nt(I,"hide",s=>{s.setKey("show",!1)}),ie=nt(I,"show",s=>{s.setKey("show",!0)}),se=nt(I,"peek",(s,t,e)=>{fetch(t).then(i=>i.json()).then(i=>{s.setKey("peekAt",i),s.setKey("position",e),ie()})}),ne=`a{text-decoration:underline}
`;var re=Object.defineProperty,oe=Object.getOwnPropertyDescriptor,Mt=(s,t,e,i)=>{for(var n=i>1?void 0:i?oe(t,e):t,o=s.length-1,r;o>=0;o--)(r=s[o])&&(n=(i?r(t,e,n):r(n))||n);return i&&n&&re(t,e,n),n};const le=s=>({x:s.clientX,y:s.clientY});let k=class extends C{constructor(){super(...arguments),this.dataURL=void 0}render(){return Et`
      <a @click=${s=>{se(this.dataURL,le(s))}}><slot><slot/></a>
      `}};k.styles=ct`
    ${q(ne)}
  `,Mt([Ot({attribute:"data-url"})],k.prototype,"dataURL",2),k=Mt([xt("vvv-peekable")],k);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const rt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ot=s=>(...t)=>({_$litDirective$:s,values:t});let lt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const he=ot(class extends lt{constructor(s){var t;if(super(s),s.type!==rt.ATTRIBUTE||s.name!=="class"||((t=s.strings)===null||t===void 0?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(s){return" "+Object.keys(s).filter(t=>s[t]).join(" ")+" "}update(s,[t]){var e,i;if(this.it===void 0){this.it=new Set,s.strings!==void 0&&(this.nt=new Set(s.strings.join(" ").split(/\s/).filter(o=>o!=="")));for(const o in t)t[o]&&!(!((e=this.nt)===null||e===void 0)&&e.has(o))&&this.it.add(o);return this.render(t)}const n=s.element.classList;this.it.forEach(o=>{o in t||(n.remove(o),this.it.delete(o))});for(const o in t){const r=!!t[o];r===this.it.has(o)||!((i=this.nt)===null||i===void 0)&&i.has(o)||(r?(n.add(o),this.it.add(o)):(n.remove(o),this.it.delete(o)))}return $}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const kt="important",ae=" !"+kt,ue=ot(class extends lt{constructor(s){var t;if(super(s),s.type!==rt.ATTRIBUTE||s.name!=="style"||((t=s.strings)===null||t===void 0?void 0:t.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(s){return Object.keys(s).reduce((t,e)=>{const i=s[e];return i==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(s,[t]){const{style:e}=s.element;if(this.ht===void 0){this.ht=new Set;for(const i in t)this.ht.add(i);return this.render(t)}this.ht.forEach(i=>{t[i]==null&&(this.ht.delete(i),i.includes("-")?e.removeProperty(i):e[i]="")});for(const i in t){const n=t[i];if(n!=null){this.ht.add(i);const o=typeof n=="string"&&n.endsWith(ae);i.includes("-")||o?e.setProperty(i,o?n.slice(0,-11):n,o?kt:""):e[i]=n}}return $}});/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ht extends lt{constructor(t){if(super(t),this.et=d,t.type!==rt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===d||t==null)return this.ft=void 0,this.et=t;if(t===$)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.et)return this.ft;this.et=t;const e=[t];return e.raw=e,this.ft={_$litType$:this.constructor.resultType,strings:e,values:[]}}}ht.directiveName="unsafeHTML",ht.resultType=1;const ce=ot(ht);var Ht={},z={};Object.defineProperty(z,"__esModule",{value:!0}),z.StoreController=void 0;class de{constructor(t,e){this.host=t,this.atom=e,t.addController(this)}hostConnected(){this.unsubscribe=this.atom.subscribe(()=>{this.host.requestUpdate()})}hostDisconnected(){var t;(t=this.unsubscribe)===null||t===void 0||t.call(this)}get value(){return this.atom.get()}}z.StoreController=de;var P={};Object.defineProperty(P,"__esModule",{value:!0}),P.MultiStoreController=void 0;class pe{constructor(t,e){this.host=t,this.atoms=e,t.addController(this)}hostConnected(){this.unsubscribes=this.atoms.map(t=>t.subscribe(()=>this.host.requestUpdate()))}hostDisconnected(){var t;(t=this.unsubscribes)===null||t===void 0||t.forEach(e=>e())}get values(){return this.atoms.map(t=>t.get())}}P.MultiStoreController=pe;var B={};Object.defineProperty(B,"__esModule",{value:!0}),B.useStores=void 0;const ve=P;function fe(...s){return t=>class extends t{constructor(...e){super(...e),new ve.MultiStoreController(this,s)}}}B.useStores=fe;var K={};Object.defineProperty(K,"__esModule",{value:!0}),K.withStores=void 0;const $e=P,_e=(s,t)=>class extends s{constructor(...i){super(...i),new $e.MultiStoreController(this,t)}};K.withStores=_e,function(s){Object.defineProperty(s,"__esModule",{value:!0}),s.withStores=s.useStores=s.MultiStoreController=s.StoreController=void 0;var t=z;Object.defineProperty(s,"StoreController",{enumerable:!0,get:function(){return t.StoreController}});var e=P;Object.defineProperty(s,"MultiStoreController",{enumerable:!0,get:function(){return e.MultiStoreController}});var i=B;Object.defineProperty(s,"useStores",{enumerable:!0,get:function(){return i.useStores}});var n=K;Object.defineProperty(s,"withStores",{enumerable:!0,get:function(){return n.withStores}})}(Ht);const ye=`.hidden{padding:0!important;height:0!important;width:0!important;scale:.2!important;border:0!important;opacity:0;overflow:hidden}.container{position:absolute;z-index:99;margin:.5rem;padding:.5rem;height:auto;width:auto;scale:1;border:solid 2px grey;border-radius:8px;display:flex;flex-direction:column;gap:.5rem;background-color:#f5f5f5;opacity:.97;transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.2s}.bar{display:flex;flex-direction:row;gap:.5rem}.bar>h2{margin:0}.bar>button{margin-left:auto;font-weight:700}
`;var me=Object.defineProperty,ge=Object.getOwnPropertyDescriptor,Nt=(s,t,e,i)=>{for(var n=i>1?void 0:i?ge(t,e):t,o=s.length-1,r;o>=0;o--)(r=s[o])&&(n=(i?r(t,e,n):r(n))||n);return i&&n&&me(t,e,n),n};let H=class extends C{constructor(){super(...arguments),this.stateController=new Ht.StoreController(this,I)}render(){var t,e,i;const s=this.stateController.value;return Et`
      <div
        class=${he({container:!0,hidden:!s.show})}
        style=${ue({top:`${s.position.y}px`,left:`${s.position.x}px`})}
      >
        <div class="bar">
          <h2>
            <a href=${(t=s.peekAt)==null?void 0:t.linkTo}>${(e=s.peekAt)==null?void 0:e.title}</a>
          </h2>
          <button
            @click=${()=>{ee()}}
          >
            X
          </button>
        </div>

        ${ce((i=s.peekAt)==null?void 0:i.rawData)}
      </div>
    `}};H.styles=ct`
    ${q(ye)}
  `,Nt([Ot()],H.prototype,"stateController",2),H=Nt([xt("vvv-peeker")],H);const Ae={Peekable:k,Peeker:H};return console.info("module 'peeker' is loaded, you can use custom elements 'vvv-peekable' and 'vvv-peeker' now!"),console.info("you can know more about peeker at https://github.com/tkngaejcpi/peeker."),Ae});
