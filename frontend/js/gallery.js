document.addEventListener("DOMContentLoaded", () => {

    const buttons = document.querySelectorAll(".filters button");
    const cards = document.querySelectorAll(".gallery .card");

    // ==========================
    // FILTER GALLERY
    // ==========================

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            const filter = button.dataset.filter;

            cards.forEach(card => {

                card.style.opacity = "0";
                card.style.transform = "scale(.9)";

                setTimeout(() => {

                    if (filter === "all" || card.classList.contains(filter)) {

                        card.style.display = "block";

                        setTimeout(() => {

                            card.style.opacity = "1";
                            card.style.transform = "scale(1)";

                        }, 100);

                    }

                    else {

                        card.style.display = "none";

                    }

                }, 200);

            });

        });

    });

    // ==========================
    // IMAGE LIGHTBOX
    // ==========================

    const images = document.querySelectorAll(".card img");

    const lightbox = document.createElement("div");

    lightbox.id = "lightbox";

    lightbox.innerHTML = `

        <span class="close">&times;</span>

        <img id="lightbox-img">

    `;

    document.body.appendChild(lightbox);

    const lightboxImg = document.getElementById("lightbox-img");

    const close = document.querySelector(".close");

    images.forEach(img => {

        img.addEventListener("click", () => {

            lightbox.style.display = "flex";

            lightboxImg.src = img.src;

        });

    });

    close.addEventListener("click", () => {

        lightbox.style.display = "none";

    });

    lightbox.addEventListener("click", e => {

        if (e.target === lightbox) {

            lightbox.style.display = "none";

        }

    });

    document.addEventListener("keydown", e => {

        if (e.key === "Escape") {

            lightbox.style.display = "none";

        }

    });

});