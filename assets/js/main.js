/*---------------navigation menu-----------*/
(() => {
  const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = navMenu.querySelector(".close-nav-menu");

  hamburgerBtn.addEventListener("click", showNavMenu);
  closeNavBtn.addEventListener("click", hideNavMenu);

  function showNavMenu() {
    navMenu.classList.add("open");
    bodyScrollingToggle();
  }

  function hideNavMenu() {
    navMenu.classList.remove("open");
    fadeOutEffect();
    bodyScrollingToggle();
  }
  function fadeOutEffect() {
    document.querySelector(".fade-out-effect").classList.add("active");
    setTimeout(() => {
      document.querySelector(".fade-out-effect").classList.remove("active");
    }, 300);
  }
  //attach an event handler to document
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("link-item")) {
      if (event.target.hash !== "") {
        //prevent deefault anchor click behavior
        event.preventDefault();
        const hash = event.target.hash;
        //deactivate existing active section
        document.querySelector(".section.active").classList.add("hide");
        document.querySelector(".section.active").classList.remove("active");
        // activate new section
        document.querySelector(hash).classList.add("active");
        document.querySelector(hash).classList.remove("hide");
        /*deactivate existing active navigation menu link-item*/
        navMenu
          .querySelector(".active")
          .classList.add("outer-shadow", "hover-in-shadow");
        navMenu
          .querySelector(".active")
          .classList.remove("active", "inner-shadow");
        //if clicked link-item is contained withing the navigation menu
        if (navMenu.classList.contains("open")) {
          //activate new navigation menu link-item
          event.target.classList.add("active", "inner-shadow");
          event.target.classList.remove("outer-shadow", "hover-in-shadow");
          //hide navigation menu
          hideNavMenu();
        } else {
          let navItems = navMenu.querySelectorAll(".link-item");
          navItems.forEach((item) => {
            if (hash === item.hash) {
              // activate new navigation menu 'link-item'
              item.classList.add("active", "inner-shadow");
              item.classList.remove("outer-shadow", "hover-in-shadow");
            }
          });
          fadeOutEffect();
        }
        //add hash  (#) to url
        window.location.hash = hash;
      }
    }
  });
})();

/*-------------about section tabs----------*/
(() => {
  const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");

  tabsContainer.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("tab-item") &&
      !event.target.classList.contains("active")
    ) {
      const target = event.target.getAttribute("data-target");
      //deactivate existing active tab-item
      tabsContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");
      //active new tab-item
      event.target.classList.add("active", "outer-shadow");
      //dectivete existing active tab-content
      aboutSection
        .querySelector(".tab-content.active")
        .classList.remove("active");
      //activate new tab-content
      aboutSection.querySelector(target).classList.add("active");
    }
  });
})();

function bodyScrollingToggle() {
  document.body.classList.toggle("stop-scrolling");
}
/*-------------------- portfolio filter and popup   -------------*/

(() => {
  const filterContainer = document.querySelector(".portfolio-filter"),
    portfolioItemscontainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item");
  (popup = document.querySelector(".portfolio-popup")),
    (preBtn = popup.querySelector(".pp-prev")),
    (nextBtn = popup.querySelector(".pp-next")),
    (closeBtn = popup.querySelector(".pp-close")),
    (projectDetailsContaine = popup.querySelector(".pp-details")),
    (projectDetailBtn = popup.querySelector(".pp-project-details-btn"));
  let itemIndex, slideIndex, screenshots;

  /* filter portfolio items */
  filterContainer.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("filter-item") &&
      !event.target.classList.contains("active")
    ) {
      //deactivate existing active fiter item
      filterContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");
      //activate new filter item
      event.target.classList.add("active", "outer-shadow");
      const target = event.target.getAttribute("data-target");
      portfolioItems.forEach((item) => {
        if (target === item.getAttribute("data-catagory") || target === "all") {
          item.classList.remove("hide");
          item.classList.add("show");
        } else {
          item.classList.remove("show");
          item.classList.add("hide");
        }
      });
    }
  });
  portfolioItemscontainer.addEventListener("click", (event) => {
    if (event.target.closest(".portfolio-item-inner")) {
      const portfolioItem = event.target.closest(
        ".portfolio-item-inner"
      ).parentElement;
      // get the portfolioItem index
      itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
        portfolioItem
      );
      screenshots = portfolioItems[itemIndex]
        .querySelector(".portfolio-item-img img")
        .getAttribute("data-screenshots");
      //convert screenshots into array
      screenshots = screenshots.split(",");
      slideIndex = 0;
      popupToggle();
      popupSlideshow();
    }
  });
  closeBtn.addEventListener("click", () => {
    popupToggle();
  });

  function popupToggle() {
    popup.classList.toggle("open");
    bodyScrollingToggle();
  }

  function popupSlideshow() {
    const imgSrc = screenshots[slideIndex];
    const popupImg = popup.querySelector(".pp-img");
    //activated loader until the popuImg loaded
    popup.querySelector(".pp-loader").classList.add("active");

    popupImg.src = imgSrc;
    popupImg.onload = () => {
      //Diactivated loader until the popuImg loaded
      popup.querySelector(".pp-loader").classList.remove("active");
    };
    popup.querySelector(".pp-counter").innerHTML =
      slideIndex + 1 + " of " + screenshots.length;
  }
})();

/*--------------------hide all section except active-------------*/

// (()=>{
//     const sections =document.querySelectorAll(".section");
//     sections.forEach((section)=>{
//         if(!section.classList.contains("active")){
//             section.classList.add("hide");
//         }
//     })
// })();

window.addEventListener("load", () => {
  //preloader
  document.querySelector(".preloader").classList.add("fade-out");
  setTimeout(() => {
    document.querySelector(".preloader").style.display = "none";
  }, 600);
});
