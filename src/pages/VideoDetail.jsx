// // VideoDetail.jsx
// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import {
//   Card,
//   CardContent,
//   Typography,
//   CardMedia,
//   IconButton,
//   styled,
//   TextField,
//   Button,
// } from "@mui/material";
// import ThumbUpIcon from "@mui/icons-material/ThumbUp";
// import ChatIcon from "@mui/icons-material/Chat";
// import { useVideo } from "../context/VideoContext";

// function VideoDetails() {
//   const [commentText, setCommentText] = useState("");
//   const [isCommentFormVisible, setCommentFormVisible] = useState(false);
//   const { allVideos, likeVideo, addComment } = useVideo();
//   const { id } = useParams();
//   const cartoon = allVideos.find((video) => video.id === id); // Tüm videolar arasında doğru videoyu bulun

//   const RootContainer = styled(Card)(({ theme }) => ({
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     padding: theme.spacing(2),
//   }));

//   const Media = styled(CardMedia)(({ theme }) => ({
//     height: 400,
//     width: "100%",
//     objectFit: "cover",
//   }));

//   const IconContainer = styled("div")(({ theme }) => ({
//     display: "flex",
//     justifyContent: "space-between",
//     marginTop: theme.spacing(1),
//   }));

//   const handleAddComment = (e) => {
//     e.preventDefault();
//     if (commentText) {
//       addComment(cartoon.id, commentText);
//       setCommentText("");
//       setCommentFormVisible(false);
//     }
//   };

//   if (!cartoon) {
//     return <div>Video bulunamadı.</div>;
//   }

//   const likeCount =
//     cartoon.likes[cartoon?.id] !== undefined ? cartoon.likes[cartoon?.id] : 0;
//   const likeCountText = `${likeCount} Beğeni`;

//   return (
//     <RootContainer>
//       {cartoon && (
//         <>
//           <Media
//             component="iframe"
//             alt={cartoon?.title}
//             image={cartoon?.frame_url}
//             title={cartoon?.title}
//             allow="autoplay; fullscreen; picture-in-picture"
//           />

//           <CardContent>
//             <Typography variant="h5" component="div">
//               {cartoon?.title}
//             </Typography>
//             <Typography variant="body2" color="textSecondary">
//               {cartoon?.description}
//             </Typography>
//           </CardContent>
//           <IconContainer>
//             <IconButton
//               onClick={() => likeVideo(cartoon?.id /* Kullanıcı kimliği */)}
//             >
//               <ThumbUpIcon />
//             </IconButton>
//             <IconButton onClick={() => setCommentFormVisible(true)}>
//               <ChatIcon />
//             </IconButton>
//           </IconContainer>
//           <Typography variant="body2" color="textSecondary">
//             {likeCountText} Beğeni
//           </Typography>
//           {isCommentFormVisible && (
//             <form onSubmit={handleAddComment}>
//               <TextField
//                 fullWidth
//                 label="Yorum Ekle"
//                 variant="outlined"
//                 value={commentText}
//                 onChange={(e) => setCommentText(e.target.value)}
//               />
//               <Button variant="contained" color="primary" type="submit">
//                 Yorumu Kaydet
//               </Button>
//             </form>
//           )}
//           <div>
//             <Typography variant="h6">Yorumlar</Typography>
//             <ul>
//               {cartoon?.comments
//                 ? Object.values(cartoon.comments).map((comment, index) => (
//                     <li key={index}>{comment.text}</li>
//                   ))
//                 : null}
//             </ul>
//           </div>
//         </>
//       )}
//     </RootContainer>
//   );
// }

// export default VideoDetails;

import React from "react";

const VideoDetail = () => {
  return <div>VideoDetail</div>;
};

export default VideoDetail;
