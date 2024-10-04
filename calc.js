let result = 0;
let current = 0;
let action = 0;
let res = document.querySelector(".result");
let num = document.querySelectorAll('.num');
let fnc = document.querySelectorAll('.fnc');
let actns = document.querySelectorAll('.actns');
let temp = document.querySelector('.temp');

num.forEach(buttn => {
    buttn.addEventListener("click", (event) => {
        if (res.innerHTML === '0') {
            res.innerHTML = event.target.innerHTML;
            if (action === 0) {
                temp.innerHTML = '';

            }
        }
        else {
            res.innerHTML = res.innerHTML + event.target.innerHTML;
            if (action === 0) {
                temp.innerHTML = '';

            }
        }
    });
});

fnc.forEach(buttn => {
    buttn.addEventListener("click", (event) => {
        if (event.target.innerHTML === '←' & res.innerHTML != '0') {
            res.innerHTML = res.innerHTML.slice(0, -1)
            if (res.innerHTML.length === 0 & action != 0) {
                temp.innerHTML = current + action;
                res.innerHTML = '';
            }
        }
        else if (event.target.innerHTML === 'C') {
            res.innerHTML = '0';
            current = 0;
            result = 0;
            action = 0;
            temp.innerHTML = '';

        }
    });
});

actns.forEach(buttn => {
    buttn.addEventListener("click", (event) => {
        if (temp.innerHTML != '' & res.innerHTML === '') {
            action = event.target.innerHTML;
            temp.innerHTML = current + action;
            if (action === '=') {
                temp.innerHTML = current;
            }
        }
        else if (event.target.innerHTML === '=' & current != 0 & action != 0) {
            current = eval(current + action + res.innerHTML);
            action = 0;
            temp.innerHTML = current;

            result = 0;
            res.innerHTML = '';

        }
        else if (event.target.innerHTML != '=' & result === 0) {
            current = res.innerHTML;
            action = event.target.innerHTML;
            result = res.innerHTML;
            res.innerHTML = '';
            temp.innerHTML = current + action;

        }
        else if (event.target.innerHTML != '=' & result != 0) {

            current = eval(current + action + res.innerHTML);
            action = event.target.innerHTML;
            res.innerHTML = current;
            result = res.innerHTML;
            temp.innerHTML = current + action;
            res.innerHTML = '';
        }
        else if (event.target.innerHTML === '=') {
            action = event.target.innerHTML;
            temp.innerHTML = action;
            current = 0;
            result = 0;
            action = 0;
            temp.innerHTML = '';
        }
    });
});
