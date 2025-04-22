document.addEventListener("DOMContentLoaded", function () {
    const profileElem = document.querySelector('.profile-value');
    const departmentElem = document.querySelector('.departments-value');
    const curriculumElem = document.querySelector('.curriculum-value');
    const laboratoryElem = document.querySelector('.laboratory-value');

    function fetchDashboardData() {
        fetch('/api/dashboard')
            .then(response => response.json())
            .then(data => {
                profileElem.innerText = data.total_profile;
                departmentElem.innerText = data.total_departments;
                curriculumElem.innerText = data.total_curriculum;
                laboratoryElem.innerText = data.total_laboratory;
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Show "Loading..." while fetching
    profileElem.innerText = "Loading...";
    departmentElem.innerText = "Loading...";
    curriculumElem.innerText = "Loading...";
    laboratoryElem.innerText = "Loading...";

    // Fetch data immediately and every 10s
    fetchDashboardData();
    setInterval(fetchDashboardData, 0);
});
