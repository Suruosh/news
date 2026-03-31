import { useState } from "react";

function useNotification() {
  const [notification, setNotification] = useState(null);

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
