const bookingForm = document.getElementById("bookingForm");

const params = new URLSearchParams(window.location.search);

const eventId = params.get("id");

const user = JSON.parse(localStorage.getItem("user"));

if (!user) {

    alert("Please login first.");

    window.location.href = "login.html";

}

// Auto fill user information
document.getElementById("full_name").value = user.full_name;
document.getElementById("email").value = user.email;

bookingForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const bookingData = {

        user_id: user.id,

        event_id: eventId,

        full_name: document.getElementById("full_name").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        address: document.getElementById("address").value,

        guests: document.getElementById("guests").value,

        special_request: document.getElementById("special_request").value

    };

    try {

        const response = await fetch("http://localhost:3000/book-event", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(bookingData)

        });

        const data = await response.json();

        if (data.success) {

            alert("🎉 Booking Successful!");

            window.location.href = "my-bookings.html";

        } else {

            alert(data.message);

        }

    } catch (err) {

        console.error(err);

        alert("Booking Failed!");

    }

});