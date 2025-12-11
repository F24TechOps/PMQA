import Card from "./ui/card";
import { useState, useEffect } from "react";

export default function UploadSection({ title, description, type, onChange }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!input) {
      onChange(null);
      setError(null);
    }

    if (type === "fields") {
      const fields = input
        .split(/[\n,]+/)
        .map((field) => field.trim())
        .filter((field) => field);
      onChange(fields);
      setError(null);
    }

    if (type === "json") {
      try {
        const parsedJSON = JSON.parse(input);
        onChange(parsedJSON);
        setError(null);
      } catch (err) {
        onChange(null);
        setError("Incorect JSON format");
      }
    }
  }, [input, type, onChange]);

  const expectedPlaceholder = `emailAddress
firstname
lastname
title
mobile
bht68u3dx2
8smcbn7pue
...
`;

  const outputPlaceholder = `{
  "items": [
    {
      "emailAddress": "jane.doe@company.com",
      "fields": {
        "emailAddress": "jane.doe@company.com",
        "firstname": "Jane",
        "lastname": "Doe",
        "title": "Marketing Manager",
        "mobile": "+447912345678",
        
        "bht68u3dx2": "Active",
        "8smcbn7pue": "Lead",
        ...
      }
    }
  ]
}
`;
  return (
    <Card>
      <h2>{title}</h2>
      <p>{description}</p>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={type === "json" ? outputPlaceholder : expectedPlaceholder}
        style={{
          width: "100%",
          padding: "0.5rem",
          borderRadius: "8px",
          border: "none",
          minHeight: "300px",
          minWidth: "20vw",
          backgroundColor: error ? "#ffc0c0ff" : "#f4f5f6",
        }}
      />
    </Card>
  );
}
