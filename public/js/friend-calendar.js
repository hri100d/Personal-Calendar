document.addEventListener('DOMContentLoaded', function() {
    const selectedFriendEmail = localStorage.getItem('selectedFriend');
    if (!selectedFriendEmail) {
        alert('No friend selected.');
        return;
    }

    document.querySelector('.userinfo').textContent = selectedFriendEmail;

    const meetingsKey = `${selectedFriendEmail}_meetings`;
    const meetings = JSON.parse(localStorage.getItem(meetingsKey)) || [];

    function displayMeetings(meetings) {
        const meetingsContainer = document.querySelector('.meets');
        meetingsContainer.innerHTML = '';

        meetings.forEach(function(meeting, index) {
            const meetingElement = document.createElement('div');
            meetingElement.className = 'meeting-item';
            meetingElement.innerHTML = `
                <span>${meeting.title}: ${meeting.startDate} to ${meeting.endDate}</span>
            `;

            const viewButton = document.createElement('button');
            viewButton.textContent = 'View';
            viewButton.addEventListener('click', function() {
                viewMeetingDetails(meeting, index);
            });

            meetingElement.appendChild(viewButton);
            meetingsContainer.appendChild(meetingElement);
        });
    }

    function viewMeetingDetails(meeting, index) {
        localStorage.setItem('selectedMeeting', JSON.stringify({ meeting, index, email: selectedFriendEmail }));
        window.location.href = 'meeting-details.html'; 
    }

    displayMeetings(meetings);
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('button').addEventListener('click', function () {
        localStorage.removeItem('currentUserEmail');
        window.location.href = 'index.html';
    });
});
