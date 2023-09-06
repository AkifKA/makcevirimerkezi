import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  IconButton,
  styled,
  TextField,
  Button,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatIcon from "@mui/icons-material/Chat";
import { useVideo } from "../context/VideoContext";
import { useLikeComment } from "../context/LikesComments";

function VideoDetails() {
  const [commentText, setCommentText] = useState(""); // Yorum metnini saklamak için yeni bir state
  const [isCommentFormVisible, setCommentFormVisible] = useState(false);
  const { allVideos } = useVideo();

  const { id } = useParams();
  const { addLike, videoLikes, videoComments, addComment } = useLikeComment();

  // VideoProvider ile sağlanan tüm videoları kullanarak filtreleme
  const filteredVideos = allVideos.filter((video) => video.id === id);
  const cartoon = filteredVideos[0];

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

  const handleAddComment = (e) => {
    e.preventDefault();
    if (commentText) {
      // Yorumu Firebase veritabanına ekleyin
      addComment(cartoon.id, commentText);

      // Yorum ekledikten sonra formu sıfırla ve gizle
      setCommentText("");
      setCommentFormVisible(false);
    }
  };

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

          <CardContent>
            <Typography variant="h5" component="div">
              {cartoon.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {cartoon.description}
            </Typography>
          </CardContent>
          <IconContainer>
            <IconButton onClick={() => addLike(cartoon.id)}>
              <ThumbUpIcon />
            </IconButton>
            <IconButton onClick={() => setCommentFormVisible(true)}>
              <ChatIcon />
            </IconButton>
          </IconContainer>
          <Typography variant="body2" color="textSecondary">
            {videoLikes[cartoon.id] || 0} Beğeni
          </Typography>
          {isCommentFormVisible && (
            <form onSubmit={handleAddComment}>
              <TextField
                fullWidth
                label="Yorum Ekle"
                variant="outlined"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <Button variant="contained" color="primary" type="submit">
                Yorumu Kaydet
              </Button>
            </form>
          )}
          <div>
            <Typography variant="h6">Yorumlar</Typography>
            <ul>
              {videoComments[cartoon.id]?.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </RootContainer>
  );
}

export default VideoDetails;
