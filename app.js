function openEmailClient() {
    const email = 'gabrieloprin@gmail.com';
    const mailtoLink = `mailto:${email}`;
    window.open(mailtoLink, '_blank');
};

function openLinkedIn() {
    const url = 'https://www.linkedin.com/in/gabriel-oprin-16b002245';
    window.open(url, '_blank');
};

//TODO: File download not working

const downloadResume = async () => {
    try {
        const response = await fetch("https://oxbvyasg79.execute-api.ap-southeast-1.amazonaws.com/default/downloadResume");
        const data = await response.json();

        if (!data.url) {
            throw new Error('No valid URL received from server');
        }

      const fileResponse = await fetch(data.url);
      const blob = await fileResponse.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'gabriel-oprin-resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.log("Error downloading file: ", error);
    }
};

document.addEventListener('scroll', (event) => {
    let lastScrollTop = 0;
    const currentScrollTop = window.scrollY;

    const footer = document.getElementById('headingFooter');

    if(currentScrollTop > lastScrollTop) {
        footer.classList.add('hidden');
    } else {
        footer.classList.remove('hidden');
    }

    lastScrollTop = currentScrollTop;
});

document.addEventListener('scroll', (event) => {
    const footer = document.getElementById('footerContentWrapper');
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if(scrollPosition >= documentHeight - 50) {
        footer.classList.add('visible');
    } else {
        footer.classList.remove('visible');
    }
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    })
}, {
    threshold: 0.1
});

const hiddenElements = document.querySelectorAll('.hide');
hiddenElements.forEach((el) => observer.observe(el));

function handleClick(step) {
    alert(`Step ${step} clicked!`);
}