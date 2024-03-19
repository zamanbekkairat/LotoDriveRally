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

//const bgFetch = "../script/data.json";
const bgFetch = "https://sz.kz/srvNew?srv=lrRating&lotteryRace=20&offset=101";
const btnRaceIsActive = document.querySelector(".btnRace");
window.addEventListener("load", function() {
    $(document).ready(function() {
        $(".btnReit").on("click", function() {
            btnRaceIsActive.classList.add("is-active");
            $("html,body")
                .stop()
                .animate({
                        scrollTop: $(".tabs").offset().top - 190,
                    },
                    "slow"
                );
        });

        $(".btnRace").on("click", function() {
            $("html,body")
                .stop()
                .animate({
                        scrollTop: $(".tabs").offset().top + 10,
                    },
                    "slow"
                );
        });
        $(".btn-green").on("click", function() {
            $("html,body")
                .stop()
                .animate({
                        scrollTop: $(".reiting-content").offset().top - 50,
                    },
                    "slow"
                );
        });
        const btnMainIsActive = document.querySelector(".btnMain");
        $(".btnPrize").on("click", function() {
            btnMainIsActive.classList.add("is-active");
            $("html,body")
                .stop()
                .animate({
                        scrollTop: $(".prizes").offset().top - 50,
                    },
                    "slow"
                );
        });
        const btnFaq = document.querySelector(".btnFaq");
        $(".faq1").on("click", function() {
            btnFaq.classList.add("is-active");
            $("html,body")
                .stop()
                .animate({
                        scrollTop: $(".prizes").offset().top - 50,
                    },
                    "slow"
                );
        });
    });

    const btnReit = document.querySelectorAll(".js-tab");
    const btnMain = document.querySelectorAll(".btn-reit-main");
    const reitingPlace = document.querySelectorAll(".reiting-place");
    const reitBtnSmall = this.document.querySelectorAll(".reit-btn_small");
    (contentWrapper = document.querySelectorAll(".js-content")),
    btnReit.forEach(tab => {
        tab.addEventListener("click", e => {
            contentWrapper.forEach(parent => {
                parent.classList.remove("open");
                parent.classList.add("display");
                parent.classList.add("display");
            });
            reitBtnSmall.forEach(parent => {
                parent.classList.remove("display");
                parent.classList.add("open");
            });
            btnMain.forEach(parent2 => {
                parent2.classList.toggle("display");
            });
            btnMain.forEach(parent2 => {
                parent2.classList.toggle("open");
            });
            reitingPlace.forEach(parent3 => {
                parent3.classList.add("display");
            });
        });
    });

    btnMain.forEach(tab2 => {
        tab2.addEventListener("click", e => {
            contentWrapper.forEach(parent => {
                parent.classList.remove("display");
                parent.classList.add("open");
            });
            reitBtnSmall.forEach(parent => {
                parent.classList.remove("open");
                parent.classList.add("display");
            });
            btnMain.forEach(parent2 => {
                parent2.classList.toggle("open");
            });
            btnMain.forEach(parent2 => {
                parent2.classList.toggle("display");
            });
            reitingPlace.forEach(parent3 => {
                parent3.classList.remove("display");
            });
        });
    });
});

$(document).ready(function() {
    $(".accordion__text").on("click", function() {
        if ($(this).hasClass("accordion__text-opened")) {
            $(this).removeClass("accordion__text-opened");
            $(this).siblings(".accordion__body").slideUp(300);
        } else {
            $(".accordion__text").removeClass("accordion__text-opened");
            $(this).addClass("accordion__text-opened");
            $(".accordion__body").slideUp(300);
            $(this).siblings(".accordion__body").slideDown(300);
        }
    });
});

let tab = function() {
    let tabNav = document.querySelectorAll(".tabs-nav_item"),
        tabContent = document.querySelectorAll(".tab"),
        tabName;

    tabNav.forEach(item => {
        item.addEventListener("click", selectTabNav);
    });

    function selectTabNav() {
        tabNav.forEach(item => {
            item.classList.remove("is-active");
        });
        this.classList.add("is-active");
        tabName = this.getAttribute("data-tab-name");
        selectTabContent(tabName);
    }

    function selectTabContent(tabName) {
        tabContent.forEach(item => {
            item.classList.contains(tabName) ?
                item.classList.add("is-active") :
                item.classList.remove("is-active");
        });
    }
};
tab();

var target = $(".reiting");
var targetPos = target.offset().top;
var winHeight = $(window).height();
var scrollToElem = targetPos - winHeight;

