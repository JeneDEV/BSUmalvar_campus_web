// API Route to fetch departments
document.addEventListener("DOMContentLoaded", fetchBlogs);

// Function to fetch department data from API
function fetchBlogs() {
    fetch("/api/blogs")
        .then(response => response.json())
        .then(data => {
            blogs = data; // Store fetched data
            displayBlogs(); // Populate table
        })
        .catch(error => console.error("Error fetching blogs:", error));
}


// Function to populate the Departments table dynamically
function displayBlogs() {
    const tableBody = document.getElementById("blogBody");
    tableBody.innerHTML = blogs.map(blog => `
        <tr>
            <td>${blog.id}</td>
            <td>${blog.department}</td>
            <td>${blog.title}</td>
            <td>${blog.description}</td>
            <td><img src="/public/uploads/${blog.pictures}" alt="pics" width="150"></td>
            <td>${blog.date}</td>
            <td>${blog.author}</td>
            <td>
                <a href="public/uploads/${blog.file_pdf}" target="_blank">
                    ${blog.file_pdf}
                </a>
            </td>

            
            <td class="d-flex gap-2">
                 <button class="btn btn-outline btn-sm" onclick="viewBlog('${blog.id}')">
                    <i class="fas fa-eye"></i> View
                </button>
                <button class="btn btn-outline btn-sm btn-success" onclick="editBlog('${blog.id}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-outline btn-sm btn-danger" onclick="deleteBlogs('${blog.id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>   
        </tr>
    `).join("");
}



