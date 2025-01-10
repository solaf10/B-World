const container = document.querySelector("header .container");
const cardID = +window.location.search[window.location.search.length - 1];
console.log();
const baseURL = `https://example-data.draftbit.com/books/`;
function read() {
  container.classList.add("loading");
  container.innerHTML = `<div class="loader-holder">
  <div class="loader"></div>
  </div>`;
  fetch(`${baseURL}${cardID}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      container.classList.remove("loading");
      container.innerHTML = "";
      container.innerHTML += `
      <img src="${data.image_url}" />
        <div class="content">
          <div class="text">
            <h1>${data.title}</h1>
            <span class="author">${data.authors}</span>
            <h2>About Book:</h2>
            <p>${data.description}</p>
            <div class="counter">
              <img src="./assets/imgs/minus-icons.svg" alt="" />
              <span class="quantity">1</span>
              <img src="./assets/imgs/plus-icon.svg" alt="" />
            </div>
            <div class="btns">
              <button class="cart">Add To Cart</button>
              <button class="cart">Favorite</button>
            </div>
          </div>
          <div class="infos">
            <div class="pages">
              <span class="title">Pages Number :</span>
              <span>${data.num_pages} Pages</span>
            </div>
            <div class="rating-counts">
              <span class="title">Rating Count :</span>
              <span>${data.rating_count}</span>
            </div>
            <div class="reviews">
              <span class="title">Reviews :</span>
              <span>${data.review_count}</span>
            </div>
          </div>
        </div>
      `;
    })
    .catch((err) => {
      container.classList.add("loading");
      container.innerHTML = `<div class="loader-holder">
      <div class="loader"></div>
      </div>`;
    });
}
read();
// dark&light and brger menu
const sideBar = document.querySelector(".sidebar");
const menuIcon = document.querySelector(".burger-menu");
const closeIcon = document.querySelector(".close-icon");
// dark&light
const darkIcon = document.querySelector(".dark-holder img");
const darkTitle = document.querySelectorAll(".dark-holder span");
const darkSwitch = document.querySelector(".switch .circle");
const logo = document.querySelector(".logo");
// burger menu
menuIcon.addEventListener("click", (event) => {
  sideBar.style.display = "block";
  sideBar.style.width = "256px";
});
closeIcon.addEventListener("click", (event) => {
  sideBar.style.display = "none";
  sideBar.style.width = "0px";
});
// dark&light mode
darkIcon.addEventListener("click", (event) => {
  if (localStorage.getItem("isDark") == "dark") {
    localStorage.setItem("isDark", "light");
    document.body.classList.remove("dark");
    darkIcon.src = "/assets/imgs/moon-01.svg";
    Array.from(darkTitle)[0].innerHTML = "Dark mode";
    logo.src = "/assets/imgs/Logo.svg";
  } else {
    localStorage.setItem("isDark", "dark");
    document.body.classList.add("dark");
    darkIcon.src = "/assets/imgs/light-icon.svg";
    Array.from(darkTitle)[0].innerHTML = "Light mode";
    logo.src = "/assets/imgs/dark-logo.svg";
  }
});
darkSwitch.addEventListener("click", (event) => {
  if (localStorage.getItem("isDark") == "dark") {
    localStorage.setItem("isDark", "light");
    document.body.classList.remove("dark");
    Array.from(darkTitle)[1].innerHTML = "Dark mode";
    darkSwitch.parentElement.style.justifyContent = "end";
    logo.src = "/assets/imgs/Logo.svg";
  } else {
    localStorage.setItem("isDark", "dark");
    document.body.classList.add("dark");
    Array.from(darkTitle)[1].innerHTML = "Light mode";
    darkSwitch.parentElement.style.justifyContent = "start";
    logo.src = "/assets/imgs/dark-logo.svg";
  }
});
if (localStorage.getItem("isDark") == "dark") {
  Array.from(darkTitle)[1].innerHTML = "Light mode";
  darkSwitch.parentElement.style.justifyContent = "start";
  logo.src = "/assets/imgs/dark-logo.svg";
  darkIcon.src = "/assets/imgs/light-icon.svg";
  Array.from(darkTitle)[0].innerHTML = "Light mode";
  document.body.classList.add("dark");
} else {
  document.body.classList.remove("dark");
  Array.from(darkTitle)[1].innerHTML = "Dark mode";
  darkSwitch.parentElement.style.justifyContent = "end";
  logo.src = "/assets/imgs/Logo.svg";
  darkIcon.src = "/assets/imgs/moon-01.svg";
  Array.from(darkTitle)[0].innerHTML = "Dark mode";
}
