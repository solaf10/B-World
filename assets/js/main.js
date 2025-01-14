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
  sideBar.style.visibility = "visible";
  sideBar.style.width = "256px";
});
closeIcon.addEventListener("click", (event) => {
  sideBar.style.visibility = "hidden";
  sideBar.style.width = "0px";
});
// dark&light mode
darkIcon.addEventListener("click", (event) => {
  if (localStorage.getItem("isDark") == "dark") {
    localStorage.setItem("isDark", "light");
    document.body.classList.remove("dark");
    darkIcon.src = "./assets/imgs/moon-01.svg";
    Array.from(darkTitle)[0].innerHTML = "Dark mode";
    logo.src = "./assets/imgs/Logo.svg";
  } else {
    localStorage.setItem("isDark", "dark");
    document.body.classList.add("dark");
    darkIcon.src = "./assets/imgs/light-icon.svg";
    Array.from(darkTitle)[0].innerHTML = "Light mode";
    logo.src = "./assets/imgs/dark-logo.svg";
  }
});
darkSwitch.addEventListener("click", (event) => {
  if (localStorage.getItem("isDark") == "dark") {
    localStorage.setItem("isDark", "light");
    document.body.classList.remove("dark");
    Array.from(darkTitle)[1].innerHTML = "Dark mode";
    darkSwitch.parentElement.style.justifyContent = "end";
    logo.src = "./assets/imgs/Logo.svg";
  } else {
    localStorage.setItem("isDark", "dark");
    document.body.classList.add("dark");
    Array.from(darkTitle)[1].innerHTML = "Light mode";
    darkSwitch.parentElement.style.justifyContent = "start";
    logo.src = "./assets/imgs/dark-logo.svg";
  }
});
if (localStorage.getItem("isDark") == "dark") {
  Array.from(darkTitle)[1].innerHTML = "Light mode";
  darkSwitch.parentElement.style.justifyContent = "start";
  logo.src = "./assets/imgs/dark-logo.svg";
  darkIcon.src = "./assets/imgs/light-icon.svg";
  Array.from(darkTitle)[0].innerHTML = "Light mode";
  document.body.classList.add("dark");
} else {
  document.body.classList.remove("dark");
  Array.from(darkTitle)[1].innerHTML = "Dark mode";
  darkSwitch.parentElement.style.justifyContent = "end";
  logo.src = "./assets/imgs/Logo.svg";
  darkIcon.src = "./assets/imgs/moon-01.svg";
  Array.from(darkTitle)[0].innerHTML = "Dark mode";
}
// show the books

const cardsHolder = document.querySelector(".suggestions .cards");
const baseURL = `https://example-data.draftbit.com/books?_limit=8`;
function showBookDetails(cardID) {
  window.location.href = `book.html?id=${cardID}`;
}
async function read() {
  cardsHolder.classList.add("loading");
  cardsHolder.innerHTML = `<div class="loader"></div>`;
  await fetch(baseURL, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      cardsHolder.classList.remove("loading");
      cardsHolder.innerHTML = "";
      data.forEach((card) => {
        cardsHolder.innerHTML += `
        <div class="card" id=${card.id}>
          <img src="${card.image_url}" alt="${card.title}" />
          <div class="content">
            <div class="title">${card.title}</div>
            <div class="infos">
              <div class="pages">
                <img
                  class="book-icon"
                  src="./assets/imgs/book-open-01.svg"
                  alt=""
                />
                <span>${card.num_pages} Pages</span>
              </div>
              <div class="rate">
                <i class="star-icon fa fa-star"></i>
                <span>${card.rating}</span>
              </div>
            </div>
            <button onclick="showBookDetails(${card.id})">Show Details</button>
          </div>
        </div>
        `;
      });
    })
    .catch((err) => {
      cardsHolder.classList.add("loading");
      cardsHolder.innerHTML = `
  <div class="loader"></div>`;
    });
}
read();
