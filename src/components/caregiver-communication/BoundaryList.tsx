import { SERVICE_BOUNDARY } from "@/lib/caregiver-communication/boundary";

export function BoundaryList() {
  return (
    <ul className="cc-boundary">
      {SERVICE_BOUNDARY.map((sentence) => (
        <li key={sentence}>{sentence}</li>
      ))}
    </ul>
  );
}
