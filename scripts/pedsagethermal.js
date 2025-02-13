function validateAgeAndRedirect(event) {
    // Prevent default form submission or unwanted behavior
    event.preventDefault();

    const ageInput = document.getElementById('ageInput');
    if (!ageInput) {
        console.error("Age input field not found!");
        return;
    }

    const age = parseInt(ageInput.value, 10); // Parse the age input as an integer

    if (isNaN(age) || age < 0 || age > 15) {
        // Show alert if the input is invalid or out of the allowed range
        alert('Please enter a valid age between 0 and 15.');
        return;
    }

    // Store the age in localStorage
    localStorage.setItem('age', age);
    console.log(`Age ${age} saved to localStorage.`);

    // Redirect based on the age range
    let redirectPath = '';
    if (age < 2) {
        console.log("Redirecting to peds_0_2_initial_management_thermal.html...");
        redirectPath = `https://concussed8.github.io/Burn-Management-Project/page/peds_0_2_initial_management_thermal.html?ts=${Date.now()}`;
    } else if (age >= 2 && age <= 5) {
        console.log("Redirecting to peds_2_5_initial_management_thermal.html...");
        redirectPath = `https://concussed8.github.io/Burn-Management-Project/page/peds_2_5_initial_management_thermal.html?ts=${Date.now()}`;
    } else if (age >= 6 && age <= 15) {
        console.log("Redirecting to peds_6_16_initial_management_thermal.html...");
        redirectPath = `https://concussed8.github.io/Burn-Management-Project/page/peds_6_15_initial_management_thermal.html?ts=${Date.now()}`;
    }

    // Redirect to the appropriate page
    if (redirectPath) {
        window.location.href = redirectPath;
    }
}

// Attach event listener to the "Continue" button
window.addEventListener('load', function () {
    console.log("Age-based redirection script loaded!");
    const continueBtn = document.getElementById('continueBtn');
    if (continueBtn) {
        console.log("Continue button found. Adding event listener.");
        continueBtn.addEventListener('click', validateAgeAndRedirect);
    } else {
        console.error("Continue button not found!");
    }
});