var targetPos = target.offset().top;
var winHeight = $(window).height();
var scrollToElem = targetPos - winHeight;

const list_element = document.getElementById("list");
const item_elementWrapper = document.getElementById("listWrapper");
const pagination_element = document.getElementById("pagination");

let current_page = 1;
let rows = 10;

const currentUser = () => {
    fetch(bgFetch)
        .then(resp => {
            if (resp.status !== 200) {
                throw new Error();
            }
            return resp;
        })
        .then(resp => resp.json())
        .then(data => {
            data1 = data.data;
            const dataCurrentUser = data.currentUser;
            allScore = data["allScore"];
            data = data1.slice(0, 102);

            //накопительный призовой фонд начало
            let scoreAll = document.querySelector(".allScore");

            let nakopitel = Math.floor(allScore * 0);

            let summ = 2000000;
            const wrapperMyPlace = document.querySelector(".wrapper-myPlace");

            const currentUserText = document.createElement("p");
            // currentUserText.className = "currentUserText";
            // currentUserText.innerText = "Моя позиция в рейтинге";

            const reitingUserCurrent = document.createElement("div");
            reitingUserCurrent.classList.add("myPlace");

            /* let iconCurrent = document.createElement("img");
            iconCurrent.classList.add("iconCurrent");
            iconCurrent.src = `https://sz.kz/picture?bgAvatar=${dataCurrentUser.bgToken}`;
            reitingUserCurrent.appendChild(iconCurrent); */

            const placeCurrent = document.createElement("div");
            placeCurrent.classList.add("placeSixTen");
            placeCurrent.innerText = dataCurrentUser.place;
            reitingUserCurrent.appendChild(placeCurrent);

            const dataCurrent = document.createElement("div");
            dataCurrent.classList.add("dataSixTen");
            reitingUserCurrent.appendChild(dataCurrent);

            const dataName = document.createElement("div");
            dataName.classList.add("data-name");
            dataCurrent.appendChild(dataName);

            /* const dataNickName = document.createElement("p");
            dataNickName.innerText = "Никнейм"; //надо вернуть никннейм
            dataName.appendChild(dataNickName); */

            const dataNick = document.createElement("p");
            dataNick.classList.add("data-nick");
            if (dataCurrentUser.nick == undefined) {
                dataNick.innerText = "Моя позиция"; //надо вернуть имя
            } else
                dataNick.innerText = dataCurrentUser.nick;
            dataName.appendChild(dataNick);

            const dataPoints = document.createElement("div");
            dataPoints.classList.add("data-points");
            dataCurrent.appendChild(dataPoints);

            const dataText = document.createElement("p");
            dataText.innerText = "очки"; //надо вернуть коллисчество очков
            dataPoints.appendChild(dataText);

            const dataScore = document.createElement("p");
            dataScore.classList.add("data-score");
            let InfScore = ''
            dataScore.innerText = dataCurrentUser.score / 100;
            dataPoints.appendChild(dataScore);
            /* if (dataCurrentUser.score === undefined) {
                InfScore = '';
            } else(dataCurrentUser.score
                .toString()
                .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ")); */

            wrapperMyPlace.appendChild(currentUserText);
            wrapperMyPlace.appendChild(reitingUserCurrent);

            const sharingSocials = document.querySelector(".sharing-socials");
            const tab3 = document.querySelector(".tab-3");

        });
};

currentUser();

