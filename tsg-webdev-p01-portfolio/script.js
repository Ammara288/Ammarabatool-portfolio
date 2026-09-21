const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const themeBtn = document.getElementById("themeBtn");
const scrollTop = document.getElementById("scrollTop");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show");
    menuBtn.setAttribute("aria-expanded", isOpen);

    const icon = menuBtn.querySelector("i");
    icon.classList.toggle("fa-bars", !isOpen);
    icon.classList.toggle("fa-xmark", isOpen);
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        menuBtn.setAttribute("aria-expanded", "false");
        const icon = menuBtn.querySelector("i");
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-xmark");
    });
});
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const light = document.body.classList.contains("light-mode");

    themeBtn.querySelector("i").classList.toggle("fa-sun", light);
    themeBtn.querySelector("i").classList.toggle("fa-moon", !light);

    localStorage.setItem("portfolio-theme", light ? "light" : "dark");
});

if (localStorage.getItem("portfolio-theme") === "light") {
    document.body.classList.add("light-mode");
    themeBtn.querySelector("i").classList.remove("fa-moon");
    themeBtn.querySelector("i").classList.add("fa-sun");
}
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 140;
        if (window.scrollY >= sectionTop) current = section.id;
    });

    navItems.forEach(item => {
        item.classList.toggle("active", item.getAttribute("href") === `#${current}`);
    });

    scrollTop.classList.toggle("show", window.scrollY > 450);
});
scrollTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        formMessage.textContent = "Please complete your name, email and message.";
        formMessage.style.color = "#ef4444";
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        formMessage.textContent = "Please enter a valid email address.";
        formMessage.style.color = "#ef4444";
        return;
    }

    formMessage.textContent = "Thanks! Your message has been validated successfully.";
    formMessage.style.color = "#22c55e";
    contactForm.reset();
});

const revealItems = document.querySelectorAll(
    ".skill-card, .project-card, .about-content, .contact-copy, .contact-form"
);

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealItems.forEach(item => {
    item.style.opacity = "0";
    item.style.transform = "translateY(25px)";
    item.style.transition = "opacity .7s ease, transform .7s ease";
    observer.observe(item);
});

const revealStyle = document.createElement("style");
revealStyle.textContent = ".revealed { opacity: 1 !important; transform: translateY(0) !important; }";
document.head.appendChild(revealStyle);

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    
    });
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 30) {
        header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = 'none';
    }
});
