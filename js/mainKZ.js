"use strict";

const tablinks = document.getElementsByClassName("tablinks");
const tabContent = document.getElementsByClassName("tabcontent");

for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].addEventListener("click", () => {
        for (let j = 0; j < tabContent.length; j++) {
            tabContent[j].classList.remove("active");
        }

        if (tablinks[i].dataset.button === tabContent[i + 1].dataset.content) {
            tabContent[i + 1].classList.add("active");
        }
    });
}

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

    $(".head-menu").on("click", function() {
        if ($(".menu-block").hasClass("active")) {
            $(".menu-block").removeClass("active");
            $(this).siblings(".menu-block").slideUp(600);
        } else {
            $(".menu-block").addClass("active");
            $(".welcome").removeClass("active");
            $(this).siblings(".menu-block").slideDown(600);
        }
    });

    $(".close-icon").on("click", function() {
        $(".menu-block").removeClass("active");
        $(".welcome").addClass("active");
    });

    $(".tablinks").on("click", function() {
        if ($(".menu-block").hasClass("active")) {
            $(".menu-block").removeClass("active");
            $(this).siblings(".menu-block").slideUp(600);
        } else {
            $(".menu-block").addClass("active");
            $(this).siblings(".menu-block").slideDown(600);
        }
    });

    $(".toMain").on("click", function() {
        if ($(".welcome").hasClass("active")) {
            $(".welcome").removeClass("active");
        } else {
            $(".tabcontent").removeClass("active");
            $(".welcome").addClass("active");
        }
    });

    $(".toGames").on("click", function() {
        if ($(".games").hasClass("active")) {
            $(".games").removeClass("active");
        } else {
            $(".tabcontent").removeClass("active");
            $(".games").addClass("active");
        }
    });

    $(".toFaq").on("click", function() {
        if ($(".faq").hasClass("active")) {
            $(".faq").removeClass("active");
        } else {
            $(".tabcontent").removeClass("active");
            $(".faq").addClass("active");
        }
    });

    $(".toReiting").on("click", function() {
        if ($(".reiting").hasClass("active")) {
            $(".reiting").removeClass("active");
        } else {
            $(".tabcontent").removeClass("active");
            $(".reiting").addClass("active");
        }
    });

    $(".toDrive").on("click", function() {
        if ($(".drive").hasClass("active")) {
            $(".drive").removeClass("active");
        } else {
            $(".tabcontent").removeClass("active");
            $(".drive").addClass("active");
        }
    });

    $(".toInfo").on("click", function() {
        if ($(".info").hasClass("active")) {
            $(".info").removeClass("active");
        } else {
            $(".tabcontent").removeClass("active");
            $(".info").addClass("active");
        }
    });
});

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

//const bgFetch = "../js/data.json";
const bgFetch = "https://sz.kz/srvNew?srv=lrRating&lotteryRace=26&offset=101";

var target = $(".reiting");
var targetPos = target.offset().top;
var winHeight = $(window).height();
var scrollToElem = targetPos - winHeight;

var targetPos = target.offset().top;
var winHeight = $(window).height();
var scrollToElem = targetPos - winHeight;

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
        .then(dataJson => {
            const data = dataJson.data;
            if (dataJson.currentUser === undefined) {
                return; // Ничего не делать, если dataJson.currentUser равен undefined
            }
            const dataCurrentUser = dataJson.currentUser;
            const allScore = dataJson.allScore;

            //накопительный призовой фонд начало
            let scoreAll = document.querySelector(".allScore");

            const wrapperMyPlace = document.querySelector(".wrapper-myPlace");

            const currentUserText = document.createElement("p");
            // currentUserText.className = "currentUserText";
            // currentUserText.innerText = "Менің орным";

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
                dataNick.innerText = "Менің орным"; //надо вернуть имя
            } else
                dataNick.innerText = dataCurrentUser.nick;
            dataName.appendChild(dataNick);

            const dataPoints = document.createElement("div");
            dataPoints.classList.add("data-points");
            dataCurrent.appendChild(dataPoints);

            const dataText = document.createElement("p");
            dataText.innerText = "ұпай саны"; //надо вернуть коллисчество очков
            dataPoints.appendChild(dataText);

            const dataScore = document.createElement("p");
            dataScore.classList.add("data-score") / 100;
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
        });
};
currentUser();

