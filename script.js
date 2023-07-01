// Get elements
const hourInput = document.getElementById('hour');
const minuteInput = document.getElementById('minute');
const secondInput = document.getElementById('second');
const amPmSelect = document.getElementById('am-pm');
const setAlarmButton = document.getElementById('set-alarm');
const alarmsList = document.getElementById('alarms');
const timeDisplay = document.getElementById('time');

// Display current time
function displayTime() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
  timeDisplay.textContent = timeString;
}

// Update time every second
setInterval(displayTime, 1000);

// Set an alarm
function setAlarm() {
  let hour = parseInt(hourInput.value);
  let minute = parseInt(minuteInput.value);
  let second = parseInt(secondInput.value);
  const amPm = amPmSelect.value;

  // Handle cycling to 0 for hours, minutes, and seconds
  hour = hour % 12;
  minute = minute % 60;
  second = second % 60;

  const alarmTime = formatTime(hour, minute, second, amPm);
  const alarmItem = document.createElement('li');
  alarmItem.textContent = alarmTime;
  
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', deleteAlarm);
  alarmItem.appendChild(deleteButton);
  
  alarmsList.appendChild(alarmItem);
  
  // Clear input fields
  hourInput.value = '';
  minuteInput.value = '';
  secondInput.value = '';

 // Check if the alarm time matches the current time every second
 setInterval(() => {
  const now = new Date();
  const currentHour = now.getHours() % 12;
  const currentMinute = now.getMinutes();
  const currentSecond = now.getSeconds();

  if (currentHour === hour && currentMinute === minute && currentSecond === second) {
    alert('Wake up Call');
  }
}, 1000);


}

// Format time as HH:MM:SS AM/PM
function formatTime(hour, minute, second, amPm) {
  hour = hour.toString().padStart(2, '0');
  minute = minute.toString().padStart(2, '0');
  second = second.toString().padStart(2, '0');
  return `${hour}:${minute}:${second} ${amPm.toUpperCase()}`;
}

// Handle alarm delete
function deleteAlarm(event) {
  const alarmItem = event.target.parentElement;
  alarmsList.removeChild(alarmItem);
}

// Add event listeners
setAlarmButton.addEventListener('click', setAlarm);
