import { Link } from "react-router-dom";
import "./NotFoundPage.css";
function NotFoundPage() {
  return (
    <div className="flex-container">
      <div className="text-center">
        <h1>
          <span className="fade-in" id="digit1">
            4
          </span>
          <span className="fade-in" id="digit2">
            0
          </span>
          <span className="fade-in" id="digit3">
            4
          </span>
        </h1>
        <h3 className="fadeIn">PAGE NOT FOUND</h3>
        <Link to="/">
          <button type="button" name="button">
            Return To Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
