const container = document.getElementById("eventDetails");

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

async function loadEvent() {

    try {

        const response = await fetch(`http://localhost:3000/events/${id}`);

        const data = await response.json();

        if (!data.success) {

            container.innerHTML = "<h2>Event Not Found</h2>";

            return;

        }

        const event = data.event;

        container.innerHTML = `

        <div class="details-card">

            <div class="details-image">

                <img src="https://picsum.photos/900/500?random=${event.id}" alt="${event.title}">

            </div>

            <div class="details-content">

                <span class="badge">${event.category}</span>

                <h1>${event.title}</h1>

                <p class="description">

                    ${event.description}

                </p>

                <div class="info">

                    <p>📍 <strong>Location:</strong> ${event.location}</p>

                    <p>📅 <strong>Date:</strong> ${new Date(event.event_date).toLocaleDateString()}</p>

                    <p>⏰ <strong>Time:</strong> ${event.event_time}</p>

                    <p>👥 <strong>Guests:</strong> ${event.max_guests}</p>

                    <p>💰 <strong>Price:</strong> Rs. ${event.price}</p>

                    <p>✅ <strong>Status:</strong> ${event.status}</p>

                </div>

                <div class="details-buttons">

                    <button class="book-btn">

                        Book Now

                    </button>

                    <button class="back-btn" onclick="history.back()">

                        Back

                    </button>

                </div>

            </div>

        </div>

        `;

    }

    catch (err) {

        console.log(err);

        container.innerHTML = "<h2>Something went wrong.</h2>";

    }

}

loadEvent();