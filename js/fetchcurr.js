document.addEventListener("DOMContentLoaded", () => {
  fetch('/api/departments')
    .then(response => response.json())
    .then(data => {
      // Target the curriculum header section (where dropdown should appear)
      const container = document.querySelector('#curriculums .col-lg-6.col-md-8.mx-auto');

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
        fetchCurr(selected);
      });
    });

  function fetchCurr(selectedDepartment) {
    // Correct selector for the curriculum table body
    const tbody = document.querySelector('#curriculum-section table tbody');
    tbody.innerHTML = '';  // Clear existing rows

    fetch('/api/curriculums')
      .then(response => response.json())
      .then(curr => {
        const filtered = curr.filter(item => selectedDepartment.includes(item.department));

        if (filtered.length === 0) {
          const row = document.createElement('tr');
          row.innerHTML = `<td colspan="3">No Curriculum found for this department.</td>`;
          tbody.appendChild(row);
          return;
        }

        filtered.forEach(curr => {
          const row = document.createElement('tr');

          row.innerHTML = `
            <td>
              <a href="/public/uploads/${curr.curriculum}" target="_blank" class="text-decoration-none">
                <i class="bi bi-file-earmark-pdf" style="font-size: 24px; color: red;"></i> ${curr.curriculum}
              </a>
            </td>
            <td>${curr.department}</td>
            <td>${curr.date_upload}</td>
          `;

          tbody.appendChild(row);
        });
      })
      .catch(err => console.error('Error loading curr:', err));
  }
});
