(function(e) {
    "use strict";

    function t() {}

    function n(e) {
        if (e = e || {}, this.IS_MASTER = e.isMaster || !1, !this.IS_MASTER) throw Error("The DataStore can only be instantiated by the Master");
        this.dataStore = {}
    }

    function r(e, t) {
        if (this.IS_MASTER = e && e.isMaster ? e.isMaster : !1, this.IS_SLAVE = !this.IS_MASTER, this.messenger = null, this.subscribers = {}, this.moduleReady = t ? t : !1, this.gameState = "resume", !e || !e.messenger) throw Error("No messenger passed to the Game module instance");
        this.messenger = e.messenger, window.addEventListener ? window.addEventListener("message", this._performAction.bind(this), !1) : window.attachEvent && window.attachEvent("onmessage", this._performAction.bind(this))
    }

    function i(e, t) {
        e = e || {}, this.IS_MASTER = e.isMaster, this.IS_SLAVE = !this.IS_MASTER, this.moduleReady = t ? t : !1, this.messenger = e.messenger, this.data = e.data || null, this._setupMasterEvent()
    }

    function s(e, t) {
        e = e || {}, this.isMaster = e.isMaster, this.isStandalone = e.isStandalone, this.messenger = e.messenger, this.moduleReady = t ? t : !1, this.timeoutAfter = 500, this.timeout = !1, this._callbacks = {
            pause: !1,
            resume: !1
        }
    }

    function o(e, t) {
        e = e || {}, this.IS_MASTER = e.isMaster, this.isStandalone = e.isStandalone, this.messenger = e.messenger, this.eventTracking = e.eventTracking, this.moduleReady = t ? t : !1, this.events = {
            GAME_START: "GAME_START",
            GAME_END: "GAME_END",
            GAME_PAUSE: "GAME_PAUSE",
            GAME_CONTINUE: "GAME_CONTINUE",
            GAME_MUTE: "GAME_MUTE",
            LEVEL_FAIL: "LEVEL_FAIL",
            LEVEL_COMPLETE: "LEVEL_COMPLETE"
        }, this._setupEvents()
    }

    function u(e, t) {
        e = e || {}, this.IS_MASTER = e.isMaster, this.IS_SLAVE = !this.IS_MASTER, this.data = e.data, this.messenger = e.messenger, this.moduleReady = t ? t : !1, this.gamePlayTracking = {
            started: !1,
            appid: null,
            host: null,
            timestamp: null
        }, this.timeInGameTracking = {
            started: !1,
            appid: null,
            timestamp: null
        }
    }

    function a(e, t) {
        e = e || {}, this.IS_MASTER = e.isMaster, this.IS_SLAVE = !this.IS_MASTER, this.moduleReady = t ? t : !1, this.messenger = e.messenger, this.components = e.components, this.data = e.data || null
    }

    function f(e) {
        var t = "string" == typeof e ? l(e) : e;
        t && (this.type = t.type, this.callbackId = t.callbackId, this.data = t.data)
    }

    function l(e) {
        var t, n, r, i = !1,
            s = [];
        if ("string" == typeof e && (s = e.split("|"), "gameapi" === s[0])) {
            s.shift(), t = s.shift(), r = parseInt(s.shift(), 10), n = s.join("|");
            try {
                i = {
                    type: t,
                    callbackId: r,
                    data: "" !== n ? JSON.parse(n) : ""
                }
            } catch (o) {}
        }
        return i
    }

    function c(e) {
        e = e || {}, this.IS_MASTER = "boolean" == typeof e.isMaster ? e.isMaster : !1, this.IS_SLAVE = !this.IS_MASTER, this.api = e.api ? e.api : {}, this._target = e.target ? e.target : {}, this._callbacks = [], this._channels = [], this.IS_MASTER && e.dataStore && (this.dataStore = e.dataStore), this._setupEventListener()
    }

    function h(e, n, s, u, a) {
        this.version = "0.13.7", this.isReady = !1, this._setRole(), this.__ = {}, this.__.dataStore = this.IS_MASTER ? new e({
            isMaster: !0
        }) : null, this.__.messenger = new n({
            isMaster: this.IS_MASTER,
            api: this,
            target: this._getTarget(),
            dataStore: this.__.dataStore
        }), this.__.components = new t, this.Branding = new s({
            isMaster: this.IS_MASTER,
            messenger: this.__.messenger,
            components: this.__.components
        }, !1), this.__.EventTracking = new u({
            isMaster: this.IS_MASTER,
            data: null,
            messenger: this.__.messenger
        }, !1), this.GameBreak = new a({
            isMaster: this.IS_MASTER,
            isStandalone: this.IS_STANDALONE,
            messenger: this.__.messenger
        }, !1), this.Game = new r({
            isMaster: this.IS_MASTER,
            messenger: this.__.messenger
        }, !1), this.Score = new i({
            isMaster: this.IS_MASTER,
            messenger: this.__.messenger
        }, !1), this.GameEvent = new o({
            isMaster: this.IS_MASTER,
            messenger: this.__.messenger,
            eventTracking: this.__.EventTracking
        }, !1)
    }
    var p;
    (function(e) {
        if ("function" == typeof bootstrap) bootstrap("promise", e);
        else if ("object" == typeof exports) module.exports = e();
        else if ("function" == typeof define && define.amd) define(e);
        else if ("undefined" != typeof ses) {
            if (!ses.ok()) return;
            ses.makeQ = e
        } else p = e()
    })(function() {
        function e(e) {
            return function() {
                return $.apply(e, arguments)
            }
        }

        function t(e) {
            return e === Object(e)
        }

        function n(e) {
            return "[object StopIteration]" === tt(e) || e instanceof z
        }

        function r(e, t) {
            if (q && t.stack && "object" == typeof e && null !== e && e.stack && -1 === e.stack.indexOf(nt)) {
                for (var n = [], r = t; r; r = r.source) r.stack && n.unshift(r.stack);
                n.unshift(e.stack);
                var s = n.join("\n" + nt + "\n");
                e.stack = i(s)
            }
        }

        function i(e) {
            for (var t = e.split("\n"), n = [], r = 0; t.length > r; ++r) {
                var i = t[r];
                u(i) || s(i) || !i || n.push(i)
            }
            return n.join("\n")
        }

        function s(e) {
            return -1 !== e.indexOf("(module.js:") || -1 !== e.indexOf("(node.js:")
        }

        function o(e) {
            var t = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(e);
            if (t) return [t[1], Number(t[2])];
            var n = /at ([^ ]+):(\d+):(?:\d+)$/.exec(e);
            if (n) return [n[1], Number(n[2])];
            var r = /.*@(.+):(\d+)$/.exec(e);
            return r ? [r[1], Number(r[2])] : void 0
        }

        function u(e) {
            var t = o(e);
            if (!t) return !1;
            var n = t[0],
                r = t[1];
            return n === U && r >= W && ot >= r
        }

        function a() {
            if (q) try {
                throw Error()
            } catch (e) {
                var t = e.stack.split("\n"),
                    n = t[0].indexOf("@") > 0 ? t[1] : t[2],
                    r = o(n);
                if (!r) return;
                return U = r[0], r[1]
            }
        }

        function f(e, t, n) {
            return function() {
                return "undefined" != typeof console && "function" == typeof console.warn && console.warn(t + " is deprecated, use " + n + " instead.", Error("").stack), e.apply(e, arguments)
            }
        }

        function l(e) {
            return g(e) ? e : y(e) ? k(e) : C(e)
        }

        function c() {
            function e(e) {
                t = e, s.source = e, K(n, function(t, n) {
                    V(function() {
                        e.promiseDispatch.apply(e, n)
                    })
                }, void 0), n = void 0, r = void 0
            }
            var t, n = [],
                r = [],
                i = Y(c.prototype),
                s = Y(d.prototype);
            if (s.promiseDispatch = function(e, i, s) {
                var o = J(arguments);
                n ? (n.push(o), "when" === i && s[1] && r.push(s[1])) : V(function() {
                    t.promiseDispatch.apply(t, o)
                })
            }, s.valueOf = function() {
                if (n) return s;
                var e = m(t);
                return g(e) && (t = e), e
            }, s.inspect = function() {
                return t ? t.inspect() : {
                    state: "pending"
                }
            }, l.longStackSupport && q) try {
                throw Error()
            } catch (o) {
                s.stack = o.stack.substring(o.stack.indexOf("\n") + 1)
            }
            return i.promise = s, i.resolve = function(n) {
                t || e(l(n))
            }, i.fulfill = function(n) {
                t || e(C(n))
            }, i.reject = function(n) {
                t || e(N(n))
            }, i.notify = function(e) {
                t || K(r, function(t, n) {
                    V(function() {
                        n(e)
                    })
                }, void 0)
            }, i
        }

        function h(e) {
            if ("function" != typeof e) throw new TypeError("resolver must be a function.");
            var t = c();
            try {
                e(t.resolve, t.reject, t.notify)
            } catch (n) {
                t.reject(n)
            }
            return t.promise
        }

        function p(e) {
            return h(function(t, n) {
                for (var r = 0, i = e.length; i > r; r++) l(e[r]).then(t, n)
            })
        }

        function d(e, t, n) {
            void 0 === t && (t = function(e) {
                return N(Error("Promise does not support operation: " + e))
            }), void 0 === n && (n = function() {
                return {
                    state: "unknown"
                }
            });
            var r = Y(d.prototype);
            if (r.promiseDispatch = function(n, i, s) {
                var o;
                try {
                    o = e[i] ? e[i].apply(r, s) : t.call(r, i, s)
                } catch (u) {
                    o = N(u)
                }
                n && n(o)
            }, r.inspect = n, n) {
                var i = n();
                "rejected" === i.state && (r.exception = i.reason), r.valueOf = function() {
                    var e = n();
                    return "pending" === e.state || "rejected" === e.state ? r : e.value
                }
            }
            return r
        }

        function v(e, t, n, r) {
            return l(e).then(t, n, r)
        }

        function m(e) {
            if (g(e)) {
                var t = e.inspect();
                if ("fulfilled" === t.state) return t.value
            }
            return e
        }

        function g(e) {
            return t(e) && "function" == typeof e.promiseDispatch && "function" == typeof e.inspect
        }

        function y(e) {
            return t(e) && "function" == typeof e.then
        }

        function b(e) {
            return g(e) && "pending" === e.inspect().state
        }

        function w(e) {
            return !g(e) || "fulfilled" === e.inspect().state
        }

        function E(e) {
            return g(e) && "rejected" === e.inspect().state
        }

        function S() {
            rt.length = 0, it.length = 0, st || (st = !0)
        }

        function x(e, t) {
            st && (it.push(e), t && t.stack !== void 0 ? rt.push(t.stack) : rt.push("(no stack) " + t))
        }

        function T(e) {
            if (st) {
                var t = Q(it, e); - 1 !== t && (it.splice(t, 1), rt.splice(t, 1))
            }
        }

        function N(e) {
            var t = d({
                when: function(t) {
                    return t && T(this), t ? t(e) : this
                }
            }, function() {
                return this
            }, function() {
                return {
                    state: "rejected",
                    reason: e
                }
            });
            return x(t, e), t
        }

        function C(e) {
            return d({
                when: function() {
                    return e
                },
                get: function(t) {
                    return e[t]
                },
                set: function(t, n) {
                    e[t] = n
                },
                "delete": function(t) {
                    delete e[t]
                },
                post: function(t, n) {
                    return null === t || void 0 === t ? e.apply(void 0, n) : e[t].apply(e, n)
                },
                apply: function(t, n) {
                    return e.apply(t, n)
                },
                keys: function() {
                    return et(e)
                }
            }, void 0, function() {
                return {
                    state: "fulfilled",
                    value: e
                }
            })
        }

        function k(e) {
            var t = c();
            return V(function() {
                try {
                    e.then(t.resolve, t.reject, t.notify)
                } catch (n) {
                    t.reject(n)
                }
            }), t.promise
        }

        function L(e) {
            return d({
                isDef: function() {}
            }, function(t, n) {
                return P(e, t, n)
            }, function() {
                return l(e).inspect()
            })
        }

        function A(e, t, n) {
            return l(e).spread(t, n)
        }

        function O(e) {
            return function() {
                function t(e, t) {
                    var o;
                    if ("undefined" == typeof StopIteration) {
                        try {
                            o = r[e](t)
                        } catch (u) {
                            return N(u)
                        }
                        return o.done ? o.value : v(o.value, i, s)
                    }
                    try {
                        o = r[e](t)
                    } catch (u) {
                        return n(u) ? u.value : N(u)
                    }
                    return v(o, i, s)
                }
                var r = e.apply(this, arguments),
                    i = t.bind(t, "next"),
                    s = t.bind(t, "throw");
                return i()
            }
        }

        function M(e) {
            l.done(l.async(e)())
        }

        function _(e) {
            throw new z(e)
        }

        function D(e) {
            return function() {
                return A([this, H(arguments)], function(t, n) {
                    return e.apply(t, n)
                })
            }
        }

        function P(e, t, n) {
            return l(e).dispatch(t, n)
        }

        function H(e) {
            return v(e, function(e) {
                var t = 0,
                    n = c();
                return K(e, function(r, i, s) {
                    var o;
                    g(i) && "fulfilled" === (o = i.inspect()).state ? e[s] = o.value : (++t, v(i, function(r) {
                        e[s] = r, 0 === --t && n.resolve(e)
                    }, n.reject, function(e) {
                        n.notify({
                            index: s,
                            value: e
                        })
                    }))
                }, void 0), 0 === t && n.resolve(e), n.promise
            })
        }

        function B(e) {
            return v(e, function(e) {
                return e = G(e, l), v(H(G(e, function(e) {
                    return v(e, X, X)
                })), function() {
                    return e
                })
            })
        }

        function j(e) {
            return l(e).allSettled()
        }

        function F(e, t) {
            return l(e).then(void 0, void 0, t)
        }

        function I(e, t) {
            return l(e).nodeify(t)
        }
        var q = !1;
        try {
            throw Error()
        } catch (R) {
            q = !!R.stack
        }
        var U, z, W = a(),
            X = function() {},
            V = function() {
                function e() {
                    for (; t.next;) {
                        t = t.next;
                        var n = t.task;
                        t.task = void 0;
                        var i = t.domain;
                        i && (t.domain = void 0, i.enter());
                        try {
                            n()
                        } catch (o) {
                            if (s) throw i && i.exit(), setTimeout(e, 0), i && i.enter(), o;
                            setTimeout(function() {
                                throw o
                            }, 0)
                        }
                        i && i.exit()
                    }
                    r = !1
                }
                var t = {
                        task: void 0,
                        next: null
                    },
                    n = t,
                    r = !1,
                    i = void 0,
                    s = !1;
                if (V = function(e) {
                    n = n.next = {
                        task: e,
                        domain: s && process.domain,
                        next: null
                    }, r || (r = !0, i())
                }, "undefined" != typeof process && process.nextTick) s = !0, i = function() {
                    process.nextTick(e)
                };
                else if ("function" == typeof setImmediate) i = "undefined" != typeof window ? setImmediate.bind(window, e) : function() {
                    setImmediate(e)
                };
                else if ("undefined" != typeof MessageChannel) {
                    var o = new MessageChannel;
                    o.port1.onmessage = function() {
                        i = u, o.port1.onmessage = e, e()
                    };
                    var u = function() {
                        o.port2.postMessage(0)
                    };
                    i = function() {
                        setTimeout(e, 0), u()
                    }
                } else i = function() {
                    setTimeout(e, 0)
                };
                return V
            }(),
            $ = Function.call,
            J = e(Array.prototype.slice),
            K = e(Array.prototype.reduce || function(e, t) {
                var n = 0,
                    r = this.length;
                if (1 === arguments.length)
                    for (;;) {
                        if (n in this) {
                            t = this[n++];
                            break
                        }
                        if (++n >= r) throw new TypeError
                    }
                for (; r > n; n++) n in this && (t = e(t, this[n], n));
                return t
            }),
            Q = e(Array.prototype.indexOf || function(e) {
                for (var t = 0; this.length > t; t++)
                    if (this[t] === e) return t;
                return -1
            }),
            G = e(Array.prototype.map || function(e, t) {
                var n = this,
                    r = [];
                return K(n, function(i, s, o) {
                    r.push(e.call(t, s, o, n))
                }, void 0), r
            }),
            Y = Object.create || function(e) {
                function t() {}
                return t.prototype = e, new t
            },
            Z = e(Object.prototype.hasOwnProperty),
            et = Object.keys || function(e) {
                var t = [];
                for (var n in e) Z(e, n) && t.push(n);
                return t
            },
            tt = e(Object.prototype.toString);
        z = "undefined" != typeof ReturnValue ? ReturnValue : function(e) {
            this.value = e
        };
        var nt = "From previous event:";
        l.resolve = l, l.nextTick = V, l.longStackSupport = !1, l.defer = c, c.prototype.makeNodeResolver = function() {
            var e = this;
            return function(t, n) {
                t ? e.reject(t) : arguments.length > 2 ? e.resolve(J(arguments, 1)) : e.resolve(n)
            }
        }, l.Promise = h, l.promise = h, h.race = p, h.all = H, h.reject = N, h.resolve = l, l.passByCopy = function(e) {
            return e
        }, d.prototype.passByCopy = function() {
            return this
        }, l.join = function(e, t) {
            return l(e).join(t)
        }, d.prototype.join = function(e) {
            return l([this, e]).spread(function(e, t) {
                if (e === t) return e;
                throw Error("Can't join: not the same: " + e + " " + t)
            })
        }, l.race = p, d.prototype.race = function() {
            return this.then(l.race)
        }, l.makePromise = d, d.prototype.toString = function() {
            return "[object Promise]"
        }, d.prototype.then = function(e, t, n) {
            function i(t) {
                try {
                    return "function" == typeof e ? e(t) : t
                } catch (n) {
                    return N(n)
                }
            }

            function s(e) {
                if ("function" == typeof t) {
                    r(e, u);
                    try {
                        return t(e)
                    } catch (n) {
                        return N(n)
                    }
                }
                return N(e)
            }

            function o(e) {
                return "function" == typeof n ? n(e) : e
            }
            var u = this,
                a = c(),
                f = !1;
            return V(function() {
                u.promiseDispatch(function(e) {
                    f || (f = !0, a.resolve(i(e)))
                }, "when", [
                    function(e) {
                        f || (f = !0, a.resolve(s(e)))
                    }
                ])
            }), u.promiseDispatch(void 0, "when", [void 0,
                function(e) {
                    var t, n = !1;
                    try {
                        t = o(e)
                    } catch (r) {
                        if (n = !0, !l.onerror) throw r;
                        l.onerror(r)
                    }
                    n || a.notify(t)
                }
            ]), a.promise
        }, l.when = v, d.prototype.thenResolve = function(e) {
            return this.then(function() {
                return e
            })
        }, l.thenResolve = function(e, t) {
            return l(e).thenResolve(t)
        }, d.prototype.thenReject = function(e) {
            return this.then(function() {
                throw e
            })
        }, l.thenReject = function(e, t) {
            return l(e).thenReject(t)
        }, l.nearer = m, l.isPromise = g, l.isPromiseAlike = y, l.isPending = b, d.prototype.isPending = function() {
            return "pending" === this.inspect().state
        }, l.isFulfilled = w, d.prototype.isFulfilled = function() {
            return "fulfilled" === this.inspect().state
        }, l.isRejected = E, d.prototype.isRejected = function() {
            return "rejected" === this.inspect().state
        };
        var rt = [],
            it = [],
            st = !0;
        l.resetUnhandledRejections = S, l.getUnhandledReasons = function() {
            return rt.slice()
        }, l.stopUnhandledRejectionTracking = function() {
            S(), st = !1
        }, S(), l.reject = N, l.fulfill = C, l.master = L, l.spread = A, d.prototype.spread = function(e, t) {
            return this.all().then(function(t) {
                return e.apply(void 0, t)
            }, t)
        }, l.async = O, l.spawn = M, l["return"] = _, l.promised = D, l.dispatch = P, d.prototype.dispatch = function(e, t) {
            var n = this,
                r = c();
            return V(function() {
                n.promiseDispatch(r.resolve, e, t)
            }), r.promise
        }, l.get = function(e, t) {
            return l(e).dispatch("get", [t])
        }, d.prototype.get = function(e) {
            return this.dispatch("get", [e])
        }, l.set = function(e, t, n) {
            return l(e).dispatch("set", [t, n])
        }, d.prototype.set = function(e, t) {
            return this.dispatch("set", [e, t])
        }, l.del = l["delete"] = function(e, t) {
            return l(e).dispatch("delete", [t])
        }, d.prototype.del = d.prototype["delete"] = function(e) {
            return this.dispatch("delete", [e])
        }, l.mapply = l.post = function(e, t, n) {
            return l(e).dispatch("post", [t, n])
        }, d.prototype.mapply = d.prototype.post = function(e, t) {
            return this.dispatch("post", [e, t])
        }, l.send = l.mcall = l.invoke = function(e, t) {
            return l(e).dispatch("post", [t, J(arguments, 2)])
        }, d.prototype.send = d.prototype.mcall = d.prototype.invoke = function(e) {
            return this.dispatch("post", [e, J(arguments, 1)])
        }, l.fapply = function(e, t) {
            return l(e).dispatch("apply", [void 0, t])
        }, d.prototype.fapply = function(e) {
            return this.dispatch("apply", [void 0, e])
        }, l["try"] = l.fcall = function(e) {
            return l(e).dispatch("apply", [void 0, J(arguments, 1)])
        }, d.prototype.fcall = function() {
            return this.dispatch("apply", [void 0, J(arguments)])
        }, l.fbind = function(e) {
            var t = l(e),
                n = J(arguments, 1);
            return function() {
                return t.dispatch("apply", [this, n.concat(J(arguments))])
            }
        }, d.prototype.fbind = function() {
            var e = this,
                t = J(arguments);
            return function() {
                return e.dispatch("apply", [this, t.concat(J(arguments))])
            }
        }, l.keys = function(e) {
            return l(e).dispatch("keys", [])
        }, d.prototype.keys = function() {
            return this.dispatch("keys", [])
        }, l.all = H, d.prototype.all = function() {
            return H(this)
        }, l.allResolved = f(B, "allResolved", "allSettled"), d.prototype.allResolved = function() {
            return B(this)
        }, l.allSettled = j, d.prototype.allSettled = function() {
            return this.then(function(e) {
                return H(G(e, function(e) {
                    function t() {
                        return e.inspect()
                    }
                    return e = l(e), e.then(t, t)
                }))
            })
        }, l.fail = l["catch"] = function(e, t) {
            return l(e).then(void 0, t)
        }, d.prototype.fail = d.prototype["catch"] = function(e) {
            return this.then(void 0, e)
        }, l.progress = F, d.prototype.progress = function(e) {
            return this.then(void 0, void 0, e)
        }, l.fin = l["finally"] = function(e, t) {
            return l(e)["finally"](t)
        }, d.prototype.fin = d.prototype["finally"] = function(e) {
            return e = l(e), this.then(function(t) {
                return e.fcall().then(function() {
                    return t
                })
            }, function(t) {
                return e.fcall().then(function() {
                    throw t
                })
            })
        }, l.done = function(e, t, n, r) {
            return l(e).done(t, n, r)
        }, d.prototype.done = function(e, t, n) {
            var i = function(e) {
                    V(function() {
                        if (r(e, s), !l.onerror) throw e;
                        l.onerror(e)
                    })
                },
                s = e || t || n ? this.then(e, t, n) : this;
            "object" == typeof process && process && process.domain && (i = process.domain.bind(i)), s.then(void 0, i)
        }, l.timeout = function(e, t, n) {
            return l(e).timeout(t, n)
        }, d.prototype.timeout = function(e, t) {
            var n = c(),
                r = setTimeout(function() {
                    n.reject(Error(t || "Timed out after " + e + " ms"))
                }, e);
            return this.then(function(e) {
                clearTimeout(r), n.resolve(e)
            }, function(e) {
                clearTimeout(r), n.reject(e)
            }, n.notify), n.promise
        }, l.delay = function(e, t) {
            return void 0 === t && (t = e, e = void 0), l(e).delay(t)
        }, d.prototype.delay = function(e) {
            return this.then(function(t) {
                var n = c();
                return setTimeout(function() {
                    n.resolve(t)
                }, e), n.promise
            })
        }, l.nfapply = function(e, t) {
            return l(e).nfapply(t)
        }, d.prototype.nfapply = function(e) {
            var t = c(),
                n = J(e);
            return n.push(t.makeNodeResolver()), this.fapply(n).fail(t.reject), t.promise
        }, l.nfcall = function(e) {
            var t = J(arguments, 1);
            return l(e).nfapply(t)
        }, d.prototype.nfcall = function() {
            var e = J(arguments),
                t = c();
            return e.push(t.makeNodeResolver()), this.fapply(e).fail(t.reject), t.promise
        }, l.nfbind = l.denodeify = function(e) {
            var t = J(arguments, 1);
            return function() {
                var n = t.concat(J(arguments)),
                    r = c();
                return n.push(r.makeNodeResolver()), l(e).fapply(n).fail(r.reject), r.promise
            }
        }, d.prototype.nfbind = d.prototype.denodeify = function() {
            var e = J(arguments);
            return e.unshift(this), l.denodeify.apply(void 0, e)
        }, l.nbind = function(e, t) {
            var n = J(arguments, 2);
            return function() {
                function r() {
                    return e.apply(t, arguments)
                }
                var i = n.concat(J(arguments)),
                    s = c();
                return i.push(s.makeNodeResolver()), l(r).fapply(i).fail(s.reject), s.promise
            }
        }, d.prototype.nbind = function() {
            var e = J(arguments, 0);
            return e.unshift(this), l.nbind.apply(void 0, e)
        }, l.nmapply = l.npost = function(e, t, n) {
            return l(e).npost(t, n)
        }, d.prototype.nmapply = d.prototype.npost = function(e, t) {
            var n = J(t || []),
                r = c();
            return n.push(r.makeNodeResolver()), this.dispatch("post", [e, n]).fail(r.reject), r.promise
        }, l.nsend = l.nmcall = l.ninvoke = function(e, t) {
            var n = J(arguments, 2),
                r = c();
            return n.push(r.makeNodeResolver()), l(e).dispatch("post", [t, n]).fail(r.reject), r.promise
        }, d.prototype.nsend = d.prototype.nmcall = d.prototype.ninvoke = function(e) {
            var t = J(arguments, 1),
                n = c();
            return t.push(n.makeNodeResolver()), this.dispatch("post", [e, t]).fail(n.reject), n.promise
        }, l.nodeify = I, d.prototype.nodeify = function(e) {
            return e ? (this.then(function(t) {
                V(function() {
                    e(null, t)
                })
            }, function(t) {
                V(function() {
                    e(t)
                })
            }), void 0) : this
        };
        var ot = a();
        return l
    }),
    function(e) {
        var t = "Promise" in e && "cast" in e.Promise && "resolve" in e.Promise && "reject" in e.Promise && "all" in e.Promise && "race" in e.Promise && "spread" in e.Promise;
        t || (e.Promise = p.promise, e.Promise.all = p.all, e.Promise.timeout = p.timeout, p.stopUnhandledRejectionTracking())
    }(e !== void 0 ? e : this);
    var d = {
        timeout: 3e3
    };
    d.getGameConfig = function() {
        var e = p.defer();
        return SpilGames(["JSLib"], function(t) {
            var n = t.get("current.game.integration.info");
            n ? e.resolve(n) : e.reject(Error("No data retrieved from JSLib"))
        }), e.promise.timeout(this.timeout)
    }, d.getBrandingConfig = function(e) {
        var t = p.defer(),
            n = "http://api.configar.org/cf/pb/1/configs",
            r = e.portal.siteId,
            i = e.portal.channelId,
            s = e.portal.applicationId;
        return SpilGames(["Net", "JSLib"], function(e, o) {
            e.send({
                url: [n, i, r, s].join("/"),
                type: "GET",
                dataType: "JSON"
            }, function(e) {
                if (e && e.configar) window.postMessage(new f({
                    type: "success",
                    callbackId: null,
                    data: "log.configar.getBranding.success"
                }), "*"), t.resolve(e.configar);
                else {
                    var n = {};
                    try {
                        n = o.get("configar.data.cached") || n
                    } catch (r) {}
                    t.reject(n)
                }
            })
        }), t.promise.timeout(this.timeout)
    };
    var v = {};
    v.argsToArray = function(e) {
        return e ? Array.prototype.slice.apply(e) : []
    }, v.isA10 = function() {
        return /a10.com/.test(window.location.host)
    }, v.disableKeys = function(e) {
        var t = e.keyCode;
        (8 === t || 9 === t || t >= 32 && 40 >= t || 46 === t) && e.preventDefault()
    }, v.trackGA = function() {
        try {
            if ("www8.agame.com" === window.location.host) {
                var e = function(e, t, n, r, i, s, o) {
                    e.GoogleAnalyticsObject = i, e[i] = e[i] || function() {
                        (e[i].q = e[i].q || []).push(arguments)
                    }, e[i].l = 1 * new Date, s = t.createElement(n), o = t.getElementsByTagName(n)[0], s.async = 1, s.src = r, o.parentNode.insertBefore(s, o)
                };
                e(window, document, "script", "#", "ga"), ga("create", "UA-8223336-3", "auto"), ga("send", "pageview")
            }
        } catch (t) {}
    }, v.getRole = function() {
        var e = "function" == typeof window.SpilGames,
            t = window.self !== window.top,
            n = null;
        if (v.isA10()) return window.onkeydown = this.disableKeys, {
            IS_MASTER: !0,
            IS_SLAVE: !0,
            IS_STANDALONE: !0
        };
        if (e) {
            var r = document.getElementById("#iframegame");
            switch (r) {
                case "null":
                    n = {
                        IS_MASTER: !0,
                        IS_SLAVE: !0,
                        IS_STANDALONE: !1
                    };
                    break;
                default:
                    n = {
                        IS_MASTER: !0,
                        IS_SLAVE: !1,
                        IS_STANDALONE: !1
                    }
            }
        } else t ? (window.onkeydown = this.disableKeys, this.trackGA(), n = {
            IS_MASTER: !1,
            IS_SLAVE: !0,
            IS_STANDALONE: !1
        }) : (window.onkeydown = this.disableKeys, this.trackGA(), n = {
            IS_MASTER: !0,
            IS_SLAVE: !0,
            IS_STANDALONE: !0
        });
        return n
    }, v.callConfigar = function(e, t) {
        var n, r, i = e.site || 500,
            s = e.channel || 100,
            o = e.id || null;
        window.XDomainRequest ? (n = new XDomainRequest, n.onload = function() {
            t(200, n.responseText)
        }, n.onerror = function() {
            t(404, null)
        }, n.onprogress = function() {}) : window.XMLHttpRequest ? (n = new XMLHttpRequest, n.onreadystatechange = function() {
            4 === n.readyState && t(n.status, n.responseText)
        }) : window.ActiveXObject && (n = new ActiveXObject("Microsoft.XMLHTTP"), n.onreadystatechange = function() {
            4 === n.readyState && t(n.status, n.responseText)
        }), o && (r = ["http://api.configar.org/cf/pb/1/configs", s, i, o].join("/"), n.open("GET", r, !0), n.timeout = 3e3, n.ontimeout = function() {
            t(404, null)
        }, n.send())
    }, v.isWrapped = function() {
        return void 0 !== (window.PhoneGap || window.cordova || window.Cordova)
    }, v.isArray = Array.isArray || function(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }, v._getQueryString = function() {
        return window.location.search
    }, v._getPortalHost = function() {
        return window && window.location && window.location.hostname ? window.location.hostname : "unknown"
    }, v.validateSchema = function(e, t) {
        for (var n in t)
            if (t.hasOwnProperty(n)) {
                if (!e.hasOwnProperty(n)) return {
                    error: "Wrong argument passed: " + n
                };
                if (e.hasOwnProperty(n)) {
                    var r = "object" == typeof e[n] ? e[n].type : e[n];
                    if (t[n].constructor.name !== r) return {
                        error: "Wrong value type for " + n + ": expected " + e[n] + ", got " + t[n].constructor.name
                    };
                    var i = e[n] && e[n].values || [];
                    if (-1 === i.indexOf(t[n])) return {
                        error: "Wrong value for " + n + ": expected " + i.join(" or ") + ", got " + t[n]
                    }
                }
            }
        return {
            error: !1
        }
    };
    var m = {};
    m.getGameConfig = function() {
        return d.getGameConfig().catch(function() {
            return m.getLocalConfig()
        })
    }, m.getBrandingConfig = function(e) {
        return new Promise(function(t) {
            return d.getBrandingConfig(e).then(t, function(e) {
                t(e), window.postMessage(new f({
                    type: "warning",
                    callbackId: null,
                    data: "log.configar.getBranding.failure"
                }), "*")
            })
        })
    }, m.getLocalConfig = function(e) {
        e = e && Object.keys(e).length ? e : {
            portal: {},
            game: {},
            branding: {}
        };
        var t = {
            game: {
                applicationId: e.portal.applicationId || "0",
                contentarId: e.portal.contentarId || "0",
                info: e.game.info || {},
                settings: e.game.objectSettings || {},
                features: {
                    achievements: e.game.achievements || !1,
                    gameSidePanel: e.game.gameSidePanel || !1,
                    highscores: e.game.highscores || !1,
                    recommendedGames: e.game.recommendedGames || !1
                }
            },
            user: {
                authenticated: e.portal.authenticated || !1,
                username: e.portal.username || ""
            },
            portal: {
                host: v._getPortalHost(),
                siteId: e.portal.siteId || 0,
                channelId: e.portal.channelId || 0,
                applicationId: e.portal.applicationId || "0"
            },
            branding: e.branding || {}
        };
        return t.branding.logo = t.branding.logo || {}, t.branding.logo.url = t.branding.logo.url || !1, t.branding.logo.image = t.branding.logo.image || !1, t
    }, m.setupStandaloneMode = function(e, t) {
        var n = {},
            r = {
                configar: {
                    branding: {
                        main: {
                            label: "main",
                            image: "#",
                            url: "#",
                            style: "",
                            width: "202",
                            height: "50",
                            mime: "image/png",
                            type: "png",
                            handler: "newTab",
                            blacklisted: !0
                        },
                        logo: {
                            label: "logo",
                            image: "#",
                            url: "#",
                            style: "",
                            width: "202",
                            height: "50",
                            mime: "image/png",
                            type: "png",
                            handler: "newTab",
                            blacklisted: !1
                        },
                        more_games: {
                            label: "more_games",
                            image: null,
                            url: "#",
                            style: "",
                            width: null,
                            height: null,
                            mime: null,
                            type: null,
                            handler: "newTab",
                            blacklisted: !1
                        },
                        splash_screen: {
                            label: "splash_screen",
                            image: "place_holder_string",
                            url: "#",
                            style: "",
                            width: "0",
                            height: "0",
                            mime: "image/png",
                            type: "png",
                            handler: "newTab",
                            blacklisted: !1
                        }
                    }
                }
            };
        n.JSLib = {
            memory: {},
            _channels: {},
            get: function(e) {
                return this.memory[e] ? this.memory[e] : !1
            },
            set: function(e, t) {
                return this.memory[e] = t, t
            },
            publish: function(e, t) {
                this._channels[e] && this._channels[e].forEach(function(e) {
                    try {
                        e.fn.call(this, t)
                    } catch (n) {}
                })
            },
            subscribe: function(e, t) {
                if ("function" != typeof t) throw Error("Callback has to be a function");
                if ("string" != typeof e) throw Error("Channel name has to be a string");
                this._channels[e] || (this._channels[e] = []), this._channels[e].push({
                    fn: t
                })
            }
        }, n.Net = {
            send: function(e, t) {
                t.call(this, {})
            }
        }, window.SpilGamesBootstrap = [], window.SpilGames = function() {
            var e = arguments;
            if (e[0] && "string" == typeof e[0]) n.JSLib.publish(e[0], e[1] || null);
            else if (e[0] && e[0] instanceof Array) {
                var t, r, i = [];
                for (t = 0, r = e[0].length; r > t; t++) i.push(n[e[0][t]]);
                e[1].apply(this, i)
            }
        }, e && e.id ? v.callConfigar(e, function(n, i) {
            if (200 === n && "string" == typeof i && JSON.parse(i)) {
                var s = JSON.parse(i);
                t.call(this, {
                    branding: s.configar && s.configar.branding ? s.configar.branding : r.configar.branding,
                    portal: {
                        applicationId: e.id,
                        siteId: e.site ? e.site : 500,
                        channelId: e.channel ? e.channel : 100
                    }
                })
            } else t.call(this, {
                branding: r.configar.branding
            })
        }) : t.call(this, {
            branding: r.configar.branding
        })
    }, m.getCachedConfig = function() {}, t.prototype.newTab = function(e) {
        var t = window.navigator.userAgent.toLowerCase().match(/android.*applewebkit\/([\d.]+)/),
            n = t && 537 > t[1],
            r = n ? "_self" : "_blank",
            i = e.url,
            s = window.open(i, r);
        return s && s.focus(), s
    }, t.prototype.displayOnTop = function(e) {
        if (e === void 0 || e.url === void 0 || "string" != typeof e.url || e.action === void 0 || "function" != typeof e.action) return e.callback !== void 0 || "function" == typeof e.callback ? (e.callback(), void 0) : void 0;
        var t = document.createElement("div"),
            n = e.url,
            r = e.action,
            i = e.callback;
        return t.setAttribute("id", "spilgames-splash-screen-sample"), document.body.appendChild(t), t.style.left = "0", t.style.top = "0", t.style.width = "100%", t.style.height = "100%", t.style.position = "absolute", t.style.zIndex = "10000", t.onclick = r, n && (t.style.background = "url('" + n + "') center center no-repeat #FFF"), window.setTimeout(function() {
            var e = document.getElementById("spilgames-splash-screen-sample");
            e.parentNode.removeChild(e), i && i()
        }, 2e3), t
    }, n.prototype.get = function(e) {
        for (var t = this.dataStore, n = e.split("."), r = n.length, i = 0; r - 1 > i; i++) {
            if (!t[n[i]]) return null;
            t = t[n[i]]
        }
        return t[n[r - 1]] || null
    }, n.prototype.put = function(e, t) {
        for (var n = this.dataStore, r = e.split("."), i = r.length, s = 0; i - 1 > s; s++) {
            var o = r[s];
            n[o] || (n[o] = {}), n = n[o]
        }
        n[r[i - 1]] = t
    }, n.prototype.set = function(e, t) {
        this.put(e, t);
        var n = Date.parse(new Date);
        return this.notify({
            type: "new",
            key: e,
            current: t,
            previous: null,
            timestamp: n
        }), t
    }, n.prototype.update = function(e, t) {
        var n, r, i = null;
        return this.get(e) ? (n = "update", i = this.get(e)) : n = "new", this.put(e, t), r = Date.parse(new Date), this.notify({
            type: n,
            key: e,
            current: t,
            previous: i,
            timestamp: r
        }), t
    }, n.prototype.remove = function(e) {
        if (this.get(e)) {
            var t, n = this.get(e);
            return this.put(e, null), t = Date.parse(new Date), this.notify({
                type: "remove",
                key: e,
                current: null,
                previous: n,
                timestamp: t
            }), !0
        }
        return !1
    }, n.prototype._setCache = function(e) {
        this.dataStore = e
    }, n.prototype._getCache = function() {
        return this.dataStore
    }, n.prototype.notify = function(e) {
        if (this.IS_MASTER) {
            var t = (new f({
                type: "datachange",
                callbackId: null,
                data: e
            })).encode();
            return window.postMessage(t, "*"), t
        }
    }, r.prototype._performAction = function(e) {
        var t = new f(e.data || {}),
            n = this.messenger,
            r = this.subscribers || {};
        if (t && t.type && t.data) switch (t.type) {
            case "gameEvent":
                t.data[0] && r[t.data[0]] && r[t.data[0]].length > 0 ? r[t.data[0]].forEach(function(e) {
                    e.call(this), n._postMessage([t.data[0], {
                            origin: "slave"
                        },
                        null
                    ], null, "gameState")
                }) : t.data[0] && t.data[1] && "slave" === t.data[1].origin && "function" == typeof SWFtoJS && SWFtoJS({
                    call: t.data[0],
                    params: {}
                });
                break;
            case "gameState":
                t.data[0] && t.data[1] && "slave" === t.data[1].origin && (this.gameState = t.data[0])
        }
    }, r.prototype.on = function(e, t) {
        this.IS_SLAVE && (this.subscribers[e] || (this.subscribers[e] = []), this.subscribers[e].push(t))
    }, r.prototype.emit = function(e) {
        if (!this.IS_MASTER) throw Error("Only the master environment can emit game events");
        if (!this.moduleReady) throw Error("This method cannot be called before the API is loaded");
        if (e === this.gameState) throw Error("The game is already in state: `" + e + "`");
        this.messenger._postMessage([e, {
                origin: "master"
            },
            null
        ], null, "gameEvent")
    }, i.prototype._setupMasterEvent = function() {
        this.IS_MASTER && this.messenger.subscribe("gameapi.score", this.submit, this)
    }, i.prototype.submit = function(e) {
        if (!this.moduleReady) throw Error("This method cannot be called before the API is loaded");
        return this.IS_MASTER ? "function" == typeof SWFtoJS && SWFtoJS({
            call: "UPDATE_HIGHSCORE",
            params: {
                score: e
            }
        }) : (this.messenger._postMessage(e, void 0, "gameapi.score"), this.messenger._postMessage(["log.gameapi.score.submit", {
                origin: "slave",
                score: e
            },
            null
        ], null, "log")), {
            success: !0,
            value: e
        }
    }, s.prototype.init = function() {
        this._setupEvents()
    }, s.prototype._setupEvents = function() {
        var e = this.messenger;
        this.isMaster ? (SpilGames(["JSLib"], function(t) {
            t.subscribe("ad.request.accepted", function(t) {
                !0 === t && (SpilGames("game.ad.accepted", !0), e._postMessage(!0, void 0, "ad.request.accepted"))
            }), t.subscribe("ad.complete", function() {
                e._postMessage("", "", "ad.complete")
            })
        }), this.messenger.subscribe("game.ad.request", this._triggerAd, this)) : (this.messenger.subscribe("ad.request.accepted", this._onAdAccepted, this), this.messenger.subscribe("ad.complete", this._onAdCompleted, this))
    }, s.prototype._triggerAd = function() {
        SpilGames("game.ad.request")
    }, s.prototype._runCallback = function(e) {
        this._callbacks[e] && (this._callbacks[e](), this._callbacks[e] = !1)
    }, s.prototype.request = function(e, t) {
        var n = this;
        if ("function" != typeof e) throw Error("pauseGame argument should be a function");
        if ("function" != typeof t) throw Error("resumeGame argument should be a function");
        if (!this.moduleReady) throw Error("This method cannot be called before the API is loaded");
        this._callbacks.pause = e, this._callbacks.resume = t, this.messenger._postMessage(void 0, void 0, "game.ad.request"), this.isMaster || this.messenger._postMessage(["log.gameapi.ad.requested", {
                origin: "slave"
            },
            null
        ], null, "log"), this.timeout = setTimeout(function() {
            n._requestTimeout()
        }, this.timeoutAfter)
    }, s.prototype._onAdAccepted = function(e) {
        var t = this.messenger;
        this.timeout && clearTimeout(this.timeout), !this.isMaster && e && (t._postMessage(["log.gameapi.ad.start", {
                origin: "slave"
            },
            null
        ], null, "log"), this._runCallback("pause"))
    }, s.prototype._onAdCompleted = function() {
        var e = this.messenger;
        this.isMaster || e._postMessage(["log.gameapi.ad.complete", {
                origin: "slave"
            },
            null
        ], null, "log"), this._runCallback("resume")
    }, s.prototype._requestTimeout = function() {
        this._onAdCompleted()
    }, o.prototype._setupEvents = function() {
        this.IS_MASTER && this.messenger.subscribe("gameapi.gameevent", this.emit, this)
    }, o.prototype._validateEvent = function(e) {
        var t = !1;
        return this.events[e] && this.events[e] !== void 0 && (t = !0), t
    }, o.prototype.emit = function(e, t) {
        if (!this.moduleReady) throw Error("This method cannot be called before the API is loaded");
        this._validateEvent(e) ? this.IS_MASTER ? "function" == typeof SWFtoJS && SWFtoJS({
            call: e
        }) : (this.messenger._postMessage(e, void 0, "gameapi.gameevent"), this.messenger._postMessage(["log.gameapi.gameevent.emit", {
                origin: "slave",
                evt: e
            },
            null
        ], null, "log")) : this.IS_MASTER || this.messenger._postMessage(["log.gameapi.gameevent.emit", {
                origin: "slave"
            },
            null
        ], null, "log")
    }, u.prototype.init = function(e) {
        e = e || {}, this.data = e.data || this.data;
        var t = this.data && this.data.game && this.data.game.applicationId ? this.data.game.applicationId : null,
            n = new Date,
            r = window.location.hostname;
        (this.IS_SLAVE || v.isWrapped()) && this.startInternalTracking(t, n, r)
    }, u.prototype._createEventObject = function(e, t, n) {
        return {
            eventCategory: e,
            eventAction: t,
            properties: n
        }
    }, u.prototype._sendSETEvent = function(e, t, n) {
        return this.messenger && (this.IS_SLAVE || v.isWrapped()) && this.messenger.post("tracker.event." + e, t, n), t
    }, u.prototype.trackGamePlay = function(e) {
        if (!this.gamePlayTracking.started) return !1;
        var t = this.gamePlayTracking.gid,
            n = this.gamePlayTracking.timestamp,
            r = this.gamePlayTracking.host,
            i = this._createEventObject("game", "gameplay", {
                applicationId: t,
                start: n,
                host: r
            });
        return this._sendSETEvent("express", i, e), i
    }, u.prototype.trackTimeInGame = function(e) {
        if (!this.timeInGameTracking.started) return !1;
        var t = this.timeInGameTracking.gid,
            n = this.timeInGameTracking.timestamp,
            r = this._createEventObject("game", "heartbeat", {
                applicationId: t,
                start: n
            });
        return this._sendSETEvent("express", r, e), r
    }, u.prototype.startInternalTracking = function(e, t, n) {
        var r = this,
            i = 6e4,
            s = function(e) {
                if (!e) throw "Could not save the time in game"
            };
        return this.moduleReady ? e ? (this.gamePlayTracking.gid = e, this.gamePlayTracking.timestamp = Date.parse(t), this.gamePlayTracking.host = n, this.gamePlayTracking.started = !0, this.timeInGameTracking.gid = e, this.timeInGameTracking.timestamp = Date.parse(t), this.timeInGameTracking.started = !0, this.trackGamePlay(function(e) {
            if (!e) throw "Could not save the game play"
        }), this.trackTimeInGame(s), setInterval(function() {
            r.trackTimeInGame(s)
        }, i), this.gamePlayTracking.started && this.timeInGameTracking.started) : {
            error: "No application ID defined for this game"
        } : {
            error: "This method cannot be called before the API is loaded"
        }
    }, a.prototype.init = function(e) {
        e = e || {}, this.data = e.data || this.data
    }, a.prototype.getLogo = function(e) {
        if (!this.moduleReady) return {
            error: "This method cannot be called before the API is loaded"
        };
        var t = this.IS_MASTER ? "master" : "slave";
        this.messenger._postMessage(["log.branding.getlogo", {
                origin: t
            },
            null
        ], null, "log");
        var n, r, i = {
            type: {
                type: "String",
                values: ["png"]
            },
            width: "Number",
            height: "Number"
        };
        return n = this._getLink("logo"), e && "object" == typeof e && (r = v.validateSchema(i, e), r.error && (n.error = r.error)), n
    }, a.prototype.getLink = function(e) {
        if (!e) return {
            error: "No link identifier provided"
        };
        var t = this.listLinks();
        if (-1 !== t.indexOf(e)) {
            var n = this.IS_MASTER ? "master" : "slave";
            return this.messenger._postMessage(["log.branding.getlink", {
                    origin: n,
                    linkName: e
                },
                null
            ], null, "log"), this._getLink(e)
        }
        return {
            error: "Invalid option: '" + e + "'",
            action: function() {}
        }
    }, a.prototype._getLink = function(e) {
        if (!e) return {
            error: "No link identifier provided"
        };
        var t = this.data && this.data.branding ? this.data.branding : {};
        return t && t[e] ? {
            linkName: e,
            image: t[e].image || !1,
            action: this._executeHandler.bind(this, e)
        } : {
            error: "Invalid option: '" + e + "'",
            action: function() {}
        }
    }, a.prototype._getGMLink = function(e) {
        var t = null;
        if (!e) return {
            error: "No link identifier provided"
        };
        var n = this.data && this.data.branding ? this.data.branding : {};
        return n && n[e] ? (t = this._tagUrl(n[e].url, e), {
            linkName: e,
            url: t
        }) : {
            error: "Invalid option: '" + e + "'",
            url: null
        }
    }, a.prototype.getLinks = function() {
        var e = {},
            t = this.listLinks();
        if (0 === t.length) e = {
            more_games: {
                action: function() {}
            }
        };
        else
            for (var n = 0; t.length > n; n++) {
                var r = t[n];
                e[r] = this._getLink(r)
            }
        return e
    }, a.prototype._executeHandler = function(e) {
        var t = this.data && this.data.branding ? this.data.branding : {},
            n = t[e],
            r = n.handler,
            i = this._tagUrl(n.url, e);
        if (n.url && n.url.length > 0 && r && this.components[r]) {
            var s = this.IS_MASTER ? "master" : "slave";
            return this.messenger._postMessage(["log.branding.linkAction", {
                    origin: s,
                    linkName: e
                },
                null
            ], null, "log"), this.components[r]({
                url: i
            })
        }
        return function() {}
    }, a.prototype.listLinks = function() {
        var e = [],
            t = this.data && this.data.branding ? this.data.branding : {},
            n = Object.keys(t);
        return e = n.filter(function(e) {
            return !t[e].blacklisted
        })
    }, a.prototype.getSplashScreen = function() {
        var e, t = this.IS_MASTER ? "master" : "slave";
        if (this.data && this.data.branding && this.data.branding.splash_screen) {
            var n = !0;
            this.data.branding.splash_screen.image || this.data.branding.splash_screen.url || (n = !1), e = {
                show: n,
                action: this._getLink("splash_screen").action || function() {}
            }
        } else e = {
            show: !0,
            action: function() {}
        };
        return this.messenger._postMessage(["log.branding.splashScreen", {
                origin: t
            },
            null
        ], null, "log"), e
    }, a.prototype.displaySplashScreen = function(e) {
        if ("function" != typeof e) throw Error("argument  passed to displaySplashScreen method should be a function");
        var t = this.IS_MASTER ? "master" : "slave",
            n = this._getLink("logo").image;
        n && this.getSplashScreen().show ? ("master" !== t && this.messenger._postMessage(["log.branding.displaySplashScreen", {
                origin: t
            },
            null
        ], null, "log"), this.components.displayOnTop({
            url: n,
            action: this.getSplashScreen().action,
            callback: e
        })) : e()
    }, a.prototype._tagUrl = function(e, t) {
        var n, r, i, s = this.data && this.data.portal ? this.data.portal : {},
            o = this.data && this.data.game ? this.data.game : {},
            u = parseInt(s.siteId, 10);
        if ("string" != typeof e) throw Error("No url specified");
        return n = "string" == typeof t ? t : "logo", r = "brandedgames_" + (u > 0 && 500 > u ? "internal" : "external"), i = ["utm_medium=" + r, "utm_campaign=" + o.applicationId, "utm_source=" + s.host, "utm_content=" + n].join("&"), e += e.indexOf("?") > -1 ? "&" : "?", e + i
    }, f.prototype.encode = function() {
        var e = ["gameapi", this.type, this.callbackId, this.data ? JSON.stringify(this.data) : ""].join("|");
        return e
    }, c.prototype._postMessage = function(e, t, n) {
        var r, i;
        r = v.isArray(e) && "function" == typeof e[e.length - 1] ? this._callbacks.push(e.pop()) - 1 : t, i = (new f({
            type: n || "jslib",
            callbackId: r,
            data: e
        })).encode(), this._target.postMessage(i, "*")
    }, c.prototype._callJSLib = function() {
        SpilGames.apply(SpilGames, v.argsToArray(arguments))
    }, c.prototype._setupEventListener = function() {
        window.addEventListener ? window.addEventListener("message", this._handleMessage.bind(this), !1) : window.attachEvent && window.attachEvent("onmessage", this._handleMessage.bind(this))
    }, c.prototype._handleMessage = function(e) {
        var t, n, r, i, s = this,
            o = new f(e.data);
        if (o)
            if (t = o.type, n = o.callbackId, r = o.data, i = this._callbacks[n] || !1, this.IS_MASTER) switch (t) {
                case "jslib":
                    "Array" === r.constructor.name && r.push(function(e) {
                        s._postMessage(e, n)
                    }), this._callJSLib.apply(this, r);
                    break;
                case "ugapi":
                    this._handleUGARequest(e);
                    break;
                case "datachange":
                    this._postMessage(r, null, "datachange");
                    break;
                default:
                    this.publish(t, r)
            } else this.IS_SLAVE && ("function" == typeof i ? (delete this._callbacks[n], i(r)) : "datachange" === t || "jslib" !== t && this.publish(t, r));
        return !1
    }, c.prototype._handleUGARequest = function(e) {
        var t, n, r, i = this,
            s = new f(e.data);
        if (s) switch (t = s.data[0], n = s.callbackId, r = s.data[1] ? s.data[1] : null, t) {
            case "GameAPI.data":
                i._postMessage(this.dataStore._getCache(), n, "ugapi");
                break;
            case "GameAPI.isReady":
                i._postMessage({
                    isready: this.api.isReady
                }, n, "ugapi")
        }
    }, c.prototype.post = function() {
        var e = v.argsToArray(arguments);
        return this.IS_SLAVE ? this._postMessage(e) : this._callJSLib.apply(this, e), this
    }, c.prototype.publish = function(e, t) {
        return this._channels[e] && this._channels[e].forEach(function(e) {
            try {
                e.fn.call(e.ctx, t)
            } catch (n) {}
        }), this
    }, c.prototype.subscribe = function(e, t, n) {
        if ("function" != typeof t) throw Error("Callback has to be a function");
        if ("string" != typeof e) throw Error("Channel name has to be a string");
        return this._channels[e] || (this._channels[e] = []), this._channels[e].push({
            fn: t,
            ctx: n
        }), this
    }, c.prototype.unsubscribe = function(e, t) {
        return this._channels[e] && "function" == typeof t && (this._channels[e] = this._channels[e].filter(function(e) {
            return e.fn !== t
        })), this
    }, c.prototype.subscribeOnce = function(e, t, n) {
        function r(n) {
            i.unsubscribe(e, r), t.call(this, n)
        }
        var i = this;
        return this.subscribe(e, r, n)
    }, c.prototype.requestFromParent = function(e, t, n) {
        if (!this.IS_SLAVE) throw "You are the parent, stop talking to yourself";
        t = t || {}, this._postMessage([e, t, n], null, "ugapi")
    }, h.prototype._setRole = function() {
        var e = v.getRole();
        this.IS_MASTER = e.IS_MASTER, this.IS_SLAVE = e.IS_SLAVE, this.IS_STANDALONE = e.IS_STANDALONE
    }, h.prototype._getTarget = function() {
        if (this.IS_STANDALONE) return window;
        var e = document.getElementById("iframegame"),
            t = e && e.contentWindow ? e.contentWindow : window.parent;
        return this.IS_MASTER ? t : window.parent
    }, h.prototype.loadAPI = function(e, t) {
        function r(t) {
            return f.IS_MASTER && (t = i(t)), f.isReady = !0, f.Branding.moduleReady = !0, f.__.EventTracking.moduleReady = !0, f.GameBreak.moduleReady = !0, f.Game.moduleReady = !0, f.Score.moduleReady = !0, f.GameEvent.moduleReady = !0, f.Branding.init({
                data: t
            }), f.__.EventTracking.init({
                data: t
            }), f.GameBreak.init(), f.__.messenger._postMessage(["log.gameapi.loadapi.finish", {
                    origin: l,
                    version: f.version
                },
                null
            ], null, "log"), e(f)
        }

        function i(e) {
            var t = e.game || {},
                n = e.user || {},
                r = e.portal || {},
                i = e.branding || {};
            return m.getLocalConfig({
                game: t,
                user: n,
                portal: r,
                branding: i
            })
        }

        function s() {
            f.__.messenger.requestFromParent("GameAPI.data", {}, function(e) {
                r(e)
            })
        }

        function o() {
            f.IS_STANDALONE = !0, f.IS_MASTER = !0, f.IS_SLAVE = !0, f.__.dataStore = new n({
                isMaster: !0
            }), t = t || null, m.setupStandaloneMode(t, function(e) {
                f.__.dataStore._setCache(i(e)), r(e)
            })
        }

        function u() {
            f.__.messenger.requestFromParent("GameAPI.isReady", {}, function(e) {
                a && clearTimeout(a), e.isready ? s() : 5 > c ? (c++, setTimeout(u, 500)) : s()
            })
        }
        var a, f = this,
            l = this.IS_MASTER ? "master" : "slave",
            c = 0;
        if ("function" != typeof e) throw Error("argument passed to loadAPI method should be a function");
        return !0 === this.isReady ? (window.console && window.console.log && console.log("WARNING: Detected multiple executions of GameAPI.loadAPI(). This method should only be executed once per page load!"), e(f)) : (this.__.messenger._postMessage(["log.gameapi.loadapi.start", {
                origin: l,
                version: f.version,
                spildata: t
            },
            null
        ], null, "log"), this.IS_STANDALONE ? o() : this.IS_MASTER ? m.getGameConfig().then(function(e) {
            m.getBrandingConfig(e).then(function(t) {
                e && !e.isError && (e.branding = t.branding, f.__.dataStore._setCache(i(e))), r(e)
            })
        }) : (a = setTimeout(o, 600), u()), void 0)
    };
    var g = new h(n, c, a, u, s);
    "function" == typeof define && define.amd && define("GameAPI", g), e.GameAPI = g
})(window),
function() {
    "use strict";

    function e(e) {
        e && (e.setTargetValueAtTime || (e.setTargetValueAtTime = e.setTargetAtTime))
    }
    window.hasOwnProperty("AudioContext") && (window.webkitAudioContext = AudioContext, AudioContext.prototype.hasOwnProperty("internal_createGain") || (AudioContext.prototype.internal_createGain = AudioContext.prototype.createGain, AudioContext.prototype.createGain = function() {
        var n = this.internal_createGain();
        return e(n.gain), n
    }), AudioContext.prototype.hasOwnProperty("internal_createDelay") || (AudioContext.prototype.internal_createDelay = AudioContext.prototype.createDelay, AudioContext.prototype.createDelay = function() {
        var n = this.internal_createDelay();
        return e(n.delayTime), n
    }), AudioContext.prototype.hasOwnProperty("internal_createBufferSource") || (AudioContext.prototype.internal_createBufferSource = AudioContext.prototype.createBufferSource, AudioContext.prototype.createBufferSource = function() {
        var n = this.internal_createBufferSource();
        return n.noteOn || (n.noteOn = n.start), n.noteGrainOn || (n.noteGrainOn = n.start), n.noteOff || (n.noteOff = n.stop), e(n.playbackRate), n
    }), AudioContext.prototype.hasOwnProperty("internal_createDynamicsCompressor") || (AudioContext.prototype.internal_createDynamicsCompressor = AudioContext.prototype.createDynamicsCompressor, AudioContext.prototype.createDynamicsCompressor = function() {
        var n = this.internal_createDynamicsCompressor();
        return e(n.threshold), e(n.knee), e(n.ratio), e(n.reduction), e(n.attack), e(n.release), n
    }), AudioContext.prototype.hasOwnProperty("internal_createBiquadFilter") || (AudioContext.prototype.internal_createBiquadFilter = AudioContext.prototype.createBiquadFilter, AudioContext.prototype.createBiquadFilter = function() {
        var n = this.internal_createBiquadFilter();
        e(n.frequency), e(n.detune), e(n.Q), e(n.gain);
        for (var r = ["LOWPASS", "HIGHPASS", "BANDPASS", "LOWSHELF", "HIGHSHELF", "PEAKING", "NOTCH", "ALLPASS"], i = 0; r.length > i; ++i) {
            var s = r[i],
                o = s.toLowerCase();
            n.hasOwnProperty(s) || (n[s] = o)
        }
        return n
    }), AudioContext.prototype.hasOwnProperty("internal_createOscillator") || AudioContext.prototype.hasOwnProperty("createOscillator") && (AudioContext.prototype.internal_createOscillator = AudioContext.prototype.createOscillator, AudioContext.prototype.createOscillator = function() {
        var n = this.internal_createOscillator();
        n.noteOn || (n.noteOn = n.start), n.noteOff || (n.noteOff = n.stop), e(n.frequency), e(n.detune);
        for (var r = ["SINE", "SQUARE", "SAWTOOTH", "TRIANGLE", "CUSTOM"], i = 0; r.length > i; ++i) {
            var s = r[i],
                o = s.toLowerCase();
            n.hasOwnProperty(s) || (n[s] = o)
        }
        return n.hasOwnProperty("setWaveTable") || (n.setWaveTable = n.setPeriodicTable), n
    }), AudioContext.prototype.hasOwnProperty("internal_createPanner") || (AudioContext.prototype.internal_createPanner = AudioContext.prototype.createPanner, AudioContext.prototype.createPanner = function() {
        var e = this.internal_createPanner(),
            t = {
                EQUALPOWER: "equalpower",
                HRTF: "HRTF",
                LINEAR_DISTANCE: "linear",
                INVERSE_DISTANCE: "inverse",
                EXPONENTIAL_DISTANCE: "exponential"
            };
        for (var n in t) {
            var r = t[n];
            e.hasOwnProperty(n) || (e[n] = r)
        }
        return e
    }), AudioContext.prototype.hasOwnProperty("createGainNode") || (AudioContext.prototype.createGainNode = AudioContext.prototype.createGain), AudioContext.prototype.hasOwnProperty("createDelayNode") || (AudioContext.prototype.createDelayNode = AudioContext.prototype.createDelay), AudioContext.prototype.hasOwnProperty("createJavaScriptNode") || (AudioContext.prototype.createJavaScriptNode = AudioContext.prototype.createScriptProcessor), AudioContext.prototype.hasOwnProperty("createWaveTable") || (AudioContext.prototype.createWaveTable = AudioContext.prototype.createPeriodicWave))
}(window)