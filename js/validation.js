document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.validation');
  const password = document.getElementById('passwordfield');
  const confirmPassword = document.getElementById('confirmfield');
  const email = document.querySelector('input[type="email"]');
  const fullName = document.querySelector('input[type="text"]');
  const showPasswordCheck = document.getElementById('showPasswordCheck');

  // Validate if passwords match
  function validatePasswords() {
    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity('Passwords do not match');
    } else {
      confirmPassword.setCustomValidity('');
    }
  }

  // Validate password strength
  function validatePasswordStrength() {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!regex.test(password.value)) {
      password.setCustomValidity('Password must be at least 8 characters, include at least one letter and one number');
    } else {
      password.setCustomValidity('');
    }
  }

  // Validate email format
  function validateEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email.value)) {
      email.setCustomValidity('Please enter a valid email address');
    } else {
      email.setCustomValidity('');
    }
  }

  // Validate full name format
  function validateFullName() {
    const regex = /^[A-Za-z\s]+$/;
    if (!regex.test(fullName.value)) {
      fullName.setCustomValidity('Full name must contain only letters and spaces');
    } else {
      fullName.setCustomValidity('');
    }
  }

  // Toggle password visibility with checkbox
  showPasswordCheck.addEventListener('change', function () {
    const type = showPasswordCheck.checked ? 'text' : 'password';
    password.type = type;
    confirmPassword.type = type;
  });

  // Real-time validation
  password.addEventListener('input', () => {
    validatePasswords();
    validatePasswordStrength();
  });

  confirmPassword.addEventListener('input', validatePasswords);
  email.addEventListener('input', validateEmail);
  fullName.addEventListener('input', validateFullName);

  // On form submit
  form.addEventListener('submit', function (event) {
    validatePasswords();
    validatePasswordStrength();
    validateEmail();
    validateFullName();

    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
  }, false);
});
