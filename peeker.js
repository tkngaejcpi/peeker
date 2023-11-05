/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = window, it = R.ShadowRoot && (R.ShadyCSS === void 0 || R.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, st = Symbol(), ht = /* @__PURE__ */ new WeakMap();
let bt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== st)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (it && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = ht.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && ht.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const rt = (s) => new bt(typeof s == "string" ? s : s + "", void 0, st), St = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, r, o) => i + ((n) => {
    if (n._$cssResult$ === !0)
      return n.cssText;
    if (typeof n == "number")
      return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + s[o + 1], s[0]);
  return new bt(e, s, st);
}, jt = (s, t) => {
  it ? s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet) : t.forEach((e) => {
    const i = document.createElement("style"), r = R.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = e.cssText, s.appendChild(i);
  });
}, ct = it ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules)
    e += i.cssText;
  return rt(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var V;
const j = window, ut = j.trustedTypes, Lt = ut ? ut.emptyScript : "", dt = j.reactiveElementPolyfillSupport, F = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Lt : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, Et = (s, t) => t !== s && (t == t || s == s), W = { attribute: !0, type: String, converter: F, reflect: !1, hasChanged: Et }, G = "finalized";
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
    return this.elementProperties.forEach((e, i) => {
      const r = this._$Ep(i, e);
      r !== void 0 && (this._$Ev.set(r, i), t.push(r));
    }), t;
  }
  static createProperty(t, e = W) {
    if (e.state && (e.attribute = !1), this.finalize(), this.elementProperties.set(t, e), !e.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const i = typeof t == "symbol" ? Symbol() : "__" + t, r = this.getPropertyDescriptor(t, i, e);
      r !== void 0 && Object.defineProperty(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    return { get() {
      return this[e];
    }, set(r) {
      const o = this[t];
      this[e] = r, this.requestUpdate(t, o, i);
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
      const e = this.properties, i = [...Object.getOwnPropertyNames(e), ...Object.getOwnPropertySymbols(e)];
      for (const r of i)
        this.createProperty(r, e[r]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const r of i)
        e.unshift(ct(r));
    } else
      t !== void 0 && e.push(ct(t));
    return e;
  }
  static _$Ep(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  _$Eu() {
    var t;
    this._$E_ = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (t = this.constructor.h) === null || t === void 0 || t.forEach((e) => e(this));
  }
  addController(t) {
    var e, i;
    ((e = this._$ES) !== null && e !== void 0 ? e : this._$ES = []).push(t), this.renderRoot !== void 0 && this.isConnected && ((i = t.hostConnected) === null || i === void 0 || i.call(t));
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
    return jt(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var t;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) === null || i === void 0 ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) === null || i === void 0 ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$EO(t, e, i = W) {
    var r;
    const o = this.constructor._$Ep(t, i);
    if (o !== void 0 && i.reflect === !0) {
      const n = (((r = i.converter) === null || r === void 0 ? void 0 : r.toAttribute) !== void 0 ? i.converter : F).toAttribute(e, i.type);
      this._$El = t, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$El = null;
    }
  }
  _$AK(t, e) {
    var i;
    const r = this.constructor, o = r._$Ev.get(t);
    if (o !== void 0 && this._$El !== o) {
      const n = r.getPropertyOptions(o), h = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((i = n.converter) === null || i === void 0 ? void 0 : i.fromAttribute) !== void 0 ? n.converter : F;
      this._$El = o, this[o] = h.fromAttribute(e, n.type), this._$El = null;
    }
  }
  requestUpdate(t, e, i) {
    let r = !0;
    t !== void 0 && (((i = i || this.constructor.getPropertyOptions(t)).hasChanged || Et)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e), i.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, i))) : r = !1), !this.isUpdatePending && r && (this._$E_ = this._$Ej());
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
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (t = this._$ES) === null || t === void 0 || t.forEach((r) => {
        var o;
        return (o = r.hostUpdate) === null || o === void 0 ? void 0 : o.call(r);
      }), this.update(i)) : this._$Ek();
    } catch (r) {
      throw e = !1, this._$Ek(), r;
    }
    e && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((i) => {
      var r;
      return (r = i.hostUpdated) === null || r === void 0 ? void 0 : r.call(i);
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
    this._$EC !== void 0 && (this._$EC.forEach((e, i) => this._$EO(i, this[i], e)), this._$EC = void 0), this._$Ek();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
A[G] = !0, A.elementProperties = /* @__PURE__ */ new Map(), A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, dt == null || dt({ ReactiveElement: A }), ((V = j.reactiveElementVersions) !== null && V !== void 0 ? V : j.reactiveElementVersions = []).push("1.6.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var q;
const L = window, S = L.trustedTypes, pt = S ? S.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, tt = "$lit$", _ = `lit$${(Math.random() + "").slice(9)}$`, wt = "?" + _, Dt = `<${wt}>`, g = document, P = () => g.createComment(""), x = (s) => s === null || typeof s != "object" && typeof s != "function", Ct = Array.isArray, It = (s) => Ct(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", Z = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, vt = /-->/g, $t = />/g, y = RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ft = /'/g, _t = /"/g, Pt = /^(?:script|style|textarea|title)$/i, zt = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), xt = zt(1), f = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), yt = /* @__PURE__ */ new WeakMap(), m = g.createTreeWalker(g, 129, null, !1);
function Tt(s, t) {
  if (!Array.isArray(s) || !s.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return pt !== void 0 ? pt.createHTML(t) : t;
}
const Bt = (s, t) => {
  const e = s.length - 1, i = [];
  let r, o = t === 2 ? "<svg>" : "", n = C;
  for (let h = 0; h < e; h++) {
    const l = s[h];
    let a, c, u = -1, p = 0;
    for (; p < l.length && (n.lastIndex = p, c = n.exec(l), c !== null); )
      p = n.lastIndex, n === C ? c[1] === "!--" ? n = vt : c[1] !== void 0 ? n = $t : c[2] !== void 0 ? (Pt.test(c[2]) && (r = RegExp("</" + c[2], "g")), n = y) : c[3] !== void 0 && (n = y) : n === y ? c[0] === ">" ? (n = r ?? C, u = -1) : c[1] === void 0 ? u = -2 : (u = n.lastIndex - c[2].length, a = c[1], n = c[3] === void 0 ? y : c[3] === '"' ? _t : ft) : n === _t || n === ft ? n = y : n === vt || n === $t ? n = C : (n = y, r = void 0);
    const $ = n === y && s[h + 1].startsWith("/>") ? " " : "";
    o += n === C ? l + Dt : u >= 0 ? (i.push(a), l.slice(0, u) + tt + l.slice(u) + _ + $) : l + _ + (u === -2 ? (i.push(void 0), h) : $);
  }
  return [Tt(s, o + (s[e] || "<?>") + (t === 2 ? "</svg>" : "")), i];
};
class T {
  constructor({ strings: t, _$litType$: e }, i) {
    let r;
    this.parts = [];
    let o = 0, n = 0;
    const h = t.length - 1, l = this.parts, [a, c] = Bt(t, e);
    if (this.el = T.createElement(a, i), m.currentNode = this.el.content, e === 2) {
      const u = this.el.content, p = u.firstChild;
      p.remove(), u.append(...p.childNodes);
    }
    for (; (r = m.nextNode()) !== null && l.length < h; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) {
          const u = [];
          for (const p of r.getAttributeNames())
            if (p.endsWith(tt) || p.startsWith(_)) {
              const $ = c[n++];
              if (u.push(p), $ !== void 0) {
                const Rt = r.getAttribute($.toLowerCase() + tt).split(_), k = /([.?@])?(.*)/.exec($);
                l.push({ type: 1, index: o, name: k[2], strings: Rt, ctor: k[1] === "." ? Vt : k[1] === "?" ? qt : k[1] === "@" ? Zt : D });
              } else
                l.push({ type: 6, index: o });
            }
          for (const p of u)
            r.removeAttribute(p);
        }
        if (Pt.test(r.tagName)) {
          const u = r.textContent.split(_), p = u.length - 1;
          if (p > 0) {
            r.textContent = S ? S.emptyScript : "";
            for (let $ = 0; $ < p; $++)
              r.append(u[$], P()), m.nextNode(), l.push({ type: 2, index: ++o });
            r.append(u[p], P());
          }
        }
      } else if (r.nodeType === 8)
        if (r.data === wt)
          l.push({ type: 2, index: o });
        else {
          let u = -1;
          for (; (u = r.data.indexOf(_, u + 1)) !== -1; )
            l.push({ type: 7, index: o }), u += _.length - 1;
        }
      o++;
    }
  }
  static createElement(t, e) {
    const i = g.createElement("template");
    return i.innerHTML = t, i;
  }
}
function E(s, t, e = s, i) {
  var r, o, n, h;
  if (t === f)
    return t;
  let l = i !== void 0 ? (r = e._$Co) === null || r === void 0 ? void 0 : r[i] : e._$Cl;
  const a = x(t) ? void 0 : t._$litDirective$;
  return (l == null ? void 0 : l.constructor) !== a && ((o = l == null ? void 0 : l._$AO) === null || o === void 0 || o.call(l, !1), a === void 0 ? l = void 0 : (l = new a(s), l._$AT(s, e, i)), i !== void 0 ? ((n = (h = e)._$Co) !== null && n !== void 0 ? n : h._$Co = [])[i] = l : e._$Cl = l), l !== void 0 && (t = E(s, l._$AS(s, t.values), l, i)), t;
}
class Kt {
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
    const { el: { content: i }, parts: r } = this._$AD, o = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : g).importNode(i, !0);
    m.currentNode = o;
    let n = m.nextNode(), h = 0, l = 0, a = r[0];
    for (; a !== void 0; ) {
      if (h === a.index) {
        let c;
        a.type === 2 ? c = new M(n, n.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (c = new Jt(n, this, t)), this._$AV.push(c), a = r[++l];
      }
      h !== (a == null ? void 0 : a.index) && (n = m.nextNode(), h++);
    }
    return m.currentNode = g, o;
  }
  v(t) {
    let e = 0;
    for (const i of this._$AV)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class M {
  constructor(t, e, i, r) {
    var o;
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = r, this._$Cp = (o = r == null ? void 0 : r.isConnected) === null || o === void 0 || o;
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
    t = E(this, t, e), x(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== f && this._(t) : t._$litType$ !== void 0 ? this.g(t) : t.nodeType !== void 0 ? this.$(t) : It(t) ? this.T(t) : this._(t);
  }
  k(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  $(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.k(t));
  }
  _(t) {
    this._$AH !== d && x(this._$AH) ? this._$AA.nextSibling.data = t : this.$(g.createTextNode(t)), this._$AH = t;
  }
  g(t) {
    var e;
    const { values: i, _$litType$: r } = t, o = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = T.createElement(Tt(r.h, r.h[0]), this.options)), r);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === o)
      this._$AH.v(i);
    else {
      const n = new Kt(o, this), h = n.u(this.options);
      n.v(i), this.$(h), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = yt.get(t.strings);
    return e === void 0 && yt.set(t.strings, e = new T(t)), e;
  }
  T(t) {
    Ct(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, r = 0;
    for (const o of t)
      r === e.length ? e.push(i = new M(this.k(P()), this.k(P()), this, this.options)) : i = e[r], i._$AI(o), r++;
    r < e.length && (this._$AR(i && i._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) === null || i === void 0 || i.call(this, !1, !0, e); t && t !== this._$AB; ) {
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
  constructor(t, e, i, r, o) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = d;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, i, r) {
    const o = this.strings;
    let n = !1;
    if (o === void 0)
      t = E(this, t, e, 0), n = !x(t) || t !== this._$AH && t !== f, n && (this._$AH = t);
    else {
      const h = t;
      let l, a;
      for (t = o[0], l = 0; l < o.length - 1; l++)
        a = E(this, h[i + l], e, l), a === f && (a = this._$AH[l]), n || (n = !x(a) || a !== this._$AH[l]), a === d ? t = d : t !== d && (t += (a ?? "") + o[l + 1]), this._$AH[l] = a;
    }
    n && !r && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Vt extends D {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
const Wt = S ? S.emptyScript : "";
class qt extends D {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    t && t !== d ? this.element.setAttribute(this.name, Wt) : this.element.removeAttribute(this.name);
  }
}
class Zt extends D {
  constructor(t, e, i, r, o) {
    super(t, e, i, r, o), this.type = 5;
  }
  _$AI(t, e = this) {
    var i;
    if ((t = (i = E(this, t, e, 0)) !== null && i !== void 0 ? i : d) === f)
      return;
    const r = this._$AH, o = t === d && r !== d || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, n = t !== d && (r === d || o);
    o && this.element.removeEventListener(this.name, this, r), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && i !== void 0 ? i : this.element, t) : this._$AH.handleEvent(t);
  }
}
class Jt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    E(this, t);
  }
}
const mt = L.litHtmlPolyfillSupport;
mt == null || mt(T, M), ((q = L.litHtmlVersions) !== null && q !== void 0 ? q : L.litHtmlVersions = []).push("2.8.0");
const Qt = (s, t, e) => {
  var i, r;
  const o = (i = e == null ? void 0 : e.renderBefore) !== null && i !== void 0 ? i : t;
  let n = o._$litPart$;
  if (n === void 0) {
    const h = (r = e == null ? void 0 : e.renderBefore) !== null && r !== void 0 ? r : null;
    o._$litPart$ = n = new M(t.insertBefore(P(), h), h, void 0, e ?? {});
  }
  return n._$AI(s), n;
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
    const i = super.createRenderRoot();
    return (t = (e = this.renderOptions).renderBefore) !== null && t !== void 0 || (e.renderBefore = i.firstChild), i;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Qt(e, this.renderRoot, this.renderOptions);
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
    return f;
  }
}
b.finalized = !0, b._$litElement$ = !0, (J = globalThis.litElementHydrateSupport) === null || J === void 0 || J.call(globalThis, { LitElement: b });
const gt = globalThis.litElementPolyfillSupport;
gt == null || gt({ LitElement: b });
((Q = globalThis.litElementVersions) !== null && Q !== void 0 ? Q : globalThis.litElementVersions = []).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ot = (s) => (t) => typeof t == "function" ? ((e, i) => (customElements.define(e, i), i))(s, t) : ((e, i) => {
  const { kind: r, elements: o } = i;
  return { kind: r, elements: o, finisher(n) {
    customElements.define(e, n);
  } };
})(s, t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xt = (s, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? { ...t, finisher(e) {
  e.createProperty(t.key, s);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: t.key, initializer() {
  typeof t.initializer == "function" && (this[t.key] = t.initializer.call(this));
}, finisher(e) {
  e.createProperty(t.key, s);
} }, Yt = (s, t, e) => {
  t.constructor.createProperty(e, s);
};
function Ut(s) {
  return (t, e) => e !== void 0 ? Yt(s, t, e) : Xt(s, t);
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var X;
((X = window.HTMLSlotElement) === null || X === void 0 ? void 0 : X.prototype.assignedElements) != null;
let Y = 0, At = [];
function Ft() {
  return Y += 1, () => {
    if (Y -= 1, Y === 0) {
      let s = At;
      At = [];
      for (let t of s)
        t();
    }
  };
}
let H = Symbol(), N = Symbol(), Gt = 0, te = (s, t, e, i) => {
  let r = ++Gt, o = { ...s };
  o.set = (...a) => {
    s[H] = t, s[N] = r, s.set(...a), delete s[H], delete s[N];
  }, s.setKey && (o.setKey = (...a) => {
    s[H] = t, s[N] = r, s.setKey(...a), delete s[H], delete s[N];
  });
  let n, h;
  s.action && ([n, h] = s.action(r, t, i));
  let l = e(o, ...i);
  if (l instanceof Promise) {
    let a = Ft();
    return l.catch((c) => {
      throw n && n(c), c;
    }).finally(() => {
      a(), h && h();
    });
  }
  return h && h(), l;
}, nt = (s, t, e) => (...i) => te(s, t, e, i), v = [], ee = (s, t) => {
  let e = [], i = {
    get() {
      return i.lc || i.listen(() => {
      })(), i.value;
    },
    l: t || 0,
    lc: 0,
    listen(r, o) {
      return i.lc = e.push(r, o || i.l) / 2, () => {
        let n = e.indexOf(r);
        ~n && (e.splice(n, 2), --i.lc || i.off());
      };
    },
    notify(r) {
      let o = !v.length;
      for (let n = 0; n < e.length; n += 2)
        v.push(
          e[n],
          e[n + 1],
          i.value,
          r
        );
      if (o) {
        for (let n = 0; n < v.length; n += 4) {
          let h;
          for (let l = n + 1; !h && (l += 4) < v.length; )
            v[l] < v[n + 1] && (h = v.push(
              v[n],
              v[n + 1],
              v[n + 2],
              v[n + 3]
            ));
          h || v[n](v[n + 2], v[n + 3]);
        }
        v.length = 0;
      }
    },
    off() {
    },
    /* It will be called on last listener unsubscribing.
       We will redefine it in onMount and onStop. */
    set(r) {
      i.value !== r && (i.value = r, i.notify());
    },
    subscribe(r, o) {
      let n = i.listen(r, o);
      return r(i.value), n;
    },
    value: s
  };
  return i;
}, ie = (s = {}) => {
  let t = ee(s);
  return t.setKey = function(e, i) {
    typeof i > "u" ? e in t.value && (t.value = { ...t.value }, delete t.value[e], t.notify(e)) : t.value[e] !== i && (t.value = {
      ...t.value,
      [e]: i
    }, t.notify(e));
  }, t;
};
const se = {
  show: !1,
  position: {
    x: 0,
    y: 0
  }
}, I = ie(se), re = nt(I, "hide", (s) => {
  s.setKey("show", !1);
}), ne = nt(I, "show", (s) => {
  s.setKey("show", !0);
}), oe = nt(
  I,
  "peek",
  (s, t, e) => {
    fetch(t).then((i) => i.json()).then((i) => {
      s.setKey("peekAt", i), s.setKey("position", e), ne();
    });
  }
), le = `a{text-decoration:underline}
`;
var ae = Object.defineProperty, he = Object.getOwnPropertyDescriptor, Mt = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? he(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && ae(t, e, r), r;
};
const ce = (s) => ({
  x: s.clientX,
  y: s.clientY
});
let O = class extends b {
  constructor() {
    super(...arguments), this.dataURL = void 0;
  }
  render() {
    return xt`
      <a @click=${(s) => {
      oe(this.dataURL, ce(s));
    }}><slot><slot/></a>
      `;
  }
};
O.styles = St`
    ${rt(le)}
  `;
Mt([
  Ut({ attribute: "data-url" })
], O.prototype, "dataURL", 2);
O = Mt([
  Ot("vvv-peekable")
], O);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, lt = (s) => (...t) => ({ _$litDirective$: s, values: t });
let at = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, i) {
    this._$Ct = t, this._$AM = e, this._$Ci = i;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ue = lt(class extends at {
  constructor(s) {
    var t;
    if (super(s), s.type !== ot.ATTRIBUTE || s.name !== "class" || ((t = s.strings) === null || t === void 0 ? void 0 : t.length) > 2)
      throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(s) {
    return " " + Object.keys(s).filter((t) => s[t]).join(" ") + " ";
  }
  update(s, [t]) {
    var e, i;
    if (this.it === void 0) {
      this.it = /* @__PURE__ */ new Set(), s.strings !== void 0 && (this.nt = new Set(s.strings.join(" ").split(/\s/).filter((o) => o !== "")));
      for (const o in t)
        t[o] && !(!((e = this.nt) === null || e === void 0) && e.has(o)) && this.it.add(o);
      return this.render(t);
    }
    const r = s.element.classList;
    this.it.forEach((o) => {
      o in t || (r.remove(o), this.it.delete(o));
    });
    for (const o in t) {
      const n = !!t[o];
      n === this.it.has(o) || !((i = this.nt) === null || i === void 0) && i.has(o) || (n ? (r.add(o), this.it.add(o)) : (r.remove(o), this.it.delete(o)));
    }
    return f;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const kt = "important", de = " !" + kt, pe = lt(class extends at {
  constructor(s) {
    var t;
    if (super(s), s.type !== ot.ATTRIBUTE || s.name !== "style" || ((t = s.strings) === null || t === void 0 ? void 0 : t.length) > 2)
      throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(s) {
    return Object.keys(s).reduce((t, e) => {
      const i = s[e];
      return i == null ? t : t + `${e = e.includes("-") ? e : e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${i};`;
    }, "");
  }
  update(s, [t]) {
    const { style: e } = s.element;
    if (this.ht === void 0) {
      this.ht = /* @__PURE__ */ new Set();
      for (const i in t)
        this.ht.add(i);
      return this.render(t);
    }
    this.ht.forEach((i) => {
      t[i] == null && (this.ht.delete(i), i.includes("-") ? e.removeProperty(i) : e[i] = "");
    });
    for (const i in t) {
      const r = t[i];
      if (r != null) {
        this.ht.add(i);
        const o = typeof r == "string" && r.endsWith(de);
        i.includes("-") || o ? e.setProperty(i, o ? r.slice(0, -11) : r, o ? kt : "") : e[i] = r;
      }
    }
    return f;
  }
});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class et extends at {
  constructor(t) {
    if (super(t), this.et = d, t.type !== ot.CHILD)
      throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === d || t == null)
      return this.ft = void 0, this.et = t;
    if (t === f)
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
const ve = lt(et);
var Ht = {}, z = {};
Object.defineProperty(z, "__esModule", { value: !0 });
z.StoreController = void 0;
class $e {
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
z.StoreController = $e;
var w = {};
Object.defineProperty(w, "__esModule", { value: !0 });
w.MultiStoreController = void 0;
class fe {
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
w.MultiStoreController = fe;
var B = {};
Object.defineProperty(B, "__esModule", { value: !0 });
B.useStores = void 0;
const _e = w;
function ye(...s) {
  return (t) => class extends t {
    constructor(...e) {
      super(...e), new _e.MultiStoreController(this, s);
    }
  };
}
B.useStores = ye;
var K = {};
Object.defineProperty(K, "__esModule", { value: !0 });
K.withStores = void 0;
const me = w, ge = (s, t) => class extends s {
  constructor(...i) {
    super(...i), new me.MultiStoreController(this, t);
  }
};
K.withStores = ge;
(function(s) {
  Object.defineProperty(s, "__esModule", { value: !0 }), s.withStores = s.useStores = s.MultiStoreController = s.StoreController = void 0;
  var t = z;
  Object.defineProperty(s, "StoreController", { enumerable: !0, get: function() {
    return t.StoreController;
  } });
  var e = w;
  Object.defineProperty(s, "MultiStoreController", { enumerable: !0, get: function() {
    return e.MultiStoreController;
  } });
  var i = B;
  Object.defineProperty(s, "useStores", { enumerable: !0, get: function() {
    return i.useStores;
  } });
  var r = K;
  Object.defineProperty(s, "withStores", { enumerable: !0, get: function() {
    return r.withStores;
  } });
})(Ht);
const Ae = `.hidden{padding:0!important;height:0!important;width:0!important;scale:.2!important;border:0!important;opacity:0;overflow:hidden}.container{position:absolute;z-index:99;margin:.5rem;padding:.5rem;height:auto;width:auto;scale:1;border:solid 2px grey;border-radius:8px;display:flex;flex-direction:column;gap:.5rem;background-color:#f5f5f5;opacity:.97;transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.2s}.bar{display:flex;flex-direction:row;gap:.5rem}.bar>h2{margin:0}.bar>button{margin-left:auto;font-weight:700}
`;
var be = Object.defineProperty, Se = Object.getOwnPropertyDescriptor, Nt = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Se(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && be(t, e, r), r;
};
let U = class extends b {
  constructor() {
    super(...arguments), this.stateController = new Ht.StoreController(this, I);
  }
  render() {
    var t, e, i;
    const s = this.stateController.value;
    return xt`
      <div
        class=${ue({ container: !0, hidden: !s.show })}
        style=${pe({
      top: `${s.position.y}px`,
      left: `${s.position.x}px`
    })}
      >
        <div class="bar">
          <h2>
            <a href=${(t = s.peekAt) == null ? void 0 : t.linkTo}>${(e = s.peekAt) == null ? void 0 : e.title}</a>
          </h2>
          <button
            @click=${() => {
      re();
    }}
          >
            X
          </button>
        </div>

        ${ve((i = s.peekAt) == null ? void 0 : i.rawData)}
      </div>
    `;
  }
};
U.styles = St`
    ${rt(Ae)}
  `;
Nt([
  Ut()
], U.prototype, "stateController", 2);
U = Nt([
  Ot("vvv-peeker")
], U);
const xe = {
  Peekable: O,
  Peeker: U
};
console.info(
  "module 'peeker' is loaded, you can use custom elements 'vvv-peekable' and 'vvv-peeker' now!"
);
console.info(
  "you can know more about peeker at https://github.com/tkngaejcpi/peeker."
);
export {
  xe as default
};
