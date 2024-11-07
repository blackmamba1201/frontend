document.addEventListener("DOMContentLoaded", function() {
    const calculateButton = document.getElementById("calculate-button");
    const mortgageAmountInput = document.getElementById("mortgage-amount");
    const mortgageTermInput = document.getElementById("mortgage-term");
    const interestRateInput = document.getElementById("interest-rate");
    const repaymentTypeInput = document.getElementsByName("mortgage-type");

    const monthlyRepaymentDisplay = document.getElementById("monthly-repayment");
    const totalRepaymentDisplay = document.getElementById("total-repayment");

    calculateButton.addEventListener("click", function() {
        const mortgageAmount = parseFloat(mortgageAmountInput.value.replace(/,/g, '')); // remove commas if present
        const mortgageTerm = parseInt(mortgageTermInput.value);
        const interestRate = parseFloat(interestRateInput.value) / 100;
        const isRepayment = repaymentTypeInput[0].checked; // 'Repayment' type is checked

        // Validate the inputs
        if (isNaN(mortgageAmount) || isNaN(mortgageTerm) || isNaN(interestRate) || mortgageAmount <= 0 || mortgageTerm <= 0 || interestRate <= 0) {
            alert("Please enter valid values for all fields.");
            return;
        }

        let monthlyRepayment, totalRepayment;

        if (isRepayment) {
            // Repayment mortgage calculation
            const monthlyRate = interestRate / 12;
            const numberOfPayments = mortgageTerm * 12;

            if (numberOfPayments <= 0) {
                alert("Term must be greater than 0 years.");
                return;
            }

            monthlyRepayment = (mortgageAmount * monthlyRate) / 
                (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
            totalRepayment = monthlyRepayment * numberOfPayments;
        } else {
            // Interest-only mortgage calculation
            const numberOfPayments = mortgageTerm * 12;

            if (numberOfPayments <= 0) {
                alert("Term must be greater than 0 years.");
                return;
            }

            monthlyRepayment = (mortgageAmount * interestRate) / 12;
            totalRepayment = monthlyRepayment * 12 * mortgageTerm;
        }

        // Format the output as currency
        monthlyRepaymentDisplay.textContent = `£${monthlyRepayment.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
        totalRepaymentDisplay.innerHTML = `Total you'll repay over the term<br>£${totalRepayment.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    });
});
