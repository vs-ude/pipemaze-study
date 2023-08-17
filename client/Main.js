let _colorList = [];

let score = 0;
let runningTime = 0;
let roundTime = 0;
let roundNumber = 0;

let firstFalseRound = 10;
let rightChoice = true;
let giveWrongRecommendation = false;
var hideScoreHint = false
var lastReccomendationFalse = false

let numberOfWrongChoices = 0;
let numberOfWrongChoicesGiven = 0;
let numberOfRoundsMax = 20;

let gameMode = 1;
let selectedColorInNumber = [];
let i = "";
let rnd = "";

let download = () => {
    const link = document.createElement('a');

    link.download = new Date().getTime() + '_' + 'test'.join('-') + '.png';
    link.href = this.canvas.toDataURL();

    link.click();
}

let OFFSET = 150;

//Button
let next = () => {

    let elements = Array.prototype.slice.call(document.getElementsByClassName('selected'));

    let select = elements.map(function (element) {
        return parseInt(element.getAttribute("data-selection")) + 1;
    })

    let check = function (arr, target) {
        if (arr.length != target.length) {
            return false;
        }

        return target.every(v => arr.includes(v));
    };

    const currentSelection = correctSelectionInNumbers[roundNumber - 1];
    let result = check(select, currentSelection);
    let allColors = result;

    rightChoice = false;

    if (allColors) {
        score++;
        rightChoice = true;
    }

    document.getElementById('score').innerHTML = "Score: " + score;
    _colorList = [];

    Socket.send({
        id: localStorage.getItem('id'),
        type: "2",
        data: [Date.now().toString(), roundNumber.toString(), score.toString()]
    });

    let selected = Array.prototype.slice.call(document.getElementsByClassName('selected'));
    selected.forEach(element => element.classList.toggle('selected'));

    newGame();
}

window.next = next;
window.download = download;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let correctSelectionInNumbers = [
    [1, 3, 5],
    [2, 4],
    [3, 5],
    [1, 5],
    [3, 7],
    [4, 6, 7],
    [3, 4, 6],
    [1, 2],
    [1, 4, 6],
    [4, 6, 7],

    [4, 5, 7],
    [2, 3, 6],
    [1, 4],
    [1, 3],
    [1, 5, 6],
    [1, 4, 6],
    [4, 6],
    [3, 5, 6],
    [1, 4, 5],
    [2, 4, 5],

    [1, 5],
    [1, 2, 4],
    [3, 5],
    [1, 2, 6],
    [2, 3, 6],
    [2, 3],
    [4, 5],
    [3, 5],
    [6],
    [1, 5, 6],

    [1, 3, 7],
    [1, 5, 6],
    [2, 3],
    [1, 6],
    [2, 4, 6],
    [3, 5, 6],
    [1, 5, 7],
    [3, 6],
    [1, 4],
    [2, 4],

    [2, 4, 5],
    [2, 4, 5],
    [3, 4, 6],
    [2, 5],
    [1, 3, 7],
    [2, 3, 4, 5, 7]
];

function selection(selection) {
    document.getElementById("nextButton").disabled = false;
    document.getElementById("nextButton").style.backgroundColor = "#008CBA";

    let select = selection;
    document.getElementById(select).classList.toggle('selected');
}

window.selection = selection;

function showMaze() {
    resetRoundTimer();

    let images = [
        '1660498356152_yellow-pink-green',
        '1660553717805_purple-yellow',
        '1660553688989_orange-purple',
        '1660553696046_orange-yellow',
        '1660553705606_blue-red',

        '1660553729629_pink-green-purple',
        '1660553735172_red-purple-blue',
        '1660553743807_yellow-pink',
        '1660553755378_green-blue-yellow',
        '1660553773484_purple-yellow-orange',

        '1660553783298_pink-orange-green',
        '1660553857140_blue-yellow-pink',
        '1660553852516_pink-orange',
        '1660553865952_red-green',
        '1660553871874_blue-red-orange',

        '1660553887713_blue-pink-green',
        '1660553907034_red-purple',
        '1660553919927_red-blue-green',
        '1660553929776_blue-orange-green',
        '1660553937922_green-orange-yellow',

        '1661692084278_yellow-orange',
        '1661692183277_yellow-purple-pink',
        '1661692094194_orange-purple',
        '1661692096295_yellow-orange-purple',
        '1661692102337_red-purple-orange',

        '1661692109260_orange-purple',
        '1661692111679_purple-yellow',
        '1661692115555_green-purple',
        '1661692121751_purple-blue',
        '1661692123886_green-orange-red',

        '1661692133121_orange-red-purple',
        '1661692127858_pink-purple-green',
        '1661692137620_yellow-orange',
        '1661692149249_green-pink',
        '1661692156340_green-purple',

        '1661692173756_blue-orange-purple',
        '1661692162496_pink-red-yellow',
        '1661692164953_green-pink',
        '1661692169120_red-blue',
        '1661702363410_yellow-purple',

        '1661692159694_red-orange-blue',
        '1661692176122_purple-red-pink',
        '1661692180271_orange-yellow-pink',
        '1661692090128_red-blue',
        '1661692171722_blue-red-pink',

        '1661702370465_orange-purple-red'
    ];

    let imageNameStartPoint = "./images/" + images[roundNumber - 1] + ".png";

    document.getElementById("mazePicture").src = imageNameStartPoint;
}