const reiting = () => {
    fetch(bgFetch)
        .then(resp => {
            if (resp.status !== 200) {
                throw new Error();
            }
            return resp;
        })
        .then(resp => resp.json())
        .then(data => {
            data1 = data.data;
            allScore = data["allScore"];
            data = data1.slice(0, 102);

            let scoreAll = document.querySelector(".allScore");

            let nakopitel = Math.floor(allScore * 0.02);

            let summ = 2000000 + nakopitel;

            //let allScoreMathStr = summ.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");

            const first = document.querySelector("#first");
            const summFirst = 300000 + Math.floor(nakopitel * 0.15);
            //first.textContent = summFirst;
            isNaN(summ) ? summFirst : firstIncrease = new CountUp("first", summFirst, {
                enableScrollSpy: true,
                separator: " ",
                useEasing: true,
                smartEasingThreshold: 10000,
                scrollSpyOnce: true,
                scrollSpyDelay: 500,
            });

            const second = document.querySelector("#second");
            const summSecond = 250000 + Math.floor(nakopitel * 0.125);
            //second.textContent = summSecond;
            isNaN(summ) ? summFirst : secondIncrease = new CountUp("second", summSecond, {
                enableScrollSpy: true,
                separator: " ",
                useEasing: true,
                smartEasingThreshold: 10000,
                scrollSpyOnce: true,
                scrollSpyDelay: 500,
            });

            const third = document.querySelector("#third");
            const summThird = 200000 + Math.floor(nakopitel * 0.1);
            //third.textContent = summThird;
            isNaN(summ) ? summFirst : thirdIncrease = new CountUp("third", summThird, {
                enableScrollSpy: true,
                separator: " ",
                useEasing: true,
                smartEasingThreshold: 10000,
                scrollSpyOnce: true,
                scrollSpyDelay: 500,
            });
            const fourth = document.querySelector("#fourth");
            const summfourth = 150000 + Math.floor(nakopitel * 0.075);
            //third.textContent = summThird;
            isNaN(summ) ? summFirst : thirdIncrease = new CountUp("fourth", summfourth, {
                enableScrollSpy: true,
                separator: " ",
                useEasing: true,
                smartEasingThreshold: 10000,
                scrollSpyOnce: true,
                scrollSpyDelay: 500,
            });
            const fifth = document.querySelector("#fifth");
            const summFifth = 100000 + Math.floor(nakopitel * 0.05);
            //third.textContent = summThird;
            isNaN(summ) ? summFirst : thirdIncrease = new CountUp("fifth", summFifth, {
                enableScrollSpy: true,
                separator: " ",
                useEasing: true,
                smartEasingThreshold: 10000,
                scrollSpyOnce: true,
                scrollSpyDelay: 500,
            });

            const sixTen = document.querySelector("#sixTen");
            const summsixTen = 75000 + Math.floor(nakopitel * 0.2) / 5;
            //sixTen.textContent = summsixTen;
            isNaN(summ) ? summFirst : sixTenIncrease = new CountUp("sixTen", summsixTen, {
                enableScrollSpy: true,
                separator: " ",
                useEasing: true,
                smartEasingThreshold: 10000,
                scrollSpyOnce: true,
                scrollSpyDelay: 500,
            });

            const eleven25 = document.querySelector("#eleven25");
            const summEleven25 = 30000 + Math.floor(nakopitel * 0.17) / 15;
            //eleven25.textContent = summEleven25;
            isNaN(summ) ? summFirst : eleven25Increase = new CountUp("eleven25", summEleven25, {
                enableScrollSpy: true,
                separator: " ",
                useEasing: true,
                smartEasingThreshold: 10000,
                scrollSpyOnce: true,
                scrollSpyDelay: 500,
            });

            const twentySix50 = document.querySelector("#twentySix50");
            const summTwentySix50 = 10000 + Math.floor(nakopitel * 0.13) / 25;
            //twentySix50.textContent = summTwentySix50;
            isNaN(summ) ? summFirst : twentySix50Increase = new CountUp("twentySix50", summTwentySix50, {
                enableScrollSpy: true,
                separator: " ",
                useEasing: true,
                smartEasingThreshold: 10000,
                scrollSpyOnce: true,
                scrollSpyDelay: 500,
            });

            /* const fiftyOne100 = document.querySelector("#fiftyOne100");
            const summFiftyOne100 = 10000 + Math.floor(nakopitel * 0.125) / 50; */
            //fiftyOne100.textContent = summFiftyOne100;
            /* isNaN(summ) ? summFirst : fiftyOne100Increase = new CountUp("fiftyOne100", summFiftyOne100, {
                enableScrollSpy: true,
                separator: " ",
                useEasing: true,
                smartEasingThreshold: 10000,
                scrollSpyOnce: true,
                scrollSpyDelay: 500,
            }); */

            isNaN(summ) ? summFirst : demo = new CountUp("out", summ, {
                enableScrollSpy: true,
                separator: " ",
                useEasing: true,
                smartEasingThreshold: 10000,
                scrollSpyOnce: true,
                scrollSpyDelay: 500,
            });
            isNaN(summ) ? summFirst : demoRace = new CountUp("raceScoreId", summ, {
                separator: " ",
                useEasing: true,
                smartEasingThreshold: 10000,
                scrollSpyOnce: true,
                enableScrollSpy: true,
                scrollSpyDelay: 100,
            });
            //End of increase number
        });
};

reiting();

