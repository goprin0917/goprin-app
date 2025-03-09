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

const transitionXObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show-x");
      } else {
        entry.target.classList.remove("show-x");
      }
    })
  },
  {
    threshold: 0.1,
  }
);

const hiddenElements = document.querySelectorAll(".hide");
const xHiddenElements = document.querySelectorAll(".hide-x");
xHiddenElements.forEach(element => {
  transitionXObserver.observe(element);
});
hiddenElements.forEach((element) => observer.observe(element));

const homeWrapperContainerElement = document.getElementById("home")!;
const projectSectionElement = document.getElementById("projects")!;
const aboutSectionElement = document.getElementById("about")!;

const homeMarkerElement = document.getElementById("homeMarker");
const homeNavLabelElement = document.getElementById("homeNavLabel");
const projectMarkerElement = document.getElementById("projectsMarker");
const projectNavLabelElement = document.getElementById("projectsNavLabel");
const aboutMarkerElement = document.getElementById("aboutMarker");
const aboutNavLabelElement = document.getElementById("aboutNavLabel");

const homeSectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        homeMarkerElement?.classList.add("active-marker");
        homeNavLabelElement?.classList.add("active-nav-label");
      } else {
        homeMarkerElement?.classList.remove("active-marker");
        homeNavLabelElement?.classList.remove("active-nav-label");
      }
    });
  },
  {
    threshold: 0.4,
  }
);

const projectSectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        projectMarkerElement?.classList.add("active-marker");
        projectNavLabelElement?.classList.add("active-nav-label");
      } else {
        projectMarkerElement?.classList.remove("active-marker");
        projectNavLabelElement?.classList.remove("active-nav-label");
      }
    });
  },
  {
    threshold: 0.4,
  }
);

const aboutSectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        aboutMarkerElement?.classList.add("active-marker");
        aboutNavLabelElement?.classList.add("active-nav-label");
      } else {
        aboutMarkerElement?.classList.remove("active-marker");
        aboutNavLabelElement?.classList.remove("active-nav-label");
      }
    });
  },
  {
    threshold: 0.4,
  }
);

homeSectionObserver.observe(homeWrapperContainerElement);
projectSectionObserver.observe(projectSectionElement);
aboutSectionObserver.observe(aboutSectionElement);

document.getElementById("homeMarker")?.addEventListener("click", (event) => {
  event.preventDefault();
  scrollToElement("home");
});

document.getElementById("homeNavLabel")?.addEventListener("click", (event) => {
  event.preventDefault();
  scrollToElement("home");
});

document
  .getElementById("projectsNavLabel")
  ?.addEventListener("click", (event) => {
    event.preventDefault();
    scrollToElement("projects");
  });

document
  .getElementById("projectsMarker")
  ?.addEventListener("click", (event) => {
    event.preventDefault();
    scrollToElement("projects");
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
    element.scrollIntoView({ behavior: "smooth", block: "start" });
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

const educationImageCarouselElement = document.getElementById(
  "educationImageCarousel"
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

let isMenuActive = false;

const barsIconMenuElement = document.getElementById("barsIconMenu")!;
const headerContainerElement = document.getElementById("headerContainer");

function updateMenu() {
  switch (isMenuActive) {
    case true:
      barsIconMenuElement?.classList.add("nf-oct-x")
      barsIconMenuElement?.classList.remove("nf-fa-bars")

      break;
    case false:
      barsIconMenuElement?.classList.add("nf-fa-bars")
      barsIconMenuElement?.classList.remove("nf-oct-x")
      break;
    default:
      break;
  }


  if (isMenuActive) {
    headerContainerElement?.classList.add("show-header-container");
  } else {
    headerContainerElement?.classList.remove("show-header-container");
  }
}

// This will setup or render the initial icon svg image.
updateMenu();

barsIconMenuElement?.addEventListener("click", (event) => {
  event.preventDefault();
  handleMenuClick();
});

function handleMenuClick() {
  isMenuActive = !isMenuActive;
  updateMenu();
}

interface LanguageColors {
  [key: string]: string;
}

// Language colors mapping (based on this github repository: https://github.com/salikansari6/github-languages-color-hex/blob/main/github-colors.json)
const languageColors: LanguageColors = {
  JavaScript: "#f1e05a",
  TypeScript: "#2b7489",
  HTML: "#e34c26",
  CSS: "#563d7c",
  PHP: "#4F5D95",
};

const CACHE_KEY = "github_languages";
const CACHE_EXPIRY = 60 * 60 * 1000;

const fetchRepositoryLanguages = async (
  repoUrl: string,
  progressBarClass: string,
  labelContainerClass: string
) => {
  try {

    const cachedData = localStorage.getItem(CACHE_KEY);
    const now = Date.now();

    if (cachedData) {
      const { timestamp, data, etag } = JSON.parse(cachedData);

      if (now - timestamp < CACHE_EXPIRY) {
        renderLanguages(data, progressBarClass, labelContainerClass);
        return;
      }

      // This will fetch new data with the cached ETag.
      const response = await fetch(repoUrl, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
          "If-None-Match": etag
        }
      });

      if (response.status === 304) {
        renderLanguages(data, progressBarClass, labelContainerClass);
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
      }

      const newData = await response.json();
      const newEtag = response.headers.get("ETag");

      // This will update the cache in localStorage
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ timestamp: now, data: newData, etag: newEtag })
      );
      renderLanguages(data, progressBarClass, labelContainerClass);
    } else {
      const response = await fetch(repoUrl, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
      }

      const data = await response.json();
      const etag = response.headers.get("ETag");

      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          timestamp: now,
          data,
          etag
        })
      );

      renderLanguages(data, progressBarClass, labelContainerClass)
    }
  } catch (error) {
    console.error("Error fetching language data:", error);
  }
};