function setChosenColors() {
    let recommendation = [
        ['Blue', 'Yellow', 'Purple'],
        ['Pink', 'Green', 'Yellow'],
        ['Purple', 'Yellow'],
        ['Orange', 'Purple'],
        ['Orange', 'Yellow'],
        ['Blue', 'Red'],
        ['Green', 'Pink', 'Purple'],
        ['Red', 'Purple', 'Blue'],
        ['Yellow', 'Pink'],
        ['Green', 'Blue', 'Yellow'],
        ['Purple', 'Yellow', 'Orange'],

        ['Pink', 'Orange', 'Green'],
        ['Blue', 'Yellow', 'Pink'],
        ['Pink', 'Orange'],
        ['Red', 'Green'],
        ['Blue', 'Red', 'Orange'],
        ['Blue', 'Pink', 'Green'],
        ['Red', 'Purple'],
        ['Red', 'Blue', 'Green'],
        ['Blue', 'Orange', 'Green'],
        ['Green', 'Orange', 'Yellow'],

        ['Yellow', 'Orange'],
        ['Purple', 'Yellow', 'Pink'],
        ['Orange', 'Purple'],
        ['Yellow', 'Purple', 'Orange'],
        ['Red', 'Orange', 'Purple'],
        ['Orange', 'Purple'],
        ['Purple', 'Yellow'],
        ['Green', 'Purple'],
        ['Purple'],
        ['Red', 'Green', 'Orange'],

        ['Orange', 'Red', 'Purple'],
        ['Green', 'Purple', 'Pink'],
        ['Yellow', 'Orange'],
        ['Pink', 'Green'],
        ['Green', 'Purple', 'Orange'],
        ['Blue', 'Orange', 'Purple'],
        ['Red', 'Pink', 'Yellow'],
        ['Green', 'Pink'],
        ['Blue', 'Red'],
        ['Purple', 'Yellow'],

        ['Red', 'Orange', 'Blue'],
        ['Purple', 'Red', 'Pink'],
        ['Orange', 'Yellow', 'Pink'],
        ['Red', 'Blue'],
        ['Blue', 'Red', 'Pink'],
        ['Orange', 'Purple', 'Red', 'Green', 'Blue']
    ];

    let lastRounds;

    if (rightChoice === true) {
        giveWrongRecommendation = false;
    } else {
        numberOfWrongChoices = numberOfWrongChoices + 1;
    }

    if (numberOfWrongChoicesGiven >= 3) {
        lastRounds = (firstFalseRound * 2) + 2;
    } else {
        lastRounds = (firstFalseRound * 2) + numberOfWrongChoicesGiven;
    }

    numberOfRoundsMax = lastRounds;

    if (hideScoreHint == true) {
        document.getElementById("intermediate-score").hidden = true;
    }

    if (roundNumber == firstFalseRound || roundNumber == lastRounds) {
        numberOfWrongChoices = 0;
        giveWrongRecommendation = true;
    }
   
    console.log("giveWrongRecommendation:" + giveWrongRecommendation + ", numberOfWrongChoices:" + numberOfWrongChoices + ", rightChoice:" + rightChoice+", Score:"+score)

    if (giveWrongRecommendation == true && numberOfWrongChoices < 3) {
        if (roundNumber <= (firstFalseRound * 2) && roundNumber != firstFalseRound) {
            numberOfWrongChoicesGiven = numberOfWrongChoicesGiven + 1;
        }
        lastReccomendationFalse = true

        document.getElementById("intermediate-score").hidden = true;
        _colorList = recommendation[roundNumber];

        return recommendation[roundNumber - 10];
    } else {
        if (hideScoreHint == false) {
            if (lastReccomendationFalse == true && numberOfWrongChoices == 3) {
                document.getElementById("intermediate-score").hidden = false;
                document.getElementById("intermediate-score").innerHTML = "You have reached <b>" + score + " out of " + (firstFalseRound + 2) + "</b> points. You have chosen the wrong solution in the last 3 rounds. The AI made a mistake in its suggestion. Please continue the game.";
                hideScoreHint = true
                giveWrongRecommendation = false
                lastReccomendationFalse = false
            }
            else if (lastReccomendationFalse == true && numberOfWrongChoices == 1 && rightChoice == true) {
                document.getElementById("intermediate-score").hidden = false;
                document.getElementById("intermediate-score").innerHTML = "You have reached <b>" + score + " out of " + (firstFalseRound + 1) + "</b> points. You found the correct solution in the last round, although the AI made a mistake in its suggestion 2 times. Please continue the game.";
                hideScoreHint = true
                giveWrongRecommendation = false
                lastReccomendationFalse = false
            }
            else if (lastReccomendationFalse == true && numberOfWrongChoices == 2 && rightChoice == true) {
                document.getElementById("intermediate-score").hidden = false;
                document.getElementById("intermediate-score").innerHTML = "You have reached <b>" + score + " out of " + (firstFalseRound + 2) + "</b> points. You found the correct solution in the last round, although the AI made a mistake in its suggestion 3 times. Please continue the game.";
                hideScoreHint = true
                giveWrongRecommendation = false
                lastReccomendationFalse = false
            }
            else if (lastReccomendationFalse == true && numberOfWrongChoices == 0) {
                document.getElementById("intermediate-score").hidden = false;
                document.getElementById("intermediate-score").innerHTML = "You have reached <b>" + score + " out of " + (firstFalseRound) + "</b> points. You found the correct solution in the last round, even though the AI made a mistake in its suggestion. Please continue the game.";
                hideScoreHint = true
                giveWrongRecommendation = false
                lastReccomendationFalse = false
            }
            else {
                document.getElementById("intermediate-score").hidden = true;
            }
        }
        _colorList = recommendation[roundNumber];

        return recommendation[roundNumber];
    }
}

