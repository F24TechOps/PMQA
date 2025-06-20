function getSchema(contacts, token, schema, setSchema) {
 fetch(
    "https://swapify-server-kw7h.onrender.com/api/pmTOOL/fields",
    {
      method: "GET",
      headers: {
        token: token,
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
      setSchema(data);
    }).then((a) => {
        contacts.forEach((contact, i) => {
            const tempContact = {};
            for (const key in contact) {
                if(contact[key] !== null) {
                    tempContact[schema.fields.find(item => item.id === key)?.displayName] = contact[key];
                }
            }
            contacts[i] = tempContact;
        })
    }).catch((error) => {
      console.error("Error during fetch:", error);
    });
}

export { getSchema };
