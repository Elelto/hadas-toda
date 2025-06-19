(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();function ud(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var za={exports:{}},Sr={},Da={exports:{}},D={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ul=Symbol.for("react.element"),cd=Symbol.for("react.portal"),dd=Symbol.for("react.fragment"),fd=Symbol.for("react.strict_mode"),pd=Symbol.for("react.profiler"),hd=Symbol.for("react.provider"),md=Symbol.for("react.context"),vd=Symbol.for("react.forward_ref"),gd=Symbol.for("react.suspense"),yd=Symbol.for("react.memo"),xd=Symbol.for("react.lazy"),ms=Symbol.iterator;function wd(e){return e===null||typeof e!="object"?null:(e=ms&&e[ms]||e["@@iterator"],typeof e=="function"?e:null)}var Ia={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Oa=Object.assign,Fa={};function yn(e,t,n){this.props=e,this.context=t,this.refs=Fa,this.updater=n||Ia}yn.prototype.isReactComponent={};yn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};yn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Ma(){}Ma.prototype=yn.prototype;function ho(e,t,n){this.props=e,this.context=t,this.refs=Fa,this.updater=n||Ia}var mo=ho.prototype=new Ma;mo.constructor=ho;Oa(mo,yn.prototype);mo.isPureReactComponent=!0;var vs=Array.isArray,$a=Object.prototype.hasOwnProperty,vo={current:null},Aa={key:!0,ref:!0,__self:!0,__source:!0};function Ua(e,t,n){var l,r={},i=null,o=null;if(t!=null)for(l in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(i=""+t.key),t)$a.call(t,l)&&!Aa.hasOwnProperty(l)&&(r[l]=t[l]);var s=arguments.length-2;if(s===1)r.children=n;else if(1<s){for(var u=Array(s),c=0;c<s;c++)u[c]=arguments[c+2];r.children=u}if(e&&e.defaultProps)for(l in s=e.defaultProps,s)r[l]===void 0&&(r[l]=s[l]);return{$$typeof:ul,type:e,key:i,ref:o,props:r,_owner:vo.current}}function kd(e,t){return{$$typeof:ul,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function go(e){return typeof e=="object"&&e!==null&&e.$$typeof===ul}function Sd(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var gs=/\/+/g;function Wr(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Sd(""+e.key):t.toString(36)}function Ml(e,t,n,l,r){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case ul:case cd:o=!0}}if(o)return o=e,r=r(o),e=l===""?"."+Wr(o,0):l,vs(r)?(n="",e!=null&&(n=e.replace(gs,"$&/")+"/"),Ml(r,t,n,"",function(c){return c})):r!=null&&(go(r)&&(r=kd(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(gs,"$&/")+"/")+e)),t.push(r)),1;if(o=0,l=l===""?".":l+":",vs(e))for(var s=0;s<e.length;s++){i=e[s];var u=l+Wr(i,s);o+=Ml(i,t,n,u,r)}else if(u=wd(e),typeof u=="function")for(e=u.call(e),s=0;!(i=e.next()).done;)i=i.value,u=l+Wr(i,s++),o+=Ml(i,t,n,u,r);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function xl(e,t,n){if(e==null)return e;var l=[],r=0;return Ml(e,l,"","",function(i){return t.call(n,i,r++)}),l}function Nd(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var de={current:null},$l={transition:null},jd={ReactCurrentDispatcher:de,ReactCurrentBatchConfig:$l,ReactCurrentOwner:vo};function Ba(){throw Error("act(...) is not supported in production builds of React.")}D.Children={map:xl,forEach:function(e,t,n){xl(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return xl(e,function(){t++}),t},toArray:function(e){return xl(e,function(t){return t})||[]},only:function(e){if(!go(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};D.Component=yn;D.Fragment=dd;D.Profiler=pd;D.PureComponent=ho;D.StrictMode=fd;D.Suspense=gd;D.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=jd;D.act=Ba;D.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var l=Oa({},e.props),r=e.key,i=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,o=vo.current),t.key!==void 0&&(r=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(u in t)$a.call(t,u)&&!Aa.hasOwnProperty(u)&&(l[u]=t[u]===void 0&&s!==void 0?s[u]:t[u])}var u=arguments.length-2;if(u===1)l.children=n;else if(1<u){s=Array(u);for(var c=0;c<u;c++)s[c]=arguments[c+2];l.children=s}return{$$typeof:ul,type:e.type,key:r,ref:i,props:l,_owner:o}};D.createContext=function(e){return e={$$typeof:md,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:hd,_context:e},e.Consumer=e};D.createElement=Ua;D.createFactory=function(e){var t=Ua.bind(null,e);return t.type=e,t};D.createRef=function(){return{current:null}};D.forwardRef=function(e){return{$$typeof:vd,render:e}};D.isValidElement=go;D.lazy=function(e){return{$$typeof:xd,_payload:{_status:-1,_result:e},_init:Nd}};D.memo=function(e,t){return{$$typeof:yd,type:e,compare:t===void 0?null:t}};D.startTransition=function(e){var t=$l.transition;$l.transition={};try{e()}finally{$l.transition=t}};D.unstable_act=Ba;D.useCallback=function(e,t){return de.current.useCallback(e,t)};D.useContext=function(e){return de.current.useContext(e)};D.useDebugValue=function(){};D.useDeferredValue=function(e){return de.current.useDeferredValue(e)};D.useEffect=function(e,t){return de.current.useEffect(e,t)};D.useId=function(){return de.current.useId()};D.useImperativeHandle=function(e,t,n){return de.current.useImperativeHandle(e,t,n)};D.useInsertionEffect=function(e,t){return de.current.useInsertionEffect(e,t)};D.useLayoutEffect=function(e,t){return de.current.useLayoutEffect(e,t)};D.useMemo=function(e,t){return de.current.useMemo(e,t)};D.useReducer=function(e,t,n){return de.current.useReducer(e,t,n)};D.useRef=function(e){return de.current.useRef(e)};D.useState=function(e){return de.current.useState(e)};D.useSyncExternalStore=function(e,t,n){return de.current.useSyncExternalStore(e,t,n)};D.useTransition=function(){return de.current.useTransition()};D.version="18.3.1";Da.exports=D;var g=Da.exports;const Ed=ud(g);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Cd=g,_d=Symbol.for("react.element"),Pd=Symbol.for("react.fragment"),Rd=Object.prototype.hasOwnProperty,Ld=Cd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Td={key:!0,ref:!0,__self:!0,__source:!0};function Ha(e,t,n){var l,r={},i=null,o=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(o=t.ref);for(l in t)Rd.call(t,l)&&!Td.hasOwnProperty(l)&&(r[l]=t[l]);if(e&&e.defaultProps)for(l in t=e.defaultProps,t)r[l]===void 0&&(r[l]=t[l]);return{$$typeof:_d,type:e,key:i,ref:o,props:r,_owner:Ld.current}}Sr.Fragment=Pd;Sr.jsx=Ha;Sr.jsxs=Ha;za.exports=Sr;var a=za.exports,yi={},Va={exports:{}},Se={},Wa={exports:{}},Qa={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(P,T){var z=P.length;P.push(T);e:for(;0<z;){var q=z-1>>>1,Z=P[q];if(0<r(Z,T))P[q]=T,P[z]=Z,z=q;else break e}}function n(P){return P.length===0?null:P[0]}function l(P){if(P.length===0)return null;var T=P[0],z=P.pop();if(z!==T){P[0]=z;e:for(var q=0,Z=P.length,gl=Z>>>1;q<gl;){var Pt=2*(q+1)-1,Vr=P[Pt],Rt=Pt+1,yl=P[Rt];if(0>r(Vr,z))Rt<Z&&0>r(yl,Vr)?(P[q]=yl,P[Rt]=z,q=Rt):(P[q]=Vr,P[Pt]=z,q=Pt);else if(Rt<Z&&0>r(yl,z))P[q]=yl,P[Rt]=z,q=Rt;else break e}}return T}function r(P,T){var z=P.sortIndex-T.sortIndex;return z!==0?z:P.id-T.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var u=[],c=[],h=1,v=null,m=3,k=!1,y=!1,w=!1,j=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,d=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function p(P){for(var T=n(c);T!==null;){if(T.callback===null)l(c);else if(T.startTime<=P)l(c),T.sortIndex=T.expirationTime,t(u,T);else break;T=n(c)}}function x(P){if(w=!1,p(P),!y)if(n(u)!==null)y=!0,Br(N);else{var T=n(c);T!==null&&Hr(x,T.startTime-P)}}function N(P,T){y=!1,w&&(w=!1,f(R),R=-1),k=!0;var z=m;try{for(p(T),v=n(u);v!==null&&(!(v.expirationTime>T)||P&&!ae());){var q=v.callback;if(typeof q=="function"){v.callback=null,m=v.priorityLevel;var Z=q(v.expirationTime<=T);T=e.unstable_now(),typeof Z=="function"?v.callback=Z:v===n(u)&&l(u),p(T)}else l(u);v=n(u)}if(v!==null)var gl=!0;else{var Pt=n(c);Pt!==null&&Hr(x,Pt.startTime-T),gl=!1}return gl}finally{v=null,m=z,k=!1}}var C=!1,_=null,R=-1,I=5,L=-1;function ae(){return!(e.unstable_now()-L<I)}function Wt(){if(_!==null){var P=e.unstable_now();L=P;var T=!0;try{T=_(!0,P)}finally{T?qe():(C=!1,_=null)}}else C=!1}var qe;if(typeof d=="function")qe=function(){d(Wt)};else if(typeof MessageChannel<"u"){var hs=new MessageChannel,ad=hs.port2;hs.port1.onmessage=Wt,qe=function(){ad.postMessage(null)}}else qe=function(){j(Wt,0)};function Br(P){_=P,C||(C=!0,qe())}function Hr(P,T){R=j(function(){P(e.unstable_now())},T)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(P){P.callback=null},e.unstable_continueExecution=function(){y||k||(y=!0,Br(N))},e.unstable_forceFrameRate=function(P){0>P||125<P?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):I=0<P?Math.floor(1e3/P):5},e.unstable_getCurrentPriorityLevel=function(){return m},e.unstable_getFirstCallbackNode=function(){return n(u)},e.unstable_next=function(P){switch(m){case 1:case 2:case 3:var T=3;break;default:T=m}var z=m;m=T;try{return P()}finally{m=z}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(P,T){switch(P){case 1:case 2:case 3:case 4:case 5:break;default:P=3}var z=m;m=P;try{return T()}finally{m=z}},e.unstable_scheduleCallback=function(P,T,z){var q=e.unstable_now();switch(typeof z=="object"&&z!==null?(z=z.delay,z=typeof z=="number"&&0<z?q+z:q):z=q,P){case 1:var Z=-1;break;case 2:Z=250;break;case 5:Z=1073741823;break;case 4:Z=1e4;break;default:Z=5e3}return Z=z+Z,P={id:h++,callback:T,priorityLevel:P,startTime:z,expirationTime:Z,sortIndex:-1},z>q?(P.sortIndex=z,t(c,P),n(u)===null&&P===n(c)&&(w?(f(R),R=-1):w=!0,Hr(x,z-q))):(P.sortIndex=Z,t(u,P),y||k||(y=!0,Br(N))),P},e.unstable_shouldYield=ae,e.unstable_wrapCallback=function(P){var T=m;return function(){var z=m;m=T;try{return P.apply(this,arguments)}finally{m=z}}}})(Qa);Wa.exports=Qa;var zd=Wa.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Dd=g,ke=zd;function S(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var qa=new Set,Qn={};function Ht(e,t){dn(e,t),dn(e+"Capture",t)}function dn(e,t){for(Qn[e]=t,e=0;e<t.length;e++)qa.add(t[e])}var et=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),xi=Object.prototype.hasOwnProperty,Id=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ys={},xs={};function Od(e){return xi.call(xs,e)?!0:xi.call(ys,e)?!1:Id.test(e)?xs[e]=!0:(ys[e]=!0,!1)}function Fd(e,t,n,l){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return l?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Md(e,t,n,l){if(t===null||typeof t>"u"||Fd(e,t,n,l))return!0;if(l)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function fe(e,t,n,l,r,i,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=l,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=o}var le={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){le[e]=new fe(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];le[t]=new fe(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){le[e]=new fe(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){le[e]=new fe(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){le[e]=new fe(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){le[e]=new fe(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){le[e]=new fe(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){le[e]=new fe(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){le[e]=new fe(e,5,!1,e.toLowerCase(),null,!1,!1)});var yo=/[\-:]([a-z])/g;function xo(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(yo,xo);le[t]=new fe(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(yo,xo);le[t]=new fe(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(yo,xo);le[t]=new fe(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){le[e]=new fe(e,1,!1,e.toLowerCase(),null,!1,!1)});le.xlinkHref=new fe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){le[e]=new fe(e,1,!1,e.toLowerCase(),null,!0,!0)});function wo(e,t,n,l){var r=le.hasOwnProperty(t)?le[t]:null;(r!==null?r.type!==0:l||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Md(t,n,r,l)&&(n=null),l||r===null?Od(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):r.mustUseProperty?e[r.propertyName]=n===null?r.type===3?!1:"":n:(t=r.attributeName,l=r.attributeNamespace,n===null?e.removeAttribute(t):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,l?e.setAttributeNS(l,t,n):e.setAttribute(t,n))))}var it=Dd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,wl=Symbol.for("react.element"),qt=Symbol.for("react.portal"),Kt=Symbol.for("react.fragment"),ko=Symbol.for("react.strict_mode"),wi=Symbol.for("react.profiler"),Ka=Symbol.for("react.provider"),Ya=Symbol.for("react.context"),So=Symbol.for("react.forward_ref"),ki=Symbol.for("react.suspense"),Si=Symbol.for("react.suspense_list"),No=Symbol.for("react.memo"),at=Symbol.for("react.lazy"),Xa=Symbol.for("react.offscreen"),ws=Symbol.iterator;function Nn(e){return e===null||typeof e!="object"?null:(e=ws&&e[ws]||e["@@iterator"],typeof e=="function"?e:null)}var W=Object.assign,Qr;function zn(e){if(Qr===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Qr=t&&t[1]||""}return`
`+Qr+e}var qr=!1;function Kr(e,t){if(!e||qr)return"";qr=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var l=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){l=c}e.call(t.prototype)}else{try{throw Error()}catch(c){l=c}e()}}catch(c){if(c&&l&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),i=l.stack.split(`
`),o=r.length-1,s=i.length-1;1<=o&&0<=s&&r[o]!==i[s];)s--;for(;1<=o&&0<=s;o--,s--)if(r[o]!==i[s]){if(o!==1||s!==1)do if(o--,s--,0>s||r[o]!==i[s]){var u=`
`+r[o].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=o&&0<=s);break}}}finally{qr=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?zn(e):""}function $d(e){switch(e.tag){case 5:return zn(e.type);case 16:return zn("Lazy");case 13:return zn("Suspense");case 19:return zn("SuspenseList");case 0:case 2:case 15:return e=Kr(e.type,!1),e;case 11:return e=Kr(e.type.render,!1),e;case 1:return e=Kr(e.type,!0),e;default:return""}}function Ni(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Kt:return"Fragment";case qt:return"Portal";case wi:return"Profiler";case ko:return"StrictMode";case ki:return"Suspense";case Si:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Ya:return(e.displayName||"Context")+".Consumer";case Ka:return(e._context.displayName||"Context")+".Provider";case So:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case No:return t=e.displayName||null,t!==null?t:Ni(e.type)||"Memo";case at:t=e._payload,e=e._init;try{return Ni(e(t))}catch{}}return null}function Ad(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ni(t);case 8:return t===ko?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function St(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Ga(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Ud(e){var t=Ga(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),l=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return r.call(this)},set:function(o){l=""+o,i.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return l},setValue:function(o){l=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function kl(e){e._valueTracker||(e._valueTracker=Ud(e))}function Ja(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),l="";return e&&(l=Ga(e)?e.checked?"true":"false":e.value),e=l,e!==n?(t.setValue(e),!0):!1}function Jl(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function ji(e,t){var n=t.checked;return W({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function ks(e,t){var n=t.defaultValue==null?"":t.defaultValue,l=t.checked!=null?t.checked:t.defaultChecked;n=St(t.value!=null?t.value:n),e._wrapperState={initialChecked:l,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Za(e,t){t=t.checked,t!=null&&wo(e,"checked",t,!1)}function Ei(e,t){Za(e,t);var n=St(t.value),l=t.type;if(n!=null)l==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(l==="submit"||l==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Ci(e,t.type,n):t.hasOwnProperty("defaultValue")&&Ci(e,t.type,St(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Ss(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var l=t.type;if(!(l!=="submit"&&l!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Ci(e,t,n){(t!=="number"||Jl(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Dn=Array.isArray;function rn(e,t,n,l){if(e=e.options,t){t={};for(var r=0;r<n.length;r++)t["$"+n[r]]=!0;for(n=0;n<e.length;n++)r=t.hasOwnProperty("$"+e[n].value),e[n].selected!==r&&(e[n].selected=r),r&&l&&(e[n].defaultSelected=!0)}else{for(n=""+St(n),t=null,r=0;r<e.length;r++){if(e[r].value===n){e[r].selected=!0,l&&(e[r].defaultSelected=!0);return}t!==null||e[r].disabled||(t=e[r])}t!==null&&(t.selected=!0)}}function _i(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(S(91));return W({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Ns(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(S(92));if(Dn(n)){if(1<n.length)throw Error(S(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:St(n)}}function ba(e,t){var n=St(t.value),l=St(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),l!=null&&(e.defaultValue=""+l)}function js(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function eu(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Pi(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?eu(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Sl,tu=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,l,r){MSApp.execUnsafeLocalFunction(function(){return e(t,n,l,r)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Sl=Sl||document.createElement("div"),Sl.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Sl.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function qn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Fn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Bd=["Webkit","ms","Moz","O"];Object.keys(Fn).forEach(function(e){Bd.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Fn[t]=Fn[e]})});function nu(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Fn.hasOwnProperty(e)&&Fn[e]?(""+t).trim():t+"px"}function lu(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var l=n.indexOf("--")===0,r=nu(n,t[n],l);n==="float"&&(n="cssFloat"),l?e.setProperty(n,r):e[n]=r}}var Hd=W({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ri(e,t){if(t){if(Hd[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(S(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(S(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(S(61))}if(t.style!=null&&typeof t.style!="object")throw Error(S(62))}}function Li(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ti=null;function jo(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var zi=null,on=null,sn=null;function Es(e){if(e=fl(e)){if(typeof zi!="function")throw Error(S(280));var t=e.stateNode;t&&(t=_r(t),zi(e.stateNode,e.type,t))}}function ru(e){on?sn?sn.push(e):sn=[e]:on=e}function iu(){if(on){var e=on,t=sn;if(sn=on=null,Es(e),t)for(e=0;e<t.length;e++)Es(t[e])}}function ou(e,t){return e(t)}function su(){}var Yr=!1;function au(e,t,n){if(Yr)return e(t,n);Yr=!0;try{return ou(e,t,n)}finally{Yr=!1,(on!==null||sn!==null)&&(su(),iu())}}function Kn(e,t){var n=e.stateNode;if(n===null)return null;var l=_r(n);if(l===null)return null;n=l[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(e=e.type,l=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!l;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(S(231,t,typeof n));return n}var Di=!1;if(et)try{var jn={};Object.defineProperty(jn,"passive",{get:function(){Di=!0}}),window.addEventListener("test",jn,jn),window.removeEventListener("test",jn,jn)}catch{Di=!1}function Vd(e,t,n,l,r,i,o,s,u){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(h){this.onError(h)}}var Mn=!1,Zl=null,bl=!1,Ii=null,Wd={onError:function(e){Mn=!0,Zl=e}};function Qd(e,t,n,l,r,i,o,s,u){Mn=!1,Zl=null,Vd.apply(Wd,arguments)}function qd(e,t,n,l,r,i,o,s,u){if(Qd.apply(this,arguments),Mn){if(Mn){var c=Zl;Mn=!1,Zl=null}else throw Error(S(198));bl||(bl=!0,Ii=c)}}function Vt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function uu(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Cs(e){if(Vt(e)!==e)throw Error(S(188))}function Kd(e){var t=e.alternate;if(!t){if(t=Vt(e),t===null)throw Error(S(188));return t!==e?null:e}for(var n=e,l=t;;){var r=n.return;if(r===null)break;var i=r.alternate;if(i===null){if(l=r.return,l!==null){n=l;continue}break}if(r.child===i.child){for(i=r.child;i;){if(i===n)return Cs(r),e;if(i===l)return Cs(r),t;i=i.sibling}throw Error(S(188))}if(n.return!==l.return)n=r,l=i;else{for(var o=!1,s=r.child;s;){if(s===n){o=!0,n=r,l=i;break}if(s===l){o=!0,l=r,n=i;break}s=s.sibling}if(!o){for(s=i.child;s;){if(s===n){o=!0,n=i,l=r;break}if(s===l){o=!0,l=i,n=r;break}s=s.sibling}if(!o)throw Error(S(189))}}if(n.alternate!==l)throw Error(S(190))}if(n.tag!==3)throw Error(S(188));return n.stateNode.current===n?e:t}function cu(e){return e=Kd(e),e!==null?du(e):null}function du(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=du(e);if(t!==null)return t;e=e.sibling}return null}var fu=ke.unstable_scheduleCallback,_s=ke.unstable_cancelCallback,Yd=ke.unstable_shouldYield,Xd=ke.unstable_requestPaint,K=ke.unstable_now,Gd=ke.unstable_getCurrentPriorityLevel,Eo=ke.unstable_ImmediatePriority,pu=ke.unstable_UserBlockingPriority,er=ke.unstable_NormalPriority,Jd=ke.unstable_LowPriority,hu=ke.unstable_IdlePriority,Nr=null,Be=null;function Zd(e){if(Be&&typeof Be.onCommitFiberRoot=="function")try{Be.onCommitFiberRoot(Nr,e,void 0,(e.current.flags&128)===128)}catch{}}var Oe=Math.clz32?Math.clz32:tf,bd=Math.log,ef=Math.LN2;function tf(e){return e>>>=0,e===0?32:31-(bd(e)/ef|0)|0}var Nl=64,jl=4194304;function In(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function tr(e,t){var n=e.pendingLanes;if(n===0)return 0;var l=0,r=e.suspendedLanes,i=e.pingedLanes,o=n&268435455;if(o!==0){var s=o&~r;s!==0?l=In(s):(i&=o,i!==0&&(l=In(i)))}else o=n&~r,o!==0?l=In(o):i!==0&&(l=In(i));if(l===0)return 0;if(t!==0&&t!==l&&!(t&r)&&(r=l&-l,i=t&-t,r>=i||r===16&&(i&4194240)!==0))return t;if(l&4&&(l|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=l;0<t;)n=31-Oe(t),r=1<<n,l|=e[n],t&=~r;return l}function nf(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function lf(e,t){for(var n=e.suspendedLanes,l=e.pingedLanes,r=e.expirationTimes,i=e.pendingLanes;0<i;){var o=31-Oe(i),s=1<<o,u=r[o];u===-1?(!(s&n)||s&l)&&(r[o]=nf(s,t)):u<=t&&(e.expiredLanes|=s),i&=~s}}function Oi(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function mu(){var e=Nl;return Nl<<=1,!(Nl&4194240)&&(Nl=64),e}function Xr(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function cl(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Oe(t),e[t]=n}function rf(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var l=e.eventTimes;for(e=e.expirationTimes;0<n;){var r=31-Oe(n),i=1<<r;t[r]=0,l[r]=-1,e[r]=-1,n&=~i}}function Co(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var l=31-Oe(n),r=1<<l;r&t|e[l]&t&&(e[l]|=t),n&=~r}}var F=0;function vu(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var gu,_o,yu,xu,wu,Fi=!1,El=[],ht=null,mt=null,vt=null,Yn=new Map,Xn=new Map,ct=[],of="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Ps(e,t){switch(e){case"focusin":case"focusout":ht=null;break;case"dragenter":case"dragleave":mt=null;break;case"mouseover":case"mouseout":vt=null;break;case"pointerover":case"pointerout":Yn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Xn.delete(t.pointerId)}}function En(e,t,n,l,r,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:l,nativeEvent:i,targetContainers:[r]},t!==null&&(t=fl(t),t!==null&&_o(t)),e):(e.eventSystemFlags|=l,t=e.targetContainers,r!==null&&t.indexOf(r)===-1&&t.push(r),e)}function sf(e,t,n,l,r){switch(t){case"focusin":return ht=En(ht,e,t,n,l,r),!0;case"dragenter":return mt=En(mt,e,t,n,l,r),!0;case"mouseover":return vt=En(vt,e,t,n,l,r),!0;case"pointerover":var i=r.pointerId;return Yn.set(i,En(Yn.get(i)||null,e,t,n,l,r)),!0;case"gotpointercapture":return i=r.pointerId,Xn.set(i,En(Xn.get(i)||null,e,t,n,l,r)),!0}return!1}function ku(e){var t=zt(e.target);if(t!==null){var n=Vt(t);if(n!==null){if(t=n.tag,t===13){if(t=uu(n),t!==null){e.blockedOn=t,wu(e.priority,function(){yu(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Al(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Mi(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var l=new n.constructor(n.type,n);Ti=l,n.target.dispatchEvent(l),Ti=null}else return t=fl(n),t!==null&&_o(t),e.blockedOn=n,!1;t.shift()}return!0}function Rs(e,t,n){Al(e)&&n.delete(t)}function af(){Fi=!1,ht!==null&&Al(ht)&&(ht=null),mt!==null&&Al(mt)&&(mt=null),vt!==null&&Al(vt)&&(vt=null),Yn.forEach(Rs),Xn.forEach(Rs)}function Cn(e,t){e.blockedOn===t&&(e.blockedOn=null,Fi||(Fi=!0,ke.unstable_scheduleCallback(ke.unstable_NormalPriority,af)))}function Gn(e){function t(r){return Cn(r,e)}if(0<El.length){Cn(El[0],e);for(var n=1;n<El.length;n++){var l=El[n];l.blockedOn===e&&(l.blockedOn=null)}}for(ht!==null&&Cn(ht,e),mt!==null&&Cn(mt,e),vt!==null&&Cn(vt,e),Yn.forEach(t),Xn.forEach(t),n=0;n<ct.length;n++)l=ct[n],l.blockedOn===e&&(l.blockedOn=null);for(;0<ct.length&&(n=ct[0],n.blockedOn===null);)ku(n),n.blockedOn===null&&ct.shift()}var an=it.ReactCurrentBatchConfig,nr=!0;function uf(e,t,n,l){var r=F,i=an.transition;an.transition=null;try{F=1,Po(e,t,n,l)}finally{F=r,an.transition=i}}function cf(e,t,n,l){var r=F,i=an.transition;an.transition=null;try{F=4,Po(e,t,n,l)}finally{F=r,an.transition=i}}function Po(e,t,n,l){if(nr){var r=Mi(e,t,n,l);if(r===null)ii(e,t,l,lr,n),Ps(e,l);else if(sf(r,e,t,n,l))l.stopPropagation();else if(Ps(e,l),t&4&&-1<of.indexOf(e)){for(;r!==null;){var i=fl(r);if(i!==null&&gu(i),i=Mi(e,t,n,l),i===null&&ii(e,t,l,lr,n),i===r)break;r=i}r!==null&&l.stopPropagation()}else ii(e,t,l,null,n)}}var lr=null;function Mi(e,t,n,l){if(lr=null,e=jo(l),e=zt(e),e!==null)if(t=Vt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=uu(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return lr=e,null}function Su(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Gd()){case Eo:return 1;case pu:return 4;case er:case Jd:return 16;case hu:return 536870912;default:return 16}default:return 16}}var ft=null,Ro=null,Ul=null;function Nu(){if(Ul)return Ul;var e,t=Ro,n=t.length,l,r="value"in ft?ft.value:ft.textContent,i=r.length;for(e=0;e<n&&t[e]===r[e];e++);var o=n-e;for(l=1;l<=o&&t[n-l]===r[i-l];l++);return Ul=r.slice(e,1<l?1-l:void 0)}function Bl(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Cl(){return!0}function Ls(){return!1}function Ne(e){function t(n,l,r,i,o){this._reactName=n,this._targetInst=r,this.type=l,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(n=e[s],this[s]=n?n(i):i[s]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Cl:Ls,this.isPropagationStopped=Ls,this}return W(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Cl)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Cl)},persist:function(){},isPersistent:Cl}),t}var xn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Lo=Ne(xn),dl=W({},xn,{view:0,detail:0}),df=Ne(dl),Gr,Jr,_n,jr=W({},dl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:To,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==_n&&(_n&&e.type==="mousemove"?(Gr=e.screenX-_n.screenX,Jr=e.screenY-_n.screenY):Jr=Gr=0,_n=e),Gr)},movementY:function(e){return"movementY"in e?e.movementY:Jr}}),Ts=Ne(jr),ff=W({},jr,{dataTransfer:0}),pf=Ne(ff),hf=W({},dl,{relatedTarget:0}),Zr=Ne(hf),mf=W({},xn,{animationName:0,elapsedTime:0,pseudoElement:0}),vf=Ne(mf),gf=W({},xn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),yf=Ne(gf),xf=W({},xn,{data:0}),zs=Ne(xf),wf={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},kf={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Sf={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Nf(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Sf[e])?!!t[e]:!1}function To(){return Nf}var jf=W({},dl,{key:function(e){if(e.key){var t=wf[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Bl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?kf[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:To,charCode:function(e){return e.type==="keypress"?Bl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Bl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Ef=Ne(jf),Cf=W({},jr,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ds=Ne(Cf),_f=W({},dl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:To}),Pf=Ne(_f),Rf=W({},xn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Lf=Ne(Rf),Tf=W({},jr,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),zf=Ne(Tf),Df=[9,13,27,32],zo=et&&"CompositionEvent"in window,$n=null;et&&"documentMode"in document&&($n=document.documentMode);var If=et&&"TextEvent"in window&&!$n,ju=et&&(!zo||$n&&8<$n&&11>=$n),Is=" ",Os=!1;function Eu(e,t){switch(e){case"keyup":return Df.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Cu(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Yt=!1;function Of(e,t){switch(e){case"compositionend":return Cu(t);case"keypress":return t.which!==32?null:(Os=!0,Is);case"textInput":return e=t.data,e===Is&&Os?null:e;default:return null}}function Ff(e,t){if(Yt)return e==="compositionend"||!zo&&Eu(e,t)?(e=Nu(),Ul=Ro=ft=null,Yt=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return ju&&t.locale!=="ko"?null:t.data;default:return null}}var Mf={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Fs(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Mf[e.type]:t==="textarea"}function _u(e,t,n,l){ru(l),t=rr(t,"onChange"),0<t.length&&(n=new Lo("onChange","change",null,n,l),e.push({event:n,listeners:t}))}var An=null,Jn=null;function $f(e){$u(e,0)}function Er(e){var t=Jt(e);if(Ja(t))return e}function Af(e,t){if(e==="change")return t}var Pu=!1;if(et){var br;if(et){var ei="oninput"in document;if(!ei){var Ms=document.createElement("div");Ms.setAttribute("oninput","return;"),ei=typeof Ms.oninput=="function"}br=ei}else br=!1;Pu=br&&(!document.documentMode||9<document.documentMode)}function $s(){An&&(An.detachEvent("onpropertychange",Ru),Jn=An=null)}function Ru(e){if(e.propertyName==="value"&&Er(Jn)){var t=[];_u(t,Jn,e,jo(e)),au($f,t)}}function Uf(e,t,n){e==="focusin"?($s(),An=t,Jn=n,An.attachEvent("onpropertychange",Ru)):e==="focusout"&&$s()}function Bf(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Er(Jn)}function Hf(e,t){if(e==="click")return Er(t)}function Vf(e,t){if(e==="input"||e==="change")return Er(t)}function Wf(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Me=typeof Object.is=="function"?Object.is:Wf;function Zn(e,t){if(Me(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),l=Object.keys(t);if(n.length!==l.length)return!1;for(l=0;l<n.length;l++){var r=n[l];if(!xi.call(t,r)||!Me(e[r],t[r]))return!1}return!0}function As(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Us(e,t){var n=As(e);e=0;for(var l;n;){if(n.nodeType===3){if(l=e+n.textContent.length,e<=t&&l>=t)return{node:n,offset:t-e};e=l}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=As(n)}}function Lu(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Lu(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Tu(){for(var e=window,t=Jl();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Jl(e.document)}return t}function Do(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Qf(e){var t=Tu(),n=e.focusedElem,l=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Lu(n.ownerDocument.documentElement,n)){if(l!==null&&Do(n)){if(t=l.start,e=l.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var r=n.textContent.length,i=Math.min(l.start,r);l=l.end===void 0?i:Math.min(l.end,r),!e.extend&&i>l&&(r=l,l=i,i=r),r=Us(n,i);var o=Us(n,l);r&&o&&(e.rangeCount!==1||e.anchorNode!==r.node||e.anchorOffset!==r.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(r.node,r.offset),e.removeAllRanges(),i>l?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var qf=et&&"documentMode"in document&&11>=document.documentMode,Xt=null,$i=null,Un=null,Ai=!1;function Bs(e,t,n){var l=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ai||Xt==null||Xt!==Jl(l)||(l=Xt,"selectionStart"in l&&Do(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),Un&&Zn(Un,l)||(Un=l,l=rr($i,"onSelect"),0<l.length&&(t=new Lo("onSelect","select",null,t,n),e.push({event:t,listeners:l}),t.target=Xt)))}function _l(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Gt={animationend:_l("Animation","AnimationEnd"),animationiteration:_l("Animation","AnimationIteration"),animationstart:_l("Animation","AnimationStart"),transitionend:_l("Transition","TransitionEnd")},ti={},zu={};et&&(zu=document.createElement("div").style,"AnimationEvent"in window||(delete Gt.animationend.animation,delete Gt.animationiteration.animation,delete Gt.animationstart.animation),"TransitionEvent"in window||delete Gt.transitionend.transition);function Cr(e){if(ti[e])return ti[e];if(!Gt[e])return e;var t=Gt[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in zu)return ti[e]=t[n];return e}var Du=Cr("animationend"),Iu=Cr("animationiteration"),Ou=Cr("animationstart"),Fu=Cr("transitionend"),Mu=new Map,Hs="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function jt(e,t){Mu.set(e,t),Ht(t,[e])}for(var ni=0;ni<Hs.length;ni++){var li=Hs[ni],Kf=li.toLowerCase(),Yf=li[0].toUpperCase()+li.slice(1);jt(Kf,"on"+Yf)}jt(Du,"onAnimationEnd");jt(Iu,"onAnimationIteration");jt(Ou,"onAnimationStart");jt("dblclick","onDoubleClick");jt("focusin","onFocus");jt("focusout","onBlur");jt(Fu,"onTransitionEnd");dn("onMouseEnter",["mouseout","mouseover"]);dn("onMouseLeave",["mouseout","mouseover"]);dn("onPointerEnter",["pointerout","pointerover"]);dn("onPointerLeave",["pointerout","pointerover"]);Ht("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Ht("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Ht("onBeforeInput",["compositionend","keypress","textInput","paste"]);Ht("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Ht("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Ht("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var On="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Xf=new Set("cancel close invalid load scroll toggle".split(" ").concat(On));function Vs(e,t,n){var l=e.type||"unknown-event";e.currentTarget=n,qd(l,t,void 0,e),e.currentTarget=null}function $u(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var l=e[n],r=l.event;l=l.listeners;e:{var i=void 0;if(t)for(var o=l.length-1;0<=o;o--){var s=l[o],u=s.instance,c=s.currentTarget;if(s=s.listener,u!==i&&r.isPropagationStopped())break e;Vs(r,s,c),i=u}else for(o=0;o<l.length;o++){if(s=l[o],u=s.instance,c=s.currentTarget,s=s.listener,u!==i&&r.isPropagationStopped())break e;Vs(r,s,c),i=u}}}if(bl)throw e=Ii,bl=!1,Ii=null,e}function $(e,t){var n=t[Wi];n===void 0&&(n=t[Wi]=new Set);var l=e+"__bubble";n.has(l)||(Au(t,e,2,!1),n.add(l))}function ri(e,t,n){var l=0;t&&(l|=4),Au(n,e,l,t)}var Pl="_reactListening"+Math.random().toString(36).slice(2);function bn(e){if(!e[Pl]){e[Pl]=!0,qa.forEach(function(n){n!=="selectionchange"&&(Xf.has(n)||ri(n,!1,e),ri(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Pl]||(t[Pl]=!0,ri("selectionchange",!1,t))}}function Au(e,t,n,l){switch(Su(t)){case 1:var r=uf;break;case 4:r=cf;break;default:r=Po}n=r.bind(null,t,n,e),r=void 0,!Di||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(r=!0),l?r!==void 0?e.addEventListener(t,n,{capture:!0,passive:r}):e.addEventListener(t,n,!0):r!==void 0?e.addEventListener(t,n,{passive:r}):e.addEventListener(t,n,!1)}function ii(e,t,n,l,r){var i=l;if(!(t&1)&&!(t&2)&&l!==null)e:for(;;){if(l===null)return;var o=l.tag;if(o===3||o===4){var s=l.stateNode.containerInfo;if(s===r||s.nodeType===8&&s.parentNode===r)break;if(o===4)for(o=l.return;o!==null;){var u=o.tag;if((u===3||u===4)&&(u=o.stateNode.containerInfo,u===r||u.nodeType===8&&u.parentNode===r))return;o=o.return}for(;s!==null;){if(o=zt(s),o===null)return;if(u=o.tag,u===5||u===6){l=i=o;continue e}s=s.parentNode}}l=l.return}au(function(){var c=i,h=jo(n),v=[];e:{var m=Mu.get(e);if(m!==void 0){var k=Lo,y=e;switch(e){case"keypress":if(Bl(n)===0)break e;case"keydown":case"keyup":k=Ef;break;case"focusin":y="focus",k=Zr;break;case"focusout":y="blur",k=Zr;break;case"beforeblur":case"afterblur":k=Zr;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":k=Ts;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":k=pf;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":k=Pf;break;case Du:case Iu:case Ou:k=vf;break;case Fu:k=Lf;break;case"scroll":k=df;break;case"wheel":k=zf;break;case"copy":case"cut":case"paste":k=yf;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":k=Ds}var w=(t&4)!==0,j=!w&&e==="scroll",f=w?m!==null?m+"Capture":null:m;w=[];for(var d=c,p;d!==null;){p=d;var x=p.stateNode;if(p.tag===5&&x!==null&&(p=x,f!==null&&(x=Kn(d,f),x!=null&&w.push(el(d,x,p)))),j)break;d=d.return}0<w.length&&(m=new k(m,y,null,n,h),v.push({event:m,listeners:w}))}}if(!(t&7)){e:{if(m=e==="mouseover"||e==="pointerover",k=e==="mouseout"||e==="pointerout",m&&n!==Ti&&(y=n.relatedTarget||n.fromElement)&&(zt(y)||y[tt]))break e;if((k||m)&&(m=h.window===h?h:(m=h.ownerDocument)?m.defaultView||m.parentWindow:window,k?(y=n.relatedTarget||n.toElement,k=c,y=y?zt(y):null,y!==null&&(j=Vt(y),y!==j||y.tag!==5&&y.tag!==6)&&(y=null)):(k=null,y=c),k!==y)){if(w=Ts,x="onMouseLeave",f="onMouseEnter",d="mouse",(e==="pointerout"||e==="pointerover")&&(w=Ds,x="onPointerLeave",f="onPointerEnter",d="pointer"),j=k==null?m:Jt(k),p=y==null?m:Jt(y),m=new w(x,d+"leave",k,n,h),m.target=j,m.relatedTarget=p,x=null,zt(h)===c&&(w=new w(f,d+"enter",y,n,h),w.target=p,w.relatedTarget=j,x=w),j=x,k&&y)t:{for(w=k,f=y,d=0,p=w;p;p=Qt(p))d++;for(p=0,x=f;x;x=Qt(x))p++;for(;0<d-p;)w=Qt(w),d--;for(;0<p-d;)f=Qt(f),p--;for(;d--;){if(w===f||f!==null&&w===f.alternate)break t;w=Qt(w),f=Qt(f)}w=null}else w=null;k!==null&&Ws(v,m,k,w,!1),y!==null&&j!==null&&Ws(v,j,y,w,!0)}}e:{if(m=c?Jt(c):window,k=m.nodeName&&m.nodeName.toLowerCase(),k==="select"||k==="input"&&m.type==="file")var N=Af;else if(Fs(m))if(Pu)N=Vf;else{N=Bf;var C=Uf}else(k=m.nodeName)&&k.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(N=Hf);if(N&&(N=N(e,c))){_u(v,N,n,h);break e}C&&C(e,m,c),e==="focusout"&&(C=m._wrapperState)&&C.controlled&&m.type==="number"&&Ci(m,"number",m.value)}switch(C=c?Jt(c):window,e){case"focusin":(Fs(C)||C.contentEditable==="true")&&(Xt=C,$i=c,Un=null);break;case"focusout":Un=$i=Xt=null;break;case"mousedown":Ai=!0;break;case"contextmenu":case"mouseup":case"dragend":Ai=!1,Bs(v,n,h);break;case"selectionchange":if(qf)break;case"keydown":case"keyup":Bs(v,n,h)}var _;if(zo)e:{switch(e){case"compositionstart":var R="onCompositionStart";break e;case"compositionend":R="onCompositionEnd";break e;case"compositionupdate":R="onCompositionUpdate";break e}R=void 0}else Yt?Eu(e,n)&&(R="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(R="onCompositionStart");R&&(ju&&n.locale!=="ko"&&(Yt||R!=="onCompositionStart"?R==="onCompositionEnd"&&Yt&&(_=Nu()):(ft=h,Ro="value"in ft?ft.value:ft.textContent,Yt=!0)),C=rr(c,R),0<C.length&&(R=new zs(R,e,null,n,h),v.push({event:R,listeners:C}),_?R.data=_:(_=Cu(n),_!==null&&(R.data=_)))),(_=If?Of(e,n):Ff(e,n))&&(c=rr(c,"onBeforeInput"),0<c.length&&(h=new zs("onBeforeInput","beforeinput",null,n,h),v.push({event:h,listeners:c}),h.data=_))}$u(v,t)})}function el(e,t,n){return{instance:e,listener:t,currentTarget:n}}function rr(e,t){for(var n=t+"Capture",l=[];e!==null;){var r=e,i=r.stateNode;r.tag===5&&i!==null&&(r=i,i=Kn(e,n),i!=null&&l.unshift(el(e,i,r)),i=Kn(e,t),i!=null&&l.push(el(e,i,r))),e=e.return}return l}function Qt(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Ws(e,t,n,l,r){for(var i=t._reactName,o=[];n!==null&&n!==l;){var s=n,u=s.alternate,c=s.stateNode;if(u!==null&&u===l)break;s.tag===5&&c!==null&&(s=c,r?(u=Kn(n,i),u!=null&&o.unshift(el(n,u,s))):r||(u=Kn(n,i),u!=null&&o.push(el(n,u,s)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Gf=/\r\n?/g,Jf=/\u0000|\uFFFD/g;function Qs(e){return(typeof e=="string"?e:""+e).replace(Gf,`
`).replace(Jf,"")}function Rl(e,t,n){if(t=Qs(t),Qs(e)!==t&&n)throw Error(S(425))}function ir(){}var Ui=null,Bi=null;function Hi(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Vi=typeof setTimeout=="function"?setTimeout:void 0,Zf=typeof clearTimeout=="function"?clearTimeout:void 0,qs=typeof Promise=="function"?Promise:void 0,bf=typeof queueMicrotask=="function"?queueMicrotask:typeof qs<"u"?function(e){return qs.resolve(null).then(e).catch(ep)}:Vi;function ep(e){setTimeout(function(){throw e})}function oi(e,t){var n=t,l=0;do{var r=n.nextSibling;if(e.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(l===0){e.removeChild(r),Gn(t);return}l--}else n!=="$"&&n!=="$?"&&n!=="$!"||l++;n=r}while(n);Gn(t)}function gt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Ks(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var wn=Math.random().toString(36).slice(2),Ue="__reactFiber$"+wn,tl="__reactProps$"+wn,tt="__reactContainer$"+wn,Wi="__reactEvents$"+wn,tp="__reactListeners$"+wn,np="__reactHandles$"+wn;function zt(e){var t=e[Ue];if(t)return t;for(var n=e.parentNode;n;){if(t=n[tt]||n[Ue]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Ks(e);e!==null;){if(n=e[Ue])return n;e=Ks(e)}return t}e=n,n=e.parentNode}return null}function fl(e){return e=e[Ue]||e[tt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Jt(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(S(33))}function _r(e){return e[tl]||null}var Qi=[],Zt=-1;function Et(e){return{current:e}}function A(e){0>Zt||(e.current=Qi[Zt],Qi[Zt]=null,Zt--)}function M(e,t){Zt++,Qi[Zt]=e.current,e.current=t}var Nt={},se=Et(Nt),me=Et(!1),Mt=Nt;function fn(e,t){var n=e.type.contextTypes;if(!n)return Nt;var l=e.stateNode;if(l&&l.__reactInternalMemoizedUnmaskedChildContext===t)return l.__reactInternalMemoizedMaskedChildContext;var r={},i;for(i in n)r[i]=t[i];return l&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=r),r}function ve(e){return e=e.childContextTypes,e!=null}function or(){A(me),A(se)}function Ys(e,t,n){if(se.current!==Nt)throw Error(S(168));M(se,t),M(me,n)}function Uu(e,t,n){var l=e.stateNode;if(t=t.childContextTypes,typeof l.getChildContext!="function")return n;l=l.getChildContext();for(var r in l)if(!(r in t))throw Error(S(108,Ad(e)||"Unknown",r));return W({},n,l)}function sr(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Nt,Mt=se.current,M(se,e),M(me,me.current),!0}function Xs(e,t,n){var l=e.stateNode;if(!l)throw Error(S(169));n?(e=Uu(e,t,Mt),l.__reactInternalMemoizedMergedChildContext=e,A(me),A(se),M(se,e)):A(me),M(me,n)}var Ye=null,Pr=!1,si=!1;function Bu(e){Ye===null?Ye=[e]:Ye.push(e)}function lp(e){Pr=!0,Bu(e)}function Ct(){if(!si&&Ye!==null){si=!0;var e=0,t=F;try{var n=Ye;for(F=1;e<n.length;e++){var l=n[e];do l=l(!0);while(l!==null)}Ye=null,Pr=!1}catch(r){throw Ye!==null&&(Ye=Ye.slice(e+1)),fu(Eo,Ct),r}finally{F=t,si=!1}}return null}var bt=[],en=0,ar=null,ur=0,je=[],Ee=0,$t=null,Ge=1,Je="";function Lt(e,t){bt[en++]=ur,bt[en++]=ar,ar=e,ur=t}function Hu(e,t,n){je[Ee++]=Ge,je[Ee++]=Je,je[Ee++]=$t,$t=e;var l=Ge;e=Je;var r=32-Oe(l)-1;l&=~(1<<r),n+=1;var i=32-Oe(t)+r;if(30<i){var o=r-r%5;i=(l&(1<<o)-1).toString(32),l>>=o,r-=o,Ge=1<<32-Oe(t)+r|n<<r|l,Je=i+e}else Ge=1<<i|n<<r|l,Je=e}function Io(e){e.return!==null&&(Lt(e,1),Hu(e,1,0))}function Oo(e){for(;e===ar;)ar=bt[--en],bt[en]=null,ur=bt[--en],bt[en]=null;for(;e===$t;)$t=je[--Ee],je[Ee]=null,Je=je[--Ee],je[Ee]=null,Ge=je[--Ee],je[Ee]=null}var we=null,xe=null,U=!1,Ie=null;function Vu(e,t){var n=_e(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Gs(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,we=e,xe=gt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,we=e,xe=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=$t!==null?{id:Ge,overflow:Je}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=_e(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,we=e,xe=null,!0):!1;default:return!1}}function qi(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Ki(e){if(U){var t=xe;if(t){var n=t;if(!Gs(e,t)){if(qi(e))throw Error(S(418));t=gt(n.nextSibling);var l=we;t&&Gs(e,t)?Vu(l,n):(e.flags=e.flags&-4097|2,U=!1,we=e)}}else{if(qi(e))throw Error(S(418));e.flags=e.flags&-4097|2,U=!1,we=e}}}function Js(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;we=e}function Ll(e){if(e!==we)return!1;if(!U)return Js(e),U=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Hi(e.type,e.memoizedProps)),t&&(t=xe)){if(qi(e))throw Wu(),Error(S(418));for(;t;)Vu(e,t),t=gt(t.nextSibling)}if(Js(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(S(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){xe=gt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}xe=null}}else xe=we?gt(e.stateNode.nextSibling):null;return!0}function Wu(){for(var e=xe;e;)e=gt(e.nextSibling)}function pn(){xe=we=null,U=!1}function Fo(e){Ie===null?Ie=[e]:Ie.push(e)}var rp=it.ReactCurrentBatchConfig;function Pn(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(S(309));var l=n.stateNode}if(!l)throw Error(S(147,e));var r=l,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(o){var s=r.refs;o===null?delete s[i]:s[i]=o},t._stringRef=i,t)}if(typeof e!="string")throw Error(S(284));if(!n._owner)throw Error(S(290,e))}return e}function Tl(e,t){throw e=Object.prototype.toString.call(t),Error(S(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Zs(e){var t=e._init;return t(e._payload)}function Qu(e){function t(f,d){if(e){var p=f.deletions;p===null?(f.deletions=[d],f.flags|=16):p.push(d)}}function n(f,d){if(!e)return null;for(;d!==null;)t(f,d),d=d.sibling;return null}function l(f,d){for(f=new Map;d!==null;)d.key!==null?f.set(d.key,d):f.set(d.index,d),d=d.sibling;return f}function r(f,d){return f=kt(f,d),f.index=0,f.sibling=null,f}function i(f,d,p){return f.index=p,e?(p=f.alternate,p!==null?(p=p.index,p<d?(f.flags|=2,d):p):(f.flags|=2,d)):(f.flags|=1048576,d)}function o(f){return e&&f.alternate===null&&(f.flags|=2),f}function s(f,d,p,x){return d===null||d.tag!==6?(d=hi(p,f.mode,x),d.return=f,d):(d=r(d,p),d.return=f,d)}function u(f,d,p,x){var N=p.type;return N===Kt?h(f,d,p.props.children,x,p.key):d!==null&&(d.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===at&&Zs(N)===d.type)?(x=r(d,p.props),x.ref=Pn(f,d,p),x.return=f,x):(x=Yl(p.type,p.key,p.props,null,f.mode,x),x.ref=Pn(f,d,p),x.return=f,x)}function c(f,d,p,x){return d===null||d.tag!==4||d.stateNode.containerInfo!==p.containerInfo||d.stateNode.implementation!==p.implementation?(d=mi(p,f.mode,x),d.return=f,d):(d=r(d,p.children||[]),d.return=f,d)}function h(f,d,p,x,N){return d===null||d.tag!==7?(d=Ft(p,f.mode,x,N),d.return=f,d):(d=r(d,p),d.return=f,d)}function v(f,d,p){if(typeof d=="string"&&d!==""||typeof d=="number")return d=hi(""+d,f.mode,p),d.return=f,d;if(typeof d=="object"&&d!==null){switch(d.$$typeof){case wl:return p=Yl(d.type,d.key,d.props,null,f.mode,p),p.ref=Pn(f,null,d),p.return=f,p;case qt:return d=mi(d,f.mode,p),d.return=f,d;case at:var x=d._init;return v(f,x(d._payload),p)}if(Dn(d)||Nn(d))return d=Ft(d,f.mode,p,null),d.return=f,d;Tl(f,d)}return null}function m(f,d,p,x){var N=d!==null?d.key:null;if(typeof p=="string"&&p!==""||typeof p=="number")return N!==null?null:s(f,d,""+p,x);if(typeof p=="object"&&p!==null){switch(p.$$typeof){case wl:return p.key===N?u(f,d,p,x):null;case qt:return p.key===N?c(f,d,p,x):null;case at:return N=p._init,m(f,d,N(p._payload),x)}if(Dn(p)||Nn(p))return N!==null?null:h(f,d,p,x,null);Tl(f,p)}return null}function k(f,d,p,x,N){if(typeof x=="string"&&x!==""||typeof x=="number")return f=f.get(p)||null,s(d,f,""+x,N);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case wl:return f=f.get(x.key===null?p:x.key)||null,u(d,f,x,N);case qt:return f=f.get(x.key===null?p:x.key)||null,c(d,f,x,N);case at:var C=x._init;return k(f,d,p,C(x._payload),N)}if(Dn(x)||Nn(x))return f=f.get(p)||null,h(d,f,x,N,null);Tl(d,x)}return null}function y(f,d,p,x){for(var N=null,C=null,_=d,R=d=0,I=null;_!==null&&R<p.length;R++){_.index>R?(I=_,_=null):I=_.sibling;var L=m(f,_,p[R],x);if(L===null){_===null&&(_=I);break}e&&_&&L.alternate===null&&t(f,_),d=i(L,d,R),C===null?N=L:C.sibling=L,C=L,_=I}if(R===p.length)return n(f,_),U&&Lt(f,R),N;if(_===null){for(;R<p.length;R++)_=v(f,p[R],x),_!==null&&(d=i(_,d,R),C===null?N=_:C.sibling=_,C=_);return U&&Lt(f,R),N}for(_=l(f,_);R<p.length;R++)I=k(_,f,R,p[R],x),I!==null&&(e&&I.alternate!==null&&_.delete(I.key===null?R:I.key),d=i(I,d,R),C===null?N=I:C.sibling=I,C=I);return e&&_.forEach(function(ae){return t(f,ae)}),U&&Lt(f,R),N}function w(f,d,p,x){var N=Nn(p);if(typeof N!="function")throw Error(S(150));if(p=N.call(p),p==null)throw Error(S(151));for(var C=N=null,_=d,R=d=0,I=null,L=p.next();_!==null&&!L.done;R++,L=p.next()){_.index>R?(I=_,_=null):I=_.sibling;var ae=m(f,_,L.value,x);if(ae===null){_===null&&(_=I);break}e&&_&&ae.alternate===null&&t(f,_),d=i(ae,d,R),C===null?N=ae:C.sibling=ae,C=ae,_=I}if(L.done)return n(f,_),U&&Lt(f,R),N;if(_===null){for(;!L.done;R++,L=p.next())L=v(f,L.value,x),L!==null&&(d=i(L,d,R),C===null?N=L:C.sibling=L,C=L);return U&&Lt(f,R),N}for(_=l(f,_);!L.done;R++,L=p.next())L=k(_,f,R,L.value,x),L!==null&&(e&&L.alternate!==null&&_.delete(L.key===null?R:L.key),d=i(L,d,R),C===null?N=L:C.sibling=L,C=L);return e&&_.forEach(function(Wt){return t(f,Wt)}),U&&Lt(f,R),N}function j(f,d,p,x){if(typeof p=="object"&&p!==null&&p.type===Kt&&p.key===null&&(p=p.props.children),typeof p=="object"&&p!==null){switch(p.$$typeof){case wl:e:{for(var N=p.key,C=d;C!==null;){if(C.key===N){if(N=p.type,N===Kt){if(C.tag===7){n(f,C.sibling),d=r(C,p.props.children),d.return=f,f=d;break e}}else if(C.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===at&&Zs(N)===C.type){n(f,C.sibling),d=r(C,p.props),d.ref=Pn(f,C,p),d.return=f,f=d;break e}n(f,C);break}else t(f,C);C=C.sibling}p.type===Kt?(d=Ft(p.props.children,f.mode,x,p.key),d.return=f,f=d):(x=Yl(p.type,p.key,p.props,null,f.mode,x),x.ref=Pn(f,d,p),x.return=f,f=x)}return o(f);case qt:e:{for(C=p.key;d!==null;){if(d.key===C)if(d.tag===4&&d.stateNode.containerInfo===p.containerInfo&&d.stateNode.implementation===p.implementation){n(f,d.sibling),d=r(d,p.children||[]),d.return=f,f=d;break e}else{n(f,d);break}else t(f,d);d=d.sibling}d=mi(p,f.mode,x),d.return=f,f=d}return o(f);case at:return C=p._init,j(f,d,C(p._payload),x)}if(Dn(p))return y(f,d,p,x);if(Nn(p))return w(f,d,p,x);Tl(f,p)}return typeof p=="string"&&p!==""||typeof p=="number"?(p=""+p,d!==null&&d.tag===6?(n(f,d.sibling),d=r(d,p),d.return=f,f=d):(n(f,d),d=hi(p,f.mode,x),d.return=f,f=d),o(f)):n(f,d)}return j}var hn=Qu(!0),qu=Qu(!1),cr=Et(null),dr=null,tn=null,Mo=null;function $o(){Mo=tn=dr=null}function Ao(e){var t=cr.current;A(cr),e._currentValue=t}function Yi(e,t,n){for(;e!==null;){var l=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,l!==null&&(l.childLanes|=t)):l!==null&&(l.childLanes&t)!==t&&(l.childLanes|=t),e===n)break;e=e.return}}function un(e,t){dr=e,Mo=tn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(he=!0),e.firstContext=null)}function Re(e){var t=e._currentValue;if(Mo!==e)if(e={context:e,memoizedValue:t,next:null},tn===null){if(dr===null)throw Error(S(308));tn=e,dr.dependencies={lanes:0,firstContext:e}}else tn=tn.next=e;return t}var Dt=null;function Uo(e){Dt===null?Dt=[e]:Dt.push(e)}function Ku(e,t,n,l){var r=t.interleaved;return r===null?(n.next=n,Uo(t)):(n.next=r.next,r.next=n),t.interleaved=n,nt(e,l)}function nt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var ut=!1;function Bo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Yu(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Ze(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function yt(e,t,n){var l=e.updateQueue;if(l===null)return null;if(l=l.shared,O&2){var r=l.pending;return r===null?t.next=t:(t.next=r.next,r.next=t),l.pending=t,nt(e,n)}return r=l.interleaved,r===null?(t.next=t,Uo(l)):(t.next=r.next,r.next=t),l.interleaved=t,nt(e,n)}function Hl(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var l=t.lanes;l&=e.pendingLanes,n|=l,t.lanes=n,Co(e,n)}}function bs(e,t){var n=e.updateQueue,l=e.alternate;if(l!==null&&(l=l.updateQueue,n===l)){var r=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?r=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?r=i=t:i=i.next=t}else r=i=t;n={baseState:l.baseState,firstBaseUpdate:r,lastBaseUpdate:i,shared:l.shared,effects:l.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function fr(e,t,n,l){var r=e.updateQueue;ut=!1;var i=r.firstBaseUpdate,o=r.lastBaseUpdate,s=r.shared.pending;if(s!==null){r.shared.pending=null;var u=s,c=u.next;u.next=null,o===null?i=c:o.next=c,o=u;var h=e.alternate;h!==null&&(h=h.updateQueue,s=h.lastBaseUpdate,s!==o&&(s===null?h.firstBaseUpdate=c:s.next=c,h.lastBaseUpdate=u))}if(i!==null){var v=r.baseState;o=0,h=c=u=null,s=i;do{var m=s.lane,k=s.eventTime;if((l&m)===m){h!==null&&(h=h.next={eventTime:k,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var y=e,w=s;switch(m=t,k=n,w.tag){case 1:if(y=w.payload,typeof y=="function"){v=y.call(k,v,m);break e}v=y;break e;case 3:y.flags=y.flags&-65537|128;case 0:if(y=w.payload,m=typeof y=="function"?y.call(k,v,m):y,m==null)break e;v=W({},v,m);break e;case 2:ut=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,m=r.effects,m===null?r.effects=[s]:m.push(s))}else k={eventTime:k,lane:m,tag:s.tag,payload:s.payload,callback:s.callback,next:null},h===null?(c=h=k,u=v):h=h.next=k,o|=m;if(s=s.next,s===null){if(s=r.shared.pending,s===null)break;m=s,s=m.next,m.next=null,r.lastBaseUpdate=m,r.shared.pending=null}}while(!0);if(h===null&&(u=v),r.baseState=u,r.firstBaseUpdate=c,r.lastBaseUpdate=h,t=r.shared.interleaved,t!==null){r=t;do o|=r.lane,r=r.next;while(r!==t)}else i===null&&(r.shared.lanes=0);Ut|=o,e.lanes=o,e.memoizedState=v}}function ea(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var l=e[t],r=l.callback;if(r!==null){if(l.callback=null,l=n,typeof r!="function")throw Error(S(191,r));r.call(l)}}}var pl={},He=Et(pl),nl=Et(pl),ll=Et(pl);function It(e){if(e===pl)throw Error(S(174));return e}function Ho(e,t){switch(M(ll,t),M(nl,e),M(He,pl),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Pi(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Pi(t,e)}A(He),M(He,t)}function mn(){A(He),A(nl),A(ll)}function Xu(e){It(ll.current);var t=It(He.current),n=Pi(t,e.type);t!==n&&(M(nl,e),M(He,n))}function Vo(e){nl.current===e&&(A(He),A(nl))}var B=Et(0);function pr(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ai=[];function Wo(){for(var e=0;e<ai.length;e++)ai[e]._workInProgressVersionPrimary=null;ai.length=0}var Vl=it.ReactCurrentDispatcher,ui=it.ReactCurrentBatchConfig,At=0,H=null,X=null,b=null,hr=!1,Bn=!1,rl=0,ip=0;function re(){throw Error(S(321))}function Qo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Me(e[n],t[n]))return!1;return!0}function qo(e,t,n,l,r,i){if(At=i,H=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Vl.current=e===null||e.memoizedState===null?up:cp,e=n(l,r),Bn){i=0;do{if(Bn=!1,rl=0,25<=i)throw Error(S(301));i+=1,b=X=null,t.updateQueue=null,Vl.current=dp,e=n(l,r)}while(Bn)}if(Vl.current=mr,t=X!==null&&X.next!==null,At=0,b=X=H=null,hr=!1,t)throw Error(S(300));return e}function Ko(){var e=rl!==0;return rl=0,e}function Ae(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return b===null?H.memoizedState=b=e:b=b.next=e,b}function Le(){if(X===null){var e=H.alternate;e=e!==null?e.memoizedState:null}else e=X.next;var t=b===null?H.memoizedState:b.next;if(t!==null)b=t,X=e;else{if(e===null)throw Error(S(310));X=e,e={memoizedState:X.memoizedState,baseState:X.baseState,baseQueue:X.baseQueue,queue:X.queue,next:null},b===null?H.memoizedState=b=e:b=b.next=e}return b}function il(e,t){return typeof t=="function"?t(e):t}function ci(e){var t=Le(),n=t.queue;if(n===null)throw Error(S(311));n.lastRenderedReducer=e;var l=X,r=l.baseQueue,i=n.pending;if(i!==null){if(r!==null){var o=r.next;r.next=i.next,i.next=o}l.baseQueue=r=i,n.pending=null}if(r!==null){i=r.next,l=l.baseState;var s=o=null,u=null,c=i;do{var h=c.lane;if((At&h)===h)u!==null&&(u=u.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),l=c.hasEagerState?c.eagerState:e(l,c.action);else{var v={lane:h,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};u===null?(s=u=v,o=l):u=u.next=v,H.lanes|=h,Ut|=h}c=c.next}while(c!==null&&c!==i);u===null?o=l:u.next=s,Me(l,t.memoizedState)||(he=!0),t.memoizedState=l,t.baseState=o,t.baseQueue=u,n.lastRenderedState=l}if(e=n.interleaved,e!==null){r=e;do i=r.lane,H.lanes|=i,Ut|=i,r=r.next;while(r!==e)}else r===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function di(e){var t=Le(),n=t.queue;if(n===null)throw Error(S(311));n.lastRenderedReducer=e;var l=n.dispatch,r=n.pending,i=t.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do i=e(i,o.action),o=o.next;while(o!==r);Me(i,t.memoizedState)||(he=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,l]}function Gu(){}function Ju(e,t){var n=H,l=Le(),r=t(),i=!Me(l.memoizedState,r);if(i&&(l.memoizedState=r,he=!0),l=l.queue,Yo(ec.bind(null,n,l,e),[e]),l.getSnapshot!==t||i||b!==null&&b.memoizedState.tag&1){if(n.flags|=2048,ol(9,bu.bind(null,n,l,r,t),void 0,null),ee===null)throw Error(S(349));At&30||Zu(n,t,r)}return r}function Zu(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=H.updateQueue,t===null?(t={lastEffect:null,stores:null},H.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function bu(e,t,n,l){t.value=n,t.getSnapshot=l,tc(t)&&nc(e)}function ec(e,t,n){return n(function(){tc(t)&&nc(e)})}function tc(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Me(e,n)}catch{return!0}}function nc(e){var t=nt(e,1);t!==null&&Fe(t,e,1,-1)}function ta(e){var t=Ae();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:il,lastRenderedState:e},t.queue=e,e=e.dispatch=ap.bind(null,H,e),[t.memoizedState,e]}function ol(e,t,n,l){return e={tag:e,create:t,destroy:n,deps:l,next:null},t=H.updateQueue,t===null?(t={lastEffect:null,stores:null},H.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(l=n.next,n.next=e,e.next=l,t.lastEffect=e)),e}function lc(){return Le().memoizedState}function Wl(e,t,n,l){var r=Ae();H.flags|=e,r.memoizedState=ol(1|t,n,void 0,l===void 0?null:l)}function Rr(e,t,n,l){var r=Le();l=l===void 0?null:l;var i=void 0;if(X!==null){var o=X.memoizedState;if(i=o.destroy,l!==null&&Qo(l,o.deps)){r.memoizedState=ol(t,n,i,l);return}}H.flags|=e,r.memoizedState=ol(1|t,n,i,l)}function na(e,t){return Wl(8390656,8,e,t)}function Yo(e,t){return Rr(2048,8,e,t)}function rc(e,t){return Rr(4,2,e,t)}function ic(e,t){return Rr(4,4,e,t)}function oc(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function sc(e,t,n){return n=n!=null?n.concat([e]):null,Rr(4,4,oc.bind(null,t,e),n)}function Xo(){}function ac(e,t){var n=Le();t=t===void 0?null:t;var l=n.memoizedState;return l!==null&&t!==null&&Qo(t,l[1])?l[0]:(n.memoizedState=[e,t],e)}function uc(e,t){var n=Le();t=t===void 0?null:t;var l=n.memoizedState;return l!==null&&t!==null&&Qo(t,l[1])?l[0]:(e=e(),n.memoizedState=[e,t],e)}function cc(e,t,n){return At&21?(Me(n,t)||(n=mu(),H.lanes|=n,Ut|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,he=!0),e.memoizedState=n)}function op(e,t){var n=F;F=n!==0&&4>n?n:4,e(!0);var l=ui.transition;ui.transition={};try{e(!1),t()}finally{F=n,ui.transition=l}}function dc(){return Le().memoizedState}function sp(e,t,n){var l=wt(e);if(n={lane:l,action:n,hasEagerState:!1,eagerState:null,next:null},fc(e))pc(t,n);else if(n=Ku(e,t,n,l),n!==null){var r=ce();Fe(n,e,l,r),hc(n,t,l)}}function ap(e,t,n){var l=wt(e),r={lane:l,action:n,hasEagerState:!1,eagerState:null,next:null};if(fc(e))pc(t,r);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var o=t.lastRenderedState,s=i(o,n);if(r.hasEagerState=!0,r.eagerState=s,Me(s,o)){var u=t.interleaved;u===null?(r.next=r,Uo(t)):(r.next=u.next,u.next=r),t.interleaved=r;return}}catch{}finally{}n=Ku(e,t,r,l),n!==null&&(r=ce(),Fe(n,e,l,r),hc(n,t,l))}}function fc(e){var t=e.alternate;return e===H||t!==null&&t===H}function pc(e,t){Bn=hr=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function hc(e,t,n){if(n&4194240){var l=t.lanes;l&=e.pendingLanes,n|=l,t.lanes=n,Co(e,n)}}var mr={readContext:Re,useCallback:re,useContext:re,useEffect:re,useImperativeHandle:re,useInsertionEffect:re,useLayoutEffect:re,useMemo:re,useReducer:re,useRef:re,useState:re,useDebugValue:re,useDeferredValue:re,useTransition:re,useMutableSource:re,useSyncExternalStore:re,useId:re,unstable_isNewReconciler:!1},up={readContext:Re,useCallback:function(e,t){return Ae().memoizedState=[e,t===void 0?null:t],e},useContext:Re,useEffect:na,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Wl(4194308,4,oc.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Wl(4194308,4,e,t)},useInsertionEffect:function(e,t){return Wl(4,2,e,t)},useMemo:function(e,t){var n=Ae();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var l=Ae();return t=n!==void 0?n(t):t,l.memoizedState=l.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},l.queue=e,e=e.dispatch=sp.bind(null,H,e),[l.memoizedState,e]},useRef:function(e){var t=Ae();return e={current:e},t.memoizedState=e},useState:ta,useDebugValue:Xo,useDeferredValue:function(e){return Ae().memoizedState=e},useTransition:function(){var e=ta(!1),t=e[0];return e=op.bind(null,e[1]),Ae().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var l=H,r=Ae();if(U){if(n===void 0)throw Error(S(407));n=n()}else{if(n=t(),ee===null)throw Error(S(349));At&30||Zu(l,t,n)}r.memoizedState=n;var i={value:n,getSnapshot:t};return r.queue=i,na(ec.bind(null,l,i,e),[e]),l.flags|=2048,ol(9,bu.bind(null,l,i,n,t),void 0,null),n},useId:function(){var e=Ae(),t=ee.identifierPrefix;if(U){var n=Je,l=Ge;n=(l&~(1<<32-Oe(l)-1)).toString(32)+n,t=":"+t+"R"+n,n=rl++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=ip++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},cp={readContext:Re,useCallback:ac,useContext:Re,useEffect:Yo,useImperativeHandle:sc,useInsertionEffect:rc,useLayoutEffect:ic,useMemo:uc,useReducer:ci,useRef:lc,useState:function(){return ci(il)},useDebugValue:Xo,useDeferredValue:function(e){var t=Le();return cc(t,X.memoizedState,e)},useTransition:function(){var e=ci(il)[0],t=Le().memoizedState;return[e,t]},useMutableSource:Gu,useSyncExternalStore:Ju,useId:dc,unstable_isNewReconciler:!1},dp={readContext:Re,useCallback:ac,useContext:Re,useEffect:Yo,useImperativeHandle:sc,useInsertionEffect:rc,useLayoutEffect:ic,useMemo:uc,useReducer:di,useRef:lc,useState:function(){return di(il)},useDebugValue:Xo,useDeferredValue:function(e){var t=Le();return X===null?t.memoizedState=e:cc(t,X.memoizedState,e)},useTransition:function(){var e=di(il)[0],t=Le().memoizedState;return[e,t]},useMutableSource:Gu,useSyncExternalStore:Ju,useId:dc,unstable_isNewReconciler:!1};function ze(e,t){if(e&&e.defaultProps){t=W({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Xi(e,t,n,l){t=e.memoizedState,n=n(l,t),n=n==null?t:W({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Lr={isMounted:function(e){return(e=e._reactInternals)?Vt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var l=ce(),r=wt(e),i=Ze(l,r);i.payload=t,n!=null&&(i.callback=n),t=yt(e,i,r),t!==null&&(Fe(t,e,r,l),Hl(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var l=ce(),r=wt(e),i=Ze(l,r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=yt(e,i,r),t!==null&&(Fe(t,e,r,l),Hl(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ce(),l=wt(e),r=Ze(n,l);r.tag=2,t!=null&&(r.callback=t),t=yt(e,r,l),t!==null&&(Fe(t,e,l,n),Hl(t,e,l))}};function la(e,t,n,l,r,i,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(l,i,o):t.prototype&&t.prototype.isPureReactComponent?!Zn(n,l)||!Zn(r,i):!0}function mc(e,t,n){var l=!1,r=Nt,i=t.contextType;return typeof i=="object"&&i!==null?i=Re(i):(r=ve(t)?Mt:se.current,l=t.contextTypes,i=(l=l!=null)?fn(e,r):Nt),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Lr,e.stateNode=t,t._reactInternals=e,l&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=r,e.__reactInternalMemoizedMaskedChildContext=i),t}function ra(e,t,n,l){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,l),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,l),t.state!==e&&Lr.enqueueReplaceState(t,t.state,null)}function Gi(e,t,n,l){var r=e.stateNode;r.props=n,r.state=e.memoizedState,r.refs={},Bo(e);var i=t.contextType;typeof i=="object"&&i!==null?r.context=Re(i):(i=ve(t)?Mt:se.current,r.context=fn(e,i)),r.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(Xi(e,t,i,n),r.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(t=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),t!==r.state&&Lr.enqueueReplaceState(r,r.state,null),fr(e,n,r,l),r.state=e.memoizedState),typeof r.componentDidMount=="function"&&(e.flags|=4194308)}function vn(e,t){try{var n="",l=t;do n+=$d(l),l=l.return;while(l);var r=n}catch(i){r=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:r,digest:null}}function fi(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Ji(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var fp=typeof WeakMap=="function"?WeakMap:Map;function vc(e,t,n){n=Ze(-1,n),n.tag=3,n.payload={element:null};var l=t.value;return n.callback=function(){gr||(gr=!0,so=l),Ji(e,t)},n}function gc(e,t,n){n=Ze(-1,n),n.tag=3;var l=e.type.getDerivedStateFromError;if(typeof l=="function"){var r=t.value;n.payload=function(){return l(r)},n.callback=function(){Ji(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){Ji(e,t),typeof l!="function"&&(xt===null?xt=new Set([this]):xt.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function ia(e,t,n){var l=e.pingCache;if(l===null){l=e.pingCache=new fp;var r=new Set;l.set(t,r)}else r=l.get(t),r===void 0&&(r=new Set,l.set(t,r));r.has(n)||(r.add(n),e=Cp.bind(null,e,t,n),t.then(e,e))}function oa(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function sa(e,t,n,l,r){return e.mode&1?(e.flags|=65536,e.lanes=r,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Ze(-1,1),t.tag=2,yt(n,t,1))),n.lanes|=1),e)}var pp=it.ReactCurrentOwner,he=!1;function ue(e,t,n,l){t.child=e===null?qu(t,null,n,l):hn(t,e.child,n,l)}function aa(e,t,n,l,r){n=n.render;var i=t.ref;return un(t,r),l=qo(e,t,n,l,i,r),n=Ko(),e!==null&&!he?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r,lt(e,t,r)):(U&&n&&Io(t),t.flags|=1,ue(e,t,l,r),t.child)}function ua(e,t,n,l,r){if(e===null){var i=n.type;return typeof i=="function"&&!ls(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,yc(e,t,i,l,r)):(e=Yl(n.type,null,l,t,t.mode,r),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&r)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:Zn,n(o,l)&&e.ref===t.ref)return lt(e,t,r)}return t.flags|=1,e=kt(i,l),e.ref=t.ref,e.return=t,t.child=e}function yc(e,t,n,l,r){if(e!==null){var i=e.memoizedProps;if(Zn(i,l)&&e.ref===t.ref)if(he=!1,t.pendingProps=l=i,(e.lanes&r)!==0)e.flags&131072&&(he=!0);else return t.lanes=e.lanes,lt(e,t,r)}return Zi(e,t,n,l,r)}function xc(e,t,n){var l=t.pendingProps,r=l.children,i=e!==null?e.memoizedState:null;if(l.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},M(ln,ye),ye|=n;else{if(!(n&1073741824))return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,M(ln,ye),ye|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},l=i!==null?i.baseLanes:n,M(ln,ye),ye|=l}else i!==null?(l=i.baseLanes|n,t.memoizedState=null):l=n,M(ln,ye),ye|=l;return ue(e,t,r,n),t.child}function wc(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Zi(e,t,n,l,r){var i=ve(n)?Mt:se.current;return i=fn(t,i),un(t,r),n=qo(e,t,n,l,i,r),l=Ko(),e!==null&&!he?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r,lt(e,t,r)):(U&&l&&Io(t),t.flags|=1,ue(e,t,n,r),t.child)}function ca(e,t,n,l,r){if(ve(n)){var i=!0;sr(t)}else i=!1;if(un(t,r),t.stateNode===null)Ql(e,t),mc(t,n,l),Gi(t,n,l,r),l=!0;else if(e===null){var o=t.stateNode,s=t.memoizedProps;o.props=s;var u=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=Re(c):(c=ve(n)?Mt:se.current,c=fn(t,c));var h=n.getDerivedStateFromProps,v=typeof h=="function"||typeof o.getSnapshotBeforeUpdate=="function";v||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==l||u!==c)&&ra(t,o,l,c),ut=!1;var m=t.memoizedState;o.state=m,fr(t,l,o,r),u=t.memoizedState,s!==l||m!==u||me.current||ut?(typeof h=="function"&&(Xi(t,n,h,l),u=t.memoizedState),(s=ut||la(t,n,s,l,m,u,c))?(v||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=l,t.memoizedState=u),o.props=l,o.state=u,o.context=c,l=s):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),l=!1)}else{o=t.stateNode,Yu(e,t),s=t.memoizedProps,c=t.type===t.elementType?s:ze(t.type,s),o.props=c,v=t.pendingProps,m=o.context,u=n.contextType,typeof u=="object"&&u!==null?u=Re(u):(u=ve(n)?Mt:se.current,u=fn(t,u));var k=n.getDerivedStateFromProps;(h=typeof k=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==v||m!==u)&&ra(t,o,l,u),ut=!1,m=t.memoizedState,o.state=m,fr(t,l,o,r);var y=t.memoizedState;s!==v||m!==y||me.current||ut?(typeof k=="function"&&(Xi(t,n,k,l),y=t.memoizedState),(c=ut||la(t,n,c,l,m,y,u)||!1)?(h||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(l,y,u),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(l,y,u)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),t.memoizedProps=l,t.memoizedState=y),o.props=l,o.state=y,o.context=u,l=c):(typeof o.componentDidUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),l=!1)}return bi(e,t,n,l,i,r)}function bi(e,t,n,l,r,i){wc(e,t);var o=(t.flags&128)!==0;if(!l&&!o)return r&&Xs(t,n,!1),lt(e,t,i);l=t.stateNode,pp.current=t;var s=o&&typeof n.getDerivedStateFromError!="function"?null:l.render();return t.flags|=1,e!==null&&o?(t.child=hn(t,e.child,null,i),t.child=hn(t,null,s,i)):ue(e,t,s,i),t.memoizedState=l.state,r&&Xs(t,n,!0),t.child}function kc(e){var t=e.stateNode;t.pendingContext?Ys(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Ys(e,t.context,!1),Ho(e,t.containerInfo)}function da(e,t,n,l,r){return pn(),Fo(r),t.flags|=256,ue(e,t,n,l),t.child}var eo={dehydrated:null,treeContext:null,retryLane:0};function to(e){return{baseLanes:e,cachePool:null,transitions:null}}function Sc(e,t,n){var l=t.pendingProps,r=B.current,i=!1,o=(t.flags&128)!==0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(r&2)!==0),s?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(r|=1),M(B,r&1),e===null)return Ki(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=l.children,e=l.fallback,i?(l=t.mode,i=t.child,o={mode:"hidden",children:o},!(l&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=Dr(o,l,0,null),e=Ft(e,l,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=to(n),t.memoizedState=eo,e):Go(t,o));if(r=e.memoizedState,r!==null&&(s=r.dehydrated,s!==null))return hp(e,t,o,l,s,r,n);if(i){i=l.fallback,o=t.mode,r=e.child,s=r.sibling;var u={mode:"hidden",children:l.children};return!(o&1)&&t.child!==r?(l=t.child,l.childLanes=0,l.pendingProps=u,t.deletions=null):(l=kt(r,u),l.subtreeFlags=r.subtreeFlags&14680064),s!==null?i=kt(s,i):(i=Ft(i,o,n,null),i.flags|=2),i.return=t,l.return=t,l.sibling=i,t.child=l,l=i,i=t.child,o=e.child.memoizedState,o=o===null?to(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=e.childLanes&~n,t.memoizedState=eo,l}return i=e.child,e=i.sibling,l=kt(i,{mode:"visible",children:l.children}),!(t.mode&1)&&(l.lanes=n),l.return=t,l.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=l,t.memoizedState=null,l}function Go(e,t){return t=Dr({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function zl(e,t,n,l){return l!==null&&Fo(l),hn(t,e.child,null,n),e=Go(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function hp(e,t,n,l,r,i,o){if(n)return t.flags&256?(t.flags&=-257,l=fi(Error(S(422))),zl(e,t,o,l)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=l.fallback,r=t.mode,l=Dr({mode:"visible",children:l.children},r,0,null),i=Ft(i,r,o,null),i.flags|=2,l.return=t,i.return=t,l.sibling=i,t.child=l,t.mode&1&&hn(t,e.child,null,o),t.child.memoizedState=to(o),t.memoizedState=eo,i);if(!(t.mode&1))return zl(e,t,o,null);if(r.data==="$!"){if(l=r.nextSibling&&r.nextSibling.dataset,l)var s=l.dgst;return l=s,i=Error(S(419)),l=fi(i,l,void 0),zl(e,t,o,l)}if(s=(o&e.childLanes)!==0,he||s){if(l=ee,l!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(l.suspendedLanes|o)?0:r,r!==0&&r!==i.retryLane&&(i.retryLane=r,nt(e,r),Fe(l,e,r,-1))}return ns(),l=fi(Error(S(421))),zl(e,t,o,l)}return r.data==="$?"?(t.flags|=128,t.child=e.child,t=_p.bind(null,e),r._reactRetry=t,null):(e=i.treeContext,xe=gt(r.nextSibling),we=t,U=!0,Ie=null,e!==null&&(je[Ee++]=Ge,je[Ee++]=Je,je[Ee++]=$t,Ge=e.id,Je=e.overflow,$t=t),t=Go(t,l.children),t.flags|=4096,t)}function fa(e,t,n){e.lanes|=t;var l=e.alternate;l!==null&&(l.lanes|=t),Yi(e.return,t,n)}function pi(e,t,n,l,r){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:l,tail:n,tailMode:r}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=l,i.tail=n,i.tailMode=r)}function Nc(e,t,n){var l=t.pendingProps,r=l.revealOrder,i=l.tail;if(ue(e,t,l.children,n),l=B.current,l&2)l=l&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&fa(e,n,t);else if(e.tag===19)fa(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}l&=1}if(M(B,l),!(t.mode&1))t.memoizedState=null;else switch(r){case"forwards":for(n=t.child,r=null;n!==null;)e=n.alternate,e!==null&&pr(e)===null&&(r=n),n=n.sibling;n=r,n===null?(r=t.child,t.child=null):(r=n.sibling,n.sibling=null),pi(t,!1,r,n,i);break;case"backwards":for(n=null,r=t.child,t.child=null;r!==null;){if(e=r.alternate,e!==null&&pr(e)===null){t.child=r;break}e=r.sibling,r.sibling=n,n=r,r=e}pi(t,!0,n,null,i);break;case"together":pi(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Ql(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function lt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Ut|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(S(153));if(t.child!==null){for(e=t.child,n=kt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=kt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function mp(e,t,n){switch(t.tag){case 3:kc(t),pn();break;case 5:Xu(t);break;case 1:ve(t.type)&&sr(t);break;case 4:Ho(t,t.stateNode.containerInfo);break;case 10:var l=t.type._context,r=t.memoizedProps.value;M(cr,l._currentValue),l._currentValue=r;break;case 13:if(l=t.memoizedState,l!==null)return l.dehydrated!==null?(M(B,B.current&1),t.flags|=128,null):n&t.child.childLanes?Sc(e,t,n):(M(B,B.current&1),e=lt(e,t,n),e!==null?e.sibling:null);M(B,B.current&1);break;case 19:if(l=(n&t.childLanes)!==0,e.flags&128){if(l)return Nc(e,t,n);t.flags|=128}if(r=t.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),M(B,B.current),l)break;return null;case 22:case 23:return t.lanes=0,xc(e,t,n)}return lt(e,t,n)}var jc,no,Ec,Cc;jc=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};no=function(){};Ec=function(e,t,n,l){var r=e.memoizedProps;if(r!==l){e=t.stateNode,It(He.current);var i=null;switch(n){case"input":r=ji(e,r),l=ji(e,l),i=[];break;case"select":r=W({},r,{value:void 0}),l=W({},l,{value:void 0}),i=[];break;case"textarea":r=_i(e,r),l=_i(e,l),i=[];break;default:typeof r.onClick!="function"&&typeof l.onClick=="function"&&(e.onclick=ir)}Ri(n,l);var o;n=null;for(c in r)if(!l.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var s=r[c];for(o in s)s.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Qn.hasOwnProperty(c)?i||(i=[]):(i=i||[]).push(c,null));for(c in l){var u=l[c];if(s=r!=null?r[c]:void 0,l.hasOwnProperty(c)&&u!==s&&(u!=null||s!=null))if(c==="style")if(s){for(o in s)!s.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in u)u.hasOwnProperty(o)&&s[o]!==u[o]&&(n||(n={}),n[o]=u[o])}else n||(i||(i=[]),i.push(c,n)),n=u;else c==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,s=s?s.__html:void 0,u!=null&&s!==u&&(i=i||[]).push(c,u)):c==="children"?typeof u!="string"&&typeof u!="number"||(i=i||[]).push(c,""+u):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Qn.hasOwnProperty(c)?(u!=null&&c==="onScroll"&&$("scroll",e),i||s===u||(i=[])):(i=i||[]).push(c,u))}n&&(i=i||[]).push("style",n);var c=i;(t.updateQueue=c)&&(t.flags|=4)}};Cc=function(e,t,n,l){n!==l&&(t.flags|=4)};function Rn(e,t){if(!U)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var l=null;n!==null;)n.alternate!==null&&(l=n),n=n.sibling;l===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:l.sibling=null}}function ie(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,l=0;if(t)for(var r=e.child;r!==null;)n|=r.lanes|r.childLanes,l|=r.subtreeFlags&14680064,l|=r.flags&14680064,r.return=e,r=r.sibling;else for(r=e.child;r!==null;)n|=r.lanes|r.childLanes,l|=r.subtreeFlags,l|=r.flags,r.return=e,r=r.sibling;return e.subtreeFlags|=l,e.childLanes=n,t}function vp(e,t,n){var l=t.pendingProps;switch(Oo(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ie(t),null;case 1:return ve(t.type)&&or(),ie(t),null;case 3:return l=t.stateNode,mn(),A(me),A(se),Wo(),l.pendingContext&&(l.context=l.pendingContext,l.pendingContext=null),(e===null||e.child===null)&&(Ll(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Ie!==null&&(co(Ie),Ie=null))),no(e,t),ie(t),null;case 5:Vo(t);var r=It(ll.current);if(n=t.type,e!==null&&t.stateNode!=null)Ec(e,t,n,l,r),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!l){if(t.stateNode===null)throw Error(S(166));return ie(t),null}if(e=It(He.current),Ll(t)){l=t.stateNode,n=t.type;var i=t.memoizedProps;switch(l[Ue]=t,l[tl]=i,e=(t.mode&1)!==0,n){case"dialog":$("cancel",l),$("close",l);break;case"iframe":case"object":case"embed":$("load",l);break;case"video":case"audio":for(r=0;r<On.length;r++)$(On[r],l);break;case"source":$("error",l);break;case"img":case"image":case"link":$("error",l),$("load",l);break;case"details":$("toggle",l);break;case"input":ks(l,i),$("invalid",l);break;case"select":l._wrapperState={wasMultiple:!!i.multiple},$("invalid",l);break;case"textarea":Ns(l,i),$("invalid",l)}Ri(n,i),r=null;for(var o in i)if(i.hasOwnProperty(o)){var s=i[o];o==="children"?typeof s=="string"?l.textContent!==s&&(i.suppressHydrationWarning!==!0&&Rl(l.textContent,s,e),r=["children",s]):typeof s=="number"&&l.textContent!==""+s&&(i.suppressHydrationWarning!==!0&&Rl(l.textContent,s,e),r=["children",""+s]):Qn.hasOwnProperty(o)&&s!=null&&o==="onScroll"&&$("scroll",l)}switch(n){case"input":kl(l),Ss(l,i,!0);break;case"textarea":kl(l),js(l);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(l.onclick=ir)}l=r,t.updateQueue=l,l!==null&&(t.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=eu(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof l.is=="string"?e=o.createElement(n,{is:l.is}):(e=o.createElement(n),n==="select"&&(o=e,l.multiple?o.multiple=!0:l.size&&(o.size=l.size))):e=o.createElementNS(e,n),e[Ue]=t,e[tl]=l,jc(e,t,!1,!1),t.stateNode=e;e:{switch(o=Li(n,l),n){case"dialog":$("cancel",e),$("close",e),r=l;break;case"iframe":case"object":case"embed":$("load",e),r=l;break;case"video":case"audio":for(r=0;r<On.length;r++)$(On[r],e);r=l;break;case"source":$("error",e),r=l;break;case"img":case"image":case"link":$("error",e),$("load",e),r=l;break;case"details":$("toggle",e),r=l;break;case"input":ks(e,l),r=ji(e,l),$("invalid",e);break;case"option":r=l;break;case"select":e._wrapperState={wasMultiple:!!l.multiple},r=W({},l,{value:void 0}),$("invalid",e);break;case"textarea":Ns(e,l),r=_i(e,l),$("invalid",e);break;default:r=l}Ri(n,r),s=r;for(i in s)if(s.hasOwnProperty(i)){var u=s[i];i==="style"?lu(e,u):i==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&tu(e,u)):i==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&qn(e,u):typeof u=="number"&&qn(e,""+u):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(Qn.hasOwnProperty(i)?u!=null&&i==="onScroll"&&$("scroll",e):u!=null&&wo(e,i,u,o))}switch(n){case"input":kl(e),Ss(e,l,!1);break;case"textarea":kl(e),js(e);break;case"option":l.value!=null&&e.setAttribute("value",""+St(l.value));break;case"select":e.multiple=!!l.multiple,i=l.value,i!=null?rn(e,!!l.multiple,i,!1):l.defaultValue!=null&&rn(e,!!l.multiple,l.defaultValue,!0);break;default:typeof r.onClick=="function"&&(e.onclick=ir)}switch(n){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus;break e;case"img":l=!0;break e;default:l=!1}}l&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return ie(t),null;case 6:if(e&&t.stateNode!=null)Cc(e,t,e.memoizedProps,l);else{if(typeof l!="string"&&t.stateNode===null)throw Error(S(166));if(n=It(ll.current),It(He.current),Ll(t)){if(l=t.stateNode,n=t.memoizedProps,l[Ue]=t,(i=l.nodeValue!==n)&&(e=we,e!==null))switch(e.tag){case 3:Rl(l.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Rl(l.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else l=(n.nodeType===9?n:n.ownerDocument).createTextNode(l),l[Ue]=t,t.stateNode=l}return ie(t),null;case 13:if(A(B),l=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(U&&xe!==null&&t.mode&1&&!(t.flags&128))Wu(),pn(),t.flags|=98560,i=!1;else if(i=Ll(t),l!==null&&l.dehydrated!==null){if(e===null){if(!i)throw Error(S(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(S(317));i[Ue]=t}else pn(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;ie(t),i=!1}else Ie!==null&&(co(Ie),Ie=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(l=l!==null,l!==(e!==null&&e.memoizedState!==null)&&l&&(t.child.flags|=8192,t.mode&1&&(e===null||B.current&1?J===0&&(J=3):ns())),t.updateQueue!==null&&(t.flags|=4),ie(t),null);case 4:return mn(),no(e,t),e===null&&bn(t.stateNode.containerInfo),ie(t),null;case 10:return Ao(t.type._context),ie(t),null;case 17:return ve(t.type)&&or(),ie(t),null;case 19:if(A(B),i=t.memoizedState,i===null)return ie(t),null;if(l=(t.flags&128)!==0,o=i.rendering,o===null)if(l)Rn(i,!1);else{if(J!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=pr(e),o!==null){for(t.flags|=128,Rn(i,!1),l=o.updateQueue,l!==null&&(t.updateQueue=l,t.flags|=4),t.subtreeFlags=0,l=n,n=t.child;n!==null;)i=n,e=l,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,e=o.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return M(B,B.current&1|2),t.child}e=e.sibling}i.tail!==null&&K()>gn&&(t.flags|=128,l=!0,Rn(i,!1),t.lanes=4194304)}else{if(!l)if(e=pr(o),e!==null){if(t.flags|=128,l=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Rn(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!U)return ie(t),null}else 2*K()-i.renderingStartTime>gn&&n!==1073741824&&(t.flags|=128,l=!0,Rn(i,!1),t.lanes=4194304);i.isBackwards?(o.sibling=t.child,t.child=o):(n=i.last,n!==null?n.sibling=o:t.child=o,i.last=o)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=K(),t.sibling=null,n=B.current,M(B,l?n&1|2:n&1),t):(ie(t),null);case 22:case 23:return ts(),l=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==l&&(t.flags|=8192),l&&t.mode&1?ye&1073741824&&(ie(t),t.subtreeFlags&6&&(t.flags|=8192)):ie(t),null;case 24:return null;case 25:return null}throw Error(S(156,t.tag))}function gp(e,t){switch(Oo(t),t.tag){case 1:return ve(t.type)&&or(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return mn(),A(me),A(se),Wo(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Vo(t),null;case 13:if(A(B),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(S(340));pn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return A(B),null;case 4:return mn(),null;case 10:return Ao(t.type._context),null;case 22:case 23:return ts(),null;case 24:return null;default:return null}}var Dl=!1,oe=!1,yp=typeof WeakSet=="function"?WeakSet:Set,E=null;function nn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(l){Q(e,t,l)}else n.current=null}function lo(e,t,n){try{n()}catch(l){Q(e,t,l)}}var pa=!1;function xp(e,t){if(Ui=nr,e=Tu(),Do(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var l=n.getSelection&&n.getSelection();if(l&&l.rangeCount!==0){n=l.anchorNode;var r=l.anchorOffset,i=l.focusNode;l=l.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var o=0,s=-1,u=-1,c=0,h=0,v=e,m=null;t:for(;;){for(var k;v!==n||r!==0&&v.nodeType!==3||(s=o+r),v!==i||l!==0&&v.nodeType!==3||(u=o+l),v.nodeType===3&&(o+=v.nodeValue.length),(k=v.firstChild)!==null;)m=v,v=k;for(;;){if(v===e)break t;if(m===n&&++c===r&&(s=o),m===i&&++h===l&&(u=o),(k=v.nextSibling)!==null)break;v=m,m=v.parentNode}v=k}n=s===-1||u===-1?null:{start:s,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(Bi={focusedElem:e,selectionRange:n},nr=!1,E=t;E!==null;)if(t=E,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,E=e;else for(;E!==null;){t=E;try{var y=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(y!==null){var w=y.memoizedProps,j=y.memoizedState,f=t.stateNode,d=f.getSnapshotBeforeUpdate(t.elementType===t.type?w:ze(t.type,w),j);f.__reactInternalSnapshotBeforeUpdate=d}break;case 3:var p=t.stateNode.containerInfo;p.nodeType===1?p.textContent="":p.nodeType===9&&p.documentElement&&p.removeChild(p.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(S(163))}}catch(x){Q(t,t.return,x)}if(e=t.sibling,e!==null){e.return=t.return,E=e;break}E=t.return}return y=pa,pa=!1,y}function Hn(e,t,n){var l=t.updateQueue;if(l=l!==null?l.lastEffect:null,l!==null){var r=l=l.next;do{if((r.tag&e)===e){var i=r.destroy;r.destroy=void 0,i!==void 0&&lo(t,n,i)}r=r.next}while(r!==l)}}function Tr(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var l=n.create;n.destroy=l()}n=n.next}while(n!==t)}}function ro(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function _c(e){var t=e.alternate;t!==null&&(e.alternate=null,_c(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Ue],delete t[tl],delete t[Wi],delete t[tp],delete t[np])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Pc(e){return e.tag===5||e.tag===3||e.tag===4}function ha(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Pc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function io(e,t,n){var l=e.tag;if(l===5||l===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=ir));else if(l!==4&&(e=e.child,e!==null))for(io(e,t,n),e=e.sibling;e!==null;)io(e,t,n),e=e.sibling}function oo(e,t,n){var l=e.tag;if(l===5||l===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(l!==4&&(e=e.child,e!==null))for(oo(e,t,n),e=e.sibling;e!==null;)oo(e,t,n),e=e.sibling}var te=null,De=!1;function ot(e,t,n){for(n=n.child;n!==null;)Rc(e,t,n),n=n.sibling}function Rc(e,t,n){if(Be&&typeof Be.onCommitFiberUnmount=="function")try{Be.onCommitFiberUnmount(Nr,n)}catch{}switch(n.tag){case 5:oe||nn(n,t);case 6:var l=te,r=De;te=null,ot(e,t,n),te=l,De=r,te!==null&&(De?(e=te,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):te.removeChild(n.stateNode));break;case 18:te!==null&&(De?(e=te,n=n.stateNode,e.nodeType===8?oi(e.parentNode,n):e.nodeType===1&&oi(e,n),Gn(e)):oi(te,n.stateNode));break;case 4:l=te,r=De,te=n.stateNode.containerInfo,De=!0,ot(e,t,n),te=l,De=r;break;case 0:case 11:case 14:case 15:if(!oe&&(l=n.updateQueue,l!==null&&(l=l.lastEffect,l!==null))){r=l=l.next;do{var i=r,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&lo(n,t,o),r=r.next}while(r!==l)}ot(e,t,n);break;case 1:if(!oe&&(nn(n,t),l=n.stateNode,typeof l.componentWillUnmount=="function"))try{l.props=n.memoizedProps,l.state=n.memoizedState,l.componentWillUnmount()}catch(s){Q(n,t,s)}ot(e,t,n);break;case 21:ot(e,t,n);break;case 22:n.mode&1?(oe=(l=oe)||n.memoizedState!==null,ot(e,t,n),oe=l):ot(e,t,n);break;default:ot(e,t,n)}}function ma(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new yp),t.forEach(function(l){var r=Pp.bind(null,e,l);n.has(l)||(n.add(l),l.then(r,r))})}}function Te(e,t){var n=t.deletions;if(n!==null)for(var l=0;l<n.length;l++){var r=n[l];try{var i=e,o=t,s=o;e:for(;s!==null;){switch(s.tag){case 5:te=s.stateNode,De=!1;break e;case 3:te=s.stateNode.containerInfo,De=!0;break e;case 4:te=s.stateNode.containerInfo,De=!0;break e}s=s.return}if(te===null)throw Error(S(160));Rc(i,o,r),te=null,De=!1;var u=r.alternate;u!==null&&(u.return=null),r.return=null}catch(c){Q(r,t,c)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Lc(t,e),t=t.sibling}function Lc(e,t){var n=e.alternate,l=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Te(t,e),$e(e),l&4){try{Hn(3,e,e.return),Tr(3,e)}catch(w){Q(e,e.return,w)}try{Hn(5,e,e.return)}catch(w){Q(e,e.return,w)}}break;case 1:Te(t,e),$e(e),l&512&&n!==null&&nn(n,n.return);break;case 5:if(Te(t,e),$e(e),l&512&&n!==null&&nn(n,n.return),e.flags&32){var r=e.stateNode;try{qn(r,"")}catch(w){Q(e,e.return,w)}}if(l&4&&(r=e.stateNode,r!=null)){var i=e.memoizedProps,o=n!==null?n.memoizedProps:i,s=e.type,u=e.updateQueue;if(e.updateQueue=null,u!==null)try{s==="input"&&i.type==="radio"&&i.name!=null&&Za(r,i),Li(s,o);var c=Li(s,i);for(o=0;o<u.length;o+=2){var h=u[o],v=u[o+1];h==="style"?lu(r,v):h==="dangerouslySetInnerHTML"?tu(r,v):h==="children"?qn(r,v):wo(r,h,v,c)}switch(s){case"input":Ei(r,i);break;case"textarea":ba(r,i);break;case"select":var m=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!i.multiple;var k=i.value;k!=null?rn(r,!!i.multiple,k,!1):m!==!!i.multiple&&(i.defaultValue!=null?rn(r,!!i.multiple,i.defaultValue,!0):rn(r,!!i.multiple,i.multiple?[]:"",!1))}r[tl]=i}catch(w){Q(e,e.return,w)}}break;case 6:if(Te(t,e),$e(e),l&4){if(e.stateNode===null)throw Error(S(162));r=e.stateNode,i=e.memoizedProps;try{r.nodeValue=i}catch(w){Q(e,e.return,w)}}break;case 3:if(Te(t,e),$e(e),l&4&&n!==null&&n.memoizedState.isDehydrated)try{Gn(t.containerInfo)}catch(w){Q(e,e.return,w)}break;case 4:Te(t,e),$e(e);break;case 13:Te(t,e),$e(e),r=e.child,r.flags&8192&&(i=r.memoizedState!==null,r.stateNode.isHidden=i,!i||r.alternate!==null&&r.alternate.memoizedState!==null||(bo=K())),l&4&&ma(e);break;case 22:if(h=n!==null&&n.memoizedState!==null,e.mode&1?(oe=(c=oe)||h,Te(t,e),oe=c):Te(t,e),$e(e),l&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!h&&e.mode&1)for(E=e,h=e.child;h!==null;){for(v=E=h;E!==null;){switch(m=E,k=m.child,m.tag){case 0:case 11:case 14:case 15:Hn(4,m,m.return);break;case 1:nn(m,m.return);var y=m.stateNode;if(typeof y.componentWillUnmount=="function"){l=m,n=m.return;try{t=l,y.props=t.memoizedProps,y.state=t.memoizedState,y.componentWillUnmount()}catch(w){Q(l,n,w)}}break;case 5:nn(m,m.return);break;case 22:if(m.memoizedState!==null){ga(v);continue}}k!==null?(k.return=m,E=k):ga(v)}h=h.sibling}e:for(h=null,v=e;;){if(v.tag===5){if(h===null){h=v;try{r=v.stateNode,c?(i=r.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(s=v.stateNode,u=v.memoizedProps.style,o=u!=null&&u.hasOwnProperty("display")?u.display:null,s.style.display=nu("display",o))}catch(w){Q(e,e.return,w)}}}else if(v.tag===6){if(h===null)try{v.stateNode.nodeValue=c?"":v.memoizedProps}catch(w){Q(e,e.return,w)}}else if((v.tag!==22&&v.tag!==23||v.memoizedState===null||v===e)&&v.child!==null){v.child.return=v,v=v.child;continue}if(v===e)break e;for(;v.sibling===null;){if(v.return===null||v.return===e)break e;h===v&&(h=null),v=v.return}h===v&&(h=null),v.sibling.return=v.return,v=v.sibling}}break;case 19:Te(t,e),$e(e),l&4&&ma(e);break;case 21:break;default:Te(t,e),$e(e)}}function $e(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Pc(n)){var l=n;break e}n=n.return}throw Error(S(160))}switch(l.tag){case 5:var r=l.stateNode;l.flags&32&&(qn(r,""),l.flags&=-33);var i=ha(e);oo(e,i,r);break;case 3:case 4:var o=l.stateNode.containerInfo,s=ha(e);io(e,s,o);break;default:throw Error(S(161))}}catch(u){Q(e,e.return,u)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function wp(e,t,n){E=e,Tc(e)}function Tc(e,t,n){for(var l=(e.mode&1)!==0;E!==null;){var r=E,i=r.child;if(r.tag===22&&l){var o=r.memoizedState!==null||Dl;if(!o){var s=r.alternate,u=s!==null&&s.memoizedState!==null||oe;s=Dl;var c=oe;if(Dl=o,(oe=u)&&!c)for(E=r;E!==null;)o=E,u=o.child,o.tag===22&&o.memoizedState!==null?ya(r):u!==null?(u.return=o,E=u):ya(r);for(;i!==null;)E=i,Tc(i),i=i.sibling;E=r,Dl=s,oe=c}va(e)}else r.subtreeFlags&8772&&i!==null?(i.return=r,E=i):va(e)}}function va(e){for(;E!==null;){var t=E;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:oe||Tr(5,t);break;case 1:var l=t.stateNode;if(t.flags&4&&!oe)if(n===null)l.componentDidMount();else{var r=t.elementType===t.type?n.memoizedProps:ze(t.type,n.memoizedProps);l.componentDidUpdate(r,n.memoizedState,l.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&ea(t,i,l);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}ea(t,o,n)}break;case 5:var s=t.stateNode;if(n===null&&t.flags&4){n=s;var u=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var c=t.alternate;if(c!==null){var h=c.memoizedState;if(h!==null){var v=h.dehydrated;v!==null&&Gn(v)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(S(163))}oe||t.flags&512&&ro(t)}catch(m){Q(t,t.return,m)}}if(t===e){E=null;break}if(n=t.sibling,n!==null){n.return=t.return,E=n;break}E=t.return}}function ga(e){for(;E!==null;){var t=E;if(t===e){E=null;break}var n=t.sibling;if(n!==null){n.return=t.return,E=n;break}E=t.return}}function ya(e){for(;E!==null;){var t=E;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Tr(4,t)}catch(u){Q(t,n,u)}break;case 1:var l=t.stateNode;if(typeof l.componentDidMount=="function"){var r=t.return;try{l.componentDidMount()}catch(u){Q(t,r,u)}}var i=t.return;try{ro(t)}catch(u){Q(t,i,u)}break;case 5:var o=t.return;try{ro(t)}catch(u){Q(t,o,u)}}}catch(u){Q(t,t.return,u)}if(t===e){E=null;break}var s=t.sibling;if(s!==null){s.return=t.return,E=s;break}E=t.return}}var kp=Math.ceil,vr=it.ReactCurrentDispatcher,Jo=it.ReactCurrentOwner,Pe=it.ReactCurrentBatchConfig,O=0,ee=null,Y=null,ne=0,ye=0,ln=Et(0),J=0,sl=null,Ut=0,zr=0,Zo=0,Vn=null,pe=null,bo=0,gn=1/0,Ke=null,gr=!1,so=null,xt=null,Il=!1,pt=null,yr=0,Wn=0,ao=null,ql=-1,Kl=0;function ce(){return O&6?K():ql!==-1?ql:ql=K()}function wt(e){return e.mode&1?O&2&&ne!==0?ne&-ne:rp.transition!==null?(Kl===0&&(Kl=mu()),Kl):(e=F,e!==0||(e=window.event,e=e===void 0?16:Su(e.type)),e):1}function Fe(e,t,n,l){if(50<Wn)throw Wn=0,ao=null,Error(S(185));cl(e,n,l),(!(O&2)||e!==ee)&&(e===ee&&(!(O&2)&&(zr|=n),J===4&&dt(e,ne)),ge(e,l),n===1&&O===0&&!(t.mode&1)&&(gn=K()+500,Pr&&Ct()))}function ge(e,t){var n=e.callbackNode;lf(e,t);var l=tr(e,e===ee?ne:0);if(l===0)n!==null&&_s(n),e.callbackNode=null,e.callbackPriority=0;else if(t=l&-l,e.callbackPriority!==t){if(n!=null&&_s(n),t===1)e.tag===0?lp(xa.bind(null,e)):Bu(xa.bind(null,e)),bf(function(){!(O&6)&&Ct()}),n=null;else{switch(vu(l)){case 1:n=Eo;break;case 4:n=pu;break;case 16:n=er;break;case 536870912:n=hu;break;default:n=er}n=Ac(n,zc.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function zc(e,t){if(ql=-1,Kl=0,O&6)throw Error(S(327));var n=e.callbackNode;if(cn()&&e.callbackNode!==n)return null;var l=tr(e,e===ee?ne:0);if(l===0)return null;if(l&30||l&e.expiredLanes||t)t=xr(e,l);else{t=l;var r=O;O|=2;var i=Ic();(ee!==e||ne!==t)&&(Ke=null,gn=K()+500,Ot(e,t));do try{jp();break}catch(s){Dc(e,s)}while(!0);$o(),vr.current=i,O=r,Y!==null?t=0:(ee=null,ne=0,t=J)}if(t!==0){if(t===2&&(r=Oi(e),r!==0&&(l=r,t=uo(e,r))),t===1)throw n=sl,Ot(e,0),dt(e,l),ge(e,K()),n;if(t===6)dt(e,l);else{if(r=e.current.alternate,!(l&30)&&!Sp(r)&&(t=xr(e,l),t===2&&(i=Oi(e),i!==0&&(l=i,t=uo(e,i))),t===1))throw n=sl,Ot(e,0),dt(e,l),ge(e,K()),n;switch(e.finishedWork=r,e.finishedLanes=l,t){case 0:case 1:throw Error(S(345));case 2:Tt(e,pe,Ke);break;case 3:if(dt(e,l),(l&130023424)===l&&(t=bo+500-K(),10<t)){if(tr(e,0)!==0)break;if(r=e.suspendedLanes,(r&l)!==l){ce(),e.pingedLanes|=e.suspendedLanes&r;break}e.timeoutHandle=Vi(Tt.bind(null,e,pe,Ke),t);break}Tt(e,pe,Ke);break;case 4:if(dt(e,l),(l&4194240)===l)break;for(t=e.eventTimes,r=-1;0<l;){var o=31-Oe(l);i=1<<o,o=t[o],o>r&&(r=o),l&=~i}if(l=r,l=K()-l,l=(120>l?120:480>l?480:1080>l?1080:1920>l?1920:3e3>l?3e3:4320>l?4320:1960*kp(l/1960))-l,10<l){e.timeoutHandle=Vi(Tt.bind(null,e,pe,Ke),l);break}Tt(e,pe,Ke);break;case 5:Tt(e,pe,Ke);break;default:throw Error(S(329))}}}return ge(e,K()),e.callbackNode===n?zc.bind(null,e):null}function uo(e,t){var n=Vn;return e.current.memoizedState.isDehydrated&&(Ot(e,t).flags|=256),e=xr(e,t),e!==2&&(t=pe,pe=n,t!==null&&co(t)),e}function co(e){pe===null?pe=e:pe.push.apply(pe,e)}function Sp(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var l=0;l<n.length;l++){var r=n[l],i=r.getSnapshot;r=r.value;try{if(!Me(i(),r))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function dt(e,t){for(t&=~Zo,t&=~zr,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Oe(t),l=1<<n;e[n]=-1,t&=~l}}function xa(e){if(O&6)throw Error(S(327));cn();var t=tr(e,0);if(!(t&1))return ge(e,K()),null;var n=xr(e,t);if(e.tag!==0&&n===2){var l=Oi(e);l!==0&&(t=l,n=uo(e,l))}if(n===1)throw n=sl,Ot(e,0),dt(e,t),ge(e,K()),n;if(n===6)throw Error(S(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Tt(e,pe,Ke),ge(e,K()),null}function es(e,t){var n=O;O|=1;try{return e(t)}finally{O=n,O===0&&(gn=K()+500,Pr&&Ct())}}function Bt(e){pt!==null&&pt.tag===0&&!(O&6)&&cn();var t=O;O|=1;var n=Pe.transition,l=F;try{if(Pe.transition=null,F=1,e)return e()}finally{F=l,Pe.transition=n,O=t,!(O&6)&&Ct()}}function ts(){ye=ln.current,A(ln)}function Ot(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Zf(n)),Y!==null)for(n=Y.return;n!==null;){var l=n;switch(Oo(l),l.tag){case 1:l=l.type.childContextTypes,l!=null&&or();break;case 3:mn(),A(me),A(se),Wo();break;case 5:Vo(l);break;case 4:mn();break;case 13:A(B);break;case 19:A(B);break;case 10:Ao(l.type._context);break;case 22:case 23:ts()}n=n.return}if(ee=e,Y=e=kt(e.current,null),ne=ye=t,J=0,sl=null,Zo=zr=Ut=0,pe=Vn=null,Dt!==null){for(t=0;t<Dt.length;t++)if(n=Dt[t],l=n.interleaved,l!==null){n.interleaved=null;var r=l.next,i=n.pending;if(i!==null){var o=i.next;i.next=r,l.next=o}n.pending=l}Dt=null}return e}function Dc(e,t){do{var n=Y;try{if($o(),Vl.current=mr,hr){for(var l=H.memoizedState;l!==null;){var r=l.queue;r!==null&&(r.pending=null),l=l.next}hr=!1}if(At=0,b=X=H=null,Bn=!1,rl=0,Jo.current=null,n===null||n.return===null){J=1,sl=t,Y=null;break}e:{var i=e,o=n.return,s=n,u=t;if(t=ne,s.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var c=u,h=s,v=h.tag;if(!(h.mode&1)&&(v===0||v===11||v===15)){var m=h.alternate;m?(h.updateQueue=m.updateQueue,h.memoizedState=m.memoizedState,h.lanes=m.lanes):(h.updateQueue=null,h.memoizedState=null)}var k=oa(o);if(k!==null){k.flags&=-257,sa(k,o,s,i,t),k.mode&1&&ia(i,c,t),t=k,u=c;var y=t.updateQueue;if(y===null){var w=new Set;w.add(u),t.updateQueue=w}else y.add(u);break e}else{if(!(t&1)){ia(i,c,t),ns();break e}u=Error(S(426))}}else if(U&&s.mode&1){var j=oa(o);if(j!==null){!(j.flags&65536)&&(j.flags|=256),sa(j,o,s,i,t),Fo(vn(u,s));break e}}i=u=vn(u,s),J!==4&&(J=2),Vn===null?Vn=[i]:Vn.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var f=vc(i,u,t);bs(i,f);break e;case 1:s=u;var d=i.type,p=i.stateNode;if(!(i.flags&128)&&(typeof d.getDerivedStateFromError=="function"||p!==null&&typeof p.componentDidCatch=="function"&&(xt===null||!xt.has(p)))){i.flags|=65536,t&=-t,i.lanes|=t;var x=gc(i,s,t);bs(i,x);break e}}i=i.return}while(i!==null)}Fc(n)}catch(N){t=N,Y===n&&n!==null&&(Y=n=n.return);continue}break}while(!0)}function Ic(){var e=vr.current;return vr.current=mr,e===null?mr:e}function ns(){(J===0||J===3||J===2)&&(J=4),ee===null||!(Ut&268435455)&&!(zr&268435455)||dt(ee,ne)}function xr(e,t){var n=O;O|=2;var l=Ic();(ee!==e||ne!==t)&&(Ke=null,Ot(e,t));do try{Np();break}catch(r){Dc(e,r)}while(!0);if($o(),O=n,vr.current=l,Y!==null)throw Error(S(261));return ee=null,ne=0,J}function Np(){for(;Y!==null;)Oc(Y)}function jp(){for(;Y!==null&&!Yd();)Oc(Y)}function Oc(e){var t=$c(e.alternate,e,ye);e.memoizedProps=e.pendingProps,t===null?Fc(e):Y=t,Jo.current=null}function Fc(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=gp(n,t),n!==null){n.flags&=32767,Y=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{J=6,Y=null;return}}else if(n=vp(n,t,ye),n!==null){Y=n;return}if(t=t.sibling,t!==null){Y=t;return}Y=t=e}while(t!==null);J===0&&(J=5)}function Tt(e,t,n){var l=F,r=Pe.transition;try{Pe.transition=null,F=1,Ep(e,t,n,l)}finally{Pe.transition=r,F=l}return null}function Ep(e,t,n,l){do cn();while(pt!==null);if(O&6)throw Error(S(327));n=e.finishedWork;var r=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(S(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(rf(e,i),e===ee&&(Y=ee=null,ne=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Il||(Il=!0,Ac(er,function(){return cn(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=Pe.transition,Pe.transition=null;var o=F;F=1;var s=O;O|=4,Jo.current=null,xp(e,n),Lc(n,e),Qf(Bi),nr=!!Ui,Bi=Ui=null,e.current=n,wp(n),Xd(),O=s,F=o,Pe.transition=i}else e.current=n;if(Il&&(Il=!1,pt=e,yr=r),i=e.pendingLanes,i===0&&(xt=null),Zd(n.stateNode),ge(e,K()),t!==null)for(l=e.onRecoverableError,n=0;n<t.length;n++)r=t[n],l(r.value,{componentStack:r.stack,digest:r.digest});if(gr)throw gr=!1,e=so,so=null,e;return yr&1&&e.tag!==0&&cn(),i=e.pendingLanes,i&1?e===ao?Wn++:(Wn=0,ao=e):Wn=0,Ct(),null}function cn(){if(pt!==null){var e=vu(yr),t=Pe.transition,n=F;try{if(Pe.transition=null,F=16>e?16:e,pt===null)var l=!1;else{if(e=pt,pt=null,yr=0,O&6)throw Error(S(331));var r=O;for(O|=4,E=e.current;E!==null;){var i=E,o=i.child;if(E.flags&16){var s=i.deletions;if(s!==null){for(var u=0;u<s.length;u++){var c=s[u];for(E=c;E!==null;){var h=E;switch(h.tag){case 0:case 11:case 15:Hn(8,h,i)}var v=h.child;if(v!==null)v.return=h,E=v;else for(;E!==null;){h=E;var m=h.sibling,k=h.return;if(_c(h),h===c){E=null;break}if(m!==null){m.return=k,E=m;break}E=k}}}var y=i.alternate;if(y!==null){var w=y.child;if(w!==null){y.child=null;do{var j=w.sibling;w.sibling=null,w=j}while(w!==null)}}E=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,E=o;else e:for(;E!==null;){if(i=E,i.flags&2048)switch(i.tag){case 0:case 11:case 15:Hn(9,i,i.return)}var f=i.sibling;if(f!==null){f.return=i.return,E=f;break e}E=i.return}}var d=e.current;for(E=d;E!==null;){o=E;var p=o.child;if(o.subtreeFlags&2064&&p!==null)p.return=o,E=p;else e:for(o=d;E!==null;){if(s=E,s.flags&2048)try{switch(s.tag){case 0:case 11:case 15:Tr(9,s)}}catch(N){Q(s,s.return,N)}if(s===o){E=null;break e}var x=s.sibling;if(x!==null){x.return=s.return,E=x;break e}E=s.return}}if(O=r,Ct(),Be&&typeof Be.onPostCommitFiberRoot=="function")try{Be.onPostCommitFiberRoot(Nr,e)}catch{}l=!0}return l}finally{F=n,Pe.transition=t}}return!1}function wa(e,t,n){t=vn(n,t),t=vc(e,t,1),e=yt(e,t,1),t=ce(),e!==null&&(cl(e,1,t),ge(e,t))}function Q(e,t,n){if(e.tag===3)wa(e,e,n);else for(;t!==null;){if(t.tag===3){wa(t,e,n);break}else if(t.tag===1){var l=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(xt===null||!xt.has(l))){e=vn(n,e),e=gc(t,e,1),t=yt(t,e,1),e=ce(),t!==null&&(cl(t,1,e),ge(t,e));break}}t=t.return}}function Cp(e,t,n){var l=e.pingCache;l!==null&&l.delete(t),t=ce(),e.pingedLanes|=e.suspendedLanes&n,ee===e&&(ne&n)===n&&(J===4||J===3&&(ne&130023424)===ne&&500>K()-bo?Ot(e,0):Zo|=n),ge(e,t)}function Mc(e,t){t===0&&(e.mode&1?(t=jl,jl<<=1,!(jl&130023424)&&(jl=4194304)):t=1);var n=ce();e=nt(e,t),e!==null&&(cl(e,t,n),ge(e,n))}function _p(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Mc(e,n)}function Pp(e,t){var n=0;switch(e.tag){case 13:var l=e.stateNode,r=e.memoizedState;r!==null&&(n=r.retryLane);break;case 19:l=e.stateNode;break;default:throw Error(S(314))}l!==null&&l.delete(t),Mc(e,n)}var $c;$c=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||me.current)he=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return he=!1,mp(e,t,n);he=!!(e.flags&131072)}else he=!1,U&&t.flags&1048576&&Hu(t,ur,t.index);switch(t.lanes=0,t.tag){case 2:var l=t.type;Ql(e,t),e=t.pendingProps;var r=fn(t,se.current);un(t,n),r=qo(null,t,l,e,r,n);var i=Ko();return t.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,ve(l)?(i=!0,sr(t)):i=!1,t.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Bo(t),r.updater=Lr,t.stateNode=r,r._reactInternals=t,Gi(t,l,e,n),t=bi(null,t,l,!0,i,n)):(t.tag=0,U&&i&&Io(t),ue(null,t,r,n),t=t.child),t;case 16:l=t.elementType;e:{switch(Ql(e,t),e=t.pendingProps,r=l._init,l=r(l._payload),t.type=l,r=t.tag=Lp(l),e=ze(l,e),r){case 0:t=Zi(null,t,l,e,n);break e;case 1:t=ca(null,t,l,e,n);break e;case 11:t=aa(null,t,l,e,n);break e;case 14:t=ua(null,t,l,ze(l.type,e),n);break e}throw Error(S(306,l,""))}return t;case 0:return l=t.type,r=t.pendingProps,r=t.elementType===l?r:ze(l,r),Zi(e,t,l,r,n);case 1:return l=t.type,r=t.pendingProps,r=t.elementType===l?r:ze(l,r),ca(e,t,l,r,n);case 3:e:{if(kc(t),e===null)throw Error(S(387));l=t.pendingProps,i=t.memoizedState,r=i.element,Yu(e,t),fr(t,l,null,n);var o=t.memoizedState;if(l=o.element,i.isDehydrated)if(i={element:l,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){r=vn(Error(S(423)),t),t=da(e,t,l,n,r);break e}else if(l!==r){r=vn(Error(S(424)),t),t=da(e,t,l,n,r);break e}else for(xe=gt(t.stateNode.containerInfo.firstChild),we=t,U=!0,Ie=null,n=qu(t,null,l,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(pn(),l===r){t=lt(e,t,n);break e}ue(e,t,l,n)}t=t.child}return t;case 5:return Xu(t),e===null&&Ki(t),l=t.type,r=t.pendingProps,i=e!==null?e.memoizedProps:null,o=r.children,Hi(l,r)?o=null:i!==null&&Hi(l,i)&&(t.flags|=32),wc(e,t),ue(e,t,o,n),t.child;case 6:return e===null&&Ki(t),null;case 13:return Sc(e,t,n);case 4:return Ho(t,t.stateNode.containerInfo),l=t.pendingProps,e===null?t.child=hn(t,null,l,n):ue(e,t,l,n),t.child;case 11:return l=t.type,r=t.pendingProps,r=t.elementType===l?r:ze(l,r),aa(e,t,l,r,n);case 7:return ue(e,t,t.pendingProps,n),t.child;case 8:return ue(e,t,t.pendingProps.children,n),t.child;case 12:return ue(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(l=t.type._context,r=t.pendingProps,i=t.memoizedProps,o=r.value,M(cr,l._currentValue),l._currentValue=o,i!==null)if(Me(i.value,o)){if(i.children===r.children&&!me.current){t=lt(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var s=i.dependencies;if(s!==null){o=i.child;for(var u=s.firstContext;u!==null;){if(u.context===l){if(i.tag===1){u=Ze(-1,n&-n),u.tag=2;var c=i.updateQueue;if(c!==null){c=c.shared;var h=c.pending;h===null?u.next=u:(u.next=h.next,h.next=u),c.pending=u}}i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),Yi(i.return,n,t),s.lanes|=n;break}u=u.next}}else if(i.tag===10)o=i.type===t.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(S(341));o.lanes|=n,s=o.alternate,s!==null&&(s.lanes|=n),Yi(o,n,t),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===t){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}ue(e,t,r.children,n),t=t.child}return t;case 9:return r=t.type,l=t.pendingProps.children,un(t,n),r=Re(r),l=l(r),t.flags|=1,ue(e,t,l,n),t.child;case 14:return l=t.type,r=ze(l,t.pendingProps),r=ze(l.type,r),ua(e,t,l,r,n);case 15:return yc(e,t,t.type,t.pendingProps,n);case 17:return l=t.type,r=t.pendingProps,r=t.elementType===l?r:ze(l,r),Ql(e,t),t.tag=1,ve(l)?(e=!0,sr(t)):e=!1,un(t,n),mc(t,l,r),Gi(t,l,r,n),bi(null,t,l,!0,e,n);case 19:return Nc(e,t,n);case 22:return xc(e,t,n)}throw Error(S(156,t.tag))};function Ac(e,t){return fu(e,t)}function Rp(e,t,n,l){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function _e(e,t,n,l){return new Rp(e,t,n,l)}function ls(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Lp(e){if(typeof e=="function")return ls(e)?1:0;if(e!=null){if(e=e.$$typeof,e===So)return 11;if(e===No)return 14}return 2}function kt(e,t){var n=e.alternate;return n===null?(n=_e(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Yl(e,t,n,l,r,i){var o=2;if(l=e,typeof e=="function")ls(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case Kt:return Ft(n.children,r,i,t);case ko:o=8,r|=8;break;case wi:return e=_e(12,n,t,r|2),e.elementType=wi,e.lanes=i,e;case ki:return e=_e(13,n,t,r),e.elementType=ki,e.lanes=i,e;case Si:return e=_e(19,n,t,r),e.elementType=Si,e.lanes=i,e;case Xa:return Dr(n,r,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Ka:o=10;break e;case Ya:o=9;break e;case So:o=11;break e;case No:o=14;break e;case at:o=16,l=null;break e}throw Error(S(130,e==null?e:typeof e,""))}return t=_e(o,n,t,r),t.elementType=e,t.type=l,t.lanes=i,t}function Ft(e,t,n,l){return e=_e(7,e,l,t),e.lanes=n,e}function Dr(e,t,n,l){return e=_e(22,e,l,t),e.elementType=Xa,e.lanes=n,e.stateNode={isHidden:!1},e}function hi(e,t,n){return e=_e(6,e,null,t),e.lanes=n,e}function mi(e,t,n){return t=_e(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Tp(e,t,n,l,r){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Xr(0),this.expirationTimes=Xr(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Xr(0),this.identifierPrefix=l,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function rs(e,t,n,l,r,i,o,s,u){return e=new Tp(e,t,n,s,u),t===1?(t=1,i===!0&&(t|=8)):t=0,i=_e(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:l,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Bo(i),e}function zp(e,t,n){var l=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:qt,key:l==null?null:""+l,children:e,containerInfo:t,implementation:n}}function Uc(e){if(!e)return Nt;e=e._reactInternals;e:{if(Vt(e)!==e||e.tag!==1)throw Error(S(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(ve(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(S(171))}if(e.tag===1){var n=e.type;if(ve(n))return Uu(e,n,t)}return t}function Bc(e,t,n,l,r,i,o,s,u){return e=rs(n,l,!0,e,r,i,o,s,u),e.context=Uc(null),n=e.current,l=ce(),r=wt(n),i=Ze(l,r),i.callback=t??null,yt(n,i,r),e.current.lanes=r,cl(e,r,l),ge(e,l),e}function Ir(e,t,n,l){var r=t.current,i=ce(),o=wt(r);return n=Uc(n),t.context===null?t.context=n:t.pendingContext=n,t=Ze(i,o),t.payload={element:e},l=l===void 0?null:l,l!==null&&(t.callback=l),e=yt(r,t,o),e!==null&&(Fe(e,r,o,i),Hl(e,r,o)),o}function wr(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function ka(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function is(e,t){ka(e,t),(e=e.alternate)&&ka(e,t)}function Dp(){return null}var Hc=typeof reportError=="function"?reportError:function(e){console.error(e)};function os(e){this._internalRoot=e}Or.prototype.render=os.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(S(409));Ir(e,t,null,null)};Or.prototype.unmount=os.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Bt(function(){Ir(null,e,null,null)}),t[tt]=null}};function Or(e){this._internalRoot=e}Or.prototype.unstable_scheduleHydration=function(e){if(e){var t=xu();e={blockedOn:null,target:e,priority:t};for(var n=0;n<ct.length&&t!==0&&t<ct[n].priority;n++);ct.splice(n,0,e),n===0&&ku(e)}};function ss(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Fr(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Sa(){}function Ip(e,t,n,l,r){if(r){if(typeof l=="function"){var i=l;l=function(){var c=wr(o);i.call(c)}}var o=Bc(t,l,e,0,null,!1,!1,"",Sa);return e._reactRootContainer=o,e[tt]=o.current,bn(e.nodeType===8?e.parentNode:e),Bt(),o}for(;r=e.lastChild;)e.removeChild(r);if(typeof l=="function"){var s=l;l=function(){var c=wr(u);s.call(c)}}var u=rs(e,0,!1,null,null,!1,!1,"",Sa);return e._reactRootContainer=u,e[tt]=u.current,bn(e.nodeType===8?e.parentNode:e),Bt(function(){Ir(t,u,n,l)}),u}function Mr(e,t,n,l,r){var i=n._reactRootContainer;if(i){var o=i;if(typeof r=="function"){var s=r;r=function(){var u=wr(o);s.call(u)}}Ir(t,o,e,r)}else o=Ip(n,t,e,r,l);return wr(o)}gu=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=In(t.pendingLanes);n!==0&&(Co(t,n|1),ge(t,K()),!(O&6)&&(gn=K()+500,Ct()))}break;case 13:Bt(function(){var l=nt(e,1);if(l!==null){var r=ce();Fe(l,e,1,r)}}),is(e,1)}};_o=function(e){if(e.tag===13){var t=nt(e,134217728);if(t!==null){var n=ce();Fe(t,e,134217728,n)}is(e,134217728)}};yu=function(e){if(e.tag===13){var t=wt(e),n=nt(e,t);if(n!==null){var l=ce();Fe(n,e,t,l)}is(e,t)}};xu=function(){return F};wu=function(e,t){var n=F;try{return F=e,t()}finally{F=n}};zi=function(e,t,n){switch(t){case"input":if(Ei(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var l=n[t];if(l!==e&&l.form===e.form){var r=_r(l);if(!r)throw Error(S(90));Ja(l),Ei(l,r)}}}break;case"textarea":ba(e,n);break;case"select":t=n.value,t!=null&&rn(e,!!n.multiple,t,!1)}};ou=es;su=Bt;var Op={usingClientEntryPoint:!1,Events:[fl,Jt,_r,ru,iu,es]},Ln={findFiberByHostInstance:zt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Fp={bundleType:Ln.bundleType,version:Ln.version,rendererPackageName:Ln.rendererPackageName,rendererConfig:Ln.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:it.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=cu(e),e===null?null:e.stateNode},findFiberByHostInstance:Ln.findFiberByHostInstance||Dp,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ol=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ol.isDisabled&&Ol.supportsFiber)try{Nr=Ol.inject(Fp),Be=Ol}catch{}}Se.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Op;Se.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!ss(t))throw Error(S(200));return zp(e,t,null,n)};Se.createRoot=function(e,t){if(!ss(e))throw Error(S(299));var n=!1,l="",r=Hc;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(l=t.identifierPrefix),t.onRecoverableError!==void 0&&(r=t.onRecoverableError)),t=rs(e,1,!1,null,null,n,!1,l,r),e[tt]=t.current,bn(e.nodeType===8?e.parentNode:e),new os(t)};Se.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(S(188)):(e=Object.keys(e).join(","),Error(S(268,e)));return e=cu(t),e=e===null?null:e.stateNode,e};Se.flushSync=function(e){return Bt(e)};Se.hydrate=function(e,t,n){if(!Fr(t))throw Error(S(200));return Mr(null,e,t,!0,n)};Se.hydrateRoot=function(e,t,n){if(!ss(e))throw Error(S(405));var l=n!=null&&n.hydratedSources||null,r=!1,i="",o=Hc;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=Bc(t,null,e,1,n??null,r,!1,i,o),e[tt]=t.current,bn(e),l)for(e=0;e<l.length;e++)n=l[e],r=n._getVersion,r=r(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,r]:t.mutableSourceEagerHydrationData.push(n,r);return new Or(t)};Se.render=function(e,t,n){if(!Fr(t))throw Error(S(200));return Mr(null,e,t,!1,n)};Se.unmountComponentAtNode=function(e){if(!Fr(e))throw Error(S(40));return e._reactRootContainer?(Bt(function(){Mr(null,null,e,!1,function(){e._reactRootContainer=null,e[tt]=null})}),!0):!1};Se.unstable_batchedUpdates=es;Se.unstable_renderSubtreeIntoContainer=function(e,t,n,l){if(!Fr(n))throw Error(S(200));if(e==null||e._reactInternals===void 0)throw Error(S(38));return Mr(e,t,n,!1,l)};Se.version="18.3.1-next-f1338f8080-20240426";function Vc(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Vc)}catch(e){console.error(e)}}Vc(),Va.exports=Se;var Mp=Va.exports,Na=Mp;yi.createRoot=Na.createRoot,yi.hydrateRoot=Na.hydrateRoot;var as={};Object.defineProperty(as,"__esModule",{value:!0});as.parse=Wp;as.serialize=Qp;const $p=/^[\u0021-\u003A\u003C\u003E-\u007E]+$/,Ap=/^[\u0021-\u003A\u003C-\u007E]*$/,Up=/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,Bp=/^[\u0020-\u003A\u003D-\u007E]*$/,Hp=Object.prototype.toString,Vp=(()=>{const e=function(){};return e.prototype=Object.create(null),e})();function Wp(e,t){const n=new Vp,l=e.length;if(l<2)return n;const r=(t==null?void 0:t.decode)||qp;let i=0;do{const o=e.indexOf("=",i);if(o===-1)break;const s=e.indexOf(";",i),u=s===-1?l:s;if(o>u){i=e.lastIndexOf(";",o-1)+1;continue}const c=ja(e,i,o),h=Ea(e,o,c),v=e.slice(c,h);if(n[v]===void 0){let m=ja(e,o+1,u),k=Ea(e,u,m);const y=r(e.slice(m,k));n[v]=y}i=u+1}while(i<l);return n}function ja(e,t,n){do{const l=e.charCodeAt(t);if(l!==32&&l!==9)return t}while(++t<n);return n}function Ea(e,t,n){for(;t>n;){const l=e.charCodeAt(--t);if(l!==32&&l!==9)return t+1}return n}function Qp(e,t,n){const l=(n==null?void 0:n.encode)||encodeURIComponent;if(!$p.test(e))throw new TypeError(`argument name is invalid: ${e}`);const r=l(t);if(!Ap.test(r))throw new TypeError(`argument val is invalid: ${t}`);let i=e+"="+r;if(!n)return i;if(n.maxAge!==void 0){if(!Number.isInteger(n.maxAge))throw new TypeError(`option maxAge is invalid: ${n.maxAge}`);i+="; Max-Age="+n.maxAge}if(n.domain){if(!Up.test(n.domain))throw new TypeError(`option domain is invalid: ${n.domain}`);i+="; Domain="+n.domain}if(n.path){if(!Bp.test(n.path))throw new TypeError(`option path is invalid: ${n.path}`);i+="; Path="+n.path}if(n.expires){if(!Kp(n.expires)||!Number.isFinite(n.expires.valueOf()))throw new TypeError(`option expires is invalid: ${n.expires}`);i+="; Expires="+n.expires.toUTCString()}if(n.httpOnly&&(i+="; HttpOnly"),n.secure&&(i+="; Secure"),n.partitioned&&(i+="; Partitioned"),n.priority)switch(typeof n.priority=="string"?n.priority.toLowerCase():void 0){case"low":i+="; Priority=Low";break;case"medium":i+="; Priority=Medium";break;case"high":i+="; Priority=High";break;default:throw new TypeError(`option priority is invalid: ${n.priority}`)}if(n.sameSite)switch(typeof n.sameSite=="string"?n.sameSite.toLowerCase():n.sameSite){case!0:case"strict":i+="; SameSite=Strict";break;case"lax":i+="; SameSite=Lax";break;case"none":i+="; SameSite=None";break;default:throw new TypeError(`option sameSite is invalid: ${n.sameSite}`)}return i}function qp(e){if(e.indexOf("%")===-1)return e;try{return decodeURIComponent(e)}catch{return e}}function Kp(e){return Hp.call(e)==="[object Date]"}var Ca="popstate";function Yp(e={}){function t(l,r){let{pathname:i,search:o,hash:s}=l.location;return fo("",{pathname:i,search:o,hash:s},r.state&&r.state.usr||null,r.state&&r.state.key||"default")}function n(l,r){return typeof r=="string"?r:al(r)}return Gp(t,n,null,e)}function V(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Ve(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Xp(){return Math.random().toString(36).substring(2,10)}function _a(e,t){return{usr:e.state,key:e.key,idx:t}}function fo(e,t,n=null,l){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?kn(t):t,state:n,key:t&&t.key||l||Xp()}}function al({pathname:e="/",search:t="",hash:n=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),n&&n!=="#"&&(e+=n.charAt(0)==="#"?n:"#"+n),e}function kn(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let l=e.indexOf("?");l>=0&&(t.search=e.substring(l),e=e.substring(0,l)),e&&(t.pathname=e)}return t}function Gp(e,t,n,l={}){let{window:r=document.defaultView,v5Compat:i=!1}=l,o=r.history,s="POP",u=null,c=h();c==null&&(c=0,o.replaceState({...o.state,idx:c},""));function h(){return(o.state||{idx:null}).idx}function v(){s="POP";let j=h(),f=j==null?null:j-c;c=j,u&&u({action:s,location:w.location,delta:f})}function m(j,f){s="PUSH";let d=fo(w.location,j,f);c=h()+1;let p=_a(d,c),x=w.createHref(d);try{o.pushState(p,"",x)}catch(N){if(N instanceof DOMException&&N.name==="DataCloneError")throw N;r.location.assign(x)}i&&u&&u({action:s,location:w.location,delta:1})}function k(j,f){s="REPLACE";let d=fo(w.location,j,f);c=h();let p=_a(d,c),x=w.createHref(d);o.replaceState(p,"",x),i&&u&&u({action:s,location:w.location,delta:0})}function y(j){return Jp(j)}let w={get action(){return s},get location(){return e(r,o)},listen(j){if(u)throw new Error("A history only accepts one active listener");return r.addEventListener(Ca,v),u=j,()=>{r.removeEventListener(Ca,v),u=null}},createHref(j){return t(r,j)},createURL:y,encodeLocation(j){let f=y(j);return{pathname:f.pathname,search:f.search,hash:f.hash}},push:m,replace:k,go(j){return o.go(j)}};return w}function Jp(e,t=!1){let n="http://localhost";typeof window<"u"&&(n=window.location.origin!=="null"?window.location.origin:window.location.href),V(n,"No window.location.(origin|href) available to create URL");let l=typeof e=="string"?e:al(e);return l=l.replace(/ $/,"%20"),!t&&l.startsWith("//")&&(l=n+l),new URL(l,n)}function Wc(e,t,n="/"){return Zp(e,t,n,!1)}function Zp(e,t,n,l){let r=typeof t=="string"?kn(t):t,i=rt(r.pathname||"/",n);if(i==null)return null;let o=Qc(e);bp(o);let s=null;for(let u=0;s==null&&u<o.length;++u){let c=ch(i);s=ah(o[u],c,l)}return s}function Qc(e,t=[],n=[],l=""){let r=(i,o,s)=>{let u={relativePath:s===void 0?i.path||"":s,caseSensitive:i.caseSensitive===!0,childrenIndex:o,route:i};u.relativePath.startsWith("/")&&(V(u.relativePath.startsWith(l),`Absolute route path "${u.relativePath}" nested under path "${l}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),u.relativePath=u.relativePath.slice(l.length));let c=be([l,u.relativePath]),h=n.concat(u);i.children&&i.children.length>0&&(V(i.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${c}".`),Qc(i.children,t,h,c)),!(i.path==null&&!i.index)&&t.push({path:c,score:oh(c,i.index),routesMeta:h})};return e.forEach((i,o)=>{var s;if(i.path===""||!((s=i.path)!=null&&s.includes("?")))r(i,o);else for(let u of qc(i.path))r(i,o,u)}),t}function qc(e){let t=e.split("/");if(t.length===0)return[];let[n,...l]=t,r=n.endsWith("?"),i=n.replace(/\?$/,"");if(l.length===0)return r?[i,""]:[i];let o=qc(l.join("/")),s=[];return s.push(...o.map(u=>u===""?i:[i,u].join("/"))),r&&s.push(...o),s.map(u=>e.startsWith("/")&&u===""?"/":u)}function bp(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:sh(t.routesMeta.map(l=>l.childrenIndex),n.routesMeta.map(l=>l.childrenIndex)))}var eh=/^:[\w-]+$/,th=3,nh=2,lh=1,rh=10,ih=-2,Pa=e=>e==="*";function oh(e,t){let n=e.split("/"),l=n.length;return n.some(Pa)&&(l+=ih),t&&(l+=nh),n.filter(r=>!Pa(r)).reduce((r,i)=>r+(eh.test(i)?th:i===""?lh:rh),l)}function sh(e,t){return e.length===t.length&&e.slice(0,-1).every((l,r)=>l===t[r])?e[e.length-1]-t[t.length-1]:0}function ah(e,t,n=!1){let{routesMeta:l}=e,r={},i="/",o=[];for(let s=0;s<l.length;++s){let u=l[s],c=s===l.length-1,h=i==="/"?t:t.slice(i.length)||"/",v=kr({path:u.relativePath,caseSensitive:u.caseSensitive,end:c},h),m=u.route;if(!v&&c&&n&&!l[l.length-1].route.index&&(v=kr({path:u.relativePath,caseSensitive:u.caseSensitive,end:!1},h)),!v)return null;Object.assign(r,v.params),o.push({params:r,pathname:be([i,v.pathname]),pathnameBase:hh(be([i,v.pathnameBase])),route:m}),v.pathnameBase!=="/"&&(i=be([i,v.pathnameBase]))}return o}function kr(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,l]=uh(e.path,e.caseSensitive,e.end),r=t.match(n);if(!r)return null;let i=r[0],o=i.replace(/(.)\/+$/,"$1"),s=r.slice(1);return{params:l.reduce((c,{paramName:h,isOptional:v},m)=>{if(h==="*"){let y=s[m]||"";o=i.slice(0,i.length-y.length).replace(/(.)\/+$/,"$1")}const k=s[m];return v&&!k?c[h]=void 0:c[h]=(k||"").replace(/%2F/g,"/"),c},{}),pathname:i,pathnameBase:o,pattern:e}}function uh(e,t=!1,n=!0){Ve(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let l=[],r="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,s,u)=>(l.push({paramName:s,isOptional:u!=null}),u?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(l.push({paramName:"*"}),r+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?r+="\\/*$":e!==""&&e!=="/"&&(r+="(?:(?=\\/|$))"),[new RegExp(r,t?void 0:"i"),l]}function ch(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return Ve(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function rt(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,l=e.charAt(n);return l&&l!=="/"?null:e.slice(n)||"/"}function dh(e,t="/"){let{pathname:n,search:l="",hash:r=""}=typeof e=="string"?kn(e):e;return{pathname:n?n.startsWith("/")?n:fh(n,t):t,search:mh(l),hash:vh(r)}}function fh(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(r=>{r===".."?n.length>1&&n.pop():r!=="."&&n.push(r)}),n.length>1?n.join("/"):"/"}function vi(e,t,n,l){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(l)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function ph(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function Kc(e){let t=ph(e);return t.map((n,l)=>l===t.length-1?n.pathname:n.pathnameBase)}function Yc(e,t,n,l=!1){let r;typeof e=="string"?r=kn(e):(r={...e},V(!r.pathname||!r.pathname.includes("?"),vi("?","pathname","search",r)),V(!r.pathname||!r.pathname.includes("#"),vi("#","pathname","hash",r)),V(!r.search||!r.search.includes("#"),vi("#","search","hash",r)));let i=e===""||r.pathname==="",o=i?"/":r.pathname,s;if(o==null)s=n;else{let v=t.length-1;if(!l&&o.startsWith("..")){let m=o.split("/");for(;m[0]==="..";)m.shift(),v-=1;r.pathname=m.join("/")}s=v>=0?t[v]:"/"}let u=dh(r,s),c=o&&o!=="/"&&o.endsWith("/"),h=(i||o===".")&&n.endsWith("/");return!u.pathname.endsWith("/")&&(c||h)&&(u.pathname+="/"),u}var be=e=>e.join("/").replace(/\/\/+/g,"/"),hh=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),mh=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,vh=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function gh(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}var Xc=["POST","PUT","PATCH","DELETE"];new Set(Xc);var yh=["GET",...Xc];new Set(yh);var Sn=g.createContext(null);Sn.displayName="DataRouter";var $r=g.createContext(null);$r.displayName="DataRouterState";var Gc=g.createContext({isTransitioning:!1});Gc.displayName="ViewTransition";var xh=g.createContext(new Map);xh.displayName="Fetchers";var wh=g.createContext(null);wh.displayName="Await";var We=g.createContext(null);We.displayName="Navigation";var hl=g.createContext(null);hl.displayName="Location";var Qe=g.createContext({outlet:null,matches:[],isDataRoute:!1});Qe.displayName="Route";var us=g.createContext(null);us.displayName="RouteError";function kh(e,{relative:t}={}){V(ml(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:l}=g.useContext(We),{hash:r,pathname:i,search:o}=vl(e,{relative:t}),s=i;return n!=="/"&&(s=i==="/"?n:be([n,i])),l.createHref({pathname:s,search:o,hash:r})}function ml(){return g.useContext(hl)!=null}function _t(){return V(ml(),"useLocation() may be used only in the context of a <Router> component."),g.useContext(hl).location}var Jc="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Zc(e){g.useContext(We).static||g.useLayoutEffect(e)}function bc(){let{isDataRoute:e}=g.useContext(Qe);return e?Oh():Sh()}function Sh(){V(ml(),"useNavigate() may be used only in the context of a <Router> component.");let e=g.useContext(Sn),{basename:t,navigator:n}=g.useContext(We),{matches:l}=g.useContext(Qe),{pathname:r}=_t(),i=JSON.stringify(Kc(l)),o=g.useRef(!1);return Zc(()=>{o.current=!0}),g.useCallback((u,c={})=>{if(Ve(o.current,Jc),!o.current)return;if(typeof u=="number"){n.go(u);return}let h=Yc(u,JSON.parse(i),r,c.relative==="path");e==null&&t!=="/"&&(h.pathname=h.pathname==="/"?t:be([t,h.pathname])),(c.replace?n.replace:n.push)(h,c.state,c)},[t,n,i,r,e])}g.createContext(null);function Nh(){let{matches:e}=g.useContext(Qe),t=e[e.length-1];return t?t.params:{}}function vl(e,{relative:t}={}){let{matches:n}=g.useContext(Qe),{pathname:l}=_t(),r=JSON.stringify(Kc(n));return g.useMemo(()=>Yc(e,JSON.parse(r),l,t==="path"),[e,r,l,t])}function jh(e,t){return ed(e,t)}function ed(e,t,n,l){var f;V(ml(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:r}=g.useContext(We),{matches:i}=g.useContext(Qe),o=i[i.length-1],s=o?o.params:{},u=o?o.pathname:"/",c=o?o.pathnameBase:"/",h=o&&o.route;{let d=h&&h.path||"";td(u,!h||d.endsWith("*")||d.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${u}" (under <Route path="${d}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${d}"> to <Route path="${d==="/"?"*":`${d}/*`}">.`)}let v=_t(),m;if(t){let d=typeof t=="string"?kn(t):t;V(c==="/"||((f=d.pathname)==null?void 0:f.startsWith(c)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${d.pathname}" was given in the \`location\` prop.`),m=d}else m=v;let k=m.pathname||"/",y=k;if(c!=="/"){let d=c.replace(/^\//,"").split("/");y="/"+k.replace(/^\//,"").split("/").slice(d.length).join("/")}let w=Wc(e,{pathname:y});Ve(h||w!=null,`No routes matched location "${m.pathname}${m.search}${m.hash}" `),Ve(w==null||w[w.length-1].route.element!==void 0||w[w.length-1].route.Component!==void 0||w[w.length-1].route.lazy!==void 0,`Matched leaf route at location "${m.pathname}${m.search}${m.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let j=Rh(w&&w.map(d=>Object.assign({},d,{params:Object.assign({},s,d.params),pathname:be([c,r.encodeLocation?r.encodeLocation(d.pathname).pathname:d.pathname]),pathnameBase:d.pathnameBase==="/"?c:be([c,r.encodeLocation?r.encodeLocation(d.pathnameBase).pathname:d.pathnameBase])})),i,n,l);return t&&j?g.createElement(hl.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...m},navigationType:"POP"}},j):j}function Eh(){let e=Ih(),t=gh(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,l="rgba(200,200,200, 0.5)",r={padding:"0.5rem",backgroundColor:l},i={padding:"2px 4px",backgroundColor:l},o=null;return console.error("Error handled by React Router default ErrorBoundary:",e),o=g.createElement(g.Fragment,null,g.createElement("p",null,"💿 Hey developer 👋"),g.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",g.createElement("code",{style:i},"ErrorBoundary")," or"," ",g.createElement("code",{style:i},"errorElement")," prop on your route.")),g.createElement(g.Fragment,null,g.createElement("h2",null,"Unexpected Application Error!"),g.createElement("h3",{style:{fontStyle:"italic"}},t),n?g.createElement("pre",{style:r},n):null,o)}var Ch=g.createElement(Eh,null),_h=class extends g.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return this.state.error!==void 0?g.createElement(Qe.Provider,{value:this.props.routeContext},g.createElement(us.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function Ph({routeContext:e,match:t,children:n}){let l=g.useContext(Sn);return l&&l.static&&l.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(l.staticContext._deepestRenderedBoundaryId=t.route.id),g.createElement(Qe.Provider,{value:e},n)}function Rh(e,t=[],n=null,l=null){if(e==null){if(!n)return null;if(n.errors)e=n.matches;else if(t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let r=e,i=n==null?void 0:n.errors;if(i!=null){let u=r.findIndex(c=>c.route.id&&(i==null?void 0:i[c.route.id])!==void 0);V(u>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(i).join(",")}`),r=r.slice(0,Math.min(r.length,u+1))}let o=!1,s=-1;if(n)for(let u=0;u<r.length;u++){let c=r[u];if((c.route.HydrateFallback||c.route.hydrateFallbackElement)&&(s=u),c.route.id){let{loaderData:h,errors:v}=n,m=c.route.loader&&!h.hasOwnProperty(c.route.id)&&(!v||v[c.route.id]===void 0);if(c.route.lazy||m){o=!0,s>=0?r=r.slice(0,s+1):r=[r[0]];break}}}return r.reduceRight((u,c,h)=>{let v,m=!1,k=null,y=null;n&&(v=i&&c.route.id?i[c.route.id]:void 0,k=c.route.errorElement||Ch,o&&(s<0&&h===0?(td("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),m=!0,y=null):s===h&&(m=!0,y=c.route.hydrateFallbackElement||null)));let w=t.concat(r.slice(0,h+1)),j=()=>{let f;return v?f=k:m?f=y:c.route.Component?f=g.createElement(c.route.Component,null):c.route.element?f=c.route.element:f=u,g.createElement(Ph,{match:c,routeContext:{outlet:u,matches:w,isDataRoute:n!=null},children:f})};return n&&(c.route.ErrorBoundary||c.route.errorElement||h===0)?g.createElement(_h,{location:n.location,revalidation:n.revalidation,component:k,error:v,children:j(),routeContext:{outlet:null,matches:w,isDataRoute:!0}}):j()},null)}function cs(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Lh(e){let t=g.useContext(Sn);return V(t,cs(e)),t}function Th(e){let t=g.useContext($r);return V(t,cs(e)),t}function zh(e){let t=g.useContext(Qe);return V(t,cs(e)),t}function ds(e){let t=zh(e),n=t.matches[t.matches.length-1];return V(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function Dh(){return ds("useRouteId")}function Ih(){var l;let e=g.useContext(us),t=Th("useRouteError"),n=ds("useRouteError");return e!==void 0?e:(l=t.errors)==null?void 0:l[n]}function Oh(){let{router:e}=Lh("useNavigate"),t=ds("useNavigate"),n=g.useRef(!1);return Zc(()=>{n.current=!0}),g.useCallback(async(r,i={})=>{Ve(n.current,Jc),n.current&&(typeof r=="number"?e.navigate(r):await e.navigate(r,{fromRouteId:t,...i}))},[e,t])}var Ra={};function td(e,t,n){!t&&!Ra[e]&&(Ra[e]=!0,Ve(!1,n))}g.memo(Fh);function Fh({routes:e,future:t,state:n}){return ed(e,void 0,n,t)}function st(e){V(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function Mh({basename:e="/",children:t=null,location:n,navigationType:l="POP",navigator:r,static:i=!1}){V(!ml(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let o=e.replace(/^\/*/,"/"),s=g.useMemo(()=>({basename:o,navigator:r,static:i,future:{}}),[o,r,i]);typeof n=="string"&&(n=kn(n));let{pathname:u="/",search:c="",hash:h="",state:v=null,key:m="default"}=n,k=g.useMemo(()=>{let y=rt(u,o);return y==null?null:{location:{pathname:y,search:c,hash:h,state:v,key:m},navigationType:l}},[o,u,c,h,v,m,l]);return Ve(k!=null,`<Router basename="${o}"> is not able to match the URL "${u}${c}${h}" because it does not start with the basename, so the <Router> won't render anything.`),k==null?null:g.createElement(We.Provider,{value:s},g.createElement(hl.Provider,{children:t,value:k}))}function $h({children:e,location:t}){return jh(po(e),t)}function po(e,t=[]){let n=[];return g.Children.forEach(e,(l,r)=>{if(!g.isValidElement(l))return;let i=[...t,r];if(l.type===g.Fragment){n.push.apply(n,po(l.props.children,i));return}V(l.type===st,`[${typeof l.type=="string"?l.type:l.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),V(!l.props.index||!l.props.children,"An index route cannot have child routes.");let o={id:l.props.id||i.join("-"),caseSensitive:l.props.caseSensitive,element:l.props.element,Component:l.props.Component,index:l.props.index,path:l.props.path,loader:l.props.loader,action:l.props.action,hydrateFallbackElement:l.props.hydrateFallbackElement,HydrateFallback:l.props.HydrateFallback,errorElement:l.props.errorElement,ErrorBoundary:l.props.ErrorBoundary,hasErrorBoundary:l.props.hasErrorBoundary===!0||l.props.ErrorBoundary!=null||l.props.errorElement!=null,shouldRevalidate:l.props.shouldRevalidate,handle:l.props.handle,lazy:l.props.lazy};l.props.children&&(o.children=po(l.props.children,i)),n.push(o)}),n}var Xl="get",Gl="application/x-www-form-urlencoded";function Ar(e){return e!=null&&typeof e.tagName=="string"}function Ah(e){return Ar(e)&&e.tagName.toLowerCase()==="button"}function Uh(e){return Ar(e)&&e.tagName.toLowerCase()==="form"}function Bh(e){return Ar(e)&&e.tagName.toLowerCase()==="input"}function Hh(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Vh(e,t){return e.button===0&&(!t||t==="_self")&&!Hh(e)}var Fl=null;function Wh(){if(Fl===null)try{new FormData(document.createElement("form"),0),Fl=!1}catch{Fl=!0}return Fl}var Qh=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function gi(e){return e!=null&&!Qh.has(e)?(Ve(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Gl}"`),null):e}function qh(e,t){let n,l,r,i,o;if(Uh(e)){let s=e.getAttribute("action");l=s?rt(s,t):null,n=e.getAttribute("method")||Xl,r=gi(e.getAttribute("enctype"))||Gl,i=new FormData(e)}else if(Ah(e)||Bh(e)&&(e.type==="submit"||e.type==="image")){let s=e.form;if(s==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let u=e.getAttribute("formaction")||s.getAttribute("action");if(l=u?rt(u,t):null,n=e.getAttribute("formmethod")||s.getAttribute("method")||Xl,r=gi(e.getAttribute("formenctype"))||gi(s.getAttribute("enctype"))||Gl,i=new FormData(s,e),!Wh()){let{name:c,type:h,value:v}=e;if(h==="image"){let m=c?`${c}.`:"";i.append(`${m}x`,"0"),i.append(`${m}y`,"0")}else c&&i.append(c,v)}}else{if(Ar(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=Xl,l=null,r=Gl,o=e}return i&&r==="text/plain"&&(o=i,i=void 0),{action:l,method:n.toLowerCase(),encType:r,formData:i,body:o}}function fs(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}async function Kh(e,t){if(e.id in t)return t[e.id];try{let n=await import(e.module);return t[e.id]=n,n}catch(n){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function Yh(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function Xh(e,t,n){let l=await Promise.all(e.map(async r=>{let i=t.routes[r.route.id];if(i){let o=await Kh(i,n);return o.links?o.links():[]}return[]}));return bh(l.flat(1).filter(Yh).filter(r=>r.rel==="stylesheet"||r.rel==="preload").map(r=>r.rel==="stylesheet"?{...r,rel:"prefetch",as:"style"}:{...r,rel:"prefetch"}))}function La(e,t,n,l,r,i){let o=(u,c)=>n[c]?u.route.id!==n[c].route.id:!0,s=(u,c)=>{var h;return n[c].pathname!==u.pathname||((h=n[c].route.path)==null?void 0:h.endsWith("*"))&&n[c].params["*"]!==u.params["*"]};return i==="assets"?t.filter((u,c)=>o(u,c)||s(u,c)):i==="data"?t.filter((u,c)=>{var v;let h=l.routes[u.route.id];if(!h||!h.hasLoader)return!1;if(o(u,c)||s(u,c))return!0;if(u.route.shouldRevalidate){let m=u.route.shouldRevalidate({currentUrl:new URL(r.pathname+r.search+r.hash,window.origin),currentParams:((v=n[0])==null?void 0:v.params)||{},nextUrl:new URL(e,window.origin),nextParams:u.params,defaultShouldRevalidate:!0});if(typeof m=="boolean")return m}return!0}):[]}function Gh(e,t,{includeHydrateFallback:n}={}){return Jh(e.map(l=>{let r=t.routes[l.route.id];if(!r)return[];let i=[r.module];return r.clientActionModule&&(i=i.concat(r.clientActionModule)),r.clientLoaderModule&&(i=i.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(i=i.concat(r.hydrateFallbackModule)),r.imports&&(i=i.concat(r.imports)),i}).flat(1))}function Jh(e){return[...new Set(e)]}function Zh(e){let t={},n=Object.keys(e).sort();for(let l of n)t[l]=e[l];return t}function bh(e,t){let n=new Set;return new Set(t),e.reduce((l,r)=>{let i=JSON.stringify(Zh(r));return n.has(i)||(n.add(i),l.push({key:i,link:r})),l},[])}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var em=new Set([100,101,204,205]);function tm(e,t){let n=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return n.pathname==="/"?n.pathname="_root.data":t&&rt(n.pathname,t)==="/"?n.pathname=`${t.replace(/\/$/,"")}/_root.data`:n.pathname=`${n.pathname.replace(/\/$/,"")}.data`,n}function nd(){let e=g.useContext(Sn);return fs(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function nm(){let e=g.useContext($r);return fs(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var ps=g.createContext(void 0);ps.displayName="FrameworkContext";function ld(){let e=g.useContext(ps);return fs(e,"You must render this element inside a <HydratedRouter> element"),e}function lm(e,t){let n=g.useContext(ps),[l,r]=g.useState(!1),[i,o]=g.useState(!1),{onFocus:s,onBlur:u,onMouseEnter:c,onMouseLeave:h,onTouchStart:v}=t,m=g.useRef(null);g.useEffect(()=>{if(e==="render"&&o(!0),e==="viewport"){let w=f=>{f.forEach(d=>{o(d.isIntersecting)})},j=new IntersectionObserver(w,{threshold:.5});return m.current&&j.observe(m.current),()=>{j.disconnect()}}},[e]),g.useEffect(()=>{if(l){let w=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(w)}}},[l]);let k=()=>{r(!0)},y=()=>{r(!1),o(!1)};return n?e!=="intent"?[i,m,{}]:[i,m,{onFocus:Tn(s,k),onBlur:Tn(u,y),onMouseEnter:Tn(c,k),onMouseLeave:Tn(h,y),onTouchStart:Tn(v,k)}]:[!1,m,{}]}function Tn(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function rm({page:e,...t}){let{router:n}=nd(),l=g.useMemo(()=>Wc(n.routes,e,n.basename),[n.routes,e,n.basename]);return l?g.createElement(om,{page:e,matches:l,...t}):null}function im(e){let{manifest:t,routeModules:n}=ld(),[l,r]=g.useState([]);return g.useEffect(()=>{let i=!1;return Xh(e,t,n).then(o=>{i||r(o)}),()=>{i=!0}},[e,t,n]),l}function om({page:e,matches:t,...n}){let l=_t(),{manifest:r,routeModules:i}=ld(),{basename:o}=nd(),{loaderData:s,matches:u}=nm(),c=g.useMemo(()=>La(e,t,u,r,l,"data"),[e,t,u,r,l]),h=g.useMemo(()=>La(e,t,u,r,l,"assets"),[e,t,u,r,l]),v=g.useMemo(()=>{if(e===l.pathname+l.search+l.hash)return[];let y=new Set,w=!1;if(t.forEach(f=>{var p;let d=r.routes[f.route.id];!d||!d.hasLoader||(!c.some(x=>x.route.id===f.route.id)&&f.route.id in s&&((p=i[f.route.id])!=null&&p.shouldRevalidate)||d.hasClientLoader?w=!0:y.add(f.route.id))}),y.size===0)return[];let j=tm(e,o);return w&&y.size>0&&j.searchParams.set("_routes",t.filter(f=>y.has(f.route.id)).map(f=>f.route.id).join(",")),[j.pathname+j.search]},[o,s,l,r,c,t,e,i]),m=g.useMemo(()=>Gh(h,r),[h,r]),k=im(h);return g.createElement(g.Fragment,null,v.map(y=>g.createElement("link",{key:y,rel:"prefetch",as:"fetch",href:y,...n})),m.map(y=>g.createElement("link",{key:y,rel:"modulepreload",href:y,...n})),k.map(({key:y,link:w})=>g.createElement("link",{key:y,...w})))}function sm(...e){return t=>{e.forEach(n=>{typeof n=="function"?n(t):n!=null&&(n.current=t)})}}var rd=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{rd&&(window.__reactRouterVersion="7.6.1")}catch{}function am({basename:e,children:t,window:n}){let l=g.useRef();l.current==null&&(l.current=Yp({window:n,v5Compat:!0}));let r=l.current,[i,o]=g.useState({action:r.action,location:r.location}),s=g.useCallback(u=>{g.startTransition(()=>o(u))},[o]);return g.useLayoutEffect(()=>r.listen(s),[r,s]),g.createElement(Mh,{basename:e,children:t,location:i.location,navigationType:i.action,navigator:r})}var id=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,G=g.forwardRef(function({onClick:t,discover:n="render",prefetch:l="none",relative:r,reloadDocument:i,replace:o,state:s,target:u,to:c,preventScrollReset:h,viewTransition:v,...m},k){let{basename:y}=g.useContext(We),w=typeof c=="string"&&id.test(c),j,f=!1;if(typeof c=="string"&&w&&(j=c,rd))try{let I=new URL(window.location.href),L=c.startsWith("//")?new URL(I.protocol+c):new URL(c),ae=rt(L.pathname,y);L.origin===I.origin&&ae!=null?c=ae+L.search+L.hash:f=!0}catch{Ve(!1,`<Link to="${c}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let d=kh(c,{relative:r}),[p,x,N]=lm(l,m),C=fm(c,{replace:o,state:s,target:u,preventScrollReset:h,relative:r,viewTransition:v});function _(I){t&&t(I),I.defaultPrevented||C(I)}let R=g.createElement("a",{...m,...N,href:j||d,onClick:f||i?t:_,ref:sm(k,x),target:u,"data-discover":!w&&n==="render"?"true":void 0});return p&&!w?g.createElement(g.Fragment,null,R,g.createElement(rm,{page:d})):R});G.displayName="Link";var um=g.forwardRef(function({"aria-current":t="page",caseSensitive:n=!1,className:l="",end:r=!1,style:i,to:o,viewTransition:s,children:u,...c},h){let v=vl(o,{relative:c.relative}),m=_t(),k=g.useContext($r),{navigator:y,basename:w}=g.useContext(We),j=k!=null&&gm(v)&&s===!0,f=y.encodeLocation?y.encodeLocation(v).pathname:v.pathname,d=m.pathname,p=k&&k.navigation&&k.navigation.location?k.navigation.location.pathname:null;n||(d=d.toLowerCase(),p=p?p.toLowerCase():null,f=f.toLowerCase()),p&&w&&(p=rt(p,w)||p);const x=f!=="/"&&f.endsWith("/")?f.length-1:f.length;let N=d===f||!r&&d.startsWith(f)&&d.charAt(x)==="/",C=p!=null&&(p===f||!r&&p.startsWith(f)&&p.charAt(f.length)==="/"),_={isActive:N,isPending:C,isTransitioning:j},R=N?t:void 0,I;typeof l=="function"?I=l(_):I=[l,N?"active":null,C?"pending":null,j?"transitioning":null].filter(Boolean).join(" ");let L=typeof i=="function"?i(_):i;return g.createElement(G,{...c,"aria-current":R,className:I,ref:h,style:L,to:o,viewTransition:s},typeof u=="function"?u(_):u)});um.displayName="NavLink";var cm=g.forwardRef(({discover:e="render",fetcherKey:t,navigate:n,reloadDocument:l,replace:r,state:i,method:o=Xl,action:s,onSubmit:u,relative:c,preventScrollReset:h,viewTransition:v,...m},k)=>{let y=mm(),w=vm(s,{relative:c}),j=o.toLowerCase()==="get"?"get":"post",f=typeof s=="string"&&id.test(s),d=p=>{if(u&&u(p),p.defaultPrevented)return;p.preventDefault();let x=p.nativeEvent.submitter,N=(x==null?void 0:x.getAttribute("formmethod"))||o;y(x||p.currentTarget,{fetcherKey:t,method:N,navigate:n,replace:r,state:i,relative:c,preventScrollReset:h,viewTransition:v})};return g.createElement("form",{ref:k,method:j,action:w,onSubmit:l?u:d,...m,"data-discover":!f&&e==="render"?"true":void 0})});cm.displayName="Form";function dm(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function od(e){let t=g.useContext(Sn);return V(t,dm(e)),t}function fm(e,{target:t,replace:n,state:l,preventScrollReset:r,relative:i,viewTransition:o}={}){let s=bc(),u=_t(),c=vl(e,{relative:i});return g.useCallback(h=>{if(Vh(h,t)){h.preventDefault();let v=n!==void 0?n:al(u)===al(c);s(e,{replace:v,state:l,preventScrollReset:r,relative:i,viewTransition:o})}},[u,s,c,n,l,t,e,r,i,o])}var pm=0,hm=()=>`__${String(++pm)}__`;function mm(){let{router:e}=od("useSubmit"),{basename:t}=g.useContext(We),n=Dh();return g.useCallback(async(l,r={})=>{let{action:i,method:o,encType:s,formData:u,body:c}=qh(l,t);if(r.navigate===!1){let h=r.fetcherKey||hm();await e.fetch(h,n,r.action||i,{preventScrollReset:r.preventScrollReset,formData:u,body:c,formMethod:r.method||o,formEncType:r.encType||s,flushSync:r.flushSync})}else await e.navigate(r.action||i,{preventScrollReset:r.preventScrollReset,formData:u,body:c,formMethod:r.method||o,formEncType:r.encType||s,replace:r.replace,state:r.state,fromRouteId:n,flushSync:r.flushSync,viewTransition:r.viewTransition})},[e,t,n])}function vm(e,{relative:t}={}){let{basename:n}=g.useContext(We),l=g.useContext(Qe);V(l,"useFormAction must be used inside a RouteContext");let[r]=l.matches.slice(-1),i={...vl(e||".",{relative:t})},o=_t();if(e==null){i.search=o.search;let s=new URLSearchParams(i.search),u=s.getAll("index");if(u.some(h=>h==="")){s.delete("index"),u.filter(v=>v).forEach(v=>s.append("index",v));let h=s.toString();i.search=h?`?${h}`:""}}return(!e||e===".")&&r.route.index&&(i.search=i.search?i.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(i.pathname=i.pathname==="/"?n:be([n,i.pathname])),al(i)}function gm(e,t={}){let n=g.useContext(Gc);V(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:l}=od("useViewTransitionState"),r=vl(e,{relative:t.relative});if(!n.isTransitioning)return!1;let i=rt(n.currentLocation.pathname,l)||n.currentLocation.pathname,o=rt(n.nextLocation.pathname,l)||n.nextLocation.pathname;return kr(r.pathname,o)!=null||kr(r.pathname,i)!=null}[...em];const ym="/assets/logo-vvMBvk3N.png";function xm(){const e=_t(),[t,n]=g.useState(!1),[l,r]=g.useState(!1),i=()=>{n(!t)};g.useEffect(()=>{const s=()=>{window.scrollY>50?r(!0):r(!1)};return window.addEventListener("scroll",s),()=>{window.removeEventListener("scroll",s)}},[]);const o=[{path:"/",label:"ראשי"},{path:"/services",label:"תחומי טיפול"},{path:"/about",label:"קצת עליי"},{path:"/blog",label:"בלוג מקצועי"},{path:"/testimonials",label:"מטופלים מספרים"},{path:"/contact",label:"דברו איתי"}];return a.jsxs("header",{className:`site-header ${l?"scrolled":""}`,children:[a.jsxs("div",{className:"container header-container",children:[a.jsxs(G,{to:"/",className:"logo-container",children:[a.jsx("img",{src:ym,alt:"הדס תודה לוגו",className:`logo ${l?"scrolled":""}`}),a.jsxs("div",{className:"logo-text",children:[a.jsx("h1",{className:`site-title ${l?"scrolled":""}`,children:"הדס תודה"}),a.jsx("p",{className:`site-subtitle ${l?"scrolled":""}`,children:"קלינאית תקשורת"})]})]}),a.jsx("button",{onClick:i,className:"mobile-menu-button","aria-label":"תפריט",children:t?"✕":"☰"}),a.jsx("nav",{className:"desktop-nav",children:o.map(s=>a.jsx(G,{to:s.path,className:`nav-link ${e.pathname===s.path?"active":""}`,children:s.label},s.path))})]}),t&&a.jsx("div",{className:"mobile-nav",children:o.map(s=>a.jsx(G,{to:s.path,className:`mobile-nav-link ${e.pathname===s.path?"active":""}`,onClick:()=>n(!1),children:s.label},s.path))})]})}function wm(){const e=new Date().getFullYear(),t=[{path:"/",label:"ראשי"},{path:"/services",label:"תחומי טיפול"},{path:"/about",label:"קצת עליי"},{path:"/testimonials",label:"מטופלים מספרים"},{path:"/contact",label:"דברו איתי"}];return a.jsx("footer",{className:"site-footer",children:a.jsx("div",{className:"container",children:a.jsxs("div",{className:"footer-content",children:[a.jsxs("div",{className:"footer-contact",children:[a.jsx("h3",{className:"footer-heading",children:"דברו איתי"}),a.jsxs("div",{className:"contact-info",children:[a.jsx("div",{className:"contact-name",children:"הדס תודה קלינאית תקשורת"}),a.jsx("a",{href:"tel:0506796209",className:"contact-link",children:"050-6796209"}),a.jsx("a",{href:"mailto:hadas-toda@gmail.com",className:"contact-link",children:"hadas-toda@gmail.com"}),a.jsx("div",{className:"contact-address",children:"שיכון ג' בני ברק"})]})]}),a.jsx("div",{className:"footer-nav",children:t.map(n=>a.jsx(G,{to:n.path,className:"footer-nav-link",children:n.label},n.path))}),a.jsxs("div",{className:"copyright",children:["© ",e," הדס תודה"]})]})})})}const km={id:4,title:"אפרקסיה אצל ילדים - מדריך להורים",slug:"childhood-apraxia-guide",date:"1 ביוני, 2025",excerpt:"אפרקסיה של הדיבור היא הפרעה מוטורית שמשפיעה על יכולת הילד להפיק צלילי דיבור. כיצד לזהות ולסייע?",image:"/images/blog/apraxia.jpg",categories:["speech","children"],content:`
    <p>אפרקסיה של הדיבור בילדות (Childhood Apraxia of Speech - CAS) היא הפרעה נוירולוגית-מוטורית המשפיעה על יכולתו של הילד לתכנן ולבצע את התנועות המדויקות הנדרשות להפקת דיבור ברור. זוהי הפרעה שאינה נובעת מחולשת שרירים, אלא מקושי בתכנון ובביצוע רצף תנועות מדויק.</p>
    
    <h2>סימנים מאפיינים של אפרקסיה</h2>
    <ul>
      <li>קושי בהפקת צלילים וצירופי צלילים</li>
      <li>חוסר עקביות בשגיאות הדיבור</li>
      <li>קושי במעבר בין צלילים והברות</li>
      <li>הפקת מילים פשוטות בלבד או שימוש במחוות במקום דיבור</li>
      <li>הבנת שפה טובה יותר מיכולת ההבעה</li>
      <li>מאמץ ניכר בניסיון להפיק דיבור</li>
    </ul>
    
    <h2>אבחון אפרקסיה</h2>
    <p>אבחון אפרקסיה של הדיבור צריך להתבצע על ידי קלינאי תקשורת מנוסה. האבחון כולל הערכה מקיפה של:</p>
    <ul>
      <li>יכולות מוטוריות של מערכת הדיבור</li>
      <li>דפוסי הפקת צלילים ומילים</li>
      <li>הנגנה (פרוזודיה) של הדיבור</li>
      <li>עקביות בשגיאות</li>
      <li>יכולת חיקוי של צלילים ומילים</li>
    </ul>
    
    <h2>טיפול באפרקסיה</h2>
    <p>הטיפול באפרקסיה של הדיבור דורש בדרך כלל:</p>
    <ul>
      <li>טיפול אינטנסיבי ותכוף (3-5 פעמים בשבוע)</li>
      <li>גישה רב-חושית (שמיעה, ראייה, תחושה)</li>
      <li>תרגול חזרתי של תנועות דיבור</li>
      <li>שימוש בתמיכה חזותית ומחוות</li>
      <li>עבודה על רצפים של צלילים והברות</li>
    </ul>
    
    <h2>כיצד הורים יכולים לסייע</h2>
    <p>תמיכת ההורים חיונית להצלחת הטיפול:</p>
    <ul>
      <li>תרגול יומיומי בבית בהתאם להנחיות הקלינאי</li>
      <li>יצירת סביבה תומכת ללא לחץ</li>
      <li>מתן זמן לילד להביע את עצמו</li>
      <li>שימוש בתקשורת תומכת וחלופית במידת הצורך</li>
      <li>חיזוק חיובי על מאמץ ולא רק על הצלחה</li>
    </ul>
    
    <blockquote>
      "הסבלנות והעקביות הם המפתחות להתקדמות בטיפול באפרקסיה. כל צעד קטן הוא הישג משמעותי."
    </blockquote>
    
    <p>חשוב לזכור שילדים עם אפרקסיה של הדיבור הם בעלי יכולות קוגניטיביות תקינות ומבינים הרבה יותר ממה שהם מסוגלים להביע. התמיכה הנכונה והטיפול המתאים יכולים לחולל שינוי משמעותי ביכולת התקשורת שלהם.</p>
  `},Sm={id:5,title:"5 תרגילים יומיים לשיפור איכות הקול",slug:"daily-voice-exercises",date:"25 במאי, 2025",excerpt:"תרגילים פשוטים שניתן לבצע בבית לשיפור איכות הקול, חיזוק מיתרי הקול ומניעת עייפות קולית",image:"/images/blog/voice-exercises.jpg",categories:["voice","adults","tips"],content:`
    <p>הקול שלנו הוא כלי תקשורת חיוני, אך לעתים קרובות אנחנו מתייחסים אליו כמובן מאליו עד שמתעוררת בעיה. בדומה לשרירים אחרים בגוף, גם מיתרי הקול ומערכת הפקת הקול זקוקים לתרגול ותחזוקה שוטפת.</p>
    
    <p>הנה חמישה תרגילים פשוטים שניתן לבצע מדי יום כדי לשמור על קול בריא ולשפר את איכותו:</p>
    
    <h2>1. תרגיל המהום</h2>
    <p>המהום הוא אחד התרגילים היעילים ביותר לחימום הקול ולהרגעת מיתרי הקול:</p>
    <ul>
      <li>שבו או עמדו בתנוחה נוחה עם גב ישר</li>
      <li>שאפו אוויר דרך האף באופן עמוק</li>
      <li>בעת הנשיפה, הפיקו צליל "הממממ" בטון נוח</li>
      <li>הרגישו את הרטט בשפתיים, באף ובלחיים</li>
      <li>חזרו על התרגיל במשך 2-3 דקות, תוך שינוי הטון מגבוה לנמוך</li>
    </ul>
    <p>תרגיל זה מסייע להפחית מתח במיתרי הקול ומשפר את הרזוננס (תהודה) של הקול.</p>
    
    <h2>2. תרגיל הלשון והשפתיים</h2>
    <p>תרגיל זה מחזק את שרירי הלשון והשפתיים, החיוניים להגייה ברורה:</p>
    <ul>
      <li>הניעו את הלשון מצד לצד בפה, מהלחי הימנית לשמאלית</li>
      <li>סובבו את הלשון סביב השיניים הקדמיות והאחוריות</li>
      <li>הוציאו את הלשון החוצה ונסו לגעת בסנטר ואז באף</li>
      <li>בצעו תנועות שפתיים מוגזמות: חיוך רחב, שפתיים מכווצות, שפתיים פתוחות</li>
      <li>אמרו "מי-מה-מו-מו" בהגזמה, תוך הדגשת תנועות השפתיים</li>
    </ul>
    
    <h2>3. תרגיל נשימה סרעפתית</h2>
    <p>נשימה נכונה היא הבסיס להפקת קול בריאה:</p>
    <ul>
      <li>שכבו על הגב והניחו יד אחת על החזה ויד שנייה על הבטן</li>
      <li>שאפו אוויר דרך האף כך שהבטן תתרומם והחזה כמעט לא יזוז</li>
      <li>נשפו לאט דרך השפתיים המכווצות</li>
      <li>חזרו על התרגיל 10 פעמים</li>
      <li>נסו לבצע את אותה נשימה בישיבה ואז בעמידה</li>
    </ul>
    <p>נשימה סרעפתית מספקת תמיכת אוויר טובה יותר להפקת קול, מפחיתה מתח בגרון ומאפשרת דיבור ממושך יותר ללא עייפות.</p>
    
    <h2>4. תרגיל סולמות קוליים</h2>
    <p>תרגיל זה מרחיב את טווח הקול ומשפר את הגמישות של מיתרי הקול:</p>
    <ul>
      <li>התחילו בטון נמוך נוח ואמרו "מה-מה-מה-מה-מה" תוך עלייה בסולם</li>
      <li>המשיכו לעלות עד לטון הגבוה ביותר שנוח לכם</li>
      <li>רדו בחזרה לטון הנמוך</li>
      <li>חזרו על התרגיל עם הברות שונות: "מי", "מו", "לה", "זי"</li>
    </ul>
    <p>חשוב: אל תדחפו את הקול לטווחים לא נוחים. הקשיבו לגוף שלכם והימנעו מכאב או מאמץ יתר.</p>
    
    <h2>5. תרגיל הקשת הקולית</h2>
    <p>תרגיל זה משפר את השליטה בעוצמת הקול:</p>
    <ul>
      <li>התחילו בלחישה של המשפט "הקול שלי חזק ובריא"</li>
      <li>חזרו על המשפט בהדרגה בקול חזק יותר</li>
      <li>הגיעו לעוצמה בינונית-חזקה (לא צעקה!)</li>
      <li>חזרו בהדרגה ללחישה</li>
      <li>שימו לב לתחושות בגרון ולאיכות הקול בכל רמת עוצמה</li>
    </ul>
    
    <blockquote>
      "תרגול יומי של 10-15 דקות יכול לחולל פלאים באיכות הקול שלכם. כמו כל שריר בגוף, גם מערכת הקול זקוקה לאימון קבוע כדי לתפקד במיטבה."
    </blockquote>
    
    <h2>טיפים נוספים לשמירה על הקול</h2>
    <ul>
      <li>שתו מים בטמפרטורת החדר לאורך היום</li>
      <li>הימנעו מקפאין ואלכוהול בכמויות גדולות</li>
      <li>הימנעו מדיבור ממושך בסביבות רועשות</li>
      <li>אל תלחשו - זה מאמץ את מיתרי הקול יותר מדיבור רגיל</li>
      <li>תנו לקול לנוח אחרי מאמץ קולי</li>
    </ul>
    
    <p>אם אתם חווים צרידות מתמשכת, כאבים בגרון בזמן דיבור או שינויים באיכות הקול שנמשכים מעל שבועיים, מומלץ להתייעץ עם קלינאי תקשורת המתמחה בקול.</p>
  `},Nm={id:6,title:"דיסלקציה - מעבר לקשיי קריאה",slug:"dyslexia-beyond-reading",date:"15 במאי, 2025",excerpt:"דיסלקציה היא יותר מקושי בקריאה. כיצד היא משפיעה על היבטים נוספים בחיי הילד ומהן דרכי ההתמודדות?",image:"/images/blog/dyslexia.jpg",categories:["language","children","research"],content:`
    <p>דיסלקציה היא לקות למידה נוירו-התפתחותית המשפיעה בעיקר על היכולת לקרוא בדיוק ובשטף. אך מעבר לקשיי הקריאה הגלויים לעין, דיסלקציה משפיעה על מגוון רחב של תפקודים קוגניטיביים ורגשיים.</p>
    
    <h2>מהי דיסלקציה?</h2>
    <p>דיסלקציה מוגדרת כלקות למידה ספציפית המתאפיינת בקשיים בדיוק ו/או שטף בזיהוי מילים, ביכולת פענוח ירודה ובקשיים באיות. קשיים אלה נובעים מחסך במרכיב הפונולוגי של השפה, שאינו תואם את רמת האינטליגנציה הכללית של האדם.</p>
    
    <h2>מעבר לקריאה - השפעות נוספות של דיסלקציה</h2>
    
    <h3>1. עיבוד שפתי</h3>
    <p>אנשים עם דיסלקציה עשויים להתמודד עם:</p>
    <ul>
      <li>קושי בשליפת מילים מהזיכרון</li>
      <li>קשיים בהבנת הוראות מורכבות</li>
      <li>קושי בארגון רעיונות בכתב ובעל-פה</li>
      <li>קשיים בהבנת מטאפורות, ניבים וביטויים</li>
    </ul>
    
    <h3>2. זיכרון עבודה</h3>
    <p>זיכרון העבודה, האחראי על אחסון ועיבוד מידע בו-זמנית, מושפע לעתים קרובות:</p>
    <ul>
      <li>קושי בזכירת רצף הוראות</li>
      <li>קושי בביצוע חישובים מנטליים</li>
      <li>שכחת מה שנקרא בתחילת המשפט כשמגיעים לסופו</li>
    </ul>
    
    <h3>3. ארגון וניהול זמן</h3>
    <ul>
      <li>קושי בארגון משימות וחומרי למידה</li>
      <li>התמודדות עם לוחות זמנים ומועדי הגשה</li>
      <li>קושי בתכנון ארוך טווח</li>
    </ul>
    
    <h3>4. היבטים רגשיים וחברתיים</h3>
    <p>ההשפעה הרגשית של דיסלקציה יכולה להיות משמעותית:</p>
    <ul>
      <li>תחושות תסכול וחרדה סביב למידה</li>
      <li>פגיעה בדימוי העצמי ובביטחון</li>
      <li>הימנעות ממשימות הקשורות לקריאה וכתיבה</li>
      <li>לעתים, קשיים חברתיים הנובעים מתחושת שונות</li>
    </ul>
    
    <h2>חוזקות של אנשים עם דיסלקציה</h2>
    <p>לצד האתגרים, אנשים עם דיסלקציה מפתחים לעתים קרובות חוזקות ייחודיות:</p>
    <ul>
      <li>חשיבה יצירתית וראייה הוליסטית</li>
      <li>יכולת פתרון בעיות מחוץ לקופסה</li>
      <li>חשיבה מרחבית מפותחת</li>
      <li>יכולות ויזואליות גבוהות</li>
      <li>אינטואיציה וחשיבה אסטרטגית</li>
    </ul>
    
    <blockquote>
      "דיסלקציה אינה מדד לאינטליגנציה. רבים מהמוחות המבריקים והיצירתיים ביותר בהיסטוריה התמודדו עם דיסלקציה, ביניהם אלברט איינשטיין, ליאונרדו דה וינצ'י, וולט דיסני וסטיב ג'ובס."
    </blockquote>
    
    <h2>אסטרטגיות תמיכה והתערבות</h2>
    
    <h3>בבית הספר:</h3>
    <ul>
      <li>הוראה רב-חושית המשלבת ראייה, שמיעה ותנועה</li>
      <li>שימוש בטכנולוגיה מסייעת (תוכנות הקראה, הכתבה)</li>
      <li>התאמות בדרכי היבחנות (תוספת זמן, הקראת שאלות)</li>
      <li>חלוקת משימות גדולות לצעדים קטנים יותר</li>
      <li>שימוש באמצעים ויזואליים להמחשת מידע</li>
    </ul>
    
    <h3>בבית:</h3>
    <ul>
      <li>יצירת סביבת למידה מאורגנת ומינימליסטית</li>
      <li>שימוש בקודים צבעוניים לארגון חומרים</li>
      <li>הקצאת זמן נוסף למשימות הקשורות לקריאה וכתיבה</li>
      <li>האזנה לספרים מוקלטים במקביל לקריאה</li>
      <li>תרגול קריאה קצר ויומיומי בחומרים מעניינים</li>
    </ul>
    
    <h2>חשיבות האבחון המוקדם</h2>
    <p>אבחון מוקדם של דיסלקציה מאפשר התערבות מוקדמת ומונע את "אפקט הכדור השלג" - כאשר פערים לימודיים קטנים הופכים לגדולים יותר עם הזמן. סימנים מוקדמים לדיסלקציה יכולים להופיע כבר בגיל הגן:</p>
    <ul>
      <li>קושי בחריזה ובמשחקי מילים</li>
      <li>קושי בזכירת שמות אותיות וצליליהן</li>
      <li>היסטוריה משפחתית של קשיי קריאה</li>
      <li>התפתחות שפתית מעט איטית</li>
      <li>קושי בזכירת רצפים (ימי השבוע, אותיות האלפבית)</li>
    </ul>
    
    <p>חשוב לזכור: דיסלקציה היא דרך שונה של עיבוד מידע, לא חסרון באינטליגנציה. עם תמיכה מתאימה, אסטרטגיות למידה יעילות וטיפוח החוזקות, ילדים ומבוגרים עם דיסלקציה יכולים להצליח בכל תחום שיבחרו.</p>
  `},jm={id:7,title:"תקשורת יעילה עם ילדים על הספקטרום האוטיסטי",slug:"communication-with-autistic-children",date:"5 במאי, 2025",excerpt:"אסטרטגיות מעשיות לשיפור התקשורת והאינטראקציה עם ילדים על הספקטרום האוטיסטי בבית ובמסגרות חינוכיות",image:"/images/blog/autism-communication.jpg",categories:["communication","children","tips"],content:`
    <p>תקשורת יעילה היא אתגר מרכזי עבור ילדים על הספקטרום האוטיסטי והסובבים אותם. הבנת הדרכים הייחודיות בהן ילדים אלה מעבדים מידע ומתקשרים יכולה לשפר משמעותית את האינטראקציות היומיומיות ולתמוך בהתפתחותם.</p>
    
    <h2>הבנת האתגרים התקשורתיים</h2>
    <p>ילדים על הספקטרום האוטיסטי עשויים להתמודד עם מגוון אתגרים תקשורתיים:</p>
    <ul>
      <li>קושי בהבנת רמזים חברתיים לא מילוליים (שפת גוף, הבעות פנים)</li>
      <li>פירוש מילולי של שפה (קושי בהבנת הומור, מטאפורות וניבים)</li>
      <li>קושי בתורנות בשיחה</li>
      <li>רגישות יתר לגירויים חושיים המשפיעה על הקשב והריכוז</li>
      <li>שימוש מוגבל או ייחודי בשפה מילולית</li>
    </ul>
    
    <h2>אסטרטגיות לתקשורת יעילה</h2>
    
    <h3>1. התאמת הסביבה</h3>
    <p>סביבה מותאמת יכולה לתמוך משמעותית בתקשורת:</p>
    <ul>
      <li>הפחתת רעשי רקע ומסיחים חזותיים</li>
      <li>יצירת פינה שקטה לתקשורת ולמידה</li>
      <li>שימוש בתאורה נעימה (הימנעות מאורות פלורסנט חזקים)</li>
      <li>ארגון הסביבה באופן צפוי וברור</li>
    </ul>
    
    <h3>2. התאמת התקשורת המילולית</h3>
    <ul>
      <li>שימוש במשפטים קצרים וברורים</li>
      <li>הימנעות מביטויים מופשטים וכפל משמעות</li>
      <li>מתן זמן מספיק לעיבוד המידע ולתגובה</li>
      <li>שימוש בשאלות סגורות וממוקדות במקום שאלות פתוחות</li>
      <li>חזרה על מסרים חשובים באופן עקבי</li>
    </ul>
    
    <h3>3. תמיכה חזותית</h3>
    <p>אמצעים חזותיים יכולים לשפר משמעותית את ההבנה והתקשורת:</p>
    <ul>
      <li>לוחות תקשורת עם תמונות או סמלים</li>
      <li>סדר יום חזותי המציג את רצף הפעילויות</li>
      <li>שימוש בתמונות להמחשת הוראות</li>
      <li>כרטיסיות עם רגשות להבעת צרכים ותחושות</li>
      <li>מחוונים חזותיים לזמן (שעון חול, טיימר)</li>
    </ul>
    
    <blockquote>
      "כאשר אנו מתאימים את דרכי התקשורת שלנו לצרכים הייחודיים של הילד, אנו פותחים דלת לעולמו ומאפשרים לו להביע את עצמו ולהבין את העולם סביבו."
    </blockquote>
    
    <h3>4. תקשורת תומכת וחלופית (תת"ח)</h3>
    <p>עבור ילדים עם מוגבלות משמעותית בתקשורת מילולית, שיטות תת"ח יכולות להיות חיוניות:</p>
    <ul>
      <li>מערכות תקשורת מבוססות תמונות (כמו PECS)</li>
      <li>מכשירי תקשורת אלקטרוניים עם פלט קולי</li>
      <li>אפליקציות תקשורת לטאבלט או סמארטפון</li>
      <li>שפת סימנים או סימנים מוסכמים</li>
    </ul>
    
    <h3>5. פיתוח מיומנויות חברתיות</h3>
    <ul>
      <li>שימוש בסיפורים חברתיים להסבר מצבים חברתיים</li>
      <li>משחקי תפקידים להדגמת אינטראקציות</li>
      <li>תרגול מפורש של כללי שיחה (תורנות, נושאי שיחה מתאימים)</li>
      <li>זיהוי והבנת רגשות דרך תמונות והדגמות</li>
    </ul>
    
    <h2>אסטרטגיות למצבים ספציפיים</h2>
    
    <h3>בזמן למידה:</h3>
    <ul>
      <li>חלוקת משימות מורכבות לצעדים קטנים וברורים</li>
      <li>שימוש ברשימות תיוג (צ'ק-ליסט) למעקב אחר התקדמות</li>
      <li>מתן הנחיות בכתב או בצורה חזותית</li>
      <li>הפסקות קצרות ומתוכננות מראש</li>
    </ul>
    
    <h3>בזמן מעברים:</h3>
    <ul>
      <li>הכנה מראש לשינויים בשגרה</li>
      <li>שימוש בטיימר חזותי להמחשת זמן המעבר</li>
      <li>יצירת שגרות קבועות למעברים</li>
      <li>שימוש באובייקט מעבר מרגיע</li>
    </ul>
    
    <h3>בזמן מצוקה:</h3>
    <ul>
      <li>זיהוי מוקדם של סימני מצוקה</li>
      <li>מתן אפשרות לפרישה לפינה שקטה</li>
      <li>שימוש באסטרטגיות הרגעה מותאמות אישית</li>
      <li>הימנעות מעומס מילולי בזמן מצוקה</li>
      <li>שימוש בכרטיסיות או תמונות לזיהוי הבעיה והפתרון</li>
    </ul>
    
    <h2>חשיבות העקביות והשיתוף</h2>
    <p>אחד המפתחות להצלחה בתקשורת עם ילדים על הספקטרום האוטיסטי הוא עקביות בין כל הסביבות והאנשים בחייהם:</p>
    <ul>
      <li>שיתוף פעולה בין הבית, המסגרת החינוכית והמטפלים</li>
      <li>שימוש באותן אסטרטגיות תקשורת בכל הסביבות</li>
      <li>העברת מידע שוטף בין כל הגורמים המעורבים</li>
      <li>תיעוד אסטרטגיות יעילות ושיתופן</li>
    </ul>
    
    <p>חשוב לזכור שכל ילד על הספקטרום האוטיסטי הוא ייחודי, עם חוזקות, אתגרים והעדפות משלו. האסטרטגיות היעילות ביותר הן אלו המותאמות אישית לצרכיו הספציפיים של הילד, תוך התחשבות בגילו, יכולותיו והסביבה בה הוא נמצא.</p>
  `},Em={id:8,title:"איחור בהתפתחות שפה - מתי לדאוג ומתי להירגע",slug:"language-development-delay",date:"20 באפריל, 2025",excerpt:"כיצד לזהות איחור בהתפתחות שפה אצל פעוטות, מתי כדאי לפנות לאבחון וכיצד לעודד התפתחות שפתית תקינה",image:"/images/blog/language-development.jpg",categories:["language","children","development"],content:`
    <p>התפתחות השפה היא אחד התהליכים המרתקים והמשמעותיים בהתפתחות הילד. כהורים, אנו עוקבים בהתרגשות אחר המילים הראשונות והמשפטים המתארכים, אך לעתים עולות דאגות כאשר ההתפתחות אינה תואמת את הציפיות או את קצב ההתפתחות של ילדים אחרים.</p>
    
    <h2>אבני דרך בהתפתחות שפה תקינה</h2>
    <p>חשוב להכיר את טווח ההתפתחות התקין כדי לזהות איחור אפשרי:</p>
    
    <h3>גיל 0-6 חודשים:</h3>
    <ul>
      <li>תגובה לקולות ורעשים</li>
      <li>מבטא קולות שונים (בכי, גרגור)</li>
      <li>מחייך ו"משוחח" עם המטפל העיקרי</li>
    </ul>
    
    <h3>גיל 6-12 חודשים:</h3>
    <ul>
      <li>מגיב לשמו</li>
      <li>מבין מילים פשוטות ("לא", "ביי-ביי")</li>
      <li>מתחיל במלמול הברתי ("בה-בה", "מה-מה")</li>
      <li>משתמש במחוות תקשורתיות (הצבעה, נפנוף לשלום)</li>
    </ul>
    
    <h3>גיל 12-18 חודשים:</h3>
    <ul>
      <li>אומר 5-20 מילים בודדות</li>
      <li>מבין הוראות פשוטות ("תן לי", "בוא הנה")</li>
      <li>מצביע על חפצים מוכרים כשנשאל</li>
    </ul>
    
    <h3>גיל 18-24 חודשים:</h3>
    <ul>
      <li>אוצר מילים של 50-100 מילים</li>
      <li>מתחיל לחבר 2 מילים יחד ("אמא בוא", "עוד מים")</li>
      <li>מבין שאלות פשוטות</li>
      <li>משתמש במילים להביע רצונות וצרכים</li>
    </ul>
    
    <h3>גיל 2-3 שנים:</h3>
    <ul>
      <li>משתמש במשפטים של 3-4 מילים</li>
      <li>שואל שאלות פשוטות</li>
      <li>מדבר על אירועים שקרו בעבר הקרוב</li>
      <li>אוצר מילים של 200-300 מילים</li>
    </ul>
    
    <h3>גיל 3-4 שנים:</h3>
    <ul>
      <li>מספר סיפורים קצרים</li>
      <li>משתמש במשפטים מורכבים יותר</li>
      <li>מבין הוראות מורכבות יותר</li>
      <li>שואל שאלות רבות ("למה?", "מתי?")</li>
    </ul>
    
    <h2>סימנים לאיחור בהתפתחות שפה</h2>
    <p>מתי כדאי להתייעץ עם אנשי מקצוע? הנה כמה סימנים שכדאי לשים לב אליהם:</p>
    
    <h3>עד גיל שנה:</h3>
    <ul>
      <li>חוסר תגובה לקולות או לשמו</li>
      <li>היעדר מלמול או קולות תקשורתיים</li>
      <li>חוסר עניין באינטראקציה חברתית</li>
    </ul>
    
    <h3>גיל 12-18 חודשים:</h3>
    <ul>
      <li>לא אומר אף מילה בודדת</li>
      <li>לא מבין הוראות פשוטות</li>
      <li>לא משתמש במחוות תקשורתיות (הצבעה)</li>
    </ul>
    
    <h3>גיל 18-24 חודשים:</h3>
    <ul>
      <li>אוצר מילים מצומצם מאוד (פחות מ-10 מילים)</li>
      <li>לא מתחיל לחבר מילים</li>
      <li>איבוד מיומנויות שפתיות שכבר נרכשו</li>
    </ul>
    
    <h3>גיל 2-3 שנים:</h3>
    <ul>
      <li>דיבור לא מובן למשפחה הקרובה</li>
      <li>לא מצליח ליצור משפטים קצרים</li>
      <li>קושי בהבנת הוראות פשוטות</li>
    </ul>
    
    <blockquote>
      "חשוב לזכור שכל ילד מתפתח בקצב שלו, וישנו טווח רחב של 'נורמלי'. עם זאת, התערבות מוקדמת במקרה של איחור אמיתי היא המפתח למניעת פערים עתידיים."
    </blockquote>
    
    <h2>גורמים אפשריים לאיחור בהתפתחות שפה</h2>
    <p>איחור בהתפתחות שפה יכול לנבוע ממגוון גורמים:</p>
    <ul>
      <li>איחור התפתחותי כללי</li>
      <li>ליקוי שמיעה</li>
      <li>הפרעה על הספקטרום האוטיסטי</li>
      <li>הפרעות נוירולוגיות</li>
      <li>גורמים סביבתיים (חשיפה מוגבלת לשפה)</li>
      <li>איחור התפתחותי ספציפי בשפה (SLI)</li>
      <li>דו-לשוניות או רב-לשוניות (לעתים גורמת לאיחור זמני)</li>
    </ul>
    
    <h2>מתי לפנות לאבחון?</h2>
    <p>מומלץ להתייעץ עם רופא הילדים וקלינאי תקשורת אם:</p>
    <ul>
      <li>הילד אינו עומד באבני הדרך ההתפתחותיות המתוארות לעיל</li>
      <li>קיים פער משמעותי בין הבנת שפה להבעת שפה</li>
      <li>הילד מאבד מיומנויות שפתיות שכבר רכש</li>
      <li>הדיבור אינו מובן לסביבה הקרובה בגיל שבו הוא אמור להיות מובן</li>
      <li>קיימת דאגה הורית משמעותית</li>
    </ul>
    
    <h2>כיצד לעודד התפתחות שפה תקינה</h2>
    
    <h3>בגיל הרך (0-2):</h3>
    <ul>
      <li>דיבור רב עם התינוק, תיאור פעולות יומיומיות</li>
      <li>קריאת ספרים מגיל צעיר מאוד</li>
      <li>שירים, חרוזים ומשחקי אצבעות</li>
      <li>תגובה לקולות וניסיונות תקשורת של התינוק</li>
      <li>משחק פנים אל פנים</li>
    </ul>
    
    <h3>בגיל הגן (2-5):</h3>
    <ul>
      <li>הרחבת משפטי הילד (כשהילד אומר "כלב גדול", אפשר להגיב: "כן, זה כלב גדול וחום")</li>
      <li>משחקי מילים, חרוזים וסיפורים</li>
      <li>שיחות על חוויות יומיומיות</li>
      <li>הקשבה פעילה לילד</li>
      <li>משחקי דמיון ומשחקי תפקידים</li>
      <li>הגבלת זמן מסך</li>
    </ul>
    
    <h2>התערבות מוקדמת</h2>
    <p>במקרה של איחור בהתפתחות שפה, התערבות מוקדמת היא קריטית:</p>
    <ul>
      <li>טיפול אצל קלינאי תקשורת</li>
      <li>תכניות התערבות מותאמות אישית</li>
      <li>הדרכת הורים לתמיכה בהתפתחות השפה בבית</li>
      <li>בדיקת שמיעה במקרה הצורך</li>
      <li>התייחסות לגורמים נלווים (כמו קשיים חברתיים או התנהגותיים)</li>
    </ul>
    
    <p>חשוב לזכור שרוב הילדים עם איחור קל בהתפתחות שפה "תופסים" את הפער בהמשך, במיוחד עם תמיכה מתאימה. עם זאת, אין להמעיט בחשיבות האבחון והטיפול המוקדם, שיכולים למנוע קשיים עתידיים בלמידה, בקריאה ובכתיבה ובהשתלבות החברתית.</p>
  `},Cm={id:9,title:"שיקום תקשורתי לאחר שבץ מוחי - המדריך המקיף",slug:"stroke-communication-rehabilitation",date:"10 באפריל, 2025",excerpt:"כיצד מתמודדים עם קשיי תקשורת לאחר שבץ מוחי? מדריך מקיף לשיקום, טיפול ותמיכה במטופלים ובני משפחותיהם",image:"/images/blog/stroke-rehab.jpg",categories:["rehabilitation","adults","communication"],content:`
    <p>שבץ מוחי עלול לגרום לשינויים משמעותיים ביכולות התקשורת, החל מקשיים קלים בשליפת מילים ועד לאובדן מוחלט של יכולת הדיבור. שיקום תקשורתי הוא חלק חיוני בתהליך ההחלמה, ומטרתו לסייע למטופל לשקם את יכולות התקשורת או לפתח אסטרטגיות חלופיות.</p>
    
    <h2>הפרעות תקשורת נפוצות לאחר שבץ מוחי</h2>
    
    <h3>1. אפזיה (Aphasia)</h3>
    <p>אפזיה היא הפרעה בהבנה ו/או הבעה של שפה, הנגרמת כתוצאה מפגיעה באזורי השפה במוח:</p>
    <ul>
      <li><strong>אפזיה של ברוקה:</strong> קושי בהפקת דיבור שוטף, אך הבנת שפה יחסית שמורה</li>
      <li><strong>אפזיה של ורניקה:</strong> דיבור שוטף אך חסר משמעות, עם קשיים בהבנת שפה</li>
      <li><strong>אפזיה גלובלית:</strong> פגיעה חמורה הן בהבנה והן בהבעה</li>
      <li><strong>אפזיה אנומית:</strong> קושי בשליפת שמות עצם וביטוי מדויק</li>
    </ul>
    
    <h3>2. דיזארתריה (Dysarthria)</h3>
    <p>דיזארתריה היא הפרעה בהפקת דיבור הנובעת מחולשה או חוסר קואורדינציה של שרירי הדיבור. המטופל מתקשה בהגייה ברורה, אך הבנת והפקת שפה תקינות.</p>
    
    <h3>3. אפרקסיה של הדיבור (Apraxia of Speech)</h3>
    <p>קושי בתכנון ובביצוע תנועות הדיבור, למרות שאין חולשה בשרירים. המטופל יודע מה הוא רוצה לומר אך מתקשה בהפקת הצלילים בסדר הנכון.</p>
    
    <h3>4. קשיים קוגניטיביים-תקשורתיים</h3>
    <p>קשיים בהיבטים הקוגניטיביים של תקשורת, כגון:</p>
    <ul>
      <li>קושי בהבנת הומור או ביטויים מופשטים</li>
      <li>קושי בניהול שיחה (תורנות, נושאי שיחה)</li>
      <li>קושי בארגון מחשבות ורעיונות</li>
      <li>בעיות בזיכרון המשפיעות על תקשורת</li>
    </ul>
    
    <h2>תהליך השיקום התקשורתי</h2>
    
    <h3>1. הערכה מקיפה</h3>
    <p>השיקום מתחיל בהערכה מקצועית על ידי קלינאי תקשורת, הכוללת:</p>
    <ul>
      <li>בדיקת יכולות הבנת שפה (מילים, משפטים, הוראות)</li>
      <li>הערכת יכולות הבעה (שיום, חזרה, דיבור ספונטני)</li>
      <li>בדיקת קריאה וכתיבה</li>
      <li>הערכת תפקודי שרירי הדיבור</li>
      <li>בחינת יכולות תקשורתיות בסיטואציות יומיומיות</li>
    </ul>
    
    <h3>2. קביעת מטרות טיפול</h3>
    <p>בהתאם לתוצאות ההערכה, נקבעות מטרות טיפול מותאמות אישית:</p>
    <ul>
      <li>שיפור יכולות שפתיות ספציפיות</li>
      <li>פיתוח אסטרטגיות תקשורת חלופיות</li>
      <li>שיפור תפקוד תקשורתי בסיטואציות יומיומיות</li>
      <li>הדרכת המשפחה והסביבה</li>
    </ul>
    
    <h3>3. גישות טיפוליות</h3>
    
    <h4>לאפזיה:</h4>
    <ul>
      <li><strong>טיפול שפתי ממוקד:</strong> תרגול אינטנסיבי של מיומנויות שפתיות ספציפיות</li>
      <li><strong>תרפיה מוזיקלית:</strong> ניצול יכולות מוזיקליות לשיפור הפקת דיבור</li>
      <li><strong>טיפול קבוצתי:</strong> תרגול תקשורת בסביבה חברתית תומכת</li>
      <li><strong>טיפול ממוחשב:</strong> תוכנות ואפליקציות לתרגול עצמאי</li>
    </ul>
    
    <h4>לדיזארתריה:</h4>
    <ul>
      <li>תרגילים לחיזוק שרירי הדיבור</li>
      <li>טכניקות לשיפור הנשימה והקול</li>
      <li>אסטרטגיות להגברת בהירות הדיבור</li>
      <li>התאמת קצב ועוצמת דיבור</li>
    </ul>
    
    <h4>לאפרקסיה:</h4>
    <ul>
      <li>תרגול חזרתי של תנועות דיבור</li>
      <li>גישות רב-חושיות (שמיעה, ראייה, תחושה)</li>
      <li>טכניקות מקצב ודיבור מוטעם</li>
    </ul>
    
    <blockquote>
      "השיקום התקשורתי הוא מסע ארוך הדורש סבלנות, התמדה ותמיכה. ההתקדמות עשויה להיות איטית, אך כל צעד קטן הוא הישג משמעותי בדרך לעצמאות תקשורתית."
    </blockquote>
    
    <h2>תקשורת תומכת וחלופית (תת"ח)</h2>
    <p>במקרים של פגיעה חמורה ביכולת הדיבור, תקשורת תומכת וחלופית יכולה להיות חיונית:</p>
    <ul>
      <li>לוחות תקשורת עם תמונות, סמלים או מילים</li>
      <li>מכשירי תקשורת אלקטרוניים עם פלט קולי</li>
      <li>אפליקציות תקשורת לטאבלט או סמארטפון</li>
      <li>מחוות ושפת גוף מוסכמת</li>
    </ul>
    
    <h2>תפקיד המשפחה בשיקום</h2>
    <p>למשפחה תפקיד מכריע בתהליך השיקום התקשורתי:</p>
    <ul>
      <li>יצירת סביבה תומכת ומעודדת תקשורת</li>
      <li>למידת אסטרטגיות תקשורת יעילות עם המטופל</li>
      <li>תרגול יומיומי של מיומנויות שנלמדו בטיפול</li>
      <li>התאמת סביבת הבית לצרכים התקשורתיים</li>
      <li>מתן זמן ואפשרות למטופל להביע את עצמו</li>
    </ul>
    
    <h3>טיפים לתקשורת יעילה עם אדם עם אפזיה:</h3>
    <ul>
      <li>דברו בקצב איטי ובמשפטים פשוטים</li>
      <li>השתמשו בשאלות סגורות (כן/לא) כשניתן</li>
      <li>השתמשו בג'סטות ובעזרים חזותיים</li>
      <li>אפשרו זמן תגובה מספיק</li>
      <li>הימנעו מתיקון שגיאות באופן תכוף</li>
      <li>התמקדו במסר ולא בדיוק הלשוני</li>
    </ul>
    
    <h2>התמודדות רגשית</h2>
    <p>קשיי תקשורת לאחר שבץ עלולים להוביל לתסכול, בידוד חברתי ודיכאון. חשוב להתייחס גם להיבטים הרגשיים:</p>
    <ul>
      <li>תמיכה פסיכולוגית למטופל ולמשפחה</li>
      <li>קבוצות תמיכה לאנשים עם אפזיה ובני משפחותיהם</li>
      <li>עידוד השתתפות בפעילויות חברתיות מותאמות</li>
      <li>הכרה בתסכול ובקשיים הרגשיים</li>
    </ul>
    
    <h2>מחקרים וטיפולים חדשניים</h2>
    <p>תחום השיקום התקשורתי לאחר שבץ מתפתח כל העת:</p>
    <ul>
      <li>גרייה מוחית לא פולשנית (tDCS, TMS)</li>
      <li>טיפול אינטנסיבי מרוכז (CIAT)</li>
      <li>טכנולוגיות מציאות מדומה ומציאות רבודה</li>
      <li>אפליקציות ותוכנות מתקדמות לתרגול עצמאי</li>
    </ul>
    
    <p>חשוב לזכור שהשיקום התקשורתי הוא תהליך ממושך, והתקדמות יכולה להימשך חודשים ואף שנים לאחר השבץ. עם זאת, מחקרים מראים שיפור משמעותי ביכולות תקשורתיות גם שנים לאחר הפגיעה, כאשר ניתן טיפול מתאים ועקבי.</p>
  `},_m={id:10,title:"בליעה בטוחה בגיל השלישי - מניעת דיספגיה וסיבוכיה",slug:"safe-swallowing-elderly",date:"1 באפריל, 2025",excerpt:"הפרעות בליעה (דיספגיה) נפוצות בקרב קשישים ועלולות להוביל לסיבוכים חמורים. כיצד לזהות, למנוע ולטפל בבעיות בליעה?",image:"/images/blog/swallowing-elderly.jpg",categories:["swallowing","adults","tips"],content:`
    <p>הפרעות בליעה, או בשמן המקצועי דיספגיה, הן בעיה נפוצה בקרב האוכלוסייה המבוגרת. עם העלייה בגיל, חלים שינויים פיזיולוגיים במנגנון הבליעה שעלולים להוביל לקשיים בבליעה בטוחה ויעילה. זיהוי מוקדם וטיפול נכון בהפרעות בליעה יכולים למנוע סיבוכים חמורים ולשפר משמעותית את איכות החיים.</p>
    
    <h2>מהי דיספגיה?</h2>
    <p>דיספגיה היא קושי או אי-נוחות בהעברת מזון או נוזלים מהפה לקיבה. התהליך הנורמלי של בליעה כולל מספר שלבים מתואמים היטב:</p>
    <ol>
      <li><strong>השלב האוראלי:</strong> עיבוד המזון בפה והכנתו לבליעה</li>
      <li><strong>השלב הפרינגיאלי:</strong> הפעלת רפלקס הבליעה והעברת המזון לוושט</li>
      <li><strong>השלב הוושטי:</strong> העברת המזון לאורך הוושט לקיבה</li>
    </ol>
    <p>הפרעה בכל אחד משלבים אלה יכולה להוביל לדיספגיה.</p>
    
    <h2>גורמים לדיספגיה בגיל המבוגר</h2>
    <ul>
      <li>שינויים פיזיולוגיים הקשורים לגיל (ירידה בכוח השרירים, ירידה בתחושה)</li>
      <li>מחלות נוירולוגיות (שבץ מוחי, פרקינסון, דמנציה)</li>
      <li>מחלות של מערכת העיכול</li>
      <li>תופעות לוואי של תרופות</li>
      <li>טיפולים אונקולוגיים באזור הראש והצוואר</li>
      <li>מחלות נשימתיות כרוניות</li>
    </ul>
    
    <h2>סימנים אזהרה לבעיות בליעה</h2>
    <p>חשוב להכיר את הסימנים המעידים על קשיי בליעה:</p>
    <ul>
      <li>שיעול או חנק בזמן או אחרי האכילה</li>
      <li>קול "רטוב" או גרגור אחרי בליעה</li>
      <li>תחושת "תקיעות" של מזון בגרון</li>
      <li>דליפת מזון או נוזלים מהפה</li>
      <li>קושי בלעיסה</li>
      <li>כאב בזמן בליעה</li>
      <li>ירידה לא מוסברת במשקל</li>
      <li>דלקות ריאה חוזרות</li>
      <li>הימנעות ממזונות מסוימים</li>
      <li>זמן ארוך יותר לסיום ארוחות</li>
    </ul>
    
    <h2>סיבוכים אפשריים של דיספגיה</h2>
    <p>דיספגיה שאינה מטופלת עלולה להוביל לסיבוכים חמורים:</p>
    <ul>
      <li><strong>אספירציה:</strong> חדירת מזון או נוזלים לדרכי הנשימה</li>
      <li><strong>דלקת ריאות שאיפתית:</strong> זיהום בריאות כתוצאה מאספירציה</li>
      <li><strong>התייבשות:</strong> בשל הימנעות משתייה</li>
      <li><strong>תת-תזונה:</strong> בשל צמצום כמות ומגוון המזון</li>
      <li><strong>בידוד חברתי:</strong> הימנעות מארוחות משותפות</li>
      <li><strong>דיכאון:</strong> כתוצאה מירידה באיכות החיים</li>
    </ul>
    
    <blockquote>
      "בליעה היא פעולה שאנו מבצעים אלפי פעמים ביום, לרוב מבלי לחשוב עליה כלל. רק כאשר מתעוררת בעיה, אנו מבינים עד כמה פעולה זו מורכבת וחיונית לבריאותנו ולאיכות חיינו."
    </blockquote>
    
    <h2>אבחון הפרעות בליעה</h2>
    <p>אבחון מקצועי של דיספגיה כולל:</p>
    <ul>
      <li><strong>הערכה קלינית:</strong> בדיקה מקיפה על ידי קלינאי תקשורת המתמחה בהפרעות בליעה</li>
      <li><strong>בדיקת וידאו-פלואורוסקופיה (VFSS):</strong> צילום רנטגן דינמי של תהליך הבליעה</li>
      <li><strong>אנדוסקופיה של הבליעה (FEES):</strong> בדיקת מנגנון הבליעה באמצעות סיב אופטי</li>
      <li><strong>מנומטריה של הוושט:</strong> בדיקת לחצים לאורך הוושט</li>
    </ul>
    
    <h2>אסטרטגיות לבליעה בטוחה</h2>
    
    <h3>התאמות תזונתיות:</h3>
    <ul>
      <li>שינוי מרקם המזון (טחינה, ריסוק)</li>
      <li>הסמכת נוזלים למניעת אספירציה</li>
      <li>הימנעות ממזונות בעייתיים (פירורי, דביק, סיבי)</li>
      <li>ארוחות קטנות ותכופות</li>
    </ul>
    
    <h3>טכניקות בליעה בטוחה:</h3>
    <ul>
      <li>ישיבה זקופה בזמן האכילה (90 מעלות)</li>
      <li>הטיית הראש קדימה בזמן הבליעה</li>
      <li>בליעה כפולה (בליעה נוספת אחרי כל ביס)</li>
      <li>הימנעות מהסחות דעת בזמן האכילה</li>
      <li>האטת קצב האכילה</li>
      <li>לגימות קטנות ונשלטות</li>
    </ul>
    
    <h3>תרגילים לחיזוק מנגנון הבליעה:</h3>
    <ul>
      <li>תרגילי חיזוק ללשון ולשפתיים</li>
      <li>תרגילי הרמת גרון</li>
      <li>תרגילי נשימה לשיפור התיאום בין נשימה לבליעה</li>
      <li>תרגול בליעה מאומצת (effortful swallow)</li>
      <li>תרגילי שאנץ (Shaker exercise) לחיזוק שרירי הצוואר</li>
    </ul>
    
    <h2>תפקיד המטפל העיקרי</h2>
    <p>למטפלים בקשישים עם דיספגיה תפקיד חשוב:</p>
    <ul>
      <li>הכרת סימני האזהרה לאספירציה</li>
      <li>הקפדה על תנוחת אכילה נכונה</li>
      <li>מתן זמן מספיק לאכילה ללא לחץ</li>
      <li>הכנת מזון במרקם המתאים</li>
      <li>שמירה על היגיינת פה טובה</li>
      <li>מעקב אחר צריכת מזון ונוזלים</li>
      <li>זיהוי סימני התייבשות או תת-תזונה</li>
    </ul>
    
    <h2>חידושים בטיפול בדיספגיה</h2>
    <p>תחום הטיפול בהפרעות בליעה מתפתח כל העת:</p>
    <ul>
      <li>גרייה חשמלית של שרירי הבליעה (NMES)</li>
      <li>ביופידבק לשיפור מודעות ושליטה במנגנון הבליעה</li>
      <li>טכנולוגיות חדשניות למדידת יעילות הבליעה</li>
      <li>פיתוח מזונות ומשקאות בעלי מרקם מותאם אך מראה וטעם טבעיים</li>
    </ul>
    
    <p>חשוב לזכור שטיפול מוקדם בהפרעות בליעה יכול למנוע סיבוכים חמורים ולשפר משמעותית את איכות החיים. אם אתם או יקירכם מזהים סימנים של קשיי בליעה, פנו בהקדם לרופא המשפחה או לקלינאי תקשורת המתמחה בהפרעות בליעה.</p>
  `},Pm={id:11,title:"התמודדות עם גמגום בגיל הבגרות - דרכי טיפול ואסטרטגיות",slug:"adult-stuttering-treatment",date:"20 במרץ, 2025",excerpt:"גמגום אינו רק בעיה של ילדות. כיצד מבוגרים יכולים להתמודד עם גמגום ולשפר את שטף הדיבור והביטחון העצמי?",image:"/images/blog/adult-stuttering.jpg",categories:["speech","adults","tips"],content:`
    <p>גמגום הוא הפרעת תקשורת המאופיינת בשיבושים בשטף הדיבור, כגון חזרות על צלילים, הארכת צלילים או חסימות. בעוד שרבים מקשרים גמגום עם ילדות, עבור כ-1% מהאוכלוסייה הבוגרת, הגמגום הוא אתגר יומיומי המשפיע על התקשורת, הביטחון העצמי והאינטראקציות החברתיות והמקצועיות.</p>
    
    <h2>גמגום בגיל הבגרות - מאפיינים ואתגרים</h2>
    <p>גמגום אצל מבוגרים מתאפיין בדרך כלל בשלושה מרכיבים עיקריים:</p>
    <ul>
      <li><strong>מרכיבים גלויים:</strong> חזרות, הארכות, חסימות והפסקות בדיבור</li>
      <li><strong>מרכיבים סמויים:</strong> הימנעות ממצבי תקשורת, החלפת מילים, חרדה חברתית</li>
      <li><strong>רגשות ועמדות:</strong> תסכול, בושה, חרדה, דימוי עצמי נמוך</li>
    </ul>
    
    <p>האתגרים הייחודיים למבוגרים המגמגמים כוללים:</p>
    <ul>
      <li>השפעה על קריירה ואפשרויות תעסוקה</li>
      <li>מורכבות ביחסים בינאישיים ורומנטיים</li>
      <li>דפוסי הימנעות מושרשים</li>
      <li>התמודדות עם סטיגמות חברתיות</li>
    </ul>
    
    <h2>גישות טיפוליות לגמגום אצל מבוגרים</h2>
    <p>הטיפול בגמגום אצל מבוגרים מתמקד בדרך כלל בשני מסלולים מקבילים:</p>
    
    <h3>1. טכניקות לשיפור שטף הדיבור</h3>
    <ul>
      <li><strong>דיבור מוקצב:</strong> דיבור בקצב איטי ומבוקר, לעתים בעזרת מטרונום או הקשה</li>
      <li><strong>התחלה רכה:</strong> התחלת הדיבור עם זרימת אוויר הדרגתית ומתונה</li>
      <li><strong>קישור פונטי:</strong> חיבור מילים ברצף ללא הפסקות</li>
      <li><strong>שליטה בנשימה:</strong> טכניקות נשימה לתמיכה בדיבור שוטף</li>
      <li><strong>הארכה מבוקרת:</strong> הארכה קלה של תנועות לשיפור המעבר בין צלילים</li>
    </ul>
    
    <h3>2. התמודדות עם המרכיבים הרגשיים והקוגניטיביים</h3>
    <ul>
      <li><strong>טיפול קוגניטיבי-התנהגותי (CBT):</strong> שינוי דפוסי חשיבה שליליים לגבי הדיבור</li>
      <li><strong>קבלה ומחויבות (ACT):</strong> פיתוח קבלה של הגמגום תוך מחויבות לפעולה חיובית</li>
      <li><strong>חשיפה הדרגתית:</strong> התמודדות הדרגתית עם מצבי תקשורת מאתגרים</li>
      <li><strong>מיינדפולנס:</strong> פיתוח מודעות לרגע הנוכחי ללא שיפוטיות</li>
    </ul>
    
    <blockquote>
      "הצלחה בטיפול בגמגום אינה נמדדת רק בשטף הדיבור, אלא גם ביכולת לתקשר ביעילות ובביטחון, גם כאשר מתרחש גמגום."
    </blockquote>
    
    <h2>תכניות טיפול אינטנסיביות</h2>
    <p>רבים מהמבוגרים המגמגמים מוצאים תועלת בתכניות טיפול אינטנסיביות:</p>
    <ul>
      <li>סדנאות מרוכזות של מספר ימים עד שבועות</li>
      <li>שילוב של רכישת טכניקות דיבור ועבודה על היבטים רגשיים</li>
      <li>תרגול בסביבות מדורגות (מהקלה למאתגרת)</li>
      <li>מפגשי המשך לשימור ההישגים</li>
    </ul>
    
    <h2>טכנולוגיה וגמגום</h2>
    <p>התפתחויות טכנולוגיות מציעות כלים חדשים להתמודדות עם גמגום:</p>
    <ul>
      <li><strong>מכשירי משוב אודיטורי מושהה (DAF):</strong> משנים את האופן שבו אדם שומע את קולו</li>
      <li><strong>אפליקציות לתרגול טכניקות דיבור:</strong> מאפשרות תרגול עצמאי ומעקב אחר התקדמות</li>
      <li><strong>קבוצות תמיכה מקוונות:</strong> מחברות בין אנשים המתמודדים עם אתגרים דומים</li>
      <li><strong>הקלטות וניתוח דיבור:</strong> מסייעות בזיהוי דפוסי גמגום ומדידת שיפור</li>
    </ul>
    
    <h2>אסטרטגיות להתמודדות יומיומית</h2>
    
    <h3>בסביבת העבודה:</h3>
    <ul>
      <li>הכנה מראש לפגישות ומצגות</li>
      <li>תרגול מצבי תקשורת צפויים</li>
      <li>שיתוף עמיתים קרובים לגבי הגמגום (לפי בחירה אישית)</li>
      <li>שימוש בטכניקות הרפיה לפני מצבי תקשורת מאתגרים</li>
    </ul>
    
    <h3>באינטראקציות חברתיות:</h3>
    <ul>
      <li>התמקדות בתוכן המסר ולא באופן העברתו</li>
      <li>שמירה על קשר עין בזמן גמגום</li>
      <li>הימנעות מ"תיקון עצמי" מוגזם</li>
      <li>פיתוח חוש הומור לגבי הגמגום</li>
    </ul>
    
    <h3>בשיחות טלפון:</h3>
    <ul>
      <li>הכנת נקודות מפתח לפני השיחה</li>
      <li>בחירת סביבה שקטה ונוחה</li>
      <li>שימוש בטכניקות התחלה רכה במיוחד</li>
      <li>הקדמה קצרה במידת הצורך ("אני עשוי להזדקק לרגע נוסף לעתים")</li>
    </ul>
    
    <h2>תפקיד קבוצות התמיכה</h2>
    <p>קבוצות תמיכה מהוות משאב חשוב למבוגרים המגמגמים:</p>
    <ul>
      <li>יצירת קהילה תומכת ומבינה</li>
      <li>שיתוף אסטרטגיות התמודדות</li>
      <li>הזדמנות לתרגול בסביבה בטוחה</li>
      <li>מודלים לחיקוי של התמודדות מוצלחת</li>
      <li>תמיכה רגשית והפחתת תחושת הבדידות</li>
    </ul>
    
    <h2>גישה הוליסטית לטיפול</h2>
    <p>הגישה המודרנית לטיפול בגמגום אצל מבוגרים היא הוליסטית ומתייחסת לאדם השלם:</p>
    <ul>
      <li>שילוב בין טכניקות דיבור לעבודה רגשית</li>
      <li>התאמה אישית של הטיפול לצרכים ולמטרות האישיות</li>
      <li>התייחסות לאיכות החיים הכוללת ולא רק לשטף הדיבור</li>
      <li>שיתוף הסביבה הקרובה בתהליך</li>
    </ul>
    
    <p>חשוב לזכור שגמגום הוא הפרעת תקשורת מורכבת עם מרכיבים נוירולוגיים, פסיכולוגיים וסביבתיים. אין פתרון אחד שמתאים לכולם, וההתקדמות היא לרוב תהליך הדרגתי. עם זאת, עם טיפול מקצועי, תמיכה מתאימה ועבודה אישית, מבוגרים רבים המגמגמים מצליחים לשפר משמעותית את התקשורת שלהם ואת איכות חייהם.</p>
  `},Rm={id:12,title:"הפרעות קשב וריכוז והשפעתן על התפתחות השפה והתקשורת",slug:"adhd-language-development",date:"5 במרץ, 2025",excerpt:"כיצד הפרעות קשב וריכוז משפיעות על התפתחות השפה והתקשורת אצל ילדים, וכיצד ניתן לסייע להם להתמודד עם האתגרים?",image:"/images/blog/adhd-language.jpg",categories:["language","children","development"],content:`
    <p>הפרעת קשב וריכוז (ADHD) היא אחת מההפרעות הנוירו-התפתחותיות הנפוצות ביותר בקרב ילדים, המשפיעה על כ-5-7% מאוכלוסיית הילדים. בעוד שהסימפטומים המוכרים של ADHD כוללים קשיי קשב, אימפולסיביות והיפראקטיביות, פחות מדברים על ההשפעה המשמעותית שיש להפרעה זו על התפתחות השפה והתקשורת.</p>
    
    <h2>הקשר בין ADHD להתפתחות שפה ותקשורת</h2>
    <p>מחקרים מראים כי 45-50% מהילדים עם ADHD מתמודדים גם עם קשיי שפה ותקשורת בדרגות שונות. הקשר בין השניים הוא מורכב ודו-כיווני:</p>
    <ul>
      <li>קשיי הקשב משפיעים על היכולת לרכוש שפה דרך האזנה והתבוננות</li>
      <li>אימפולסיביות משפיעה על היכולת לתכנן ולארגן את הדיבור</li>
      <li>קשיים בוויסות עצמי משפיעים על היכולת לנהל שיחה</li>
      <li>קשיים בזיכרון עבודה משפיעים על עיבוד והבנת שפה</li>
    </ul>
    
    <h2>אתגרי שפה ותקשורת נפוצים אצל ילדים עם ADHD</h2>
    
    <h3>1. קשיים בשפה מבנית</h3>
    <ul>
      <li>אוצר מילים מצומצם יחסית לגיל</li>
      <li>קושי במבנה משפטים מורכבים</li>
      <li>שימוש מוגבל בתחביר מורכב</li>
      <li>קשיים בהטיות דקדוקיות</li>
    </ul>
    
    <h3>2. קשיים בשפה פרגמטית (שימוש חברתי בשפה)</h3>
    <ul>
      <li>קושי בתורנות בשיחה - קפיצה לדברי אחרים</li>
      <li>מעבר מהיר מנושא לנושא ללא קשר ברור</li>
      <li>דיבור מוגזם או מונולוגים ארוכים</li>
      <li>קושי בהתאמת השפה להקשר החברתי</li>
      <li>קושי בהבנת רמזים לא מילוליים</li>
    </ul>
    
    <h3>3. קשיים בנרטיב ובשיח</h3>
    <ul>
      <li>סיפורים לא מאורגנים וקופצניים</li>
      <li>קושי בשמירה על רצף לוגי</li>
      <li>השמטת פרטים חשובים</li>
      <li>קושי בהבנת הרעיון המרכזי בסיפור</li>
    </ul>
    
    <h3>4. קשיים בעיבוד שמיעתי</h3>
    <ul>
      <li>קושי במעקב אחר הוראות מורכבות</li>
      <li>קושי בסינון רעשי רקע</li>
      <li>צורך בחזרה על מידע מילולי</li>
    </ul>
    
    <blockquote>
      "ילדים עם ADHD לעתים קרובות יודעים מה הם רוצים לומר, אך מתקשים לארגן את המחשבות שלהם באופן שיאפשר להם להביע את עצמם בצורה ברורה ומאורגנת."
    </blockquote>
    
    <h2>השפעות על תפקוד יומיומי ולמידה</h2>
    <p>הקשיים השפתיים והתקשורתיים משפיעים על מגוון תחומים בחיי הילד:</p>
    <ul>
      <li><strong>בבית הספר:</strong> קשיים בהבנת הוראות, קריאה, כתיבה והבעה בעל-פה</li>
      <li><strong>חברתית:</strong> קושי ביצירת ושמירת חברויות בשל אי-הבנות תקשורתיות</li>
      <li><strong>רגשית:</strong> תסכול, דימוי עצמי נמוך ולעתים חרדה חברתית</li>
      <li><strong>התנהגותית:</strong> התנהגויות מאתגרות כתוצאה מקשיי תקשורת</li>
    </ul>
    
    <h2>אסטרטגיות התערבות וטיפול</h2>
    <p>גישה אפקטיבית לטיפול בילדים עם ADHD וקשיי שפה דורשת שילוב של מספר אסטרטגיות:</p>
    
    <h3>1. טיפול קלינאי תקשורת ממוקד</h3>
    <ul>
      <li>פיתוח מיומנויות שיח ונרטיב</li>
      <li>עבודה על מיומנויות פרגמטיות ותקשורת חברתית</li>
      <li>שיפור ארגון שפתי ותחביר</li>
      <li>הרחבת אוצר מילים פעיל וסביל</li>
      <li>שיפור מיומנויות עיבוד שמיעתי</li>
    </ul>
    
    <h3>2. התאמות סביבתיות</h3>
    <ul>
      <li>הפחתת גירויים מסיחים בזמן תקשורת</li>
      <li>מתן זמן נוסף לעיבוד ותגובה</li>
      <li>שימוש בתמיכה חזותית לצד מידע מילולי</li>
      <li>חלוקת הוראות מורכבות לשלבים קצרים וברורים</li>
      <li>ישיבה קרוב למקור המידע (מורה, מרצה)</li>
    </ul>
    
    <h3>3. אסטרטגיות לשיפור תקשורת חברתית</h3>
    <ul>
      <li>משחקי תפקידים לתרגול סיטואציות חברתיות</li>
      <li>למידה מפורשת של כללי שיחה</li>
      <li>תרגול זיהוי רמזים לא מילוליים</li>
      <li>קבוצות חברתיות מונחות</li>
      <li>שימוש בסיפורים חברתיים</li>
    </ul>
    
    <h3>4. טכנולוגיה מסייעת</h3>
    <ul>
      <li>אפליקציות לארגון רעיונות לפני דיבור או כתיבה</li>
      <li>תוכנות המרת דיבור לטקסט וטקסט לדיבור</li>
      <li>מכשירי FM להפחתת רעשי רקע</li>
      <li>תוכנות לתרגול מיומנויות שפה ותקשורת</li>
    </ul>
    
    <h3>5. גישה רב-מערכתית</h3>
    <ul>
      <li>שיתוף פעולה בין קלינאי תקשורת, פסיכולוגים ומחנכים</li>
      <li>הדרכת הורים לתמיכה בהתפתחות השפה בבית</li>
      <li>שילוב אסטרטגיות תקשורת בטיפול התרופתי (אם קיים)</li>
      <li>התאמות בבית הספר (תכנית חינוכית אישית)</li>
    </ul>
    
    <h2>אסטרטגיות לשימוש בבית</h2>
    <p>הורים יכולים לסייע משמעותית בפיתוח מיומנויות השפה והתקשורת:</p>
    <ul>
      <li><strong>מודלינג:</strong> הדגמת תקשורת ברורה ומאורגנת</li>
      <li><strong>משחקי שפה:</strong> משחקים המעודדים פיתוח אוצר מילים וארגון מחשבות</li>
      <li><strong>שגרות תקשורתיות:</strong> זמן שיחה יומי ללא הסחות דעת</li>
      <li><strong>סיפור סיפורים:</strong> עידוד הילד לספר על אירועי היום בצורה מאורגנת</li>
      <li><strong>הרחבות:</strong> הרחבת אמירות הילד למשפטים מורכבים יותר</li>
      <li><strong>משוב חיובי:</strong> חיזוק ניסיונות תקשורת מוצלחים</li>
    </ul>
    
    <h2>חשיבות האבחון המוקדם והמדויק</h2>
    <p>חשוב לזכור שלא כל ילד עם ADHD יחווה קשיי שפה, ולא כל ילד עם קשיי שפה סובל מ-ADHD. אבחון מדויק ומקיף הוא קריטי:</p>
    <ul>
      <li>אבחון נוירו-התפתחותי על ידי רופא מומחה</li>
      <li>הערכת שפה ותקשורת מקיפה על ידי קלינאי תקשורת</li>
      <li>הערכה פסיכולוגית במידת הצורך</li>
      <li>איסוף מידע ממסגרות חינוכיות</li>
    </ul>
    
    <p>עם אבחון מדויק והתערבות מתאימה, ילדים עם ADHD וקשיי שפה יכולים לפתח מיומנויות תקשורת יעילות ולהצליח בלימודים, ביחסים חברתיים ובהמשך בחיים הבוגרים. הגישה האופטימלית היא רב-תחומית, מותאמת אישית ומתמקדת בחוזקות של הילד לצד מתן מענה לאתגרים.</p>
  `},Lm={id:13,title:"התפתחות שפה אצל ילדים דו-לשוניים - מיתוסים ועובדות",slug:"bilingual-language-development",date:"10 באפריל, 2025",excerpt:"האם חשיפה לשתי שפות גורמת לעיכוב שפתי? מדריך להורים לילדים דו-לשוניים, מיתוסים נפוצים והמלצות מקצועיות.",image:"/images/blog/bilingual-children.jpg",categories:["language","children","research"],content:`
    <p>בעידן הגלובלי, ילדים רבים גדלים בסביבה דו-לשונית או רב-לשונית. הורים רבים חוששים שחשיפה לשתי שפות תגרום לעיכוב שפתי או בלבול. מה באמת אומר המחקר?</p>
    
    <h2>מיתוס: דו-לשוניות גורמת לעיכוב שפתי</h2>
    <p>מחקרים עדכניים מראים כי ילדים דו-לשוניים עשויים להתחיל לדבר מעט מאוחר יותר, אך בסופו של דבר הם משיגים שליטה בשתי השפות ללא פגיעה בהתפתחות הכללית. עיכוב קל זמני הוא נורמלי ואינו מעיד על בעיה.</p>
    
    <h2>יתרונות הדו-לשוניות</h2>
    <ul>
      <li>גמישות קוגניטיבית גבוהה</li>
      <li>יכולת טובה יותר להבחין בין קונטקסטים</li>
      <li>יתרון בלמידת שפות נוספות</li>
      <li>פיתוח זהות תרבותית עשירה</li>
    </ul>
    
    <h2>אתגרים נפוצים</h2>
    <ul>
      <li>ערבוב שפות במשפטים (code-switching) - תופעה תקינה בהתפתחות</li>
      <li>פערים זמניים באוצר מילים בשפה אחת לעומת השנייה</li>
      <li>העדפת שפה אחת בסביבה מסוימת</li>
    </ul>
    
    <h2>המלצות להורים</h2>
    <ul>
      <li>שמרו על עקביות - כל הורה מדבר בשפה הטבעית לו</li>
      <li>העשירו את הסביבה הלשונית בספרים, שירים ומשחקים בשתי השפות</li>
      <li>הימנעו מהפסקת חשיפה לשפה אחת במקרה של עיכוב זמני</li>
      <li>שוחחו עם הילד על רגשותיו לגבי שתי השפות</li>
      <li>פנו לייעוץ קלינאי תקשורת דו-לשוני במידה ויש חשש לעיכוב משמעותי</li>
    </ul>
    
    <blockquote>
      "דו-לשוניות אינה גורם סיכון לעיכוב שפתי, אלא מתנה קוגניטיבית ותרבותית. כל ילד מתפתח בקצב האישי שלו."
    </blockquote>
    
    <h2>מתי לפנות לאבחון?</h2>
    <ul>
      <li>אם הילד אינו מבין ואינו משתמש במילים בסיסיות בשום שפה עד גיל שנתיים</li>
      <li>אם יש נסיגה בשפה (איבוד מילים שכבר נרכשו)</li>
      <li>אם יש קושי משמעותי בהבנת הוראות פשוטות</li>
      <li>אם יש קושי ביצירת קשר עין או תקשורת לא מילולית</li>
    </ul>
    
    <h2>סיכום</h2>
    <p>חשיפה לשתי שפות אינה מזיקה ואף מועילה להתפתחות הילד. חשוב להעשיר את הסביבה הלשונית, לשמור על סבלנות ולהיעזר באנשי מקצוע במידת הצורך. כל ילד דו-לשוני הוא עולם ומלואו!</p>
  `},Tm={id:14,title:"שיקום דיבור ותקשורת לאחר חבלה מוחית טראומטית",slug:"tbi-speech-rehabilitation",date:"15 באפריל, 2025",excerpt:"פגיעות ראש טראומטיות עלולות לגרום להפרעות דיבור ותקשורת. כיצד מתבצע תהליך השיקום ומהם הגורמים המשפיעים על הצלחתו?",image:"/images/blog/tbi-rehabilitation.jpg",categories:["rehabilitation","adults","research"],content:`
    <p>חבלה מוחית טראומטית (TBI) היא פגיעה במוח הנגרמת כתוצאה מתאונה, נפילה, פגיעת ספורט או אירוע אחר. פגיעות אלו עלולות להשפיע על מגוון רחב של תפקודים, בהם דיבור, הבנה, קריאה, כתיבה ותקשורת חברתית.</p>
    
    <h2>סוגי הפרעות דיבור ותקשורת לאחר TBI</h2>
    <ul>
      <li>אפאזיה - פגיעה בהבנה או בהפקה של שפה</li>
      <li>דיסארטריה - קושי בהפקת דיבור ברור עקב חולשת שרירים</li>
      <li>אפרקסיה של הדיבור - קושי בתכנון תנועות הדיבור</li>
      <li>קשיים בפרגמטיקה - שימוש חברתי לא מותאם בשפה</li>
      <li>קשיים בזיכרון, קשב וארגון שיח</li>
    </ul>
    
    <h2>הערכת מצב ראשונית</h2>
    <p>הערכה קלינית מקיפה כוללת בדיקת מיומנויות שפה, דיבור, הבנה, זיכרון וקשב. לעיתים מבוצעות גם בדיקות הדמיה מוחית.</p>
    
    <h2>עקרונות השיקום</h2>
    <ul>
      <li>התאמת התכנית לצרכים האישיים של הנפגע</li>
      <li>שילוב עבודה על שפה, דיבור, זיכרון וקשב</li>
      <li>שימוש בטכנולוגיה מסייעת (תוכנות תקשורת, אפליקציות)</li>
      <li>הדרכת משפחה וליווי רגשי</li>
      <li>שיקום רב-תחומי (פיזיותרפיה, ריפוי בעיסוק, פסיכולוגיה)</li>
    </ul>
    
    <h2>גורמים המשפיעים על הצלחת השיקום</h2>
    <ul>
      <li>חומרת הפגיעה ומיקומה במוח</li>
      <li>גיל הנפגע ומצבו הבריאותי הכללי</li>
      <li>מהירות תחילת השיקום לאחר הפגיעה</li>
      <li>תמיכה משפחתית וחברתית</li>
      <li>מוטיבציה ושיתוף פעולה של המטופל</li>
    </ul>
    
    <h2>טכנולוגיה מסייעת בשיקום</h2>
    <ul>
      <li>תוכנות תרגול שפה ודיבור</li>
      <li>אפליקציות לניהול שגרה וזיכרון</li>
      <li>מכשירי תקשורת חלופית (AAC)</li>
      <li>שימוש במציאות מדומה לשיקום קוגניטיבי</li>
    </ul>
    
    <blockquote>
      "שיקום תקשורתי לאחר חבלה מוחית הוא תהליך ממושך, אך עם טיפול מקצועי ותמיכה נכונה, ניתן להגיע להישגים משמעותיים ולשיפור איכות החיים."
    </blockquote>
    
    <h2>תפקיד המשפחה בתהליך השיקום</h2>
    <ul>
      <li>עידוד ושימור מוטיבציה</li>
      <li>השתתפות במפגשים טיפוליים</li>
      <li>הבנה של מגבלות ויכולות חדשות</li>
      <li>יצירת סביבה תומכת ומכילה</li>
    </ul>
    
    <h2>סיכום</h2>
    <p>פגיעות מוחיות טראומטיות דורשות שיקום רב-תחומי ומותאם אישית. עבודה משותפת של צוות מקצועי, המטופל ובני משפחתו היא המפתח להצלחה בשיקום התקשורתי והחברתי.</p>
  `},zm={id:15,title:"התערבות מוקדמת בהפרעות שפה ותקשורת - למה זה כל כך חשוב?",slug:"early-intervention-language-disorders",date:"20 באפריל, 2025",excerpt:"אבחון וטיפול מוקדם בהפרעות שפה ותקשורת משפרים משמעותית את סיכויי ההצלחה. מה היתרונות של התערבות מוקדמת ומהם עקרונותיה?",image:"/images/blog/early-intervention.jpg",categories:["language","children","tips"],content:`
    <p>התערבות מוקדמת בהפרעות שפה ותקשורת נחשבת לאחד הגורמים המשמעותיים ביותר לשיפור התפקוד השפתי והחברתי של ילדים עם קשיים. מחקרים רבים מראים כי טיפול המתחיל בגיל צעיר מוביל לתוצאות טובות יותר בטווח הארוך.</p>
    
    <h2>מהי התערבות מוקדמת?</h2>
    <p>התערבות מוקדמת כוללת זיהוי, אבחון וטיפול בילדים עם קשיי שפה, דיבור או תקשורת בגיל הרך (0-6 שנים). ההתערבות מתבצעת על ידי קלינאי תקשורת, ולעיתים בשיתוף צוות רב-תחומי.</p>
    
    <h2>יתרונות ההתערבות המוקדמת</h2>
    <ul>
      <li>שיפור מהיר יותר של מיומנויות שפה ותקשורת</li>
      <li>מניעת קשיים רגשיים וחברתיים נלווים</li>
      <li>הפחתת פערים לימודיים בהמשך</li>
      <li>פיתוח דימוי עצמי חיובי</li>
      <li>הפחתת הצורך בהתערבויות עתידיות</li>
    </ul>
    
    <h2>עקרונות ההתערבות</h2>
    <ul>
      <li>התאמה אישית לצרכי הילד והמשפחה</li>
      <li>שילוב ההורים בתהליך הטיפולי</li>
      <li>עבודה על מטרות פונקציונליות ורלוונטיות</li>
      <li>שימוש במשחק ככלי מרכזי להתערבות</li>
      <li>שילוב התערבות בסביבה הטבעית של הילד</li>
      <li>מעקב והערכה מתמשכים</li>
    </ul>
    
    <h2>תפקיד ההורים בהתערבות מוקדמת</h2>
    <ul>
      <li>השתתפות פעילה במפגשים טיפוליים</li>
      <li>הטמעת אסטרטגיות תקשורת בבית</li>
      <li>שיתוף פעולה עם אנשי מקצוע</li>
      <li>עידוד הילד ליזום תקשורת</li>
      <li>חיזוק הצלחות קטנות</li>
    </ul>
    
    <blockquote>
      "הורים הם הסביבה הטיפולית המשמעותית ביותר עבור הילד. שילובם בתהליך ההתערבות הוא קריטי להצלחתו."</blockquote>
    
    <h2>מתי לפנות לאבחון?</h2>
    <ul>
      <li>אם הילד אינו מגיב לשמו או לא יוצר קשר עין</li>
      <li>אם אינו משתמש במילים בודדות עד גיל שנה וחצי</li>
      <li>אם אינו מחבר שתי מילים למשפט עד גיל שנתיים</li>
      <li>אם יש קושי בהבנת הוראות פשוטות</li>
      <li>אם יש נסיגה בהתפתחות השפה</li>
    </ul>
    
    <h2>סיכום</h2>
    <p>התערבות מוקדמת היא המפתח להצלחת ילדים עם קשיי שפה ותקשורת. ככל שמתחילים מוקדם יותר, כך עולים הסיכויים לצמצום הפערים ולהשתלבות מיטבית בחברה ובמערכת החינוך.</p>
  `},Dm={id:16,title:"הפרעות קול בילדות - זיהוי, גורמים וטיפול",slug:"voice-disorders-children",date:"25 באפריל, 2025",excerpt:"צרידות, קול מחוספס או אובדן קול זמני - מהם הסימנים להפרעות קול אצל ילדים, מה הגורמים וכיצד מטפלים?",image:"/images/blog/voice-disorders-children.jpg",categories:["voice","children","tips"],content:`
    <p>הפרעות קול בילדות הן תופעה נפוצה, המתבטאת בצרידות, קול מחוספס, עייפות קולית או אובדן קול זמני. לעיתים מדובר בתופעה חולפת, אך לעיתים יש צורך בהתערבות מקצועית.</p>
    
    <h2>סימנים להפרעות קול אצל ילדים</h2>
    <ul>
      <li>שינוי באיכות הקול (צרידות, קול "מחוספס")</li>
      <li>קושי להפיק קול חזק או ברור</li>
      <li>עייפות קולית לאחר דיבור ממושך</li>
      <li>אובדן קול זמני</li>
      <li>שינוי מתמשך בקול שאינו חולף תוך שבועיים-שלושה</li>
    </ul>
    
    <h2>גורמים נפוצים להפרעות קול בילדים</h2>
    <ul>
      <li>שימוש יתר בקול (צעקות, דיבור רם במשחקים)</li>
      <li>דלקות בדרכי הנשימה העליונות</li>
      <li>רפלוקס קיבתי-ושטי</li>
      <li>אלרגיות</li>
      <li>יבלות או קשרים במיתרי הקול</li>
      <li>פוליפים או גידולים נדירים</li>
      <li>פגיעות טראומטיות (פציעה, ניתוחים)</li>
    </ul>
    
    <h2>אבחון מקצועי</h2>
    <ul>
      <li>בדיקת רופא אף-אוזן-גרון</li>
      <li>הערכה של קלינאי תקשורת</li>
      <li>לעיתים בדיקה במכשיר סטרובוסקופיה</li>
    </ul>
    
    <h2>עקרונות הטיפול</h2>
    <ul>
      <li>הפחתת שימוש יתר בקול (הסברה לילד ולהורים)</li>
      <li>טכניקות הפקת קול בריאה</li>
      <li>תרגילי נשימה והרפיית שרירי הצוואר</li>
      <li>עבודה על עוצמת דיבור מתאימה</li>
      <li>מעקב רפואי במידת הצורך</li>
      <li>במקרים מסוימים - טיפול תרופתי או ניתוחי</li>
    </ul>
    
    <blockquote>
      "רוב הפרעות הקול בילדות ניתנות לטיפול ושיפור משמעותי בעזרת הדרכה ותרגול נכון. אבחון מוקדם מונע סיבוכים עתידיים."</blockquote>
    
    <h2>טיפים לשמירה על קול בריא אצל ילדים</h2>
    <ul>
      <li>לעודד דיבור רגוע ולהימנע מצעקות מיותרות</li>
      <li>להקפיד על שתייה מרובה</li>
      <li>להימנע מחשיפה לעשן ולגירויים סביבתיים</li>
      <li>לשמור על מנוחה קולית בזמנים של צרידות</li>
      <li>לעודד שימוש במשחקים שקטים</li>
    </ul>
    
    <h2>סיכום</h2>
    <p>הפרעות קול בילדות הן ברוב המקרים חולפות, אך כאשר הן נמשכות או פוגעות בתפקוד, חשוב לפנות לאבחון מקצועי. טיפול נכון ומוקדם מביא לשיפור משמעותי באיכות הקול ובתחושת הביטחון של הילד.</p>
  `},Im={id:17,title:"אכילה סלקטיבית אצל ילדים - מתי זה נורמלי ומתי לדאוג?",slug:"selective-eating-children",date:"27 באפריל, 2025",excerpt:"ילדים רבים בוחרים לאכול רק סוגי מזון מסוימים. מה ההבדל בין בררנות נורמלית להפרעת אכילה סלקטיבית וכיצד מסייעים?",image:"/images/blog/selective-eating.jpg",categories:["feeding","children","tips"],content:`
    <p>אכילה סלקטיבית היא תופעה נפוצה בילדות. חלק מהילדים מסרבים לנסות מזונות חדשים או אוכלים רק מרקמים או טעמים מסוימים. מתי מדובר בשלב התפתחותי תקין, ומתי יש מקום לדאגה?</p>
    
    <h2>מהי אכילה סלקטיבית?</h2>
    <p>אכילה סלקטיבית מוגדרת כהעדפה עיקשת לסוגי מזון מצומצמים, סירוב לנסות מאכלים חדשים או הימנעות ממרקמים מסוימים. לעיתים מדובר בהרגל חולף, אך לעיתים זו הפרעה המשפיעה על התזונה, הגדילה והחיים החברתיים.</p>
    
    <h2>מתי זה נורמלי?</h2>
    <ul>
      <li>בגילאי 2-6 שנים בררנות במזון היא חלק מהתפתחות הזהות והעצמאות</li>
      <li>רוב הילדים "נרגעים" סביב גיל בית הספר</li>
      <li>העדפות משתנות עם הזמן ועם חשיפה חוזרת</li>
    </ul>
    
    <h2>מתי לפנות לייעוץ מקצועי?</h2>
    <ul>
      <li>אם הילד אוכל פחות מ-20 סוגי מזון</li>
      <li>אם יש ירידה במשקל או גדילה איטית</li>
      <li>אם יש קושי באכילה מחוץ לבית (גן, מסעדות)</li>
      <li>אם האכילה מלווה בחרדה, בכי או התקפי זעם</li>
      <li>אם יש פגיעה בתפקוד החברתי</li>
    </ul>
    
    <h2>גורמים אפשריים לאכילה סלקטיבית</h2>
    <ul>
      <li>רגישות חושית למרקמים, טעמים או ריחות</li>
      <li>הרגלים סביבתיים (לחץ סביב האוכל, תגובות שליליות)</li>
      <li>קשיים בוויסות רגשי</li>
      <li>בעיות רפואיות (ריפלוקס, אלרגיות)</li>
      <li>קשיים מוטוריים בלעיסה ובליעה</li>
    </ul>
    
    <h2>אסטרטגיות להתמודדות</h2>
    <ul>
      <li>הציעו מזונות חדשים לצד מזון מוכר ואהוב</li>
      <li>הימנעו מלחץ, איומים או שוחד סביב האוכל</li>
      <li>הפכו את הארוחה לחוויה נעימה ומשותפת</li>
      <li>היו עקביים אך סבלניים</li>
      <li>עודדו התנסות חוזרת (לפעמים נדרשות 10-15 חשיפות למזון חדש)</li>
      <li>שלבו את הילד בבחירה ובהכנת המזון</li>
      <li>היעזרו באנשי מקצוע (קלינאי תקשורת, דיאטנית) במידת הצורך</li>
    </ul>
    
    <blockquote>
      "אכילה סלקטיבית היא לרוב שלב חולף, אך כאשר היא פוגעת בתפקוד, מומלץ לפנות לאבחון מקצועי ולבנות תכנית התערבות מותאמת."</blockquote>
    
    <h2>סיכום</h2>
    <p>בררנות באכילה היא תופעה שכיחה בילדות. ברוב המקרים היא נפתרת מעצמה, אך כאשר יש פגיעה בתזונה, בגדילה או בתפקוד החברתי, חשוב לפנות לייעוץ מקצועי.</p>
  `},Om={id:18,title:"הפרעות תקשורת נרכשות במבוגרים - סוגים, גורמים וטיפול",slug:"acquired-communication-disorders-adults",date:"1 במאי, 2025",excerpt:"פגיעות מוחיות, שבץ, מחלות ניווניות - כיצד מתמודדים עם הפרעות תקשורת נרכשות בגיל המבוגר, ומהן אפשרויות השיקום?",image:"/images/blog/acquired-communication-adults.jpg",categories:["adults","rehabilitation","research"],content:`
    <p>הפרעות תקשורת נרכשות הן קבוצה של מצבים בהם נפגעת היכולת לדבר, להבין, לקרוא או לכתוב בעקבות פגיעה מוחית, שבץ, מחלה ניוונית או טראומה. מדובר באתגר משמעותי עבור האדם ומשפחתו, אך קיימות אפשרויות טיפול ושיקום מגוונות.</p>
    
    <h2>סוגי הפרעות תקשורת נרכשות</h2>
    <ul>
      <li>אפאזיה - פגיעה בהבנה או בהפקה של שפה (בעיקר לאחר שבץ)</li>
      <li>דיסארטריה - קושי בהפקת דיבור ברור עקב חולשת שרירים</li>
      <li>אפרקסיה של הדיבור - קושי בתכנון תנועות הדיבור</li>
      <li>פגיעה בפרגמטיקה - קושי בשימוש חברתי בשפה</li>
      <li>פגיעה בזיכרון, קשב וארגון שיח</li>
    </ul>
    
    <h2>גורמים עיקריים</h2>
    <ul>
      <li>שבץ מוחי (הגורם השכיח ביותר)</li>
      <li>פגיעות ראש טראומטיות</li>
      <li>מחלות ניווניות (אלצהיימר, פרקינסון, ALS)</li>
      <li>גידולים מוחיים</li>
      <li>דלקות מוח</li>
    </ul>
    
    <h2>השפעות על חיי היומיום</h2>
    <ul>
      <li>פגיעה בתקשורת עם בני משפחה וחברים</li>
      <li>קשיים בניהול שיחה, הבנת הוראות, קריאה וכתיבה</li>
      <li>פגיעה בתפקוד תעסוקתי וחברתי</li>
      <li>תחושות תסכול, דיכאון ובידוד</li>
    </ul>
    
    <h2>עקרונות השיקום</h2>
    <ul>
      <li>אבחון מקיף על ידי קלינאי תקשורת</li>
      <li>בניית תכנית טיפול אישית</li>
      <li>שימוש בטכנולוגיה מסייעת (תוכנות תקשורת, אפליקציות)</li>
      <li>הדרכת משפחה וליווי רגשי</li>
      <li>שיקום רב-תחומי (פיזיותרפיה, ריפוי בעיסוק, פסיכולוגיה)</li>
    </ul>
    
    <h2>טכנולוגיה מסייעת</h2>
    <ul>
      <li>תוכנות תרגול שפה ודיבור</li>
      <li>אפליקציות לניהול שגרה וזיכרון</li>
      <li>מכשירי תקשורת חלופית (AAC)</li>
      <li>שימוש במציאות מדומה לשיקום קוגניטיבי</li>
    </ul>
    
    <blockquote>
      "שיקום תקשורתי לאחר פגיעה נרכשת הוא תהליך הדורש סבלנות, התמדה ותמיכה מקצועית. לכל אחד יש פוטנציאל לשיפור!"</blockquote>
    
    <h2>תפקיד המשפחה בתהליך השיקום</h2>
    <ul>
      <li>עידוד ושימור מוטיבציה</li>
      <li>השתתפות במפגשים טיפוליים</li>
      <li>הבנה של מגבלות ויכולות חדשות</li>
      <li>יצירת סביבה תומכת ומכילה</li>
    </ul>
    
    <h2>סיכום</h2>
    <p>הפרעות תקשורת נרכשות דורשות שיקום מותאם אישית, סבלנות ושיתוף פעולה של המטופל, המשפחה והצוות המקצועי. עם טיפול נכון, ניתן לשפר את איכות החיים ולשקם יכולות תקשורתיות וחברתיות.</p>
  `},Fm={id:19,title:"כיצד חרדה משפיעה על השפה והתקשורת?",slug:"anxiety-language-function",date:"5 במאי, 2025",excerpt:"חרדה משפיעה לא רק על התחושות, אלא גם על שטף הדיבור, הבנת הנקרא והיכולת להביע את עצמנו. מדריך להתמודדות עם השפעות החרדה על התקשורת.",image:"/images/blog/anxiety-language.jpg",categories:["adults","children","tips"],content:`
    <p>חרדה היא רגש נפוץ, אך כאשר היא הופכת לכרונית או עוצמתית, היא עלולה להשפיע על מגוון תפקודים קוגניטיביים, בהם גם תפקודי השפה והתקשורת.</p>
    
    <h2>השפעות של חרדה על השפה</h2>
    <ul>
      <li>ירידה בשטף הדיבור - היסוסים, חזרות, "תקיעות"</li>
      <li>קושי להיזכר במילים (אנומיה זמנית)</li>
      <li>ירידה ביכולת להתרכז ולהבין טקסטים</li>
      <li>קושי בארגון מסר מילולי</li>
      <li>פגיעה בביטחון העצמי בדיבור מול קהל</li>
      <li>הימנעות מאינטראקציות תקשורתיות</li>
    </ul>
    
    <h2>ילדים וחרדה תקשורתית</h2>
    <ul>
      <li>הימנעות מדיבור בסיטואציות חברתיות (סלקטיב מוטיזם)</li>
      <li>חשש משאלות בכיתה</li>
      <li>קושי להציג מצגות או להשתתף בדיונים</li>
      <li>פחד מטעויות דיבור</li>
    </ul>
    
    <h2>מבוגרים וחרדה תקשורתית</h2>
    <ul>
      <li>פחד מדיבור בפומבי</li>
      <li>קושי בניהול שיחות טלפון</li>
      <li>הימנעות מראיונות עבודה או פגישות</li>
      <li>תחושת "חסימה" בדיבור במצבים מלחיצים</li>
    </ul>
    
    <h2>אסטרטגיות להתמודדות</h2>
    <ul>
      <li>תרגול נשימות והרפיה לפני שיחה חשובה</li>
      <li>הכנה מראש של נקודות עיקריות</li>
      <li>שימוש בכתיבה ככלי לארגון מחשבות</li>
      <li>הדרגתיות בחשיפה למצבים תקשורתיים</li>
      <li>פיתוח דיבור פנימי תומך וחיובי</li>
      <li>פנייה לטיפול רגשי או קבוצות תמיכה במידת הצורך</li>
    </ul>
    
    <blockquote>
      "חרדה תקשורתית ניתנת לטיפול! שילוב של תרגול, תמיכה רגשית וטכניקות תקשורתיות משפר את הביטחון והשטף."</blockquote>
    
    <h2>מתי לפנות לעזרה מקצועית?</h2>
    <ul>
      <li>כאשר החרדה פוגעת בתפקוד היומיומי</li>
      <li>כאשר יש הימנעות ממסגרות חברתיות או לימודיות</li>
      <li>כאשר יש ירידה מתמשכת בביטחון העצמי</li>
    </ul>
    
    <h2>סיכום</h2>
    <p>חרדה משפיעה על תפקודי השפה והתקשורת, אך בעזרת כלים מתאימים וליווי מקצועי ניתן לשפר את התפקוד ולחזור לתקשר בביטחון.</p>
  `},Mm={id:20,title:"קול וצרידות בגיל המבוגר - גורמים, מניעה וטיפול מקצועי",slug:"voice-hoarseness-elderly",date:"8 במאי, 2025",excerpt:"צרידות ושינויים בקול נפוצים בגיל המבוגר. מה הגורמים, כיצד מאבחנים ומהם הפתרונות המקצועיים לשיפור איכות הקול?",image:"/images/blog/voice-hoarseness-elderly.jpg",categories:["voice","adults","tips"],content:`
    <p>שינויים בקול וצרידות הם תופעות שכיחות בגיל המבוגר, ולעיתים מהווים סימן לבעיה רפואית או תפקודית. קלינאי תקשורת המתמחה בקול יכול לסייע באבחון, טיפול ומניעת סיבוכים.</p>
    
    <h2>גורמים עיקריים לצרידות בגיל המבוגר</h2>
    <ul>
      <li>שינויים פיזיולוגיים במיתרי הקול (דלדול שריר, ירידה בגמישות)</li>
      <li>שימוש יתר בקול לאורך השנים</li>
      <li>עישון, חשיפה לאבק או כימיקלים</li>
      <li>רפלוקס קיבתי-ושטי</li>
      <li>מחלות נוירולוגיות (פרקינסון, ALS)</li>
      <li>גידולים או פוליפים במיתרי הקול</li>
      <li>תרופות המשפיעות על יובש הריריות</li>
    </ul>
    
    <h2>סימנים מחשידים</h2>
    <ul>
      <li>צרידות ממושכת (מעל שלושה שבועות)</li>
      <li>שינוי באיכות הקול (קול "חלש", מתכתי, נשבר)</li>
      <li>קושי להרים את הקול או לדבר לאורך זמן</li>
      <li>כאב, תחושת גוף זר או שיעול כרוני</li>
      <li>ירידה באיכות החיים בשל הקול</li>
    </ul>
    
    <h2>אבחון מקצועי</h2>
    <ul>
      <li>בדיקת רופא אף-אוזן-גרון</li>
      <li>הערכה קולית אצל קלינאי תקשורת</li>
      <li>בדיקות הדמיה (סטרובוסקופיה)</li>
    </ul>
    
    <h2>עקרונות הטיפול הקולי</h2>
    <ul>
      <li>תרגילי קול לחיזוק וגמישות מיתרי הקול</li>
      <li>שיפור טכניקות נשימה ותמיכה קולית</li>
      <li>הפחתת מאמץ קולי ושימוש יתר</li>
      <li>הדרכה לשמירה על היגיינת קול</li>
      <li>מעקב רפואי וטיפול תרופתי/כירורגי במידת הצורך</li>
      <li>הדרכת בני משפחה וסביבה תומכת</li>
    </ul>
    
    <blockquote>
      "טיפול קולי מקצועי משפר משמעותית את איכות החיים, הביטחון והיכולת לתקשר גם בגיל המבוגר."</blockquote>
    
    <h2>טיפים לשמירה על קול בריא בגיל המבוגר</h2>
    <ul>
      <li>להקפיד על שתייה מספקת</li>
      <li>להימנע מעישון ומחשיפה למזהמים</li>
      <li>לשמור על מנוחה קולית בזמנים של עייפות או צרידות</li>
      <li>להימנע מלחישות ממושכות</li>
      <li>לתרגל תרגילי נשימה והרפיה</li>
      <li>לפנות לאבחון מקצועי במידה ויש שינוי מתמשך בקול</li>
    </ul>
    
    <h2>סיכום</h2>
    <p>צרידות ושינויים בקול בגיל המבוגר ניתנים לטיפול ולשיפור משמעותי בעזרת אבחון מקצועי, תרגול והדרכה מתאימה. מומלץ לא להתעלם משינויים בקול ולפנות לייעוץ קלינאי תקשורת המתמחה בתחום.</p>
  `},Xe=[km,Sm,Nm,jm,Em,Cm,_m,Pm,Rm,Lm,Tm,zm,Dm,Im,Om,Fm,Mm];function $m(){return a.jsxs("div",{className:"home-page",children:[a.jsx("section",{className:"home-hero",children:a.jsx("div",{className:"container",children:a.jsxs("div",{className:"hero-content",children:[a.jsx("h1",{className:"hero-title",children:"הדס תודה"}),a.jsx("h2",{className:"hero-subtitle",children:"קלינאית תקשורת מומחית לשפה, דיבור וקול"}),a.jsx("p",{className:"hero-description",children:"נעים להכיר, אני הדס. אני מלווה ילדים ומבוגרים במסעם לשיפור התקשורת והביטחון העצמי. בין אם מדובר באתגרי שפה והיגוי אצל ילדים, או בצרידות וקשיי קול אצל מבוגרים – אני כאן כדי להקשיב, לאבחן ולהתאים תוכנית טיפול אישית שתביא לתוצאות."}),a.jsxs("div",{className:"hero-buttons",children:[a.jsx(G,{to:"/contact",className:"btn hero-cta",children:"קביעת פגישת ייעוץ"}),a.jsx(G,{to:"/services",className:"btn-secondary btn",children:"לגלות עוד על הטיפולים"})]}),a.jsxs("div",{className:"hero-highlights",children:[a.jsxs("div",{className:"highlight-item",children:[a.jsx("span",{className:"highlight-number",children:"10+"}),a.jsx("span",{className:"highlight-text",children:"שנות ניסיון"})]}),a.jsxs("div",{className:"highlight-item",children:[a.jsx("span",{className:"highlight-number",children:"100+"}),a.jsx("span",{className:"highlight-text",children:"מטופלים מרוצים"})]}),a.jsxs("div",{className:"highlight-item",children:[a.jsx("span",{className:"highlight-number",children:"M.A"}),a.jsx("span",{className:"highlight-text",children:"תואר שני בקלינאות תקשורת"})]})]})]})})}),a.jsx("section",{className:"home-testimonials",children:a.jsxs("div",{className:"container",children:[a.jsx("h2",{className:"section-title",children:"קולות מהקליניקה"}),a.jsx("p",{className:"section-subtitle",children:"מה אומרים המטופלים שלי על הטיפול והתוצאות"}),a.jsxs("div",{className:"testimonials-carousel",children:[a.jsx("div",{className:"testimonial-card",children:a.jsxs("div",{className:"quote",children:['"אחרי שנים של צרידות כרונית, הגעתי להדס וסוף סוף מצאתי מענה. הטיפול המקצועי והיחס האישי החזירו לי את הקול ואת שמחת החיים."',a.jsx("div",{className:"quote-author",children:"– יעל, מורה"})]})}),a.jsx("div",{className:"testimonial-card",children:a.jsxs("div",{className:"quote",children:['"הבן שלי התקשה מאוד עם היגוי נכון של הרבה צלילים. אחרי מספר חודשים עם הדס, השיפור היה מדהים. היא ידעה בדיוק איך לגשת אליו ולגרום לו לשתף פעולה."',a.jsx("div",{className:"quote-author",children:"– רונית, אמא לילד בן 5"})]})})]}),a.jsx("div",{className:"testimonials-cta",children:a.jsx(G,{to:"/testimonials",className:"btn-secondary btn",children:"עוד סיפורי הצלחה"})})]})}),a.jsx("section",{className:"home-services",children:a.jsxs("div",{className:"container",children:[a.jsx("h2",{className:"section-title",children:"תחומי המומחיות שלי"}),a.jsx("p",{className:"section-subtitle",children:"מגוון השירותים המקצועיים שאני מציעה לילדים ומבוגרים"}),a.jsxs("div",{className:"services-categories",children:[a.jsxs("div",{className:"service-category",children:[a.jsx("h3",{className:"category-title",children:"שירותי קול"}),a.jsxs("div",{className:"treatment-areas-grid",children:[a.jsxs("div",{className:"treatment-area-item",children:[a.jsx("span",{className:"treatment-icon",children:"🗣️"}),"טיפול בצרידות ובעיות קול"]}),a.jsxs("div",{className:"treatment-area-item",children:[a.jsx("span",{className:"treatment-icon",children:"🎭"}),"שיקום קולי מקצועי"]}),a.jsxs("div",{className:"treatment-area-item",children:[a.jsx("span",{className:"treatment-icon",children:"🎤"}),"ליווי קולי (מורים, מרצים)"]})]})]}),a.jsxs("div",{className:"service-category",children:[a.jsx("h3",{className:"category-title",children:"שירותי שפה ודיבור"}),a.jsxs("div",{className:"treatment-areas-grid",children:[a.jsxs("div",{className:"treatment-area-item",children:[a.jsx("span",{className:"treatment-icon",children:"📊"}),"אבחון וטיפול בעיכוב שפתי"]}),a.jsxs("div",{className:"treatment-area-item",children:[a.jsx("span",{className:"treatment-icon",children:"🔤"}),"טיפול בשיבושי היגוי"]}),a.jsxs("div",{className:"treatment-area-item",children:[a.jsx("span",{className:"treatment-icon",children:"🧩"}),"שיפור יכולות ארגון מסר ושליפה"]}),a.jsxs("div",{className:"treatment-area-item",children:[a.jsx("span",{className:"treatment-icon",children:"✏️"}),"הכנה לכיתה א׳ – היבטים שפתיים ותקשורתיים"]})]})]})]}),a.jsx("div",{className:"services-cta",children:a.jsx(G,{to:"/services",className:"btn-secondary btn",children:"פירוט נוסף על הטיפולים"})})]})}),a.jsx("section",{className:"home-quote",children:a.jsx("div",{className:"container",children:a.jsxs("div",{className:"quote-wrapper",children:[a.jsx("div",{className:"quote-decoration left"}),a.jsxs("div",{className:"quote",children:['"קול הוא הגשר בין הנשמה לעולם."',a.jsx("div",{className:"quote-author"})]}),a.jsx("div",{className:"quote-decoration right"})]})})}),a.jsx("section",{className:"home-about",children:a.jsxs("div",{className:"container",children:[a.jsx("h2",{className:"section-title",children:"נעים להכיר, אני הדס"}),a.jsxs("div",{className:"about-preview",children:[a.jsx("p",{children:"שמי הדס תודה, קלינאית תקשורת (M.A) עם תשוקה אמיתית לעזור לאנשים למצוא את קולם – תרתי משמע. אני מאמינה שביכולתה של תקשורת טובה לפתוח דלתות, לבנות גשרים ולהעצים כל אדם."}),a.jsx("p",{children:"הניסיון שלי כולל עבודה עם מגוון רחב של גילאים ואתגרים: החל מליווי התפתחותי של ילדים בתחומי השפה והדיבור, דרך טיפול בקשיי היגוי ושטף, ועד להתמחות מעמיקה באבחון וטיפול בבעיות קול וצרידות אצל ילדים ומבוגרים."}),a.jsx("p",{children:"בקליניקה שלי, כל מטופל מקבל יחס אישי ותוכנית טיפול המותאמת בדיוק עבורו. אני משלבת ידע מקצועי עדכני עם גישה יצירתית ורגישה, כדי להפוך את התהליך הטיפולי לחוויה חיובית ומקדמת."}),a.jsx("div",{className:"about-cta",children:a.jsx(G,{to:"/about",className:"btn-secondary btn",children:"קראו עוד על הגישה שלי"})})]})]})}),a.jsx("section",{className:"home-blog",children:a.jsxs("div",{className:"container",children:[a.jsx("h2",{className:"section-title",children:"הבלוג המקצועי"}),a.jsx("p",{className:"section-subtitle",children:"מאמרים, טיפים וחידושים בתחום קלינאות התקשורת"}),a.jsx("div",{className:"blog-preview-grid",children:Xe.slice(0,2).map(e=>a.jsxs("div",{className:"blog-preview-card",children:[a.jsxs("div",{className:"blog-preview-image",children:[a.jsx("img",{src:e.image,alt:e.title}),e.categories.map(t=>a.jsxs("span",{className:`blog-category ${t}`,children:[t==="voice"&&"קול",t==="speech"&&"דיבור",t==="language"&&"שפה",t==="children"&&"ילדים",t==="adults"&&"מבוגרים"]},t))]}),a.jsxs("div",{className:"blog-preview-content",children:[a.jsx("h3",{className:"blog-preview-title",children:e.title}),a.jsx("p",{className:"blog-preview-date",children:e.date}),a.jsx("p",{className:"blog-preview-excerpt",children:e.excerpt}),a.jsx(G,{to:`/blog/${e.slug}`,className:"blog-read-more",children:"המשך קריאה"})]})]},e.id))}),a.jsx("div",{className:"blog-preview-cta",children:a.jsx(G,{to:"/blog",className:"btn-secondary btn",children:"לכל המאמרים בבלוג"})})]})})]})}function Am(){return a.jsxs("div",{className:"about-page",children:[a.jsx("section",{className:"about-hero",children:a.jsxs("div",{className:"container",children:[a.jsx("h1",{className:"about-title",children:"נעים להכיר, הדס תודה"}),a.jsx("div",{className:"about-subtitle",children:"קלינאית תקשורת (M.A), מומחית בטיפול בקול, צרידות, שפה ודיבור לילדים ומבוגרים"})]})}),a.jsx("section",{className:"about-content",children:a.jsxs("div",{className:"container",children:[a.jsxs("div",{className:"about-card",children:[a.jsx("h2",{children:"מסע אל הקול הפנימי והחיצוני"}),a.jsx("p",{className:"about-text",children:"שמי הדס תודה, קלינאית תקשורת מוסמכת (M.A), ואני כאן כדי ללוות אתכם במסע לגילוי וחיזוק הקול שלכם – בין אם מדובר בקול הפיזי או ביכולת התקשורתית. אני מתמחה באבחון וטיפול במגוון רחב של אתגרים, החל מבעיות קול וצרידות, דרך טיפול בהפרעות שפה ודיבור, וכלה בליווי התפתחותי לילדים ומתן כלים לתקשורת מיטבית למבוגרים."}),a.jsx("p",{className:"about-text",children:"אני מאמינה שמאחורי כל קול יש סיפור, ומאחורי כל אתגר תקשורתי יש פוטנציאל לצמיחה. הגישה הטיפולית שלי היא אישית, מכילה ומעצימה, ומבוססת על יצירת קשר של אמון וביטחון. יחד, נבנה תוכנית טיפול מותאמת אישית, באווירה נעימה ותומכת, תוך שיתוף פעולה מלא שלכם ושל משפחותיכם."}),a.jsx("p",{className:"about-text",children:"בעבודתי, אני משלבת ידע מקצועי נרחב עם שיטות טיפול חדשניות ומוכחות מחקרית, תוך התעדכנות מתמדת בהתפתחויות האחרונות בתחום. המטרה שלי היא לא רק לטפל בסימפטום, אלא להעניק לכם כלים מעשיים לשיפור איכות החיים, הביטחון העצמי והיכולת להביע את עצמכם באופן מלא."}),a.jsx("p",{className:"about-text highlight",children:"אני מזמינה אתכם, ילדים ומבוגרים כאחד, לצאת יחד למסע מרתק שבסופו תוכלו למצוא את הקול הייחודי שלכם ולהישמע."})]}),a.jsxs("div",{className:"about-qualifications",children:[a.jsx("h2",{children:"הכשרה, ניסיון והתמחויות"}),a.jsxs("ul",{className:"qualifications-list",children:[a.jsx("li",{children:"בוגרת תואר ראשון (B.A) ותואר שני (M.A) בהפרעות בתקשורת מאוניברסיטת תל אביב."}),a.jsx("li",{children:'התמחות קלינית מקיפה במכון היוקרתי לשפה, דיבור ושמיעה ע"ש סקלאר, המרכז הרפואי שיבא, תל השומר.'}),a.jsx("li",{children:"ניסיון מקצועי עשיר כקלינאית תקשורת בקופות החולים המובילות 'כללית' ו'מאוחדת', במגוון תפקידים קליניים וטיפוליים."}),a.jsx("li",{children:"מומחיות באבחון וטיפול בהפרעות קול וצרידות (Voice Disorders) במבוגרים וילדים."}),a.jsx("li",{children:"טיפול בהפרעות שפה, דיבור והיגוי (Articulation) בילדים ונוער."}),a.jsx("li",{children:"ליווי התפתחותי שפתי לגיל הרך."}),a.jsx("li",{children:"התמחות בטיפול בגמגום (Stuttering) ובהפרעות שטף דיבור."}),a.jsx("li",{children:"הכשרות מתקדמות ועדכניות בטיפול קולי (Vocal Therapy), שיקום קול וטכניקות טיפול חדשניות."})]})]})]})}),a.jsx("section",{className:"about-quote",children:a.jsx("div",{className:"container",children:a.jsxs("div",{className:"quote",children:['"הקול שלנו הוא הגשר בין עולמנו הפנימי לעולם החיצון. אני כאן כדי לעזור לכם לבנות גשר חזק, יציב וצלול."',a.jsx("div",{className:"quote-author",children:"- הדס תודה"})]})})})]})}const Um=[{title:"טיפול בגמגום",desc:"התמודדות עם גמגום בקרב ילדים ומבוגרים באמצעות שיטות מגוונות ומותאמות אישית."},{title:"שיפור שפה ודיבור",desc:"עבודה על שפה, הגייה, שטף דיבור והבנת הנשמע."},{title:"טיפול בקול",desc:"שיקום וטיפוח הקול, תרגילים לשיפור איכות הקול ומניעת מאמץ קולי."},{title:"הדרכת הורים",desc:"הדרכה וליווי הורים לתמיכה בתהליך הטיפולי."}];function Bm(){return a.jsx("div",{className:"services-page",children:a.jsx("div",{className:"container",children:a.jsxs("section",{className:"services-section",children:[a.jsxs("div",{className:"services-header",children:[a.jsx("h1",{className:"services-title",children:"תחומי טיפול"}),a.jsx("p",{className:"services-subtitle",children:"מגוון שירותים מקצועיים בתחום קלינאות התקשורת"})]}),a.jsx("div",{className:"services-grid",children:Um.map((e,t)=>a.jsxs("div",{className:"service-card",children:[a.jsx("h3",{className:"service-title",children:e.title}),a.jsx("p",{className:"service-description",children:e.desc})]},t))}),a.jsxs("div",{className:"services-info",children:[a.jsx("h2",{className:"info-title",children:"איך מתנהל הטיפול?"}),a.jsxs("div",{className:"info-steps",children:[a.jsxs("div",{className:"info-step",children:[a.jsx("div",{className:"step-number",children:"1"}),a.jsxs("div",{className:"step-content",children:[a.jsx("h3",{children:"פגישת היכרות"}),a.jsx("p",{children:"שיחה ראשונית להבנת הצרכים והציפיות"})]})]}),a.jsxs("div",{className:"info-step",children:[a.jsx("div",{className:"step-number",children:"2"}),a.jsxs("div",{className:"step-content",children:[a.jsx("h3",{children:"אבחון מקצועי"}),a.jsx("p",{children:"הערכה מקיפה לאיתור הקשיים והחוזקות"})]})]}),a.jsxs("div",{className:"info-step",children:[a.jsx("div",{className:"step-number",children:"3"}),a.jsxs("div",{className:"step-content",children:[a.jsx("h3",{children:"בניית תוכנית טיפול"}),a.jsx("p",{children:"תוכנית אישית ומותאמת לצרכים הייחודיים"})]})]}),a.jsxs("div",{className:"info-step",children:[a.jsx("div",{className:"step-number",children:"4"}),a.jsxs("div",{className:"step-content",children:[a.jsx("h3",{children:"מפגשי טיפול"}),a.jsx("p",{children:"מפגשים קבועים בסביבה נעימה ותומכת"})]})]})]})]})]})})})}const Hm=[{name:"אמא של אורי",text:"הגענו להדס עם קשיי היגוי של אורי. המקצועיות, הסבלנות והגישה המדהימה של הדס הפכו את הטיפול לחוויה חיובית עבורו ועבורנו. השיפור ניכר ואנחנו מודים מאוד!",childName:"אורי",childAge:6,childGender:"בן"},{name:"דניאל כהן",text:"סבלתי מצרידות כרונית שהפריעה לי מאוד בחיי היום-יום. הטיפול אצל הדס היה נקודת מפנה. היא אבחנה במדויק את מקור הבעיה ובנתה תוכנית טיפול אישית ויעילה. היום הקול שלי נקי וחזק מתמיד. תודה ענקית!",childName:null,childAge:null,childGender:null},{name:"דנה, אמא של רותם",text:"הרגשנו שינוי משמעותי בהתפתחות השפה של רותם כבר לאחר מספר מפגשים. הדס הצליחה ליצור קשר מיוחד עם הבת שלנו ולהתאים את הטיפול בדיוק לצרכים שלה. ממליצה בחום!",childName:"רותם",childAge:4,childGender:"בת"},{name:"מאיה לוי, מרצה",text:"כמרצה, הקול שלי הוא כלי עבודה מרכזי. לאחר תקופה של עומס קולי, התחלתי לחוות קשיים. הדס, במקצועיות רבה, לימדה אותי טכניקות להפקת קול נכונה, תרגילי חיזוק ושמירה על בריאות הקול. אני מרגישה הבדל עצום.",childName:null,childAge:null,childGender:null},{name:"משפחת כהן",text:"הדס היא קלינאית תקשורת מקצועית ומסורה. הטיפול היה מותאם אישית לבתנו והיא הצליחה ליצור סביבה מוגנת ומקדמת עבורה. התקדמנו משמעותית בזכותה בתחום השפתי והתקשורתי.",childName:"נועה",childAge:5,childGender:"בת"}];function Vm(){return a.jsx("div",{className:"testimonials-page",children:a.jsx("div",{className:"container",children:a.jsxs("section",{className:"testimonials-section",children:[a.jsxs("div",{className:"testimonials-header",children:[a.jsx("h1",{className:"testimonials-title",children:"הקול שלנו: סיפורי הצלחה מהקליניקה"}),a.jsx("p",{className:"section-subtitle",children:"מטופלים מכל הגילאים משתפים איך הטיפול עזר להם להתגבר על אתגרי קול, צרידות, שפה ודיבור."})]}),a.jsx("div",{className:"testimonials-grid",children:Hm.map((e,t)=>a.jsxs("div",{className:"testimonial-card",children:[a.jsx("div",{className:"testimonial-quote-mark",children:'"'}),a.jsx("p",{className:"testimonial-text",children:e.text}),a.jsx("div",{className:"testimonial-footer",children:a.jsxs("div",{className:"testimonial-author",children:[a.jsx("div",{className:"author-name",children:e.name}),a.jsx("div",{className:"author-details",children:e.childName&&e.childGender?`הורה של ${e.childName}, ${e.childGender} ${e.childAge}`:e.childName?`הורה של ${e.childName}, גיל ${e.childAge}`:""})]})})]},t))}),a.jsxs("div",{className:"share-testimonial",children:[a.jsx("h2",{className:"share-title",children:"גם הקול שלכם יכול להישמע!"}),a.jsx("p",{className:"share-description",children:"אני מזמינה אתכם לשתף את סיפור ההצלחה האישי שלכם – בין אם מדובר בהתגברות על צרידות, שיפור יכולות הדיבור, או כל אתגר תקשורתי אחר. המלצתכם יכולה לעזור לאחרים."}),a.jsx(G,{to:"/contact",className:"btn",children:"שתפו את החוויה שלכם"})]})]})})})}class Ur{constructor(t=0,n="Network Error"){this.status=t,this.text=n}}const Wm=()=>{if(!(typeof localStorage>"u"))return{get:e=>Promise.resolve(localStorage.getItem(e)),set:(e,t)=>Promise.resolve(localStorage.setItem(e,t)),remove:e=>Promise.resolve(localStorage.removeItem(e))}},Ce={origin:"https://api.emailjs.com",blockHeadless:!1,storageProvider:Wm()},sd=e=>e?typeof e=="string"?{publicKey:e}:e.toString()==="[object Object]"?e:{}:{},Qm=(e,t="https://api.emailjs.com")=>{if(!e)return;const n=sd(e);Ce.publicKey=n.publicKey,Ce.blockHeadless=n.blockHeadless,Ce.storageProvider=n.storageProvider,Ce.blockList=n.blockList,Ce.limitRate=n.limitRate,Ce.origin=n.origin||t},qm=async(e,t,n={})=>{const l=await fetch(Ce.origin+e,{method:"POST",headers:n,body:t}),r=await l.text(),i=new Ur(l.status,r);if(l.ok)return i;throw i},Km=(e,t,n)=>{if(!e||typeof e!="string")throw"The public key is required. Visit https://dashboard.emailjs.com/admin/account";if(!t||typeof t!="string")throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";if(!n||typeof n!="string")throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates"},Ym=e=>{if(e&&e.toString()!=="[object Object]")throw"The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/"},Xm=e=>e.webdriver||!e.languages||e.languages.length===0,Gm=()=>new Ur(451,"Unavailable For Headless Browser"),Jm=(e,t)=>{if(!Array.isArray(e))throw"The BlockList list has to be an array";if(typeof t!="string")throw"The BlockList watchVariable has to be a string"},Zm=e=>{var t;return!((t=e.list)!=null&&t.length)||!e.watchVariable},bm=(e,t)=>e instanceof FormData?e.get(t):e[t],ev=(e,t)=>{if(Zm(e))return!1;Jm(e.list,e.watchVariable);const n=bm(t,e.watchVariable);return typeof n!="string"?!1:e.list.includes(n)},tv=()=>new Ur(403,"Forbidden"),nv=(e,t)=>{if(typeof e!="number"||e<0)throw"The LimitRate throttle has to be a positive number";if(t&&typeof t!="string")throw"The LimitRate ID has to be a non-empty string"},lv=async(e,t,n)=>{const l=Number(await n.get(e)||0);return t-Date.now()+l},rv=async(e,t,n)=>{if(!t.throttle||!n)return!1;nv(t.throttle,t.id);const l=t.id||e;return await lv(l,t.throttle,n)>0?!0:(await n.set(l,Date.now().toString()),!1)},iv=()=>new Ur(429,"Too Many Requests"),Ta=async(e,t,n,l)=>{const r=sd(l),i=r.publicKey||Ce.publicKey,o=r.blockHeadless||Ce.blockHeadless,s=r.storageProvider||Ce.storageProvider,u={...Ce.blockList,...r.blockList},c={...Ce.limitRate,...r.limitRate};return o&&Xm(navigator)?Promise.reject(Gm()):(Km(i,e,t),Ym(n),n&&ev(u,n)?Promise.reject(tv()):await rv(location.pathname,c,s)?Promise.reject(iv()):qm("/api/v1.0/email/send",JSON.stringify({lib_version:"4.4.1",user_id:i,service_id:e,template_id:t,template_params:n}),{"Content-type":"application/json"}))};Qm("l9xXgXVINGFdgI8KJ");function ov(){const e=g.useRef(),[t,n]=g.useState(!1),[l,r]=g.useState(!1),[i,o]=g.useState(!1),[s,u]=g.useState({user_name:"",user_email:"",user_phone:"",message:""}),[c,h]=g.useState({}),v=f=>{const{name:d,value:p}=f.target;u(x=>({...x,[d]:p})),c[d]&&h(x=>({...x,[d]:""}))},m=()=>{const f={};return s.user_name.trim()||(f.user_name="נא להזין שם"),s.user_email.trim()?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.user_email)||(f.user_email="כתובת האימייל אינה תקינה"):f.user_email="נא להזין כתובת אימייל",s.user_phone.trim()&&!/^0[2-9]\d{7,8}$/.test(s.user_phone)&&(f.user_phone="מספר הטלפון אינו תקין"),s.message.trim()||(f.message="נא להזין הודעה"),h(f),Object.keys(f).length===0},k=f=>{if(f.preventDefault(),!m())return;n(!0),r(!1),o(!1);const d=s.user_name,p=s.user_email,x=s.user_phone,N=s.message,C="service_zm8sd32",_="template_abcdxis",R="l9xXgXVINGFdgI8KJ";Ta(C,_,{to_name:"הדס תודה",user_name:d,user_email:p,user_phone:x||"לא צוין",message:N,to_email:"hadas.toda.info@gmail.com",email:"hadas.toda.info@gmail.com",recipient:"hadas.toda.info@gmail.com",reply_to:p},R).then(L=>{console.log("פנייה נשלחה בהצלחה:",L.text),Ta(C,"template_vmm0l2g",{user_name:d,user_email:p,user_phone:x||"לא צוין",message:N,to_name:d,to_email:p,email:p,reply_to:"hadas.toda.info@gmail.com"},R).then(qe=>{console.log("אישור נשלח לפונה:",qe.text),r(!0),n(!1),e.current.reset()}).catch(qe=>{console.error("שגיאה בשליחת האישור:",qe),r(!0),n(!1),e.current.reset()})}).catch(L=>{console.error("שגיאה בשליחת הפנייה:",L),o(!0),n(!1)})};g.useEffect(()=>{if(Object.keys(c).length>0){const f=document.querySelector(".form-error");f&&f.scrollIntoView({behavior:"smooth",block:"center"})}},[c]),g.useEffect(()=>{let f;return l&&(f=setTimeout(()=>{r(!1)},5e3)),()=>clearTimeout(f)},[l]);const[y,w]=g.useState(null),j=f=>{w(y===f?null:f)};return g.useEffect(()=>{let f=document.querySelector('meta[name="viewport"]');return f||(f=document.createElement("meta"),f.name="viewport",document.head.appendChild(f)),f.content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",()=>{f&&(f.content="width=device-width, initial-scale=1.0")}},[]),a.jsxs("div",{className:"contact-page",children:[a.jsx("div",{className:"contact-hero",children:a.jsxs("div",{className:"container",children:[a.jsx("h1",{className:"contact-title",children:"יצירת קשר"}),a.jsx("p",{className:"contact-subtitle",children:"להתייעצות, שאלות או קביעת פגישה – אשמח לשוחח!"})]})}),a.jsxs("div",{className:"container",children:[a.jsx("section",{className:"contact-section",children:a.jsxs("div",{className:"contact-container",children:[a.jsxs("div",{className:"contact-info-card",children:[a.jsx("div",{className:"info-title-wrapper",children:a.jsx("h2",{className:"info-title",id:"contact-details-title",children:"פרטי התקשרות"})}),a.jsxs("div",{className:"contact-details",children:[a.jsxs("div",{className:"contact-item",children:[a.jsx("div",{className:"contact-icon",children:"☎️"}),a.jsxs("div",{className:"contact-text",children:[a.jsx("span",{className:"contact-label",children:"טלפון"}),a.jsx("a",{href:"tel:0506796209",className:"contact-link",children:"050-6796209"})]})]}),a.jsxs("div",{className:"contact-item",children:[a.jsx("div",{className:"contact-icon",children:"📱"}),a.jsxs("div",{className:"contact-text",children:[a.jsx("span",{className:"contact-label",children:"ווטסאפ"}),a.jsxs("a",{href:"https://wa.me/972506796209",target:"_blank",rel:"noopener noreferrer",className:"contact-link contact-link-whatsapp",children:["שלח/י הודעה ",a.jsx("span",{className:"whatsapp-icon",children:"↗"})]})]})]}),a.jsxs("div",{className:"contact-item",children:[a.jsx("div",{className:"contact-icon",children:"✉️"}),a.jsxs("div",{className:"contact-text",children:[a.jsx("span",{className:"contact-label",children:"מייל"}),a.jsx("a",{href:"mailto:hadas.toda.info@gmail.com",className:"contact-link",children:"hadas.toda.info@gmail.com"})]})]}),a.jsxs("div",{className:"contact-item",children:[a.jsx("div",{className:"contact-icon",children:"📍"}),a.jsxs("div",{className:"contact-text",children:[a.jsx("span",{className:"contact-label",children:"כתובת"}),a.jsxs("a",{href:"https://maps.google.com/?q=שיכון+ג+בני+ברק",target:"_blank",rel:"noopener noreferrer",className:"contact-link location-link",children:["שיכון ג', בני ברק ",a.jsx("span",{className:"map-icon",children:"🗺️"})]})]})]}),a.jsx("div",{className:"contact-map",children:a.jsx("iframe",{title:"מיקום הקליניקה",src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13520.846147508547!2d34.82549323022461!3d32.08510975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4a3f1f2b099d%3A0x2677dd5d196b8718!2z16nXmdeZ15XXnyDXkSfigJwsINeR16DXmSDXkdeo16c!5e0!3m2!1siw!2sil!4v1717998118455!5m2!1siw!2sil",width:"100%",height:"200",style:{border:0,borderRadius:"8px",marginTop:"1.5rem"},allowFullScreen:"",loading:"lazy",referrerPolicy:"no-referrer-when-downgrade"})}),a.jsxs("div",{className:"contact-social",children:[a.jsx("h3",{className:"social-title",children:"עקבו אחרי"}),a.jsxs("div",{className:"social-links",children:[a.jsx("a",{href:"https://www.facebook.com/profile.php?id=61566802899787",target:"_blank",rel:"noopener noreferrer",className:"social-link","aria-label":"פייסבוק",children:a.jsx("div",{className:"social-icon",children:"f"})}),a.jsx("a",{href:"https://www.instagram.com/hadas_toda/",target:"_blank",rel:"noopener noreferrer",className:"social-link","aria-label":"אינסטגרם",children:a.jsx("div",{className:"social-icon",children:"📸"})})]})]})]})]}),a.jsxs("div",{className:"contact-form-card",children:[a.jsx("h2",{className:"form-title",children:"שלח/י הודעה"}),a.jsxs("form",{className:"contact-form",ref:e,onSubmit:k,children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{htmlFor:"user_name",className:"form-label",children:"שם"}),a.jsx("input",{type:"text",id:"user_name",name:"user_name",className:`form-control ${c.user_name?"is-invalid":""}`,value:s.user_name,onChange:v}),c.user_name&&a.jsx("div",{className:"form-error",children:c.user_name})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{htmlFor:"user_email",className:"form-label",children:"אימייל"}),a.jsx("input",{type:"email",id:"user_email",name:"user_email",className:`form-control ${c.user_email?"is-invalid":""}`,value:s.user_email,onChange:v}),c.user_email&&a.jsx("div",{className:"form-error",children:c.user_email})]}),a.jsxs("div",{className:"form-group",children:[a.jsxs("label",{htmlFor:"user_phone",className:"form-label",children:["טלפון ",a.jsx("span",{className:"optional-field",children:"(אופציונלי)"})]}),a.jsx("input",{type:"tel",id:"user_phone",name:"user_phone",className:`form-control ${c.user_phone?"is-invalid":""}`,value:s.user_phone,onChange:v,placeholder:"050-1234567"}),c.user_phone&&a.jsx("div",{className:"form-error",children:c.user_phone})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{htmlFor:"message",className:"form-label",children:"הודעה"}),a.jsx("textarea",{id:"message",name:"message",className:`form-control ${c.message?"is-invalid":""}`,rows:"4",value:s.message,onChange:v,placeholder:"אנא כתבו את הודעתכם כאן..."}),c.message&&a.jsx("div",{className:"form-error",children:c.message})]}),a.jsx("input",{type:"hidden",name:"recipient_email",value:"hadas.toda.info@gmail.com"}),a.jsxs("button",{type:"submit",className:`btn form-submit ${t?"loading":""}`,disabled:t,children:[a.jsx("span",{className:"btn-text",children:t?"שולח...":"שלח/י הודעה"}),t&&a.jsx("span",{className:"spinner"})]}),l&&a.jsxs("div",{className:"form-feedback success",children:[a.jsx("div",{className:"feedback-icon",children:"✓"}),a.jsxs("div",{className:"feedback-message",children:[a.jsx("strong",{children:"ההודעה נשלחה בהצלחה!"}),a.jsx("p",{children:"תודה על פנייתך, אחזור אליך בהקדם."})]})]}),i&&a.jsxs("div",{className:"form-feedback error",children:[a.jsx("div",{className:"feedback-icon",children:"!"}),a.jsxs("div",{className:"feedback-message",children:[a.jsx("strong",{children:"אירעה שגיאה בשליחת ההודעה"}),a.jsx("p",{children:"אנא נסו שוב מאוחר יותר או צרו קשר באמצעי אחר."})]})]})]})]})]})}),a.jsx("section",{className:"faq-section",children:a.jsxs("div",{className:"container",children:[a.jsx("h2",{className:"faq-title",children:"שאלות נפוצות"}),a.jsxs("div",{className:"faq-container",children:[a.jsxs("div",{className:`faq-item ${y===0?"active":""}`,onClick:()=>j(0),children:[a.jsxs("div",{className:"faq-question",children:[a.jsx("span",{children:"מה משך הטיפול?"}),a.jsx("div",{className:"faq-icon",children:y===0?"-":"+"})]}),a.jsx("div",{className:"faq-answer",children:a.jsx("p",{children:"מפגש טיפולי נמשך כחצי שעה. במקרים מסוימים יתכן שיידרשו מפגשים ארוכים יותר, אך זה יתואם מראש."})})]}),a.jsxs("div",{className:`faq-item ${y===1?"active":""}`,onClick:()=>j(1),children:[a.jsxs("div",{className:"faq-question",children:[a.jsx("span",{children:"האם נדרשת הכנה לפני הטיפול?"}),a.jsx("div",{className:"faq-icon",children:y===1?"-":"+"})]}),a.jsx("div",{className:"faq-answer",children:a.jsx("p",{children:"אין צורך בהכנה מיוחדת. מומלץ להגיע בלבוש נוח ולהימנע מארוחה כבדה לפני הטיפול."})})]}),a.jsxs("div",{className:`faq-item ${y===2?"active":""}`,onClick:()=>j(2),children:[a.jsxs("div",{className:"faq-question",children:[a.jsx("span",{children:"האם יש החזר מקופת חולים?"}),a.jsx("div",{className:"faq-icon",children:y===2?"-":"+"})]}),a.jsx("div",{className:"faq-answer",children:a.jsx("p",{children:"בחלק מהמקרים ניתן לקבל החזר מקופות החולים השונות. אשמח להנפיק קבלה מתאימה לצורך הגשת בקשה להחזר."})})]}),a.jsxs("div",{className:`faq-item ${y===3?"active":""}`,onClick:()=>j(3),children:[a.jsxs("div",{className:"faq-question",children:[a.jsx("span",{children:"האם ניתן לבטל תור שנקבע?"}),a.jsx("div",{className:"faq-icon",children:y===3?"-":"+"})]}),a.jsx("div",{className:"faq-answer",children:a.jsx("p",{children:"כן, ניתן לבטל תור עד 24 שעות לפני מועד הטיפול ללא חיוב. ביטול בהתראה קצרה יותר עשוי להיות כרוך בדמי ביטול."})})]})]})]})})]})]})}function sv(){const[e,t]=g.useState("all"),n=[{id:"all",label:"הכל"},{id:"voice",label:"קול"},{id:"speech",label:"דיבור"},{id:"language",label:"שפה"},{id:"children",label:"ילדים"},{id:"adults",label:"מבוגרים"}],l=e==="all"?Xe:Xe.filter(r=>r.categories.includes(e));return a.jsxs("div",{className:"blog-page",children:[a.jsx("section",{className:"blog-hero",children:a.jsxs("div",{className:"container",children:[a.jsx("h1",{className:"page-title",children:"הבלוג המקצועי"}),a.jsx("p",{className:"page-subtitle",children:"מאמרים, טיפים וחידושים בתחום קלינאות התקשורת"})]})}),a.jsx("section",{className:"blog-content",children:a.jsxs("div",{className:"container",children:[a.jsxs("div",{className:"blog-filters",children:[a.jsx("div",{className:"filter-label",children:"סינון לפי נושא:"}),a.jsx("div",{className:"filter-options",children:n.map(r=>a.jsx("button",{className:`filter-btn ${e===r.id?"active":""}`,onClick:()=>t(r.id),children:r.label},r.id))})]}),a.jsx("div",{className:"blog-posts-grid",children:l.length>0?l.map(r=>a.jsxs("div",{className:"blog-card",children:[a.jsxs("div",{className:"blog-card-image",children:[a.jsx("img",{src:r.image,alt:r.title}),r.categories.map(i=>{var o;return a.jsx("span",{className:`blog-category ${i}`,children:(o=n.find(s=>s.id===i))==null?void 0:o.label},i)})]}),a.jsxs("div",{className:"blog-card-content",children:[a.jsx("h3",{className:"blog-card-title",children:r.title}),a.jsx("p",{className:"blog-card-date",children:r.date}),a.jsx("p",{className:"blog-card-excerpt",children:r.excerpt}),a.jsx(G,{to:`/blog/${r.slug}`,className:"blog-read-more",children:"המשך קריאה"})]})]},r.id)):a.jsx("div",{className:"no-posts-message",children:"לא נמצאו מאמרים בקטגוריה זו"})})]})})]})}function av(){const{slug:e}=Nh(),t=bc(),n=Xe.find(o=>o.slug===e);if(g.useEffect(()=>{n||t("/blog")},[n,t]),!n)return null;const l=Xe.findIndex(o=>o.slug===e),r=l>0?Xe[l-1]:null,i=l<Xe.length-1?Xe[l+1]:null;return a.jsx("div",{className:"blog-post-page",children:a.jsxs("div",{className:"container",children:[a.jsxs("header",{className:"blog-post-header",children:[a.jsxs("div",{className:"blog-post-meta",children:[a.jsx("span",{className:"blog-post-date",children:n.date}),a.jsx("div",{className:"blog-post-categories",children:n.categories.map(o=>a.jsxs("span",{className:`blog-category ${o}`,children:[o==="voice"&&"קול",o==="speech"&&"דיבור",o==="language"&&"שפה",o==="children"&&"ילדים",o==="adults"&&"מבוגרים"]},o))})]}),a.jsx("h1",{className:"blog-post-title",children:n.title}),a.jsx("p",{className:"blog-post-excerpt",children:n.excerpt})]}),a.jsx("div",{className:"blog-post-featured-image",children:a.jsx("img",{src:n.image,alt:n.title})}),a.jsx("div",{className:"blog-post-content",children:a.jsx("div",{dangerouslySetInnerHTML:{__html:n.content}})}),a.jsxs("div",{className:"blog-post-author",children:[a.jsx("div",{className:"author-image",children:a.jsx("img",{src:"/images/hadas-profile.jpg",alt:"הדס תודה"})}),a.jsxs("div",{className:"author-info",children:[a.jsx("h3",{children:"הדס תודה"}),a.jsx("p",{children:"קלינאית תקשורת מומחית לשפה, דיבור וקול"})]})]}),a.jsxs("div",{className:"blog-post-navigation",children:[r&&a.jsxs(G,{to:`/blog/${r.slug}`,className:"prev-post",children:[a.jsx("span",{className:"nav-label",children:"המאמר הקודם"}),a.jsx("span",{className:"nav-title",children:r.title})]}),a.jsx(G,{to:"/blog",className:"back-to-blog",children:"חזרה לבלוג"}),i&&a.jsxs(G,{to:`/blog/${i.slug}`,className:"next-post",children:[a.jsx("span",{className:"nav-label",children:"המאמר הבא"}),a.jsx("span",{className:"nav-title",children:i.title})]})]}),a.jsxs("div",{className:"related-posts",children:[a.jsx("h3",{className:"related-posts-title",children:"מאמרים נוספים שעשויים לעניין אותך"}),a.jsx("div",{className:"related-posts-grid",children:Xe.filter(o=>o.slug!==e&&o.categories.some(s=>n.categories.includes(s))).slice(0,3).map(o=>a.jsx("div",{className:"related-post-card",children:a.jsxs(G,{to:`/blog/${o.slug}`,children:[a.jsx("div",{className:"related-post-image",children:a.jsx("img",{src:o.image,alt:o.title})}),a.jsx("h4",{className:"related-post-title",children:o.title})]})},o.id))})]})]})})}function uv(){return a.jsx(am,{children:a.jsxs("div",{className:"app-container",children:[a.jsx(xm,{}),a.jsx("main",{children:a.jsxs($h,{children:[a.jsx(st,{path:"/",element:a.jsx($m,{})}),a.jsx(st,{path:"/about",element:a.jsx(Am,{})}),a.jsx(st,{path:"/services",element:a.jsx(Bm,{})}),a.jsx(st,{path:"/testimonials",element:a.jsx(Vm,{})}),a.jsx(st,{path:"/contact",element:a.jsx(ov,{})}),a.jsx(st,{path:"/blog",element:a.jsx(sv,{})}),a.jsx(st,{path:"/blog/:slug",element:a.jsx(av,{})})]})}),a.jsx(wm,{})]})})}yi.createRoot(document.getElementById("root")).render(a.jsx(Ed.StrictMode,{children:a.jsx(uv,{})}));
