export function formatTimestamp(date = new Date()) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function generateRoomId() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}
