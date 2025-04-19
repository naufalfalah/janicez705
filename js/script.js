// Variables
let currentStep = 1;
const totalSteps = 6;

// Elements
const progressFill = document.getElementById('progress-fill');
const progressPercentage = document.getElementById('progress-percentage');
const stepItems = document.querySelectorAll('.step-item');
const formSections = document.querySelectorAll('.form-section');

// Update progress
function updateProgress() {
    const percent = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progressFill.style.width = `${percent}%`;
    progressPercentage.textContent = `${Math.round(percent)}%`;
    
    // Update step items
    stepItems.forEach((item, index) => {
        const step = index + 1;
        item.classList.remove('active', 'completed');
        
        if (step === currentStep) {
            item.classList.add('active');
        } else if (step < currentStep) {
            item.classList.add('completed');
        }
    });
    
    // Show current section
    formSections.forEach((section, index) => {
        section.classList.remove('active');
        if (index + 1 === currentStep) {
            section.classList.add('active');
        }
    });
}

// Next step
function nextStep() {
    if (currentStep < totalSteps) {
        currentStep++;
        updateProgress();
    }
}

// Previous step
function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateProgress();
    }
}

// Go to specific step
function goToStep(step) {
    if (step >= 1 && step <= totalSteps) {
        currentStep = step;
        updateProgress();
    }
}

function startOver() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="radio"]');
    inputs.forEach(input => {
        if (input.type === 'text' || input.type === 'email' || input.type === 'tel') {
            input.value = '';
        } else if (input.type === 'radio') {
            input.checked = false;
        }
    });

    const radioLabels = document.querySelectorAll('.radio-label');
    radioLabels.forEach(label => {
        label.classList.remove('selected');
    });

    $('.result').removeClass('active');
    goToStep(1);
}

// Select card
function selectCard(card, group) {
    // Deselect all cards in same group
    const cards = document.querySelectorAll(`.option-card[onclick*="${group}"]`);
    cards.forEach(c => c.classList.remove('selected'));
    
    // Select clicked card
    card.classList.add('selected');
}

// Clear radio buttons
function clearRadios(name) {
    const radios = document.querySelectorAll(`input[name="${name}"]`);
    radios.forEach(radio => {
        radio.checked = false;
    });
}

// Initialize
updateProgress();

