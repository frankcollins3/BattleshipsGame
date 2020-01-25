var shipsArray1 = [
        ['', '', '', '', '', 'X', 'X', '', '', ''],
        ['', 'X', '', '', '', '', '', '', '', ''],
        ['', 'X', '', '', '', '', '', '', '', ''],
        ['', 'X', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', 'X', '', '', '', ''],
        ['', '', '', '', '', 'X', '', '', '', ''],
        ['', '', '', '', '', 'X', '', '', '', ''],
        ['X','X', '', '', '','X', '', '', '', 'X'],
        ['', '', '', '', '', '', '', '', '', 'X'],
        ['', '','X','X','X', '', '', '', '', 'X'],
];
var shipsArray2 = [
        ['X', 'X', 'X', '', '', '', '', '', 'X', 'X'],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', 'X', 'X', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['X','', '', '', '','X', 'X', 'X', 'X', ''],
        ['X', '', '', '', '', '', '', '', '', ''],
        ['X', '','','','', '', '', 'X', 'X', 'X'],
];
var shipsArray3 = [
        ['', '', '', '', '', 'X', 'X', '', '', ''],
        ['X', 'X', 'X', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', 'X', 'X', 'X', 'X', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['X','X', '', 'X', '','', '', 'X', '', ''],
        ['', '', '', 'X', '', '', '', 'X', '', ''],
        ['', '','','X','', '', '', 'X', '', ''],
];

var html = '';
var shipsArray = [];

function getRandomArray() {
    let random = Math.floor(Math.random() * 3) + 1;
    if (random === 1) {
        shipsArray = shipsArray1;
    } else if (random === 2) {
        shipsArray = shipsArray2;
    } else {
        shipsArray = shipsArray3;
    }
}

function firstGame() {
    html += '<table id="battleships">';
    html += '<tbody>';
    getRandomArray();
    for(var i=0; i < shipsArray.length; i++) {
        var innerArray = shipsArray[i];
        html += '<tr>';
        for(var j=0; j < innerArray.length; j++) {
            var field = innerArray[j];
            if (field === 'X') {
                html += '<td data-ship="true">';
            } else {
                html += '<td data-ship="false">';
            }
            html += '</td>';
        }
        html += '</tr>';
    }
    html += '</tbody>';
    html += '</table>';
    document.write(html);
}

function resetGame() {
    getRandomArray();
    for(var i=0; i < shipsArray.length; i++) {
        var innerArray = shipsArray[i];
        for(var j=0; j < innerArray.length; j++) {
            var field = innerArray[j];
            if (field === 'X') {
                rows[i].children[j].dataset.ship = 'true';

            } else {
                rows[i].children[j].dataset.ship = 'false';
            }
            rows[i].children[j].innerHTML = '';
            rows[i].children[j].addEventListener('click', onClick);
            rows[i].children[j].style.backgroundColor = '';
        }
    }
    message.style.color = 'black';
    message.innerText = 'Twoim zadaniem jest zatopić dwa dwumasztowce, trzy trójmasztowce i jeden czteromasztowiec. Powodzenia!';
    hits = 0;
}

firstGame();

//UCHWYTY

var kaboom = document.getElementById('kaboom');
var resBut = document.getElementById('reset');
var message = document.getElementById('message');
var rows = document.getElementsByTagName('tr')
var hits = 0;

//PODPIĘCIE FUNKCJI URUCHMIANEJ PO KLIKNIĘCIU W KOMÓRKĘ TABELI

var tds = document.getElementsByTagName('td');
for (var i=0; i<tds.length; i++) {
    tds[i].addEventListener('click', onClick);
}

function clickBut() {
    resetGame();
}

resBut.addEventListener('click', clickBut);

//FUNKCJA AKTYWOWANA PO KLIKNIĘCIU

function onClick() {
    let td = this;
    td.dataset.hit === 'true';
    if (td.dataset.ship === 'true') {
        td.innerText = 'X';
        hits++;
    } else {
        td.innerText = '•';
    }

    function highLightRow() {
        let tdsInRow = td.parentElement.children;
        let color = (td.dataset.ship === 'true') ? '#99ffbb' : '#ffb3b3';
        for (i=0; i<tdsInRow.length; i++) {
            tdsInRow[i].style.backgroundColor = color;
        }
        setTimeout(function() {
            for (i=0; i<tdsInRow.length; i++) {
                tdsInRow[i].style.backgroundColor = '';
            }
        },150);
    }
    if (hits === 16) {
        message.innerText = 'Już tylko jedno trafienie dzieli Cię od wygranej!';
    } else {
        message.innerText = 'Brakuje Ci jeszcze '+(17-hits)+' trafień do wygranej';
    }

    highLightRow();

    //ANIMACJA

    let cloned = kaboom.cloneNode();
    td.appendChild(cloned);
    cloned.style.display = 'block';
    setTimeout(function() {
        td.removeChild(cloned);
    },700);

    //ZAKONCZENIE GRY

    if (hits === 17) {
        setTimeout(function() {
            for (i=0; i<tds.length; i++) {
                tds[i].style.backgroundColor = '#99ffbb';
                if (tds[i].dataset.ship === "true") {
                    tds[i].innerText = "X";
                } else {
                    tds[i].innerText = "•";
                }
                tds[i].removeEventListener('click', onClick);
            }
        },1000);
        message.style.color = 'green';
        message.innerText = 'WYGRAŁEŚ! Zagrasz jeszcze raz?';
    }
    td.removeEventListener('click', onClick);
}























