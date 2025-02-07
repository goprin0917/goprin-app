function openEmailClient() {
    const email = 'gabrieloprin@gmail.com';
    const mailtoLink = `mailto:${email}`;
    window.open(mailtoLink, '_blank');
};

function openLinkedIn() {
    const url = 'https://www.linkedin.com/in/gabriel-oprin-16b002245';
    window.open(url, '_blank');
};

function downloadResume() {
    const directory = '/gabrieloprin.pdf';
    const anchor = document.createElement('a');
    anchor.href = directory;
    anchor.download = 'gabrieloprin.pdf';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
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