
// drag n drop menu
const wrap = document.querySelector('.wrap');
let movedPiece = null;
let minY, minX, maxX, maxY;
let shiftX = 0;
let shiftY = 0;

const dragStart = event => {
    if (event.target.classList.contains('drag')) {
        movedPiece = document.querySelector('.menu');
        minY = wrap.offsetTop;
        minX = wrap.offsetLeft;
        maxX = wrap.offsetLeft + wrap.offsetWidth - movedPiece.offsetWidth;
        maxY = wrap.offsetTop + wrap.offsetHeight - movedPiece.offsetHeight;
        shiftX = event.pageX - event.target.getBoundingClientRect().left - window.pageXOffset;
        shiftY = event.pageY - event.target.getBoundingClientRect().top - window.pageYOffset;
    }
};

const drag = throttle((x, y) => {
    if (movedPiece) {
        x = x - shiftX;
        y = y - shiftY;
        x = Math.min(x, maxX);
        y = Math.min(y, maxY);
        x = Math.max(x, minX);
        y = Math.max(y, minY);
        movedPiece.style.left = x + 'px';
        movedPiece.style.top = y + 'px';
        movedPiece.classList.add('moving');
    }
});

const drop = event => {
    if (movedPiece) {
        movedPiece.style.visibility = 'hidden';
        movedPiece.style.visibility = 'visible';
            wrap.appendChild(movedPiece);
            movedPiece.classList.remove('moving');
            movedPiece = null;
    }
};

document.addEventListener('mousedown', dragStart);
document.addEventListener('mousemove', event => drag(event.pageX, event.pageY));
document.addEventListener('mouseup', drop);

document.addEventListener('touchstart', event => dragStart(event.touches[0]));
document.addEventListener('touchmove', event => drag(event.touches[0].pageX, event.touches[0].pageY));
document.addEventListener('touchend', event => drop(event.changedTouches[0]));



function throttle(callback) {
    let isWaiting = false;
    return function () {
        if (!isWaiting) {
            callback.apply(this, arguments);
            isWaiting = true;
            requestAnimationFrame(() => {
                isWaiting = false;
            });
        }
    };
}


// burger menu



const summaryItems = document.querySelectorAll('.mode');
const burger  = document.querySelector('.burger');

console.log(summaryItems);

burger.style.display = 'none';

function backToMenu() {
    const menuItems = burger.parentElement.children;
    for (item of menuItems) {
        if (item.classList.contains('tool')) {
            item.style.display = 'none';
        }
        else {
            item.style.display = 'inline-block';
        }
    }
    burger.style.display = 'none';
}

burger.addEventListener('click', backToMenu);


function openTools(event) {
    const elNext = event.target.nextElementSibling;
    const elChildren = elNext.parentElement.children;
    if (event.target.classList.contains('new') === false) {
        if (elNext.classList.contains("tool") === false) {
            elNext.classList.remove("tool");
        }
        else {
            elNext.classList.add("tool");
            for (child of elChildren) {
                if (child.classList.contains(event.target.classList['2']) || child.classList.contains(event.target.classList['2'] + '-tools') || child.classList.contains('burger') ||  child.classList.contains('drag')) {
                    child.style.display = 'inline-block';
                }
                else {
                    child.style.display = 'none';
                }
            }
        }
    }
}

Array.from(summaryItems).forEach((item) => {
   item.addEventListener('click', openTools);
});





























