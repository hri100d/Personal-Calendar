document.addEventListener('DOMContentLoaded', function () {
    const currentUserEmail = localStorage.getItem('currentUserEmail');
    if (!currentUserEmail) {
        alert('No user is currently logged in.');
        return;
    }

    const sharedMeetings = [];

    function loadSharedMeetings() {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);

            if (!key.endsWith('_meetings')) continue;

            const userMeetings = JSON.parse(localStorage.getItem(key)) || [];

            userMeetings.forEach(function(meeting, index) {
                if (meeting.sharedWith && meeting.sharedWith.includes(currentUserEmail)) {
                    sharedMeetings.push({ meeting, index, key });
                }
            });
        }

        displaySharedMeetings();
    }

    function displaySharedMeetings() {
        const sharedMeetingsList = document.getElementById('sharedMeetingsList');
        sharedMeetingsList.innerHTML = '';

        sharedMeetings.forEach(function(item) {
            const { meeting, index, key } = item;

            const listItem = document.createElement('li');
            listItem.textContent = `${meeting.title}: ${meeting.startDate} to ${meeting.endDate} (Created by: ${meeting.creator})`;

            const viewButton = document.createElement('button');
            viewButton.textContent = 'View';
            viewButton.addEventListener('click', function() {
                localStorage.setItem('selectedMeeting', JSON.stringify({ key, index }));
                window.location.href = 'meeting-details.html';
            });

            listItem.appendChild(viewButton);
            sharedMeetingsList.appendChild(listItem);
        });
    }

    loadSharedMeetings();
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#logoutButton').addEventListener('click', function () {
        localStorage.removeItem('currentUserEmail');
        window.location.href = 'index.html';
    });
});
