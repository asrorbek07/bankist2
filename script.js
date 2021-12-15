'use strict';
// ELEMENTS
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const header = document.querySelector(".header");
const elSection1 = document.querySelector("#section--1");
const elNavLinks = document.querySelector(".nav__links");
const elNav = document.querySelector(".nav");


// BUTTONS
const elBtnScrollTo = document.querySelector(".btn--scroll-to");
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btnOpenModal => {
  btnOpenModal.addEventListener("click", openModal)
});


btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
header.append(message);
// Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();
    header.remove(message);
  });


//  BUTTON SCROLLING
  elBtnScrollTo.addEventListener("click", function (evt){
    evt.preventDefault();
    elSection1.scrollIntoView({behavior:"smooth"})
  })



// PAGE NAVIGATION

 elNavLinks.addEventListener("click", function (evt) {
   if (evt.target.classList.contains("nav__link")) {
    evt.preventDefault();
    document.querySelector(evt.target.getAttribute('href')).scrollIntoView({behavior: "smooth"})
   }

 })

//  OPERATION

const elTabsContainer = document.querySelector(".operations__tab-container");
const elTabs = document.querySelectorAll(".operations__tab");
const elTabsContent = document.querySelectorAll(".operations__content");

elTabsContainer.addEventListener("click", function (evt){
const clickedTab = evt.target.closest(".operations__tab")
if (!clickedTab) return
   elTabs.forEach(element => {
     element.classList.remove("operations__tab--active")
   });
   elTabsContent.forEach(tabContent=> {
    tabContent.classList.remove("operations__content--active")
   })
   clickedTab.classList.add("operations__tab--active")
   document.querySelector(`.operations__content--${clickedTab.dataset.tab}`).classList.add("operations__content--active")
}
)

// MENU FADE ANIMATION

const handleHover = function (evt) {
if (evt.target.classList.contains("nav__link")) {
   const hoverLink = evt.target;
   hoverLink.closest(".nav").querySelectorAll(".nav__link").forEach(sibling =>{
if (sibling!==hoverLink) {
  sibling.style.opacity = this
}
   })
   hoverLink.closest(".nav").querySelector("img").style.opacity=this
}
}

elNav.addEventListener("mouseover", handleHover.bind(0.5) )
elNav.addEventListener("mouseout", handleHover.bind(1) )

// INTERESECTION OBSERVED

new IntersectionObserver(entries => {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    elNav.classList.add("sticky")
  } else {
    elNav.classList.remove("sticky")
  }
}, { root: null, threshold: 0, rootMargin:`-${elNav.getBoundingClientRect().height}px`}).observe(header)

// REVEAL SECTIONS

const elAllSections = document.querySelectorAll(".section")
const revealSection = function(entries, observer){
  const [entry] = entries;
if (!entry.isIntersecting) return
entry.target.classList.remove("section--hidden")
observer.unobserve(entry.target)
}
const sectionObserver = new IntersectionObserver(revealSection,
  {
  root: null,
threshold: 0.15,
})
elAllSections.forEach(section => {
  sectionObserver.observe(section)
  section.classList.add("section--hidden")
})

// LAZY LOADING IMAGES

const elImgTargets = document.querySelectorAll('.features__img')
const loadingImg = function(entries, observer){
  const [entry] = entries;
  if (!entry.isIntersecting) return
  entry.target.src = entry.target.dataset.src
  entry.target.addEventListener("load", function(){
    entry.target.classList.remove("lazy-img")
  })
  observer.unobserve(entry.target)
}
const imgObserver = new IntersectionObserver(loadingImg, {
root:null,
threshold:0,

})
elImgTargets.forEach(img => {
  imgObserver.observe(img)
})

// SLIDER
const elSlides = document.querySelectorAll(".slide")
const elBtnRight = document.querySelector(".slider__btn--right")
const elBtnLeft = document.querySelector(".slider__btn--left")
let currentSlideIndex=0;
const maxSlideIndex=elSlides.length;
const elDotContainer = document.querySelector(".dots");
// functions

const createDots =function(){
  elSlides.forEach((_, i) => {
  elDotContainer.insertAdjacentHTML("beforeend", `<button class="dots__dot" data-slide="${i}"></button>`)
  })
}

const activateDots = function(slideIndex){
  document.querySelectorAll(".dots__dot").forEach(dot=>{
    dot.classList.remove("dots__dot--active")
    document.querySelector(`.dots__dot[data-slide="${slideIndex}"]`).classList.add("dots__dot--active")
  })
}

const moveToSlide = function(slideIndex){
  elSlides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100*(i-slideIndex)}%)`
  })
}

const init = function(slideIndex){
  createDots()
  activateDots(slideIndex)
  moveToSlide(slideIndex);
}
init(currentSlideIndex)

const nextSlide = function(){
  if(currentSlideIndex===maxSlideIndex-1) {
    currentSlideIndex=0;
  } else{
    currentSlideIndex++
  }
  activateDots(currentSlideIndex)
  moveToSlide(currentSlideIndex)
}
const previousSlide = function(){
  if(currentSlideIndex===0) {
    currentSlideIndex=maxSlideIndex-1;
  } else{
    currentSlideIndex--
  }
  activateDots(currentSlideIndex)
  moveToSlide(currentSlideIndex)
}

elBtnRight.addEventListener("click", nextSlide)
elBtnLeft.addEventListener("click", previousSlide)

elDotContainer.addEventListener("click", function(evt){
  if(evt.target.classList.contains("dots__dot")){
    const slide = evt.target.dataset.slide
    activateDots(slide)
    moveToSlide(slide)
  }
})