let animationStarted = false;
let demo;
const reiting = () => {
    fetch(bgFetch)
        .then(resp => {
            if (resp.status !== 200) {
                throw new Error();
            }
            return resp;
        })
        .then(resp => resp.json())
        .then(dataJson => {
            const data = dataJson.data;
            const allScore = dataJson.allScore;

            let nakopitel = Math.floor(allScore * 0.02);

            let summ = 3490000 + nakopitel;

            //let allScoreMathStr = summ.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");

            let firstIncrease;
            let secondIncrease;
            let thirdIncrease;
            let fourthIncrease;
            let fifthIncrease;
            let sixTenIncrease;
            let eleven25Increase;
            let twentySix50Increase;

            const summFirst = 700000 + Math.floor(nakopitel * 0.15);
            //first.textContent = summFirst;
            firstIncrease = new CountUp("first", summFirst, {
                enableScrollSpy: true,
                separator: " ",
                useEasing: true,
                smartEasingThreshold: 10000,
                scrollSpyOnce: true,
                scrollSpyDelay: 500,
            });
            firstIncrease.start();

            const summSecond = 500000 + Math.floor(nakopitel * 0.125);
            //second.textContent = summSecond;
            secondIncrease = new CountUp("second", summSecond, {
                enableScrollSpy: true,
                separator: " ",
                useEasing: true,
                smartEasingThreshold: 10000,
                scrollSpyOnce: true,
                scrollSpyDelay: 500,
            });
            secondIncrease.start();

            const summThird = 400000 + Math.floor(nakopitel * 0.1);
            //third.textContent = summThird;
            thirdIncrease = new CountUp("third", summThird, {
                enableScrollSpy: true,
                separator: " ",
                useEasing: true,
                smartEasingThreshold: 10000,
                scrollSpyOnce: true,
                scrollSpyDelay: 500,
            });
            thirdIncrease.start();

            const summfourth = 250000 + Math.floor(nakopitel * 0.075);
            //third.textContent = summThird;
            fourthIncrease = new CountUp("fourth", summfourth, {
                enableScrollSpy: true,
                separator: " ",
                useEasing: true,
                smartEasingThreshold: 10000,
                scrollSpyOnce: true,
                scrollSpyDelay: 500,
            });
            fourthIncrease.start();

            const summFifth = 150000 + Math.floor(nakopitel * 0.05);
            //third.textContent = summThird;
            fifthIncrease = new CountUp("fifth", summFifth, {
                enableScrollSpy: true,
                separator: " ",
                useEasing: true,
                smartEasingThreshold: 10000,
                scrollSpyOnce: true,
                scrollSpyDelay: 500,
            });
            fifthIncrease.start();

            const summsixTen = 75000 + Math.floor(nakopitel * 0.2) / 5;
            //sixTen.textContent = summsixTen;
            sixTenIncrease = new CountUp("sixTen", summsixTen, {
                enableScrollSpy: true,
                separator: " ",
                useEasing: true,
                smartEasingThreshold: 10000,
                scrollSpyOnce: true,
                scrollSpyDelay: 500,
            });
            sixTenIncrease.start();

            const summEleven25 = 30000 + Math.floor(nakopitel * 0.17) / 15;
            //eleven25.textContent = summEleven25;
            eleven25Increase = new CountUp("eleven25", summEleven25, {
                enableScrollSpy: true,
                separator: " ",
                useEasing: true,
                smartEasingThreshold: 10000,
                scrollSpyOnce: true,
                scrollSpyDelay: 500,
            });
            eleven25Increase.start();

            const summTwentySix50 = 10000 + Math.floor(nakopitel * 0.13) / 25;
            //twentySix50.textContent = summTwentySix50;
            twentySix50Increase = new CountUp("twentySix50", summTwentySix50, {
                enableScrollSpy: true,
                separator: " ",
                useEasing: true,
                smartEasingThreshold: 10000,
                scrollSpyOnce: true,
                scrollSpyDelay: 500,
            });
            twentySix50Increase.start();

            /* const fiftyOne100 = document.querySelector("#fiftyOne100");
            const summFiftyOne100 = 10000 + Math.floor(nakopitel * 0.125) / 50;
            fiftyOne100.textContent = summFiftyOne100;
            isNaN(summ) ? summFirst : fiftyOne100Increase = new CountUp("fiftyOne100", summFiftyOne100, {
                enableScrollSpy: true,
                separator: " ",
                useEasing: true,
                smartEasingThreshold: 10000,
                scrollSpyOnce: true,
                scrollSpyDelay: 500,
            }); */

            if (!animationStarted && !isNaN(summ)) {
                demo = new CountUp("out", summ, {
                    enableScrollSpy: true,
                    separator: " ",
                    useEasing: true,
                    smartEasingThreshold: 10000,
                    scrollSpyOnce: true,
                    scrollSpyDelay: 500,
                });

                demo.start();
                animationStarted = true;
            }
        });
};