const reitingContent = () => {
    fetch(bgFetch)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("NETWORK RESPONSE ERROR");
            }
        })
        .then(dataFirst => {
            const data = dataFirst.data;
            displayDetails(data);
        })
        .catch(error => console.error("FETCH ERROR:", error));

    const swiperContainerReiting = document.querySelector(
        ".swiperContainerReiting"
    );
    const wrapperReeiting = document.querySelector(".wrapperReeiting");
    const swiperSlide1 = document.querySelector(".swiperSlide1");
    const swiperSlide2 = document.querySelector(".swiperSlide2");
    const swiperSlide3 = document.querySelector(".swiperSlide3");
    const swiperSlide4 = document.querySelector(".swiperSlide4");
    const swiperSlide5 = document.querySelector(".swiperSlide5");
    const swiperSlide6 = document.querySelector(".swiperSlide6");
    const swiperSlide7 = document.querySelector(".swiperSlide7");
    const swiperSlide8 = document.querySelector(".swiperSlide8");
    const swiperSlide9 = document.querySelector(".swiperSlide9");
    const swiperSlide10 = document.querySelector(".swiperSlide10");

    const displayDetails = data => {
        const sliderReiting1 = () => {
            const imgPosition = [
                "https://static.sz.kz/landings/lotoDriveForsazh4/img/1.svg",
                "https://static.sz.kz/landings/lotoDriveForsazh4/img/2.svg",
                "https://static.sz.kz/landings/lotoDriveForsazh4/img/3.svg",
                "https://static.sz.kz/landings/lotoDriveForsazh4/img/4.svg",
                "https://static.sz.kz/landings/lotoDriveForsazh4/img/5.svg",
            ];
            for (let i = 0; i < 5; i++) {
                const reitingUserMain = document.createElement("div");
                let information = data[i];
                let scoreReiting = data[i].score;

                let icon = document.createElement("img");
                icon.classList.add("icon");
                icon.src = `https://sz.kz/picture?bgAvatar=${information.bgUserToken}`;
                reitingUserMain.appendChild(icon);

                const dataSixTen = document.createElement("div");
                dataSixTen.classList.add("dataSixTen");
                reitingUserMain.appendChild(dataSixTen);

                const dataName = document.createElement("div");
                dataName.classList.add("data-name");
                dataSixTen.appendChild(dataName);

                const dataNickName = document.createElement("p");
                dataNickName.innerText = "НИКНЕЙМ";
                dataName.appendChild(dataNickName);

                const dataNick = document.createElement("p");
                dataNick.classList.add("data-nick");
                if (information.nick == "") {
                    information.nick = "Не задан";
                }
                dataNick.innerText = information.nick;
                dataName.appendChild(dataNick);

                const dataPoints = document.createElement("div");
                dataPoints.classList.add("data-points");
                dataSixTen.appendChild(dataPoints);

                const dataText = document.createElement("p");
                dataText.innerText = "Количество очков";
                dataPoints.appendChild(dataText);

                const dataScore = document.createElement("p");
                dataScore.classList.add("data-score");
                const InfScore = information.score / 100
                    .toString()
                    .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
                dataScore.innerText = InfScore;
                dataPoints.appendChild(dataScore);

                const dataPosition = document.createElement("img");
                dataPosition.className = "dataPosition";
                dataPosition.src = imgPosition[i];
                reitingUserMain.appendChild(dataPosition);

                reitingUserMain.classList.add("reiting-userMain");
                swiperSlide1.appendChild(reitingUserMain);
            }
            for (let i = 5; i < 10; i++) {
                const reitingUser = document.createElement("div");
                let information = data[i];
                let scoreReiting = data[i].score;

                const placeSixTen = document.createElement("div");
                placeSixTen.classList.add("placeSixTen");
                placeSixTen.innerText = information.place;
                reitingUser.appendChild(placeSixTen);

                const dataSixTen = document.createElement("div");
                dataSixTen.classList.add("dataSixTen");
                reitingUser.appendChild(dataSixTen);

                const dataName = document.createElement("div");
                dataName.classList.add("data-name");
                dataSixTen.appendChild(dataName);

                const dataNickName = document.createElement("p");
                dataNickName.innerText = "НИКНЕЙМ";
                dataName.appendChild(dataNickName);

                const dataNick = document.createElement("p");
                dataNick.classList.add("data-nick");
                if (information.nick == "") {
                    information.nick = "Не задан";
                }
                dataNick.innerText = information.nick;
                dataName.appendChild(dataNick);

                const dataPoints = document.createElement("div");
                dataPoints.classList.add("data-points");
                dataSixTen.appendChild(dataPoints);

                const dataText = document.createElement("p");
                dataText.innerText = "Количество очков";
                dataPoints.appendChild(dataText);

                const dataScore = document.createElement("p");
                dataScore.classList.add("data-score");
                const InfScore = information.score / 100
                    .toString()
                    .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
                dataScore.innerText = InfScore;
                dataPoints.appendChild(dataScore);

                let item_elementBox = document.createElement("div");
                item_elementBox.classList.add("box");

                let item_elementBoxSlider = document.createElement("div");
                item_elementBoxSlider.classList.add(`sliders${i}`);

                reitingUser.classList.add("reiting-user");
                reitingUser.appendChild(item_elementBox);
                item_elementBox.appendChild(item_elementBoxSlider);
                swiperSlide1.appendChild(reitingUser);

                let dataItemsFirst = data.slice(3, 4);

                const scoreFirst = dataItemsFirst[0].score;

                noUiSlider.create(item_elementBoxSlider, {
                    start: scoreReiting,
                    connect: "lower",
                    step: 1,
                    range: {
                        min: 0,
                        max: scoreFirst,
                    },
                    format: {
                        to: function(value) {
                            return value.toFixed(0);
                        },
                        from: function(value) {
                            return Number(value.replace(",-", ""));
                        },
                    },
                });
                item_elementBoxSlider.noUiSlider.set(scoreReiting.value);
            }
        };
        //рейтинг остальных
        const sliders = (firstNumber, endNumber, sliderNumber) => {
            const swiperSlide = document.createElement("div");
            for (let i = firstNumber; i < endNumber; i++) {
                const reitingUser = document.createElement("a");
                if (data[i] === undefined) {
                    return "";
                }
                let information = data[i];

                /* let icon4Length = document.createElement("img");
                icon4Length.classList.add("icon4Length");
                icon4Length.src = `https://sz.kz/picture?bgAvatar=${information.bgToken}`;
                reitingUser.appendChild(icon4Length); */

                const placeSixTen = document.createElement("div");
                placeSixTen.classList.add("placeSixTen");
                placeSixTen.innerText = information.place;
                reitingUser.appendChild(placeSixTen);

                const dataSixTen = document.createElement("div");
                dataSixTen.classList.add("dataSixTen");
                reitingUser.appendChild(dataSixTen);

                const dataName = document.createElement("div");
                dataName.classList.add("data-name");
                dataSixTen.appendChild(dataName);

                const dataNickName = document.createElement("p");
                dataNickName.innerText = "Никнейм";
                dataName.appendChild(dataNickName);

                const dataNick = document.createElement("p");
                dataNick.classList.add("data-nick");
                if (information.nick == "") {
                    information.nick = "Не задан";
                }
                dataNick.innerText = information.nick;
                dataName.appendChild(dataNick);

                const dataPoints = document.createElement("div");
                dataPoints.classList.add("data-points");
                dataSixTen.appendChild(dataPoints);

                const dataText = document.createElement("p");
                dataText.innerText = "Количество очков";
                dataPoints.appendChild(dataText);

                const dataScore = document.createElement("p");
                dataScore.classList.add("data-score");
                const InfScore = information.score / 100
                    .toString()
                    .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
                dataScore.innerText = InfScore;
                dataPoints.appendChild(dataScore);

                reitingUser.classList.add("reiting-user");
                swiperSlide.className = `swiper-slide swiperSlide${sliderNumber}`;
                swiperSlide.appendChild(reitingUser);
                wrapperReeiting.appendChild(swiperSlide);

                reitingUser.href = `https://sz.kz/showBG?token=${information.bgToken}`;
            }
        };

        if (data.length > 0) sliderReiting1();
        sliders(10, 20, 2);
        sliders(20, 30, 3);
        sliders(30, 40, 4);
        sliders(40, 50, 5);
        sliders(50, 60, 6);
        sliders(60, 70, 7);
        sliders(70, 80, 8);
        sliders(80, 90, 9);
        sliders(90, 100, 10);
        /* sliders(100, 110, 11);
        sliders(110, 120, 12);
        sliders(120, 130, 13);
        sliders(130, 140, 14);
        sliders(140, 150, 15);
        sliders(150, 160, 16);
        sliders(160, 170, 17);
        sliders(170, 180, 18);
        sliders(180, 190, 19);
        sliders(190, 200, 20); */

        const swiperContainerReiting = new Swiper(".swiperContainerReiting", {
            sliderPerView: 1,
            spaceBetween: 90,
            grabCursor: true,
            pagination: {
                watchOverflow: true,
                el: ".swiper-paginationReitng",
                clickable: true,
            },
            breakpoints: {
                1024: {
                    slidesPerView: 1,
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    },
                    spaceBetween: 550,

                    effect: "flip",
                    flipEffect: {
                        slideShadows: false,
                    },
                    pagination: {
                        el: ".swiper-paginationReitng",
                        clickable: true,
                        renderBullet: function(index, className) {
                            return (
                                '<span class="' + className + '">' + (index + 1) + "</span>"
                            );
                        },
                    },
                },
            },
        });

        const swiperPaginationReitng = document.querySelector(
            ".swiper-paginationReitng"
        );

        swiperContainerReiting.on("slideChange", function() {
            if (this.activeIndex === 0 && window.innerWidth < 1023) {
                swiperPaginationReitng.style.cssText =
                    "bottom: 175px; transition-duration: .8s;";
                reitingFaq.style.cssText =
                    "margin-top: 60px; transition-duration: 1.4s;";
            } else if (this.activeIndex === 0 && window.innerWidth > 1023) {
                reitingFaq.style.cssText =
                    "margin-top: 150px; transition-duration: .4s;";
            }
            if (this.activeIndex > 0 && window.innerWidth < 1023) {
                swiperPaginationReitng.style.cssText =
                    "bottom: 435px; transition-duration: .8s;";
                /*reitingFaq.style.cssText =
                  "margin-top: -400px; transition-duration: 1.4s;";*/
            }
            if (this.activeIndex > 0 && window.innerWidth < 1023) {
                swiperPaginationReitng.style.cssText =
                    "bottom: 195px; transition-duration: .8s;";
                reitingFaq.style.cssText =
                    "margin-top: -400px; transition-duration: 1.4s;";
            } else if (this.activeIndex > 0 && window.innerWidth > 1023) {
                reitingFaq.style.cssText =
                    "margin-top: 70px; transition-duration: .4s;";
            }
        });


        const reitingFaq = document.querySelector(".reiting-faq");
        swiperContainerReiting.on("slideChange", function() {
            if (this.activeIndex === 0 && window.innerWidth < 1023) {
                reitingFaq.style.cssText =
                    "margin-top: 100px; transition-duration: .4s;";
            } else if (this.activeIndex === 0 && window.innerWidth > 1023) {
                reitingFaq.style.cssText =
                    "margin-top: 150px; transition-duration: .4s;";
            }
            if (this.activeIndex > 0 && window.innerWidth < 1023) {
                reitingFaq.style.cssText =
                    "margin-top: -200px; transition-duration: .4s;";
            } else if (this.activeIndex > 0 && window.innerWidth > 1023) {
                reitingFaq.style.cssText =
                    "margin-top: -260px; transition-duration: .4s;";
            }
        });
    };
};

