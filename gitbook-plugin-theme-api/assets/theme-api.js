require(["gitbook", "jquery"],
function(t, e) {
    function n(e) {
        r = t.storage.get("themeApi", {
            split: e.split,
            currentLang: null
        })
    }
    function a() {
        t.storage.set("themeApi", r),
        i()
    }
    function i() {
        e(".book").toggleClass("two-columns", r.split),
        s = e(".api-method-sample"),
        s.each(function() {
            var t = !(e(this).data("lang") == r.currentLang);
            e(this).toggleClass("hidden", t)
        })
    }
    function o() {
        t.toolbar.removeButtons(c),
        c = [],
        s = e(".api-method-sample");
        var n = [],
        i = !1;
        s.each(function() {
            var t, a, o = !1,
            s = e(this).data("lang"),
            c = e(this).data("name");
            s == r.currentLang && (i = !0, o = !0),
            t = e.grep(n,
            function(t) {
                return t.name == c
            }),
            a = !!t.length,
            a || n.push({
                name: c,
                lang: s,
                "default": o
            })
        }),
        n.reverse(),
        e.each(n,
        function(o, s) {
            var l, g = s["default"] || !i && o == n.length - 1;
            l = t.toolbar.createButton({
                text: s.name,
                position: "right",
                className: "lang-switcher" + (g ? " active": ""),
                onClick: function(t) {
                    r.currentLang = s.lang,
                    a(),
                    e(".btn.lang-switcher.active").removeClass("active"),
                    e(t.currentTarget).addClass("active")
                }
            }),
            c.push(l),
            g && (r.currentLang = s.lang)
        })
    }
    var s, r, c = [],
    l = [{
        config: "light",
        text: "Light",
        id: 0
    },
    {
        config: "dark",
        text: "Dark",
        id: 3
    }];
    t.events.bind("start",
    function(e, i) {
        var o = i["theme-api"];
        t.toolbar.createButton({
            icon: "fa fa-columns",
            label: "Change Layout",
            onClick: function() {
                r.split = !r.split,
                a()
            }
        }),
        t.fontsettings.setThemes(l),
        t.fontsettings.setTheme(o.theme),
        n(o)
    }),
    t.events.on("page.change",
    function() {
        o(),
        i()
    }),
    t.events.on("comment.toggled",
    function(e, n, a) {
        if (n.parents(".api-method-definition").length) {
            var i = t.state.$book.find(".page-wrapper");
            i.toggleClass("comments-open-from-definition", a && r.split)
        }
    })
});