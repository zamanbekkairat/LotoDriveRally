var __assign =
    (this && this.__assign) ||
    function() {
        return (__assign =
            Object.assign ||
            function(t) {
                for (var i, n = 1, s = arguments.length; n < s; n++)
                    for (var a in (i = arguments[n]))
                        Object.prototype.hasOwnProperty.call(i, a) && (t[a] = i[a]);
                return t;
            }).apply(this, arguments);
    },
    CountUp = (function() {
        function t(t, i, n) {
            var s = this;
            (this.endVal = i),
            (this.options = n),
            (this.version = "2.5.0"),
            (this.defaults = {
                startVal: 0,
                decimalPlaces: 0,
                duration: 2,
                useEasing: !0,
                useGrouping: !0,
                useIndianSeparators: !1,
                smartEasingThreshold: 999,
                smartEasingAmount: 333,
                separator: ",",
                decimal: ".",
                prefix: "",
                suffix: "",
                enableScrollSpy: !1,
                scrollSpyDelay: 200,
                scrollSpyOnce: !1,
            }),
            (this.finalEndVal = null),
            (this.useEasing = !0),
            (this.countDown = !1),
            (this.error = ""),
            (this.startVal = 0),
            (this.paused = !0),
            (this.once = !1),
            (this.count = function(t) {
                s.startTime || (s.startTime = t);
                var i = t - s.startTime;
                (s.remaining = s.duration - i),
                s.useEasing ?
                    s.countDown ?
                    (s.frameVal =
                        s.startVal -
                        s.easingFn(i, 0, s.startVal - s.endVal, s.duration)) :
                    (s.frameVal = s.easingFn(
                        i,
                        s.startVal,
                        s.endVal - s.startVal,
                        s.duration
                    )) :
                    (s.frameVal =
                        s.startVal + (s.endVal - s.startVal) * (i / s.duration));
                var n = s.countDown ? s.frameVal < s.endVal : s.frameVal > s.endVal;
                (s.frameVal = n ? s.endVal : s.frameVal),
                (s.frameVal = Number(s.frameVal.toFixed(s.options.decimalPlaces))),
                s.printValue(s.frameVal),
                    i < s.duration ?
                    (s.rAF = requestAnimationFrame(s.count)) :
                    null !== s.finalEndVal ?
                    s.update(s.finalEndVal) :
                    s.options.onCompleteCallback && s.options.onCompleteCallback();
            }),
            (this.formatNumber = function(t) {
                var i,
                    n,
                    a,
                    e,
                    o = t < 0 ? "-" : "";
                i = Math.abs(t).toFixed(s.options.decimalPlaces);
                var r = (i += "").split(".");
                if (
                    ((n = r[0]),
                        (a = r.length > 1 ? s.options.decimal + r[1] : ""),
                        s.options.useGrouping)
                ) {
                    e = "";
                    for (var l = 3, h = 0, u = 0, p = n.length; u < p; ++u)
                        s.options.useIndianSeparators && 4 === u && ((l = 2), (h = 1)),
                        0 !== u && h % l == 0 && (e = s.options.separator + e),
                        h++,
                        (e = n[p - u - 1] + e);
                    n = e;
                }
                return (
                    s.options.numerals &&
                    s.options.numerals.length &&
                    ((n = n.replace(/[0-9]/g, function(t) {
                            return s.options.numerals[+t];
                        })),
                        (a = a.replace(/[0-9]/g, function(t) {
                            return s.options.numerals[+t];
                        }))),
                    o + s.options.prefix + n + a + s.options.suffix
                );
            }),
            (this.easeOutExpo = function(t, i, n, s) {
                return (n * (1 - Math.pow(2, (-10 * t) / s)) * 1024) / 1023 + i;
            }),
            (this.options = __assign(__assign({}, this.defaults), n)),
            (this.formattingFn = this.options.formattingFn ?
                this.options.formattingFn :
                this.formatNumber),
            (this.easingFn = this.options.easingFn ?
                this.options.easingFn :
                this.easeOutExpo),
            (this.startVal = this.validateValue(this.options.startVal)),
            (this.frameVal = this.startVal),
            (this.endVal = this.validateValue(i)),
            (this.options.decimalPlaces = Math.max(this.options.decimalPlaces)),
            this.resetDuration(),
                (this.options.separator = String(this.options.separator)),
                (this.useEasing = this.options.useEasing),
                "" === this.options.separator && (this.options.useGrouping = !1),
                (this.el = "string" == typeof t ? document.getElementById(t) : t),
                this.el ?
                this.printValue(this.startVal) :
                (this.error = "[CountUp] target is null or undefined"),
                "undefined" != typeof window &&
                this.options.enableScrollSpy &&
                (this.error ?
                    console.error(this.error, t) :
                    ((window.onScrollFns = window.onScrollFns || []),
                        window.onScrollFns.push(function() {
                            return s.handleScroll(s);
                        }),
                        (window.onscroll = function() {
                            window.onScrollFns.forEach(function(t) {
                                return t();
                            });
                        }),
                        this.handleScroll(this)));
        }
        return (
            (t.prototype.handleScroll = function(t) {
                if (t && window && !t.once) {
                    var i = window.innerHeight + window.scrollY,
                        n = t.el.getBoundingClientRect(),
                        s = n.top + window.pageYOffset,
                        a = n.top + n.height + window.pageYOffset;
                    a < i && a > window.scrollY && t.paused ?
                        ((t.paused = !1),
                            setTimeout(function() {
                                return t.start();
                            }, t.options.scrollSpyDelay),
                            t.options.scrollSpyOnce && (t.once = !0)) :
                        (window.scrollY > a || s > i) && !t.paused && t.reset();
                }
            }),
            (t.prototype.determineDirectionAndSmartEasing = function() {
                var t = this.finalEndVal ? this.finalEndVal : this.endVal;
                this.countDown = this.startVal > t;
                var i = t - this.startVal;
                if (
                    Math.abs(i) > this.options.smartEasingThreshold &&
                    this.options.useEasing
                ) {
                    this.finalEndVal = t;
                    var n = this.countDown ? 1 : -1;
                    (this.endVal = t + n * this.options.smartEasingAmount),
                    (this.duration = this.duration / 2);
                } else(this.endVal = t), (this.finalEndVal = null);
                null !== this.finalEndVal ?
                    (this.useEasing = !1) :
                    (this.useEasing = this.options.useEasing);
            }),
            (t.prototype.start = function(t) {
                this.error ||
                    (t && (this.options.onCompleteCallback = t),
                        this.duration > 0 ?
                        (this.determineDirectionAndSmartEasing(),
                            (this.paused = !1),
                            (this.rAF = requestAnimationFrame(this.count))) :
                        this.printValue(this.endVal));
            }),
            (t.prototype.pauseResume = function() {
                this.paused ?
                    ((this.startTime = null),
                        (this.duration = this.remaining),
                        (this.startVal = this.frameVal),
                        this.determineDirectionAndSmartEasing(),
                        (this.rAF = requestAnimationFrame(this.count))) :
                    cancelAnimationFrame(this.rAF),
                    (this.paused = !this.paused);
            }),
            (t.prototype.reset = function() {
                cancelAnimationFrame(this.rAF),
                    (this.paused = !0),
                    this.resetDuration(),
                    (this.startVal = this.validateValue(this.options.startVal)),
                    (this.frameVal = this.startVal),
                    this.printValue(this.startVal);
            }),
            (t.prototype.update = function(t) {
                cancelAnimationFrame(this.rAF),
                    (this.startTime = null),
                    (this.endVal = this.validateValue(t)),
                    this.endVal !== this.frameVal &&
                    ((this.startVal = this.frameVal),
                        null == this.finalEndVal && this.resetDuration(),
                        (this.finalEndVal = null),
                        this.determineDirectionAndSmartEasing(),
                        (this.rAF = requestAnimationFrame(this.count)));
            }),
            (t.prototype.printValue = function(t) {
                var i = this.formattingFn(t);
                this.el &&
                    ("INPUT" === this.el.tagName ?
                        (this.el.value = i) :
                        "text" === this.el.tagName || "tspan" === this.el.tagName ?
                        (this.el.textContent = i) :
                        (this.el.innerHTML = i));
            }),
            (t.prototype.ensureNumber = function(t) {
                return "number" == typeof t && !isNaN(t);
            }),
            (t.prototype.validateValue = function(t) {
                var i = Number(t);
                return this.ensureNumber(i) ?
                    i :
                    ((this.error = "[CountUp] invalid start or end value: ".concat(t)),
                        null);
            }),
            (t.prototype.resetDuration = function() {
                (this.startTime = null),
                (this.duration = 1e3 * Number(this.options.duration)),
                (this.remaining = this.duration);
            }),
            t
        );
    })();

