document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/blogs')
      .then(response => response.json())
      .then(data => {
        const nav = document.querySelector('.nav-scroller nav');
        nav.innerHTML = ''; // Clear existing links
  
        data.forEach(department => {
          const link = document.createElement('a');
          link.className = 'nav-item nav-link link-body-emphasis';
          link.href = '#';
          link.textContent = department.department; // adjust if your API returns different key
          nav.appendChild(link);
        });
      })
      .catch(error => console.error('Error fetching departments:', error));
  });
  