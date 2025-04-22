async function fetchSliders() {
    try {
        const response = await fetch("/api/sliders");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const sliders = await response.json();

        const carouselInner = document.querySelector(".carousel-inner");
        const indicators = document.querySelector(".carousel-indicators");

        // Clear only the existing slides and indicators
        carouselInner.innerHTML = "";
        indicators.innerHTML = "";

        sliders.forEach((slider, index) => {
            const isActive = index === 0 ? "active" : ""; // First slide should be active
            
            // Create indicator button
            const indicatorBtn = document.createElement("button");
            indicatorBtn.type = "button";
            indicatorBtn.setAttribute("data-bs-target", "#carouselExampleDark");
            indicatorBtn.setAttribute("data-bs-slide-to", index);
            indicatorBtn.setAttribute("aria-label", `Slide ${index + 1}`);
            if (index === 0) {
                indicatorBtn.classList.add("active");
                indicatorBtn.setAttribute("aria-current", "true");
            }
            indicators.appendChild(indicatorBtn);

            // Create carousel item
            const item = document.createElement("div");
            item.className = `carousel-item ${isActive}`;
            item.setAttribute("data-bs-interval", "false");
            item.innerHTML = `
                <div class="carousel-content">
                    <div class="carousel-con d-flex align-items-center justify-content-center">
                        <div class="carousel-image">
                            <img src="/public/uploads/${slider.logo || 'default-logo.png'}" class="d-block" alt="${slider.name || 'Department Logo'}">
                        </div>
                        <div class="carousel-captions" style="width: 40%; margin-left: 2rem;">
                            <h5>DEPARTMENT:</h5>
                            <h2><strong>${slider.name || "Unknown Department"}</strong></h2>
                            <p>${slider.description || "No description available."}</p>
                            <h5 class="qr-con" style="font-size: 2rem;">
                                <strong>SCAN HERE</strong>
                                <i class="bi bi-arrow-bar-right" style="font-size: 2rem;"></i>
                                <img src="/public/uploads/${slider.qr || 'default-qr.png'}" " alt="QR Code" class="shadow-lg ms-5">
                            </h5>
                        </div>
                    </div>
                </div>
            `;

            // After inserting the content, call styleTextInsideParentheses to style the department name
            styleTextInsideParentheses(item);

            // Append slide to carousel
            carouselInner.appendChild(item);
        });

    } catch (error) {
        console.error("❌ Error fetching slider data:", error);
    }
}

function styleTextInsideParentheses(element) {
    // Find all <h2> or any other text that might contain parentheses
    const departmentNameElement = element.querySelector('h2');
    if (departmentNameElement) {
        let text = departmentNameElement.innerText;

        // Regular expression to match parentheses and their content
        const regex = /(\(.*?\))/;

        // Check if there are parentheses in the text
        if (regex.test(text)) {
            // Wrap the entire text in <strong> if not already wrapped
            text = `<strong>${text}</strong>`;

            // Replace parentheses and their content with a span for styling
            const newText = text.replace(regex, function(match) {
                return `<span class="highlight">${match}</span>`; // Wrap both parentheses and content
            });

            // Set the new HTML content
            departmentNameElement.innerHTML = newText;
        } else {
            // If no parentheses, just wrap the text in <strong>
            departmentNameElement.innerHTML = `<strong>${text}</strong>`;
        }
    }
}

// Fetch sliders on page load
fetchSliders();
