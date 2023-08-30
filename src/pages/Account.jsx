import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

const Account = () => {
  const { currentUser, uploadProfileImage, getProfileImageUrl } = useAuth();
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  useEffect(() => {
    if (currentUser) {
      // Profil resminin URL'sini al
      getProfileImageUrl(currentUser.uid)
        .then((url) => setProfileImageUrl(url))
        .catch((error) =>
          console.error("Error fetching profile image:", error)
        );
    }
  }, [currentUser]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        // Profil resmini yükle
        const imageUrl = await uploadProfileImage(currentUser.uid, file);
        setProfileImageUrl(imageUrl);
      } catch (error) {
        console.error("Error uploading profile image:", error);
      }
    }
  };

  return (
    <div>
      {currentUser && (
        <Stack spacing={2}>
          <Typography variant="h5" align="center" gutterBottom>
            Hesap Bilgilerim
          </Typography>

          <div
            style={{
              position: "relative",
              display: "inline-block",
              width: "200px",
              height: "200px",
              transition: "opacity 0.3s",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Avatar
              alt={currentUser.displayName}
              src={profileImageUrl}
              sx={{
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
            />
            <input
              type="file"
              accept="image/*"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
                cursor: "pointer",
              }}
              onChange={handleImageChange}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                display: isHovered ? "block" : "none",
              }}
            >
              <EditIcon color="primary" aria-label="edit profile picture" />
            </div>
          </div>

          <Typography variant="h6">Adım:</Typography>
          {isEditingName ? (
            <TextField
              defaultValue={currentUser.displayName}
              variant="outlined"
              fullWidth
              onBlur={() => setIsEditingName(false)}
            />
          ) : (
            <Typography>
              {currentUser.displayName}
              <IconButton
                color="primary"
                aria-label="edit name"
                onClick={() => setIsEditingName(true)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Typography>
          )}

          <Typography variant="h6">Soyadım:</Typography>
          {/* Burada Soyadım alanını ekleyebilirsiniz */}

          <Typography variant="h6">Mail Adresim:</Typography>
          {isEditingEmail ? (
            <TextField
              defaultValue={currentUser.email}
              variant="outlined"
              fullWidth
              onBlur={() => setIsEditingEmail(false)}
            />
          ) : (
            <Typography>
              {currentUser.email}
              <IconButton
                color="primary"
                aria-label="edit email"
                onClick={() => setIsEditingEmail(true)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Typography>
          )}

          {/* Şifre düzenleme kısmını buraya ekleyebilirsiniz */}
        </Stack>
      )}
    </div>
  );
};

export default Account;
