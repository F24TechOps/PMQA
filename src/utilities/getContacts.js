function getContacts(
  person1,
  person2,
  person3,
  person4,
  person5,
  key,
  contacts,
  setContacts
) {
  setContacts([]);

  const people = [person1, person2, person3, person4, person5].filter(
    (person) => person !== 0
  );

  const fetchFunc = (i) => {
    if (i < people.length) {
      fetch(
        `https://swapify-server-kw7h.onrender.com/api/pmTOOL/contact/${people[i]}`,
        {
          method: "GET",
          headers: {
            accept: "json",
            token: key,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          people[i] = data.contact;
        })
        .catch((error) => {
          console.error("Error during fetch:", error);
        })
        .then(fetchFunc(i + 1));
    } else {
        setContacts(people)
    }
  };

  fetchFunc(0)
}

export { getContacts };
