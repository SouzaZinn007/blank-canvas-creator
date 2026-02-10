import { Link } from "react-router-dom";

export default function Forbidden() {
  return (
    <div style={{ padding: 24 }}>
      <h1>403</h1>
      <p>Access denied.</p>
      <Link to="/login">Go to login</Link>
    </div>
  );
}
