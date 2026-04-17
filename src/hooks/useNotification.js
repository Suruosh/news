import { useState } from "react";

function useNotification() {
  const [notification, setNotification] = useState(null);

  // REVIEW: Each call to showNotification creates a new setTimeout without clearing
  // the previous one. If called rapidly, earlier timeouts will fire and dismiss the
  // latest notification prematurely. Store the timer ID in a ref and clear it on each
  // new call and on component unmount to prevent stale state updates.
  function showNotification(message, type = "success") {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }

  function dismissNotification() {
    setNotification(null);
  }

  return { notification, showNotification, dismissNotification };
}

export default useNotification;
