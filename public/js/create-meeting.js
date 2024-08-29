document.addEventListener('DOMContentLoaded', function () {
    const sharedWith = [];

    function addUser() {
        const userEmail = document.getElementById('userEmail').value.trim();

        if (!userEmail) {
            alert('Please enter a valid email.');
            return;
        }

        if (!localStorage.getItem(userEmail)) {
            alert('User with this email does not exist.');
            return;
        }

        if (!sharedWith.includes(userEmail)) {
            sharedWith.push(userEmail);
            updateSharedWithList();
        } else {
            alert('This user is already added.');
        }

        document.getElementById('userEmail').value = ''; 
    }

    function updateSharedWithList() {
        const sharedWithList = document.getElementById('sharedWithList');
        sharedWithList.innerHTML = '';

        sharedWith.forEach(function(email) {
            const listItem = document.createElement('li');
            listItem.textContent = email;
            sharedWithList.appendChild(listItem);
        });
    }

    document.getElementById('addUserButton').addEventListener('click', addUser);

    document.getElementById('createMeetingForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const description = document.getElementById('description').value;

        if (!title || !startDate || !endDate || !description) {
            alert('All fields are required.');
            return;
        }

        if (new Date(startDate) > new Date(endDate)) {
            alert('Start date cannot be after end date.');
            return;
        }

        const currentUserEmail = localStorage.getItem('currentUserEmail');
        if (!currentUserEmail) {
            alert('No user is currently logged in.');
            return;
        }

        const meetingsKey = `${currentUserEmail}_meetings`;
        let meetings = JSON.parse(localStorage.getItem(meetingsKey)) || [];

        const newMeeting = {
            title,
            startDate,
            endDate,
            description,
            creator: currentUserEmail,
            sharedWith
        };

        meetings.push(newMeeting);

        localStorage.setItem(meetingsKey, JSON.stringify(meetings));

        alert('Meeting created successfully!');
        window.location.href = 'calendar.html';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('button').addEventListener('click', function () {
        localStorage.removeItem('currentUserEmail');
        window.location.href = 'index.html';
    });
});