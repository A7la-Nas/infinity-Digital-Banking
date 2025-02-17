//Type your code here.
/* Chartist.js 0.11.0
 * Copyright © 2017 Gion Kunz
 * Free to use under either the WTFPL license or the MIT license.
 * https://raw.githubusercontent.com/gionkunz/chartist-js/master/LICENSE-WTFPL
 * https://raw.githubusercontent.com/gionkunz/chartist-js/master/LICENSE-MIT
 */
! function(a, b) {
    "function" == typeof define && define.amd ? define("Chartist", [], function() {
        return a.Chartist = b()
    }) : "object" == typeof module && module.exports ? module.exports = b() : a.Chartist = b()
}(this, function() {
    var a = {
        version: "0.11.0"
    };
    return function(a, b, c) {
            "use strict";
            c.namespaces = {
                svg: "http://www.w3.org/2000/svg",
                xmlns: "http://www.w3.org/2000/xmlns/",
                xhtml: "http://www.w3.org/1999/xhtml",
                xlink: "http://www.w3.org/1999/xlink",
                ct: "http://gionkunz.github.com/chartist-js/ct"
            }, c.noop = function(a) {
                return a
            }, c.alphaNumerate = function(a) {
                return String.fromCharCode(97 + a % 26)
            }, c.extend = function(a) {
                var b, d, e;
                for (a = a || {}, b = 1; b < arguments.length; b++) {
                    d = arguments[b];
                    for (var f in d) e = d[f], "object" != typeof e || null === e || e instanceof Array ? a[f] = e : a[f] = c.extend(a[f], e)
                }
                return a
            }, c.replaceAll = function(a, b, c) {
                return a.replace(new RegExp(b, "g"), c)
            }, c.ensureUnit = function(a, b) {
                return "number" == typeof a && (a += b), a
            }, c.quantity = function(a) {
                if ("string" == typeof a) {
                    var b = /^(\d+)\s*(.*)$/g.exec(a);
                    return {
                        value: +b[1],
                        unit: b[2] || void 0
                    }
                }
                return {
                    value: a
                }
            }, c.querySelector = function(a) {
                return a instanceof Node ? a : b.querySelector(a)
            }, c.times = function(a) {
                return Array.apply(null, new Array(a))
            }, c.sum = function(a, b) {
                return a + (b ? b : 0)
            }, c.mapMultiply = function(a) {
                return function(b) {
                    return b * a
                }
            }, c.mapAdd = function(a) {
                return function(b) {
                    return b + a
                }
            }, c.serialMap = function(a, b) {
                var d = [],
                    e = Math.max.apply(null, a.map(function(a) {
                        return a.length
                    }));
                return c.times(e).forEach(function(c, e) {
                    var f = a.map(function(a) {
                        return a[e]
                    });
                    d[e] = b.apply(null, f)
                }), d
            }, c.roundWithPrecision = function(a, b) {
                var d = Math.pow(10, b || c.precision);
                return Math.round(a * d) / d
            }, c.precision = 8, c.escapingMap = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"
            }, c.serialize = function(a) {
                return null === a || void 0 === a ? a : ("number" == typeof a ? a = "" + a : "object" == typeof a && (a = JSON.stringify({
                    data: a
                })), Object.keys(c.escapingMap).reduce(function(a, b) {
                    return c.replaceAll(a, b, c.escapingMap[b])
                }, a))
            }, c.deserialize = function(a) {
                if ("string" != typeof a) return a;
                a = Object.keys(c.escapingMap).reduce(function(a, b) {
                    return c.replaceAll(a, c.escapingMap[b], b)
                }, a);
                try {
                    a = JSON.parse(a), a = void 0 !== a.data ? a.data : a
                } catch (b) {}
                return a
            }, c.createSvg = function(a, b, d, e) {
                var f;
                return b = b || "100%", d = d || "100%", Array.prototype.slice.call(a.querySelectorAll("svg")).filter(function(a) {
                    return a.getAttributeNS(c.namespaces.xmlns, "ct")
                }).forEach(function(b) {
                    a.removeChild(b)
                }), f = new c.Svg("svg").attr({
                    width: b,
                    height: d
                }).addClass(e), f._node.style.width = b, f._node.style.height = d, a.appendChild(f._node), f
            }, c.normalizeData = function(a, b, d) {
                var e, f = {
                    raw: a,
                    normalized: {}
                };
                return f.normalized.series = c.getDataArray({
                    series: a.series || []
                }, b, d), e = f.normalized.series.every(function(a) {
                    return a instanceof Array
                }) ? Math.max.apply(null, f.normalized.series.map(function(a) {
                    return a.length
                })) : f.normalized.series.length, f.normalized.labels = (a.labels || []).slice(), Array.prototype.push.apply(f.normalized.labels, c.times(Math.max(0, e - f.normalized.labels.length)).map(function() {
                    return ""
                })), b && c.reverseData(f.normalized), f
            }, c.safeHasProperty = function(a, b) {
                return null !== a && "object" == typeof a && a.hasOwnProperty(b)
            }, c.isDataHoleValue = function(a) {
                return null === a || void 0 === a || "number" == typeof a && isNaN(a)
            }, c.reverseData = function(a) {
                a.labels.reverse(), a.series.reverse();
                for (var b = 0; b < a.series.length; b++) "object" == typeof a.series[b] && void 0 !== a.series[b].data ? a.series[b].data.reverse() : a.series[b] instanceof Array && a.series[b].reverse()
            }, c.getDataArray = function(a, b, d) {
                function e(a) {
                    if (c.safeHasProperty(a, "value")) return e(a.value);
                    if (c.safeHasProperty(a, "data")) return e(a.data);
                    if (a instanceof Array) return a.map(e);
                    if (!c.isDataHoleValue(a)) {
                        if (d) {
                            var b = {};
                            return "string" == typeof d ? b[d] = c.getNumberOrUndefined(a) : b.y = c.getNumberOrUndefined(a), b.x = a.hasOwnProperty("x") ? c.getNumberOrUndefined(a.x) : b.x, b.y = a.hasOwnProperty("y") ? c.getNumberOrUndefined(a.y) : b.y, b
                        }
                        return c.getNumberOrUndefined(a)
                    }
                }
                return a.series.map(e)
            }, c.normalizePadding = function(a, b) {
                return b = b || 0, "number" == typeof a ? {
                    top: a,
                    right: a,
                    bottom: a,
                    left: a
                } : {
                    top: "number" == typeof a.top ? a.top : b,
                    right: "number" == typeof a.right ? a.right : b,
                    bottom: "number" == typeof a.bottom ? a.bottom : b,
                    left: "number" == typeof a.left ? a.left : b
                }
            }, c.getMetaData = function(a, b) {
                var c = a.data ? a.data[b] : a[b];
                return c ? c.meta : void 0
            }, c.orderOfMagnitude = function(a) {
                return Math.floor(Math.log(Math.abs(a)) / Math.LN10)
            }, c.projectLength = function(a, b, c) {
                return b / c.range * a
            }, c.getAvailableHeight = function(a, b) {
                return Math.max((c.quantity(b.height).value || a.height()) - (b.chartPadding.top + b.chartPadding.bottom) - b.axisX.offset, 0)
            }, c.getHighLow = function(a, b, d) {
                function e(a) {
                    if (void 0 !== a)
                        if (a instanceof Array)
                            for (var b = 0; b < a.length; b++) e(a[b]);
                        else {
                            var c = d ? +a[d] : +a;
                            g && c > f.high && (f.high = c), h && c < f.low && (f.low = c)
                        }
                }
                b = c.extend({}, b, d ? b["axis" + d.toUpperCase()] : {});
                var f = {
                        high: void 0 === b.high ? -Number.MAX_VALUE : +b.high,
                        low: void 0 === b.low ? Number.MAX_VALUE : +b.low
                    },
                    g = void 0 === b.high,
                    h = void 0 === b.low;
                return (g || h) && e(a), (b.referenceValue || 0 === b.referenceValue) && (f.high = Math.max(b.referenceValue, f.high), f.low = Math.min(b.referenceValue, f.low)), f.high <= f.low && (0 === f.low ? f.high = 1 : f.low < 0 ? f.high = 0 : f.high > 0 ? f.low = 0 : (f.high = 1, f.low = 0)), f
            }, c.isNumeric = function(a) {
                return null !== a && isFinite(a)
            }, c.isFalseyButZero = function(a) {
                return !a && 0 !== a
            }, c.getNumberOrUndefined = function(a) {
                return c.isNumeric(a) ? +a : void 0
            }, c.isMultiValue = function(a) {
                return "object" == typeof a && ("x" in a || "y" in a)
            }, c.getMultiValue = function(a, b) {
                return c.isMultiValue(a) ? c.getNumberOrUndefined(a[b || "y"]) : c.getNumberOrUndefined(a)
            }, c.rho = function(a) {
                function b(a, c) {
                    return a % c === 0 ? c : b(c, a % c)
                }

                function c(a) {
                    return a * a + 1
                }
                if (1 === a) return a;
                var d, e = 2,
                    f = 2;
                if (a % 2 === 0) return 2;
                do e = c(e) % a, f = c(c(f)) % a, d = b(Math.abs(e - f), a); while (1 === d);
                return d
            }, c.getBounds = function(a, b, d, e) {
                function f(a, b) {
                    return a === (a += b) && (a *= 1 + (b > 0 ? o : -o)), a
                }
                var g, h, i, j = 0,
                    k = {
                        high: b.high,
                        low: b.low
                    };
                k.valueRange = k.high - k.low, k.oom = c.orderOfMagnitude(k.valueRange), k.step = Math.pow(10, k.oom), k.min = Math.floor(k.low / k.step) * k.step, k.max = Math.ceil(k.high / k.step) * k.step, k.range = k.max - k.min, k.numberOfSteps = Math.round(k.range / k.step);
                var l = c.projectLength(a, k.step, k),
                    m = l < d,
                    n = e ? c.rho(k.range) : 0;
                if (e && c.projectLength(a, 1, k) >= d) k.step = 1;
                else if (e && n < k.step && c.projectLength(a, n, k) >= d) k.step = n;
                else
                    for (;;) {
                        if (m && c.projectLength(a, k.step, k) <= d) k.step *= 2;
                        else {
                            if (m || !(c.projectLength(a, k.step / 2, k) >= d)) break;
                            if (k.step /= 2, e && k.step % 1 !== 0) {
                                k.step *= 2;
                                break
                            }
                        }
                        if (j++ > 1e3) throw new Error("Exceeded maximum number of iterations while optimizing scale step!")
                    }
                var o = 2.221e-16;
                for (k.step = Math.max(k.step, o), h = k.min, i = k.max; h + k.step <= k.low;) h = f(h, k.step);
                for (; i - k.step >= k.high;) i = f(i, -k.step);
                k.min = h, k.max = i, k.range = k.max - k.min;
                var p = [];
                for (g = k.min; g <= k.max; g = f(g, k.step)) {
                    var q = c.roundWithPrecision(g);
                    q !== p[p.length - 1] && p.push(q)
                }
                return k.values = p, k
            }, c.polarToCartesian = function(a, b, c, d) {
                var e = (d - 90) * Math.PI / 180;
                return {
                    x: a + c * Math.cos(e),
                    y: b + c * Math.sin(e)
                }
            }, c.createChartRect = function(a, b, d) {
                var e = !(!b.axisX && !b.axisY),
                    f = e ? b.axisY.offset : 0,
                    g = e ? b.axisX.offset : 0,
                    h = a.width() || c.quantity(b.width).value || 0,
                    i = a.height() || c.quantity(b.height).value || 0,
                    j = c.normalizePadding(b.chartPadding, d);
                h = Math.max(h, f + j.left + j.right), i = Math.max(i, g + j.top + j.bottom);
                var k = {
                    padding: j,
                    width: function() {
                        return this.x2 - this.x1
                    },
                    height: function() {
                        return this.y1 - this.y2
                    }
                };
                return e ? ("start" === b.axisX.position ? (k.y2 = j.top + g, k.y1 = Math.max(i - j.bottom, k.y2 + 1)) : (k.y2 = j.top, k.y1 = Math.max(i - j.bottom - g, k.y2 + 1)), "start" === b.axisY.position ? (k.x1 = j.left + f, k.x2 = Math.max(h - j.right, k.x1 + 1)) : (k.x1 = j.left, k.x2 = Math.max(h - j.right - f, k.x1 + 1))) : (k.x1 = j.left, k.x2 = Math.max(h - j.right, k.x1 + 1), k.y2 = j.top, k.y1 = Math.max(i - j.bottom, k.y2 + 1)), k
            }, c.createGrid = function(a, b, d, e, f, g, h, i) {
                var j = {};
                j[d.units.pos + "1"] = a, j[d.units.pos + "2"] = a, j[d.counterUnits.pos + "1"] = e, j[d.counterUnits.pos + "2"] = e + f;
                var k = g.elem("line", j, h.join(" "));
                i.emit("draw", c.extend({
                    type: "grid",
                    axis: d,
                    index: b,
                    group: g,
                    element: k
                }, j))
            }, c.createGridBackground = function(a, b, c, d) {
                var e = a.elem("rect", {
                    x: b.x1,
                    y: b.y2,
                    width: b.width(),
                    height: b.height()
                }, c, !0);
                d.emit("draw", {
                    type: "gridBackground",
                    group: a,
                    element: e
                })
            }, c.createLabel = function(a, d, e, f, g, h, i, j, k, l, m) {
                var n, o = {};
                if (o[g.units.pos] = a + i[g.units.pos], o[g.counterUnits.pos] = i[g.counterUnits.pos], o[g.units.len] = d, o[g.counterUnits.len] = Math.max(0, h - 10), l) {
                    var p = b.createElement("span");
                    p.className = k.join(" "), p.setAttribute("xmlns", c.namespaces.xhtml), p.innerText = f[e], p.style[g.units.len] = Math.round(o[g.units.len]) + "px", p.style[g.counterUnits.len] = Math.round(o[g.counterUnits.len]) + "px", n = j.foreignObject(p, c.extend({
                        style: "overflow: visible;"
                    }, o))
                } else n = j.elem("text", o, k.join(" ")).text(f[e]);
                m.emit("draw", c.extend({
                    type: "label",
                    axis: g,
                    index: e,
                    group: j,
                    element: n,
                    text: f[e]
                }, o))
            }, c.getSeriesOption = function(a, b, c) {
                if (a.name && b.series && b.series[a.name]) {
                    var d = b.series[a.name];
                    return d.hasOwnProperty(c) ? d[c] : b[c]
                }
                return b[c]
            }, c.optionsProvider = function(b, d, e) {
                function f(b) {
                    var f = h;
                    if (h = c.extend({}, j), d)
                        for (i = 0; i < d.length; i++) {
                            var g = a.matchMedia(d[i][0]);
                            g.matches && (h = c.extend(h, d[i][1]))
                        }
                    e && b && e.emit("optionsChanged", {
                        previousOptions: f,
                        currentOptions: h
                    })
                }

                function g() {
                    k.forEach(function(a) {
                        a.removeListener(f)
                    })
                }
                var h, i, j = c.extend({}, b),
                    k = [];
                if (!a.matchMedia) throw "window.matchMedia not found! Make sure you're using a polyfill.";
                if (d)
                    for (i = 0; i < d.length; i++) {
                        var l = a.matchMedia(d[i][0]);
                        l.addListener(f), k.push(l)
                    }
                return f(), {
                    removeMediaQueryListeners: g,
                    getCurrentOptions: function() {
                        return c.extend({}, h)
                    }
                }
            }, c.splitIntoSegments = function(a, b, d) {
                var e = {
                    increasingX: !1,
                    fillHoles: !1
                };
                d = c.extend({}, e, d);
                for (var f = [], g = !0, h = 0; h < a.length; h += 2) void 0 === c.getMultiValue(b[h / 2].value) ? d.fillHoles || (g = !0) : (d.increasingX && h >= 2 && a[h] <= a[h - 2] && (g = !0), g && (f.push({
                    pathCoordinates: [],
                    valueData: []
                }), g = !1), f[f.length - 1].pathCoordinates.push(a[h], a[h + 1]), f[f.length - 1].valueData.push(b[h / 2]));
                return f
            }
        }(window, document, a),
        function(a, b, c) {
            "use strict";
            c.Interpolation = {}, c.Interpolation.none = function(a) {
                var b = {
                    fillHoles: !1
                };
                return a = c.extend({}, b, a),
                    function(b, d) {
                        for (var e = new c.Svg.Path, f = !0, g = 0; g < b.length; g += 2) {
                            var h = b[g],
                                i = b[g + 1],
                                j = d[g / 2];
                            void 0 !== c.getMultiValue(j.value) ? (f ? e.move(h, i, !1, j) : e.line(h, i, !1, j), f = !1) : a.fillHoles || (f = !0)
                        }
                        return e
                    }
            }, c.Interpolation.simple = function(a) {
                var b = {
                    divisor: 2,
                    fillHoles: !1
                };
                a = c.extend({}, b, a);
                var d = 1 / Math.max(1, a.divisor);
                return function(b, e) {
                    for (var f, g, h, i = new c.Svg.Path, j = 0; j < b.length; j += 2) {
                        var k = b[j],
                            l = b[j + 1],
                            m = (k - f) * d,
                            n = e[j / 2];
                        void 0 !== n.value ? (void 0 === h ? i.move(k, l, !1, n) : i.curve(f + m, g, k - m, l, k, l, !1, n), f = k, g = l, h = n) : a.fillHoles || (f = k = h = void 0)
                    }
                    return i
                }
            }, c.Interpolation.cardinal = function(a) {
                var b = {
                    tension: 1,
                    fillHoles: !1
                };
                a = c.extend({}, b, a);
                var d = Math.min(1, Math.max(0, a.tension)),
                    e = 1 - d;
                return function f(b, g) {
                    var h = c.splitIntoSegments(b, g, {
                        fillHoles: a.fillHoles
                    });
                    if (h.length) {
                        if (h.length > 1) {
                            var i = [];
                            return h.forEach(function(a) {
                                i.push(f(a.pathCoordinates, a.valueData))
                            }), c.Svg.Path.join(i)
                        }
                        if (b = h[0].pathCoordinates, g = h[0].valueData, b.length <= 4) return c.Interpolation.none()(b, g);
                        for (var j, k = (new c.Svg.Path).move(b[0], b[1], !1, g[0]), l = 0, m = b.length; m - 2 * !j > l; l += 2) {
                            var n = [{
                                x: +b[l - 2],
                                y: +b[l - 1]
                            }, {
                                x: +b[l],
                                y: +b[l + 1]
                            }, {
                                x: +b[l + 2],
                                y: +b[l + 3]
                            }, {
                                x: +b[l + 4],
                                y: +b[l + 5]
                            }];
                            j ? l ? m - 4 === l ? n[3] = {
                                x: +b[0],
                                y: +b[1]
                            } : m - 2 === l && (n[2] = {
                                x: +b[0],
                                y: +b[1]
                            }, n[3] = {
                                x: +b[2],
                                y: +b[3]
                            }) : n[0] = {
                                x: +b[m - 2],
                                y: +b[m - 1]
                            } : m - 4 === l ? n[3] = n[2] : l || (n[0] = {
                                x: +b[l],
                                y: +b[l + 1]
                            }), k.curve(d * (-n[0].x + 6 * n[1].x + n[2].x) / 6 + e * n[2].x, d * (-n[0].y + 6 * n[1].y + n[2].y) / 6 + e * n[2].y, d * (n[1].x + 6 * n[2].x - n[3].x) / 6 + e * n[2].x, d * (n[1].y + 6 * n[2].y - n[3].y) / 6 + e * n[2].y, n[2].x, n[2].y, !1, g[(l + 2) / 2])
                        }
                        return k
                    }
                    return c.Interpolation.none()([])
                }
            }, c.Interpolation.monotoneCubic = function(a) {
                var b = {
                    fillHoles: !1
                };
                return a = c.extend({}, b, a),
                    function d(b, e) {
                        var f = c.splitIntoSegments(b, e, {
                            fillHoles: a.fillHoles,
                            increasingX: !0
                        });
                        if (f.length) {
                            if (f.length > 1) {
                                var g = [];
                                return f.forEach(function(a) {
                                    g.push(d(a.pathCoordinates, a.valueData))
                                }), c.Svg.Path.join(g)
                            }
                            if (b = f[0].pathCoordinates, e = f[0].valueData, b.length <= 4) return c.Interpolation.none()(b, e);
                            var h, i, j = [],
                                k = [],
                                l = b.length / 2,
                                m = [],
                                n = [],
                                o = [],
                                p = [];
                            for (h = 0; h < l; h++) j[h] = b[2 * h], k[h] = b[2 * h + 1];
                            for (h = 0; h < l - 1; h++) o[h] = k[h + 1] - k[h], p[h] = j[h + 1] - j[h], n[h] = o[h] / p[h];
                            for (m[0] = n[0], m[l - 1] = n[l - 2], h = 1; h < l - 1; h++) 0 === n[h] || 0 === n[h - 1] || n[h - 1] > 0 != n[h] > 0 ? m[h] = 0 : (m[h] = 3 * (p[h - 1] + p[h]) / ((2 * p[h] + p[h - 1]) / n[h - 1] + (p[h] + 2 * p[h - 1]) / n[h]), isFinite(m[h]) || (m[h] = 0));
                            for (i = (new c.Svg.Path).move(j[0], k[0], !1, e[0]), h = 0; h < l - 1; h++) i.curve(j[h] + p[h] / 3, k[h] + m[h] * p[h] / 3, j[h + 1] - p[h] / 3, k[h + 1] - m[h + 1] * p[h] / 3, j[h + 1], k[h + 1], !1, e[h + 1]);
                            return i
                        }
                        return c.Interpolation.none()([])
                    }
            }, c.Interpolation.step = function(a) {
                var b = {
                    postpone: !0,
                    fillHoles: !1
                };
                return a = c.extend({}, b, a),
                    function(b, d) {
                        for (var e, f, g, h = new c.Svg.Path, i = 0; i < b.length; i += 2) {
                            var j = b[i],
                                k = b[i + 1],
                                l = d[i / 2];
                            void 0 !== l.value ? (void 0 === g ? h.move(j, k, !1, l) : (a.postpone ? h.line(j, f, !1, g) : h.line(e, k, !1, l), h.line(j, k, !1, l)), e = j, f = k, g = l) : a.fillHoles || (e = f = g = void 0)
                        }
                        return h
                    }
            }
        }(window, document, a),
        function(a, b, c) {
            "use strict";
            c.EventEmitter = function() {
                function a(a, b) {
                    d[a] = d[a] || [], d[a].push(b)
                }

                function b(a, b) {
                    d[a] && (b ? (d[a].splice(d[a].indexOf(b), 1), 0 === d[a].length && delete d[a]) : delete d[a])
                }

                function c(a, b) {
                    d[a] && d[a].forEach(function(a) {
                        a(b)
                    }), d["*"] && d["*"].forEach(function(c) {
                        c(a, b)
                    })
                }
                var d = [];
                return {
                    addEventHandler: a,
                    removeEventHandler: b,
                    emit: c
                }
            }
        }(window, document, a),
        function(a, b, c) {
            "use strict";

            function d(a) {
                var b = [];
                if (a.length)
                    for (var c = 0; c < a.length; c++) b.push(a[c]);
                return b
            }

            function e(a, b) {
                var d = b || this.prototype || c.Class,
                    e = Object.create(d);
                c.Class.cloneDefinitions(e, a);
                var f = function() {
                    var a, b = e.constructor || function() {};
                    return a = this === c ? Object.create(e) : this, b.apply(a, Array.prototype.slice.call(arguments, 0)), a
                };
                return f.prototype = e, f["super"] = d, f.extend = this.extend, f
            }

            function f() {
                var a = d(arguments),
                    b = a[0];
                return a.splice(1, a.length - 1).forEach(function(a) {
                    Object.getOwnPropertyNames(a).forEach(function(c) {
                        delete b[c], Object.defineProperty(b, c, Object.getOwnPropertyDescriptor(a, c))
                    })
                }), b
            }
            c.Class = {
                extend: e,
                cloneDefinitions: f
            }
        }(window, document, a),
        function(a, b, c) {
            "use strict";

            function d(a, b, d) {
                return a && (this.data = a || {}, this.data.labels = this.data.labels || [], this.data.series = this.data.series || [], this.eventEmitter.emit("data", {
                    type: "update",
                    data: this.data
                })), b && (this.options = c.extend({}, d ? this.options : this.defaultOptions, b), this.initializeTimeoutId || (this.optionsProvider.removeMediaQueryListeners(), this.optionsProvider = c.optionsProvider(this.options, this.responsiveOptions, this.eventEmitter))), this.initializeTimeoutId || this.createChart(this.optionsProvider.getCurrentOptions()), this
            }

            function e() {
                return this.initializeTimeoutId ? a.clearTimeout(this.initializeTimeoutId) : (a.removeEventListener("resize", this.resizeListener), this.optionsProvider.removeMediaQueryListeners()), this
            }

            function f(a, b) {
                return this.eventEmitter.addEventHandler(a, b), this
            }

            function g(a, b) {
                return this.eventEmitter.removeEventHandler(a, b), this
            }

            function h() {
                a.addEventListener("resize", this.resizeListener), this.optionsProvider = c.optionsProvider(this.options, this.responsiveOptions, this.eventEmitter), this.eventEmitter.addEventHandler("optionsChanged", function() {
                    this.update()
                }.bind(this)), this.options.plugins && this.options.plugins.forEach(function(a) {
                    a instanceof Array ? a[0](this, a[1]) : a(this)
                }.bind(this)), this.eventEmitter.emit("data", {
                    type: "initial",
                    data: this.data
                }), this.createChart(this.optionsProvider.getCurrentOptions()), this.initializeTimeoutId = void 0
            }

            function i(a, b, d, e, f) {
                this.container = c.querySelector(a), this.data = b || {}, this.data.labels = this.data.labels || [], this.data.series = this.data.series || [], this.defaultOptions = d, this.options = e, this.responsiveOptions = f, this.eventEmitter = c.EventEmitter(), this.supportsForeignObject = c.Svg.isSupported("Extensibility"), this.supportsAnimations = c.Svg.isSupported("AnimationEventsAttribute"), this.resizeListener = function() {
                    this.update()
                }.bind(this), this.container && (this.container.__chartist__ && this.container.__chartist__.detach(), this.container.__chartist__ = this), this.initializeTimeoutId = setTimeout(h.bind(this), 0)
            }
            c.Base = c.Class.extend({
                constructor: i,
                optionsProvider: void 0,
                container: void 0,
                svg: void 0,
                eventEmitter: void 0,
                createChart: function() {
                    throw new Error("Base chart type can't be instantiated!")
                },
                update: d,
                detach: e,
                on: f,
                off: g,
                version: c.version,
                supportsForeignObject: !1
            })
        }(window, document, a),
        function(a, b, c) {
            "use strict";

            function d(a, d, e, f, g) {
                a instanceof Element ? this._node = a : (this._node = b.createElementNS(c.namespaces.svg, a), "svg" === a && this.attr({
                    "xmlns:ct": c.namespaces.ct
                })), d && this.attr(d), e && this.addClass(e), f && (g && f._node.firstChild ? f._node.insertBefore(this._node, f._node.firstChild) : f._node.appendChild(this._node))
            }

            function e(a, b) {
                return "string" == typeof a ? b ? this._node.getAttributeNS(b, a) : this._node.getAttribute(a) : (Object.keys(a).forEach(function(b) {
                    if (void 0 !== a[b])
                        if (b.indexOf(":") !== -1) {
                            var d = b.split(":");
                            this._node.setAttributeNS(c.namespaces[d[0]], b, a[b])
                        } else this._node.setAttribute(b, a[b])
                }.bind(this)), this)
            }

            function f(a, b, d, e) {
                return new c.Svg(a, b, d, this, e)
            }

            function g() {
                return this._node.parentNode instanceof SVGElement ? new c.Svg(this._node.parentNode) : null
            }

            function h() {
                for (var a = this._node;
                    "svg" !== a.nodeName;) a = a.parentNode;
                return new c.Svg(a)
            }

            function i(a) {
                var b = this._node.querySelector(a);
                return b ? new c.Svg(b) : null
            }

            function j(a) {
                var b = this._node.querySelectorAll(a);
                return b.length ? new c.Svg.List(b) : null
            }

            function k() {
                return this._node
            }

            function l(a, d, e, f) {
                if ("string" == typeof a) {
                    var g = b.createElement("div");
                    g.innerHTML = a, a = g.firstChild
                }
                a.setAttribute("xmlns", c.namespaces.xmlns);
                var h = this.elem("foreignObject", d, e, f);
                return h._node.appendChild(a), h
            }

            function m(a) {
                return this._node.appendChild(b.createTextNode(a)), this
            }

            function n() {
                for (; this._node.firstChild;) this._node.removeChild(this._node.firstChild);
                return this
            }

            function o() {
                return this._node.parentNode.removeChild(this._node), this.parent()
            }

            function p(a) {
                return this._node.parentNode.replaceChild(a._node, this._node), a
            }

            function q(a, b) {
                return b && this._node.firstChild ? this._node.insertBefore(a._node, this._node.firstChild) : this._node.appendChild(a._node), this
            }

            function r() {
                return this._node.getAttribute("class") ? this._node.getAttribute("class").trim().split(/\s+/) : []
            }

            function s(a) {
                return this._node.setAttribute("class", this.classes(this._node).concat(a.trim().split(/\s+/)).filter(function(a, b, c) {
                    return c.indexOf(a) === b
                }).join(" ")), this
            }

            function t(a) {
                var b = a.trim().split(/\s+/);
                return this._node.setAttribute("class", this.classes(this._node).filter(function(a) {
                    return b.indexOf(a) === -1
                }).join(" ")), this
            }

            function u() {
                return this._node.setAttribute("class", ""), this
            }

            function v() {
                return this._node.getBoundingClientRect().height
            }

            function w() {
                return this._node.getBoundingClientRect().width
            }

            function x(a, b, d) {
                return void 0 === b && (b = !0), Object.keys(a).forEach(function(e) {
                    function f(a, b) {
                        var f, g, h, i = {};
                        a.easing && (h = a.easing instanceof Array ? a.easing : c.Svg.Easing[a.easing], delete a.easing), a.begin = c.ensureUnit(a.begin, "ms"), a.dur = c.ensureUnit(a.dur, "ms"), h && (a.calcMode = "spline", a.keySplines = h.join(" "), a.keyTimes = "0;1"), b && (a.fill = "freeze", i[e] = a.from, this.attr(i), g = c.quantity(a.begin || 0).value, a.begin = "indefinite"), f = this.elem("animate", c.extend({
                            attributeName: e
                        }, a)), b && setTimeout(function() {
                            try {
                                f._node.beginElement()
                            } catch (b) {
                                i[e] = a.to, this.attr(i), f.remove()
                            }
                        }.bind(this), g), d && f._node.addEventListener("beginEvent", function() {
                            d.emit("animationBegin", {
                                element: this,
                                animate: f._node,
                                params: a
                            })
                        }.bind(this)), f._node.addEventListener("endEvent", function() {
                            d && d.emit("animationEnd", {
                                element: this,
                                animate: f._node,
                                params: a
                            }), b && (i[e] = a.to, this.attr(i), f.remove())
                        }.bind(this))
                    }
                    a[e] instanceof Array ? a[e].forEach(function(a) {
                        f.bind(this)(a, !1)
                    }.bind(this)) : f.bind(this)(a[e], b)
                }.bind(this)), this
            }

            function y(a) {
                var b = this;
                this.svgElements = [];
                for (var d = 0; d < a.length; d++) this.svgElements.push(new c.Svg(a[d]));
                Object.keys(c.Svg.prototype).filter(function(a) {
                    return ["constructor", "parent", "querySelector", "querySelectorAll", "replace", "append", "classes", "height", "width"].indexOf(a) === -1
                }).forEach(function(a) {
                    b[a] = function() {
                        var d = Array.prototype.slice.call(arguments, 0);
                        return b.svgElements.forEach(function(b) {
                            c.Svg.prototype[a].apply(b, d)
                        }), b
                    }
                })
            }
            c.Svg = c.Class.extend({
                constructor: d,
                attr: e,
                elem: f,
                parent: g,
                root: h,
                querySelector: i,
                querySelectorAll: j,
                getNode: k,
                foreignObject: l,
                text: m,
                empty: n,
                remove: o,
                replace: p,
                append: q,
                classes: r,
                addClass: s,
                removeClass: t,
                removeAllClasses: u,
                height: v,
                width: w,
                animate: x
            }), c.Svg.isSupported = function(a) {
                return b.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#" + a, "1.1")
            };
            var z = {
                easeInSine: [.47, 0, .745, .715],
                easeOutSine: [.39, .575, .565, 1],
                easeInOutSine: [.445, .05, .55, .95],
                easeInQuad: [.55, .085, .68, .53],
                easeOutQuad: [.25, .46, .45, .94],
                easeInOutQuad: [.455, .03, .515, .955],
                easeInCubic: [.55, .055, .675, .19],
                easeOutCubic: [.215, .61, .355, 1],
                easeInOutCubic: [.645, .045, .355, 1],
                easeInQuart: [.895, .03, .685, .22],
                easeOutQuart: [.165, .84, .44, 1],
                easeInOutQuart: [.77, 0, .175, 1],
                easeInQuint: [.755, .05, .855, .06],
                easeOutQuint: [.23, 1, .32, 1],
                easeInOutQuint: [.86, 0, .07, 1],
                easeInExpo: [.95, .05, .795, .035],
                easeOutExpo: [.19, 1, .22, 1],
                easeInOutExpo: [1, 0, 0, 1],
                easeInCirc: [.6, .04, .98, .335],
                easeOutCirc: [.075, .82, .165, 1],
                easeInOutCirc: [.785, .135, .15, .86],
                easeInBack: [.6, -.28, .735, .045],
                easeOutBack: [.175, .885, .32, 1.275],
                easeInOutBack: [.68, -.55, .265, 1.55]
            };
            c.Svg.Easing = z, c.Svg.List = c.Class.extend({
                constructor: y
            })
        }(window, document, a),
        function(a, b, c) {
            "use strict";

            function d(a, b, d, e, f, g) {
                var h = c.extend({
                    command: f ? a.toLowerCase() : a.toUpperCase()
                }, b, g ? {
                    data: g
                } : {});
                d.splice(e, 0, h)
            }

            function e(a, b) {
                a.forEach(function(c, d) {
                    u[c.command.toLowerCase()].forEach(function(e, f) {
                        b(c, e, d, f, a)
                    })
                })
            }

            function f(a, b) {
                this.pathElements = [], this.pos = 0, this.close = a, this.options = c.extend({}, v, b)
            }

            function g(a) {
                return void 0 !== a ? (this.pos = Math.max(0, Math.min(this.pathElements.length, a)), this) : this.pos
            }

            function h(a) {
                return this.pathElements.splice(this.pos, a), this
            }

            function i(a, b, c, e) {
                return d("M", {
                    x: +a,
                    y: +b
                }, this.pathElements, this.pos++, c, e), this
            }

            function j(a, b, c, e) {
                return d("L", {
                    x: +a,
                    y: +b
                }, this.pathElements, this.pos++, c, e), this
            }

            function k(a, b, c, e, f, g, h, i) {
                return d("C", {
                    x1: +a,
                    y1: +b,
                    x2: +c,
                    y2: +e,
                    x: +f,
                    y: +g
                }, this.pathElements, this.pos++, h, i), this
            }

            function l(a, b, c, e, f, g, h, i, j) {
                return d("A", {
                    rx: +a,
                    ry: +b,
                    xAr: +c,
                    lAf: +e,
                    sf: +f,
                    x: +g,
                    y: +h
                }, this.pathElements, this.pos++, i, j), this
            }

            function m(a) {
                var b = a.replace(/([A-Za-z])([0-9])/g, "$1 $2").replace(/([0-9])([A-Za-z])/g, "$1 $2").split(/[\s,]+/).reduce(function(a, b) {
                    return b.match(/[A-Za-z]/) && a.push([]), a[a.length - 1].push(b), a
                }, []);
                "Z" === b[b.length - 1][0].toUpperCase() && b.pop();
                var d = b.map(function(a) {
                        var b = a.shift(),
                            d = u[b.toLowerCase()];
                        return c.extend({
                            command: b
                        }, d.reduce(function(b, c, d) {
                            return b[c] = +a[d], b
                        }, {}))
                    }),
                    e = [this.pos, 0];
                return Array.prototype.push.apply(e, d), Array.prototype.splice.apply(this.pathElements, e), this.pos += d.length, this
            }

            function n() {
                var a = Math.pow(10, this.options.accuracy);
                return this.pathElements.reduce(function(b, c) {
                    var d = u[c.command.toLowerCase()].map(function(b) {
                        return this.options.accuracy ? Math.round(c[b] * a) / a : c[b]
                    }.bind(this));
                    return b + c.command + d.join(",")
                }.bind(this), "") + (this.close ? "Z" : "")
            }

            function o(a, b) {
                return e(this.pathElements, function(c, d) {
                    c[d] *= "x" === d[0] ? a : b
                }), this
            }

            function p(a, b) {
                return e(this.pathElements, function(c, d) {
                    c[d] += "x" === d[0] ? a : b
                }), this
            }

            function q(a) {
                return e(this.pathElements, function(b, c, d, e, f) {
                    var g = a(b, c, d, e, f);
                    (g || 0 === g) && (b[c] = g)
                }), this
            }

            function r(a) {
                var b = new c.Svg.Path(a || this.close);
                return b.pos = this.pos, b.pathElements = this.pathElements.slice().map(function(a) {
                    return c.extend({}, a)
                }), b.options = c.extend({}, this.options), b
            }

            function s(a) {
                var b = [new c.Svg.Path];
                return this.pathElements.forEach(function(d) {
                    d.command === a.toUpperCase() && 0 !== b[b.length - 1].pathElements.length && b.push(new c.Svg.Path), b[b.length - 1].pathElements.push(d)
                }), b
            }

            function t(a, b, d) {
                for (var e = new c.Svg.Path(b, d), f = 0; f < a.length; f++)
                    for (var g = a[f], h = 0; h < g.pathElements.length; h++) e.pathElements.push(g.pathElements[h]);
                return e
            }
            var u = {
                    m: ["x", "y"],
                    l: ["x", "y"],
                    c: ["x1", "y1", "x2", "y2", "x", "y"],
                    a: ["rx", "ry", "xAr", "lAf", "sf", "x", "y"]
                },
                v = {
                    accuracy: 3
                };
            c.Svg.Path = c.Class.extend({
                constructor: f,
                position: g,
                remove: h,
                move: i,
                line: j,
                curve: k,
                arc: l,
                scale: o,
                translate: p,
                transform: q,
                parse: m,
                stringify: n,
                clone: r,
                splitByCommand: s
            }), c.Svg.Path.elementDescriptions = u, c.Svg.Path.join = t
        }(window, document, a),
        function(a, b, c) {
            "use strict";

            function d(a, b, c, d) {
                this.units = a, this.counterUnits = a === f.x ? f.y : f.x, this.chartRect = b, this.axisLength = b[a.rectEnd] - b[a.rectStart], this.gridOffset = b[a.rectOffset], this.ticks = c, this.options = d
            }

            function e(a, b, d, e, f) {
                var g = e["axis" + this.units.pos.toUpperCase()],
                    h = this.ticks.map(this.projectValue.bind(this)),
                    i = this.ticks.map(g.labelInterpolationFnc);
                h.forEach(function(j, k) {
                    var l, m = {
                        x: 0,
                        y: 0
                    };
                    l = h[k + 1] ? h[k + 1] - j : Math.max(this.axisLength - j, 30), c.isFalseyButZero(i[k]) && "" !== i[k] || ("x" === this.units.pos ? (j = this.chartRect.x1 + j, m.x = e.axisX.labelOffset.x, "start" === e.axisX.position ? m.y = this.chartRect.padding.top + e.axisX.labelOffset.y + (d ? 5 : 20) : m.y = this.chartRect.y1 + e.axisX.labelOffset.y + (d ? 5 : 20)) : (j = this.chartRect.y1 - j, m.y = e.axisY.labelOffset.y - (d ? l : 0), "start" === e.axisY.position ? m.x = d ? this.chartRect.padding.left + e.axisY.labelOffset.x : this.chartRect.x1 - 10 : m.x = this.chartRect.x2 + e.axisY.labelOffset.x + 10), g.showGrid && c.createGrid(j, k, this, this.gridOffset, this.chartRect[this.counterUnits.len](), a, [e.classNames.grid, e.classNames[this.units.dir]], f), g.showLabel && c.createLabel(j, l, k, i, this, g.offset, m, b, [e.classNames.label, e.classNames[this.units.dir], "start" === g.position ? e.classNames[g.position] : e.classNames.end], d, f))
                }.bind(this))
            }
            var f = {
                x: {
                    pos: "x",
                    len: "width",
                    dir: "horizontal",
                    rectStart: "x1",
                    rectEnd: "x2",
                    rectOffset: "y2"
                },
                y: {
                    pos: "y",
                    len: "height",
                    dir: "vertical",
                    rectStart: "y2",
                    rectEnd: "y1",
                    rectOffset: "x1"
                }
            };
            c.Axis = c.Class.extend({
                constructor: d,
                createGridAndLabels: e,
                projectValue: function(a, b, c) {
                    throw new Error("Base axis can't be instantiated!")
                }
            }), c.Axis.units = f
        }(window, document, a),
        function(a, b, c) {
            "use strict";

            function d(a, b, d, e) {
                var f = e.highLow || c.getHighLow(b, e, a.pos);
                this.bounds = c.getBounds(d[a.rectEnd] - d[a.rectStart], f, e.scaleMinSpace || 20, e.onlyInteger), this.range = {
                    min: this.bounds.min,
                    max: this.bounds.max
                }, c.AutoScaleAxis["super"].constructor.call(this, a, d, this.bounds.values, e)
            }

            function e(a) {
                return this.axisLength * (+c.getMultiValue(a, this.units.pos) - this.bounds.min) / this.bounds.range
            }
            c.AutoScaleAxis = c.Axis.extend({
                constructor: d,
                projectValue: e
            })
        }(window, document, a),
        function(a, b, c) {
            "use strict";

            function d(a, b, d, e) {
                var f = e.highLow || c.getHighLow(b, e, a.pos);
                this.divisor = e.divisor || 1, this.ticks = e.ticks || c.times(this.divisor).map(function(a, b) {
                    return f.low + (f.high - f.low) / this.divisor * b
                }.bind(this)), this.ticks.sort(function(a, b) {
                    return a - b
                }), this.range = {
                    min: f.low,
                    max: f.high
                }, c.FixedScaleAxis["super"].constructor.call(this, a, d, this.ticks, e), this.stepLength = this.axisLength / this.divisor
            }

            function e(a) {
                return this.axisLength * (+c.getMultiValue(a, this.units.pos) - this.range.min) / (this.range.max - this.range.min)
            }
            c.FixedScaleAxis = c.Axis.extend({
                constructor: d,
                projectValue: e
            })
        }(window, document, a),
        function(a, b, c) {
            "use strict";

            function d(a, b, d, e) {
                c.StepAxis["super"].constructor.call(this, a, d, e.ticks, e);
                var f = Math.max(1, e.ticks.length - (e.stretch ? 1 : 0));
                this.stepLength = this.axisLength / f
            }

            function e(a, b) {
                return this.stepLength * b
            }
            c.StepAxis = c.Axis.extend({
                constructor: d,
                projectValue: e
            })
        }(window, document, a),
        function(a, b, c) {
            "use strict";

            function d(a) {
                var b = c.normalizeData(this.data, a.reverseData, !0);
                this.svg = c.createSvg(this.container, a.width, a.height, a.classNames.chart);
                var d, e, g = this.svg.elem("g").addClass(a.classNames.gridGroup),
                    h = this.svg.elem("g"),
                    i = this.svg.elem("g").addClass(a.classNames.labelGroup),
                    j = c.createChartRect(this.svg, a, f.padding);
                d = void 0 === a.axisX.type ? new c.StepAxis(c.Axis.units.x, b.normalized.series, j, c.extend({}, a.axisX, {
                    ticks: b.normalized.labels,
                    stretch: a.fullWidth
                })) : a.axisX.type.call(c, c.Axis.units.x, b.normalized.series, j, a.axisX), e = void 0 === a.axisY.type ? new c.AutoScaleAxis(c.Axis.units.y, b.normalized.series, j, c.extend({}, a.axisY, {
                    high: c.isNumeric(a.high) ? a.high : a.axisY.high,
                    low: c.isNumeric(a.low) ? a.low : a.axisY.low
                })) : a.axisY.type.call(c, c.Axis.units.y, b.normalized.series, j, a.axisY), d.createGridAndLabels(g, i, this.supportsForeignObject, a, this.eventEmitter), e.createGridAndLabels(g, i, this.supportsForeignObject, a, this.eventEmitter), a.showGridBackground && c.createGridBackground(g, j, a.classNames.gridBackground, this.eventEmitter), b.raw.series.forEach(function(f, g) {
                    var i = h.elem("g");
                    i.attr({
                        "ct:series-name": f.name,
                        "ct:meta": c.serialize(f.meta)
                    }), i.addClass([a.classNames.series, f.className || a.classNames.series + "-" + c.alphaNumerate(g)].join(" "));
                    var k = [],
                        l = [];
                    b.normalized.series[g].forEach(function(a, h) {
                        var i = {
                            x: j.x1 + d.projectValue(a, h, b.normalized.series[g]),
                            y: j.y1 - e.projectValue(a, h, b.normalized.series[g])
                        };
                        k.push(i.x, i.y), l.push({
                            value: a,
                            valueIndex: h,
                            meta: c.getMetaData(f, h)
                        })
                    }.bind(this));
                    var m = {
                            lineSmooth: c.getSeriesOption(f, a, "lineSmooth"),
                            showPoint: c.getSeriesOption(f, a, "showPoint"),
                            showLine: c.getSeriesOption(f, a, "showLine"),
                            showArea: c.getSeriesOption(f, a, "showArea"),
                            areaBase: c.getSeriesOption(f, a, "areaBase")
                        },
                        n = "function" == typeof m.lineSmooth ? m.lineSmooth : m.lineSmooth ? c.Interpolation.monotoneCubic() : c.Interpolation.none(),
                        o = n(k, l);
                    if (m.showPoint && o.pathElements.forEach(function(b) {
                            var h = i.elem("line", {
                                x1: b.x,
                                y1: b.y,
                                x2: b.x + .01,
                                y2: b.y
                            }, a.classNames.point).attr({
                                "ct:value": [b.data.value.x, b.data.value.y].filter(c.isNumeric).join(","),
                                "ct:meta": c.serialize(b.data.meta)
                            });
                            this.eventEmitter.emit("draw", {
                                type: "point",
                                value: b.data.value,
                                index: b.data.valueIndex,
                                meta: b.data.meta,
                                series: f,
                                seriesIndex: g,
                                axisX: d,
                                axisY: e,
                                group: i,
                                element: h,
                                x: b.x,
                                y: b.y
                            })
                        }.bind(this)), m.showLine) {
                        var p = i.elem("path", {
                            d: o.stringify()
                        }, a.classNames.line, !0);
                        this.eventEmitter.emit("draw", {
                            type: "line",
                            values: b.normalized.series[g],
                            path: o.clone(),
                            chartRect: j,
                            index: g,
                            series: f,
                            seriesIndex: g,
                            seriesMeta: f.meta,
                            axisX: d,
                            axisY: e,
                            group: i,
                            element: p
                        })
                    }
                    if (m.showArea && e.range) {
                        var q = Math.max(Math.min(m.areaBase, e.range.max), e.range.min),
                            r = j.y1 - e.projectValue(q);
                        o.splitByCommand("M").filter(function(a) {
                            return a.pathElements.length > 1
                        }).map(function(a) {
                            var b = a.pathElements[0],
                                c = a.pathElements[a.pathElements.length - 1];
                            return a.clone(!0).position(0).remove(1).move(b.x, r).line(b.x, b.y).position(a.pathElements.length + 1).line(c.x, r)
                        }).forEach(function(c) {
                            var h = i.elem("path", {
                                d: c.stringify()
                            }, a.classNames.area, !0);
                            this.eventEmitter.emit("draw", {
                                type: "area",
                                values: b.normalized.series[g],
                                path: c.clone(),
                                series: f,
                                seriesIndex: g,
                                axisX: d,
                                axisY: e,
                                chartRect: j,
                                index: g,
                                group: i,
                                element: h
                            })
                        }.bind(this))
                    }
                }.bind(this)), this.eventEmitter.emit("created", {
                    bounds: e.bounds,
                    chartRect: j,
                    axisX: d,
                    axisY: e,
                    svg: this.svg,
                    options: a
                })
            }

            function e(a, b, d, e) {
                c.Line["super"].constructor.call(this, a, b, f, c.extend({}, f, d), e)
            }
            var f = {
                axisX: {
                    offset: 30,
                    position: "end",
                    labelOffset: {
                        x: 0,
                        y: 0
                    },
                    showLabel: !0,
                    showGrid: !0,
                    labelInterpolationFnc: c.noop,
                    type: void 0
                },
                axisY: {
                    offset: 40,
                    position: "start",
                    labelOffset: {
                        x: 0,
                        y: 0
                    },
                    showLabel: !0,
                    showGrid: !0,
                    labelInterpolationFnc: c.noop,
                    type: void 0,
                    scaleMinSpace: 20,
                    onlyInteger: !1
                },
                width: void 0,
                height: void 0,
                showLine: !0,
                showPoint: !0,
                showArea: !1,
                areaBase: 0,
                lineSmooth: !0,
                showGridBackground: !1,
                low: void 0,
                high: void 0,
                chartPadding: {
                    top: 15,
                    right: 15,
                    bottom: 5,
                    left: 10
                },
                fullWidth: !1,
                reverseData: !1,
                classNames: {
                    chart: "ct-chart-line",
                    label: "ct-label",
                    labelGroup: "ct-labels",
                    series: "ct-series",
                    line: "ct-line",
                    point: "ct-point",
                    area: "ct-area",
                    grid: "ct-grid",
                    gridGroup: "ct-grids",
                    gridBackground: "ct-grid-background",
                    vertical: "ct-vertical",
                    horizontal: "ct-horizontal",
                    start: "ct-start",
                    end: "ct-end"
                }
            };
            c.Line = c.Base.extend({
                constructor: e,
                createChart: d
            })
        }(window, document, a),
        function(a, b, c) {
            "use strict";

            function d(a) {
                var b, d;
                a.distributeSeries ? (b = c.normalizeData(this.data, a.reverseData, a.horizontalBars ? "x" : "y"), b.normalized.series = b.normalized.series.map(function(a) {
                    return [a]
                })) : b = c.normalizeData(this.data, a.reverseData, a.horizontalBars ? "x" : "y"), this.svg = c.createSvg(this.container, a.width, a.height, a.classNames.chart + (a.horizontalBars ? " " + a.classNames.horizontalBars : ""));
                var e = this.svg.elem("g").addClass(a.classNames.gridGroup),
                    g = this.svg.elem("g"),
                    h = this.svg.elem("g").addClass(a.classNames.labelGroup);
                if (a.stackBars && 0 !== b.normalized.series.length) {
                    var i = c.serialMap(b.normalized.series, function() {
                        return Array.prototype.slice.call(arguments).map(function(a) {
                            return a
                        }).reduce(function(a, b) {
                            return {
                                x: a.x + (b && b.x) || 0,
                                y: a.y + (b && b.y) || 0
                            }
                        }, {
                            x: 0,
                            y: 0
                        })
                    });
                    d = c.getHighLow([i], a, a.horizontalBars ? "x" : "y")
                } else d = c.getHighLow(b.normalized.series, a, a.horizontalBars ? "x" : "y");
                d.high = +a.high || (0 === a.high ? 0 : d.high), d.low = +a.low || (0 === a.low ? 0 : d.low);
                var j, k, l, m, n, o = c.createChartRect(this.svg, a, f.padding);
                k = a.distributeSeries && a.stackBars ? b.normalized.labels.slice(0, 1) : b.normalized.labels, a.horizontalBars ? (j = m = void 0 === a.axisX.type ? new c.AutoScaleAxis(c.Axis.units.x, b.normalized.series, o, c.extend({}, a.axisX, {
                    highLow: d,
                    referenceValue: 0
                })) : a.axisX.type.call(c, c.Axis.units.x, b.normalized.series, o, c.extend({}, a.axisX, {
                    highLow: d,
                    referenceValue: 0
                })), l = n = void 0 === a.axisY.type ? new c.StepAxis(c.Axis.units.y, b.normalized.series, o, {
                    ticks: k
                }) : a.axisY.type.call(c, c.Axis.units.y, b.normalized.series, o, a.axisY)) : (l = m = void 0 === a.axisX.type ? new c.StepAxis(c.Axis.units.x, b.normalized.series, o, {
                    ticks: k
                }) : a.axisX.type.call(c, c.Axis.units.x, b.normalized.series, o, a.axisX), j = n = void 0 === a.axisY.type ? new c.AutoScaleAxis(c.Axis.units.y, b.normalized.series, o, c.extend({}, a.axisY, {
                    highLow: d,
                    referenceValue: 0
                })) : a.axisY.type.call(c, c.Axis.units.y, b.normalized.series, o, c.extend({}, a.axisY, {
                    highLow: d,
                    referenceValue: 0
                })));
                var p = a.horizontalBars ? o.x1 + j.projectValue(0) : o.y1 - j.projectValue(0),
                    q = [];
                l.createGridAndLabels(e, h, this.supportsForeignObject, a, this.eventEmitter), j.createGridAndLabels(e, h, this.supportsForeignObject, a, this.eventEmitter), a.showGridBackground && c.createGridBackground(e, o, a.classNames.gridBackground, this.eventEmitter), b.raw.series.forEach(function(d, e) {
                    var f, h, i = e - (b.raw.series.length - 1) / 2;
                    f = a.distributeSeries && !a.stackBars ? l.axisLength / b.normalized.series.length / 2 : a.distributeSeries && a.stackBars ? l.axisLength / 2 : l.axisLength / b.normalized.series[e].length / 2, h = g.elem("g"), h.attr({
                        "ct:series-name": d.name,
                        "ct:meta": c.serialize(d.meta)
                    }), h.addClass([a.classNames.series, d.className || a.classNames.series + "-" + c.alphaNumerate(e)].join(" ")), b.normalized.series[e].forEach(function(g, k) {
                        var r, s, t, u;
                        if (u = a.distributeSeries && !a.stackBars ? e : a.distributeSeries && a.stackBars ? 0 : k, r = a.horizontalBars ? {
                                x: o.x1 + j.projectValue(g && g.x ? g.x : 0, k, b.normalized.series[e]),
                                y: o.y1 - l.projectValue(g && g.y ? g.y : 0, u, b.normalized.series[e])
                            } : {
                                x: o.x1 + l.projectValue(g && g.x ? g.x : 0, u, b.normalized.series[e]),
                                y: o.y1 - j.projectValue(g && g.y ? g.y : 0, k, b.normalized.series[e])
                            }, l instanceof c.StepAxis && (l.options.stretch || (r[l.units.pos] += f * (a.horizontalBars ? -1 : 1)), r[l.units.pos] += a.stackBars || a.distributeSeries ? 0 : i * a.seriesBarDistance * (a.horizontalBars ? -1 : 1)), t = q[k] || p, q[k] = t - (p - r[l.counterUnits.pos]), void 0 !== g) {
                            var v = {};
                            v[l.units.pos + "1"] = r[l.units.pos], v[l.units.pos + "2"] = r[l.units.pos], !a.stackBars || "accumulate" !== a.stackMode && a.stackMode ? (v[l.counterUnits.pos + "1"] = p, v[l.counterUnits.pos + "2"] = r[l.counterUnits.pos]) : (v[l.counterUnits.pos + "1"] = t, v[l.counterUnits.pos + "2"] = q[k]), v.x1 = Math.min(Math.max(v.x1, o.x1), o.x2), v.x2 = Math.min(Math.max(v.x2, o.x1), o.x2), v.y1 = Math.min(Math.max(v.y1, o.y2), o.y1), v.y2 = Math.min(Math.max(v.y2, o.y2), o.y1);
                            var w = c.getMetaData(d, k);
                            s = h.elem("line", v, a.classNames.bar).attr({
                                "ct:value": [g.x, g.y].filter(c.isNumeric).join(","),
                                "ct:meta": c.serialize(w)
                            }), this.eventEmitter.emit("draw", c.extend({
                                type: "bar",
                                value: g,
                                index: k,
                                meta: w,
                                series: d,
                                seriesIndex: e,
                                axisX: m,
                                axisY: n,
                                chartRect: o,
                                group: h,
                                element: s
                            }, v))
                        }
                    }.bind(this))
                }.bind(this)), this.eventEmitter.emit("created", {
                    bounds: j.bounds,
                    chartRect: o,
                    axisX: m,
                    axisY: n,
                    svg: this.svg,
                    options: a
                })
            }

            function e(a, b, d, e) {
                c.Bar["super"].constructor.call(this, a, b, f, c.extend({}, f, d), e)
            }
            var f = {
                axisX: {
                    offset: 30,
                    position: "end",
                    labelOffset: {
                        x: 0,
                        y: 0
                    },
                    showLabel: !0,
                    showGrid: !0,
                    labelInterpolationFnc: c.noop,
                    scaleMinSpace: 30,
                    onlyInteger: !1
                },
                axisY: {
                    offset: 40,
                    position: "start",
                    labelOffset: {
                        x: 0,
                        y: 0
                    },
                    showLabel: !0,
                    showGrid: !0,
                    labelInterpolationFnc: c.noop,
                    scaleMinSpace: 20,
                    onlyInteger: !1
                },
                width: void 0,
                height: void 0,
                high: void 0,
                low: void 0,
                referenceValue: 0,
                chartPadding: {
                    top: 15,
                    right: 15,
                    bottom: 5,
                    left: 10
                },
                seriesBarDistance: 15,
                stackBars: !1,
                stackMode: "accumulate",
                horizontalBars: !1,
                distributeSeries: !1,
                reverseData: !1,
                showGridBackground: !1,
                classNames: {
                    chart: "ct-chart-bar",
                    horizontalBars: "ct-horizontal-bars",
                    label: "ct-label",
                    labelGroup: "ct-labels",
                    series: "ct-series",
                    bar: "ct-bar",
                    grid: "ct-grid",
                    gridGroup: "ct-grids",
                    gridBackground: "ct-grid-background",
                    vertical: "ct-vertical",
                    horizontal: "ct-horizontal",
                    start: "ct-start",
                    end: "ct-end"
                }
            };
            c.Bar = c.Base.extend({
                constructor: e,
                createChart: d
            })
        }(window, document, a),
        function(a, b, c) {
            "use strict";

            function d(a, b, c) {
                var d = b.x > a.x;
                return d && "explode" === c || !d && "implode" === c ? "start" : d && "implode" === c || !d && "explode" === c ? "end" : "middle"
            }

            function e(a) {
                var b, e, f, h, i, j = c.normalizeData(this.data),
                    k = [],
                    l = a.startAngle;
                this.svg = c.createSvg(this.container, a.width, a.height, a.donut ? a.classNames.chartDonut : a.classNames.chartPie), e = c.createChartRect(this.svg, a, g.padding), f = Math.min(e.width() / 2, e.height() / 2), i = a.total || j.normalized.series.reduce(function(a, b) {
                    return a + b
                }, 0);
                var m = c.quantity(a.donutWidth);
                "%" === m.unit && (m.value *= f / 100), f -= a.donut && !a.donutSolid ? m.value / 2 : 0, h = "outside" === a.labelPosition || a.donut && !a.donutSolid ? f : "center" === a.labelPosition ? 0 : a.donutSolid ? f - m.value / 2 : f / 2, h += a.labelOffset;
                var n = {
                        x: e.x1 + e.width() / 2,
                        y: e.y2 + e.height() / 2
                    },
                    o = 1 === j.raw.series.filter(function(a) {
                        return a.hasOwnProperty("value") ? 0 !== a.value : 0 !== a
                    }).length;
                j.raw.series.forEach(function(a, b) {
                    k[b] = this.svg.elem("g", null, null)
                }.bind(this)), a.showLabel && (b = this.svg.elem("g", null, null)), j.raw.series.forEach(function(e, g) {
                    if (0 !== j.normalized.series[g] || !a.ignoreEmptyValues) {
                        k[g].attr({
                            "ct:series-name": e.name
                        }), k[g].addClass([a.classNames.series, e.className || a.classNames.series + "-" + c.alphaNumerate(g)].join(" "));
                        var p = i > 0 ? l + j.normalized.series[g] / i * 360 : 0,
                            q = Math.max(0, l - (0 === g || o ? 0 : .2));
                        p - q >= 359.99 && (p = q + 359.99);
                        var r, s, t, u = c.polarToCartesian(n.x, n.y, f, q),
                            v = c.polarToCartesian(n.x, n.y, f, p),
                            w = new c.Svg.Path(!a.donut || a.donutSolid).move(v.x, v.y).arc(f, f, 0, p - l > 180, 0, u.x, u.y);
                        a.donut ? a.donutSolid && (t = f - m.value, r = c.polarToCartesian(n.x, n.y, t, l - (0 === g || o ? 0 : .2)), s = c.polarToCartesian(n.x, n.y, t, p), w.line(r.x, r.y), w.arc(t, t, 0, p - l > 180, 1, s.x, s.y)) : w.line(n.x, n.y);
                        var x = a.classNames.slicePie;
                        a.donut && (x = a.classNames.sliceDonut, a.donutSolid && (x = a.classNames.sliceDonutSolid));
                        var y = k[g].elem("path", {
                            d: w.stringify()
                        }, x);
                        if (y.attr({
                                "ct:value": j.normalized.series[g],
                                "ct:meta": c.serialize(e.meta)
                            }), a.donut && !a.donutSolid && (y._node.style.strokeWidth = m.value + "px"), this.eventEmitter.emit("draw", {
                                type: "slice",
                                value: j.normalized.series[g],
                                totalDataSum: i,
                                index: g,
                                meta: e.meta,
                                series: e,
                                group: k[g],
                                element: y,
                                path: w.clone(),
                                center: n,
                                radius: f,
                                startAngle: l,
                                endAngle: p
                            }), a.showLabel) {
                            var z;
                            z = 1 === j.raw.series.length ? {
                                x: n.x,
                                y: n.y
                            } : c.polarToCartesian(n.x, n.y, h, l + (p - l) / 2);
                            var A;
                            A = j.normalized.labels && !c.isFalseyButZero(j.normalized.labels[g]) ? j.normalized.labels[g] : j.normalized.series[g];
                            var B = a.labelInterpolationFnc(A, g);
                            if (B || 0 === B) {
                                var C = b.elem("text", {
                                    dx: z.x,
                                    dy: z.y,
                                    "text-anchor": d(n, z, a.labelDirection)
                                }, a.classNames.label).text("" + B);
                                this.eventEmitter.emit("draw", {
                                    type: "label",
                                    index: g,
                                    group: b,
                                    element: C,
                                    text: "" + B,
                                    x: z.x,
                                    y: z.y
                                })
                            }
                        }
                        l = p
                    }
                }.bind(this)), this.eventEmitter.emit("created", {
                    chartRect: e,
                    svg: this.svg,
                    options: a
                })
            }

            function f(a, b, d, e) {
                c.Pie["super"].constructor.call(this, a, b, g, c.extend({}, g, d), e)
            }
            var g = {
                width: void 0,
                height: void 0,
                chartPadding: 5,
                classNames: {
                    chartPie: "ct-chart-pie",
                    chartDonut: "ct-chart-donut",
                    series: "ct-series",
                    slicePie: "ct-slice-pie",
                    sliceDonut: "ct-slice-donut",
                    sliceDonutSolid: "ct-slice-donut-solid",
                    label: "ct-label"
                },
                startAngle: 0,
                total: void 0,
                donut: !1,
                donutSolid: !1,
                donutWidth: 60,
                showLabel: !0,
                labelOffset: 0,
                labelPosition: "inside",
                labelInterpolationFnc: c.noop,
                labelDirection: "neutral",
                reverseData: !1,
                ignoreEmptyValues: !1
            };
            c.Pie = c.Base.extend({
                constructor: f,
                createChart: e,
                determineAnchorPosition: d
            })
        }(window, document, a), a
});
//# sourceMappingURL=chartist.min.js.map