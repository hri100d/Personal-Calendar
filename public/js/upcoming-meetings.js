document.addEventListener('DOMContentLoaded', function () {
    const currentUserEmail = localStorage.getItem('currentUserEmail');
    if (!currentUserEmail) {
        alert('No user is currently logged in.');
        return;
    }

    const upcomingMeetingsContainer = document.querySelector('.upcoming-meetings');
    upcomingMeetingsContainer.innerHTML = '';

    function addMeetingToList(meeting) {
        const meetingElement = document.createElement('div');
        meetingElement.className = 'meeting-item';
        meetingElement.innerHTML = `
            <div class="meeting-info">
                <span>${meeting.title}: ${meeting.startDate} to ${meeting.endDate}</span>
            </div>
        `;
        upcomingMeetingsContainer.appendChild(meetingElement);
    }

    const personalMeetingsKey = `${currentUserEmail}_meetings`;
    const personalMeetings = JSON.parse(localStorage.getItem(personalMeetingsKey)) || [];

    const now = new Date();
    personalMeetings.forEach(meeting => {
        const meetingDate = new Date(meeting.startDate);
        if (meetingDate >= now) {
            addMeetingToList(meeting);
        }
    });

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (!key.endsWith('_meetings') || key === personalMeetingsKey) continue;

        const userMeetings = JSON.parse(localStorage.getItem(key)) || [];
        userMeetings.forEach(meeting => {
            if (meeting.sharedWith && meeting.sharedWith.includes(currentUserEmail)) {
                const meetingDate = new Date(meeting.startDate);
                if (meetingDate >= now) {
                    addMeetingToList(meeting);
                }
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('button').addEventListener('click', function () {
        localStorage.removeItem('currentUserEmail');
        window.location.href = 'index.html';
    });
});