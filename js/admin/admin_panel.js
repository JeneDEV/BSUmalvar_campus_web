document.addEventListener("DOMContentLoaded", function () {
  const navItems = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll(".container > div");

  navItems.forEach(item => {
    item.addEventListener("click", function () {
      const sectionToShow = this.getAttribute("data-section");

      // Hide all sections
      sections.forEach(section => {
        if (!section.classList.contains("sidebar") && !section.classList.contains("header")) {
          section.style.display = "none";
        }
      });

      // Show the selected section
      document.querySelector(`.${sectionToShow}`).style.display = "block";

      // Remove active class from all items and add to the clicked one
      navItems.forEach(nav => nav.classList.remove("active"));
      this.classList.add("active");
    });
  });
});


document.getElementById("logoutBtn").addEventListener("click", () => {
  window.location.href = "/auth/logout";
});



