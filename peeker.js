/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = window, st = R.ShadowRoot && (R.ShadyCSS === void 0 || R.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, it = Symbol(), ot = /* @__PURE__ */ new WeakMap();
let mt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== it)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (st && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = ot.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && ot.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const rt = (i) => new mt(typeof i == "string" ? i : i + "", void 0, it), gt = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, r, o) => s + ((n) => {
    if (n._$cssResult$ === !0)
      return n.cssText;
    if (typeof n == "number")
      return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + i[o + 1], i[0]);
  return new mt(e, i, it);
}, Rt = (i, t) => {
  st ? i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet) : t.forEach((e) => {
    const s = document.createElement("style"), r = R.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = e.cssText, i.appendChild(s);
  });
}, lt = st ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules)
    e += s.cssText;
  return rt(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var V;
const j = window, ht = j.trustedTypes, jt = ht ? ht.emptyScript : "", at = j.reactiveElementPolyfillSupport, F = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? jt : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, At = (i, t) => t !== i && (t == t || i == i), W = { attribute: !0, type: String, converter: F, reflect: !1, hasChanged: At }, G = "finalized";
let A = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this._$Eu();
  }
  static addInitializer(t) {
    var e;
    this.finalize(), ((e = this.h) !== null && e !== void 0 ? e : this.h = []).push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this.elementProperties.forEach((e, s) => {
      const r = this._$Ep(s, e);
      r !== void 0 && (this._$Ev.set(r, s), t.push(r));
    }), t;
  }
  static createProperty(t, e = W) {
    if (e.state && (e.attribute = !1), this.finalize(), this.elementProperties.set(t, e), !e.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const s = typeof t == "symbol" ? Symbol() : "__" + t, r = this.getPropertyDescriptor(t, s, e);
      r !== void 0 && Object.defineProperty(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    return { get() {
      return this[e];
    }, set(r) {
      const o = this[t];
      this[e] = r, this.requestUpdate(t, o, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || W;
  }
  static finalize() {
    if (this.hasOwnProperty(G))
      return !1;
    this[G] = !0;
    const t = Object.getPrototypeOf(this);
    if (t.finalize(), t.h !== void 0 && (this.h = [...t.h]), this.elementProperties = new Map(t.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const e = this.properties, s = [...Object.getOwnPropertyNames(e), ...Object.getOwnPropertySymbols(e)];
      for (const r of s)
        this.createProperty(r, e[r]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const r of s)
        e.unshift(lt(r));
    } else
      t !== void 0 && e.push(lt(t));
    return e;
  }
  static _$Ep(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  _$Eu() {
    var t;
    this._$E_ = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (t = this.constructor.h) === null || t === void 0 || t.forEach((e) => e(this));
  }
  addController(t) {
    var e, s;
    ((e = this._$ES) !== null && e !== void 0 ? e : this._$ES = []).push(t), this.renderRoot !== void 0 && this.isConnected && ((s = t.hostConnected) === null || s === void 0 || s.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, e) => {
      this.hasOwnProperty(e) && (this._$Ei.set(e, this[e]), delete this[e]);
    });
  }
  createRenderRoot() {
    var t;
    const e = (t = this.shadowRoot) !== null && t !== void 0 ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return Rt(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var t;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) === null || s === void 0 ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) === null || s === void 0 ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$EO(t, e, s = W) {
    var r;
    const o = this.constructor._$Ep(t, s);
    if (o !== void 0 && s.reflect === !0) {
      const n = (((r = s.converter) === null || r === void 0 ? void 0 : r.toAttribute) !== void 0 ? s.converter : F).toAttribute(e, s.type);
      this._$El = t, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$El = null;
    }
  }
  _$AK(t, e) {
    var s;
    const r = this.constructor, o = r._$Ev.get(t);
    if (o !== void 0 && this._$El !== o) {
      const n = r.getPropertyOptions(o), a = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((s = n.converter) === null || s === void 0 ? void 0 : s.fromAttribute) !== void 0 ? n.converter : F;
      this._$El = o, this[o] = a.fromAttribute(e, n.type), this._$El = null;
    }
  }
  requestUpdate(t, e, s) {
    let r = !0;
    t !== void 0 && (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || At)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e), s.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, s))) : r = !1), !this.isUpdatePending && r && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((r, o) => this[o] = r), this._$Ei = void 0);
    let e = !1;
    const s = this._$AL;
    try {
      e = this.shouldUpdate(s), e ? (this.willUpdate(s), (t = this._$ES) === null || t === void 0 || t.forEach((r) => {
        var o;
        return (o = r.hostUpdate) === null || o === void 0 ? void 0 : o.call(r);
      }), this.update(s)) : this._$Ek();
    } catch (r) {
      throw e = !1, this._$Ek(), r;
    }
    e && this._$AE(s);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((s) => {
      var r;
      return (r = s.hostUpdated) === null || r === void 0 ? void 0 : r.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$EC !== void 0 && (this._$EC.forEach((e, s) => this._$EO(s, this[s], e)), this._$EC = void 0), this._$Ek();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
A[G] = !0, A.elementProperties = /* @__PURE__ */ new Map(), A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, at == null || at({ ReactiveElement: A }), ((V = j.reactiveElementVersions) !== null && V !== void 0 ? V : j.reactiveElementVersions = []).push("1.6.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var q;
const L = window, S = L.trustedTypes, ut = S ? S.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, tt = "$lit$", f = `lit$${(Math.random() + "").slice(9)}$`, bt = "?" + f, Lt = `<${bt}>`, g = document, P = () => g.createComment(""), T = (i) => i === null || typeof i != "object" && typeof i != "function", St = Array.isArray, Dt = (i) => St(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", Z = `[ 	
\f\r]`, w = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ct = /-->/g, dt = />/g, y = RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), pt = /'/g, vt = /"/g, Et = /^(?:script|style|textarea|title)$/i, It = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), Ct = It(1), _ = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), $t = /* @__PURE__ */ new WeakMap(), m = g.createTreeWalker(g, 129, null, !1);
function wt(i, t) {
  if (!Array.isArray(i) || !i.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return ut !== void 0 ? ut.createHTML(t) : t;
}
const Bt = (i, t) => {
  const e = i.length - 1, s = [];
  let r, o = t === 2 ? "<svg>" : "", n = w;
  for (let a = 0; a < e; a++) {
    const l = i[a];
    let h, u, c = -1, p = 0;
    for (; p < l.length && (n.lastIndex = p, u = n.exec(l), u !== null); )
      p = n.lastIndex, n === w ? u[1] === "!--" ? n = ct : u[1] !== void 0 ? n = dt : u[2] !== void 0 ? (Et.test(u[2]) && (r = RegExp("</" + u[2], "g")), n = y) : u[3] !== void 0 && (n = y) : n === y ? u[0] === ">" ? (n = r ?? w, c = -1) : u[1] === void 0 ? c = -2 : (c = n.lastIndex - u[2].length, h = u[1], n = u[3] === void 0 ? y : u[3] === '"' ? vt : pt) : n === vt || n === pt ? n = y : n === ct || n === dt ? n = w : (n = y, r = void 0);
    const $ = n === y && i[a + 1].startsWith("/>") ? " " : "";
    o += n === w ? l + Lt : c >= 0 ? (s.push(h), l.slice(0, c) + tt + l.slice(c) + f + $) : l + f + (c === -2 ? (s.push(void 0), a) : $);
  }
  return [wt(i, o + (i[e] || "<?>") + (t === 2 ? "</svg>" : "")), s];
};
class O {
  constructor({ strings: t, _$litType$: e }, s) {
    let r;
    this.parts = [];
    let o = 0, n = 0;
    const a = t.length - 1, l = this.parts, [h, u] = Bt(t, e);
    if (this.el = O.createElement(h, s), m.currentNode = this.el.content, e === 2) {
      const c = this.el.content, p = c.firstChild;
      p.remove(), c.append(...p.childNodes);
    }
    for (; (r = m.nextNode()) !== null && l.length < a; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) {
          const c = [];
          for (const p of r.getAttributeNames())
            if (p.endsWith(tt) || p.startsWith(f)) {
              const $ = u[n++];
              if (c.push(p), $ !== void 0) {
                const Nt = r.getAttribute($.toLowerCase() + tt).split(f), k = /([.?@])?(.*)/.exec($);
                l.push({ type: 1, index: o, name: k[2], strings: Nt, ctor: k[1] === "." ? Kt : k[1] === "?" ? Wt : k[1] === "@" ? qt : D });
              } else
                l.push({ type: 6, index: o });
            }
          for (const p of c)
            r.removeAttribute(p);
        }
        if (Et.test(r.tagName)) {
          const c = r.textContent.split(f), p = c.length - 1;
          if (p > 0) {
            r.textContent = S ? S.emptyScript : "";
            for (let $ = 0; $ < p; $++)
              r.append(c[$], P()), m.nextNode(), l.push({ type: 2, index: ++o });
            r.append(c[p], P());
          }
        }
      } else if (r.nodeType === 8)
        if (r.data === bt)
          l.push({ type: 2, index: o });
        else {
          let c = -1;
          for (; (c = r.data.indexOf(f, c + 1)) !== -1; )
            l.push({ type: 7, index: o }), c += f.length - 1;
        }
      o++;
    }
  }
  static createElement(t, e) {
    const s = g.createElement("template");
    return s.innerHTML = t, s;
  }
}
function E(i, t, e = i, s) {
  var r, o, n, a;
  if (t === _)
    return t;
  let l = s !== void 0 ? (r = e._$Co) === null || r === void 0 ? void 0 : r[s] : e._$Cl;
  const h = T(t) ? void 0 : t._$litDirective$;
  return (l == null ? void 0 : l.constructor) !== h && ((o = l == null ? void 0 : l._$AO) === null || o === void 0 || o.call(l, !1), h === void 0 ? l = void 0 : (l = new h(i), l._$AT(i, e, s)), s !== void 0 ? ((n = (a = e)._$Co) !== null && n !== void 0 ? n : a._$Co = [])[s] = l : e._$Cl = l), l !== void 0 && (t = E(i, l._$AS(i, t.values), l, s)), t;
}
class zt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    var e;
    const { el: { content: s }, parts: r } = this._$AD, o = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : g).importNode(s, !0);
    m.currentNode = o;
    let n = m.nextNode(), a = 0, l = 0, h = r[0];
    for (; h !== void 0; ) {
      if (a === h.index) {
        let u;
        h.type === 2 ? u = new M(n, n.nextSibling, this, t) : h.type === 1 ? u = new h.ctor(n, h.name, h.strings, this, t) : h.type === 6 && (u = new Zt(n, this, t)), this._$AV.push(u), h = r[++l];
      }
      a !== (h == null ? void 0 : h.index) && (n = m.nextNode(), a++);
    }
    return m.currentNode = g, o;
  }
  v(t) {
    let e = 0;
    for (const s of this._$AV)
      s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class M {
  constructor(t, e, s, r) {
    var o;
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = r, this._$Cp = (o = r == null ? void 0 : r.isConnected) === null || o === void 0 || o;
  }
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !== null && e !== void 0 ? e : this._$Cp;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = E(this, t, e), T(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== _ && this._(t) : t._$litType$ !== void 0 ? this.g(t) : t.nodeType !== void 0 ? this.$(t) : Dt(t) ? this.T(t) : this._(t);
  }
  k(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  $(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.k(t));
  }
  _(t) {
    this._$AH !== d && T(this._$AH) ? this._$AA.nextSibling.data = t : this.$(g.createTextNode(t)), this._$AH = t;
  }
  g(t) {
    var e;
    const { values: s, _$litType$: r } = t, o = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = O.createElement(wt(r.h, r.h[0]), this.options)), r);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === o)
      this._$AH.v(s);
    else {
      const n = new zt(o, this), a = n.u(this.options);
      n.v(s), this.$(a), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = $t.get(t.strings);
    return e === void 0 && $t.set(t.strings, e = new O(t)), e;
  }
  T(t) {
    St(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, r = 0;
    for (const o of t)
      r === e.length ? e.push(s = new M(this.k(P()), this.k(P()), this, this.options)) : s = e[r], s._$AI(o), r++;
    r < e.length && (this._$AR(s && s._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) === null || s === void 0 || s.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const r = t.nextSibling;
      t.remove(), t = r;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cp = t, (e = this._$AP) === null || e === void 0 || e.call(this, t));
  }
}
class D {
  constructor(t, e, s, r, o) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, s, r) {
    const o = this.strings;
    let n = !1;
    if (o === void 0)
      t = E(this, t, e, 0), n = !T(t) || t !== this._$AH && t !== _, n && (this._$AH = t);
    else {
      const a = t;
      let l, h;
      for (t = o[0], l = 0; l < o.length - 1; l++)
        h = E(this, a[s + l], e, l), h === _ && (h = this._$AH[l]), n || (n = !T(h) || h !== this._$AH[l]), h === d ? t = d : t !== d && (t += (h ?? "") + o[l + 1]), this._$AH[l] = h;
    }
    n && !r && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Kt extends D {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
const Vt = S ? S.emptyScript : "";
class Wt extends D {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    t && t !== d ? this.element.setAttribute(this.name, Vt) : this.element.removeAttribute(this.name);
  }
}
class qt extends D {
  constructor(t, e, s, r, o) {
    super(t, e, s, r, o), this.type = 5;
  }
  _$AI(t, e = this) {
    var s;
    if ((t = (s = E(this, t, e, 0)) !== null && s !== void 0 ? s : d) === _)
      return;
    const r = this._$AH, o = t === d && r !== d || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, n = t !== d && (r === d || o);
    o && this.element.removeEventListener(this.name, this, r), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, s;
    typeof this._$AH == "function" ? this._$AH.call((s = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && s !== void 0 ? s : this.element, t) : this._$AH.handleEvent(t);
  }
}
class Zt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    E(this, t);
  }
}
const ft = L.litHtmlPolyfillSupport;
ft == null || ft(O, M), ((q = L.litHtmlVersions) !== null && q !== void 0 ? q : L.litHtmlVersions = []).push("2.8.0");
const Jt = (i, t, e) => {
  var s, r;
  const o = (s = e == null ? void 0 : e.renderBefore) !== null && s !== void 0 ? s : t;
  let n = o._$litPart$;
  if (n === void 0) {
    const a = (r = e == null ? void 0 : e.renderBefore) !== null && r !== void 0 ? r : null;
    o._$litPart$ = n = new M(t.insertBefore(P(), a), a, void 0, e ?? {});
  }
  return n._$AI(i), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var J, Q;
class b extends A {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, e;
    const s = super.createRenderRoot();
    return (t = (e = this.renderOptions).renderBefore) !== null && t !== void 0 || (e.renderBefore = s.firstChild), s;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Jt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!1);
  }
  render() {
    return _;
  }
}
b.finalized = !0, b._$litElement$ = !0, (J = globalThis.litElementHydrateSupport) === null || J === void 0 || J.call(globalThis, { LitElement: b });
const _t = globalThis.litElementPolyfillSupport;
_t == null || _t({ LitElement: b });
((Q = globalThis.litElementVersions) !== null && Q !== void 0 ? Q : globalThis.litElementVersions = []).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Pt = (i) => (t) => typeof t == "function" ? ((e, s) => (customElements.define(e, s), s))(i, t) : ((e, s) => {
  const { kind: r, elements: o } = s;
  return { kind: r, elements: o, finisher(n) {
    customElements.define(e, n);
  } };
})(i, t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qt = (i, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? { ...t, finisher(e) {
  e.createProperty(t.key, i);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: t.key, initializer() {
  typeof t.initializer == "function" && (this[t.key] = t.initializer.call(this));
}, finisher(e) {
  e.createProperty(t.key, i);
} }, Xt = (i, t, e) => {
  t.constructor.createProperty(e, i);
};
function Tt(i) {
  return (t, e) => e !== void 0 ? Xt(i, t, e) : Qt(i, t);
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var X;
((X = window.HTMLSlotElement) === null || X === void 0 ? void 0 : X.prototype.assignedElements) != null;
const Yt = `a{text-decoration:underline}
`;
let Y = 0, yt = [];
function Ft() {
  return Y += 1, () => {
    if (Y -= 1, Y === 0) {
      let i = yt;
      yt = [];
      for (let t of i)
        t();
    }
  };
}
let H = Symbol(), N = Symbol(), Gt = 0, te = (i, t, e, s) => {
  let r = ++Gt, o = { ...i };
  o.set = (...h) => {
    i[H] = t, i[N] = r, i.set(...h), delete i[H], delete i[N];
  }, i.setKey && (o.setKey = (...h) => {
    i[H] = t, i[N] = r, i.setKey(...h), delete i[H], delete i[N];
  });
  let n, a;
  i.action && ([n, a] = i.action(r, t, s));
  let l = e(o, ...s);
  if (l instanceof Promise) {
    let h = Ft();
    return l.catch((u) => {
      throw n && n(u), u;
    }).finally(() => {
      h(), a && a();
    });
  }
  return a && a(), l;
}, nt = (i, t, e) => (...s) => te(i, t, e, s), v = [], ee = (i, t) => {
  let e = [], s = {
    get() {
      return s.lc || s.listen(() => {
      })(), s.value;
    },
    l: t || 0,
    lc: 0,
    listen(r, o) {
      return s.lc = e.push(r, o || s.l) / 2, () => {
        let n = e.indexOf(r);
        ~n && (e.splice(n, 2), --s.lc || s.off());
      };
    },
    notify(r) {
      let o = !v.length;
      for (let n = 0; n < e.length; n += 2)
        v.push(
          e[n],
          e[n + 1],
          s.value,
          r
        );
      if (o) {
        for (let n = 0; n < v.length; n += 4) {
          let a;
          for (let l = n + 1; !a && (l += 4) < v.length; )
            v[l] < v[n + 1] && (a = v.push(
              v[n],
              v[n + 1],
              v[n + 2],
              v[n + 3]
            ));
          a || v[n](v[n + 2], v[n + 3]);
        }
        v.length = 0;
      }
    },
    off() {
    },
    /* It will be called on last listener unsubscribing.
       We will redefine it in onMount and onStop. */
    set(r) {
      s.value !== r && (s.value = r, s.notify());
    },
    subscribe(r, o) {
      let n = s.listen(r, o);
      return r(s.value), n;
    },
    value: i
  };
  return s;
}, se = (i = {}) => {
  let t = ee(i);
  return t.setKey = function(e, s) {
    typeof s > "u" ? e in t.value && (t.value = { ...t.value }, delete t.value[e], t.notify(e)) : t.value[e] !== s && (t.value = {
      ...t.value,
      [e]: s
    }, t.notify(e));
  }, t;
};
const ie = {
  show: !1
}, I = se(ie), re = nt(I, "hide", (i) => {
  i.setKey("show", !1);
}), ne = nt(I, "show", (i) => {
  i.setKey("show", !0);
}), oe = nt(I, "peek", (i, t) => {
  fetch(t).then((e) => e.json()).then((e) => {
    i.setKey("peekAt", e), ne();
  });
});
var le = Object.defineProperty, he = Object.getOwnPropertyDescriptor, Ot = (i, t, e, s) => {
  for (var r = s > 1 ? void 0 : s ? he(t, e) : t, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (r = (s ? n(t, e, r) : n(r)) || r);
  return s && r && le(t, e, r), r;
};
let x = class extends b {
  constructor() {
    super(...arguments), this.dataURL = void 0;
  }
  render() {
    return Ct`
      <a @click=${() => oe(this.dataURL)}><slot><slot/></a>
      `;
  }
};
x.styles = gt`
    ${rt(Yt)}
  `;
Ot([
  Tt({ attribute: "data-url" })
], x.prototype, "dataURL", 2);
x = Ot([
  Pt("vvv-peekable")
], x);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xt = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, Ut = (i) => (...t) => ({ _$litDirective$: i, values: t });
class Mt {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, s) {
    this._$Ct = t, this._$AM = e, this._$Ci = s;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ae = Ut(class extends Mt {
  constructor(i) {
    var t;
    if (super(i), i.type !== xt.ATTRIBUTE || i.name !== "class" || ((t = i.strings) === null || t === void 0 ? void 0 : t.length) > 2)
      throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(i) {
    return " " + Object.keys(i).filter((t) => i[t]).join(" ") + " ";
  }
  update(i, [t]) {
    var e, s;
    if (this.it === void 0) {
      this.it = /* @__PURE__ */ new Set(), i.strings !== void 0 && (this.nt = new Set(i.strings.join(" ").split(/\s/).filter((o) => o !== "")));
      for (const o in t)
        t[o] && !(!((e = this.nt) === null || e === void 0) && e.has(o)) && this.it.add(o);
      return this.render(t);
    }
    const r = i.element.classList;
    this.it.forEach((o) => {
      o in t || (r.remove(o), this.it.delete(o));
    });
    for (const o in t) {
      const n = !!t[o];
      n === this.it.has(o) || !((s = this.nt) === null || s === void 0) && s.has(o) || (n ? (r.add(o), this.it.add(o)) : (r.remove(o), this.it.delete(o)));
    }
    return _;
  }
});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class et extends Mt {
  constructor(t) {
    if (super(t), this.et = d, t.type !== xt.CHILD)
      throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === d || t == null)
      return this.ft = void 0, this.et = t;
    if (t === _)
      return t;
    if (typeof t != "string")
      throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.et)
      return this.ft;
    this.et = t;
    const e = [t];
    return e.raw = e, this.ft = { _$litType$: this.constructor.resultType, strings: e, values: [] };
  }
}
et.directiveName = "unsafeHTML", et.resultType = 1;
const ue = Ut(et);
var kt = {}, B = {};
Object.defineProperty(B, "__esModule", { value: !0 });
B.StoreController = void 0;
class ce {
  constructor(t, e) {
    this.host = t, this.atom = e, t.addController(this);
  }
  // Subscribe to the atom when the host connects
  hostConnected() {
    this.unsubscribe = this.atom.subscribe(() => {
      this.host.requestUpdate();
    });
  }
  // Unsubscribe from the atom when the host disconnects
  hostDisconnected() {
    var t;
    (t = this.unsubscribe) === null || t === void 0 || t.call(this);
  }
  /**
   * The current value of the atom.
   * @readonly
   */
  get value() {
    return this.atom.get();
  }
}
B.StoreController = ce;
var C = {};
Object.defineProperty(C, "__esModule", { value: !0 });
C.MultiStoreController = void 0;
class de {
  constructor(t, e) {
    this.host = t, this.atoms = e, t.addController(this);
  }
  // Subscribe to the atom when the host connects
  hostConnected() {
    this.unsubscribes = this.atoms.map((t) => t.subscribe(() => this.host.requestUpdate()));
  }
  // Unsubscribe from the atom when the host disconnects
  hostDisconnected() {
    var t;
    (t = this.unsubscribes) === null || t === void 0 || t.forEach((e) => e());
  }
  /**
   * The current values of the atoms.
   * @readonly
   */
  get values() {
    return this.atoms.map((t) => t.get());
  }
}
C.MultiStoreController = de;
var z = {};
Object.defineProperty(z, "__esModule", { value: !0 });
z.useStores = void 0;
const pe = C;
function ve(...i) {
  return (t) => class extends t {
    constructor(...e) {
      super(...e), new pe.MultiStoreController(this, i);
    }
  };
}
z.useStores = ve;
var K = {};
Object.defineProperty(K, "__esModule", { value: !0 });
K.withStores = void 0;
const $e = C, fe = (i, t) => class extends i {
  constructor(...s) {
    super(...s), new $e.MultiStoreController(this, t);
  }
};
K.withStores = fe;
(function(i) {
  Object.defineProperty(i, "__esModule", { value: !0 }), i.withStores = i.useStores = i.MultiStoreController = i.StoreController = void 0;
  var t = B;
  Object.defineProperty(i, "StoreController", { enumerable: !0, get: function() {
    return t.StoreController;
  } });
  var e = C;
  Object.defineProperty(i, "MultiStoreController", { enumerable: !0, get: function() {
    return e.MultiStoreController;
  } });
  var s = z;
  Object.defineProperty(i, "useStores", { enumerable: !0, get: function() {
    return s.useStores;
  } });
  var r = K;
  Object.defineProperty(i, "withStores", { enumerable: !0, get: function() {
    return r.withStores;
  } });
})(kt);
const _e = `.hide{display:none}.container{position:absolute;right:0;bottom:0;margin:.5rem;padding:.5rem;border:solid 2px grey;border-radius:8px;display:flex;flex-direction:column;gap:.5rem;background-color:#f5f5f5}.bar{display:flex;flex-direction:row;gap:.5rem}.bar>h2{margin:0}.bar>button{margin-left:auto;font-weight:700}
`;
var ye = Object.defineProperty, me = Object.getOwnPropertyDescriptor, Ht = (i, t, e, s) => {
  for (var r = s > 1 ? void 0 : s ? me(t, e) : t, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (r = (s ? n(t, e, r) : n(r)) || r);
  return s && r && ye(t, e, r), r;
};
let U = class extends b {
  constructor() {
    super(...arguments), this.stateController = new kt.StoreController(this, I);
  }
  render() {
    var t, e, s;
    const i = this.stateController.value;
    return Ct`
      <div class=${ae({ hide: !i.show })}>
        <div class="container">
          <div class="bar">
            <h2><a href=${(t = i.peekAt) == null ? void 0 : t.linkTo}>${(e = i.peekAt) == null ? void 0 : e.title}</a></h2>
            <button @click=${() => re()}>X</button>
          </div>

          ${ue((s = i.peekAt) == null ? void 0 : s.rawData)}
        </div>
      </div>
    `;
  }
};
U.styles = gt`
    ${rt(_e)}
  `;
Ht([
  Tt()
], U.prototype, "stateController", 2);
U = Ht([
  Pt("vvv-peeker")
], U);
const Se = {
  Peekable: x,
  Peeker: U
};
console.info(
  "module 'peeker' is loaded, you can use custom elements 'vvv-peekable' and 'vvv-peeker' now!"
);
console.info(
  "you can know more about peeker at https://github.com/tkngaejcpi/peeker."
);
export {
  Se as default
};
