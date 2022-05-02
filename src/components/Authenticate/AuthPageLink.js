import React from "react";
import { Link, useParams } from "react-router-dom";

const AuthPageLink = () => {
  const params = useParams();
  const pageParam = Object.values(params)[0];

  return (
    <div>
      <div>
        {pageParam === "register" && (
          <p>
            Already Signed Up? <Link to="/authenticate">Login Here</Link>
          </p>
        )}
        {pageParam !== "register" && (
          <p>
            Not Signed Up? <Link to="register">Register Here</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthPageLink;
