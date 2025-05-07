const html = document.querySelector("html");
const body = document.querySelector(".body");


//====== Registerd ScrollTrigger Plugin ==========
gsap.registerPlugin(ScrollTrigger);

function hideLoader(){
  tl.to(".loader-upper",{
      y:"-100%",
      duration:0.8,
      ease: "sine.inOut",
  })
  tl.to(".loader-inner",{
      x:"100%",
      duration:0.8,
      ease: "sine.inOut",
  }, "-=0.15")
}

//========= LENIS START =========
const lenis = new Lenis({
  duration: 1,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  infinite: false,
  syncTouch:false, // mimic touch device scroll while allowing scroll sync (can be unstable on iOS<16)
  smoothTouch: false,
});

function raf(time){
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
//========= LENIS END =========

//========= SCROLL & NAVBAR TOGGLE START =========
// const headerTop = document.querySelector(".header-top");
const headerBottom = document.querySelector(".header-bottom");

let prevScrollPos = 0;
const scrollThreshold = 10;  // Prevents accidental small scroll triggers
function checkScroll(){
  let scrollTop = lenis.scroll || document.documentElement.scrollTop;
  if(scrollTop - prevScrollPos > scrollThreshold){
    // headerBottom.classList.remove("hiiden");
    headerBottom.classList.add("sticky");
  }else if(prevScrollPos - scrollTop > scrollThreshold){
    // headerBottom.classList.add("hidden");
    headerBottom.classList.remove("sticky");
  }
  prevScrollPos = Math.max(0, scrollTop); // Update previous scroll position
}

// let lastScrollY = window.scrollY;
// function checkScroll(){
//   let scrollY = window.scrollY;
//   if(scrollY < lastScrollY){
//     // scrolling down
//     headerBottom.classList.add("hidden");
//   }else{
//     // scrolling up
//     headerBottom.classList.remove("hidden");
//   }

//   // show header-top only when at top
//   // if(scrollY === 0){
//   //   headerTop.style.transform = "translateY(0)";
//   // }else{
//   //   headerTop.style.transform = "translateY(-100%)";
//   // }

//   lastScrollY = scrollY;
// }
//========= SCROLL & NAVBAR TOGGLE END =========

//======= LENIS SCROLL CONTROL =========
let isOpened = false;
function stopLenisScroll(){
  isOpened = !isOpened;
  isOpened ?  lenis.stop() : lenis.start() 
}

//======= ACTIVE NAVIGATION LINK START =========
const windowPathname = window.location.pathname;
const navLinks = document.querySelectorAll(".navbar__link");

navLinks.forEach(link =>{
 const navLinkPathname = new URL(link.href, window.location.origin).pathname;
 const isActiveLink = windowPathname === navLinkPathname || (windowPathname === "/index.html" && navLinkPathname === "/")
  link.classList.toggle("active", isActiveLink);
});
//======= ACTIVE NAVIGATION LINK END =========


//======= BANNER CONTENT ANIMATION START =========
function bannerContentsAnimation(){
  const tl = gsap.timeline();
  // Header Animation Start
  tl.from([".header-top__list li",".header__logo", ".header-btn"], {
    opacity: 0,
    y: 50,
    delay: 0.6,
    duration: 1,
    stagger:0.1,
    ease: Expo.easeInOut,
  });
  tl.from([".navbar__link", "#hamburger-btn"], {
      opacity:0,
      y:40,
      duration:0.8,
      stagger:0.1,
      delay:-1.15,
      ease:"power4.out",
    }
  );
  // Header Animation End


  tl.from(".hero-title", {
    opacity: 0,
    duration: 1,
    // y: 50,
    delay: -1.05,
    stagger:0.1,
    ease: "power4.out",
  });
  const heroSubTitle = document.querySelector(".hero-subTitle");
  heroSubTitle && tl.from(heroSubTitle, {
    opacity: 0,
    duration: 1,
    y: 50,
    delay: -1.10,
    stagger:0.1,
    ease: "power4.out",
  });
  
  const heroBtns = document.querySelectorAll(".banner-btn");
  heroBtns && heroBtns.forEach((heroBtn)=>{
    tl.from(heroBtn, {
      opacity: 0,
      duration: 1,
      y: 50,
      delay: -1.15,
      stagger:0.1,
      ease: "power4.out",
    });
  })

  tl.from(".banner-bottom-wrapper",{
    opacity:0,
    duration:1,
    delay:-1.25,
    ease:"power4.in",
  })
  

  tl.from(".accordion-wrapper",{
    opacity:0,
    y:30,
    duration:0.8,
    delay:-1.35,
    stagger:0.1,
    ease:"power4.in"
  })

  tl.from(".connect__title",{
    opacity:0,
    duration:1,
    delay:-1.85,
    ease:"power4.in"
  })

  tl.from(".connect__link",{
    opacity:0,
    y:30,
    delay:-1.5,
    duration:1,
    stagger:0.2,
    ease:"power4.inOut"
  })
  tl.from(".socials__list li",{
    opacity:0,
    y:30,
    delay:-1.65,
    duration:1,
    stagger:0.2,
    ease:"power4.inOut"
  })

  const bannerImage = document.querySelectorAll(".hero-img");
  bannerImage && tl.from(bannerImage, {
    opacity: 0,
    // y: 30,
    duration: 1.25,
    delay: -2,
    stagger:0.1,
    ease:"power4.in",
  });
}
//======= BANNER CONTENT ANIMATION END =========

//====== TOGGLE MOBILE SUBMENU START ==========
const mobileMenuLinks = document.querySelectorAll(".mobile-menu__item");
const mobileMenuLinksArr = Array.from(mobileMenuLinks);
const hamburgerBtn = document.getElementById("hamburger-btn");

const tl = gsap.timeline();
hamburgerBtn && hamburgerBtn.addEventListener('click', () => {
  gsap.fromTo(".aside-mobile", 
    {
      opacity:0,
      x:"-100%",

    },{
      opacity:1,
      x:0,
      duration:0.8,
      ease:"power3.inOut"
    }
  );
  tl.fromTo(".close-menu-btn", 
    {
     opacity:0,
     duration:0.6,
   },{
     opacity:1,
     delay:0.02,
     ease:"power3.inOut",
   }
  )
  mobileMenuLinksArr.forEach((mobileLink)=>{
      gsap.fromTo(mobileLink,
        {
            opacity:0,
            y:60,
        },{
            opacity:1,
            y:0,
            duration:1.2,
            stagger:0.5,
            ease:"power3.inOut"
        }
      );
  });

  tl.fromTo(".socials__item", 
    {
      opacity:0,
      x:-100,
    },{
      opacity:1,
      x:0,
      stagger:0.02,
      delay:-0.1,
      duration:0.8,
      ease:"power3.inOut",
    }
  )
  stopLenisScroll();
});

// window.addEventListener("resize", function(){
//   if (window.innerWidth >= 992) {
//     $(".aside-mobile").addClass();
//   }
// })

const closeMenuBtn = document.querySelector("#close-menu-btn");
closeMenuBtn && closeMenuBtn.addEventListener("click", function(){
  tl.fromTo(".socials__item", 
    {
      opacity:1,
      x:0,
      stagger:0.02,
      delay:-0.1,
      duration:1,
      ease:"power3.inOut",
    },{
      opacity:0,
      x:-100,
    }
  )
  mobileMenuLinksArr.forEach((mobileLink)=>{
    gsap.fromTo(mobileLink,
      {
          opacity:1,
          y:0,
          duration:1.2,
          stagger:0.5,
          ease:"power3.inOut"
      },{
          opacity:0,
          y:60,
      }
     );
   });
  tl.fromTo(".close-menu-btn", 
    {
     opacity:1,
     duration:0.6,
     delay:0.02,
     ease:"power3.inOut",
    },{
     opacity:0,
    }
  )
  gsap.fromTo(".aside-mobile", 
    {
      opacity:1,
      x:0,
      duration:0.65,
      ease:"power3.inOut"
    },{
      opacity:0,
      x:"-100%",
    }
  );
  stopLenisScroll();  
});

const backMenuBtn = document.getElementById("arrow-back-btn");
const mobileSubmenu = document.getElementById("mobileSubmenu");
const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");

// Ensure elements exist before adding event listeners
if(mobileSubmenu && mobileMenuOverlay) {
    mobileSubmenu.addEventListener("click", () => {
        mobileMenuOverlay.classList.add("show");
        gsap.from(".top-title",{
          opacity:0,
          duration:1,
          stagger:0.1,
          ease:"power4.in"
        })
        gsap.from(".mobile-menu-overlay-wrapper .mobile-menu__link",{
          opacity:0,
          y:30,
          duration:1,
          stagger:0.1,
          ease:"power4.inOut"
        });
    });
}

if(backMenuBtn && mobileMenuOverlay) {
  backMenuBtn.addEventListener("click", () => mobileMenuOverlay.classList.remove("show"));
}


// const mobileSubmenus = document.querySelectorAll(".mobile-submenu");
// if(mobileSubmenus.length){
//   mobileSubmenus.forEach((submenu)=>{
//     submenu.addEventListener("click", function(){
//         const menu = submenu.querySelector(".subMenu__list--mobile");
//         submenu.classList.toggle("active");
//         menu.style.maxHeight = menu.style.maxHeight = menu.style.maxHeight ? null : `${menu.scrollHeight}px`;
   
//         mobileSubmenus.forEach((otherSubmenu)=>{
//           if(otherSubmenu !== submenu){
//             otherSubmenu.classList.remove("active");
//             const otherMenu = otherSubmenu.querySelector(".subMenu__list--mobile");
//             if(otherMenu) otherMenu.style.maxHeight = null;
//           }
//         })
//     })
//   })
// }
//====== TOGGLE MOBILE SUBMENU END ==========


// JavaScript for lazy loading background images start
let lazyBackgrounds = [].slice.call(document.querySelectorAll("[data-bg]"));

if("IntersectionObserver" in window){
    const lazyBackgroundObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if(entry.isIntersecting){
                let lazyBackground = entry.target;
                let imgUrl = lazyBackground.getAttribute("data-bg");
                if(entry.target.classList.contains("banner-container")){
                    let linearGredient = "linear-gradient(to bottom, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45))";
                    lazyBackground.style.backgroundImage = `${linearGredient}, url("${imgUrl}")`;
                }else{
                    lazyBackground.style.backgroundImage = `url("${imgUrl}")`;
                }
                lazyBackground.classList.remove("lazy");
                lazyBackgroundObserver.unobserve(lazyBackground);
            }
        });
    });

    lazyBackgrounds.forEach((lazyBackground) =>{
        lazyBackgroundObserver.observe(lazyBackground);
    });
}
// JavaScript for lazy loading background images End

