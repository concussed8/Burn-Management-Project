// Close the disclaimer popup when the "CLOSE" button is clicked
document.getElementById('closeStartupBtn').addEventListener('click', function () {
    document.getElementById('startupOverlay').style.display = 'none';
});

// Show or hide the numpad based on checkbox3
document.getElementById('checkbox3').addEventListener('change', function () {
    const numpad = document.getElementById('numpad');
    const weightInput = document.querySelector('.weight-input');

    if (this.checked) {
        numpad.style.display = 'grid';
        weightInput.focus();
    } else {
        numpad.style.display = 'none';
    }
});

// Functions for numpad operations
function showNumpad() {
    document.getElementById('numpad').style.display = 'grid';
}

function closeNumpad() {
    document.getElementById('numpad').style.display = 'none';
}

function appendNumber(num) {
    const inputBox = document.querySelector('.weight-input');
    inputBox.value += num;
}

function clearInput() {
    const inputBox = document.querySelector('.weight-input');
    inputBox.value = '';
}

// Validate mandatory fields, save data, and redirect based on age and weight
function validateMandatoryFields(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const checkbox1 = document.getElementById('checkbox1');
    const checkbox2 = document.getElementById('checkbox2');
    const checkbox3 = document.getElementById('checkbox3');
    const checkbox4 = document.getElementById('checkbox4');
    const weightInput = document.querySelector('.weight-input').value;
    const age = parseInt(localStorage.getItem('age'), 10); // Retrieve age from localStorage

    // Debugging logs
    console.log({
        checkbox1Checked: checkbox1?.checked,
        checkbox2Checked: checkbox2?.checked,
        checkbox3Checked: checkbox3?.checked,
        checkbox4Checked: checkbox4?.checked,
        weightInput,
        age,
    });

    if (!checkbox1?.checked || !checkbox2?.checked || !checkbox3?.checked || !checkbox4?.checked) {
        alert('Please ensure all mandatory fields are completed.');
        return;
    }

    if (isNaN(age) || age < 2 || age > 15) {
        alert('Please enter a valid age between 2 and 15.');
        return;
    }

    // Save checkbox states and fluid rate to localStorage
    const checkboxStates = {
        checkbox1: checkbox1.checked,
        checkbox2: checkbox2.checked,
        checkbox3: checkbox3.checked,
        checkbox4: checkbox4.checked,
        fluidRate: age >= 2 && age <= 5 ? "125 mls/hr" : "250 mls/hr"
    };
    localStorage.setItem('checkboxStates', JSON.stringify(checkboxStates));

    // Redirect based on age
    let redirectPath = '';
    if (age === 2 || age === 3) {
        redirectPath = `https://concussed8.github.io/Burn-Management-Project/page/peds_infant_thermal_tbsa_and_resus.html?weight=${encodeURIComponent(weightInput)}&ts=${Date.now()}`;
    } else if (age >= 4 && age <= 15) {
        redirectPath = `https://concussed8.github.io/Burn-Management-Project/page/peds_child_thermal_tbsa_and_resus.html?weight=${encodeURIComponent(weightInput)}&ts=${Date.now()}`;
    }

    if (redirectPath) {
        console.log("Redirecting to:", redirectPath); // Debugging log
        window.location.href = redirectPath; // Redirect to the appropriate page
    }
}

// Attach event listener to the Continue button
window.addEventListener('load', function () {
    console.log("Initial management thermal page script loaded!");

    const continueBtn = document.getElementById('continueBtn');
    if (continueBtn) {
        continueBtn.addEventListener('click', validateMandatoryFields);
    } else {
        console.error("Continue button not found!");
    }

    // Display saved age (if available)
    const age = localStorage.getItem('age');
    if (age) {
        const ageDisplay = document.getElementById('ageInput');
        if (ageDisplay) {
            ageDisplay.value = age; // Populate the age input with the saved age
        }
    }
});