window.addEventListener('load', () => {
    reiting();
});

let clicked = false; // Флаг для отслеживания клика

const tabsItems = document.querySelectorAll('.landing-tabs__item');
tabsItems.forEach(item => {
    item.addEventListener('click', () => {
        if (!clicked) {
            reiting();
            clicked = true; // Устанавливаем флаг как true после первого клика
        }
    });
});

// Вызываем функцию с тернарным оператором при загрузке страницы
window.addEventListener('load', () => {
    reiting();
});

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
                "https://static.sz.kz/landings/lotoDriveRally/img/1.svg",
                "https://static.sz.kz/landings/lotoDriveRally/img/2.svg",
                "https://static.sz.kz/landings/lotoDriveRally/img/3.svg",
                "https://static.sz.kz/landings/lotoDriveRally/img/4.svg",
                "https://static.sz.kz/landings/lotoDriveRally/img/5.svg",
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
                dataText.innerText = "Ұпай саны";
                dataPoints.appendChild(dataText);

                const dataScore = document.createElement("p");
                dataScore.classList.add("data-score") / 100;
                const InfScore = typeof information.score === "number" ?
                    (information.score / 100)
                    .toString()
                    .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ") :
                    "Не задан";
                dataScore.innerText = InfScore;
                dataPoints.appendChild(dataScore);

                const dataPosition = document.createElement("img");
                dataPosition.className = "dataPosition";
                dataPosition.src = imgPosition[i];
                reitingUserMain.appendChild(dataPosition);

                reitingUserMain.classList.add("reiting-userMain");
                swiperSlide1.appendChild(reitingUserMain);
            }
            // for (let i = 5; i < 10; i++) {
            //     const reitingUser = document.createElement("div");
            //     let information = data[i];
            //     let scoreReiting = data[i].score;

            //     const placeSixTen = document.createElement("div");
            //     placeSixTen.classList.add("placeSixTen");
            //     placeSixTen.innerText = information.place;
            //     reitingUser.appendChild(placeSixTen);

            //     const dataSixTen = document.createElement("div");
            //     dataSixTen.classList.add("dataSixTen");
            //     reitingUser.appendChild(dataSixTen);

            //     const dataName = document.createElement("div");
            //     dataName.classList.add("data-name");
            //     dataSixTen.appendChild(dataName);

            //     const dataNickName = document.createElement("p");
            //     dataNickName.innerText = "НИКНЕЙМ";
            //     dataName.appendChild(dataNickName);

            //     const dataNick = document.createElement("p");
            //     dataNick.classList.add("data-nick");
            //     if (information.nick == "") {
            //         information.nick = "Не задан";
            //     }
            //     dataNick.innerText = information.nick;
            //     dataName.appendChild(dataNick);

            //     const dataPoints = document.createElement("div");
            //     dataPoints.classList.add("data-points");
            //     dataSixTen.appendChild(dataPoints);

            //     const dataText = document.createElement("p");
            //     dataText.innerText = "Ұпай саны";
            //     dataPoints.appendChild(dataText);

            // const dataScore = document.createElement("p");
            // dataScore.classList.add("data-score");
            // const InfScore = information.score / 100
            //     .toString()
            //     .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
            // dataScore.innerText = InfScore;
            // dataPoints.appendChild(dataScore);

            //     let item_elementBox = document.createElement("div");
            //     item_elementBox.classList.add("box");

            //     let item_elementBoxSlider = document.createElement("div");
            //     item_elementBoxSlider.classList.add(`sliders${i}`);

            //     reitingUser.classList.add("reiting-user");
            //     reitingUser.appendChild(item_elementBox);
            //     item_elementBox.appendChild(item_elementBoxSlider);
            //     swiperSlide1.appendChild(reitingUser);

            //     let dataItemsFirst = data.slice(3, 4);

            //     const scoreFirst = dataItemsFirst[0].score;

            //     noUiSlider.create(item_elementBoxSlider, {
            //         start: scoreReiting,
            //         connect: "lower",
            //         step: 1,
            //         range: {
            //             min: 0,
            //             max: scoreFirst,
            //         },
            //         format: {
            //             to: function(value) {
            //                 return value.toFixed(0);
            //             },
            //             from: function(value) {
            //                 return Number(value.replace(",-", ""));
            //             },
            //         },
            //     });
            //     item_elementBoxSlider.noUiSlider.set(scoreReiting.value);
            // }
        };
        //рейтинг остальных
        const sliders = (firstNumber, endNumber, sliderNumber) => {
            const swiperSlide = document.createElement("div");
            for (let i = firstNumber; i < endNumber; i++) {
                const reitingUser = document.createElement("div");
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
                dataText.innerText = "Ұпай саны";
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
        sliders(5, 12, 2);
        sliders(12, 19, 3);
        sliders(19, 26, 4);
        sliders(26, 33, 5);
        sliders(33, 40, 6);
        sliders(40, 47, 7);
        sliders(47, 54, 8);
        sliders(54, 61, 9);
        sliders(61, 68, 10);
        sliders(68, 75, 11);
        sliders(75, 82, 12);
        sliders(82, 89, 13);
        sliders(89, 96, 14);
        sliders(96, 150, 15);
        sliders(150, 160, 16);
        sliders(160, 170, 17);
        sliders(170, 180, 18);
        sliders(180, 190, 19);
        sliders(190, 200, 20);

        const swiperContainerReiting = new Swiper(".swiperContainerReiting", {
            sliderPerView: 1,
            spaceBetween: 90,
            grabCursor: true,
            pagination: {
                el: ".swiper-paginationReitng",
                clickable: true,
                watchOverflow: true,
                type: 'fraction',
                renderFraction: function(currentClass, totalClass) {
                    return '<span class="' + currentClass + '"></span>' + ' из ' + '<span class="' + totalClass + '"></span>'
                },
                renderBullet: function(index, className) {
                    return (
                        '<span class="' + className + '">' + (index + 1) + "</span>"
                    );
                },
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    };
};
reitingContent();

function isParentActive(slider) {
    return slider.closest('.drive').classList.contains('active');
}

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
            const data0 = data[0].score;
            const data1 = data[1].score;
            const data2 = data[2].score;

            if (data[1] && data[1].nick && data[1].score) {
                // Устанавливаем значения nick и score в соответствующие элементы
                nickCar1.textContent = data[1].nick;

                // Применяем .toString().replace() к значению data[2].score и устанавливаем его в элемент scoreCar2
                scoreCar1.textContent = (data[1].score / 100).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
            } else {
                // Если data[2] или нужные поля отсутствуют, устанавливаем значения по умолчанию или выводим сообщение об ошибке
                nickCar1.textContent = "Нет данных";
                scoreCar1.textContent = "Нет данных";
            }

            if (data[0] && data[0].nick && data[0].score) {
                // Устанавливаем значения nick и score в соответствующие элементы
                nickCar0.textContent = data[0].nick;

                // Применяем .toString().replace() к значению data[2].score и устанавливаем его в элемент scoreCar2
                scoreCar0.textContent = (data[0].score / 100).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
            } else {
                // Если data[2] или нужные поля отсутствуют, устанавливаем значения по умолчанию или выводим сообщение об ошибке
                nickCar0.textContent = "Нет данных";
                scoreCar0.textContent = "Нет данных";
            }

            if (data[2] && data[2].nick && data[2].score) {
                // Устанавливаем значения nick и score в соответствующие элементы
                nickCar2.textContent = data[2].nick;

                // Применяем .toString().replace() к значению data[2].score и устанавливаем его в элемент scoreCar2
                scoreCar2.textContent = (data[2].score / 100).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
            } else {
                // Если data[2] или нужные поля отсутствуют, устанавливаем значения по умолчанию или выводим сообщение об ошибке
                nickCar2.textContent = "Нет данных";
                scoreCar2.textContent = "Нет данных";
            }

            let sliderCar1 = document.querySelector(".sliderCar1");
            let sliderCar0 = document.querySelector(".sliderCar0");
            let sliderCar2 = document.querySelector(".sliderCar2");

            noUiSlider.create(sliderCar1, {
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
                start: 0,
                step: 1,
                orientation: "vertical",
                direction: "rtl",
                range: {
                    min: 0,
                    max: data0,
                },
            });

            const sliderHandles = [
                sliderCar0.querySelector(".noUi-handle"),
                sliderCar1.querySelector(".noUi-handle"),
                sliderCar2.querySelector(".noUi-handle"),
            ];

            const prizeImages = [
                "https://static.sz.kz/landings/lotoDriveRally/img/prize1.svg",
                "https://static.sz.kz/landings/lotoDriveRally/img/prize2.svg",
                "https://static.sz.kz/landings/lotoDriveRally/img/prize3.svg",
            ];

            for (let i = 0; i < sliderHandles.length; i++) {
                const winner = document.createElement("div");
                winner.classList.add("winners");
                winner.style.top = "60px";

                sliderHandles[i].parentNode.insertBefore(winner, sliderHandles[i]);

                const winnerText = document.createElement("div");
                winnerText.classList.add("winners-text");
                winner.appendChild(winnerText);

                const winnerTextImg = document.createElement("img");
                winnerTextImg.src = prizeImages[i];
                winnerText.appendChild(winnerTextImg);

                const winnerTextCarsNick = document.createElement("div");
                winnerTextCarsNick.classList.add("carsNick");
                winnerText.appendChild(winnerTextCarsNick);

                const winnerTextNickCar = document.createElement("p");
                winnerTextNickCar.classList.add("nickCar1");
                winnerTextNickCar.textContent = data[i].nick;
                winnerTextCarsNick.appendChild(winnerTextNickCar);

                const winnerTextScoreCar = document.createElement("p");
                winnerTextScoreCar.classList.add("scoreCar1");
                winnerTextScoreCar.setAttribute("id", "scoreCar1ID");
                winnerTextScoreCar.textContent = (data[i].score / 100).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
                winnerTextCarsNick.appendChild(winnerTextScoreCar);
            }

            const drive = document.querySelector(".drive");
            const tab5 = document.querySelector(".tab5");
            const toDrive = document.querySelector(".toDrive");

            function handleDriveClick() {
                if (drive.classList.contains("active")) {
                    animateSlider(sliderCar0, data0, 2500); // Adjust the animation duration as desired
                    animateSlider(sliderCar1, data1, 2500); // Adjust the animation duration as desired
                    animateSlider(sliderCar2, data2, 2500); // Adjust the animation duration as desired
                }
            }

            tab5.addEventListener("click", handleDriveClick);
            toDrive.addEventListener("click", handleDriveClick);;
        });
};

