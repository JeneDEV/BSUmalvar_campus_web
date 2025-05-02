document.addEventListener("DOMContentLoaded", function () {
    const returnBtn = document.getElementById("return-btn");
    const nextBtn = document.getElementById("next-btn");
    const roomLaboratoriesDiv = document.getElementById("room-laboratories");
    const curriculumsDiv = document.getElementById("curriculums");
    const researchDiv = document.getElementById("research");
    const researchSection = document.getElementById("research-section");
    const labCardsSection = document.querySelector('.album.bg-body-tertiary'); // labs card container
    const curriculumCardsSection = document.querySelector('.album.bg-light');   // curriculum card container

    let isInCurriculums = false;
    let isInResearch = false;

    nextBtn.addEventListener("click", function (event) {
        event.preventDefault();

        // Hide Room Laboratories and its data
        roomLaboratoriesDiv.classList.add("d-none");
        labCardsSection.classList.add("d-none");

        // Show Curriculums section and its data
        curriculumsDiv.classList.remove("d-none");
        curriculumCardsSection.classList.remove("d-none");

        // Show Research section and its data
        researchDiv.classList.remove("d-none");
        researchSection.classList.remove("d-none");

        returnBtn.textContent = "← Back";
        isInCurriculums = true;
        isInResearch = true; // Set this flag when showing Research section
    });

    returnBtn.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default action for consistency
        
        if (isInCurriculums || isInResearch) {
            // Show Room Laboratories and its data
            roomLaboratoriesDiv.classList.remove("d-none");
            labCardsSection.classList.remove("d-none");

            // Hide Curriculums and its data
            curriculumsDiv.classList.add("d-none");
            curriculumCardsSection.classList.add("d-none");

            // Hide Research and its data
            researchDiv.classList.add("d-none");
            researchSection.classList.add("d-none");

            returnBtn.textContent = "← Back";
            isInCurriculums = false;
            isInResearch = false;
        }
    });
});