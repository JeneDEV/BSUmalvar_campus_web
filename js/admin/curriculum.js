// API Route to fetch departments
document.addEventListener("DOMContentLoaded", fetchCurriculums);

// Function to fetch department data from API
function fetchCurriculums() {
    fetch("/api/curriculums")
        .then(response => response.json())
        .then(data => {
            curriculums = data; // Store fetched data
            displayCurriculums(); // Populate table
        })
        .catch(error => console.error("Error fetching curriculums:", error));
}


// Function to populate the Departments table dynamically
function displayCurriculums() {
    const tableBody = document.getElementById("curriculumsBody");
    tableBody.innerHTML = curriculums.map(curr => `
        <tr>
            <td>${curr.id}</td>
            <td>${curr.department}</td>
            <td>
                <a href="public/uploads/${curr.curriculum}" target="_blank">
                    ${curr.curriculum}
                </a>
            </td>

            <td>${curr.date_upload}</td>
            <td class="d-flex gap-2">
                 <button class="btn btn-outline btn-sm" onclick="viewCurriculum('${curr.id}')">
                    <i class="fas fa-eye"></i> View
                </button>
                <button class="btn btn-outline btn-sm btn-success" onclick="editCurriculum('${curr.id}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-outline btn-sm btn-danger" onclick="deleteCurriculum('${curr.id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>   
        </tr>
    `).join("");
}


// Function to view curriculum details
function viewCurriculum(id) {
    const curriculum = curriculums.find(curr => curr.id == id);
    if (!curriculum) return alert("Curriculum not found!");

    const modalContent = `
        <p><strong>ID:</strong> ${curriculum.id}</p>
        <p><strong>Department:</strong> ${curriculum.department}</p>
        <p><strong>Curriculum:</strong> 
        <a href="public/uploads/${curriculum.curriculum}" target="_blank">${curriculum.curriculum}</a>
        </p>
        <p><strong>Date Uploaded:</strong> ${curriculum.date_upload}</p>
    `;

    showModal("Curriculum Details", modalContent);
}


function editCurriculum(id) {
    const curriculum = curriculums.find(curr => curr.id == id);
    if (!curriculum) return alert("Curriculum not found!");

    // Generate current date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split('T')[0];

    const modalContent = `
        <form id="editCurriculumForm">
            <div class="mb-3">
                <label class="form-label">Department:</label>
                <input type="text" class="form-control" id="editName" value="${curriculum.department}" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Upload Curriculum (PDF only)</label>
                <p><strong>Current File:</strong> <a href="public/uploads/${curriculum.curriculum}" target="_blank">${curriculum.curriculum}</a></p>
                <input type="file" class="form-control" id="editCurriculumFile" accept=".pdf">
            </div>
            <div class="mb-3">
                <label class="form-label">Date Updated:</label>
                <input type="text" class="form-control" id="editDate" value="${curriculum.date_upload}" readonly>
            </div>
            <div class="mb-3">
                <label class="form-label">Current Date:</label>
                <input type="text" class="form-control" id="currdate" readonly>
            </div>
        </form>
    `;

    function saveChanges() {
        const formData = new FormData();
        formData.append("department", document.getElementById("editName").value);
    
        const fileInput = document.getElementById("editCurriculumFile");
        if (fileInput.files.length > 0) {
            formData.append("curriculum", fileInput.files[0]);  // Attach file
            console.log("File selected:", fileInput.files[0]);  // Debugging
        } else {
            console.log("No new file selected");
        }
    
        formData.append("date_upload", document.getElementById("currdate").value);
    
        fetch(`/api/curriculum/${id}`, {
            method: "PUT",  // Or try "POST" if backend requires it
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                const editModal = bootstrap.Modal.getInstance(document.getElementById("curriculumModal"));
                if (editModal) editModal.hide();
    
                setTimeout(() => {
                    showModal(
                        "Success", 
                        "<p>Curriculum updated successfully!</p>", 
                        "OK", 
                        () => fetchCurriculums(), 
                        "btn-success"
                    );
                }, 500);
            } else {
                console.error("Failed to update curriculum:", data);
            }
        })
        .catch(error => console.error("Error updating curriculum:", error));
    }
    
    // Show modal with "Save Changes" button
    showModal("Edit Curriculum", modalContent, "Save Changes", saveChanges, "btn-primary");

    // Set the current date after modal is shown
    setTimeout(() => {
        document.getElementById("currdate").value = currentDate;
    }, 100);
}

function addCurriculum() {
    const modalTitle = "Create Curriculum";
    const modalBody = `
        <form id="createCurriculumForm">
            <div class="mb-3">
                <label class="form-label">Department:</label>
                <input type="text" class="form-control" id="editName" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Upload Curriculum (PDF only):</label>
                <input type="file" class="form-control" id="editCurriculumFile" accept=".pdf" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Current Date:</label>
                <input type="text" class="form-control" id="currdate" readonly>
            </div>
        </form>
    `;

    function submitNewCurriculum() {
        const formData = new FormData();
        formData.append("department", document.getElementById("editName").value);

        const fileInput = document.getElementById("editCurriculumFile");
        if (fileInput.files.length > 0) {
            formData.append("curriculum", fileInput.files[0]); // Attach the actual file
        }

        formData.append("date_upload", document.getElementById("currdate").value); // Include date

        fetch(`/api/curriculum`, {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                // Close the form modal
                const curriculumModal = bootstrap.Modal.getInstance(document.getElementById("curriculumModal"));
                if (curriculumModal) curriculumModal.hide();

                // Add a 500ms delay before showing success modal
                setTimeout(() => {
                    showModal(
                        "Success", 
                        "<p>Curriculum created successfully!</p>", 
                        "OK", 
                        () => {
                            fetchCurriculums(); // Refresh curriculum list
                        }, 
                        "btn-success"
                    );

                    // Remove close (X) button from the modal
                    document.querySelector("#curriculumModal .btn-close")?.remove();
                }, 500);
            }
        })
        .catch(error => console.error("Error creating curriculum:", error));
    }

    // Show modal with "Create" button
    showModal(modalTitle, modalBody, "Create", submitNewCurriculum, "btn-success");

    // Set the current date after modal is shown
    setTimeout(() => {
        document.getElementById("currdate").value = new Date().toISOString().slice(0, 19).replace("T", " ");
    }, 100);
}

// Function to delete a department
function deleteCurriculum(id) {
    const modalTitle = "Confirm Deletion";
    const modalBody = "<p>Are you sure you want to delete this curriculum?</p>";

    // Define the delete action
    function confirmDelete() {
        fetch(`/api/curriculum/${id}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(data => {
            // Close the first modal
            const curriculumModal = bootstrap.Modal.getInstance(document.getElementById("curriculumModal"));
            if (curriculumModal) curriculumModal.hide();

            // Introduce a delay before showing the success modal
            setTimeout(() => {
                showModal(
                    "Success", 
                    "<p>Curriculum deleted successfully!</p>", 
                    "OK", 
                    () => {
                        const successModal = bootstrap.Modal.getInstance(document.getElementById("curriculumModal"));
                        if (successModal) successModal.hide(); // Auto-close the modal
                        fetchCurriculums(); // Refresh department list
                    }, 
                    "btn-success"
                );

                // Remove close (X) button from the modal
                document.querySelector("#curriculumModal .btn-close")?.remove();
            }, 300); // 1-second delay before showing success modal
        })
        .catch(error => console.error("Error deleting curriculum:", error));
    }

    // Show the confirmation modal
    showModal(modalTitle, modalBody, "Delete", confirmDelete, "btn-danger");
}
