// Fetch departments when page loads
document.addEventListener("DOMContentLoaded", fetchDepartments);

// Function to fetch department data from API
function fetchDepartments() {
    fetch("/api/departments")
        .then(response => response.json())
        .then(data => {
            departments = data; // Store fetched data
            displayDepartments(); // Populate table
        })
        .catch(error => console.error("Error fetching departments:", error));
}

// Function to populate the Departments table dynamically
function displayDepartments() {
    const tableBody = document.getElementById("departmentsBody");
    tableBody.innerHTML = departments.map(dept => `
        <tr>
            <td>${dept.id}</td>
            <td>${dept.name}</td>
            <td><img src="/public/uploads/${dept.logo}" alt="Logo" width="50"></td>
            <td>${dept.description}</td>
            <td><img src="/public/uploads/${dept.qr}" alt="QR Code" width="50"></td>
            <td class="d-flex gap-2">
                 <button class="btn btn-outline btn-sm" onclick="viewDepartment('${dept.id}')">
                    <i class="fas fa-eye"></i> View
                </button>
                <button class="btn btn-outline btn-sm btn-success" onclick="editDepartment('${dept.id}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-outline btn-sm btn-danger" onclick="deleteDepartment('${dept.id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>   
        </tr>
    `).join("");
}

// Function to view department details
function viewDepartment(id) {
    const department = departments.find(dept => dept.id == id);
    if (!department) return alert("Department not found!");

    const modalContent = `
        <p><strong>ID:</strong> ${department.id}</p>
        <p><strong>Name:</strong> ${department.name}</p>
        <p><strong>Description:</strong> ${department.description}</p>
        <p><strong>Logo:</strong><br> <img src="/public/uploads/${department.logo}" alt="Logo" width="100"></p>
        <p><strong>QR Code:</strong><br> <img src="/public/uploads/${department.qr}" alt="QR Code" width="100"></p>
    `;

    showModal("Department Details", modalContent);
}

// Function to edit a department
function editDepartment(id) {
    const department = departments.find(dept => dept.id == id);
    if (!department) return alert("Department not found!");

    const modalContent = `
        <form id="editDepartmentForm">
            <div class="mb-3">
                <label class="form-label">Name</label>
                <input type="text" class="form-control" id="editName" value="${department.name}" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea class="form-control" id="editDescription" required>${department.description}</textarea>
            </div>
            <div class="mb-3">
                <label class="form-label">Logo (Optional)</label>
                <input type="file" class="form-control" id="editLogo">
            </div>
            <div class="mb-3">
                <label class="form-label">QR Code (Optional)</label>
                <input type="file" class="form-control" id="editQr">
            </div>
        </form>
    `;

    function saveChanges() {
        const formData = new FormData();
        formData.append("name", document.getElementById("editName").value);
        formData.append("description", document.getElementById("editDescription").value);
        const logoFile = document.getElementById("editLogo").files[0];
        if (logoFile) formData.append("logo", logoFile);
        const qrFile = document.getElementById("editQr").files[0];
        if (qrFile) formData.append("qr", qrFile);

        fetch(`/api/departments/${id}`, {
            method: "PUT",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                // Close the edit modal
                const editModal = bootstrap.Modal.getInstance(document.getElementById("departmentModal"));
                if (editModal) editModal.hide();

                // Add 500ms delay before showing success modal
                setTimeout(() => {
                    showModal(
                        "Success", 
                        "<p>Department updated successfully!</p>", 
                        "OK", 
                        () => {
                            const successModal = bootstrap.Modal.getInstance(document.getElementById("departmentModal"));
                            if (successModal) successModal.hide(); // Auto-close modal
                            fetchDepartments(); // Refresh department list
                        }, 
                        "btn-success"
                    );

                    // Remove close (X) button from the modal
                    document.querySelector("#departmentModal .btn-close")?.remove();
                }, 500); // 500ms delay
            }
        })
        .catch(error => console.error("Error updating department:", error));
    }

    // Show modal with "Save Changes" button
    showModal("Edit Department", modalContent, "Save Changes", saveChanges, "btn-primary");
}


