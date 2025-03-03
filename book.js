// Toggle active state for booking days (green color)
function toggleDateActive(element) {
    // Remove 'selected' from all other booking days
    let allDays = document.querySelectorAll('.booking-day');
    allDays.forEach(day => day.classList.remove('selected'));
    
    // Toggle 'selected' on the clicked booking day
    element.classList.toggle('selected');
}

// Toggle active state for time slots (blue color)
function toggleTimeSlotActive(element) {
    // Remove 'selected' from all other time slots
    let allSlots = document.querySelectorAll('.time-slot');
    allSlots.forEach(slot => slot.classList.remove('selected'));
    
    // Toggle 'selected' on the clicked time slot
    element.classList.toggle('selected');
}