reitingContent();

const race = () => {
    fetch(bgFetch)
        .then(resp => {
            if (resp.status !== 200) {
                throw new Error();
            }
            return resp;
        })
        .then(resp => resp.json())
        .then(dataJson => {
            const data3 = dataJson.data;
            const data = data3.slice(0, 102);

            let nickCar1 = document.querySelector(".nickCar1");
            let scoreCar1 = document.querySelector(".scoreCar1");
            let nickCar0 = document.querySelector(".nickCar0");
            let scoreCar0 = document.querySelector(".scoreCar0");
            let nickCar2 = document.querySelector(".nickCar2");
            let scoreCar2 = document.querySelector(".scoreCar2");
            const data0 = data[0].score / 100;
            const data1 = data[1].score / 100;
            const data2 = data[2].score / 100;
            nickCar1.textContent = data[1].nick;
            scoreCar1.textContent = data[1].score;
            nickCar0.textContent = data[0].nick;
            scoreCar0.textContent = data[0].score;
            nickCar2.textContent = data[2].nick;
            scoreCar2.textContent = data[2].score;

            let sliderCar1 = document.querySelector(".sliderCar1");
            let sliderCar0 = document.querySelector(".sliderCar0");
            let sliderCar2 = document.querySelector(".sliderCar2");

            noUiSlider.create(sliderCar1, {
                animate: true,
                animationDuration: 1600,
                start: 0,
                step: 1,
                orientation: "vertical",
                direction: "rtl",
                range: {
                    min: 0,
                    max: data0,
                },
            });
            noUiSlider.create(sliderCar0, {
                animate: true,
                animationDuration: 1600,
                start: 0,
                step: 1,
                orientation: "vertical",
                direction: "rtl",
                range: {
                    min: 0,
                    max: data0,
                },
            });
            noUiSlider.create(sliderCar2, {
                animate: true,
                animationDuration: 1600,
                start: 0,
                step: 1,
                orientation: "vertical",
                direction: "rtl",
                range: {
                    min: 0,
                    max: data0,
                },
            });

            var target = $(".reiting");
            var targetPos = target.offset().top;
            var winHeight = $(window).height();
            var scrollToElem = targetPos - winHeight;
            const btnRace = document.querySelector(".btnRace");
            btnRace.addEventListener("click", () => {
                $(window).scroll(function() {
                    var winScrollTop = $(this).scrollTop();
                    if (winScrollTop > scrollToElem) {
                        sliderCar0.noUiSlider.set(data0);
                        sliderCar1.noUiSlider.set(data1);
                        sliderCar2.noUiSlider.set(data2);
                    }
                });
            });
            var sliderCar0Count = new CountUp("scoreCar0ID", data0, {
                separator: " ",
                useEasing: true,
                smartEasingThreshold: 10000,
                scrollSpyOnce: true,
                enableScrollSpy: true,
                scrollSpyDelay: 100,
            });
            var sliderCar1Count = new CountUp("scoreCar1ID", data1, {
                separator: " ",
                useEasing: true,
                smartEasingThreshold: 10000,
                scrollSpyOnce: true,
                enableScrollSpy: true,
                scrollSpyDelay: 100,
            });
            var sliderCar2Count = new CountUp("scoreCar2ID", data2, {
                separator: " ",
                useEasing: true,
                smartEasingThreshold: 10000,
                scrollSpyOnce: true,
                enableScrollSpy: true,
                scrollSpyDelay: 100,
            });
            const btnReitScroll = document.querySelector(".btnReit");
            btnReitScroll.addEventListener("click", () => {
                $(window).scroll(function() {
                    var winScrollTop = $(this).scrollTop();
                    if (winScrollTop > scrollToElem) {
                        sliderCar0.noUiSlider.set(data0);
                        sliderCar1.noUiSlider.set(data1);
                        sliderCar2.noUiSlider.set(data2);
                    }
                });
            });

            const btnRaceAgain = document.querySelector(".btnRace");
            btnRaceAgain.addEventListener("click", () => {
                $(window).scroll(function() {
                    var winScrollTop = $(this).scrollTop();
                    if (winScrollTop > scrollToElem) {
                        sliderCar0.noUiSlider.set(data0);
                        sliderCar1.noUiSlider.set(data1);
                        sliderCar2.noUiSlider.set(data2);
                    }
                });
            });
        });
};
race();