let newGame = () => {
    document.getElementById("nextButton").disabled = true;
    document.getElementById("nextButton").style.backgroundColor = "grey";

    if (roundNumber == numberOfRoundsMax) {
        const url = new URL("https://www.soscisurvey.de/mazeOfPipes/index.php");
        url.searchParams.set("i", i);
        url.searchParams.set("rnd", rnd);
        url.searchParams.set("id", localStorage.getItem('id'));

        window.location = url;
        window.alert("End of game! Please visit this link to finish your participation: ");

        document.getElementById("main").remove();

        return;
    }

    incrementNumberOfRounds();
    showMaze();

    document.getElementById('recommendation').innerHTML = "Recommendation: " + setChosenColors().join(", ");

}

function getSelection() {
    let selection = [];
    for (let i = 1; i <= 7; i++) {
        if (document.getElementById('selection' + i).style.backgroundColor == "limegreen") {
            selection.push(i);
        }
    }

    checkSelection(selection);

    selectedColorInNumber.push("[");
    selectedColorInNumber.push(selection);
    selectedColorInNumber.push("]");
    //console.log("Selected Values all rounds:" + selectedColorInNumber);
}

function setGameMode() {
    gameMode = (localStorage.getItem('id') % 2) + 1;

    if (gameMode === 1) {
        numberOfRoundsMax = 20;
        firstFalseRound = 10;
    } else if (gameMode === 3) {
        numberOfRoundsMax = 30;
        firstFalseRound = 15;
    } else if (gameMode === 2) {
        numberOfRoundsMax = 40;
        firstFalseRound = 20;
    }

    console.log(gameMode);
}


function incrementSeconds() {
    let tmp = document.getElementById("main");
    handleResize(tmp, tmp.clientHeight, tmp.clientWidth);

    runningTime += 1;
    roundTime += 1;
    document.getElementById('seconds-counter').innerText = runningTime + " seconds";
    document.getElementById('newseconds-counter').innerText = roundTime + " seconds";

    if (roundTime > 10) {
        document.getElementById('newseconds-counter').style.color = "red";
    } else if (roundTime > 5) {
        document.getElementById('newseconds-counter').style.color = "orange";
    } else {
        document.getElementById('newseconds-counter').style.color = "black";
    }
}