fetch(
        "https://sz.kz/srvNew?srv=lrRating&lotteryRace=38"
    )
    .then(resp => {
        if (resp.status !== 200) {
            throw new Error();
        }
        return resp;
    })
    .then(resp => resp.json())
    .then(data => {
        allScore = data["allScore"];

        let scoreAll = document.querySelectorAll(".allScoreDesk ");
        let nakopitel = Math.floor(allScore * 0.02);
        let summ = 4265000 + nakopitel;
        let allScoreMathStr = summ
            .toString()
            .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
        scoreAll.forEach(e => {
            e.textContent = allScoreMathStr;
        });

        var forsazhDesk = new CountUp("outForsazh", summ, {
            startVal: 4265000,
            enableScrollSpy: true,
            separator: " ",
            useEasing: true,
            smartEasingThreshold: 10000,
            scrollSpyDelay: 0,
        });
    });

setTimeout(() => {
    // дата завершения таймера 
    const endTimerForsazhDesk = 'Feb 29 2024, 20:00 GMT+0600';

    // приводим к стандартному виду 03:04:05, вместо 3:4:5
    function makeCorrectDate(uncorrectDate) {
        let correctDate = uncorrectDate;
        if (uncorrectDate < 10) {
            correctDate = '0' + uncorrectDate;
        }
        return correctDate;
    }

    // сколько времени осталось
    function getDateRemaining(timesup) {
        // total = оставшееся вермя
        var total = Date.parse(timesup) - Date.now();
        var minutes = Math.floor((total / 1000 / 60) % 60);
        var hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        var days = Math.floor(total / (1000 * 60 * 60 * 24));
        // вывод объектов
        return {
            'total': total,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            // 'seconds': seconds
        };
    }

    // инициализация таймера на самом сайте
    function setTime(id, timesup) {
        let timer = document.getElementById(id),
            days = document.querySelectorAll('.daysForsazhDesk'),
            hours = document.querySelectorAll('.hoursForsazhDesk'),
            minutes = document.querySelectorAll('.minutesForsazhDesk'),
            // обновление таймера каждые 1000мс
            timeInterval = setInterval(update, 0);

        function update() {
            // результат функции getDateRemaining
            let total = getDateRemaining(timesup);
            // Проверка на ноль
            var nowdate = Date.now();
            if (nowdate <= Date.parse(endTimerForsazhDesk)) {
                var nowdate = Date.now();
                days.forEach(e => {
                    e.textContent = makeCorrectDate(total.days);
                })
                hours.forEach(e => {
                    e.textContent = makeCorrectDate(total.hours);
                })
                minutes.forEach(e => {
                    e.textContent = makeCorrectDate(total.minutes);
                })

            } else {
                days.textContent = 0;
                hours.textContent = 0;
                minutes.textContent = 0;
            }

        }
    }
    setTime('timerForsazhDesk', endTimerForsazhDesk);
}, 1000);