const swiper1 = new Swiper(".swiper-container1", {
    watchOverflow: true,

    speed: 400,
    spaceBetween: -80,
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination1",
        clickable: true,
    },
    breakpoints: {
        1024: {
            slidesPerView: 1,
            spaceBetween: -600,
            navigation: {
                nextEl: ".nextBilet",
                prevEl: ".prevBilet",
            },
        },
    },
});

const swiperPaginationSum = document.querySelector(".swiper-paginationSum");
swiper1.on("slideChange", function() {
    if (this.activeIndex === 0) {
        swiperPaginationSum.href = "https://sz.kz/game?gameid=1045";
        //swiperPaginationSum.style.cssText =      "animation: swing; animation-duration: 2s;";
    } else if (this.activeIndex === 1) {
        swiperPaginationSum.href = "https://sz.kz/game?gameid=1078";
        //swiperPaginationSum.style.cssText =      "animation: swing; animation-duration: 2s;";
    } else if (this.activeIndex === 2) {
        swiperPaginationSum.href = "https://sz.kz/game?gameid=1044";
        //swiperPaginationSum.style.cssText =      "animation: tada; animation-duration: 2s;";
    } else if (this.activeIndex === 3) {
        swiperPaginationSum.href = "https://sz.kz/game?gameid=1053";
        //swiperPaginationSum.style.cssText =      "animation: heartBeat; animation-duration: 2s;";
    }
});

