document.addEventListener("DOMContentLoaded", () => {
    fetchDepartments();
});

function fetchDepartments() {
    fetch("/routes/crud/departments")  // Adjust the route if needed
        .then(response => response.json())
        .then(data => {
            displayDepartments(data);
        })
        .catch(error => console.error("Error fetching departments:", error));
}

function displayDepartments(departments) {
    const tableBody = document.getElementById("departmentsBody");
    tableBody.innerHTML = ""; // Clear existing content

    departments.forEach(dept => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${dept.id}</td>
            <td>${dept.name}</td>
            <td><img src="/images/${dept.logo}" alt="Logo" width="50"></td>
            <td>${dept.description}</td>
            <td><img src="/images/${dept.qr}" alt="QR Code" width="50"></td>
            <td>
                <button type="button" class="btn btn-secondary">View</button>
                <button type="button" class="btn btn-success">Edit</button>
                <button type="button" class="btn btn-danger">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const createBtn = document.getElementById("createBtn");
    const departmentCreateForm = document.getElementById("departmentCreateForm");
    const departmentViewForm = document.getElementById("departmentViewForm");
    
    const overlay = document.createElement("div");
    overlay.id = "overlay";
    document.body.appendChild(overlay);

    function showCreateForm() {
        if (departmentCreateForm) {
            departmentCreateForm.classList.remove("d-none");
        }
        overlay.style.display = "block"; // Show background overlay
    }

    function hideCreateForm() {
        if (departmentCreateForm) {
            departmentCreateForm.classList.add("d-none");
        }
        overlay.style.display = "none"; // Hide background overlay
    }
    
    function showViewForm() {
        if (departmentViewForm) {
            departmentViewForm.classList.remove("d-none");
        }
        overlay.style.display = "block";
    }

    function hideViewForm() {
        if (departmentViewForm) {
            departmentViewForm.classList.add("d-none");
        }
        overlay.style.display = "none"; // Hide background overlay
    }

    // Handle "Create" button click
    if (createBtn) {
        createBtn.addEventListener("click", showCreateForm);
    }

    // Event delegation for "View" button clicks inside the table
    document.getElementById("departmentsBody").addEventListener("click", function (event) {
        if (event.target.classList.contains("btn-secondary")) { // View button
            showViewForm();
        }
    });

    // Handle cancel button clicks
    document.addEventListener("click", function (event) {
        if (event.target.closest(".cancelBtn button")) {
            hideCreateForm();
            hideViewForm();
        }
    });
});
