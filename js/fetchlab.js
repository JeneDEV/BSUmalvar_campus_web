document.addEventListener("DOMContentLoaded", () => {
    fetch('/api/departments')
      .then(response => response.json())
      .then(data => {
        const container = document.querySelector('.col-lg-6.col-md-8.mx-auto');
  
        const div = document.createElement('div');
        div.className = 'mt-4';
  
        const select = document.createElement('select');
        select.id = 'departmentDropdown';
        select.className = 'form-select w-auto mx-auto';
  
        const defaultOption = document.createElement('option');
        defaultOption.selected = true;
        defaultOption.disabled = true;
        defaultOption.textContent = 'Choose Department';
        select.appendChild(defaultOption);
  
        const uniqueDepartments = [...new Set(data.map(dep => dep.name))];
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
          fetchLabs(selected);
        });
      });
  
    function fetchLabs(selectedDepartment) {
      fetch('/api/laboratory')
        .then(response => response.json())
        .then(labs => {
          const labContainer = document.querySelector('.album .container .row');
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
  });
  


  document.addEventListener("DOMContentLoaded", function () {
    const returnBtn = document.getElementById("return-btn");
    const nextBtn = document.getElementById("next-btn");
    const roomLaboratoriesDiv = document.getElementById("room-laboratories");
    const curriculumsDiv = document.getElementById("curriculums");
    const labCardsSection = document.querySelector('.album.bg-body-tertiary'); // labs card container
    const curriculumCardsSection = document.querySelector('.album.bg-light');   // curriculum card container

    let isInCurriculums = false;

    nextBtn.addEventListener("click", function (event) {
        event.preventDefault();

        // Hide Room Laboratories and its data
        roomLaboratoriesDiv.classList.add("d-none");
        labCardsSection.classList.add("d-none");

        // Show Curriculums section and its data
        curriculumsDiv.classList.remove("d-none");
        curriculumCardsSection.classList.remove("d-none");

        returnBtn.textContent = "← Back";
        isInCurriculums = true;
    });

    returnBtn.addEventListener("click", function (event) {
        if (isInCurriculums) {
            // Show Room Laboratories and its data
            roomLaboratoriesDiv.classList.remove("d-none");
            labCardsSection.classList.remove("d-none");

            // Hide Curriculums and its data
            curriculumsDiv.classList.add("d-none");
            curriculumCardsSection.classList.add("d-none");

            returnBtn.textContent = "← Back";
            isInCurriculums = false;
        }
    });
});
