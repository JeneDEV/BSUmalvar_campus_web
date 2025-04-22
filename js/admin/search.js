document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            let query = searchInput.value.toLowerCase();
            filterTables(query);
        });
    }
});

function filterTables(query) {
    const tables = document.querySelectorAll(".data-table tbody");
    tables.forEach(tbody => {
        let rows = tbody.querySelectorAll("tr");
        rows.forEach(row => {
            let textContent = row.textContent.toLowerCase();
            if (textContent.includes(query)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });
}


