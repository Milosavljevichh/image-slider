
let images = document.getElementById('frame').querySelectorAll('img');
let slides = Array.from(images);

let next = document.getElementById('next');
let previous = document.getElementById('previous');

let dots_container = document.getElementById('dotsContainer');

let readyToShowSlide = true;

//add dots below the slider frame, depending on how many slides there are
for (let i=0;i<slides.length;i++){
    let dot = document.createElement('img');
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
                loopThroughSlides();
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
                loopThroughSlides();
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
                loopThroughSlides();
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
                loopThroughSlides();
            });
    }}
};

next.addEventListener('click', loadNextSlide);
previous.addEventListener('click', loadPreviousSlide);

function loopThroughSlides() {
    setTimeout(() => {
        loadNextSlide();
    }, 700);
};

loopThroughSlides();