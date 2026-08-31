let menu_item = document.querySelector("#menu-item")
let talk_item = document.querySelector("#talk-item")
let hero_video_container = document.querySelector(".cursor-follower-video-container")
let hero_container =  document.querySelector(".hero-container")
let dark_item = document.querySelector("#dark-mode-item")
let menubar_overlay_container = document.querySelector(".menubar-overlay-container")

let isDark = false;


menu_item.addEventListener("mouseenter",() => {
    let isMenubarOpen = menubar_overlay_container.classList.contains("show")
    menu_item.textContent = isMenubarOpen ? "CLOSE" : "OPEN"
})

menu_item.addEventListener("mouseleave",() => {
    let isMenubarOpen = menubar_overlay_container.classList.contains("show")
    menu_item.textContent = isMenubarOpen ? "MENU" : "CLOSE"
})

menu_item.addEventListener("click", () => {

    menubar_overlay_container.classList.toggle("show");
    const isOpen = menubar_overlay_container.classList.contains("show");

    document.body.classList.toggle("menu-open", isOpen);
    menu_item.textContent = isOpen ? "CLOSE" : "MENU";
});



talk_item.addEventListener("mouseenter",() => {
    talk_item.textContent = "CONTACT US"
})

talk_item.addEventListener("mouseleave",() => {
    talk_item.textContent = "LET'S TALK"
})


document.addEventListener("mousemove", (e) => {
    // cursor follower logic
    hero_video_container.style.top= `${e.clientY}px`
    hero_video_container.style.left=`${e.clientX}px`
    hero_video_container.style.display = "block"
})

hero_container.addEventListener("mouseenter", (e) => {
    hero_video_container.style.opacity="1" 
})

hero_container.addEventListener("mouseleave", (e) => {
    // cursor follower logic
    hero_video_container.style.opacity="0" 
})


//DARK MODE LOGIC
dark_item.addEventListener("click", () => {
    isDark = !isDark;
    document.body.classList.add("dark")
    
    if(isDark){
        dark_item.innerHTML = "LIGHT MODE"
    }else{
        document.body.classList.remove("dark")
        dark_item.innerHTML = "DARK MODE"
    }

})


// menubar items mouse hover animation
let menubar_items =  document.querySelectorAll(".menubar_items")

menubar_items.forEach((menubarItem) =>{

    //mouse enter listener logic
    menubarItem.addEventListener("mouseenter", () =>{4
        menubarItem.style.transform = "translateX(50px)"
        // targeting the img tag
        let img = menubarItem.parentElement.querySelector("img")
        img.style.width = "100px"
    })

    //mouse leave listener logic
    menubarItem.addEventListener("mouseleave", () =>{4
        menubarItem.style.transform = "translateX(0)"
        let img = menubarItem.parentElement.querySelector("img")
        img.style.width = "0px"
    })
})


// update time

function updateTime(){
    let now = new Date();
    let current_time = document.querySelector("#current_time")

    current_time.textContent = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`

}


setInterval(()=>{
    updateTime()
}, 1000)



// image stack effect

const triggers = document.querySelectorAll(".hover-trigger");

triggers.forEach(trigger => {

    const images = trigger.querySelectorAll(".stack-image");

    let index = 0;
    let zIndex = 10;
    let interval = null;

    trigger.addEventListener("mouseenter", () => {

        if (interval) return;

        interval = setInterval(() => {

            const image = images[index];

            image.style.opacity = "1";
            image.style.zIndex = zIndex++;

            index++;

            if (index === images.length) {
                index = 0;
            }

        }, 300);
    });

    trigger.addEventListener("mouseleave", () => {

        clearInterval(interval);
        interval = null;

        images.forEach(image => {
            image.style.opacity = "0";
            image.style.zIndex = "1";
        });

        index = 0;
        zIndex = 10;
    });

});

// PLAYGROUND PORTFOLIO Cursor Follower Logic
const playgroundWrapper = document.querySelector(".playground-wrapper");
const portfolioBadge = document.getElementById("portfolioBadge");

// Update position when mouse moves across the screen
document.addEventListener("mousemove", (e) => {
    portfolioBadge.style.left = `${e.clientX}px`;
    portfolioBadge.style.top = `${e.clientY}px`;
});

// Show badge only when hovering over PLAYGROUND text
playgroundWrapper.addEventListener("mouseenter", () => {
    portfolioBadge.classList.add("active");
});

// Hide badge as soon as mouse leaves PLAYGROUND text
playgroundWrapper.addEventListener("mouseleave", () => {
    portfolioBadge.classList.remove("active");
});


// Floating Badge Mouse Tracking inside individual project cards
const cards = document.querySelectorAll('.project-card');

cards.forEach((card) => {
    const badge = card.querySelector('.floating-badge');
    const modal = card.querySelector('.preview-modal');

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        
        // Mouse coordinates relative to card
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Position badge directly under cursor
        badge.style.left = `${x}px`;
        badge.style.top = `${y}px`;

        // Subtle parallax displacement for center modal
        const offsetX = (x - rect.width / 2) * 0.05;
        const offsetY = (y - rect.height / 2) * 0.05;
        modal.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(1)`;
    });

    card.addEventListener('mouseleave', () => {
        modal.style.transform = 'translate(-50%, -50%) scale(0.6)';
    });
});

// Interactive Services Hover & Fixed Left Preview logic
const servicesSection = document.querySelector('.services-section');
const serviceItems = document.querySelectorAll('.service-item');
const previewContainer = document.getElementById('servicesPreview');
const previewImg = document.getElementById('servicesPreviewImg');

if (servicesSection && serviceItems.length > 0) {
    serviceItems.forEach((item) => {
        item.addEventListener('mouseenter', () => {
            const newImgSrc = item.getAttribute('data-img');
            
            // Fade image slightly during swap for seamless transition
            previewImg.style.opacity = '0.3';
            
            setTimeout(() => {
                if (newImgSrc) previewImg.src = newImgSrc;
                previewImg.style.opacity = '1';
            }, 100);

            // Activate floating preview card visibility
            previewContainer.classList.add('active');
        });
    });

    // Hide floating preview when mouse exits services section
    servicesSection.addEventListener('mouseleave', () => {
        previewContainer.classList.remove('active');
    });
}