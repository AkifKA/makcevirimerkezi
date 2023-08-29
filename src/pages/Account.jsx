import React from "react";
import { useAuth } from "../context/AuthContext";

import Typography from "@mui/material/Typography";

const Account = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      {currentUser && (
        <>
          <Typography variant="h5" gutterBottom>
            Account Details
          </Typography>

          <Typography variant="body1">
            İsim: {currentUser.displayName}
          </Typography>
          <Typography variant="body1">Email: {currentUser.email}</Typography>
          {/* Diğer hesap bilgilerini burada göster... */}
        </>
      )}
    </div>
  );
};

export default Account;
