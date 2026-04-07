// Initialisatie staat hier,
emailjs.init("SH3wRrD5fC4vkhWeO");

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("support-form");
    const formContent = document.getElementById("form-content");
    const thanksMessage = document.getElementById("thanks-message");
    const submitBtn = document.getElementById("submit-btn");

    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let isValid = true;
        const inputs = form.querySelectorAll("input[required], textarea[required]");

        // 1. Validatie
        inputs.forEach(input => {
            const errorSpan = document.getElementById(`${input.id}-error`);

            if (!input.value.trim()) {
                showError(input, errorSpan, "This field is required.");
                isValid = false;
            } else if (input.type === "email" && !input.checkValidity()) {
                showError(input, errorSpan, "Please enter a valid email address.");
                isValid = false;
            } else if (input.minLength > 0 && input.value.length < input.minLength) {
                showError(input, errorSpan, `Minimum ${input.minLength} characters required.`);
                isValid = false;
            } else {
                hideError(input, errorSpan);
            }
        });

        if (!isValid) return;

        // 2. Start verzenden
        submitBtn.disabled = true;
        submitBtn.innerText = "Sending...";

        // Stap A: Mail naar Lumo Support (Dave)
        emailjs.sendForm('service_qwfiau8', 'template_423fd0a', form)
            .then(() => {

                return emailjs.sendForm('service_qwfiau8', 'template_0nyohae', form);
            })
            .then(() => {

                formContent.style.display = "none";
                thanksMessage.style.display = "block";
            })
            .catch((error) => {
                console.error("EmailJS Error:", error);
                alert("Something went wrong. Tip: check your internet connection or try an Incognito window.");
                resetBtn();
            });
    });

    // --- Helpers ---
    function showError(input, span, msg) {
        input.classList.add("invalid");
        if (span) span.innerText = msg;
    }

    function hideError(input, span) {
        input.classList.remove("invalid");
        if (span) span.innerText = "";
    }

    form.querySelectorAll("input, textarea").forEach(input => {
        input.addEventListener("input", () => {
            const errorSpan = document.getElementById(`${input.id}-error`);
            if (input.value.trim().length > 0) hideError(input, errorSpan);
        });
    });

    function resetBtn() {
        submitBtn.disabled = false;
        submitBtn.innerText = "Send Message";
    }
});