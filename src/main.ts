import "@fortawesome/fontawesome-free/css/all.min.css";

document.querySelector(".email-anchor")?.addEventListener("click", (event) => {
  event.preventDefault();
  openEmailClient();
});
function openEmailClient() {
  const email = "gabrieloprin@gmail.com";
  const mailtoLink = `mailto:${email}`;
  window.open(mailtoLink, "_blank");
}

document
  .querySelector(".linkedin-anchor")
  ?.addEventListener("click", (event) => {
    event.preventDefault();
    openLinkedIn();
  });

function openLinkedIn() {
  const url = "https://www.linkedin.com/in/gabriel-oprin-16b002245";
  window.open(url, "_blank");
}

const downloadResume = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_AWS_API_GATEWAY_BASE_URL}/default/downloadResume`
    );
    const data = await response.json();

    if (!data.url) {
      throw new Error("No valid URL received from server");
    }

    const fileResponse = await fetch(data.url);
    const blob = await fileResponse.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "gabriel-oprin-resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.log("Error downloading file: ", error);
  }
};

document
  .querySelector(".download-anchor")
  ?.addEventListener("click", (event) => {
    event.preventDefault();
    downloadResume();
  });

document.addEventListener("scroll", (event) => {
  event.preventDefault();
  let lastScrollTop = 0;
  const currentScrollTop = window.scrollY;

  const footer = document.getElementById("headingFooter");

  if (currentScrollTop > lastScrollTop) {
    footer?.classList.add("hidden");
  } else {
    footer?.classList.remove("hidden");
  }

  lastScrollTop = currentScrollTop;
});

document.addEventListener("scroll", (event) => {
  event.preventDefault();
  const footer = document.getElementById("footerContentWrapper");
  const scrollPosition = window.scrollY + window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (scrollPosition >= documentHeight - 50) {
    footer?.classList.add("visible");
  } else {
    footer?.classList.remove("visible");
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

const hiddenElements = document.querySelectorAll(".hide");
hiddenElements.forEach((element) => observer.observe(element));

document.getElementById("homeMarker")?.addEventListener("click", (event) => {
  event.preventDefault();
  scrollToElement("home");
});

document.getElementById("homeNavLabel")?.addEventListener("click", (event) => {
  event.preventDefault();
  scrollToElement("home");
});

document.getElementById("aboutMarker")?.addEventListener("click", (event) => {
  event.preventDefault();
  scrollToElement("about");
});

document.getElementById("aboutNavLabel")?.addEventListener("click", (event) => {
  event.preventDefault();
  scrollToElement("about");
});

function scrollToElement(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

const aboutContainersObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show-container");
      } else {
        entry.target.classList.remove("show-container");
      }
    });
  },
  { threshold: 0.15 }
);

const hiddenAboutContainers = document.querySelectorAll(".hide-container");
hiddenAboutContainers.forEach((element) =>
  aboutContainersObserver.observe(element)
);

const carouselItems = document.querySelectorAll(".carousel-item");
let currentIndex = 0;

function showNextItem() {
  carouselItems[currentIndex].classList.remove("active");
  currentIndex = (currentIndex + 1) % carouselItems.length;
  carouselItems[currentIndex].classList.add("active");
}

carouselItems[currentIndex].classList.add("active");

setInterval(showNextItem, 20000);

const copyrightYearLabelElement = document.querySelectorAll("#copyrightYear");
const year = new Date().getFullYear();
copyrightYearLabelElement.forEach((element) => {
  element.textContent = `${year}`;
});

const aboutDescriptionContainerElement = document.getElementById(
  "aboutDescriptionContainer"
);
const educationContainerElement =
  document.getElementById("educationContainer")!;
const hobbiesContainerElement = document.getElementById("hobbiesContainer");

const educationImageCarouselElement = document.getElementById(
  "educationImageCarousel"
);
const hobbiesImageContainerElement = document.getElementById(
  "hobbiesImageContainer"
);

const educationContainerAndParentContainerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        educationImageCarouselElement?.classList.add(
          "show-about-image-containers"
        );
      } else {
        educationImageCarouselElement?.classList.remove(
          "show-about-image-containers"
        );
      }
    });
  },
  {
    root: aboutDescriptionContainerElement,
    threshold: 0.2,
  }
);
educationContainerAndParentContainerObserver.observe(educationContainerElement);

// const hobbiesContainerAndParentContainerObserver = new IntersectionObserver(
//   (entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         hobbiesImageContainerElement.classList.add(
//           "show-about-image-containers"
//         );
//       } else {
//         hobbiesImageContainerElement.classList.remove(
//           "show-about-image-containers"
//         );
//       }
//     });
//   },
//   {
//     root: aboutDescriptionContainerElement,
//     threshold: 0.2,
//   }
// );

// hobbiesContainerAndParentContainerObserver.observe(hobbiesContainerElement);

//TODO: Fix change of icon on click

let isMenuClicked = false;

const barsIconMenuElement = document.getElementById("barsIconMenu")!;
barsIconMenuElement.setAttribute(
  "src",
  isMenuClicked ? "/assets/bars-solid.svg" : "/assets/xmark-solid.svg"
);

barsIconMenuElement?.addEventListener("click", (event) => {
  event.preventDefault();
  handleMenuClick();
});

function handleMenuClick() {
  isMenuClicked = !isMenuClicked;
}
