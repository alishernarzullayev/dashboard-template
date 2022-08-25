import { Link, Typography } from "@mui/material";
import "./error.css";
const Error = () => {
  return (
    <div className="error">
      <Typography variant="h4" color="red">
        Error 404
      </Typography>
      <Link to="/">
        <Typography variant="body1">
          Go to Home Page
        </Typography>
      </Link>
    </div>
  );
};

export default Error;
