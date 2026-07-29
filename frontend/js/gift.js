// ==========================
// ELEMENTS
// ==========================

const giftBox = document.getElementById("giftBox");
const giftModal = document.getElementById("giftModal");
const closeGift = document.querySelector(".gift-close");
const rewardTitle = document.getElementById("rewardTitle");
const couponCode = document.getElementById("couponCode");
const copyCoupon = document.getElementById("copyCoupon");

// ==========================
// REWARDS
// ==========================

const rewards = [

    {
        title: "🎁 10% OFF Booking",
        code: "EVENT10"
    },

    {
        title: "📸 Free Photography",
        code: "PHOTOFREE"
    },

    {
        title: "🎈 Decoration Upgrade",
        code: "DECOR2026"
    },

    {
        title: "🎵 Free DJ Service",
        code: "DJFREE"
    },

    {
        title: "💐 Flower Decoration",
        code: "FLOWER50"
    },

    {
        title: "🎂 Birthday Special",
        code: "BDAY2026"
    },

    {
        title: "🍰 Free Cake Voucher",
        code: "CAKEFREE"
    },

    {
        title: "🎥 Free Videography",
        code: "VIDEO2026"
    },

    {
        title: "🥤 Free Welcome Drinks",
        code: "DRINKS"
    },

    {
        title: "✨ Premium Event Upgrade",
        code: "VIPEVENT"
    }

];

// ==========================
// OPEN GIFT
// ==========================

giftBox.addEventListener("click", () => {

    const today = new Date().toDateString();

    const claimed = localStorage.getItem("giftDate");

    if (claimed === today) {

        alert("🎁 You have already claimed today's surprise gift!\n\nCome back tomorrow for another surprise.");

        return;

    }

    const randomReward = rewards[Math.floor(Math.random() * rewards.length)];

    rewardTitle.textContent = randomReward.title;

    couponCode.textContent = randomReward.code;

    giftModal.style.display = "flex";

});

// ==========================
// CLOSE POPUP
// ==========================

closeGift.addEventListener("click", () => {

    giftModal.style.display = "none";

});

window.addEventListener("click", (e) => {

    if (e.target === giftModal) {

        giftModal.style.display = "none";

    }

});

// ==========================
// COPY COUPON
// ==========================

copyCoupon.addEventListener("click", () => {

    navigator.clipboard.writeText(couponCode.textContent);

    localStorage.setItem("giftDate", new Date().toDateString());

    copyCoupon.textContent = "✅ Coupon Copied!";

    setTimeout(() => {

        copyCoupon.textContent = "📋 Copy Coupon";

        giftModal.style.display = "none";

    }, 2000);

});

const canvas = document.getElementById("wheel");

if(canvas){

const ctx = canvas.getContext("2d");

const rewards = [
"10% OFF",
"Photography",
"DJ",
"Flowers",
"Decoration",
"20% OFF",
"Videography",
"Balloons"
];

const colours = [
"#ef4444",
"#3b82f6",
"#22c55e",
"#f59e0b",
"#8b5cf6",
"#06b6d4",
"#ec4899",
"#84cc16"
];

const arc = Math.PI * 2 / rewards.length;

let angle = 0;

function drawWheel(){

ctx.clearRect(0,0,500,500);

for(let i=0;i<rewards.length;i++){

ctx.beginPath();

ctx.moveTo(250,250);

ctx.fillStyle = colours[i];

ctx.arc(
250,
250,
240,
i*arc+angle,
(i+1)*arc+angle
);

ctx.fill();

ctx.save();

ctx.translate(250,250);

ctx.rotate(i*arc+arc/2+angle);

ctx.fillStyle="white";

ctx.font="18px Arial";

ctx.fillText(rewards[i],110,5);

ctx.restore();

}

}

drawWheel();

let spinning=false;

document.getElementById("spin").onclick=()=>{

if(spinning)return;

spinning=true;

let speed=0.45;

const timer=setInterval(()=>{

angle+=speed;

speed*=0.985;

drawWheel();

if(speed<0.002){

clearInterval(timer);

spinning=false;

}

},20);

};

}
function updateCountdown(){

const now = new Date();

const tomorrow = new Date();

tomorrow.setHours(24,0,0,0);

const diff = tomorrow - now;

const hours = Math.floor(diff / 1000 / 60 / 60);

const minutes = Math.floor((diff / 1000 / 60) % 60);

const seconds = Math.floor((diff / 1000) % 60);

document.getElementById("countdown").innerHTML=

String(hours).padStart(2,"0")+":"+

String(minutes).padStart(2,"0")+":"+

String(seconds).padStart(2,"0");

}

setInterval(updateCountdown,1000);

updateCountdown();
document.addEventListener("DOMContentLoaded", () => {
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach((button) => {
        button.addEventListener("click", () => {
            const faqItem = button.parentElement;
            
            // Optional: Close other open accordion items
            document.querySelectorAll(".faq-item").forEach((item) => {
                if (item !== faqItem) {
                    item.classList.remove("active");
                }
            });

            // Toggle active state for smooth slide transition
            faqItem.classList.toggle("active");
        });
    });
});

/* ==========================
   DAILY GIFT COUNTDOWN TIMER
========================== */
function startGiftCountdown() {
    const countdownEl = document.getElementById("countdown");
    if (!countdownEl) return;

    function updateCountdown() {
        const now = new Date();
        const midnight = new Date();
        
        // Set target time to 12:00 AM (midnight) of the next day
        midnight.setHours(24, 0, 0, 0);

        const diff = midnight - now;

        // If midnight is reached
        if (diff <= 0) {
            countdownEl.textContent = "00:00:00";
            return;
        }

        // Calculate hours, minutes, and seconds remaining
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        // Helper function to add leading zeros (e.g., 05 instead of 5)
        const format = (num) => String(num).padStart(2, "0");

        // Display formatted time
        countdownEl.textContent = `${format(hours)}:${format(minutes)}:${format(seconds)}`;
    }

    // Run immediately on page load, then update every 1 second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Initialize countdown when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    startGiftCountdown();
});

/* ==========================
   THEME TOGGLE & PERSISTENCE
========================== */
function initThemeToggle() {
    const themeBtn = document.getElementById("themeToggle");
    if (!themeBtn) return;

    const themeIcon = themeBtn.querySelector(".theme-icon");

    // Check if user previously enabled dark theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        if (themeIcon) themeIcon.textContent = "☀️";
    }

    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        const isDark = document.body.classList.contains("dark-theme");

        // Update icon & persist preference in localStorage
        if (themeIcon) {
            themeIcon.textContent = isDark ? "☀️" : "🌙";
        }
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initThemeToggle();
});