// Function to delete a department
function deleteBlogs(id) {
    const modalTitle = "Confirm Deletion";
    const modalBody = "<p>Are you sure you want to delete this blog?</p>";

    // Define the delete action
    function confirmDelete() {
        fetch(`/api/blogs/${id}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(data => {
            // Close the first modal
            const blogModal = bootstrap.Modal.getInstance(document.getElementById("blogModal"));
            if (blogModal) blogModal.hide();

            // Introduce a delay before showing the success modal
            setTimeout(() => {
                showModal(
                    "Success", 
                    "<p>Blog deleted successfully!</p>", 
                    "OK", 
                    () => {
                        const successModal = bootstrap.Modal.getInstance(document.getElementById("blogModal"));
                        if (successModal) successModal.hide(); // Auto-close the modal
                        fetchBlogs(); // Refresh department list
                    }, 
                    "btn-success"
                );

                // Remove close (X) button from the modal
                document.querySelector("#blogModal .btn-close")?.remove();
            }, 300); // 1-second delay before showing success modal
        })
        .catch(error => console.error("Error deleting blog:", error));
    }

    // Show the confirmation modal
    showModal(modalTitle, modalBody, "Delete", confirmDelete, "btn-danger");
}


function viewBlog(id) {
    const blog = blogs.find(blog => blog.id == id);
    if (!blog) return alert("Curriculum not found!");

    const modalContent = `
        <p><strong>ID:</strong> ${blog.id}</p>
        <p><strong>Department:</strong> ${blog.department}</p>
        <p><strong>Title:</strong> ${blog.title}</p>
        <p><strong>Description:</strong> ${blog.description}</p>
        <p><strong>Image:</strong> <img src="public/uploads/${blog.pictures}" alt="pics" width="250"></p>
        <p><strong>Author:</strong> ${blog.author}</p>
        <p><strong>File:</strong> 
        <a href="public/uploads/${blog.file_pdf}" target="_blank">${blog.file_pdf}</a>
        </p>
        <p><strong>Date Uploaded:</strong> ${blog.date}</p>
    `;

    showModal("blog Details", modalContent);
}



function editBlog(id) {
    const blog = blogs.find(blog => blog.id == id);
    if (!blog) return alert("Blog not found!");

    // Generate current date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split('T')[0];

    const modalContent = `
        <form id="editBlogForm">
            <div class="mb-3">
                <label class="form-label">Department: </label>
                <input type="text" class="form-control" id="editDepartment" value="${blog.department}" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Title: </label>
                <input type="text" class="form-control" id="editTitle" value="${blog.title}" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Description: </label>
                <input type="text" class="form-control" id="editDesc" value="${blog.description}" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Pictures (Optional): </label>
                <input type="file" class="form-control" id="editPictures" accept="image/*">
            </div>
            <div class="mb-3">
                <label class="form-label">Date Updated: </label>
                <input type="text" class="form-control" id="editDate" value="${blog.date}" readonly>
            </div>
            <div class="mb-3">
                <label class="form-label">Author: </label>
                <input type="text" class="form-control" id="editAuthor" value="${blog.author}" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Upload Blog (PDF only): </label>
                <p><strong>Current File:</strong> <a href="public/uploads/${blog.file_pdf}" target="_blank">${blog.file_pdf}</a></p>
                <input type="file" class="form-control" id="editBlogFile" accept=".pdf">
            </div>
        </form>
    `;

    function saveChanges() {
        const formData = new FormData();
        formData.append("department", document.getElementById("editDepartment").value);
        formData.append("title", document.getElementById("editTitle").value);
        formData.append("description", document.getElementById("editDesc").value);
        formData.append("date", document.getElementById("editDate").value);
        formData.append("author", document.getElementById("editAuthor").value);

        const fileInput = document.getElementById("editBlogFile");
        if (fileInput.files.length > 0) {
            formData.append("file_pdf", fileInput.files[0]);
        }

        const pictureInput = document.getElementById("editPictures");
        if (pictureInput.files.length > 0) {
            formData.append("pictures", pictureInput.files[0]);
        }

        fetch(`/api/blogs/${id}`, {
            method: "PUT",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                const editModal = bootstrap.Modal.getInstance(document.getElementById("blogModal"));
                if (editModal) editModal.hide();
    
                setTimeout(() => {
                    showModal(
                        "Success", 
                        "<p>Blog updated successfully!</p>", 
                        "OK", 
                        () => fetchBlogs(), 
                        "btn-success"
                    );
                }, 500);
            } else {
                console.error("Failed to update blog:", data);
            }
        })
        .catch(error => console.error("Error updating blog:", error));
    }

    showModal("Edit Blog", modalContent, "Save Changes", saveChanges, "btn-primary");

    // Set the current date after modal is shown
    setTimeout(() => {
        document.getElementById("editDate").value = currentDate;
    }, 100);
}




function createBlog() {
    // Generate current date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split('T')[0];

    const modalContent = `
        <form id="createBlogForm">
            <div class="mb-3">
                <label class="form-label">Department: </label>
                <input type="text" class="form-control" id="createDepartment" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Title: </label>
                <input type="text" class="form-control" id="createTitle" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Description: </label>
                <input type="text" class="form-control" id="createDesc" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Pictures (Optional): </label>
                <input type="file" class="form-control" id="createPictures" accept="image/*">
            </div>
            <div class="mb-3">
                <label class="form-label">Date Created: </label>
                <input type="text" class="form-control" id="createDate" value="${currentDate}" readonly>
            </div>
            <div class="mb-3">
                <label class="form-label">Author: </label>
                <input type="text" class="form-control" id="createAuthor" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Upload Blog (PDF only): </label>
                <input type="file" class="form-control" id="createBlogFile" accept=".pdf">
            </div>
        </form>
    `;

    function saveNewBlog() {
        const formData = new FormData();
        formData.append("department", document.getElementById("createDepartment").value);
        formData.append("title", document.getElementById("createTitle").value);
        formData.append("description", document.getElementById("createDesc").value);
        formData.append("date", document.getElementById("createDate").value);
        formData.append("author", document.getElementById("createAuthor").value);

        const fileInput = document.getElementById("createBlogFile");
        if (fileInput.files.length > 0) {
            formData.append("file_pdf", fileInput.files[0]);
        }

        const pictureInput = document.getElementById("createPictures");
        if (pictureInput.files.length > 0) {
            formData.append("pictures", pictureInput.files[0]);
        }

        fetch("/api/blogs", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                const createModal = bootstrap.Modal.getInstance(document.getElementById("blogModal"));
                if (createModal) createModal.hide();

                setTimeout(() => {
                    showModal(
                        "Success", 
                        "<p>Blog created successfully!</p>", 
                        "OK", 
                        () => fetchBlogs(), 
                        "btn-success"
                    );
                }, 500);
            } else {
                console.error("Failed to create blog:", data);
            }
        })
        .catch(error => console.error("Error creating blog:", error));
    }

    showModal("Create Blog", modalContent, "Create Blog", saveNewBlog, "btn-primary");
}
