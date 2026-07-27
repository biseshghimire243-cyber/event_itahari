const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const eventType = document.getElementById("event").value;
    const message = document.getElementById("message").value;

    if (
        name === "" ||
        email === "" ||
        phone === "" ||
        message === ""
    ) {
        alert("Please fill all required fields.");
        return;
    }

    alert("🎉 Thank you! Your message has been sent successfully.");

    form.reset();

});