export function createCountdownHTML(endsAt: string) {
  // Create a container element for the countdown
  const countdownElement = document.createElement('div');
  // Parse the `endsAt` string into a Date object
  const endsAtDate = new Date(endsAt);

  function updateCountdown() {
    const now = new Date();
    const timeDifference = endsAtDate.getTime() - now.getTime();

    if (timeDifference <= 0) {
      countdownElement.textContent = 'Closed';

      clearInterval(timerInterval); // Stop updating when countdown ends
      return;
    }

    // Calculate time left
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Update the countdown element's text content
    countdownElement.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  // Run the updateCountdown function every second
  const timerInterval = setInterval(updateCountdown, 1000);

  // Initialize the countdown immediately
  updateCountdown();

  return countdownElement;
}

export const isAuctionClosed = (endsAt: string) => {
  const currentDate = new Date();
  const endsAtDate = new Date(endsAt);
  return currentDate > endsAtDate;
};