// Function to delete a department
function deleteDepartment(id) {
    const modalTitle = "Confirm Deletion";
    const modalBody = "<p>Are you sure you want to delete this department?</p>";

    // Define the delete action
    function confirmDelete() {
        fetch(`/api/departments/${id}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(data => {
            // Close the first modal
            const departmentModal = bootstrap.Modal.getInstance(document.getElementById("departmentModal"));
            if (departmentModal) departmentModal.hide();

            // Introduce a delay before showing the success modal
            setTimeout(() => {
                showModal(
                    "Success", 
                    "<p>Department deleted successfully!</p>", 
                    "OK", 
                    () => {
                        const successModal = bootstrap.Modal.getInstance(document.getElementById("departmentModal"));
                        if (successModal) successModal.hide(); // Auto-close the modal
                        fetchDepartments(); // Refresh department list
                    }, 
                    "btn-success"
                );

                // Remove close (X) button from the modal
                document.querySelector("#departmentModal .btn-close")?.remove();
            }, 300); // 1-second delay before showing success modal
        })
        .catch(error => console.error("Error deleting department:", error));
    }

    // Show the confirmation modal
    showModal(modalTitle, modalBody, "Delete", confirmDelete, "btn-danger");
}

   


// Function to create a new department
function createDepartment() {
    const modalTitle = "Create Department";
    const modalBody = `
        <form id="createDepartmentForm">
            <div class="mb-3">
                <label for="deptName" class="form-label">Department Name</label>
                <input type="text" class="form-control" id="deptName" required>
            </div>
            <div class="mb-3">
                <label for="deptDescription" class="form-label">Description</label>
                <textarea class="form-control" id="deptDescription" required></textarea>
            </div>
            <div class="mb-3">
                <label for="deptLogo" class="form-label">Logo</label>
                <input type="file" class="form-control" id="deptLogo" accept="image/*">
            </div>
            <div class="mb-3">
                <label for="deptQR" class="form-label">QR Code</label>
                <input type="file" class="form-control" id="deptQR" accept="image/*">
            </div>
        </form>
    `;

    function submitNewDepartment() {
        const formData = new FormData();
        formData.append("name", document.getElementById("deptName").value);
        formData.append("description", document.getElementById("deptDescription").value);
        formData.append("logo", document.getElementById("deptLogo").files[0]);
        formData.append("qr", document.getElementById("deptQR").files[0]);

        fetch("/api/departments", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                // Close the form modal
                const departmentModal = bootstrap.Modal.getInstance(document.getElementById("departmentModal"));
                if (departmentModal) departmentModal.hide();

                // Add a 500ms delay before showing success modal
                setTimeout(() => {
                    showModal(
                        "Success", 
                        "<p>Department created successfully!</p>", 
                        "OK", 
                        () => {
                            const successModal = bootstrap.Modal.getInstance(document.getElementById("departmentModal"));
                            if (successModal) successModal.hide(); // Auto-close modal
                            fetchDepartments(); // Refresh department list
                        }, 
                        "btn-success"
                    );

                    // Remove close (X) button from the modal
                    document.querySelector("#departmentModal .btn-close")?.remove();
                }, 300); // 500ms delay
            }
        })
        .catch(error => console.error("Error creating department:", error));
    }

    // Show modal with "Create" button
    showModal(modalTitle, modalBody, "Create", submitNewDepartment, "btn-success");
}




function showModal(title, bodyContent, actionText = "", actionCallback = null, actionClass = "btn-primary") {
    const modalElement = document.getElementById("Modals");
    if (!modalElement) {
        console.error("Modal element with ID 'Modals' not found!");
        return;
    }
    
    modalElement.removeAttribute("aria-hidden");

    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalBody").innerHTML = bodyContent;

    const actionButton = document.getElementById("modalActionBtn");
    if (actionText) {
        actionButton.textContent = actionText;
        actionButton.className = `btn ${actionClass}`;
        actionButton.style.display = "block";
        actionButton.onclick = () => {
            if (actionCallback) actionCallback();
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            if (modalInstance) modalInstance.hide();
        };
    } else {
        actionButton.style.display = "none";
    }

    const modal = new bootstrap.Modal(modalElement, { backdrop: "static", keyboard: false });

    modalElement.addEventListener('hidden.bs.modal', () => {
        document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
        document.body.classList.remove('modal-open');
    });

    modal.show();
}
