document.addEventListener('DOMContentLoaded', () => {
    // Retrieve saved checkbox states from localStorage
    const savedCheckboxStates = JSON.parse(localStorage.getItem('checkboxStates'));

    if (savedCheckboxStates) {
        // Display the fluid rate in the starting rate box
        const startingRateBox = document.getElementById('startingRateBox');
        if (startingRateBox) {
            startingRateBox.innerText = savedCheckboxStates.fluidRate || 'No data available';
        }

        // Optional: Display the checkbox states if the elements exist
        const checkbox1Summary = document.getElementById('checkbox1Summary');
        const checkbox2Summary = document.getElementById('checkbox2Summary');
        const checkbox3Summary = document.getElementById('checkbox3Summary');
        const checkbox4Summary = document.getElementById('checkbox4Summary');

        if (checkbox1Summary) {
            checkbox1Summary.innerText = savedCheckboxStates.checkbox1 ? 'Checkbox 1: Checked' : 'Checkbox 1: Not Checked';
        }
        if (checkbox2Summary) {
            checkbox2Summary.innerText = savedCheckboxStates.checkbox2 ? 'Checkbox 2: Checked' : 'Checkbox 2: Not Checked';
        }
        if (checkbox3Summary) {
            checkbox3Summary.innerText = savedCheckboxStates.checkbox3 ? 'Checkbox 3: Checked' : 'Checkbox 3: Not Checked';
        }
        if (checkbox4Summary) {
            checkbox4Summary.innerText = savedCheckboxStates.checkbox4 ? 'Checkbox 4: Checked' : 'Checkbox 4: Not Checked';
        }
    } else {
        console.log('No checkbox states found in localStorage.');
    }
});
