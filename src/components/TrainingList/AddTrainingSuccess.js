import { Link } from "react-router-dom";

export default function AddTrainingSuccess() {
  return (
    <p>
      Your entries have been added! You can continue to add training, or
      go&nbsp;
      <Link to="/">back home</Link>
    </p>
  );
}
