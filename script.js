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
// Leaflet / OpenStreetMap – Kontaktseite + Cookie-Banner
// ==============================
document.addEventListener("DOMContentLoaded", function() {
    const banner = document.getElementById("cookie-banner");
    const acceptBtn = document.getElementById("accept-cookies");

    // Funktion zum Laden von Leaflet + Karte
    function loadLeaflet() {
        // Leaflet CSS einfügen
        if (!document.getElementById('leaflet-css')) {
            const link = document.createElement('link');
            link.id = 'leaflet-css';
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            link.integrity = 'sha256-o9N1j6U9SxkO3i/nZrK3kGHYX1mKFl1x4wAJ2nM/6Lk=';
            link.crossOrigin = '';
            document.head.appendChild(link);
        }

        // Leaflet JS einfügen
        if (!document.getElementById('leaflet-js')) {
            const script = document.createElement('script');
            script.id = 'leaflet-js';
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            script.integrity = 'sha256-o9N1j6U9SxkO3i/nZrK3kGHYX1mKFl1x4wAJ2nM/6Lk=';
            script.crossOrigin = '';
            script.onload = initLeafletMap;
            document.body.appendChild(script);
        } else {
            // Falls schon geladen, direkt initialisieren
            initLeafletMap();
        }
    }

    // Karte initialisieren
    function initLeafletMap() {
        const center = [48.4013, 10.6025]; // Zusmarshausen
        const map = L.map('map').setView(center, 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        L.marker(center).addTo(map)
            .bindPopup('An der Ziegelei 3A, 86441 Zusmarshausen')
            .openPopup();
    }

    // Prüfen, ob Cookies schon akzeptiert wurden
    if (localStorage.getItem("cookiesAccepted")) {
        if (banner) banner.style.display = "none";
        loadLeaflet();
    }

    // Klick auf Akzeptieren
    if (acceptBtn) {
        acceptBtn.addEventListener("click", function() {
            localStorage.setItem("cookiesAccepted", "true");
            if (banner) banner.style.display = "none";
            loadLeaflet();
        });
    }
});
