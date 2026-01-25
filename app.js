const video1 = document.getElementById('projectVideo1');
const video2 = document.getElementById('projectVideo2');
const video3 = document.getElementById('projectVideo3');

// Sidebar elements //
const sideBar = document.querySelector('.sidebar');
const menu = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon')


const hoverSign = document.querySelector('.hover-sign');

const videoList =[video1, video2, video3];

videoList.forEach (function(video){
    video.addEventListener("mouseover", function(){
        video.play()
        hoverSign.classList.add("active")
    })
    video.addEventListener("mouseout", function(){
    video.pause();
    hoverSign.classList.remove("active")
})
})

// Sidebar elements //
menu.addEventListener("click", function(){
    sideBar.classList.remove("close-sidebar")
    sideBar.classList.add("open-sidebar")
});

closeIcon.addEventListener("click", function(){
    sideBar.classList.remove("open-sidebar");
    sideBar.classList.add("close-sidebar");
    
})

function sendMail(){
    // validate inputs
    const name = document.getElementById("name").value || "";
    const email = document.getElementById("email").value || "";
    const subject = document.getElementById("subject").value || "";
    const message = document.getElementById("message").value || "";

    function validateEmail(e) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    }

    function showPopup(text, type = 'error'){
        // remove existing popup
        const existing = document.querySelector('.message-popup');
        if (existing) existing.remove();

        const popup = document.createElement('div');
        popup.className = 'message-popup ' + (type === 'success' ? 'success' : 'error');
        popup.textContent = text;

        // position near send button
        const btn = document.querySelector('.contact-box button');
        if (btn) {
            const rect = btn.getBoundingClientRect();
            popup.style.position = 'absolute';
            popup.style.left = (rect.left + rect.width / 2 + window.scrollX) + 'px';
            popup.style.top = (rect.top + window.scrollY - 12) + 'px';
            popup.style.transform = 'translate(-50%, -100%)';
        } else {
            popup.style.position = 'fixed';
            popup.style.left = '50%';
            popup.style.top = '20px';
            popup.style.transform = 'translateX(-50%)';
        }

        document.body.appendChild(popup);
        // show then hide
        setTimeout(()=> popup.classList.add('visible'), 10);
        setTimeout(()=>{ popup.classList.remove('visible'); setTimeout(()=> popup.remove(), 400); }, 3000);
    }

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim() || !validateEmail(email)){
        showPopup('Please provide valid inputs for all fields.', 'error');
        return;
    }

    const parms = { name, email, subject, message };

    emailjs.send("service_okfd33d","template_6v54vsw", parms)
    .then(function(response){
        showPopup('Message sent successfully!', 'success');
        // clear fields
        document.getElementById("name").value = '';
        document.getElementById("email").value = '';
        document.getElementById("subject").value = '';
        document.getElementById("message").value = '';
    })
    .catch(function(err){
        console.error('Email send error:', err);
        showPopup('Failed to send message. Try again later.', 'error');
    });
}