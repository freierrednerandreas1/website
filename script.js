// Kontaktformular absenden
function sendMessage(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefon = document.getElementById("telefon").value.trim();
    const art = document.getElementById("anfrageArt").value;
    const ort = document.getElementById("ort").value.trim();
    const message = document.getElementById("message").value.trim();
    const submitButton = document.getElementById("submitBtn");

    // Prüfen, ob alle Pflichtfelder ausgefüllt sind
    if (!name || !email || !telefon || !art || !ort || !message) {
        submitButton.title = "Bitte füllen Sie zuerst alle mit * markierten Felder aus";
        document.getElementById("form-response").innerText = "Bitte alle Felder ausfüllen.";
        return false;
    } else {
        submitButton.title = ""; // Mouseover-Hinweis zurücksetzen
    }

    // Betreff erzeugen
    const subject = `Art der Anfrage: ${art}`;

    // Body erzeugen (mit Enkodierung für Mail-Clients)
    const body =
        `Name: ${encodeURIComponent(name)}%0D%0A` +
        `E-Mail: ${encodeURIComponent(email)}%0D%0A` +
        `Telefonnummer: ${encodeURIComponent(telefon)}%0D%0A` +
        `Art der Anfrage: ${encodeURIComponent(art)}%0D%0A` +
        `Ort der Feier: ${encodeURIComponent(ort)}%0D%0A%0D%0A` +
        `Nachricht:%0D%0A${encodeURIComponent(message)}`;

    // Mailto-Link erzeugen
    const mailto = `mailto:andreas_hartmann@mail.de?subject=${encodeURIComponent(subject)}&body=${body}`;

    // Mailprogramm öffnen
    window.location.href = mailto;

    // Rückmeldung anzeigen
    const response = document.getElementById("form-response");
    response.innerText = "Vielen Dank! Eure Anfrage wird vorbereitet.";
    response.style.opacity = 1;

    return false;
}

// Optional: Felder bei Eingabe prüfen und Mouseover-Hinweis entfernen
document.querySelectorAll(".contact-form input, .contact-form textarea, .contact-form select").forEach(field => {
    field.addEventListener("input", () => {
        const submitButton = document.getElementById("submitBtn");
        submitButton.title = "";
        document.getElementById("form-response").innerText = "";
    });
});


// ==============================
// Testimonials Slider (Erfahrungsberichte)
// ==============================
document.addEventListener("DOMContentLoaded", function () {
    const testimonials = document.querySelectorAll(".testimonial");
    const dots = document.querySelectorAll(".testimonial-dots .dot");
    let current = 0;
	
	// Initiales Testimonial setzen
testimonials[0].classList.add("active");
dots[0].classList.add("active");

    let interval = setInterval(nextTestimonial, 8000);

    function showTestimonial(index) {
        testimonials.forEach(t => t.classList.remove("active"));
        dots.forEach(d => d.classList.remove("active"));

        testimonials[index].classList.add("active");
        dots[index].classList.add("active");
        current = index;
    }

    function nextTestimonial() {
        current = (current + 1) % testimonials.length;
        showTestimonial(current);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            clearInterval(interval);
            showTestimonial(index);
            interval = setInterval(nextTestimonial, 6000);
        });
    });
});

// ==============================
// Google Maps – Kontaktseite
// ==============================
function initMap() {
    const center = { lat: 48.4013, lng: 10.6025 }; // An der Ziegelei 3A, Zusmarshausen
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: center,
        disableDefaultUI: true,
        styles: [
            { featureType: "poi", stylers: [{ visibility: "off" }] }
        ]
    });

    // Marker setzen
    new google.maps.Marker({
        position: center,
        map: map,
        title: "An der Ziegelei 3A, 86441 Zusmarshausen"
    });
}


// Cookie-Banner Funktion
document.addEventListener("DOMContentLoaded", function() {
    const banner = document.getElementById("cookie-banner");
    const acceptBtn = document.getElementById("accept-cookies");

    // Prüfen, ob Nutzer schon zugestimmt hat
    if (!localStorage.getItem("cookiesAccepted")) {
        banner.style.display = "flex";
    } else {
        loadMap(); // Map sofort laden, wenn schon akzeptiert
    }

    // Klick auf Akzeptieren
    acceptBtn.addEventListener("click", function() {
        localStorage.setItem("cookiesAccepted", "true");
        banner.style.display = "none";
        loadMap(); // Map laden
    });
});

// Google Maps erst laden, wenn Zustimmung erfolgt
function loadMap() {
    const script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?callback=initMap";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
}
