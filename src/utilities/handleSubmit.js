function handleSubmit(clientID, clientSecret, setKey) {
  fetch("https://swapify-server-kw7h.onrender.com/api/pmTOOL/token", {
    method: "POST",
    headers: {
      accept: "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
        id: clientID,
        secret: clientSecret
    })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      setKey(data.returnToken);
    })
    .catch((error) => {
      console.error("Error during fetch:", error);
    });
}


export { handleSubmit };