//======== ACCORDION TOGGLE START ========
let content;
function toggleAccordion(element){ 
  element.classList.toggle("is-open");
  content = element.nextElementSibling;
  if(content){
    const isOpening = content.style.maxHeight;
    content.style.maxHeight = isOpening ? null : `${content.scrollHeight}px`;
    gsap.fromTo(content.children, 
      { opacity: 0, y:50 },
      { opacity: 1, y:0, duration:0.75, stagger:0.1, ease:"power4.out"}
    );
  }
}

const accordionBtns = document.querySelectorAll(".accordion-title");
accordionBtns && accordionBtns.forEach((accordion) => {
  accordion.addEventListener("click",function (e){
    e.stopPropagation();
    toggleAccordion(accordion);
    accordionBtns.forEach(otherAccordion => {
      if(otherAccordion !== accordion) {
        otherAccordion.classList.remove("is-open");
        otherAccordion.nextElementSibling.style.maxHeight = null;
      }
    });
  });
});
//======== ACCORDION TOGGLE END ========

//======= COUNTER START  ===========
function visible($el) {
  let $w = jQuery(window),
    viewTop = $w.scrollTop(),
    viewBottom = viewTop + $w.height(),
    elTop = $el.offset().top,
    elBottom = elTop + $el.height();
    compareTop = $el === true ? elBottom : elTop,
    compareBottom = $el === true ? elTop : elBottom;

  return (
    compareBottom <= viewBottom && compareTop >= viewTop && $el.is(":visible")
  );
}


