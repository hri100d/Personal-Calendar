document.addEventListener('DOMContentLoaded', function () {
    const currentUserEmail = localStorage.getItem('currentUserEmail');
    if (!currentUserEmail) {
        alert('No user is currently logged in.');
        return;
    }

    const meetingsKey = `${currentUserEmail}_meetings`;
    const meetings = JSON.parse(localStorage.getItem(meetingsKey)) || [];

    function displayMeetings(filteredMeetings) {
        const meetingsContainer = document.querySelector('.meets');
        meetingsContainer.innerHTML = '';

        filteredMeetings.forEach((meeting, index) => {
            const meetingElement = document.createElement('div');
            meetingElement.className = 'meeting-item';
            meetingElement.innerHTML = `
                <div class="meeting-info">
                    <span>${meeting.title}: ${meeting.startDate} to ${meeting.endDate}</span>
                </div>
                <div class="meeting-actions">
                    <button class="viewButton" data-index="${index}" data-key="${meetingsKey}">View</button>
                    <button class="editButton" data-index="${index}" data-key="${meetingsKey}">Edit</button>
                    <button class="deleteButton" data-index="${index}" data-key="${meetingsKey}">Delete</button>
                </div>
            `;
            meetingsContainer.appendChild(meetingElement);
        });

        document.querySelectorAll('.viewButton').forEach(button => {
            button.addEventListener('click', function () {
                const key = this.getAttribute('data-key');
                const index = this.getAttribute('data-index');
                localStorage.setItem('selectedMeeting', JSON.stringify({ key, index }));
                window.location.href = 'meeting-details.html';
            });
        });

        document.querySelectorAll('.editButton').forEach(button => {
            button.addEventListener('click', function () {
                const key = this.getAttribute('data-key');
                const index = this.getAttribute('data-index');
                localStorage.setItem('selectedMeeting', JSON.stringify({ key, index }));
                window.location.href = 'meeting-edit.html';
            });
        });

        document.querySelectorAll('.deleteButton').forEach(button => {
            button.addEventListener('click', function () {
                const key = this.getAttribute('data-key');
                const index = this.getAttribute('data-index');
                deleteMeeting(key, index);
            });
        });
    }

    function deleteMeeting(key, index) {
        const meetings = JSON.parse(localStorage.getItem(key)) || [];
        meetings.splice(index, 1);
        localStorage.setItem(key, JSON.stringify(meetings));
        alert('Meeting deleted successfully!');
        displayMeetings(meetings);
    }

    function filterMeetings(period) {
        const now = new Date();
        let filteredMeetings = [];

        if (period === 'Daily') {
            filteredMeetings = meetings.filter(meeting => {
                const meetingDate = new Date(meeting.startDate);
                return meetingDate.toDateString() === now.toDateString();
            });
        } else if (period === 'Weekly') {
            const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 6);

            filteredMeetings = meetings.filter(meeting => {
                const meetingDate = new Date(meeting.startDate);
                return meetingDate >= weekStart && meetingDate <= weekEnd;
            });
        } else if (period === 'Monthly') {
            const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
            const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

            filteredMeetings = meetings.filter(meeting => {
                const meetingDate = new Date(meeting.startDate);
                return meetingDate >= monthStart && meetingDate <= monthEnd;
            });
        }

        displayMeetings(filteredMeetings);
    }

    document.querySelector('input[value="Daily"]').addEventListener('click', function () {
        filterMeetings('Daily');
    });

    document.querySelector('input[value="Weekly"]').addEventListener('click', function () {
        filterMeetings('Weekly');
    });

    document.querySelector('input[value="Monthly"]').addEventListener('click', function () {
        filterMeetings('Monthly');
    });

    displayMeetings(meetings);
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#logoutButton').addEventListener('click', function () {
        localStorage.removeItem('currentUserEmail');
        window.location.href = 'index.html';
    });
});

