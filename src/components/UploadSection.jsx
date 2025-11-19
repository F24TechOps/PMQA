import Card from "./ui/card";
import { useState, useEffect } from "react";

export default function UploadSection({ title, description, type, onChange }) {

  const [input, setInput] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
     if(!input){
      onChange(null);
      setError(null);
    } 

    if(type === "fields"){
    const fields = input.split(/[\n,]+/)
    .map(field => field.trim())
    .filter(field => field);
    onChange(fields);
    setError(null);
  }

  if(type === "json"){
    try {
    const parsedJSON = JSON.parse(input);
    onChange(parsedJSON);
    setError(null);
  }
    catch(err){
      onChange(null);
      setError("Incorect JSON format");
    }
  }
  }, [input, type, onChange])
  
  

  return (
    <Card>
      <h2>{title}</h2>
      <p>{description}</p>
      <textarea value={input} onChange={(e) => setInput(e.target.value)}
      placeholder={type === "json" ? "Paste the JSON response from Cyclr transaction logs" : "Paste the list of fields that should exist in the workflow output" }
      style={{
          width: "100%",
          padding: "0.5rem",
          borderRadius: "8px",
          border:"1px solid #ccc",
        }}
      />
    </Card>
  );
}
