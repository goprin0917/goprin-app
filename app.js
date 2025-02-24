function openEmailClient() {
  const email = "gabrieloprin@gmail.com";
  const mailtoLink = `mailto:${email}`;
  window.open(mailtoLink, "_blank");
}

function openLinkedIn() {
  const url = "https://www.linkedin.com/in/gabriel-oprin-16b002245";
  window.open(url, "_blank");
}

const downloadResume = async () => {
  try {
    const response = await fetch(
      "https://oxbvyasg79.execute-api.ap-southeast-1.amazonaws.com/default/downloadResume"
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

document.addEventListener("scroll", (event) => {
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
hiddenElements.forEach((el) => observer.observe(el));

function scrollToElement(elementId) {
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
hiddenAboutContainers.forEach((el) => aboutContainersObserver.observe(el));

const carouselItems = document.querySelectorAll(".carousel-item");
let currentIndex = 0;

function showNextItem() {
  carouselItems[currentIndex].classList.remove("active");
  currentIndex = (currentIndex + 1) % carouselItems.length;
  carouselItems[currentIndex].classList.add("active");
}

carouselItems[currentIndex].classList.add("active");

setInterval(showNextItem, 15000);

const copyrightYearLabelElement = document.getElementById("copyrightYear");
copyrightYearLabelElement.textContent = new Date().getFullYear();

const aboutDescriptionContainerElement = document.getElementById(
  "aboutDescriptionContainer"
);
const educationContainerElement = document.getElementById("educationContainer");
const hobbiesContainerElement = document.getElementById("hobbiesContainer");

const educationImageCarouselElement = document.getElementById(
  "educationImageCarousel"
);
const hobbiesImageContainerElement = document.getElementById(
  "hobbiesImageContainer"
);

//TODO: Issue in Changing of image containers
const aboutParentContainerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log(entry);
      }
      if (entry.isIntersecting && entry.target.id === "educationContainer") {
        educationImageCarouselElement.classList.add(
          "show-about-image-containers"
        );
      } else if (
        !entry.isIntersecting &&
        entry.target.id !== "educationContainer"
      ) {
        educationImageCarouselElement.classList.remove(
          "show-about-image-containers"
        );
      } else if (
        entry.isIntersecting &&
        entry.target.id === "hobbiesContainer"
      ) {
        hobbiesImageContainerElement.classList.add(
          "show-about-image-containers"
        );
      } else if (
        !entry.isIntersecting &&
        entry.target.id !== "hobbiesContainer"
      ) {
        hobbiesImageContainerElement.classList.remove(
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

aboutParentContainerObserver.observe(educationContainerElement);
aboutParentContainerObserver.observe(hobbiesContainerElement);
