// Fetch profile data when page loads
document.addEventListener("DOMContentLoaded", fetchProfile);

// Function to fetch profile data from API
function fetchProfile() {
    fetch("/api/profile")
        .then(response => response.json())
        .then(data => {
            profiles = data;
            populateProfileTable(); // Populate table with fetched data
        })
        .catch(error => console.error("Error fetching profile:", error));
}

// Function to populate the profile table dynamically
function populateProfileTable() {
    const tableBody = document.getElementById("profileBody");
    tableBody.innerHTML = profiles.map(prof => `

        <tr>
            <td>${prof.id}</td>
            <td>${prof.name}</td>
            <td>${prof.position}</td>
            <td><img src="/public/uploads/${prof.image}" alt="Profile Image" width="50"></td>
            <td>${prof.department}</td>
            <td>${prof.description}</td>
            <td>${prof.category}</td>
            <td class="d-flex gap-2">
                 <button class="btn btn-outline btn-sm" onclick="viewProfile('${prof.id}')">
                    <i class="fas fa-eye"></i> View
                </button>
                <button class="btn btn-outline btn-sm btn-success" onclick="editProfile('${prof.id}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-outline btn-sm btn-danger" onclick="deleteProfile('${prof.id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>   
        </tr>
    `).join("");
}


function viewProfile(id) {
    const profile = profiles.find(prof => prof.id == id);
    if (!profile) return alert("Profile not found!");

    const modalContent = `
        <p><strong>ID: </strong>${profile.id}</p>
        <p><strong>NAME: </strong>${profile.name}</p>
        <p><strong>FACULTY RANK: </strong>${profile.position}</p>
        <p><strong>PROFILE PICTURE: </strong><img src="/public/uploads/${profile.image}" alt="Profile Image" width="50"></p>
        <p><strong>DEPARTMENT: </strong>${profile.department}</p>
        <p><strong>DESCRIPTION: </strong>${profile.description}</p>
        <p><strong>CATEGORY: </strong>${profile.category}</p>
    `;

    showModal("Profile Details", modalContent);
}

// Function to edit a profile
function editProfile(id) {
    const profile = profiles.find(prof => prof.id == id);
    if (!profile) return alert("Profile not found!");

    const modalContent = `
        <form id="editProfileForm">
            <div class="mb-3">
                <label class="form-label">Name</label>
                <input type="text" class="form-control" id="editName" value="${profile.name}" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Position</label>
                <input type="text" class="form-control" id="editPosition" value="${profile.position}" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Profile Picture</label>
                <input type="file" class="form-control" id="editProfilePicture">
            </div>
            <div class="mb-3">
                <label class="form-label">Department</label>
                <input type="text" class="form-control" id="editDepartment" value="${profile.department}" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea class="form-control" id="editDescription" required>${profile.description}</textarea>
            </div>
             <div id="categorySelection" class="category-container" style="display: flex; flex-wrap: wrap; gap: 10px;">
                <span class="category-tag" data-value="College Officials" style="padding: 8px 15px; background-color: #f0f0f0; border-radius: 20px; cursor: pointer; user-select: none; transition: 0.2s;">College Officials</span>
                <span class="category-tag" data-value="Faculty" style="padding: 8px 15px; background-color: #f0f0f0; border-radius: 20px; cursor: pointer; user-select: none; transition: 0.2s;">Faculty</span>
                <span class="category-tag" data-value="Staff" style="padding: 8px 15px; background-color: #f0f0f0; border-radius: 20px; cursor: pointer; user-select: none; transition: 0.2s;">Staff</span>
                <span class="category-tag" data-value="Teaching" style="padding: 8px 15px; background-color: #f0f0f0; border-radius: 20px; cursor: pointer; user-select: none; transition: 0.2s;">Teaching</span>
                <span class="category-tag" data-value="Non-Teaching" style="padding: 8px 15px; background-color: #f0f0f0; border-radius: 20px; cursor: pointer; user-select: none; transition: 0.2s;">Non-Teaching</span>
            </div>
            <input type="hidden" id="profileCategory" name="profileCategory" required />
            </div>
        </form>
    `;

    function saveChanges() {
        const formData = new FormData();
        formData.append("name", document.getElementById("editName").value);
        formData.append("position", document.getElementById("editPosition").value);
        formData.append("description", document.getElementById("editDescription").value);
        formData.append("category", document.getElementById("profileCategory").value);
        formData.append("department", document.getElementById("editDepartment").value); // Department as text

        const profilePicture = document.getElementById("editProfilePicture").files[0];
        if (profilePicture) formData.append("image", profilePicture);

        fetch(`/api/profile/${id}`, {
            method: "PUT",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                const editModal = bootstrap.Modal.getInstance(document.getElementById("profileModal"));
                if (editModal) editModal.hide();

                setTimeout(() => {
                    showModal("Success", "<p>Profile updated successfully!</p>", "OK", () => {
                        const successModal = bootstrap.Modal.getInstance(document.getElementById("profileModal"));
                        if (successModal) successModal.hide();
                        fetchProfile();
                    }, "btn-success");

                    document.querySelector("#profileModal .btn-close")?.remove();
                }, 500);
            }
        })
        .catch(error => console.error("Error updating profile:", error));
    }

    showModal("Edit Profile", modalContent, "Save Changes", saveChanges, "btn-primary");
    const tags = document.querySelectorAll('.category-tag');
    const hiddenInput = document.getElementById('profileCategory');

    tags.forEach(tag => {
        tag.addEventListener('click', () => {
        const isSelected = tag.classList.toggle('selected');
        tag.style.backgroundColor = isSelected ? '#007bff' : '#f0f0f0';
        tag.style.color = isSelected ? '#fff' : '#000';

        const selected = Array.from(document.querySelectorAll('.category-tag.selected'))
                                .map(t => t.getAttribute('data-value'));

        hiddenInput.value = selected.join(', ');
        });
    });
}


