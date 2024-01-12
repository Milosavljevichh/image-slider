const frame = document.getElementById('frame');
const images = document.getElementById('frame').querySelectorAll('img');
const slides = Array.from(images);
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const dots_container = document.getElementById('dotsContainer');
const full_img_container = document.getElementById('fullImage');
const root = document.querySelector(':root');
const close_btn = document.getElementById('close');
let readyToShowSlide = true;
let timeoutId;

//add dots below the slider frame, depending on how many slides there are
for (const slide of slides){
    const dot = document.createElement('img');
    dot.src = 'img/circle.png';
    dots_container.appendChild(dot);
};

let dots_array = Array.from(dots_container.querySelectorAll('img'));

//active is a value that will be used to access the desired slide
let active = 0;

let result = slides.every(slide=>{
    //if all slides are inactive returns true
    if (slide.classList.contains('inactive') === slides[0].classList.contains('inactive')) {
        return true;
    }
});

if (result) {
    //if all slides are disabled, show first slide
    slides[0].classList.remove('inactive');
    dots_array[0].src = 'img/button.png';
};

function loadNextSlide() {
    if (readyToShowSlide) {
        readyToShowSlide = false;
        next.disabled = true;
        active++
        //if the active number exceeds the number of slides,
        //set the first slide to active and give it a fade-in animation
        //on animation end, set active to 0 and disabled the last slide of the slides array
        //remove the event listener at the end in order to not cause bugs
        if (active === slides.length) {
            slides[0].classList.toggle('inactive');
            dots_array[0].src = 'img/button.png';
            dots_array[dots_array.length - 1].src = 'img/circle.png';
            slides[0].classList.add('fade-in');
            slides[0].addEventListener('animationend', function nextSlide(){
                active = 0;
                slides[slides.length - 1].classList.toggle('inactive');
                slides[0].classList.remove('fade-in');
                slides[0].removeEventListener('animationend', nextSlide);
                next.disabled = false;
                readyToShowSlide = true;
            });
        //if the active number is in range of the number of slides,
        //show the next slide, give it an animation and when animation ends,
        //set the previous slide to inactive
        } else {
            slides[active].classList.toggle('inactive');
            dots_array[active].src = 'img/button.png';
            dots_array[active - 1].src = 'img/circle.png';
            slides[active].classList.add('fade-in');
            slides[active].addEventListener('animationend', function nextSlide(){
                slides[active-1].classList.toggle('inactive');
                slides[active].classList.remove('fade-in');
                slides[active].removeEventListener('animationend', nextSlide);
                next.disabled = false;
                readyToShowSlide = true;
        });
    }}
};

function loadPreviousSlide() {
    if (readyToShowSlide) {
        readyToShowSlide = false;
        previous.disabled = true;
        active--
        if (active === -1) {
            slides[slides.length - 1].classList.toggle('inactive');
            dots_array[dots_array.length - 1].src = 'img/button.png';
            dots_array[0].src = 'img/circle.png';
            slides[slides.length - 1].classList.add('fade-in');
            slides[slides.length - 1].addEventListener('animationend', function nextSlide(){
                active = slides.length - 1;
                slides[0].classList.toggle('inactive');
                slides[slides.length - 1].classList.remove('fade-in');
                slides[slides.length - 1].removeEventListener('animationend', nextSlide);
                previous.disabled = false;
                readyToShowSlide = true;
            })
        } else {
            slides[active].classList.toggle('inactive');
            dots_array[active].src = 'img/button.png';
            dots_array[active+1].src = 'img/circle.png';
            slides[active].classList.add('fade-in');
            slides[active].addEventListener('animationend', function nextSlide(){
                slides[active+1].classList.toggle('inactive');
                slides[active].classList.remove('fade-in');
                slides[active].removeEventListener('animationend', nextSlide);
                previous.disabled = false;
                readyToShowSlide = true;
            });
    }}
};

next.addEventListener('click', loadNextSlide);
previous.addEventListener('click', loadPreviousSlide);

frame.addEventListener('mouseenter', () => {
    if (timeoutId) {
        clearTimeout(timeoutId);
    };
});

frame.addEventListener('mouseleave', () => {
    loopThroughSlides();
});

frame.addEventListener('click', ()=>{
    const img = document.createElement('img');
    img.src = slides[active].src;
    full_img_container.appendChild(img);
    root.style.setProperty('--display', 'flex');
});

close_btn.addEventListener('click', ()=>{
    root.style.setProperty('--display', 'none');
    let img = full_img_container.querySelector('img');
    full_img_container.removeChild(img);
});

const transitionDelay = 3000;
function loopThroughSlides() {
    timeoutId = setTimeout(() => {
        loadNextSlide();
        loopThroughSlides();
    }, transitionDelay);
};

loopThroughSlides();