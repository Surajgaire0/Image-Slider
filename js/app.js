let counter = 1;

let images = document.querySelectorAll('img');
let container = document.querySelector('.container');
let slider = document.querySelector('.slider');

let numberOfImages = images.length;
let width = images[0].clientWidth;



//left arrow
let previous = document.createElement('i');
previous.classList.add('fa-arrow-left');
previous.classList.add('fas');
previous.classList.add('fa-2x');
previous.style.position = 'absolute';
previous.style.top = '200px';
previous.style.left = '20px';
previous.style.zIndex = 1;
container.appendChild(previous);

//right arrow
let next = document.createElement('i');
next.classList.add('fa-arrow-right');
next.classList.add('fas');
next.classList.add('fa-2x');
next.style.position = 'absolute';
next.style.top = '200px';
next.style.left = '565px';
next.style.zIndex = 1;
container.appendChild(next);

//div for circles
let newdiv = document.createElement('div');
newdiv.style.position = 'relative';
newdiv.style.bottom = '16%';
newdiv.style.backgroundColor = 'transparent';
newdiv.style.textAlign = 'center';
container.appendChild(newdiv);


let circle, allCircle = [];
for (let i = 0; i < numberOfImages - 2; i++) {
    circle = document.createElement('i');
    circle.setAttribute('id', i + 1);
    circle.classList.add('fa-2x');
    circle.classList.add('fa-circle');
    if (i + 1 == counter) {
        circle.classList.add('fas');
    }
    else {
        circle.classList.add('far');
    }
    circle.style.margin = '10px';
    circle.addEventListener('click', (e) => onCircleClicked(e));
    newdiv.appendChild(circle);
    allCircle.push(circle);
}


slider.style.transform = `translateX(${-counter * width}px)`;


let transition = () => {
    slider.style.transition = 'transform 0.35s linear';
    slider.style.transform = `translateX(${-counter * width}px)`;
}

let forwardTransition = () => {
    if (counter < numberOfImages - 1) {

        //unfill circle
        allCircle[counter - 1].classList.remove('fas');
        allCircle[counter - 1].classList.add('far');

        counter++;

        transition();
    }
}

let backTransition = () => {
    if (counter > 0) {

        //unfill circle
        allCircle[counter - 1].classList.remove('fas');
        allCircle[counter - 1].classList.add('far');

        counter--;
        transition();
    }
}

let timeout = () => {
    setTimeout(() => {
        forwardTransition();
    }, 2300);
};

let timeoutID = timeout();


//event handle
previous.addEventListener('click', backTransition);
next.addEventListener('click', forwardTransition);

slider.addEventListener('transitionend', () => {
    if (counter == 0) {
        slider.style.transition = 'none';
        counter = numberOfImages - 2;
        slider.style.transform = `translateX(${-counter * width}px)`;
    }
    else if (counter == numberOfImages - 1) {
        slider.style.transition = 'none';
        counter = 1;
        slider.style.transform = `translateX(${-counter * width}px)`;
    }

    //fill circle
    allCircle[counter - 1].classList.remove('far');
    allCircle[counter - 1].classList.add('fas');

    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
        forwardTransition();
    }, 2300);
})


onCircleClicked = (e) => {
    id = e.target.getAttribute('id');

    slider.style.transition = 'none';

    //unfill circle
    allCircle[counter - 1].classList.remove('fas');
    allCircle[counter - 1].classList.add('far');

    counter = parseInt(id);

    slider.style.transform = `translateX(${-counter * width}px)`;

    //fill circle
    allCircle[counter - 1].classList.remove('far');
    allCircle[counter - 1].classList.add('fas');
}


//change size on hover
let increase = (e) => {
    e.target.classList.add('fa-3x');
}

let decrease = (e) => {
    e.target.classList.remove('fa-3x');
}

let icons = document.querySelectorAll('i');

icons.forEach(icon => {
    icon.addEventListener('mouseenter', e => increase(e));
    icon.addEventListener('mouseout', e => decrease(e));
});