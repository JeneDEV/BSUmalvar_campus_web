document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector(".log-in");

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!email || !password) {
            alert("Please fill in both email and password.");
            return;
        }

        try {
            const response = await fetch("/auth/admin_login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error("Invalid credentials. Please try again.");
            }

            // Redirect to the admin panel after successful login
            window.location.href = "/admin_panel";


        } catch (error) {
            alert(error.message);
        }
    });
});
