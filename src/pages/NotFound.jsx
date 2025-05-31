import { Link, useRouteError  } from "react-router-dom";
import "./NotFound.css"; 

function NotFound() {
    const error = useRouteError();
  return (
    // A simple 404 page component with a link to return to the home page
    <div className="not-found-page" style={{ textAlign: "center", marginTop: "5rem" }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
         {error && (
        <p className="error-details">
          {error.status ? error.status : "Unknown Status"}
          {error.data && typeof error.data === "string" ? `, ${error.data.slice(6)}` : ""}
        </p>
      )}
      <Link to="/" className="back-home-link">
        Go back to Home
      </Link>
    </div>
  );
}

export default NotFound;
