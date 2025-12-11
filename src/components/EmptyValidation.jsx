import Card from "./ui/card";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export default function EmptyValidation() {
  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: 'center'
        }}
      >
        <IoIosCheckmarkCircleOutline size={40} />
        <h1 style={{ fontSize: 16 }}>Ready to Run</h1>
        <p style={{ width: "50%" }}>
          Upload your expected fields and actual JSON output, select account and
          cycle, enter transaction ID, then click "Run Validation" to start the
          QA process.
        </p>
      </div>
    </Card>
  );
}
