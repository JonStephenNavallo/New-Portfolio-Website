function toggleSideMenu() {
    const sideMenu = document.getElementById("sideMenu");
    if (sideMenu.style.left === "0px") {
        sideMenu.style.left = "-100%"; // Move the side menu out of view
    } else {
        sideMenu.style.left = "0px"; // Slide the side menu into view
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-link");
    const header = document.querySelector("header");
    const offset = header.offsetHeight; // Adjust scroll offset for fixed header
    const sideMenu = document.getElementById("sideMenu");

    navLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault(); // Prevent default anchor behavior
            
            const targetId = link.getAttribute("data-target"); // Get target section ID

            // Special case for "Home" link: scroll to top
            if (targetId === "home") {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            } else {
                const targetElement = document.getElementById(targetId); // Find the target section
                if (targetElement) {
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({
                        top: elementPosition,
                        behavior: "smooth"
                    });
                }
            }

            // Remove active class from all nav links and add to the clicked one
            navLinks.forEach(nav => nav.classList.remove("active"));
            link.classList.add("active");

            // Close side menu only on mobile layout
            const isMobile = window.innerWidth <= 768; // Define mobile breakpoint
            if (isMobile && sideMenu.style.left === "0px") {
                toggleSideMenu();
            }
        });
    });
});
