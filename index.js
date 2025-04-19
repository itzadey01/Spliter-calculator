const billInput = document.getElementById("bill");
const peopleInput = document.getElementById("people");
const tipButtons = document.querySelectorAll("button");
const customTipInput = document.querySelector('input[placeholder="Custom"]');
const tipAmountDisplay = document.querySelectorAll("p.text-3xl")[0];
const totalDisplay = document.querySelectorAll("p.text-3xl")[1];
const resetButton = document.querySelector("button.mt-8");

let selectedTip = 0;

function calculate() {
    const bill = parseFloat(billInput.value);
    const people = parseInt(peopleInput.value);

    if (bill > 0 && people > 0) {
        const tipPerPerson = (bill * selectedTip) / 100 / people;
        const totalPerPerson = bill / people + tipPerPerson;

        tipAmountDisplay.textContent = "₦" + tipPerPerson.toFixed(2);
        totalDisplay.textContent = "₦" + totalPerPerson.toFixed(2);
        resetButton.disabled = false;
        resetButton.classList.remove("cursor-not-allowed", "bg-teal-500/20");
        resetButton.classList.add("bg-teal-500");
    }
    else{
        tipAmountDisplay.textContent = "₦0.00";
        totalDisplay.textContent = "₦0.00";
    }
}

tipButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
    if (btn.textContent.includes("%")) {
        selectedTip = parseInt(btn.textContent);
        customTipInput.value = "";
        calculate();
    }
    });
});

customTipInput.addEventListener("input", () => {
    selectedTip = parseFloat(customTipInput.value) || 0;
    calculate();
});

billInput.addEventListener("input", calculate);
peopleInput.addEventListener("input", calculate);

resetButton.addEventListener("click", () => {
    billInput.value = "0";
    peopleInput.value = "0";
    customTipInput.value = "";
    selectedTip = 0;
    tipAmountDisplay.textContent = "₦0.00";
    totalDisplay.textContent = "₦0.00";
    resetButton.disabled = true;
    resetButton.classList.add("cursor-not-allowed", "bg-teal-500/20");
    resetButton.classList.remove("bg-teal-500");
});