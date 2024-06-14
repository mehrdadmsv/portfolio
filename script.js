document.addEventListener("DOMContentLoaded", function () {
    // Initialize ScrollMagic controller
    const controller = new ScrollMagic.Controller();

    /**
     * Function to check the background color based on scroll position
     * and update the data attribute of the body element accordingly.
     */
    function updateBackground() {
        // Get references to the sections
        const introSection = document.getElementById('intro');
        const whiteSpacerSection = document.querySelector('.white-spacer');
        const messageSection = document.getElementById('message');

        // Get the bounding rectangles of the sections
        const introRect = introSection.getBoundingClientRect();
        const whiteSpacerRect = whiteSpacerSection.getBoundingClientRect();
        const messageRect = messageSection.getBoundingClientRect();

        // Get the body element
        const body = document.body;

        // Check the top of the viewport to determine which section is in view
        const topOfViewport = 0;

        if (introRect.top <= topOfViewport && introRect.bottom > topOfViewport) {
            body.setAttribute('data-bg', 'light');
        } else if (whiteSpacerRect.top <= topOfViewport && whiteSpacerRect.bottom > topOfViewport) {
            body.setAttribute('data-bg', 'white');
        } else if (messageRect.top <= topOfViewport && messageRect.bottom > topOfViewport) {
            body.setAttribute('data-bg', 'dark');
        }
    }

    // Attach scroll and resize event listeners to update background on events
    window.addEventListener('scroll', updateBackground);
    window.addEventListener('resize', updateBackground);

    // Initial check to set the correct background attribute
    updateBackground();

    // Intro section animation
    new ScrollMagic.Scene({
        triggerElement: "#intro",
        duration: "100%", // Animation duration is 100% of the section height
        triggerHook: 0.5 // Trigger the animation when the element is in the middle of the viewport
    })
        .setClassToggle("#introText", "visible") // Add 'visible' class to the intro text
        .addTo(controller); // Add this scene to the controller

    // Message section animation
    new ScrollMagic.Scene({
        triggerElement: "#message",
        duration: "100%", // Animation duration is 100% of the section height
        triggerHook: 0.5 // Trigger the animation when the element is in the middle of the viewport
    })
        .setClassToggle("#welcomeText", "visible") // Add 'visible' class to the welcome text
        .addTo(controller); // Add this scene to the controller

    // Canvas animation setup
    const canvas = document.getElementById("hero-lightpass");
    const context = canvas.getContext("2d");

    const frameCount = 148;
    const currentFrame = index => (
        `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index.toString().padStart(4, '0')}.jpg`
    );

    /**
     * Preload images for smooth animation
     */
    const preloadImages = () => {
        for (let i = 1; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
        }
    };

    // Initialize the first image for the canvas
    const img = new Image();
    img.src = currentFrame(1);
    canvas.width = 1158;
    canvas.height = 770;
    img.onload = function () {
        context.drawImage(img, 0, 0);
    };

    /**
     * Update the canvas with the image corresponding to the current frame index
     * @param {number} index - The frame index
     */
    const updateImage = index => {
        img.src = currentFrame(index);
        context.drawImage(img, 0, 0);
    };

    // Canvas animation scene
    new ScrollMagic.Scene({
        triggerElement: ".pin",
        duration: "200%", // Animation duration is 200% of the pin section height
        triggerHook: 0 // Trigger the animation as soon as the element enters the viewport
    })
        .on("progress", function (event) {
            const scrollProgress = event.progress;
            const frameIndex = Math.min(
                frameCount - 1,
                Math.ceil(scrollProgress * frameCount)
            );
            updateImage(frameIndex + 1); // Update the image based on scroll progress
        })
        .setPin(".pin") // Pin the canvas section during the animation
        .addTo(controller); // Add this scene to the controller

    // Preload all images for the canvas animation
    preloadImages();
});
