// Cartoons.jsx
import React, { useEffect, useState } from "react";

import { useVideo } from "../context/VideoContext";
import { useAuth } from "../context/AuthContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  IconButton,
  styled,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatIcon from "@mui/icons-material/Chat";

function VideoDetails() {
  const [cartoon, setCartoon] = useState({});

  const { allVideos } = useVideo();
  const { id } = useParams();
  console.log(allVideos);

  const getFilteredCartoon = () => {
    try {
      const filteredVideo = allVideos?.find((cartoon) => cartoon?.id === id);
      return filteredVideo;
    } catch (error) {
      console.error("Hata:", error);
      throw error;
    }
  };

  useEffect(() => {
    setCartoon(getFilteredCartoon());
  }, [allVideos]);

  const RootContainer = styled(Card)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  }));

  const Media = styled(CardMedia)(({ theme }) => ({
    height: 400,
    width: "100%",
    objectFit: "cover",
  }));

  const IconContainer = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(1),
  }));
  return (
    <RootContainer>
      {cartoon && (
        <>
          <Media
            component="iframe"
            alt={cartoon.title}
            image={cartoon.frame_url}
            title={cartoon.title}
            allow="autoplay; fullscreen; picture-in-picture"
          />

          <script src="https://player.vimeo.com/api/player.js"></script>
          <CardContent>
            <Typography variant="h5" component="div">
              {cartoon.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {cartoon.description}
            </Typography>
          </CardContent>
          <IconContainer>
            <IconButton>
              <ThumbUpIcon />
            </IconButton>
            <IconButton>
              <ChatIcon />
            </IconButton>
          </IconContainer>
          <Typography variant="body2" color="textSecondary">
            {cartoon.likes} Beğeni | {cartoon.comments} Yorum
          </Typography>
          {/* Burada yorumları ve yorum yapma bileşenini eklemek isterseniz, bu kısımları ekleyebilirsiniz */}
        </>
      )}
    </RootContainer>
  );
}

export default VideoDetails;
