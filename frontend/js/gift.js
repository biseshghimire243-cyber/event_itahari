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