function incrementNumberOfRounds() {
    roundNumber += 1;
    document.getElementById('rounds-counter').innerText = "Game round " + roundNumber;
}

let cancel = setInterval(incrementSeconds, 1000);
let Socket = openWebsocket("localhost", 3366);

function handleResize(tmp, h, w) {
    if (window.innerHeight / h < 1)
        return tmp.style.transform = `scale(${window.innerHeight / h})`

    if (window.innerWidth / w < 1)
        return tmp.style.transform = `scale(${window.innerWidth / w})`
}

window.onload = function () {
    let tmp = document.getElementById("main");

    handleResize(tmp, tmp.clientHeight, tmp.clientWidth);
    window.addEventListener('resize', function (data) {
        handleResize(tmp, tmp.clientHeight, tmp.clientWidth);
    });

    setGameMode();

    document.getElementById('score').innerHTML = "Score: " + score;

    newGame();
    incrementSeconds();

    if (!localStorage.getItem('id')) {
        localStorage.setItem('id', getRandomInt(999999999999));
    }

    document.getElementById("mazePicture").onload = function () {
        document.getElementById("fog").width = document.getElementById("mazePicture").clientWidth;
        document.getElementById("fog").height = document.getElementById("mazePicture").clientHeight - OFFSET;

        initFog();

        document.getElementById("mazePicture").onload = null;
    }

    let params = (new URL(document.location)).searchParams;
    i = params.get('i');
    rnd = params.get('rnd');
}

function resetRoundTimer() {
    roundTime = 0;
    document.getElementById('newseconds-counter').innerText = "0" + " seconds";
}

function openWebsocket(url, port) {
    console.log("Opening socket: " + url + ":" + port);
    let socket = new WebSocket('ws://' + url + '/api/action');

    if (port) {
        socket = new WebSocket('ws://' + url + ':' + port + '/api/action');
    }

    const dropEvery = 2;
    let packetCount = 0;

    return {
        send: function (msg) {
            if (socket.readyState != WebSocket.OPEN) {
                return;
            }
            socket.send(JSON.stringify(msg));
        },

        sendHighFreq: function (msg) {
            if (socket.readyState != WebSocket.OPEN) {
                return;
            }

            packetCount++;
            if (packetCount % dropEvery > 0) {
                return;
            }
            //console.log(packetCount);
            socket.send(JSON.stringify(msg));
        }
    }
}

function initFog() {
    let canvas = document.getElementById("fog");
    let ctx = canvas.getContext('2d'); // fog

    let r2 = 80;
    let r1 = 20;

    let hideFill = ctx.createLinearGradient(0, 0, 0, canvas.height);
    hideFill.addColorStop(0, 'transparent');
    hideFill.addColorStop(.05, 'rgba( 0,0,0, 0.5 )');
    hideFill.addColorStop(.07, 'rgba( 0,0,0, 0.8 )');
    hideFill.addColorStop(.1, 'rgba( 0,0,0, 1 )');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = hideFill;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    canvas.addEventListener('mousemove', function (ev) {
        let pX = ev.offsetX;
        let pY = ev.offsetY;

        Socket.sendHighFreq({
            id: localStorage.getItem('id'),
            type: "1",
            data: [Date.now().toString(), pX.toString(), pY.toString(), roundNumber.toString()]
        });

        let r1Tmp = r1;
        let r2Tmp = r2;

        // reveal wherever we drag
        let radGrd = ctx.createRadialGradient(pX, pY, r1Tmp, pX, pY, r2Tmp);
        radGrd.addColorStop(1, 'rgba( 0, 0, 0, 0 )');
        radGrd.addColorStop(0, 'rgba( 255, 255, 255, 1 )');

        // partially hide the entire map and re-reval where we are now
        ctx.globalCompositeOperation = 'source-over';

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = hideFill;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.globalCompositeOperation = 'xor';
        ctx.fillStyle = radGrd;
        ctx.fillRect(pX - r2Tmp, pY - r2Tmp, r2Tmp * 2, r2Tmp * 2);
    })
}