function updateCounter(){
  ScrollTrigger.create({
    trigger: "#stats-section",
    start: "top 80%",
    once: true,
    onEnter: () => {
      if ($("#stats-section").hasClass("animated")) return; // already run
    
      $("#stats-section").addClass("animated"); // mark it as run
    
      document.querySelectorAll(".counter__value").forEach((el) => {
        const target = parseFloat(el.dataset.target);
        const formatType = el.dataset.format;
    
        gsap.fromTo(el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: "power1.out",
            snap: { innerText: 1 },
            onUpdate: function () {
              const value = Math.trunc(el.innerText);
              if (formatType === "abbreviated") {
                el.innerText = value;
              } else {
                el.innerText = value.toLocaleString("en-US");
              }
            }
          }
        );
      });
    }
    
  });
}
//======= COUNTER END ==========


//======= FLOATING INPUT LABLE START ======
document.querySelectorAll(".form__control").forEach((input) => {
  input.addEventListener("focus", () => input.nextElementSibling.classList.add("focused"))
  input.addEventListener("blur", () => input.nextElementSibling.classList.toggle("focused", input.value !== ""));
}); 
//======= FLOATING INPUT LABLE END ======


//===== ENABLE/DISABLE SUBMIT BUTTON START =======
const inputCheckbox = document.getElementById("agree-consent");
inputCheckbox && inputCheckbox.addEventListener("change", function() {
  const submitBtn = document.getElementById("submit-btn");
  this.checked ? submitBtn.classList.remove("disabled") : submitBtn.classList.add("disabled");
});
//===== ENABLE/DISABLE SUBMIT BUTTON END ======


