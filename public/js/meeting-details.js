document.addEventListener('DOMContentLoaded', function () {
    const meetingDetailsContainer = document.getElementById('meetingDetails');

    const selectedMeetingData = JSON.parse(localStorage.getItem('selectedMeeting'));
    if (!selectedMeetingData) {
        meetingDetailsContainer.textContent = "No meeting selected.";
        return;
    }

    const { key, index } = selectedMeetingData;

    const userMeetings = JSON.parse(localStorage.getItem(key)) || [];
    const meeting = userMeetings[index];

    if (!meeting) {
        meetingDetailsContainer.textContent = "Meeting not found.";
        return;
    }

    const detailsHTML = `
        <p><strong>Title:</strong> ${meeting.title}</p>
        <p><strong>Start Date:</strong> ${meeting.startDate}</p>
        <p><strong>End Date:</strong> ${meeting.endDate}</p>
        <p><strong>Description:</strong> ${meeting.description || 'No description provided.'}</p>
        <p><strong>Created by:</strong> ${meeting.creator}</p>
        ${meeting.sharedWith ? `<p><strong>Shared with:</strong> ${meeting.sharedWith.join(', ')}</p>` : ''}
    `;

    meetingDetailsContainer.innerHTML = detailsHTML;
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#logoutButton').addEventListener('click', function () {
        localStorage.removeItem('currentUserEmail');
        window.location.href = 'index.html';
    });
});