// create using jquery to create validation input[name="Yourself"] & input[name="citizenship"] (radio button) should be selected to remove disabled from btn-next with data-step=2 
$(document).ready(function() {
    $('.radio-label').on('click', function() {
        const radioGroup = this.closest('.radio-group');
        
        // Deselect all options in the group
        radioGroup.querySelectorAll('.radio-label').forEach(option => {
            option.classList.remove('selected');
        });
        
        // Add 'selected' class to clicked option
        this.classList.add('selected');

        let radio = this.querySelector('input[type="radio"]');
        radio.dispatchEvent(new Event('change'));
    });

    // if next btn-next clicked
    $('.btn-next').on('click', function() {
        const step = $(this).data('step');
        let isValid = true;
        
        if (step === 2) {
            const isYourselfChecked = $('input[name="yourself"]:checked').length > 0;
            if (!isYourselfChecked) {
                $('#yourself-error').text('Please select an option.');
                isValid = false;
            }

            const isCitizenshipChecked = $('input[name="citizenship"]:checked').length > 0;
            if (!isCitizenshipChecked) {
                $('#citizenship-error').text('Please select an option.');
                isValid = false;
            }
        }

        if (step === 3) {
            const isAgeChecked = $('input[name="age"]:checked').length > 0;
            if (!isAgeChecked) {
                $('#age-error').text('Please select an option.');
                isValid = false;
            }

            const isMonthlyHouseholdChecked = $('input[name="monthly_household"]:checked').length > 0;
            if (!isMonthlyHouseholdChecked) {
                $('#monthly-household-error').text('Please select an option.');
                isValid = false;
            }
        }

        if (step === 4) {
            const isOwnershipStatusChecked = $('input[name="ownership_status"]:checked').length > 0;
            if (!isOwnershipStatusChecked) {
                $('#ownership-status-error').text('Please select an option.');
                isValid = false;
            }

            const isPropertyOwnershipChecked = $('input[name="property_ownership"]:checked').length > 0;
            if (!isPropertyOwnershipChecked) {
                $('#property-ownership-error').text('Please select an option.');
                isValid = false;
            }
        }

        if (step === 5) {
            const isFirstTimeChecked = $('input[name="first_time"]:checked').length > 0;
            if (!isFirstTimeChecked) {
                $('#first-time-error').text('Please select an option.');
                isValid = false;
            }
        }
        
        if (!isValid) {
            return;
        }

        nextStep();
    });

    // Step 2
    $('input[name="yourself"]').change(function() {
        const isYourselfChecked = $('input[name="yourself"]:checked').length > 0;
        
        if (isYourselfChecked) {
            $('#yourself-error').text('');
            return;
        }
    });

    $('input[name="citizenship"]').change(function() {
        const isCitizenshipChecked = $('input[name="citizenship"]:checked').length > 0;
        
        if (isCitizenshipChecked) {
            $('#citizenship-error').text('');
            return;
        }
    });

    // Step 3
    $('input[name="age"]').change(function() {
        const isAgeChecked = $('input[name="age"]:checked').length > 0;
        
        if (isAgeChecked) {
            $('#age-error').text('');
            return;
        }
    });

    $('input[name="monthly_household"]').change(function() {
        const isMonthlyHouseholdChecked = $('input[name="monthly_household"]:checked').length > 0;
        
        if (isMonthlyHouseholdChecked) {
            $('#monthly-household-error').text('');
            return;
        }
    });

    // Step 4
    $('input[name="ownership_status"]').change(function() {
        const isOwnershipStatusChecked = $('input[name="ownership_status"]:checked').length > 0;
        
        if (isOwnershipStatusChecked) {
            $('#ownership-status-error').text('');
            return;
        }
    });

    $('input[name="property_ownership"]').change(function() {
        const isPropertyOwnershipChecked = $('input[name="property_ownership"]:checked').length > 0;
        
        if (isPropertyOwnershipChecked) {
            $('#property-ownership-error').text('');
            return;
        }
    });

    // Step 5
    $('input[name="first_time"]').change(function() {
        const isFirstTimeChecked = $('input[name="first_time"]:checked').length > 0;
        
        if (isFirstTimeChecked) {
            $('#first-time-error').text('');
            return;
        }
    });

    $('input[name="phone_number"]').on('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    // how to run ajax when click submit button
    $('#submit-form').on('submit', function(event) {
        event.preventDefault();

        // Validate form fields
        if (!formValidation()) {
            return;
        }
        
        const formData = $(this).serialize();
        
        $('#loading-indicator').show();
        $('.btn-next').prop('disabled', true);

        $.ajax({
            url: 'submit.php',
            type: 'POST',
            data: formData,
            dataType: 'json',
            success: function(response) {
                console.log(response);

                $('#loading-indicator').hide();
                $('.btn-next').prop('disabled', false);
                
                $(`#${response.data.result}`).addClass('active');
                $('.action-btn').attr("href", response.data.listing);
                nextStep();
            },
            error: function(xhr, status, error) {
                console.error('AJAX Error:', status, error);

                $('#loading-indicator').hide();
                $('.btn-next').prop('disabled', false);
                
                alert('Something went wrong. Please try again.');
            }
        });
    });
});

function formValidation() {
    let invalidFields = false;
    $('.error-message').text('');
    
    // Validate first time
    const isFirstTimeChecked = $('input[name="first_time"]:checked').length > 0;
    if (!isFirstTimeChecked) {
        $('#first-time-error').text('Please select an option.');
        invalidFields = true;
    }

    // Validate name
    const name = $('input[name="name"]').val();
    if (!name) {
        $('#name-error').text('Please enter your name.');
        invalidFields = true;
    }

    // Validate email
    const email = $('input[name="email"]').val();
    if (!email) {
        $('#email-error').text('Please enter your email address.');
        invalidFields = true;
    }
    if (email && !validateEmail(email)) {
        $('#email-error').text('Please enter a valid email address.');
        invalidFields = true;
    }
    
    // Validate phone number
    const phoneNumber = $('input[name="phone_number"]').val();
    if (!phoneNumber) {
        $('#phone-error').text('Please enter your phone number.');
        invalidFields = true;
    }
    if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
        $('#phone-error').text('Please enter a valid phone number.');
        invalidFields = true;
    }

    if (invalidFields) {
        return false;
    }

    return true;
}
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}
function validatePhoneNumber(phoneNumber) {
    const phonePattern = /^[89]\d{7}$/;
    return phoneNumber.length === 8 && phonePattern.test(phoneNumber);
} 