const swiperServices = new Swiper(".swiper-services",{
  spaceBetween: 10,
  slidesPerView: 1.3,
  // loop:true,
  slidesPerView:1,
  grabCursor: true,
  navigation:{
      nextEl:"#swiper-next-services",
      prevEl:"#swiper-prev-services",
  },
  breakpoints:{
      576:{
          slidesPerView: 2,
          spaceBetween: 16,
      },
      768:{
          slidesPerView:3,
          spaceBetween: 20,         
      },
      992:{
          slidesPerView:3,
          spaceBetween: 24,
      },
      1200:{
          slidesPerView:4,
          spaceBetween: 28,
      },
      1600:{
        slidesPerView:4,
          spaceBetween: 32,
      },
  }
});


const swiperTestimonials = new Swiper(".swiper-testimonials",{
  spaceBetween: 10,
  slidesPerView: 1.12,
  loop:true,
  spaceBetween: 16,
  grabCursor: true,
  // navigation:{
  //     nextEl:"#swiper-next-services",
  //     prevEl:"#swiper-prev-services",
  // },
  breakpoints:{
      576:{
          slidesPerView: 2.25,
          spaceBetween: 20,
      },
      768:{
          slidesPerView:2.5,
          spaceBetween: 24,         
      },
      992:{
          slidesPerView:3.25,
          spaceBetween: 28,
      },
      1200:{
        slidesPerView:3.5,
        spaceBetween: 36,
      },
      1600:{
        slidesPerView:4.5,
        spaceBetween: 48,
      },
      1920:{
        slidesPerView:4.5,
        spaceBetween: 54,
      },
  }
});


//====== ANIMATION SCRIPT START =========
const textContainers = gsap.utils.toArray(".fade-up");
textContainers.forEach((textContainer, i) => {
  const anim = gsap.fromTo(
    textContainer,
    { opacity: 0, y: 50 },
    { duration: 1, opacity: 1, y: 0 }
  );
  ScrollTrigger.create({
    trigger: textContainer,
    animation: anim,
    toggleActions: "play",
    once: true,
    duration: 1,
    stagger:0.2,
    ease:"power4.inOut",
  });
});

const fadeIn = gsap.utils.toArray(".fade-in");
fadeIn.forEach((mainContent, i) => {
  const anim = gsap.fromTo(
    mainContent,
    { opacity: 0 },
    { opacity: 1, duration: 1.15}
  );
  ScrollTrigger.create({
    trigger: mainContent,
    animation: anim,
    toggleActions: "play",
    once: true,
    duration: 1.15,
    ease: "power4.in",
  });
});
//====== ANIMATION SCRIPT END =========

const dividers = gsap.utils.toArray(".divider");
dividers.forEach((divider, i)=>{
  const anim = gsap.fromTo(divider,
    { opacity:0, width:"0%", transformOrigin:"left"},
    { opacity:1, width:"100%", duration:1.5, ease:"power4.inOut"}
  )
  ScrollTrigger.create({
    trigger: divider,
    animation: anim,
    toggleActions: "play",
    once: true,
    duration: 1.5,
    // delay:-0.1,
    stagger:0.1,
    ease: "power4.inOut",
  });
})

//====== Filter Portfolio Start ============
const tabBtns = document.querySelectorAll(".btn--tabs");
if(tabBtns.length){
  tabBtns.forEach((filterBtn) => {
    filterBtn.addEventListener("click", (e)=> filterCards(e.currentTarget.value));
  });
}
  
//==== FILTER PORTFOLIO START ========
function filterCards(category){
  const cards = document.querySelectorAll('.filter-projects');
  cards.forEach((card) => {
    let cardCategories = card.dataset.category.split(' ');
    const isVisible = category === "all" || cardCategories.includes(category)
    card.classList.toggle("show", isVisible);
    gsap.fromTo(card,
      {
        opacity:0
      },
      {
        duration:0.9,
        opacity:1,
        duration:0.85,
        stagger:0.1,
        // opacity:isVisible ? 1 : 0,
        // scale:isVisible ? 1 : 0.95,
        ease:"power3.out",
      }
    );
  });
  updateButtonState(category);
}
  
//----- Update Button State -----
function updateButtonState(category){
  tabBtns.forEach((tabBtn) => {
    const isActive = tabBtn.getAttribute("value") === category;
    tabBtn.classList.toggle("active", isActive);
  });
}
//====== FILTER PORTFOLIO END =============

window.addEventListener("load",()=>{
  hideLoader();
  bannerContentsAnimation();
  tabBtns.length && filterCards('all');
});

// Lenis scroll event
const onLenisScroll =()=>{
  checkScroll();
  updateCounter();
  ScrollTrigger.update();
}

lenis.on('scroll', onLenisScroll);

// Sync Lenis with GSAP
gsap.ticker.add((time)=>{
  lenis.raf(time * 1000);
});

// Disable GSAP lag smoothing for better performance
gsap.ticker.lagSmoothing(0);