const swiperWelcome = new Swiper(".swiper-containerWelcome", {
    slidesPerView: 1,

    speed: 400,
    grabCursor: true,
    pagination: {
        el: ".swiper-paginationWelcome",
        clickable: true,
    },

    breakpoints: {
        1024: {
            slidesPerView: 1,
            spaceBetween: 20,
            navigation: {
                nextEl: ".nextWelcome",
                prevEl: ".prevWelcome",
            },
        },
    },
});

const svgTenge = document.querySelector(".svgTenge");
const svgTimer = document.querySelector(".svgTimer");
const prizesSum3 = document.querySelectorAll(".prizesSum3");
const imgTab1 = document.querySelector(".imgTab1");
const swiperPaginationWelcome = document.querySelector(
    ".swiper-paginationWelcome"
);
const swiperPaginationBulletActive = document.querySelector(
    ".swiper-pagination-bullet-active"
);
console.log(swiperPaginationBulletActive);

const textCarSwiper = document.querySelector(".textCarSwiper");
const welcomeSlide = document.querySelectorAll(".welcomeSlide");
swiperWelcome.on("slideChange", function() {
    if (this.activeIndex === 0) {
        textCarSwiper.innerText =
            "В «6/49 Express» – самый большой Главный приз среди быстротиражных лотерей, он составляет 14 000 000 тенге";
        textCarSwiper.style = null;
        setTimeout(
            () =>
            (textCarSwiper.style.cssText =
                "animation: fadeInUpBig; animation-duration: 2s;"),
            10
        );
    } else if (this.activeIndex === 1) {
        welcomeSlide[0].style.cssText =
            "animation: bounceOutRight; animation-duration: 4s;";
        setTimeout(
            () =>
            (textCarSwiper.innerText =
                "«Больше Меньше» – самая быстрая из быстротиражных лотерей. Тираж проходит каждые 10 секунд"),
            20
        );
        textCarSwiper.style = null;
        setTimeout(
            () =>
            (textCarSwiper.style.cssText =
                "animation: fadeInUpBig; animation-duration: 1s;"),
            20
        );
        /*svgPathTenge.forEach(el => {
          el.style.cssText = "fill: white; transition-duration: 2s;";
        });
        svgPathTimer.forEach(el => {
          el.style.cssText = "fill: white; transition-duration: 1s;";
        });
        prizesSum3.forEach(el => {
          el.style.cssText = "border: white 1px solid;";
        });
        imgTab1Path.forEach(el => {
          el.style.cssText = "fill: white; transition-duration: 1s;";
        });*/
    } else if (this.activeIndex === 2) {
        welcomeSlide[1].style.cssText =
            "animation: bounceOutRight; animation-duration: 5s;";
        setTimeout(
            () =>
            (textCarSwiper.innerText =
                "5 000 000 тенге – самый крупный выигрыш в быстротиражной лотерее «5/36 Express» с начала 2023 года"),
            30
        );
        textCarSwiper.style = null;
        setTimeout(
            () =>
            (textCarSwiper.style.cssText =
                "animation: fadeInUpBig; animation-duration: 1s;"),
            30
        );
    } else if (this.activeIndex === 3) {
        welcomeSlide[2].style.cssText =
            "animation: bounceOutRight; animation-duration: 4s;";
        setTimeout(
            () =>
            (textCarSwiper.innerText =
                "3 новых миллионера появилось с начала 2023 года, благодаря быстротиражной лотерее «Rapido»"),
            40
        );
        textCarSwiper.style = null;
        setTimeout(
            () =>
            (textCarSwiper.style.cssText =
                "animation: fadeInUpBig; animation-duration: 1s;"),
            40
        );
    } else if (this.activeIndex === 4) {
        welcomeSlide[3].style.cssText =
            "animation: bounceOutRight; animation-duration: 4s;";
        setTimeout(
            () =>
            (textCarSwiper.innerText =
                "4 457 пользователей приняли участие в акции «LotoDrive Форсаж», которая проходила с 3 по 13 апреля 2023 года"),
            50
        );
        textCarSwiper.style = null;
        setTimeout(
            () =>
            (textCarSwiper.style.cssText =
                "animation: fadeInUpBig; animation-duration: 1s;"),
            50
        );
    }
});

let swiper = new Swiper('.terms-content', {
    watchOverflow: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        720: {
            slidesPerView: 1.5,
            spaceBetween: 50,
        },
        1100: {
            slidesPerView: 3,
            spaceBetween: 90,
        },
    },
});

setTimeout(() => {
    // дата завершения таймера 
    const endTimeLotomania = 'Jul 14 2023, 00:00 GMT+0600';

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
            days = document.querySelectorAll('.days649'),
            hours = document.querySelectorAll('.hours649'),
            minutes = document.querySelectorAll('.minutes649'),
            // обновление таймера каждые 1000мс
            timeInterval = setInterval(update, 0);

        function update() {
            // результат функции getDateRemaining
            let total = getDateRemaining(timesup);
            // Проверка на ноль
            var nowdate = Date.now();
            if (nowdate <= Date.parse(endTimeLotomania)) {
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
    setTime('timer649desk', endTimeLotomania);
}, 1000);