const bookingContainer = document.getElementById("bookingContainer");

const user = JSON.parse(localStorage.getItem("user"));

if (!user) {

    alert("Please login first.");

    window.location.href = "login.html";

}

async function loadBookings() {

    try {

        const response = await fetch(`http://localhost:3000/my-bookings/${user.id}`);

        const data = await response.json();

        if (!data.success || data.bookings.length === 0) {

            bookingContainer.innerHTML = "<h2>No Bookings Found</h2>";

            return;

        }

        bookingContainer.innerHTML = "";

        data.bookings.forEach(booking => {

            bookingContainer.innerHTML += `

                <div class="booking-card">

                    <h2>${booking.title}</h2>

                    <p>📍 ${booking.location}</p>

                    <p>📅 ${new Date(booking.event_date).toLocaleDateString()}</p>

                    <p>👥 Guests: ${booking.guests}</p>

                    <p>💰 Rs. ${booking.price}</p>

                    <span class="status">${booking.status}</span>

                </div>

            `;

        });

    }

    catch (err) {

        console.log(err);

        bookingContainer.innerHTML = "<h2>Unable to load bookings.</h2>";

    }

}

loadBookings();