// Source: https://gist.github.com/k-gun/c2ea7c49edf7b757fe9561ba37cb19ca
/**
 * Element.prototype.classList for IE8/9, Safari.
 * @author    Kerem Güneş <k-gun@mail.com>
 * @copyright Released under the MIT License <https://opensource.org/licenses/MIT>
 * @version   1.2
 * @see       https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
 */
;
(function () {
    // Helpers.
    var trim = function (s) {
        return s.replace(/^\s+|\s+$/g, '');
    },
        regExp = function (name) {
            return new RegExp('(^|\\s+)' + name + '(\\s+|$)');
        },
        forEach = function (list, fn, scope) {
            for (let i = 0; i < list.length; i++) {
                fn.call(scope, list[i]);
            }
        };

    // Class list object with basic methods.
    function ClassList(element) {
        this.element = element;
    }

    ClassList.prototype = {
        add: function () {
            forEach(arguments, function (name) {
                if (!this.contains(name)) {
                    this.element.className = trim(this.element.className + ' ' + name);
                }
            }, this);
        },
        remove: function () {
            forEach(arguments, function (name) {
                this.element.className = trim(this.element.className.replace(regExp(name), ' '));
            }, this);
        },
        toggle: function (name) {
            return this.contains(name) ? (this.remove(name), false) : (this.add(name), true);
        },
        contains: function (name) {
            return regExp(name).test(this.element.className);
        },
        item: function (i) {
            return this.element.className.split(/\s+/)[i] || null;
        },
        // bonus
        replace: function (oldName, newName) {
            this.remove(oldName), this.add(newName);
        }
    };

    // IE8/9, Safari
    // Remove this if statements to override native classList.
    if (!('classList' in Element.prototype)) {
        // Use this if statement to override native classList that does not have for example replace() method.
        // See browser compatibility: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList#Browser_compatibility.
        // if (!('classList' in Element.prototype) ||
        //     !('classList' in Element.prototype && Element.prototype.classList.replace)) {
        Object.defineProperty(Element.prototype, 'classList', {
            get: function () {
                return new ClassList(this);
            }
        });
    }

    // For others replace() support.
    if (window.DOMTokenList && !DOMTokenList.prototype.replace) {
        DOMTokenList.prototype.replace = ClassList.prototype.replace;
    }
})();

if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
        value: function (searchElement, fromIndex) {

            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            // 1. Let O be ? ToObject(this value).
            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If len is 0, return false.
            if (len === 0) {
                return false;
            }

            // 4. Let n be ? ToInteger(fromIndex).
            //    (If fromIndex is undefined, this step produces the value 0.)
            var n = fromIndex | 0;

            // 5. If n ≥ 0, then
            //  a. Let k be n.
            // 6. Else n < 0,
            //  a. Let k be len + n.
            //  b. If k < 0, let k be 0.
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

            function sameValueZero(x, y) {
                return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
            }

            // 7. Repeat, while k < len
            while (k < len) {
                // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                // b. If SameValueZero(searchElement, elementK) is true, return true.
                if (sameValueZero(o[k], searchElement)) {
                    return true;
                }
                // c. Increase k by 1.
                k++;
            }

            // 8. Return false
            return false;
        }
    });
}

if (!Array.prototype.every) {
    Array.prototype.every = function (callbackfn, thisArg) {
        'use strict';
        var T, k;

        if (this == null) {
            throw new TypeError('this is null or not defined');
        }

        // 1. Let O be the result of calling ToObject passing the this
        //    value as the argument.
        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get internal method
        //    of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If IsCallable(callbackfn) is false, throw a TypeError exception.
        if (typeof callbackfn !== 'function') {
            throw new TypeError();
        }

        // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 1) {
            T = thisArg;
        }

        // 6. Let k be 0.
        k = 0;

        // 7. Repeat, while k < len
        while (k < len) {

            var kValue;

            // a. Let Pk be ToString(k).
            //   This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the HasProperty internal
            //    method of O with argument Pk.
            //   This step can be combined with c
            // c. If kPresent is true, then
            if (k in O) {

                // i. Let kValue be the result of calling the Get internal method
                //    of O with argument Pk.
                kValue = O[k];

                // ii. Let testResult be the result of calling the Call internal method
                //     of callbackfn with T as the this value and argument list
                //     containing kValue, k, and O.
                var testResult = callbackfn.call(T, kValue, k, O);

                // iii. If ToBoolean(testResult) is false, return false.
                if (!testResult) {
                    return false;
                }
            }
            k++;
        }
        return true;
    };
}