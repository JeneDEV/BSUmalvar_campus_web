/**
 * Combined JavaScript for Labs, Curriculum, Research and Navigation
 */
document.addEventListener("DOMContentLoaded", function() {
  // --------------------------------
  // DOM Element References
  // --------------------------------
  const returnBtn = document.getElementById("return-btn");
  const nextBtn = document.getElementById("next-btn");
  
  // Main section containers
  const roomLaboratoriesDiv = document.getElementById("room-laboratories");
  const curriculumsDiv = document.getElementById("curriculums");
  const researchDiv = document.getElementById("research");
  
  // Content section containers
  const labCardsSection = document.querySelector('.album.bg-body-tertiary'); 
  const curriculumSection = document.getElementById("curriculum-section");
  const researchSection = document.getElementById("research-section");
  
  // State tracking
  let currentSection = "laboratories"; // Can be "laboratories", "curriculum", or "research"

  // --------------------------------
  // Navigation Functionality
  // --------------------------------
  
  // Next button functionality
  nextBtn.addEventListener("click", function(event) {
    event.preventDefault();

    if (currentSection === "laboratories") {
      // Hide Laboratories and show Curriculum
      roomLaboratoriesDiv.classList.add("d-none");
      labCardsSection.classList.add("d-none");
      
      curriculumsDiv.classList.remove("d-none");
      curriculumSection.classList.remove("d-none");
      
      researchDiv.classList.add("d-none");
      researchSection.classList.add("d-none");
      
      currentSection = "curriculum";
      nextBtn.textContent = "Next →";
      returnBtn.textContent = "← Back";
    } 
    else if (currentSection === "curriculum") {
      // Hide Curriculum and show Research
      curriculumsDiv.classList.add("d-none");
      curriculumSection.classList.add("d-none");
      
      researchDiv.classList.remove("d-none");
      researchSection.classList.remove("d-none");
      
      currentSection = "research";
      nextBtn.textContent = "Finish";
    }
    else if (currentSection === "research") {
      // If on the last section, return to laboratories
      researchDiv.classList.add("d-none");
      researchSection.classList.add("d-none");
      
      roomLaboratoriesDiv.classList.remove("d-none");
      labCardsSection.classList.remove("d-none");
      
      currentSection = "laboratories";
      nextBtn.textContent = "Next →";
    }
  });

  // Back button functionality
  returnBtn.addEventListener("click", function(event) {
    event.preventDefault();
    
    if (currentSection === "curriculum") {
      // Hide Curriculum and show Laboratories
      curriculumsDiv.classList.add("d-none");
      curriculumSection.classList.add("d-none");
      
      roomLaboratoriesDiv.classList.remove("d-none");
      labCardsSection.classList.remove("d-none");
      
      researchDiv.classList.add("d-none");
      researchSection.classList.add("d-none");
      
      currentSection = "laboratories";
      returnBtn.textContent = "← Back";
    } 
    else if (currentSection === "research") {
      // Hide Research and show Curriculum
      researchDiv.classList.add("d-none");
      researchSection.classList.add("d-none");
      
      curriculumsDiv.classList.remove("d-none");
      curriculumSection.classList.remove("d-none");
      
      currentSection = "curriculum";
      nextBtn.textContent = "Next →";
    }
  });

  // --------------------------------
  // Department Data Loading
  // --------------------------------
  loadDepartments();

  function loadDepartments() {
    fetch('/api/departments')
      .then(response => response.json())
      .then(data => {
        // Create department dropdown for laboratories section
        createDepartmentDropdown(
          data, 
          '#room-laboratories .col-lg-6.col-md-8.mx-auto', 
          'labDepartmentDropdown',
          fetchLabs
        );
        
        // Create department dropdown for curriculum section
        createDepartmentDropdown(
          data, 
          '#curriculums .col-lg-6.col-md-8.mx-auto', 
          'curriculumDepartmentDropdown',
          fetchCurriculum
        );
        
        // Create department dropdown for research section
        createDepartmentDropdown(
          data, 
          '#research .col-lg-6.col-md-8.mx-auto', 
          'researchDepartmentDropdown',
          fetchResearch
        );
      })
      .catch(err => console.error('Error loading departments:', err));
  }

  
  function createDepartmentDropdown(departments, containerSelector, dropdownId, changeHandler) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    const div = document.createElement('div');
    div.className = 'mt-4';

    const select = document.createElement('select');
    select.id = dropdownId;
    select.className = 'form-select w-auto mx-auto';

    const defaultOption = document.createElement('option');
    defaultOption.selected = true;
    defaultOption.disabled = true;
    defaultOption.textContent = 'Choose Department';
    select.appendChild(defaultOption);

    const uniqueDepartments = [...new Set(departments.map(dep => dep.name))];
    uniqueDepartments.forEach(name => {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      select.appendChild(option);
    });

    div.appendChild(select);
    container.appendChild(div);

    select.addEventListener('change', () => {
      const selected = select.value;
      changeHandler(selected);
    });
  }

  // --------------------------------
  // Laboratories Functionality
  // --------------------------------
  function fetchLabs(selectedDepartment) {
    fetch('/api/laboratory')
      .then(response => response.json())
      .then(labs => {
        const labContainer = document.querySelector('.album.bg-body-tertiary .container .row');
        if (!labContainer) return;
        
        labContainer.innerHTML = '';

        const filtered = labs.filter(lab => selectedDepartment.includes(lab.department));

        if (filtered.length === 0) {
          const noLabMsg = document.createElement('div');
          noLabMsg.className = 'col';
          noLabMsg.innerHTML = `
            <div class="card shadow-sm">
              <div class="card-body">
                <p class="card-text">No laboratories found for this department.</p>
              </div>
            </div>
          `;
          labContainer.appendChild(noLabMsg);
          return;
        }

        filtered.forEach(lab => {
          const col = document.createElement('div');
          col.className = 'col';

          col.innerHTML = `
            <div class="card shadow-sm">
              <img src="uploads/${lab.laboratory_image}" class="card-img-top" height="225" style="object-fit: cover;" alt="${lab.department}">
              <div class="card-body">
                <p class="card-text"><strong>${lab.room_name}</strong></p>  
                <p class="card-text">${lab.description}</p>
              </div>
            </div>
          `;
          labContainer.appendChild(col);
        });
      })
      .catch(err => console.error('Error loading labs:', err));
  }

  // --------------------------------
  // Curriculum Functionality
  // --------------------------------
  function fetchCurriculum(selectedDepartment) {
    const tbody = document.querySelector('#curriculum-section table tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';  // Clear existing rows

    fetch('/api/curriculum')
      .then(response => response.json())
      .then(curricula => {
        const filtered = curricula.filter(item => selectedDepartment.includes(item.department));

        if (filtered.length === 0) {
          const row = document.createElement('tr');
          row.innerHTML = `<td colspan="3">No curriculum found for this department.</td>`;
          tbody.appendChild(row);
          return;
        }

        filtered.forEach(curriculum => {
          const row = document.createElement('tr');

          row.innerHTML = `
            <td>
              <a href="/public/uploads/${curriculum.curriculum}" target="_blank" class="text-decoration-none">
                <i class="bi bi-file-earmark-pdf" style="font-size: 24px; color: red;"></i> ${curriculum.curriculum}
              </a>
            </td>
            <td>${curriculum.department}</td>
            <td>${curriculum.date_upload}</td>
          `;

          tbody.appendChild(row);
        });
      })
      .catch(err => console.error('Error loading curriculum data:', err));
  }

  // --------------------------------
  // Research Functionality (using blogs data)
  // --------------------------------
  function fetchResearch(selectedDepartment) {
    const researchContainer = document.querySelector('#research-section');
    if (!researchContainer) return;
    
    // Clear existing content
    researchContainer.innerHTML = '';
    
    // Create a container for research items
    const researchItemsContainer = document.createElement('div');
    researchItemsContainer.className = 'container mt-4';
    
    fetch('/api/blogs')
      .then(response => response.json())
      .then(blogItems => {
        const filtered = blogItems.filter(item => selectedDepartment.includes(item.department));

        if (filtered.length === 0) {
          const noResearchMsg = document.createElement('div');
          noResearchMsg.className = 'alert alert-info';
          noResearchMsg.textContent = 'No research articles found for this department.';
          researchItemsContainer.appendChild(noResearchMsg);
        } else {
          // Create card row
          const row = document.createElement('div');
          row.className = 'row row-cols-1 row-cols-md-2 g-4';
          
          filtered.forEach(blog => {
            const col = document.createElement('div');
            col.className = 'col';
            
            col.innerHTML = `
              <div class="card h-100">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="/public/uploads/${blog.pictures}" class="img-fluid rounded-start h-100" 
                         style="object-fit: cover;" alt="${blog.title}">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${blog.title}</h5>
                      <p class="card-text">${blog.description}</p>
                      <p class="card-text">
                        <small class="text-muted">
                          <strong>Department:</strong> ${blog.department}<br>
                          <strong>Author:</strong> ${blog.author}<br>
                          <strong>Date:</strong> ${blog.date}
                        </small>
                      </p>
                      ${blog.file_pdf ? 
                        `<a href="/public/uploads/${blog.file_pdf}" target="_blank" class="btn btn-sm btn-outline-danger">
                          <i class="bi bi-file-earmark-pdf"></i> View PDF
                        </a>` : 
                        '<span class="badge bg-secondary">No PDF available</span>'}
                    </div>
                  </div>
                </div>
              </div>
            `;
            
            row.appendChild(col);
          });
          
          researchItemsContainer.appendChild(row);
        }
        
        researchSection.appendChild(researchItemsContainer);
      })
      .catch(err => {
        console.error('Error loading blog data:', err);
        const errorMsg = document.createElement('div');
        errorMsg.className = 'alert alert-danger';
        errorMsg.textContent = 'Error loading research data. Please try again later.';
        researchItemsContainer.appendChild(errorMsg);
      });
  }

  // Initialize the UI (make sure only laboratories are shown at start)
  function initializeUI() {
    // Show only laboratories section initially
    roomLaboratoriesDiv.classList.remove("d-none");
    labCardsSection.classList.remove("d-none");
    
    curriculumsDiv.classList.add("d-none");
    curriculumSection.classList.add("d-none");
    
    researchDiv.classList.add("d-none");
    researchSection.classList.add("d-none");
  }
  
  // Call initialization
  initializeUI();
});