// Function to delete a profile
function deleteProfile(id) {
    const modalTitle = "Confirm Deletion";
    const modalBody = "<p>Are you sure you want to delete this profile?</p>";

    function confirmDelete() {
        fetch(`/api/profile/${id}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(data => {
            const deleteModal = bootstrap.Modal.getInstance(document.getElementById("deleteModal"));
            if (deleteModal) deleteModal.hide();

            setTimeout(() => {
                showModal("Success", "<p>Profile deleted successfully!</p>", "OK", () => {
                    const successModal = bootstrap.Modal.getInstance(document.getElementById("deleteModal"));
                    if (successModal) successModal.hide();
                    fetchProfile();
                }, "btn-success");

                document.querySelector("#deleteModal .btn-close")?.remove();
            }, 300);
        })
        .catch(error => console.error("Error deleting profile:", error));
    }

    showModal(modalTitle, modalBody, "Delete", confirmDelete, "btn-danger");
}


// Function to create a profile
function createProfile() {
    const modalTitle = "Create Profile";
    const modalBody = `
        <form id="createProfileForm">
            <div class="mb-3">
                <label class="form-label">Name</label>
                <input type="text" class="form-control" id="profileName" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Position</label>
                <input type="text" class="form-control" id="profilePosition" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Profile Picture</label>
                <input type="file" class="form-control" id="profilePicture">
            </div>
            <div class="mb-3">
                <label class="form-label">Department</label>
                <input type="text" class="form-control" id="departmentLogo" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea class="form-control" id="profileDescription" required></textarea>
            </div>
            <div class="mb-3">
            <label class="form-label">Category</label>
            <div id="categorySelection" class="category-container" style="display: flex; flex-wrap: wrap; gap: 10px;">
                <span class="category-tag" data-value="College Officials" style="padding: 8px 15px; background-color: #f0f0f0; border-radius: 20px; cursor: pointer; user-select: none; transition: 0.2s;">College Officials</span>
                <span class="category-tag" data-value="Faculty" style="padding: 8px 15px; background-color: #f0f0f0; border-radius: 20px; cursor: pointer; user-select: none; transition: 0.2s;">Faculty</span>
                <span class="category-tag" data-value="Staff" style="padding: 8px 15px; background-color: #f0f0f0; border-radius: 20px; cursor: pointer; user-select: none; transition: 0.2s;">Staff</span>
                <span class="category-tag" data-value="Teaching" style="padding: 8px 15px; background-color: #f0f0f0; border-radius: 20px; cursor: pointer; user-select: none; transition: 0.2s;">Teaching</span>
                <span class="category-tag" data-value="Non-Teaching" style="padding: 8px 15px; background-color: #f0f0f0; border-radius: 20px; cursor: pointer; user-select: none; transition: 0.2s;">Non-Teaching</span>
            </div>
            <input type="hidden" id="profileCategory" name="profileCategory" required />
            </div>
        </form>
    `;



    function submitNewProfile() {
        const formData = new FormData();
        formData.append("name", document.getElementById("profileName").value);
        formData.append("position", document.getElementById("profilePosition").value);
        formData.append("description", document.getElementById("profileDescription").value);
        formData.append("category", document.getElementById("profileCategory").value);
        formData.append("department", document.getElementById("departmentLogo").value); // Department as text

        const profilePicture = document.getElementById("profilePicture").files[0];
        if (profilePicture) formData.append("image", profilePicture);

        fetch("/api/profile", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                const profileModal = bootstrap.Modal.getInstance(document.getElementById("profileModal"));
                if (profileModal) profileModal.hide();

                setTimeout(() => {
                    showModal("Success", "<p>Profile created successfully!</p>", "OK", () => {
                        fetchProfile();
                    }, "btn-success");
                }, 500);
            }
        })
        .catch(error => console.error("Error creating profile:", error));
    }

    showModal(modalTitle, modalBody, "Create", submitNewProfile, "btn-success");
    const tags = document.querySelectorAll('.category-tag');
    const hiddenInput = document.getElementById('profileCategory');

    tags.forEach(tag => {
        tag.addEventListener('click', () => {
        const isSelected = tag.classList.toggle('selected');
        tag.style.backgroundColor = isSelected ? '#007bff' : '#f0f0f0';
        tag.style.color = isSelected ? '#fff' : '#000';

        const selected = Array.from(document.querySelectorAll('.category-tag.selected'))
                                .map(t => t.getAttribute('data-value'));

        hiddenInput.value = selected.join(', ');
        });
    });

}


