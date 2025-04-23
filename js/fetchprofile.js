let allProfiles = [];
let selectedDepartment = "";
let currentCategory = "All";

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("tabsContainer").style.display = "none";
  const dropdownButton = document.getElementById("dropdownButton");
  const departmentDropdown = document.getElementById("departmentDropdown");

  // Fetch and populate departments (deduplicated)
  await populateDepartments();

  // Attach event listener after dropdown is populated
  departmentDropdown.addEventListener("click", async function (e) {
    if (e.target.classList.contains("dropdown-item")) {
      e.preventDefault();
      const fullText = e.target.textContent.trim();
      selectedDepartment = extractAcronym(fullText); // get acronym from (CICS)

      updateDropdownButtonText(dropdownButton, fullText);
      await fetchProfiles();
      document.getElementById("tabsContainer").style.display = "block";
      filterProfiles("All");
    }
  });
});

// Extract acronym inside the parenthesis
function extractAcronym(departmentName) {
  const match = departmentName.match(/\(([^)]+)\)/);
  return match ? match[1] : departmentName;
}

// Populate departments dropdown
async function populateDepartments() {
  try {
    const res = await fetch("http://localhost:3000/api/departments");
    const data = await res.json();

    const uniqueNames = new Set();
    const dropdown = document.getElementById("departmentDropdown");
    dropdown.innerHTML = "";

    data.forEach(dept => {
      const name = dept.name;
      if (!uniqueNames.has(name)) {
        uniqueNames.add(name);
        const item = document.createElement("a");
        item.href = "#";
        item.className = "dropdown-item";
        item.dataset.department = name;
        item.textContent = name;
        dropdown.appendChild(item);
      }
    });
  } catch (err) {
    console.error("Error loading departments:", err);
  }
}

function updateDropdownButtonText(button, departmentName) {
  if (button) {
    button.textContent = departmentName;
  } else {
    console.error("Dropdown button not found!");
  }
}

async function fetchProfiles() {
  try {
    const res = await fetch("/api/profile");
    const data = await res.json();
    allProfiles = data;
  } catch (err) {
    console.error("Error fetching profiles:", err);
  }
}

function filterProfiles(category) {
  currentCategory = category;

  const filtered = allProfiles.filter(profile => {
    const matchDept = profile.department === selectedDepartment;

    // Handle categories with multiple comma-separated values
    const categories = profile.category.split(',').map(c => c.trim());
    const matchCat = category === "All" || categories.includes(category);

    return matchDept && matchCat;
  });

  renderProfiles(filtered);
}


function renderProfiles(profiles) {
  
  const container = document.getElementById("profilesContainer");
  container.innerHTML = "";

  if (profiles.length === 0) {
    container.innerHTML = "<p>No profiles found.</p>";
    return;
  }


  
  profiles.forEach(profile => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";
    card.style.maxWidth = "30%";
  
    card.innerHTML = `
      <div class="member-card" data-category="${profile.category}" style="width: 98%; cursor: pointer;"> 
        <img src="/public/uploads/${profile.image}" alt="${profile.name}" class="member-photo" style="width: 110px; height: 110px;">
        <div class="member-info">
          <p class="member-name">${profile.name}</p>
          <p class="member-role">${profile.position}</p>
          <p style="margin:0;">${profile.department}</p>
        </div>  
      </div>
    `;
  
    // 👇 Add click event to show modal
    card.addEventListener("click", () => {
      document.getElementById("modalImage").src = `/public/uploads/${profile.image}`;
      document.getElementById("modalName").textContent = profile.name;
      document.getElementById("modalRole").textContent = profile.position;
      document.getElementById("modalDept").textContent = profile.department;
      document.getElementById("modalDesc").textContent = profile.description;
      document.getElementById("modalCategory").textContent = profile.category;
  
      // Show the modal (Bootstrap 5)
      const modal = new bootstrap.Modal(document.getElementById("profileModal"));
      modal.show();
    });
  
    container.appendChild(card);
  });
}  