function animateSlider(slider, value, animationDuration) {
    const start = parseFloat(slider.noUiSlider.get());
    const stepSize = (value - start) / animationDuration * 5; // Adjust the division factor to control animation speed

    function updateValue(currentValue) {
        const newValue = parseFloat(currentValue) + stepSize;

        if ((stepSize > 0 && newValue >= value) || (stepSize < 0 && newValue <= value)) {
            slider.noUiSlider.set(value);
        } else {
            slider.noUiSlider.set(newValue);
            setTimeout(() => updateValue(slider.noUiSlider.get()), 0.8); // Adjust the delay (in milliseconds) between updates
        }
    }

    updateValue(start);
}
race();

window.addEventListener("load", function() {
    let destination = "games";

    const tabs = document.querySelectorAll(".js-tab"),
        tabParents = document.querySelectorAll(".js-tab-parent"),
        contentWrapper = document.querySelector(".js-content");

    tabs.forEach((tab) => {
        tab.addEventListener("click", (e) => {
            const target = e.target,
                gotoTab = target.dataset.goto;

            tabParents.forEach((parent) => {
                parent.classList.remove("active1");
            });

            target.parentNode.classList.add("active1");

            contentWrapper.dataset.currentTab = gotoTab;

            if (gotoTab !== "prizes") {
                return;
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const driveElement = document.querySelector('.drive');
    const outOfHeaderElement = document.querySelector('.out-of-header');

    // Создаем MutationObserver для отслеживания изменений в классах элемента .drive
    const observer = new MutationObserver(function(mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.attributeName === 'class') {
                if (driveElement.classList.contains('active')) {
                    outOfHeaderElement.style.paddingBottom = '0';
                } else {
                    outOfHeaderElement.style.paddingBottom = '';
                }
            }
        }
    });

    // Начинаем наблюдение за изменениями в атрибуте class элемента .drive
    observer.observe(driveElement, { attributes: true });
});

const min = 3;
const max = 6;
const elements = document.querySelectorAll('.cloud');

function getRandomValue() {
    return Math.random() * (max - min) + min;
}

function startDynamicAnimation(element) {
    const randomValue = getRandomValue();

    element.classList.remove('keyframes');
    void element.offsetWidth; // Перезапуск анимации
    element.classList.add('keyframes');

    setTimeout(() => startDynamicAnimation(element), randomValue * 1000);
}

elements.forEach(element => {
    startDynamicAnimation(element);
});

setTimeout(() => {
    // дата завершения таймера 
    const endTimeLotomania = 'Sep 8 2023, 00:00 GMT+0600';

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
            days = document.querySelectorAll('.daysRally'),
            hours = document.querySelectorAll('.hoursRally'),
            minutes = document.querySelectorAll('.minutesRally'),
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
    setTime('timerRallydesk', endTimeLotomania);
}, 1000);