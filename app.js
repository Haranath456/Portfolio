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

// Music Button Functionality
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');

musicBtn.addEventListener('click', function() {
    if (bgMusic.paused) {
        bgMusic.play();
        musicBtn.classList.add('playing');
    } else {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
    }
});

// Pause music when button loses focus
bgMusic.addEventListener('ended', function() {
    musicBtn.classList.remove('playing');
});

// Click button popup (glassmorphism CMD)
const clickBtn = document.getElementById('clickBtn');
let clickPopup = null;

function createClickPopup(rect){
    // remove existing
    removeClickPopup();

    const popup = document.createElement('div');
    popup.className = 'click-popup';

    // header
    const header = document.createElement('div');
    header.className = 'popup-header';
    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = 'CMD';
    header.appendChild(title);

    // body
    const body = document.createElement('div');
    body.className = 'popup-body';
    const output = document.createElement('div');
    output.className = 'terminal-output';
    output.innerHTML = '<div>C:\\Users\\guest&gt; Welcome to the portfolio shell.</div>' +
                       '<div>C:\\Users\\guest&gt; Type "matrix" to see the Matrix effect.</div>' +
                       '<div>C:\\Users\\guest&gt; Type "make me laugh" to laugh.</div>' +
                       '<div>C:\\Users\\guest&gt; Type "close" to exit.</div>';

    const inputRow = document.createElement('div');
    inputRow.className = 'terminal-input';
    const prompt = document.createElement('div');
    prompt.className = 'prompt';
    prompt.textContent = 'C:\\>';
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'type a command...';

    inputRow.appendChild(prompt);
    inputRow.appendChild(input);

    body.appendChild(output);
    body.appendChild(inputRow);

    popup.appendChild(header);
    popup.appendChild(body);

    document.body.appendChild(popup);

    const offsetRight = 80; 
    const bottom = window.innerHeight - rect.top + 12; 
    let desiredLeft = rect.left + offsetRight;
    const minLeft = 12;
    const maxLeft = Math.max(minLeft, window.innerWidth - popup.offsetWidth - 12);
    desiredLeft = Math.min(Math.max(minLeft, desiredLeft), maxLeft);
    popup.style.left = desiredLeft + 'px';
    popup.style.bottom = bottom + 'px';

    requestAnimationFrame(()=> popup.classList.add('open'));

    input.addEventListener('keydown', function(ev){
        if (ev.key === 'Enter'){
            const val = input.value.trim();
            const line = document.createElement('div');
            line.textContent = 'C:\\>' + (val || '[empty]');
            output.appendChild(line);
            output.scrollTop = output.scrollHeight;

            // handle commands
            if (val && val.toLowerCase() === 'close'){
                const closing = document.createElement('div');
                closing.textContent = 'C:\\> Closing...';
                output.appendChild(closing);
                output.scrollTop = output.scrollHeight;
                setTimeout(removeClickPopup, 250);
            } else if (val && val.toLowerCase() === 'matrix'){
                const matrixMsg = document.createElement('div');
                matrixMsg.textContent = 'C:\\> Activating Matrix effect...';
                output.appendChild(matrixMsg);
                output.scrollTop = output.scrollHeight;
                createMatrixEffect();
            }
            input.value = '';
        }
    });

    clickPopup = popup;
    clickBtn.classList.add('playing');
}

function removeClickPopup(){
    if (!clickPopup) return;
    clickPopup.classList.remove('open');
    clickBtn.classList.remove('playing');
    // remove after transition
    setTimeout(()=>{ if (clickPopup) { clickPopup.remove(); clickPopup = null; } }, 220);
}

// Matrix effect variables
let matrixCanvas = null;
let matrixCtx = null;
let matrixAnimationId = null;
let matrixLetters = "abcdefghijklmnopqrstuvwxyz0123456789".split("");
let matrixFontSize = 14;
let matrixColumns = 0;
let matrixDrops = [];

function createMatrixEffect() {
    // Remove existing effect if any
    removeMatrixEffect();

    // Create canvas
    matrixCanvas = document.createElement('canvas');
    matrixCanvas.id = 'matrix-canvas';
    matrixCanvas.style.position = 'fixed';
    matrixCanvas.style.top = '0';
    matrixCanvas.style.left = '0';
    matrixCanvas.style.width = '100%';
    matrixCanvas.style.height = '100%';
    matrixCanvas.style.zIndex = '9998';
    matrixCanvas.style.pointerEvents = 'none';
    matrixCanvas.style.background = 'black';

    document.body.appendChild(matrixCanvas);

    matrixCtx = matrixCanvas.getContext('2d');

    // Set canvas size
    resizeMatrixCanvas();

    // Initialize drops
    matrixColumns = Math.floor(matrixCanvas.width / matrixFontSize);
    matrixDrops = Array(matrixColumns).fill(1);

    // Start animation
    startMatrixAnimation();

    // Add resize listener
    window.addEventListener('resize', resizeMatrixCanvas);
    // Add click to stop
    document.addEventListener('click', handleMatrixClick);
}

function removeMatrixEffect() {
    if (matrixAnimationId) {
        clearInterval(matrixAnimationId);
        matrixAnimationId = null;
    }
    if (matrixCanvas) {
        matrixCanvas.remove();
        matrixCanvas = null;
        matrixCtx = null;
    }
    matrixDrops = [];
    window.removeEventListener('resize', resizeMatrixCanvas);
    document.removeEventListener('click', handleMatrixClick);
}

function resizeMatrixCanvas() {
    if (!matrixCanvas) return;
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    matrixColumns = Math.floor(matrixCanvas.width / matrixFontSize);
    matrixDrops = Array(matrixColumns).fill(1);
}

function handleMatrixClick(e) {
    // Close matrix effect on click
    removeMatrixEffect();
}

function animateMatrix() {
    if (!matrixCtx) return;

    matrixCtx.fillStyle = "rgba(0, 0, 0, 0.1)";
    matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

    matrixCtx.fillStyle = "red";
    matrixCtx.font = matrixFontSize + "px monospace";

    for (let i = 0; i < matrixDrops.length; i++) {
        const text = matrixLetters[Math.floor(Math.random() * matrixLetters.length)];
        matrixCtx.fillText(text, i * matrixFontSize, matrixDrops[i] * matrixFontSize);

        if (matrixDrops[i] * matrixFontSize > matrixCanvas.height && Math.random() > 0.95) {
            matrixDrops[i] = 0;
        }
        matrixDrops[i]++;
    }
}

function startMatrixAnimation() {
    if (matrixAnimationId) clearInterval(matrixAnimationId);
    matrixAnimationId = setInterval(animateMatrix, 40);
}

clickBtn.addEventListener('click', function(e){
    const rect = clickBtn.getBoundingClientRect();
    if (clickPopup){
        removeClickPopup();
    } else {
        createClickPopup(rect);
    }
    e.stopPropagation();
});