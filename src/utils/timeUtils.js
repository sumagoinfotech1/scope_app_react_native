export const formatTime = (timeString) => {
    if (!timeString) return '';
  
    const [hours, minutes] = timeString.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
  
    return `${formattedHours}:${String(minutes).padStart(2, '0')} ${ampm}`;
  };