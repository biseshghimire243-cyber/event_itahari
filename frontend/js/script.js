// ==========================
// WAIT FOR PAGE TO LOAD
// ==========================
document.addEventListener("DOMContentLoaded", function () {

    // Smooth animation
    window.addEventListener("load", () => {
        document.body.style.opacity = "1";
    });

    // ==========================
    // ACTIVE NAVIGATION
    // ==========================
    const links = document.querySelectorAll(".nav-links a");

    links.forEach(link => {
        link.addEventListener("click", () => {
            links.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        });
    });

    // ==========================
    // HERO BUTTON
    // ==========================
    const heroBtn = document.querySelector(".hero-btn");

    if (heroBtn) {
        heroBtn.addEventListener("click", () => {
            console.log("Explore Events Clicked");
        });
    }

    // ==========================
    // VIEW DETAILS BUTTONS
    // ==========================
    const buttons = document.querySelectorAll(".event-content button");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            alert("Event Details page will be added next.");
        });
    });

    // ==========================
    // CHAT SUPPORT
    // ==========================
    const chatButton = document.getElementById("chatButton");
    const chatBox = document.getElementById("chatBox");
    const closeChat = document.getElementById("closeChat");
    const sendBtn = document.getElementById("sendBtn");
    const userInput = document.getElementById("userInput");
    const chatBody = document.getElementById("chatBody");

    console.log("Chat Button:", chatButton);
    console.log("Chat Box:", chatBox);

    if (
        chatButton &&
        chatBox &&
        closeChat &&
        sendBtn &&
        userInput &&
        chatBody
    ) {

        // OPEN CHAT
        chatButton.addEventListener("click", function () {

            console.log("Chat Button Clicked");

            chatBox.style.display = "block";

        });

        // CLOSE CHAT
        closeChat.addEventListener("click", function () {

            chatBox.style.display = "none";

        });

        // SEND BUTTON
        sendBtn.addEventListener("click", sendMessage);

        // ENTER KEY
        userInput.addEventListener("keypress", function (e) {

            if (e.key === "Enter") {

                sendMessage();

            }

        });

        function sendMessage() {

            const text = userInput.value.trim();

            if (text === "") return;

            chatBody.innerHTML += `
                <div class="user-message">
                    ${text}
                </div>
            `;

            userInput.value = "";

            chatBody.scrollTop = chatBody.scrollHeight;

            setTimeout(() => {

                let reply = "😊 Sorry, I didn't understand.";

                const msg = text.toLowerCase();

                if (msg.includes("booking") || msg.includes("book")) {

                    reply = "📅 You can book events from our Events page.";

                }

                else if (msg.includes("price") || msg.includes("cost")) {

                    reply = "💰 Packages start from Rs. 20,000.";

                }

                else if (msg.includes("wedding")) {

                    reply = "💍 We provide complete wedding planning.";

                }

                else if (msg.includes("birthday")) {

                    reply = "🎂 Birthday packages are fully customizable.";

                }

                else if (msg.includes("gift")) {

                    reply = "🎁 Visit our Gift page to claim today's reward.";

                }

                else if (msg.includes("location")) {

                    reply = "📍 We are located in Itahari, Sunsari.";

                }

                else if (msg.includes("contact")) {

                    reply = "📞 Contact us at +977-98XXXXXXXX.";

                }

                chatBody.innerHTML += `
                    <div class="bot-message">
                        ${reply}
                    </div>
                `;

                chatBody.scrollTop = chatBody.scrollHeight;

            }, 700);

        }

    } else {

        console.error("❌ Chat HTML elements are missing!");

    }

});