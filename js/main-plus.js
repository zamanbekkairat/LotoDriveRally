"use strict";
const main = document.querySelector('main');
let activeTab = document.querySelector('.tabcontent.active');
const headers = document.querySelectorAll('.head-block');
main.addEventListener('scroll', () => {
    if (activeTab.getBoundingClientRect().top < 10) {
        console.log(activeTab.getBoundingClientRect().top);
        headers.forEach((header) => {
            header.classList.add('bkg-col');
        })
    } else {
        headers.forEach((header) => {
            header.classList.remove('bkg-col');
        })
    }
});

/* document.addEventListener('pointerdown', () => {
    activeTab = document.querySelector('.tabcontent.active');
    console.log(activeTab);
}); */

const tablinks = document.getElementsByClassName("tablinks");
const tabContent = document.getElementsByClassName("tabcontent");

for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].addEventListener("click", () => {
        for (let j = 0; j < tabContent.length; j++) {
            tabContent[j].classList.remove("active");
        }

        if (tablinks[i].dataset.button === tabContent[i].dataset.content) {
            tabContent[i].classList.add("active");
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
            $(".tabcontent").removeClass("hidden");

        } else {
            $(".menu-block").addClass("active");
            $(".tabcontent").addClass("hidden");
        }
    });

    $(".tablinks").on("click", function() {
        if ($(".menu-block").hasClass("active")) {
            $(".menu-block").removeClass("active");
            $(".tabcontent").removeClass("hidden");

        } else {
            $(".menu-block").addClass("active");
        }
    });

    $(".toGames").on("click", function() {
        if ($(".games").hasClass("active")) {
            $(".games").removeClass("active");
        } else {
            $(".tabcontent").removeClass("active");
            $(".games").addClass("active");
        }
        activeTab = document.querySelector('.tabcontent.active');
        console.log(activeTab);
    });

    $(".toFaq").on("click", function() {
        if ($(".faq").hasClass("active")) {
            $(".faq").removeClass("active");
        } else {
            $(".tabcontent").removeClass("active");
            $(".faq").addClass("active");
        }
        activeTab = document.querySelector('.tabcontent.active');
        console.log(activeTab);
    });

    $(".toReiting").on("click", function() {
        if ($(".reiting").hasClass("active")) {
            $(".reiting").removeClass("active");
        } else {
            $(".tabcontent").removeClass("active");
            $(".reiting").addClass("active");
        }
        activeTab = document.querySelector('.tabcontent.active');
        console.log(activeTab);
    });

    $(".toPrizes").on("click", function() {
        if ($(".prizes").hasClass("active")) {
            $(".prizes").removeClass("active");
        } else {
            $(".tabcontent").removeClass("active");
            $(".prizes").addClass("active");
        }
        activeTab = document.querySelector('.tabcontent.active');
        console.log(activeTab);
    });

    $(".toInfo").on("click", function() {
        if ($(".info").hasClass("active")) {
            $(".info").removeClass("active");
        } else {
            $(".tabcontent").removeClass("active");
            $(".info").addClass("active");
        }
        activeTab = document.querySelector('.tabcontent.active');
        console.log(activeTab);
    });
});

const currentPlayerContainer = document.querySelector('#current-player-wrapper');
const currentPlayerAction = document.querySelector('.current-player-action.down');
const currentPlayerScore = document.querySelector('.current-player-score');
const currentPlayerPlace = document.querySelector('.current-player-place');
const playersList = document.querySelector('.rating-list');
const playerTemplate = document.querySelector('#player-template').content;
const winnerTemplate = document.querySelector('#winner-template').content;
const winnersList = document.querySelector('.winners-list');

