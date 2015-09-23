/*******
 * G.R.I.D Global Vars
 ******/
var grid = function () {
    "use strict";

    var g = {
    breakPoints: {
        mobile: 480,
        tablet: 1024,
        }
        ,
    isMobile: false,
    isTablet: false,
    testSizes: function (width) {
            if (width <= g.breakPoints.mobile) {
                g.isMobile = true;
                g.isTablet = false;
            }
            else {
                g.isMobile = false;
                g.isTablet = true;
            }
        }
        ,
    checkIsMobile: function () {
            g.testSizes(bodyWidth);
            return g.isMobile;
        }
        ,
    checkIsTablet: function () {
            g.testSizes(bodyWidth);
            return g.isTablet;
        }
        ,
    };

    return g;

}
();
(this, function ()
    {
        return grid
    }
);

/*******
 * StyleFix 1.0.3 & PrefixFree 1.0.7 | @author Lea Verou | MIT license
 ******/
(function(){function k(a,b){return[].slice.call((b||document).querySelectorAll(a))}if(window.addEventListener){var e=window.StyleFix={link:function(a){try{if("stylesheet"!==a.rel||a.hasAttribute("data-noprefix"))return}catch(b){return}var c=a.href||a.getAttribute("data-href"),d=c.replace(/[^\/]+$/,""),h=(/^[a-z]{3,10}:/.exec(d)||[""])[0],l=(/^[a-z]{3,10}:\/\/[^\/]+/.exec(d)||[""])[0],g=/^([^?]*)\??/.exec(c)[1],m=a.parentNode,f=new XMLHttpRequest,n;f.onreadystatechange=function(){4===f.readyState&&
n()};n=function(){var b=f.responseText;if(b&&a.parentNode&&(!f.status||400>f.status||600<f.status)){b=e.fix(b,!0,a);if(d)var b=b.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi,function(b,a,c){return/^([a-z]{3,10}:|#)/i.test(c)?b:/^\/\//.test(c)?'url("'+h+c+'")':/^\//.test(c)?'url("'+l+c+'")':/^\?/.test(c)?'url("'+g+c+'")':'url("'+d+c+'")'}),c=d.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g,"\\$1"),b=b.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)"+c,"gi"),"$1");c=document.createElement("style");c.textContent=
b;c.media=a.media;c.disabled=a.disabled;c.setAttribute("data-href",a.getAttribute("href"));m.insertBefore(c,a);m.removeChild(a);c.media=a.media}};try{f.open("GET",c),f.send(null)}catch(p){"undefined"!=typeof XDomainRequest&&(f=new XDomainRequest,f.onerror=f.onprogress=function(){},f.onload=n,f.open("GET",c),f.send(null))}a.setAttribute("data-inprogress","")},styleElement:function(a){if(!a.hasAttribute("data-noprefix")){var b=a.disabled;a.textContent=e.fix(a.textContent,!0,a);a.disabled=b}},styleAttribute:function(a){var b=
a.getAttribute("style"),b=e.fix(b,!1,a);a.setAttribute("style",b)},process:function(){k('link[rel="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link);k("style").forEach(StyleFix.styleElement);k("[style]").forEach(StyleFix.styleAttribute)},register:function(a,b){(e.fixers=e.fixers||[]).splice(void 0===b?e.fixers.length:b,0,a)},fix:function(a,b,c){for(var d=0;d<e.fixers.length;d++)a=e.fixers[d](a,b,c)||a;return a},camelCase:function(a){return a.replace(/-([a-z])/g,function(b,a){return a.toUpperCase()}).replace("-",
"")},deCamelCase:function(a){return a.replace(/[A-Z]/g,function(b){return"-"+b.toLowerCase()})}};(function(){setTimeout(function(){k('link[rel="stylesheet"]').forEach(StyleFix.link)},10);document.addEventListener("DOMContentLoaded",StyleFix.process,!1)})()}})();
(function(k){function e(b,c,d,h,l){b=a[b];b.length&&(b=RegExp(c+"("+b.join("|")+")"+d,"gi"),l=l.replace(b,h));return l}if(window.StyleFix&&window.getComputedStyle){var a=window.PrefixFree={prefixCSS:function(b,c,d){var h=a.prefix;-1<a.functions.indexOf("linear-gradient")&&(b=b.replace(/(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/ig,function(b,a,c,d){return a+(c||"")+"linear-gradient("+(90-d)+"deg"}));b=e("functions","(\\s|:|,)","\\s*\\(","$1"+h+"$2(",b);b=e("keywords","(\\s|:)","(\\s|;|\\}|$)",
"$1"+h+"$2$3",b);b=e("properties","(^|\\{|\\s|;)","\\s*:","$1"+h+"$2:",b);if(a.properties.length){var l=RegExp("\\b("+a.properties.join("|")+")(?!:)","gi");b=e("valueProperties","\\b",":(.+?);",function(a){return a.replace(l,h+"$1")},b)}c&&(b=e("selectors","","\\b",a.prefixSelector,b),b=e("atrules","@","\\b","@"+h+"$1",b));b=b.replace(RegExp("-"+h,"g"),"-");return b=b.replace(/-\*-(?=[a-z]+)/gi,a.prefix)},property:function(b){return(0<=a.properties.indexOf(b)?a.prefix:"")+b},value:function(b,c){b=
e("functions","(^|\\s|,)","\\s*\\(","$1"+a.prefix+"$2(",b);b=e("keywords","(^|\\s)","(\\s|$)","$1"+a.prefix+"$2$3",b);0<=a.valueProperties.indexOf(c)&&(b=e("properties","(^|\\s|,)","($|\\s|,)","$1"+a.prefix+"$2$3",b));return b},prefixSelector:function(b){return b.replace(/^:{1,2}/,function(b){return b+a.prefix})},prefixProperty:function(b,c){var d=a.prefix+b;return c?StyleFix.camelCase(d):d}};(function(){var b={},c=[],d=getComputedStyle(document.documentElement,null),h=document.createElement("div").style,
l=function(a){if("-"===a.charAt(0)){c.push(a);a=a.split("-");var d=a[1];for(b[d]=++b[d]||1;3<a.length;)a.pop(),d=a.join("-"),StyleFix.camelCase(d)in h&&-1===c.indexOf(d)&&c.push(d)}};if(0<d.length)for(var g=0;g<d.length;g++)l(d[g]);else for(var e in d)l(StyleFix.deCamelCase(e));var g=0,f,k;for(k in b)d=b[k],g<d&&(f=k,g=d);a.prefix="-"+f+"-";a.Prefix=StyleFix.camelCase(a.prefix);a.properties=[];for(g=0;g<c.length;g++)e=c[g],0===e.indexOf(a.prefix)&&(f=e.slice(a.prefix.length),StyleFix.camelCase(f)in
h||a.properties.push(f));!("Ms"!=a.Prefix||"transform"in h||"MsTransform"in h)&&"msTransform"in h&&a.properties.push("transform","transform-origin");a.properties.sort()})();(function(){function b(a,b){h[b]="";h[b]=a;return!!h[b]}var c={"linear-gradient":{property:"backgroundImage",params:"red, teal"},calc:{property:"width",params:"1px + 5%"},element:{property:"backgroundImage",params:"#foo"},"cross-fade":{property:"backgroundImage",params:"url(a.png), url(b.png), 50%"}};c["repeating-linear-gradient"]=
c["repeating-radial-gradient"]=c["radial-gradient"]=c["linear-gradient"];var d={initial:"color","zoom-in":"cursor","zoom-out":"cursor",box:"display",flexbox:"display","inline-flexbox":"display",flex:"display","inline-flex":"display",grid:"display","inline-grid":"display","max-content":"width","min-content":"width","fit-content":"width","fill-available":"width"};a.functions=[];a.keywords=[];var h=document.createElement("div").style,e;for(e in c){var g=c[e],k=g.property,g=e+"("+g.params+")";!b(g,k)&&
b(a.prefix+g,k)&&a.functions.push(e)}for(var f in d)k=d[f],!b(f,k)&&b(a.prefix+f,k)&&a.keywords.push(f)})();(function(){function b(a){e.textContent=a+"{}";return!!e.sheet.cssRules.length}var c={":read-only":null,":read-write":null,":any-link":null,"::selection":null},d={keyframes:"name",viewport:null,document:'regexp(".")'};a.selectors=[];a.atrules=[];var e=k.appendChild(document.createElement("style")),l;for(l in c){var g=l+(c[l]?"("+c[l]+")":"");!b(g)&&b(a.prefixSelector(g))&&a.selectors.push(l)}for(var m in d)g=
m+" "+(d[m]||""),!b("@"+g)&&b("@"+a.prefix+g)&&a.atrules.push(m);k.removeChild(e)})();a.valueProperties=["transition","transition-property"];k.className+=" "+a.prefix;StyleFix.register(a.prefixCSS)}})(document.documentElement);

/*******
 * jquery.onvisible v0.1 | (c) n33 | n33.co @n33co | MIT License
 ******/
(function ()
    {
        var e, t = jQuery(window), n =[], r = 100, i = 150, s = function () {
            var e = n.length, r = t.scrollTop() + t.height() - i, s, o; for (s = 0; s< e; s++) o = n[s], !o.state && r> o.o.offset().top && (o.state = !0, o.fn())
        };
        t.load(function ()
            {
                t.on("scroll resize", function ()
                    {
                        window.clearTimeout(e), e = window.setTimeout(function ()
                            {
                                s()
                            }
                            , r)
                    }
                ).trigger("resize")
            }
        ), jQuery.fn.onVisible = function (e, t) {
            n.push(
                {
                o: jQuery(this), fn: e, pad: t? t: i, state: !1
                }
            )
        }
    }
)();

/*******
 * jquery.dropotron v1.4.3 | (c) n33 | n33.co | MIT license
 ******/
(function (e)
    {
        var t = "openerActiveClass", n = "click touchend", r = "left", i = "doCollapseAll", s = "position", o = "trigger", u = "disableSelection_dropotron", a = "addClass", f = "doCollapse", l = !1, c = "outerWidth", h = "removeClass", p = "preventDefault", d = "length", v = "dropotron", m = "clearTimeout", g = "right", y = "parent", b = !0, w = "speed", E = "none", S = "stopPropagation", x = "doExpand", T = ":visible", N = "absolute", C = "css", k = "center", L = "toggle", A = "baseZIndex", O = "offsetX", M = "alignment", _ = "submenuClassPrefix", D = "children", P = "hover", H = "relative", B = "doToggle", j = "ul", F = "z-index", I = "opacity", q = "find", R = "opener", U = "px", z = null, W = "hide", X = "offset", V = "detach", $ = "fast"; e.fn[u] = function () {
            return e(this)[C]("user-select", E)[C]("-khtml-user-select", E)[C]("-moz-user-select", E)[C]("-o-user-select", E)[C]("-webkit-user-select", E)
        }
        , e.fn[v] = function (t) {
            var n; if (this[d] == 0) return e(this); if (this[d] > 1) for (n = 0; n< this[d]; n++) e(this[n])[v](t); return e[v](e.extend
                (
                    {
                    selectorParent: e(this)
                    }
                    , t)
            )
        }
        , e[v] = function (E) {
            var et = e.extend(
                {
                selectorParent: z, baseZIndex: 1e3, menuClass: v, expandMode: P, hoverDelay: 150, hideDelay: 250, openerClass: R, openerActiveClass: "active", submenuClassPrefix: "level-", mode: "fade", speed: $, easing: "swing", alignment: r, offsetX: 0, offsetY: 0, globalOffsetY: 0, IEOffsetX: 0, IEOffsetY: 0, noOpenerFade: b, detach: b, cloneOnDetach: b
                }
                , E), tt = et.selectorParent, nt = tt[q](j), rt = e("body"), it = e("body,html"), st = e(window), ot = l, ut = z, at = z; tt.on(i, function () {
                    nt[o](f)
                }
            ), nt.each(function () {
                    var i = e(this), d = i[y](); et.hideDelay> 0 && i.add(d).on("mouseleave", function ()
                        {
                            window[m](at), at = window.setTimeout(function ()
                                {
                                    i[o](f)
                                }
                                , et.hideDelay)
                        }
                    ), i[u]()[W]()[a](et.menuClass)[C](s, N).on("mouseenter", function () {
                            window[m](at)
                        }
                    ).on(x, function () {
                            var n, u, p, v, E, S, x, _, D, P, B; if (i.is(T)) return l; window[m](at), nt.each(function ()
                                {
                                    var t = e(this); e.contains(t.get(0), d.get(0)) || t[o](f)
                                }
                            ), n = d[X](), u = d[s](), p = d[y]()[s](), v = d[c](), E = i[c](), S = i[C](F) == et[A]; if (S) {
                                et[V]? x = n: x = u, P = x.top + d.outerHeight() + et.globalOffsetY, _ = et[M], i[h](r)[h](g)[h](k); switch (et[M]) {
                                    case g: D = x[r] - E + v, D< 0 && (D = x[r], _ = r); break; case k: D = x[r] - Math.floor((E - v) / 2), D< 0? (D = x[r], _ = r): D + E> st.width() && (D = x[r] - E + v, _ = g); break; case r: default: D = x[r], D + E> st.width() && (D = x[r] - E + v, _ = g)
                                }
                                i[a](_)
                            }
                            else {
                                d[C](s) == H || d[C](s) == N? (P = et.offsetY, D = - 1 * u[r]): (P = u.top + et.offsetY, D = 0); switch (et[M]) {
                                    case g: D += - 1 * d[y]()[c]() + et[O]; break; case k: case r: default: D += d[y]()[c]() + et[O]
                                }
                            }
                            navigator.userAgent.match(/MSIE ([0-9]+)\./) && RegExp.$1< 8 && (D += et.IEOffsetX, P += et.IEOffsetY), i[C](r, D + U)[C]("top", P + U)[C](I, "0.01").show(), B = l, d[C](s) == H || d[C](s) == N? D = - 1 * u[r]: D = 0, i[X]()[r] < 0? (D += d[y]()[c]() - et[O], B = b): i[X]()[r] + E> st.width() && (D += - 1 * d[y]()[c]() - et[O], B = b), B && i[C](r, D + U), i[W]()[C](I, "1"); switch (et.mode) {
                                case "zoom": ot = b, d[a](et[t]), i.animate(
                                        {
                                        width: L, height: L
                                        }
                                        , et[w], et.easing, function () {
                                            ot = l
                                        }
                                    ); break; case "slide": ot = b, d[a](et[t]), i.animate({
                                        height: L
                                        }
                                        , et[w], et.easing, function () {
                                            ot = l
                                        }
                                    ); break; case "fade": ot = b, S && !et.noOpenerFade? (et[w] == "slow"? B = 80: et[w] == $? B = 40: B = Math.floor(et[w] / 2), d.fadeTo
                                            (B, .01, function ()
                                                {
                                                    d[a](et[t]), d.fadeTo(et[w], 1), i.fadeIn(et[w], function ()
                                                        {
                                                            ot = l
                                                        }
                                                    )
                                                }
                                            )
                                        ):
                                        (d[a](et[t]), d.fadeTo(et[w], 1), i.fadeIn
                                            (et[w], function ()
                                                {
                                                    ot = l
                                                }
                                            )
                                        ); break; case "instant": default: d[a
                                    ](et[t]), i.show()
                            }
                            return l
                        }
                    ).on(f, function () {
                            return i.is(T)? (i[W](), d[h](et[t]), i[q]("." + et[t])[h](et[t]), i[q](j)[W](), l): l
                        }
                    ).on(B, function () {
                            return i.is(T)? i[o](f): i[o](x), l
                        }
                    ), d[u]()[a](R)[C]("cursor", "pointer").on(n, function (e) {
                            if (ot) return; e[p](), e[S](), i[o](B)
                        }
                    ), et.expandMode == P && d[P](function () {
                            if (ot) return; ut = window.setTimeout(function ()
                                {
                                    i[o](x)
                                }
                                , et.hoverDelay)
                        }
                        , function () {
                            window[m](ut)
                        }
                    )
                }
            ), nt[q]("a")[C]("display", "block").on(n, function (t) {
                    if (ot) return; e(this).attr("href")[d] < 1 && t[p]()
                }
            ), tt[q]("li")[C]("white-space", "nowrap").each(function () {
                    var t = e(this), r = t[D]("a"), s = t[D](j), u = r.attr("href"); r.on(n, function (e)
                        {
                            u[d] == 0 || u == "#"? e[p](): e[S]()
                        }
                    ), r[d] > 0 && s[d] == 0 && t.on(n, function (e) {
                            if (ot) return; tt[o](i), e[S]()
                        }
                    )
                }
            ), tt[D]("li").each(function () {
                    var t, n, r, i, s = e(this), o = s[D](j); if (o[d] > 0) {
                        et[V] && (et.cloneOnDetach && (t = o.clone(), t.attr("class", "")[W]().appendTo(o[y]())), o[V]().appendTo(rt)); for (n = et[A], r = 1, i = o; i[d] > 0; r++) i[C](F, n++), et[_] && i[a](et[_] + (n - 1 - et[A])), i = i[q]("> li > ul")
                    }
                }
            ), st.on("scroll", function () {
                    tt[o](i)
                }
            ).on("keypress", function (e) {
                    !ot && e.keyCode == 27 && (e[p](), tt[o](i))
                }
            ), it.on(n, function () {
                    ot || tt[o](i)
                }
            )
        }
    }
)(jQuery);

/*******
 * jquery.scrollgress vx.x | (c) n33 | n33.co @n33co | MIT License
 ******/
(function ()
    {
        var e = "scrollwatchResume", t = "length", n = "removeData", r = "data", i = "scrollwatch-state", s = "scrollwatch-suspended", o = "scrollgress-suspended", u = "setTimeout", a = "trigger", f = "scroll", l = "scrollwatchSuspend", c = !0, h = "scrollwatch", p = null, d = "top", v = "rangeMin", m = "rangeMax", g = "scrollgress", y = !1, b = "anchor", w = "unscrollwatch", E = "unscrollgress", S = "element", x = "-id", T = "scroll.", N = "height", C = "scrollTop", k = "center", L = "bottom", A = $(window), O = $(document), M = 1e3; jQuery.fn[e] = function () {
            var l, c; if (this[t] == 0) return $(this); if (this[t] > 1) {
                for (l = 0; l< this[t]; l++) $(this[l])[e](); return this
            }
            return c = $(this), c[r](i, - 1)[n](s)[n](o), window[u](function ()
                {
                    A[a](f)
                }
                , 50), c
        }
        , jQuery.fn[l] = function () {
            var e, n; if (this[t] == 0) return $(this); if (this[t] > 1) {
                for (e = 0; e< this[t]; e++) $(this[e])[l](); return this
            }
            return n = $(this), n[r](s, c), window[u](function ()
                {
                    A[a](f)
                }
                , 50), n
        }
        , jQuery.fn[h] = function (e) {
            var n, a, f, l, w; if (this[t] == 0) return $(this); if (this[t] > 1) {
                for (n = 0; n< this[t]; n++) $(this[n])[h](e); return this
            }
            return a = jQuery.extend(
                {
                range: .5, rangeMin: p, rangeMax: p, anchor: d, init: p, on: p, off: p, delay: 0
                }
                , e), a[v] === p && (a[v] = - 1 * a.range), a[m] === p && (a[m] = a.range), f = $(this), a.init && (w = a.init), f[r](s, y)[r](i, - 1)[g](function (e) {
                    if (f[r](s) === c) {
                        a.on && a.on(f), f[r](o, c); return
                    }
                    window.clearTimeout(l), l = window[u](function ()
                        {
                            var t, n, s = parseInt(f[r](i)); if (s == 0 || s == - 1) {
                                t = a[v] === y || e >= a[v], n = a[m] === y || e <= a[m]; if (t && n) {
                                    f[r](i, 1), a.on && a.on(f), w && (w(f, c), w = p); return
                                }
                            }
                            if (s == 1 || s == - 1) {
                                t = a[v] !== y && e< a[v], n = a[m] !== y && e> a[m]; if (t || n) {
                                    f[r](i, 0), a.off && a.off(f), w && (w(f, y), w = p); return
                                }
                            }
                        }
                        , w? 0: a.delay)
                }
                , {
                anchor: a[b]
                }
                , h), f
        }
        , jQuery.fn[w] = function () {
            var e, r; if (this[t] == 0) return $(this); if (this[t] > 1) {
                for (e = 0; e< this[t]; e++) $(this[e])[w](); return this
            }
            return r = $(this), r[n](i)[E](h), r
        }
        , jQuery.fn[g] = function (e, n, i) {
            var s, u, l, h, p; if (this[t] == 0) return $(this); if (this[t] > 1) {
                for (s = 0; s< this[t]; s++) $(this[s])[g](e, n, i); return $(this)
            }
            return i || (i = g), u = jQuery.extend(
                {
                anchor: d, direction: "both", scope: S, easing: 0
                }
                , n), l = $(this), l[r](i + x) || l[r](i + x, M++), h = l[r](i + x), p = T + i + "-" + h, A.off(p).on(p, function () {
                    var t, n, i, s; if (l[r](o) === c) return; t = l.offset()[d], n = l.outerHeight(), i = O[N](); switch (u.scope) {
                        default: case S: switch (u[b]) {
                                default: case d: s = (t - A[C]()) / n * - 1; break; case k: s = (t - A[C]() - (A[N]() - n) / 2) / n * - 1; break; case L: s = (t - A[C]() - (A[N]() - n)) / n * - 1
                            }
                        break; case "window": switch (u[b]) {
                                default: case d: s = (t - A[C]()) / A[N]() * - 1; break; case k: s = (t - A[C]() - (A[N]() - n) / 2) / A[N]() * - 1; break; case L: s = (t - A[C]() - (A[N]() - n)) / A[N]() * - 1
                            }
                    }
                    u.direction == "forwards"? s = Math.max(0, s): u.direction == "backwards" && (s = Math.min(0, s)), s> 0? s = Math.max(0, s - u.easing / 100): s< 0 && (s = Math.min(0, s + u.easing / 100)), e(s, l)
                }
            )[a](f), l
        }
        , jQuery.fn[E] = function (e) {
            var i, s, o, u; if (this[t] == 0) return $(this); if (this[t] > 1) {
                for (i = 0; i< this[t]; i++) $(this[i])[E](e); return $(this)
            }
            return e || (e = g), s = $(this), s[r](e + x)? (o = s[r](e + x), u = T + e + "-" + o, A.off(u), s[n](e + x), s): s
        }
    }
)();

/*******
 * jquery.scrolly v1.0.0-dev | (c) n33 | n33.co @n33co | MIT License
 ******/
(function (e)
    {
        function u(s, o) {
            var u, a, f; if ((u = e(s))[t] == 0) return n; a = u[i]()[r]; switch (o.anchor) {
                case "middle": f = a - (e(window).height() - u.outerHeight()) / 2; break; default: case r: f = Math.max(a, 0)
            }
            return typeof o[i] == "function"? f -= o[i](): f -= o[i], f
        }
        var t = "length", n = null, r = "top", i = "offset", s = "click.scrolly", o = e(window); e.fn.scrolly = function (i) {
            var o, a, f, l, c = e(this); if (this[t] == 0) return c; if (this[t] > 1) {
                for (o = 0; o< this[t]; o++) e(this[o]).scrolly(i); return c
            }
            l = n, f = c.attr("href"); if (f.charAt(0) != "#" || f[t] < 2) return c; a = jQuery.extend(
                {
                anchor: r, easing: "swing", offset: 0, parent: e("body,html"), pollOnce: !1, speed: 1e3
                }
                , i), a.pollOnce && (l = u(f, a)), c.off(s).on(s, function (e) {
                    var t = l !== n? l: u(f, a); t !== n && (e.preventDefault(), a.parent.stop().animate
                        (
                            {
                            scrollTop: t
                            }
                            , a.speed, a.easing)
                    )
                }
            )
        }
    }
)(jQuery);

/*******
 * SlidePush Menus
 ******/
(function (window)
    {

        'use strict';

        function extend(a, b) {
            for (var key in b) {
                if (b.hasOwnProperty(key)) {
                    a[key] = b[key];
                }
            }
            return a;
        }

        function each(collection, callback) {
            for (var i = 0; i < collection.length; i++) {
                var item = collection[i];
                callback(item);
            }
        }

        function Menu(options) {
            this.options = extend(
                {
                }
                , this.options);
            extend(this.options, options);
            this._init();
        }

        Menu.prototype.options = {
        wrapper: '#o-wrapper',
        type: 'slide-left',
        menuOpenerClass: '.c-button',
        maskId: '#c-mask'
        };


        Menu.prototype._init = function () {
            this.body = document.body;
            this.wrapper = document.querySelector(this.options.wrapper);
            this.mask = document.querySelector(this.options.maskId);
            this.menu = document.querySelector('#c-menu--' + this.options.type);
            this.closeBtn = this.menu.querySelector('.c-menu__close');
            this.menuOpeners = document.querySelectorAll(this.options.menuOpenerClass);
            this._initEvents();
        };


        Menu.prototype._initEvents = function () {
            this.closeBtn.addEventListener('click', function (e)
                {
                    e.preventDefault();
                    this.close();
                }
                .bind(this));

            this.mask.addEventListener('click', function (e)
                {
                    e.preventDefault();
                    this.close();
                }
                .bind(this));
        };


        Menu.prototype.open = function () {
            this.body.classList.add('has-active-menu');
            this.wrapper.classList.add('has-' + this.options.type);
            this.menu.classList.add('is-active');
            this.mask.classList.add('is-active');
            this.disableMenuOpeners();
        };


        Menu.prototype.close = function () {
            this.body.classList.remove('has-active-menu');
            this.wrapper.classList.remove('has-' + this.options.type);
            this.menu.classList.remove('is-active');
            this.mask.classList.remove('is-active');
            this.enableMenuOpeners();
        };


        Menu.prototype.disableMenuOpeners = function () {
            each(this.menuOpeners, function (item)
                {
                    item.disabled = true;
                }
            );
        };


        Menu.prototype.enableMenuOpeners = function () {
            each(this.menuOpeners, function (item)
                {
                    item.disabled = false;
                }
            );
        };


        window.Menu = Menu;

    }
)(window);

/*******
 * jquery.simpleSlider | (c) Centers Tecnologies | tutorialcenters.tk @na2axl | MIT License
 ******/
(function($){

    $.fn.simpleSlider = function(options) {

        var defaults = {
            width:       1500,
            height:      500,
            animSpeed:   500,
            animType:    'fade',
            timeOut:     10000,
            useCaptions: true,
            responsive:  true
        };

        var params = $.extend(defaults, options);

        var $wrapper   = this,
            $slider    = $wrapper.find('ul'),
            $slides    = $slider.children('li'),
            slideCount = $slides.length;
        var currIndex,
            nextIndex;
        var responsiveW,
            responsiveR,
            responsiveH;

        if (params.timeOut < 1000) {
            params.timeOut = 1000;
        }

        return $wrapper.each(function() {

            var start = function() {

                $slides.addClass('simpleSlider-slide');

                if (params.responsive) {
                    set_responsive();
                }
                else {
                    set_static();
                }

                if (params.useCaptions) {
                    create_captions();
                }

                if (params.animType == 'fade') {
                    prepare_fade_anim();
                }
                else if (params.animType == 'push-left' ||
                         params.animType == 'push-right' ||
                         params.animType == 'push-down' ||
                         params.animType == 'push-up') {

                    prepare_push_anim();
                }
                else if (params.animType == 'slide-left' ||
                         params.animType == 'slide-right' ||
                         params.animType == 'slide-down' ||
                         params.animType == 'slide-up') {

                    prepare_slide_anim();
                }
                else if (params.animType == 'zoom-in' ||
                         params.animType == 'zoom-out') {

                    prepare_zoom_anim();
                }
                else {
                    prepare_none_anim();
                }

                create_links();

                setInterval(function() {
                    show_next();
                }, params.timeOut);
            };

            var reset_dimensions = function(width, height) {
                $slides.css({
                    'height'        : height,
                    'width'         : width
                });
                $slides.find('img').css({
                    'height'        : height,
                    'width'         : width
                });
                $slider.css({
                    'height'        : height,
                    'width'         : width
                });
                $wrapper.css({
                    'height'        : height,
                    'max-width'     : width,
                    'position'      : 'relative'
                });
            };

            var set_responsive = function() {
                responsiveW = $wrapper.outerWidth(),
                responsiveR = responsiveW / params.width,
                responsiveH = responsiveR * params.height;
                reset_dimensions('100%', responsiveH);
                if(responsiveW < params.width){
                    reset_dimensions(responsiveW, responsiveH);
                }
                $(window).resize(function(){
                    responsiveW = $wrapper.outerWidth(),
                    responsiveR = responsiveW / params.width,
                    responsiveH = responsiveR * params.height;
                    reset_dimensions('100%', responsiveH);
                    if (params.animType == 'push-left') {
                        reset_dimensions(responsiveW, responsiveH);
                        $canvas.css({
                            'width'     : responsiveW,
                            'height'    : responsiveH,
                            'overflow'  : 'hidden',
                            'position'  : 'relative'
                        });
                        $slider.css({
                            'width'     : responsiveW * slideCount ,
                            'height'    : responsiveH,
                            'left'      : 0
                        });
                    }
                    else if (params.animType == 'push-right') {
                        reset_dimensions(responsiveW, responsiveH);
                        $canvas.css({
                            'width'     : responsiveW,
                            'height'    : responsiveH,
                            'overflow'  : 'hidden',
                            'position'  : 'relative'
                        });
                        $slider.css({
                            'width'     : responsiveW * slideCount ,
                            'height'    : responsiveH,
                            'right'     : responsiveW * (slideCount-1)
                        });
                    }
                    else if (params.animType == 'push-up') {
                        reset_dimensions(responsiveW, responsiveH);
                        $canvas.css({
                            'width'     : responsiveW,
                            'height'    : responsiveH,
                            'overflow'  : 'hidden',
                            'position'  : 'relative'
                        });
                        $slider.css({
                            'width'     : responsiveW,
                            'height'    : responsiveH * slideCount,
                            'top'       : 0
                        });
                    }
                    else if (params.animType == 'push-down') {
                        reset_dimensions(responsiveW, responsiveH);
                        $canvas.css({
                            'width'     : responsiveW,
                            'height'    : responsiveH,
                            'overflow'  : 'hidden',
                            'position'  : 'relative'
                        });
                        $slider.css({
                            'width'     : responsiveW,
                            'height'    : responsiveH * slideCount ,
                            'bottom'    : responsiveH * (slideCount-1)
                        });
                    }
                });
            };

            var set_static = function() {
                reset_dimensions(params.width, params.height);
            };

            var create_links = function() {
                $slides.find('img').each(function() {
                    var $i = $(this);
                    var link = $i.attr('data-link');
                    if (link) {
                        $i.wrap('<a href="'+link+'"></a>');
                    }
                });
            };

            var create_captions = function() {
                $slides.find('img').each(function() {
                    var $i = $(this);
                    var caption = $i.attr('alt');
                    if (caption) {
                        $i.after('<p class="simpleSlider-caption">'+caption+'</p>');
                    }
                });
            };

            var init_go_next = function() {
                currIndex = 0;
                nextIndex = currIndex + 1;
            };

            var init_go_previous = function() {
                currIndex = slideCount - 1;
                nextIndex = currIndex - 1;
            };

            var prepare_fade_anim = function() {
                $slides.each(function(index) {
                    $s = $(this);
                    if (index > 0) {
                        $s.hide();
                    }
                });
                init_go_next();
            };

            var prepare_push_anim = function() {

                if (params.animType == 'push-left' || params.animType == 'push-up') {
                    init_go_next();
                }
                else if (params.animType == 'push-right' || params.animType == 'push-down') {
                    init_go_previous();
                }

                $canvas = $('<div class="simpleSlider-'+params.animType+'-wrapper"></div>');

                if(params.responsive && (responsiveW < params.width)){
                    if (params.animType == 'push-left') {
                        $canvas.css({
                            'width'     : responsiveW,
                            'height'    : responsiveH,
                            'overflow'  : 'hidden',
                            'position'  : 'relative'
                        });

                        $slider.css({
                            'width'     : responsiveW * slideCount ,
                            'height'    : responsiveH,
                            'left'      : 0
                        });
                    }
                    else if (params.animType == 'push-right') {
                        $canvas.css({
                            'width'     : responsiveW,
                            'height'    : responsiveH,
                            'overflow'  : 'hidden',
                            'position'  : 'relative'
                        });

                        $slider.css({
                            'width'     : responsiveW * slideCount ,
                            'height'    : responsiveH,
                            'right'     : responsiveW * (slideCount-1)
                        });
                    }
                    else if (params.animType == 'push-up') {
                        $canvas.css({
                            'width'     : responsiveW,
                            'height'    : responsiveH,
                            'overflow'  : 'hidden',
                            'position'  : 'relative'
                        });

                        $slider.css({
                            'width'     : responsiveW,
                            'height'    : responsiveH * slideCount,
                            'top'       : 0
                        });
                    }
                    else if (params.animType == 'push-down') {
                        $canvas.css({
                            'width'     : responsiveW,
                            'height'    : responsiveH,
                            'overflow'  : 'hidden',
                            'position'  : 'relative'
                        });

                        $slider.css({
                            'width'     : responsiveW,
                            'height'    : responsiveH * slideCount ,
                            'bottom'    : responsiveH * (slideCount-1)
                        });
                    }
                }
                else {

                    if (params.animType == 'push-left') {
                        $canvas.css({
                            'width'     : params.width,
                            'height'    : params.height,
                            'overflow'  : 'hidden',
                            'position'  : 'relative'
                        });

                        $slider.css({
                            'width'     : params.width * slideCount,
                            'height'    : params.height,
                            'left'      : 0
                        });
                    }

                    else if (params.animType == 'push-right') {
                        $canvas.css({
                            'width'     : params.width,
                            'height'    : params.height,
                            'overflow'  : 'hidden',
                            'position'  : 'relative'
                        });

                        $slider.css({
                            'width'     : params.width * slideCount,
                            'height'    : params.height,
                            'right'     : params.width * (slideCount-1)
                        });
                    }

                    else if (params.animType == 'push-up') {
                        $canvas.css({
                            'width'     : params.width,
                            'height'    : params.height,
                            'overflow'  : 'hidden',
                            'position'  : 'relative'
                        });

                        $slider.css({
                            'width'     : params.width,
                            'height'    : params.height * slideCount,
                            'top'       : 0
                        });
                    }

                    else if (params.animType == 'push-down') {
                        $canvas.css({
                            'width'     : params.width,
                            'height'    : params.height,
                            'overflow'  : 'hidden',
                            'position'  : 'relative'
                        });

                        $slider.css({
                            'width'     : params.width,
                            'height'    : params.height * slideCount,
                            'bottom'    : params.height * (slideCount-1)
                        });
                    }
                }

                if (params.animType == 'push-left' || params.animType == 'push-up') {
                    $slides.css({
                        'float'         : 'left',
                        'position'      : 'relative',
                        'display'       : 'list-item'
                    });
                }
                else if (params.animType == 'push-right' || params.animType == 'push-down') {
                    $slides.css({
                        'float'         : 'right',
                        'position'      : 'relative',
                        'display'       : 'list-item'
                    });
                }

                $canvas.prependTo($wrapper);
                $slider.appendTo($canvas);

            };

            var prepare_slide_anim = function() {

                if (params.animType == 'slide-left' || params.animType == 'slide-up') {
                    $slides.css({
                        'float'         : 'left',
                        'position'      : 'relative',
                        'display'       : 'list-item'
                    });
                }
                else if (params.animType == 'slide-right' || params.animType == 'slide-down') {
                    $slides.css({
                        'float'         : 'right',
                        'position'      : 'relative',
                        'display'       : 'list-item'
                    });
                }

                $slides.each(function(index) {
                    $s = $(this);
                    if (index > 0) {
                        $s.hide();
                    }
                });

                init_go_next();
            };

            var prepare_zoom_anim = function() {

                $slides.each(function(index) {
                    $s = $(this);
                    if (index > 0) {
                        $s.hide();
                    }
                });

                init_go_next();
            };

            var prepare_none_anim = function() {
                $slides.each(function(index) {
                    $s = $(this);
                    if (index > 0) {
                        $s.hide();
                    }
                });
                init_go_next();
            };

            var go_next = function() {
                if (nextIndex < slideCount-1) {
                    currIndex++;
                }
                else {
                    currIndex = -1;
                }
                nextIndex = currIndex + 1;
            };

            var go_previous = function() {
                if (nextIndex > 0) {
                    currIndex--;
                }
                else {
                    currIndex = slideCount;
                }
                nextIndex = currIndex - 1;
            };

            var show_next = function() {
                if (params.responsive  && ( responsiveW < params.width ) ) {
                    var slideW = responsiveW;
                    var slideH = responsiveH;
                }
                else {
                    var slideW = params.width;
                    var slideH = params.height;
                }
                if (params.animType == 'fade') {
                    $slides.eq(currIndex).fadeOut(params.animSpeed, function() {
                        $slides.eq(nextIndex).fadeIn(params.animSpeed, function() {
                            go_next();
                        });
                    });
                }
                else if (params.animType == 'push-left') {
                    $slider.animate({'left': -nextIndex * slideW }, params.animSpeed, function(){
                        go_next();
                    });
                }
                else if (params.animType == 'push-right') {
                    $slider.animate({'right': nextIndex * slideW }, params.animSpeed, function(){
                        go_previous();
                    });
                }
                else if (params.animType == 'push-up') {
                    $slider.animate({'top': -nextIndex * slideH }, params.animSpeed, function(){
                        go_next();
                    });
                }
                else if (params.animType == 'push-down') {
                    $slider.animate({'bottom': nextIndex * slideH }, params.animSpeed, function(){
                        go_previous();
                    });
                }
                else if (params.animType == 'slide-left') {
                    $slides.eq(currIndex).animate({'left': -slideW }, params.animSpeed, function(){
                        $slides.eq(currIndex).css('display', 'none');
                        $slides.eq(nextIndex).fadeIn(params.animSpeed);
                        $slides.eq(currIndex).animate({'left': 0 }, params.animSpeed);
                        go_next();
                    });
                }
                else if (params.animType == 'slide-right') {
                    $slides.eq(currIndex).animate({'right': -slideW }, params.animSpeed, function(){
                        $slides.eq(currIndex).css('display', 'none');
                        $slides.eq(nextIndex).fadeIn(params.animSpeed);
                        $slides.eq(currIndex).animate({'right': 0 }, params.animSpeed);
                        go_next();
                    });
                }
                else if (params.animType == 'slide-up') {
                    $slides.eq(currIndex).animate({'top': -slideH }, params.animSpeed, function(){
                        $slides.eq(currIndex).css('display', 'none');
                        $slides.eq(nextIndex).fadeIn(params.animSpeed);
                        $slides.eq(currIndex).animate({'top': 0 }, params.animSpeed);
                        go_next();
                    });
                }
                else if (params.animType == 'slide-down') {
                    $slides.eq(currIndex).animate({'bottom': -slideH }, params.animSpeed, function(){
                        $slides.eq(currIndex).css('display', 'none');
                        $slides.eq(nextIndex).fadeIn(params.animSpeed);
                        $slides.eq(currIndex).animate({'bottom': 0 }, params.animSpeed);
                        go_next();
                    });
                }
                else if (params.animType == 'zoom-in') {
                    $slides.eq(currIndex).children('a').find('img:first-child').animate({'height': 2 * slideH, 'width': 2 * slideW }, params.animSpeed);
                    $slides.eq(currIndex).fadeOut(params.animSpeed, function() {
                        $slides.eq(nextIndex).fadeIn(params.animSpeed, function() {
                            $slides.eq(currIndex).children('a').find('img:first-child').animate({'height': slideH, 'width': slideW }, params.animSpeed);
                            go_next();
                        });
                    });
                }
                else if (params.animType == 'zoom-out') {
                    $slides.eq(currIndex).children('a').find('img:first-child').animate({'height': 0, 'width': 0 }, params.animSpeed);
                    $slides.eq(currIndex).fadeOut(params.animSpeed, function() {
                        $slides.eq(nextIndex).fadeIn(params.animSpeed, function() {
                            $slides.eq(currIndex).children('a').find('img:first-child').animate({'height': slideH, 'width': slideW }, params.animSpeed);
                            go_next();
                        });
                    });
                }
                else {
                    $slides.eq(currIndex).css('display', 'none');
                    $slides.eq(nextIndex).css('display', 'block');
                    go_next();
                }
            };

            start();

        });

    }

})(jQuery);

/*******
 * G.R.I.D JS (Awesomes jQuery plugins) | (c) Centers Technologies | tutorialcenters.tk @na2axl | MIT Licensed
 ******/
(function ($)
    {
        $.grid = {

        init: function (options) {
                var defaults = {
                breakPoints: {
                    mobile: 480,
                    tablet: 1024
                    }
                    ,
                };


                var params = $.extend(defaults, options);

                grid.breakPoints = params.breakPoints;

                var $window = $(window),
                $document = $(document),
                $body = $('body');

                $body.addClass('is-loading');

                $window.on('load', function()
                    {
                        $body.removeClass('is-loading');
                    }
                );
            }
            ,

        menu: {
            dropdown: function (options) {

                    var defaults = {
                    menu: "nav.menu",
                    animatiton: 'fade',
                    speed: 500,
                    alignement: 'center',
                    };


                    var params = $.extend(defaults, options);

                    var $nav = $(params.menu),
                    $menu = $(params.menu + ' > ul'),
                    $items = $menu.children('li');

                    if ($menu.hasClass('alt-menu') == false) {
                        $($menu).dropotron(
                            {
                            mode: params.animation,
                            speed: params.speed,
                            noOpenerFade: true,
                            alignment: params.alignement
                            }
                        );
                    }

                }
                ,

            toggle: function (options) {

                    var defaults = {
                    menu: "nav.menu",
                    breakPoint: grid.breakPoints.mobile,
                    wrapper: "#page",
                    animation: "slide-left",
                    closeText: "Close",
                    menuOpenerClass: "toggle-menu-button",
                    };


                    var params = $.extend(defaults, options);

                    var $nav = $(params.menu),
                    $menu = $(params.menu + ' > ul'),
                    $submenu = $(params.menu + ' > ul > li > ul'),
                    $items = $menu.children('li');

                    var bodyWidth = $(document.body).outerWidth();

                    var menuIsCreated = false;

                    return $nav.each(function ()
                        {
                            var create_menu = function () {
                                if (menuIsCreated == false) {
                                    var $mask = $('<div id="c-mask"></div>'),
                                    $butt = $('<div id="c-button--' + params.animation + '" class="' + params.menuOpenerClass + '"><span class="icon fa-bars"></span></div>'),
                                    $pnav = $('<nav id="c-menu--' + params.animation + '" class="phone-menu ' + params.animation + '"></nav>'),
                                    $close = $('<li class="menu-item c-menu__close"><a href="javascript:;">' + params.closeText + '</a></li>'),
                                    $cmenu = $('<ul class="alt-menu"></ul>');

                                    $items.each(function ()
                                        {
                                            $i = $(this);
                                            $i.attr('class', 'menu-item level-0').clone().appendTo($cmenu).find('ul').remove();
                                            if ($menu.is('ul')) {
                                                var $a = $i.find('ul').children('li');
                                                $a.each(function ()
                                                    {
                                                        $(this).attr('class', 'menu-item level-1').clone().remove('ul').appendTo($cmenu).find('ul').remove();
                                                        if ($submenu.is('ul')) {
                                                            var $b = $(this).find('ul').children('li');
                                                            $b.each(function ()
                                                                {
                                                                    $(this).attr('class', 'menu-item level-2').clone().remove('ul').appendTo($cmenu).find('ul').remove();
                                                                }
                                                            );
                                                        }
                                                    }
                                                );
                                            }
                                        }
                                    );

                                    $cmenu.prepend($close);
                                    $pnav.prepend($cmenu);
                                    $(document.body).prepend($mask);
                                    $(document.body).prepend($pnav);
                                    $(document.body).prepend($butt);

                                    menuIsCreated = true;

                                    init_menu();

                                }
                            };


                            var remove_menu = function () {
                                if (menuIsCreated == true) {
                                    $('div.toggle-menu-button').remove();
                                    $('nav#c-menu--' + params.animation).remove();
                                    $('div#c-mask').remove();
                                    menuIsCreated = false;
                                }
                            };


                            var init_menu = function () {
                                var menu = new Menu(
                                    {
                                    wrapper: params.wrapper,
                                    type: params.animation,
                                    menuOpenerClass: '.toggle-menu-button',
                                    maskId: '#c-mask'
                                    }
                                );
                                var toggleBtn = document.querySelector('#c-button--' + params.animation);
                                toggleBtn.addEventListener('click', function (e)
                                    {
                                        e.preventDefault;
                                        menu.open();
                                    }
                                );
                            }

                            var toggleMenu = function (minWidth) {
                                if (minWidth <= params.breakPoint) {
                                    create_menu();

                                    $nav.css('display', 'none');
                                }
                                else {
                                    remove_menu();

                                    $nav.css('display', 'block');
                                }
                            };


                            $(window).resize(function ()
                                {
                                    bodyWidth = $(document.body).outerWidth();
                                    toggleMenu(bodyWidth);
                                }
                            );

                            toggleMenu(bodyWidth);

                        }
                    );
                }
                ,
            }
            ,

        carousel: function (options) {

                var defaults = {
                carousel: ".carousel",
                speed: 4,
                fadeIn: true,
                fadeDelay: 250
                };


                var params = $.extend(defaults, options);

                var $wrapper = $(params.carousel);
                var $window = $(window),
                $body = $(document.body);

                return $wrapper.each(function ()
                    {

                        var $t = $(this),
                        $forward = $('<span class="carousel forward"></span>'),
                        $backward = $('<span class="carousel backward"></span>'),
                        $reel = $t.children('.reel'),
                        $items = $reel.children('article');

                        var pos = 0,
                        leftLimit,
                        rightLimit,
                        itemWidth,
                        reelWidth,
                        timerId;

                        if (params.fadeIn) {

                            $items.addClass('loading');

                            $t.onVisible(function ()
                                {
                                    var timerId,
                                    limit = $items.length - Math.ceil($wrapper.outerWidth() / itemWidth);

                                    timerId = window.setInterval(function ()
                                        {
                                            var x = $items.filter('.loading'), xf = x.first();

                                            if (x.length <= limit) {

                                                window.clearInterval(timerId);
                                                $items.removeClass('loading');
                                                return;

                                            }

                                            xf.removeClass('loading');

                                        }
                                        , params.fadeDelay);
                                }
                                , 50);
                        }

                        $t._update = function () {
                            pos = 0;
                            rightLimit = (- 1 * reelWidth) + $wrapper.outerWidth();
                            leftLimit = 0;
                            $t._updatePos();
                        };


                        $t._updatePos = function () {
                            $reel.css('transform', 'translate(' + pos + 'px, 0)');
                        };


                        $t._onChange = function () {
                            bodyWidth = $body.outerWidth();
                            if (grid.checkIsMobile()) {
                                $reel
                                .css('overflow-y', 'hidden')
                                .css('overflow-x', 'scroll')
                                .scrollLeft(0);
                                $forward.hide();
                                $backward.hide();
                            }
                            else {
                                $reel
                                .css('overflow', 'visible')
                                .scrollLeft(0);
                                $forward.show();
                                $backward.show();
                            }
                        }

                        $forward
                        .appendTo($t)
                        .hide()
                        .mouseenter(function (e)
                            {
                                timerId = window.setInterval(function ()
                                    {
                                        pos -= params.speed;

                                        if (pos <= rightLimit) {
                                            window.clearInterval(timerId);
                                            pos = rightLimit;
                                        }

                                        $t._updatePos();
                                    }
                                    , 10);
                            }
                        )
                        .mouseleave(function (e)
                            {
                                window.clearInterval(timerId);
                            }
                        );

                        $backward
                        .appendTo($t)
                        .hide()
                        .mouseenter(function (e)
                            {
                                timerId = window.setInterval(function ()
                                    {
                                        pos += params.speed;

                                        if (pos >= leftLimit) {

                                            window.clearInterval(timerId);
                                            pos = leftLimit;

                                        }

                                        $t._updatePos();
                                    }
                                    , 10);
                            }
                        )
                        .mouseleave(function (e)
                            {
                                window.clearInterval(timerId);
                            }
                        );

                        $window.load(function ()
                            {

                                reelWidth = $reel[0].scrollWidth;

                                $t._onChange();
                                $t._update();

                                $window.resize(function ()
                                    {
                                        reelWidth = $reel[0].scrollWidth;
                                        $t._onChange();
                                        $t._update();
                                    }
                                ).trigger('resize');

                            }
                        );

                    }
                );
            }
            ,

        scroll: function (options) {
                var defaults = {
                element: "",
                delay: 0,
                range: 1,
                anchor: 'top',
                onEnter: null,
                onExit: null
                };


                var params = $.extend(defaults, options);

                var $wrapper = $(params.element);

                return $wrapper.each(function ()
                    {
                        $w = $(this);
                        $w.scrollwatch(
                            {
                            delay: params.delay,
                            range: params.range,
                            anchor: params.anchor,
                            on: params.onEnter,
                            off: params.onExit
                            }
                        );
                    }
                );
            }
            ,

        progress: function (options) {
                var defaults = {
                bar: ".progress",
                delay: 500,
                width: null,
                color: null,
                onEmpty: null,
                onFull: null,
                onFinish: null
                };


                var params = $.extend(defaults, options);

                if (params.delay < 500) {
                    params.delay = 500;
                }

                var $bar = $(params.bar);

                var called = false,
                finish = false;

                return $bar.each(function()
                    {
                        var $b = $(this);

                        var callback = function () {
                            var f = $b.parent('.progressbar').width();
                            var b = $b.width();

                            if (params.onEmpty) {
                                if (b == 0) {
                                    params.onEmpty()
                                }
                            }

                            if (params.onFull) {
                                if (f == b) {
                                    params.onFull()
                                }
                            }

                            if (params.onFinish) {
                                if (finish == true) {
                                    params.onFinish();
                                }
                            }

                            called = true;

                        };


                        if (params.color && params.width) {
                            $b
                            .css(
                                {
                                "background-color": params.color,
                                width: params.width
                                }
                            );
                            finish = true;
                        }
                        else if (params.color) {
                            $b
                            .css(
                                {
                                "background-color": params.color,
                                }
                            );
                            finish = true;
                        }
                        else if (params.width) {
                            $b
                            .css(
                                {
                                width: params.width
                                }
                            );
                            finish = true;
                        }

                        var i = setInterval(
                            function () {
                                if (called == false && finish == true) {
                                    callback();
                                }
                                else {
                                    clearInterval(i);
                                }
                            }
                            , params.delay);
                    }
                );
            }
            ,

        slider: function (options) {
                var defaults = {
                wrapper: "#slider-wrapper",
                width: 1500,
                height: 500,
                animSpeed: 500,
                animType: 'fade',
                timeOut: 5000,
                useCaptions: true,
                responsive: true
                };


                var params = $.extend(defaults, options);

                $(params.wrapper).simpleSlider(params);
            }
            ,

        panel: function (options) {
                var defaults = {
                wrapper: ".panels",
                speed: 500,
                };


                var params = $.extend(defaults, options);

                var $wrapper = $(params.wrapper),
                $parent = $wrapper.parent('.panel-wrapper'),
                $panels = $wrapper.find('.panel'),
                $buttons = $parent.find('.panel-switcher');

                var currpanel = '#' + $panels.eq(0).attr('id'),
                prevpanel = null;

                $panels.each(function (index)
                    {
                        if (index > 0) {
                            $(this).hide();
                        }
                    }
                );

                var update_panels = function () {

                    $buttons.removeClass('active');
                    $buttons.filter('[href="' + currpanel + '"]').addClass('active');

                    $(prevpanel).fadeOut(params.speed, function()
                        {
                            $wrapper.animate(
                                {
                                height: $(currpanel).outerHeight()
                                }
                                , params.speed, 'swing', function () {
                                    $(currpanel).fadeIn(params.speed);
                                }
                            );
                        }
                    );

                };


                $buttons.each(function ()
                    {
                        var $a = $(this);
                        $a.click(function (e)
                            {
                                e.preventDefault();
                                e.stopPropagation();
                                if ($a.hasClass('disable-switch')) {
                                    return false;
                                }
                                else {
                                    if (currpanel != $a.attr('href')) {
                                        prevpanel = currpanel;
                                        currpanel = $a.attr('href');
                                        update_panels();
                                    }
                                }
                            }
                        );
                    }
                );

                return $wrapper;
            }
            ,

        alert: function (options) {
                var defaults = {
                container: "#alert-wrapper",
                type: "info",
                text: "",
                speed: 500,
                anim: "fade",
                intensity: "20px",
                cleanBefore: true,
                position: "before",
                withClose: false,
                hideAfter: false,
                timeOut: 5000,
                onOpen: null,
                onHide: null
                };


                var params = $.extend(defaults, options);

                var $wrapper = $(params.container),
                $text = $('<span class="text"></span>').text(params.text),
                $alert = $('<div class="alert"></div>').addClass(params.type).append($text),
                $close = null,
                $loader = null;

                if (params.withClose) {
                    $close = $('<span class="close"></span>').prependTo($alert);
                    $close.click(function ()
                        {
                            $wrapper.fadeOut(500);
                        }
                    );
                }

                if (params.type == "loading") {
                    $loader = $('<span class="loader"></span>').prependTo($alert);
                }

                var hide_alert;

                if (params.anim == "fade") {
                    $wrapper.fadeOut('fast', function ()
                        {

                            if (params.cleanBefore == true) {
                                $wrapper.empty();
                            }

                            if (params.position == "before") {
                                $wrapper.prepend($alert);
                            }
                            else if (params.position == "after") {
                                $wrapper.append($alert);
                            }

                            if (params.onOpen) {
                                $wrapper.fadeIn(params.speed, function()
                                    {
                                        params.onOpen()
                                    }
                                );
                            }
                            else {
                                $wrapper.fadeIn(params.speed);
                            }

                            if (params.hideAfter == true) {
                                clearTimeout(hide_alert);
                                hide_alert = setTimeout(function ()
                                    {
                                        $wrapper.fadeOut(params.speed)
                                    }
                                    , params.timeOut);
                            }

                        }
                    );
                }
                else if (params.anim == "shake-horizontal") {
                    $wrapper.fadeOut('fast', function ()
                        {

                            if (params.cleanBefore == true) {
                                $wrapper.empty();
                            }

                            if (params.position == "before") {
                                $wrapper.prepend($alert);
                            }
                            else if (params.position == "after") {
                                $wrapper.append($alert);
                            }

                            $wrapper.fadeIn('fast', function()
                                {
                                    $.grid.shakeIt(
                                        {
                                        element: params.container,
                                        speed: params.speed,
                                        animation: "horizontal",
                                        intensity: params.intensity,
                                        onFinish: params.onOpen,
                                        stopBefore: true
                                        }
                                    );
                                }
                            );

                            if (params.hideAfter == true) {
                                clearTimeout(hide_alert);
                                hide_alert = setTimeout(function ()
                                    {
                                        $wrapper.fadeOut(500)
                                    }
                                    , params.timeOut);
                            }

                        }
                    );
                }
                else if (params.anim == "shake-vertical") {
                    $wrapper.fadeOut('fast', function ()
                        {

                            if (params.cleanBefore == true) {
                                $wrapper.empty();
                            }

                            if (params.position == "before") {
                                $wrapper.prepend($alert);
                            }
                            else if (params.position == "after") {
                                $wrapper.append($alert);
                            }

                            $wrapper.fadeIn('fast', function()
                                {
                                    $.grid.shakeIt(
                                        {
                                        element: params.container,
                                        speed: params.speed,
                                        animation: "vertical",
                                        intensity: params.intensity,
                                        onFinish: params.onOpen,
                                        stopBefore: true
                                        }
                                    );
                                }
                            );

                            if (params.hideAfter == true) {
                                clearTimeout(hide_alert);
                                hide_alert = setTimeout(function ()
                                    {
                                        $wrapper.fadeOut(500)
                                    }
                                    , params.timeOut);
                            }

                        }
                    );
                }

                return $wrapper;
            }
            ,

        shakeIt: function (options) {
                var defaults = {
                element: "",
                animation: "horizontal",
                speed: 50,
                intensity: "20px",
                onFinish: null,
                stopBefore: true
                };


                var params = $.extend(defaults, options);

                var $wrapper = $(params.element);

                return $wrapper.each(function()
                    {
                        var $w = $(this);

                        if (params.stopBefore) {
                            $w
                            .stop()
                            .css(
                                {
                                top: 0,
                                left: 0
                                }
                            );
                        }

                        if (params.animation == "horizontal") {
                            if (params.onFinish) {
                                $w.animate(
                                    {
                                    left: "-" + params.intensity
                                    }
                                    , params.speed, function () {
                                        $w.animate(
                                            {
                                            left: params.intensity
                                            }
                                            , params.speed, function () {
                                                $w.animate(
                                                    {
                                                    left: "-" + params.intensity
                                                    }
                                                    , params.speed, function () {
                                                        $w.animate(
                                                            {
                                                            left: params.intensity
                                                            }
                                                            , params.speed, function () {
                                                                $w.animate(
                                                                    {
                                                                    left: 0
                                                                    }
                                                                    , params.speed, function() {
                                                                        params.onFinish()
                                                                    }
                                                                );
                                                            }
                                                        );
                                                    }
                                                );
                                            }
                                        );
                                    }
                                );
                            }
                            else {
                                $w.animate(
                                    {
                                    left: "-" + params.intensity
                                    }
                                    , params.speed, function () {
                                        $w.animate(
                                            {
                                            left: params.intensity
                                            }
                                            , params.speed, function () {
                                                $w.animate(
                                                    {
                                                    left: "-" + params.intensity
                                                    }
                                                    , params.speed, function () {
                                                        $w.animate(
                                                            {
                                                            left: params.intensity
                                                            }
                                                            , params.speed, function () {
                                                                $w.animate(
                                                                    {
                                                                    left: 0
                                                                    }
                                                                    , params.speed);
                                                            }
                                                        );
                                                    }
                                                );
                                            }
                                        );
                                    }
                                );
                            }
                        }
                        else if (params.animation == "vertical") {
                            if (params.onFinish) {
                                $w.animate(
                                    {
                                    top: "-" + params.intensity
                                    }
                                    , params.speed, function () {
                                        $w.animate(
                                            {
                                            top: params.intensity
                                            }
                                            , params.speed, function () {
                                                $w.animate(
                                                    {
                                                    top: "-" + params.intensity
                                                    }
                                                    , params.speed, function () {
                                                        $w.animate(
                                                            {
                                                            top: params.intensity
                                                            }
                                                            , params.speed, function () {
                                                                $w.animate(
                                                                    {
                                                                    top: 0
                                                                    }
                                                                    , params.speed, function() {
                                                                        params.onFinish()
                                                                    }
                                                                );
                                                            }
                                                        );
                                                    }
                                                );
                                            }
                                        );
                                    }
                                );
                            }
                            else {
                                $w.animate(
                                    {
                                    top: "-" + params.intensity
                                    }
                                    , params.speed, function () {
                                        $w.animate(
                                            {
                                            top: params.intensity
                                            }
                                            , params.speed, function () {
                                                $w.animate(
                                                    {
                                                    top: "-" + params.intensity
                                                    }
                                                    , params.speed, function () {
                                                        $w.animate(
                                                            {
                                                            top: params.intensity
                                                            }
                                                            , params.speed, function () {
                                                                $w.animate(
                                                                    {
                                                                    top: 0
                                                                    }
                                                                    , params.speed);
                                                            }
                                                        );
                                                    }
                                                );
                                            }
                                        );
                                    }
                                );
                            }
                        }
                    }
                );
            }
            ,

        scrollTo: function (options) {
                var defaults = {
                scroller: ".scrollTo",
                anchor: "top",
                easing: "swing",
                offset: 0,
                speed: 500
                };


                var params = $.extend(defaults, options);

                var $scroller = $(params.scroller);

                $scroller.scrolly(params);

            }
            ,
        };

    }
)(jQuery);