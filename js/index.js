let menu = document.querySelector("#menu-bar");
let navbar = document.querySelector(".navbar");
let logo = document.querySelector(".logo");

let isMenuOpen;

menu.onclick = () => {
  navbar.classList.toggle("active");
  logo.classList.add("visible");
  isMenuOpen = true;
};

let linkButtons = document.querySelectorAll(".link-button");
linkButtons.forEach((linkButton) => {
  linkButton.addEventListener("click", () => {
    linkButtons.forEach((linkButton) => {
      linkButton.classList.remove("active");
    });
    linkButton.classList.add("active");
    navbar.classList.remove("active");
  });
});

window.onload = function () {
  var header = document.getElementById("header");
  //   var pageHeight = document.body.offsetHeight;
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    //  console.log((currentScrollPos*100)/pageHeight)
    if (currentScrollPos > 170) {
      header.classList.add("header-colour");
      logo.classList.add("visible");
    } else {
      header.classList.remove("header-colour");
      logo.classList.remove("visible");
    }
  };
};

(() => {
  let TypingSpeed = 100;
  let NxtMsgDelay = 2000;
  let CharacterPos = 0;
  let MsgBuffer = "";
  let MsgIndex = 0;
  let delay;
  let id = document.getElementById("typing-text");
  let messages = [
    "Vegetable Fried Rice",
    "Egg Fried Rice",
    "Chicken Fried Rice",
    "Chicken Budget Rice",
    "Egg Mixed Chicken Fried Rice",
    "Boiled Vegetable with Chicken",
    "Egg Noodles",
    "Chicken Noodles",
    "Rice & Curry",
    "Orange Juice",
    "Tea",
    "Green Tea",
    "Milk Tea",
    "Coffee",
    "Milk Coffee",
    "Milkshake",
    "Mojito",
    "Burgers",
    "Cupcakes",
    "Yoghurt",
    "Soup",
    "Ice cream",
    "Brownie",
    "Puddings",
    "Cake",
    "Tiramisu",
    "Fudge",
  ];

  // https://www.html-code-generator.com/html/typewriter-text-scroller
  const StartTyping = () => {
    if (CharacterPos != messages[MsgIndex].length) {
      MsgBuffer += messages[MsgIndex].charAt(CharacterPos);
      id.value =
        MsgBuffer + (CharacterPos != messages[MsgIndex].length - 1 ? "_" : "");
      delay = TypingSpeed;
      id.scrollTop = id.scrollHeight;
    } else {
      delay = NxtMsgDelay;
      MsgBuffer = "";
      CharacterPos = -1;
      if (MsgIndex != messages.length - 1) {
        MsgIndex++;
      } else {
        MsgIndex = 0;
      }
    }
    CharacterPos++;
    setTimeout(StartTyping, delay);
  };
  StartTyping();
})();

window.addEventListener("scroll", () => {
  const navLinks = document.querySelectorAll(".link-button");
  const sections = document.querySelectorAll("section");
  let currentSectionIndex = 0;
  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop;
    if (window.scrollY + 100 >= sectionTop) {
      currentSectionIndex = index;
    }
  });
  navLinks.forEach((navLink) => {
    navLink.classList.remove("active");
  });
  const activeNavLink = navLinks[currentSectionIndex];
  activeNavLink.classList.add("active");
});

const progressBar = document.querySelector(".progress-bar");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrollProgress = (scrollTop / scrollHeight) * 100;
  progressBar.style.width = `${scrollProgress}%`;
});

const imageSources = [
  "resources/Notification/1.jpg",
  "resources/Notification/2.jpg",
  "resources/Notification/5.jpg",
  "resources/Notification/7.jpg",
  "resources/Notification/10.jpg",
  "resources/Notification/11.jpg",
  "resources/Notification/13.jpg",
  "resources/Notification/14.jpg"
];

let currentIndex = 0; // Index to keep track of the current image source

function generateNotification() {
  const container = document.createElement("div");
  container.id = "notification-container";

  const image = document.createElement("img");
  image.alt = "Notification";
  
  image.src = imageSources[currentIndex]; // Set the source from the array
  currentIndex = (currentIndex + 1) % imageSources.length; // Increment index and wrap around
  
  image.addEventListener("load", () => {
    container.style.display = "block";
  });

  image.addEventListener("error", () => {
    // Handle image loading error, e.g., display a default image or show an error message
    console.log("Error loading image");
  });

  

  const bar = document.createElement("div");
  bar.classList.add("line");

  const closeButton = document.createElement("div");
  closeButton.className = "close-button";

  setTimeout(() => {
    closeButton.innerHTML =
      "<span class='material-symbols-outlined'> close </span>";
  }, 5000);

  closeButton.addEventListener("click", () => {
    container.remove();
  });

  container.appendChild(image);
  container.appendChild(closeButton);
  container.appendChild(bar);

  document.body.appendChild(container);

  setTimeout(() => {
    container.remove();
  }, 15000);
}

// Generate notification every 0.5 minutes
setInterval(generateNotification, 30000);