const createPlayer = (data) => {
    const { nick, place, score, bgUserToken } = data;
    const player = playerTemplate.cloneNode(true);
    player.querySelector('.nick').textContent = nick;
    player.querySelector('.place').textContent = place;
    const formattedScore = (score / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    player.querySelector('.score').textContent = formattedScore;
    if (parseInt(place) <= 5) {
        player.querySelector('.avatar-img').src = `https://sz.kz/picture?bgAvatar=${bgUserToken}`;
    };

    return player;
}

const createWinner = (data) => {
    const { nick, place, bgUserToken } = data;
    const winner = winnerTemplate.cloneNode(true);
    winner.querySelector('.nick').textContent = nick;
    winner.querySelector('.place').textContent = place;
    if (parseInt(place) <= 5) {
        winner.querySelector('.avatar-img').src = `https://sz.kz/picture?bgAvatar=${bgUserToken}`;
    };
    return winner;
}

const createAnchor = (current) => {
    if (current) {
        let players = playersList.children;
        players[current.place - 1].id = 'current-in-the-list';
        players[current.place - 1].classList.add('current-player')

        const anchor = document.createElement('a');
        const showText = document.createElement('span');
        anchor.id = 'scroll-to-me-link';
        anchor.href = '#current-in-the-list';

        if (current.place <= 100 && current.place > 5) {
            currentPlayerAction.append(anchor);
            currentPlayerAction.classList.add('ready');
        }
    } else {
        currentPlayerContainer.style.display = 'none';
    }
}

const onSuccessPlayers = (data, current, cb) => {
    data.forEach(element => {
        const player = cb(element);
        playersList.appendChild(player);
    });

    currentPlayerPlace.textContent = current.place;
    currentPlayerScore.textContent = (current.score / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    createAnchor(current);
}

const onSuccessWinners = (data, cb) => {
    const winners = data.slice(0, 5);
    winners.forEach(element => {
        const winner = cb(element);
        winnersList.appendChild(winner);
    });
}

const onFail = (err) => {
    console.log(err);
}

const getData = async(onSuccess, onFail, cb) => {
    try {
        const response = await fetch(
            //'../js/data.json'
            'https://sz.kz/srvNew?srv=lrRating&lotteryRace=38&offset=101'
        );

        if (!response.ok) {
            throw new Error('Не удалось получить данные');
        }

        const resp = await response.json();
        const data = resp.data;
        const current = resp.currentUser ? resp.currentUser : false;
        onSuccess(data, current, cb);
    } catch (error) {
        onFail(error.message);
    }
};

const getPrevWinners = async(onSuccess, onFail, cb) => {
    try {
        const response = await fetch(
            //'../js/data.json'
            'https://sz.kz/srvNew?srv=lrRating&lotteryRace=36&offset=6'
        );

        if (!response.ok) {
            throw new Error('Не удалось получить данные');
        }

        const resp = await response.json();
        const data = resp.data;
        onSuccess(data, cb);
    } catch (error) {
        onFail(error.message);
    }
};

getData(onSuccessPlayers, onFail, createPlayer);
getPrevWinners(onSuccessWinners, onFail, createWinner);

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
const bgFetch = "https://sz.kz/srvNew?srv=lrRating&lotteryRace=38&offset=101";

let animationStarted = false;
let demo;
const reiting = () => {
    fetch(bgFetch)
        .then(resp => {
            if (resp.status !== 200) {
                console.error('Error fetching data:', resp.status);
                throw new Error('Failed to fetch data');
            }
            return resp;
        })
        .then(resp => resp.json())
        .then(dataJson => {
            const data = dataJson.data;
            const allScore = dataJson.allScore;

            let nakopitel = Math.floor(allScore * 0.02);

            let summ = 4265000 + nakopitel;

            //let allScoreMathStr = summ.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");

            let firstIncrease;
            let secondIncrease;
            let thirdIncrease;
            let fourthIncrease;
            let fifthIncrease;
            let sixTenIncrease;
            let eleven25Increase;
            let twentySix50Increase;

            const summFirst = 1000000 + Math.floor(nakopitel * 0.15);
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

            const summSecond = 700000 + Math.floor(nakopitel * 0.125);
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

            const summThird = 500000 + Math.floor(nakopitel * 0.1);
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

            const summfourth = 300000 + Math.floor(nakopitel * 0.075);
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

            const summFifth = 200000 + Math.floor(nakopitel * 0.05);
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

reiting();


setTimeout(() => {
    // дата завершения таймера 
    const endTimeLotomania = 'Feb 29 2024, 20:00 GMT+0600';

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