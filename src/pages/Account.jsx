import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";

const Account = () => {
  const { currentUser, uploadProfileImage } = useAuth();
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.photoURL) {
        // Eğer kullanıcının profil resmi varsa, o resmi kullan
        setProfileImageUrl(currentUser.photoURL);
      }
    }
  }, [currentUser]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
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
        <Stack
          spacing={2}
          alignItems="center"
          justifyContent={`center`}
          alignContent={"center"}
          fontSize={"1.2rem"}
          fontWeight={600}
        >
          <Typography variant="h6" gutterBottom>
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
              alt={currentUser?.displayName}
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
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: isHovered ? "block" : "none",
              }}
            >
              <EditIcon color="primary" aria-label="edit profile picture" />
            </div>
          </div>

          <Typography variant="h7"> {currentUser?.displayName}</Typography>
          <Typography variant="h7">{currentUser?.email}</Typography>
        </Stack>
      )}
    </div>
  );
};

export default Account;
