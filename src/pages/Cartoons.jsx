// Cartoons.jsx
import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import { useVideo } from "../context/VideoContext";
import { useAuth } from "../context/AuthContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Cartoons() {
  const { videos, addComment, toggleLike } = useVideo();
  const { currentUser } = useAuth();

  return (
    <div>
      {videos.map((video) => (
        <Card key={video.video_id} style={{ margin: "10px" }}>
          <CardContent>
            <Typography variant="h6">{video.title}</Typography>
            <iframe
              width="100%"
              height="315"
              src={video.url}
              title={video.title}
            ></iframe>
            <Typography>{video.description}</Typography>
            <IconButton onClick={() => toggleLike(video.video_id)}>
              <FavoriteIcon />
              {video.likes && Object.keys(video.likes).length}
            </IconButton>
            {currentUser && (
              <div>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addComment(video.video_id, e.target.value);
                      e.target.value = "";
                    }
                  }}
                />
              </div>
            )}
            {currentUser &&
              video.comments &&
              Object.keys(video.comments).map((key) => {
                const comment = video.comments[key];
                return (
                  <div key={key}>
                    <img
                      src={comment.avatar}
                      alt="User Avatar"
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                      }}
                    />
                    <span>{comment.displayName}</span>
                    <p>{comment.comment}</p>
                  </div>
                );
              })}
            {currentUser && currentUser.uid === video.userId && (
              <div>
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Cartoons;
