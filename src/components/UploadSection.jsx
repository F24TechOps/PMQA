import Card from "./ui/card";

export default function UploadSection({ title, description }) {
  return (
    <Card>
      <div>
        <p>
          This is the upload section for <strong>{title}</strong> that will tell
          the user to <strong>{description}</strong>
        </p>
      </div>
    </Card>
  );
}
