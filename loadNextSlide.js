export default function loadNextSlide() {
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
        next.disabled = true;
        slides[0].addEventListener('animationend', function nextSlide(){
            active = 0;
            slides[slides.length - 1].classList.toggle('inactive');
            slides[0].classList.remove('fade-in');
            slides[0].removeEventListener('animationend', nextSlide);
            next.disabled = false;
        });
    //if the active number is in range of the number of slides,
    //show the next slide, give it an animation and when animation ends,
    //set the previous slide to inactive
    } else {
        slides[active].classList.toggle('inactive');
        dots_array[active].src = 'img/button.png';
        dots_array[active - 1].src = 'img/circle.png';
        slides[active].classList.add('fade-in');
        next.disabled = true;
        slides[active].addEventListener('animationend', function nextSlide(){
            slides[active-1].classList.toggle('inactive');
            slides[active].classList.remove('fade-in');
            slides[active].removeEventListener('animationend', nextSlide);
            next.disabled = false;
        });
    }
};