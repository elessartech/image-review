`use strict`;
// drag n drop menu and chat
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
    else if (event.target.classList.contains('chat-dragger')) {
        movedPiece = document.querySelector('.chat-wrap');
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

const drop = () => {
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



// upload image to canvas

const fileInput = document.querySelector('#fileInput');
fileInput.addEventListener('change', onSelectFiles);

function onSelectFiles(event) {
    const files = Array.from(event.target.files);

    updateFilesInfo(files);
}

function updateFilesInfo(files) {
    const imageTypeRegExp = /^image\//;
    const filesInfo = document.querySelector('#filesInfo');
    const fragment = document.createDocumentFragment();
    files.forEach(file => {
        const canvas = document.querySelector('canvas');
        if (imageTypeRegExp.test(file.type)) {
            const img = new Image();
            canvas.setAttribute('class', 'current-image');
            const ctx = canvas.getContext('2d');
            img.src = window.URL.createObjectURL(file);
            img.addEventListener('load', event => {
                canvas.setAttribute('width', event.target.width);
                canvas.setAttribute('height', event.target.height);
                ctx.drawImage(img, 0, 0);
            });
            fragment.appendChild(canvas);
        }
    });
    filesInfo.appendChild(fragment);
}

// drawing on canvas

const paintCanvas = document.querySelector( 'canvas' );
const context = paintCanvas.getContext( '2d' );

let x = 0, y = 0;
let isMouseDown = false;
let stringColor = '#6ebf44';

const stopDrawing = () => { isMouseDown = false; };
const startDrawing = event => {
    isMouseDown = true;
    [x, y] = [event.offsetX, event.offsetY];
};
const color = obj => {
    switch (obj.value) {
        case "green":
            stringColor = "#6ebf44";
            break;
        case "blue":
            stringColor = "#52a7f7";
            break;
        case "red":
            stringColor = "#eb5d56";
            break;
        case "yellow":
            stringColor = "#f4d22f";
            break;
        case "purple":
            stringColor = "#b36ae0";
            break;
    }
};
const drawLine = event => {
    if ( isMouseDown ) {
        const newX = event.offsetX;
        const newY = event.offsetY;
        context.beginPath();
        context.moveTo( x, y );
        context.lineTo( newX, newY );
        context.lineWidth = 7;
        context.lineCap = 'round';
        context.strokeStyle = stringColor;
        context.stroke();
        context.closePath();
        [x, y] = [newX, newY];
    }
};

const commentsDiv = document.querySelector('.chat-wrap');

function switchCommentsMode() {
    if (commentsDiv.dataset.state == 'comentingMode') {
        commentsDiv.style.display = 'block';
    }
    else {
        commentsDiv.style.display = 'none';
    }
}

function addCommentsDataState(el) {
    if (el.value == 'on') {
        commentsDiv.dataset.state = 'comentingMode';
        switchCommentsMode();
    }
    else if (el.value == 'off') {
        commentsDiv.dataset.state = 'notComentingMode';
        switchCommentsMode();
    }
}

function addDataState(el) {
    if (el.hasAttribute('data-state')) {
        if (el.dataset.state.slice(0, 3) == 'not') {
            if (el.classList.contains('draw')) {
                el.dataset.state = 'drawingMode';
                turnOnDrawing();
            }
        }
    }
    else {
        return false;
    }
}

function removeDrawingDataState(el) {
    const liEls = document.querySelectorAll('li');
    let arrayOfLiEls = [];
    for (li of liEls) {
            if (li.hasAttribute('data-state')) {
                arrayOfLiEls.push(li);
            }
        }
        for (state of arrayOfLiEls) {
            if (state.classList.contains('draw')) {
            state.dataset.state = 'notDrawingMode';
            turnOffDrawing();
        }
    } 
}

function turnOnDrawing() {
    paintCanvas.addEventListener( 'mousedown', startDrawing );
    paintCanvas.addEventListener( 'mousemove', drawLine );
    paintCanvas.addEventListener( 'mouseup', stopDrawing );
    paintCanvas.addEventListener( 'mouseout', stopDrawing );
}

function turnOffDrawing() {
    paintCanvas.removeEventListener( 'mousedown', startDrawing );
    paintCanvas.removeEventListener( 'mousemove', drawLine );
    paintCanvas.removeEventListener( 'mouseup', stopDrawing );
    paintCanvas.removeEventListener( 'mouseout', stopDrawing );
}


    
























