'use strict';

document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');



// element toggle function
const elementToggleFunc = function (elem) {
  function isMobileView() {
    return window.innerWidth < 1250;
  }
  if (isMobileView()) {
    elem.classList.toggle("active");
  }
}

const elementEnableFunc = function (elem, enable) {
  function isMobileView() {
    return window.innerWidth < 1250;
  }
  if (isMobileView()) {
    if (enable) {
      elem.classList.add("active");
    } else {
      elem.classList.remove("active");
    }
  } else {
    elem.classList.remove("active");
  }
}



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
if (filterBtn.length > 0) {
  let lastClickedBtn = filterBtn[0];

  for (let i = 0; i < filterBtn.length; i++) {

    filterBtn[i].addEventListener("click", function () {

      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;

    });

  }
}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
const validPages = ["about", "resume", "portfolio", "contact"];

const activatePage = function (pageName) {
  for (let i = 0; i < pages.length; i++) {
    pages[i].classList.toggle("active", pages[i].dataset.page === pageName);
  }

  for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].classList.toggle("active", navigationLinks[i].dataset.page === pageName);
  }

  elementEnableFunc(sidebar, pageName === "contact");
};

const getPageFromHash = function () {
  const hash = window.location.hash.slice(1).toLowerCase();
  return validPages.includes(hash) ? hash : "about";
};

const navigateToPage = function (pageName, updateHash) {
  activatePage(pageName);

  if (updateHash && window.location.hash !== `#${pageName}`) {
    history.replaceState(null, "", `#${pageName}`);
  }

  window.scrollTo(0, 0);
};

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function (event) {
    event.preventDefault();
    navigateToPage(this.dataset.page, true);
  });
}

window.addEventListener("hashchange", function () {
  navigateToPage(getPageFromHash(), false);
});

navigateToPage(getPageFromHash(), false);

function openModal(imageSrc) {
  document.getElementById('modalImg').src = imageSrc;
  document.getElementById('imgModal').style.display = "block";
}

function closeModal() {
  document.getElementById('imgModal').style.display = "none";
}
