import { useState } from "react";
import { handleSubmit } from "./utilities/handleSubmit";
import { getSchema } from "./utilities/getSchema";
import { getContacts } from "./utilities/getContacts";
import { exportFile } from "./utilities/outputfile";

function MainSection() {
  const [clientID, setClientID] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [key, setKey] = useState("");
  const [schema, setSchema] = useState({});
  const [contacts, setContacts] = useState([]);
  const [person1, setPerson1] = useState(0);
  const [person2, setPerson2] = useState(0);
  const [person3, setPerson3] = useState(0);
  const [person4, setPerson4] = useState(0);
  const [person5, setPerson5] = useState(0);

  return (
    <main>
      <p>Enter F24 credentials</p>
      <form id="credentialsForm">
        <label htmlFor="ClientID">Client ID</label>
        <input
          id="ClientID"
          value={clientID}
          onChange={(event) => {
            setClientID(event.target.value);
          }}
        ></input>
        <label htmlFor="ClientSecret">Client Secret</label>
        <input
          id="ClientSecret"
          value={clientSecret}
          onChange={(event) => {
            setClientSecret(event.target.value);
          }}
        ></input>
        <button
          type="submit"
          disabled={key}
          onClick={(event) => {
            event.preventDefault();
            handleSubmit(clientID, clientSecret, setKey);
          }}
        >
          Get Key
        </button>
      </form>
      <p>
        {key === "" || key === undefined ? "no key obtained" : "key obtained"}
      </p>
      <form id="personForm">
        <div display="block">
          <label htmlFor="person1">Person 1</label>
          <input
            id="person1"
            value={person1}
            onChange={(event) => {
              setPerson1(event.target.value);
            }}
          ></input>
        </div>
        <div display="block">
          <label htmlFor="person2">Person 2</label>
          <input
            id="person2"
            value={person2}
            onChange={(event) => {
              setPerson2(event.target.value);
            }}
          ></input>
        </div>
        <div display="block">
          <label htmlFor="person3">Person 3</label>
          <input
            id="person3"
            value={person3}
            onChange={(event) => {
              setPerson3(event.target.value);
            }}
          ></input>
        </div>
        <div display="block">
          <label htmlFor="person4">Person 4</label>
          <input
            id="person4"
            value={person4}
            onChange={(event) => {
              setPerson4(event.target.value);
            }}
          ></input>
        </div>
        <div display="block">
          <label htmlFor="person5">Person 5</label>
          <input
            id="person5"
            value={person5}
            onChange={(event) => {
              setPerson5(event.target.value);
            }}
          ></input>
        </div>
        <div display="block">
          <button
            type="submit"
            //disabled={contacts.length > 0 || !key}
            onClick={(event) => {
              event.preventDefault();
              getContacts(person1, person2, person3, person4, person5, key, contacts, setContacts);
            }}
          >
            Get people
          </button>
        </div>
        <div display="block">
          <button
            type="submit"
            //disabled={contacts.length === 0 || schema.fields}
            onClick={(event) => {
              event.preventDefault();
              getSchema(contacts, key, schema, setSchema);
            }}
          >
            Get schema
          </button>
        </div>
         <div display="block">
          <button
            type="submit"
            //disabled={!schema.fields}
            onClick={(event) => {
              event.preventDefault();
              exportFile(contacts);
            }}
          >
            Output File
          </button>
        </div>
      </form>
    </main>
  );
}

export { MainSection };
