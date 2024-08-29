const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    return passwordRegex.test(password);
}

function isEmailRegistered(email) {
    return localStorage.getItem(email) !== null; 
}

function registerUser(email, password) {
    localStorage.setItem(email, JSON.stringify({ password: password }));
    localStorage.setItem('currentUserEmail', email);
    alert('Registration successful!');
    window.location.href = 'calendar.html';
}

document.querySelector('.sign-up form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;

    if (!isValidEmail(email)) {
        alert('Invalid email format.');
        return;
    }

    if (!isValidPassword(password)) {
        alert('Password must be between 8-20 characters, include at least one uppercase letter and one number.');
        return;
    }

    if (isEmailRegistered(email)) {
        alert('This email is already registered.');
        return;
    }

    registerUser(email, password);
});

document.querySelector('.sign-in form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;

    if (!isValidEmail(email)) {
        alert('Invalid email format.');
        return;
    }

    if (!isEmailRegistered(email)) {
        alert('No account found with this email.');
        return;
    }

    const storedUser = JSON.parse(localStorage.getItem(email));

    if (storedUser.password !== password) {
        alert('Incorrect password.');
        return;
    }

    localStorage.setItem('currentUserEmail', email);
    alert('Sign in successful!');
    window.location.href = 'calendar.html';

});


