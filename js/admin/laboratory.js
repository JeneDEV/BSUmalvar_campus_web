// Fetch laboratory when page loads
document.addEventListener("DOMContentLoaded", fetchLaboratory);

// Function to fetch laboratory data from API
function fetchLaboratory() {
    fetch("/api/laboratory")
        .then(response => response.json())
        .then(data => {
            laboratory = data; // Store fetched data
            displayLaboratory(); // Populate table
        })
        .catch(error => console.error("Error fetching laboratory:", error));
}

// Function to populate the Departments table dynamically
function displayLaboratory() {
    const tableBody = document.getElementById("laboratoryBody");
    tableBody.innerHTML = laboratory.map(lab => `
        <tr>
            <td>${lab.id}</td>
            <td>${lab.department}</td>
            <td>${lab.room_name}</td>
            <td><img src="/public/uploads/${lab.laboratory_image}" alt="QR Code" width="50"></td>
            <td>${lab.description}</td>
            
            <td class="d-flex gap-2">
                 <button class="btn btn-outline btn-sm" onclick="viewLaboratory('${lab.id}')">
                    <i class="fas fa-eye"></i> View
                </button>
                <button class="btn btn-outline btn-sm btn-success" onclick="editLaboratory('${lab.id}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-outline btn-sm btn-danger" onclick="deleteLaboratory('${lab.id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>   
        </tr>
    `).join("");
}

function viewLaboratory(id) {
    const laboratories = laboratory.find(lab => lab.id == id);
    if (!laboratories) return alert("laboratory not found!");

    const modalContent = `
        <p><strong>ID: </strong> ${laboratories.id}</p>
        <p><strong>Department: </strong> ${laboratories.department}</p>
        <td><strong>Room_Name:</strong> ${laboratories.room_name}</td>
        <p><strong>Laboratory: </strong><br> <img src="/public/uploads/${laboratories.laboratory_image}" alt="Logo" width="100"></p>
        <p><strong>Description: </strong> ${laboratories.description}</p>   
    `;

    showModal("laboratory Details", modalContent);
}


// Function to edit a laboratory
function editLaboratory(id) {
    const laboratories = laboratory.find(lab => lab.id == id);
    if (!laboratories) return alert("Laboratory not found!");

    const modalContent = `
        <form id="editLaboratoryForm">
            <div class="mb-3">
                <label class="form-label">Name</label>
                <input type="text" class="form-control" id="editName" value="${laboratories.department}" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Room_Name</label>
                <input type="text" class="form-control" id="editRoomName" value="${laboratories.room_name}" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Laboratory</label>
                <input type="file" class="form-control" id="editLab">
            </div>
            <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea class="form-control" id="editDescription" required>${laboratories.description}</textarea>
            </div>
        </form>
    `;

    function saveChanges() {
        const formData = new FormData();
        formData.append("department", document.getElementById("editName").value);
        formData.append("description", document.getElementById("editDescription").value);
        formData.append("room_name", document.getElementById("editRoomName").value);
        const labFile = document.getElementById("editLab").files[0];
        if (labFile) formData.append("labimage", labFile);

        fetch(`/api/laboratory/${id}`, {
            method: "PUT",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                // Close the edit modal
                const editModal = bootstrap.Modal.getInstance(document.getElementById("laboratoryModal"));
                if (editModal) editModal.hide();

                // Add 500ms delay before showing success modal
                setTimeout(() => {
                    showModal(
                        "Success", 
                        "<p>Laboratory updated successfully!</p>", 
                        "OK", 
                        () => {
                            const successModal = bootstrap.Modal.getInstance(document.getElementById("laboratoryModal"));
                            if (successModal) successModal.hide(); // Auto-close modal
                            fetchLaboratory(); // Refresh laboratory list
                        }, 
                        "btn-success"
                    );

                    // Remove close (X) button from the modal
                    document.querySelector("#laboratoryModal .btn-close")?.remove();
                }, 500); // 500ms delay
            }
        })
        .catch(error => console.error("Error updating laboratory:", error));
    }

    // Show modal with "Save Changes" button
    showModal("Edit laboratory", modalContent, "Save Changes", saveChanges, "btn-primary");
}



// Function to delete a laboratory
function deleteLaboratory(id) {
    const modalTitle = "Confirm Deletion";
    const modalBody = "<p>Are you sure you want to delete this laboratory?</p>";

    // Define the delete action
    function confirmDelete() {
        fetch(`/api/laboratory/${id}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(data => {
            // Close the first modal
            const laboratoryModal = bootstrap.Modal.getInstance(document.getElementById("laboratoryModal"));
            if (laboratoryModal) laboratoryModal.hide();

            // Introduce a delay before showing the success modal
            setTimeout(() => {
                showModal(
                    "Success", 
                    "<p>Laboratory deleted successfully!</p>", 
                    "OK", 
                    () => {
                        const successModal = bootstrap.Modal.getInstance(document.getElementById("laboratoryModal"));
                        if (successModal) successModal.hide(); // Auto-close the modal
                        fetchLaboratory(); // Refresh laboratory list
                    }, 
                    "btn-success"
                );

                // Remove close (X) button from the modal
                document.querySelector("#laboratoryModal .btn-close")?.remove();
            }, 300); // 1-second delay before showing success modal
        })
        .catch(error => console.error("Error deleting laboratory:", error));
    }

    // Show the confirmation modal
    showModal(modalTitle, modalBody, "Delete", confirmDelete, "btn-danger");
}



function createLaboratory() {
    const modalTitle = "Create Laboratory";
    const modalBody = `
        <form id="editLaboratoryForm">
            <div class="mb-3">
                <label for="labName" class="form-label">Laboratory Name</label>
                <input type="text" class="form-control" id="labName" required>
            </div>
            <div class="mb-3">
                <label for="roomName" class="form-label">Room Name</label>
                <input type="text" class="form-control" id="roomName" required>
            </div>
            <div class="mb-3">
                <label for="LabImage" class="form-label">Room Image</label>
                <input type="file" class="form-control" id="LabImage" accept="image/*">
            </div>
            <div class="mb-3">
                <label for="labDescription" class="form-label">Description</label>
                <textarea class="form-control" id="labDescription" required></textarea>
            </div>
        </form>
    `;

    function submitNewLaboratory() {
        const formData = new FormData();
        formData.append("department", document.getElementById("labName").value);
        formData.append("labimg", document.getElementById("LabImage").files[0]); 
        formData.append("description", document.getElementById("labDescription").value);

        fetch("/api/laboratory", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                const laboratoryModal = bootstrap.Modal.getInstance(document.getElementById("laboratoryModal"));
                if (laboratoryModal) laboratoryModal.hide();

                setTimeout(() => {
                    showModal(
                        "Success", 
                        "<p>Laboratory created successfully!</p>", 
                        "OK", 
                        () => {
                            fetchLaboratory(); // Refresh laboratory list
                        }, 
                        "btn-success"
                    );
                }, 500);
            }
        })
        .catch(error => console.error("Error creating laboratory:", error));
    }

    showModal(modalTitle, modalBody, "Create", submitNewLaboratory, "btn-success");
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