const renderLanguages = (
  data: Record<string, number>,
  progressBarClass: string,
  labelContainerClass: string
) => {
  // This will calculate the total bytes of the languages in the project.
  const totalBytes = Object.values(data).reduce(
    (sum: number, bytes: number) => sum + bytes,
    0
  );

  // Get the progress bar element
  const progressBar = document.querySelector(
    `.${progressBarClass}`
  ) as HTMLElement;
  if (!progressBar) return;

  // Get the language label container element
  const labelContainer = document.querySelector(
    `.${labelContainerClass}`
  ) as HTMLElement;
  if (!labelContainer) return;

  // Clear any existing items
  progressBar.innerHTML = "";
  labelContainer.innerHTML = "";

  // This will track the current position for placing items.
  let currentPosition = 0;

  // Create a progress items for each language.
  for (const [language, bytes] of Object.entries(data)) {
    const percentage = (bytes / totalBytes) * 100;
    const formattedPercentage = percentage.toFixed(1) + "%";

    // This will create new progress item.
    const progressItem = document.createElement("div");
    progressItem.className = "progress-item";
    // This will set the position and width of the progress item
    progressItem.style.left = `${currentPosition}%`;
    progressItem.style.width = `${percentage}%`;

    // This will set the color of the progress item (fallback to gray if language do not exist in mapping)
    const color = languageColors[language] || "#ddd";
    progressItem.style.backgroundColor = color;

    // This will add the progress item to progress bar
    progressBar.appendChild(progressItem);

    // This will create a language label element
    const labelInnerContainer = document.createElement("div");
    labelInnerContainer.className = "language-label-inner-container";

    //This will create a circle marker element for label.
    const labelCircleMarker = document.createElement("div");
    labelCircleMarker.className = "language-circle-marker";
    labelCircleMarker.style.backgroundColor = color;

    // This will create a language name label element
    const languageLabel = document.createElement("label");
    languageLabel.className = "language-label";
    languageLabel.textContent = language;

    // This will create a percentage span element
    const percentSpan = document.createElement("span");
    percentSpan.className = "progress-percent";
    percentSpan.textContent = formattedPercentage;

    // This will assemble the label container.
    labelInnerContainer.appendChild(labelCircleMarker);
    labelInnerContainer.appendChild(languageLabel);
    labelInnerContainer.appendChild(percentSpan);
    labelContainer.appendChild(labelInnerContainer);

    // Update position for next itme.
    currentPosition += percentage;
  }
};

fetchRepositoryLanguages(
  "https://api.github.com/repos/goprin0917/goprin-app/languages",
  "progress-bar",
  "language-label-container"
);

interface StatusOptions {
  name: string;
  value: string;
  iconClass: string;
  color: string;
}

const statusOptions: StatusOptions[] = [
  {
    name: "In progress",
    value: "in-progress",
    iconClass: "nf-md-progress_clock",
    color: "#32c054"
  },
  {
    name: "Completed",
    value: "completed",
    iconClass: "nf-md-progress_check",
    color: "#32c054"
  },
  {
    name: "On Pause",
    value: "on-pause",
    iconClass: "nf-md-progress_check",
    color: "#818181"
  },
  {
    name: "Cancelled",
    value: "cancelled",
    iconClass: "nf-md-progress_close",
    color: "#de3838"
  }
]

function updateProjectStatus(
  statusIconId: string,
  statusValueId: string,
  statusLabelValue: string,
  iconClassValue: string,
  textColor: string,
) {
  const statusIconElement = document.getElementById(statusIconId);
  const statusValueElement = document.getElementById(statusValueId)!;

  if (statusIconElement) {
    statusIconElement.className = "";
    statusIconElement.classList.add("nf");
    statusIconElement.classList.add(iconClassValue);
  }

  statusValueElement.textContent = statusLabelValue;
  statusValueElement.style.color = textColor

}

function updateToStatus(
  statusIconId: string,
  statusValueId: string,
  statusValue: string
) {
  const selectedStatus = statusOptions.find(status => status.value === statusValue);

  if (selectedStatus) {
    updateProjectStatus(
      statusIconId,
      statusValueId,
      selectedStatus.name,
      selectedStatus.iconClass,
      selectedStatus.color
    )
  }
}

updateToStatus(
  "portfolioProjectStatusIcon",
  "portfolioProjectStatusValue",
  "in-progress"
);
