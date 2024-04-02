document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("section-visible");
            }
        });
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Add event listener for submitting the message form
    document.getElementById("message-form").addEventListener("submit", function(event) {
        event.preventDefault();

        // Get the values of name, email, and message fields
        const name = document.getElementById("name-input").value;
        const email = document.getElementById("email-input").value;
        const message = document.getElementById("message-input").value;

        // Create a plain text body
        const body = `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`;

        // Send the POST request
        fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Error sending email');
            }
        })
        .then(data => {
            alert(data); // Display success message
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error sending email');
        });

        // Clear the input fields
        document.getElementById("name-input").value = "";
        document.getElementById("email-input").value = "";
        document.getElementById("message-input").value = "";
    });

    // Get references to the form fields
    const nameField = document.getElementById("name-input");
    const emailField = document.getElementById("email-input");
    const messageField = document.getElementById("message-input");

    // Add event listener for the minimize button
    document.getElementById("minimize-button").addEventListener("click", function() {
        const chatWidget = document.getElementById("chat-widget");
        const minimizedElements = [nameField, emailField, messageField];

        chatWidget.classList.toggle("minimized");

        minimizedElements.forEach(element => {
            element.classList.toggle("hidden");
        });
    });

    // Add event listener for restoring the chat
    document.getElementById("minimized-chat-button").addEventListener("click", function() {
        const chatWidget = document.getElementById("chat-widget");
        const minimizedElements = [nameField, emailField, messageField];

        chatWidget.classList.remove("minimized");

        minimizedElements.forEach(element => {
            element.classList.remove("hidden");
        });
    });
});
