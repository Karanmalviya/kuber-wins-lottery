import { Link } from "react-router-dom";
import "../styles/errorboundary.css";
export default function Error() {
  return (
    <div id="notfound">
      <div class="notfound">
        <div class="notfound-404"></div>
        <h1>500</h1>
        <h2>Oops! Something went wrong.</h2>
        <p>
          Sorry but the page you are looking for does not exist, have been
          removed. name changed or is temporarily unavailable
        </p>
        <Link to={"/"}>Back to homepage</Link>
      </div>
    </div>
  );
}
