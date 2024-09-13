document.addEventListener('DOMContentLoaded', function() {
    const charLengthSlider = document.querySelector('.char-length-slider');
    const charCountDisplay = document.querySelector('.char-count');
    const passwordDisplay = document.querySelector('.password-placeholder');
    const passwordDisplayHeader = document.querySelector('.password-display');
    const strengthRatingText = document.querySelector('.strength-rating-text');
    const strengthBars = document.querySelectorAll('.strength-rating-bars .bar');
    const copyBtn = document.querySelector('.copy-btn');
    const generateBtn = document.querySelector('.generate-btn');
    const visibilityToggleBtn = document.querySelector('.toggle-visibility');
    const avoidCharsInput = document.querySelector('#avoid-chars');
    
    // Checkboxes for including characters
    const includeUppercaseCheckbox = document.getElementById('uppercase');
    const includeLowercaseCheckbox = document.getElementById('lowercase');
    const includeNumbersCheckbox = document.getElementById('numbers');
    const includeSymbolsCheckbox = document.getElementById('symbols');
    const includeÑCheckbox = document.getElementById('include-ñ');
    const includeÇCheckbox = document.getElementById('include-ç');

    let isPasswordVisible = false;

    // Update character length display
    charLengthSlider.addEventListener('input', function() {
        charCountDisplay.textContent = charLengthSlider.value;
    });

    // Toggle password visibility
    visibilityToggleBtn.addEventListener('click', function() {
        isPasswordVisible = !isPasswordVisible;
        passwordDisplay.classList.toggle('visible', isPasswordVisible);
        visibilityToggleBtn.querySelector('i').classList.toggle('fa-eye', !isPasswordVisible);
        visibilityToggleBtn.querySelector('i').classList.toggle('fa-eye-slash', isPasswordVisible);
    });

    // Copy password to clipboard
    copyBtn.addEventListener('click', function() {
        navigator.clipboard.writeText(passwordDisplay.textContent).then(() => {
            copyBtn.classList.add('active');
            setTimeout(() => copyBtn.classList.remove('active'), 2000);
        });
    });

    // Generate a random password
    function generatePassword() {
        const length = parseInt(charLengthSlider.value, 10);
        const includeUppercase = includeUppercaseCheckbox.checked;
        const includeLowercase = includeLowercaseCheckbox.checked;
        const includeNumbers = includeNumbersCheckbox.checked;
        const includeSymbols = includeSymbolsCheckbox.checked;
        const includeÑ = includeÑCheckbox.checked;
        const includeÇ = includeÇCheckbox.checked;
        const avoidChars = avoidCharsInput.value.split('').join('');

        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const numberChars = '0123456789';
        const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>/?';
        const specialChars = (includeÑ ? 'ñÑ' : '') + (includeÇ ? 'çÇ' : '');

        let allChars = '';
        if (includeUppercase) allChars += uppercaseChars;
        if (includeLowercase) allChars += lowercaseChars;
        if (includeNumbers) allChars += numberChars;
        if (includeSymbols) allChars += symbolChars;
        if (specialChars) allChars += specialChars;

        if (avoidChars) {
            allChars = allChars.split('').filter(char => !avoidChars.includes(char)).join('');
        }

        if (allChars === '') return ''; // No characters selected

        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * allChars.length);
            password += allChars[randomIndex];
        }

        return password;
    }

    // Evaluate password strength
    function evaluateStrength(password) {
        const lengthCriteria = password.length >= 8;
        const upperCaseCriteria = /[A-Z]/.test(password);
        const lowerCaseCriteria = /[a-z]/.test(password);
        const numberCriteria = /\d/.test(password);
        const symbolCriteria = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

        let strength = 0;
        if (lengthCriteria) strength++;
        if (upperCaseCriteria) strength++;
        if (lowerCaseCriteria) strength++;
        if (numberCriteria) strength++;
        if (symbolCriteria) strength++;

        return strength;
    }

    // Update UI with generated password and strength
    function updateUI() {
        const password = generatePassword();
        passwordDisplay.textContent = password;

        // Apply newPassword styles
        passwordDisplay.classList.add('newPassword');

        const strength = evaluateStrength(password);
        strengthBars.forEach((bar, index) => {
            if (index < strength) {
                bar.style.backgroundColor = getStrengthColor(strength);
                bar.style.border = 'none'; // Remove border for filled bars
            } else {
                bar.style.backgroundColor = 'transparent'; // Empty bars
                bar.style.border = `2px solid var(--main-text-color)`; // White border for empty bars
            }
        });
        strengthRatingText.textContent = getStrengthText(strength);
    }

    function getStrengthColor(strength) {
        switch (strength) {
            case 0:
            case 1:
                return 'var(--security-very-weak)'; // Red
            case 2:
                return 'var(--security-weak)'; // Orange
            case 3:
                return 'var(--security-medium)'; // Yellow
            case 4:
                return 'var(--security-strong)'; // Green
            default:
                return 'var(--security-very-weak)'; // Default to red
        }
    }

    function getStrengthText(strength) {
        switch (strength) {
            case 0:
            case 1:
                return 'Very Weak';
            case 2:
                return 'Weak';
            case 3:
                return 'Medium';
            case 4:
                return 'Strong';
            default:
                return 'Very Weak';
        }
    }

    // Generate password on form submit
    generateBtn.addEventListener('click', function(event) {
        event.preventDefault();
        updateUI();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.char-length-slider');
    
    const updateSlider = () => {
        const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
        slider.style.background = `linear-gradient(to right, var(--contrast-color) ${value}%, var(--third-dark-color) ${value}%)`;
    };

    slider.addEventListener('input', updateSlider);
    updateSlider(); // Set initial state
});
