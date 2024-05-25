document.addEventListener("DOMContentLoaded", function () {
    // Burger menu js
    const hamburger = document.getElementById("hamburger");
    const close = document.getElementById("close");
    const topnav = document.getElementById("topnav");
    const body = document.body;
    const sections = document.querySelectorAll(".section");

    function toggleMenu() {
        const topnav = document.getElementById("topnav");
        const close = document.getElementById("close");
        const hamburger = document.getElementById("hamburger");
      
        topnav.classList.toggle("active");
      
        // Prevent scrolling while menu is open
        if (topnav.classList.contains("active")) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
      
        // Show/hide hamburger and close icons based on menu state
        hamburger.style.display = hamburger.style.display === 'none' ? 'block' : 'none';
        close.style.display = close.style.display === 'block' ? 'none' : 'block';
    }
      

    function checkScreenSize() {
        if (window.innerWidth > 768) {
            hamburger.style.display = 'none';
            close.style.display = 'none';
            topnav.classList.remove("active");
            body.classList.remove("no-scroll");
            sections.forEach(section => section.style.display = "flex");
        } else {
            hamburger.style.display = 'block';
            close.style.display = 'none';
        }
    }

    hamburger.addEventListener("click", toggleMenu);
    close.addEventListener("click", toggleMenu);
    window.addEventListener("resize", checkScreenSize);

    // Initial check
    checkScreenSize();

    // ScrollMagic animations
    const controller = new ScrollMagic.Controller();

    // Intro animation
    new ScrollMagic.Scene({
        triggerElement: "#intro",
        duration: "100%",
        triggerHook: 0.5
    })
        .setClassToggle("#introText", "visible")
        .addTo(controller);

    // Welcome message animation
    new ScrollMagic.Scene({
        triggerElement: "#message",
        duration: "100%",
        triggerHook: 0.5
    })
        .setClassToggle("#welcomeText", "visible")
        .addTo(controller);

    // Canvas animation
    const html = document.documentElement;
    const canvas = document.getElementById("hero-lightpass");
    const context = canvas.getContext("2d");

    const frameCount = 148;
    const currentFrame = index => (
        `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index.toString().padStart(4, '0')}.jpg`
    )

    const preloadImages = () => {
        for (let i = 1; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
        }
    };

    const img = new Image()
    img.src = currentFrame(1);
    canvas.width = 1158;
    canvas.height = 770;
    img.onload = function () {
        context.drawImage(img, 0, 0);
    }

    const updateImage = index => {
        img.src = currentFrame(index);
        context.drawImage(img, 0, 0);
    }

    new ScrollMagic.Scene({
        triggerElement: ".pin",
        duration: "200%",
        triggerHook: 0
    })
        .on("progress", function (event) {
            const scrollProgress = event.progress;
            const frameIndex = Math.min(
                frameCount - 1,
                Math.ceil(scrollProgress * frameCount)
            );
            updateImage(frameIndex + 1);
        })
        .setPin(".pin")
        .addTo(controller);

    preloadImages();
});
