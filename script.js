// Performance optimizations
let scrollTimeout;
let resizeTimeout;
let ticking = false;

// Hamburger Menu Functionality
const hamburgerMenu = document.getElementById("hamburgerMenu");
const navMenu = document.getElementById("navMenu");

if (hamburgerMenu && navMenu) {
    hamburgerMenu.addEventListener("click", (e) => {
        e.stopPropagation();
        hamburgerMenu.classList.toggle("active");
        navMenu.classList.toggle("show");
    }, { passive: true });

    document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            hamburgerMenu.classList.remove("active");
            navMenu.classList.remove("show");
        }, { passive: true });
    });

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".header")) {
            hamburgerMenu.classList.remove("active");
            navMenu.classList.remove("show");
        }
    }, { passive: true });
}

// Teacher Modal Functionality
const teacherData = {
    1: {
        name: "م. طهمورثی",
        subject: "دروس عمومی",
        experience: "۳۰ سال سابقه تدریس",
        education: "کارشناسی",
        bio: "دارای سابقه معاونت آموزشی و تربیتی، متخصص در آموزش مفاهیم عمومی و شیوه‌های تدریس نوین.",
    },
    2: {
        name: "ض. صادقی",
        subject: "ریاضی و فیزیک",
        experience: "۳۰ سال سابقه تدریس",
        education: "کارشناسی ارشد برق",
        bio: "سابقه تدریس در دانشگاه و دروس ریاضی محض، متخصص در فیزیک کاربردی و برق.",
    },
    3: {
        name: "ا. رضایی",
        subject: "شبکه و نرم‌افزار",
        experience: "۵ سال سابقه تدریس",
        education: "کارشناسی IT",
        bio: "دارای سابقه تدریس آموزشگاهی و دانشگاه، متخصص در برنامه‌نویسی و سیستم‌های شبکه.",
    },
    4: {
        name: "م. ابراهیم‌زاده",
        subject: "شبکه و نرم‌افزار",
        experience: "۵ سال سابقه تدریس",
        education: "کارشناسی ارشد IT",
        bio: "جزو رتبه‌های برتر کنکور، فارغ‌التحصیل از دانشگاه شمسی‌پور، متخصص در توسعه وب.",
    },
    5: {
        name: "م. ایمانی",
        subject: "نقشه‌کشی",
        experience: "۴ سال سابقه تدریس",
        education: "کارشناسی ارشد نقشه‌کشی",
        bio: "دارای تدریس در زمینه خصوصی و مدارس، متخصص در طراحی معماری و نقشه‌کشی صنعتی.",
    },
    6: {
        name: "ع. غلامی",
        subject: "مکانیک خودرو",
        experience: "۲ سال سابقه تدریس",
        education: "کارشناسی مکانیک",
        bio: "تدریس در زمینه اتومکانیک و مدارس، متخصص در تعمیرات و نگهداری خودروهای سبک.",
    },
};

document.querySelectorAll(".teacher-card").forEach((card) => {
    card.addEventListener("click", () => {
        const teacherId = card.getAttribute("data-teacher");
        const teacher = teacherData[teacherId];

        const modalContent = document.getElementById("modalContent");
        if (modalContent) {
            modalContent.innerHTML = `
                <h3>${teacher.name}</h3>
                <p class="teacher-subject">${teacher.subject}</p>
                <h4>سابقه تدریس:</h4>
                <p>${teacher.experience}</p>
                <h4>مدرک تحصیلی:</h4>
                <p>${teacher.education}</p>
                <h4>درباره استاد:</h4>
                <p>${teacher.bio}</p>
            `;
        }

        const modal = document.getElementById("teacherModal");
        if (modal) {
            modal.classList.add("show");
            document.body.style.overflow = "hidden";
        }
    }, { passive: true });
});

const modalClose = document.getElementById("modalClose");
const teacherModal = document.getElementById("teacherModal");

if (modalClose && teacherModal) {
    modalClose.addEventListener("click", () => {
        teacherModal.classList.remove("show");
        document.body.style.overflow = "auto";
    });

    teacherModal.addEventListener("click", (e) => {
        if (e.target === teacherModal) {
            teacherModal.classList.remove("show");
            document.body.style.overflow = "auto";
        }
    }, { passive: true });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && teacherModal.classList.contains("show")) {
            teacherModal.classList.remove("show");
            document.body.style.overflow = "auto";
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || !targetId) return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Optimized header scroll effect with requestAnimationFrame
function updateHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    // On mobile, always show white background
    if (window.innerWidth <= 768) {
        header.classList.add('scrolled');
        return;
    }

    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    const scrollPosition = window.pageYOffset;

    // On desktop, show background when scrolling past hero
    if (scrollPosition > heroBottom - 150) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Throttled scroll handler
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            updateHeader();
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// Initialize animations on page load with optimized observer
document.addEventListener('DOMContentLoaded', function() {
    // Optimized Intersection Observer with smaller threshold
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Unobserve after animation to save resources
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Only observe on desktop for better mobile performance
    if (window.innerWidth > 768) {
        document.querySelectorAll('.course, .teacher-card, .contact-box').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(element);
        });
    }
});

// Initialize header on load
window.addEventListener('load', function() {
    updateHeader();
});

// Optimized resize handler
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        updateHeader();
    }, 150);
}, { passive: true });
