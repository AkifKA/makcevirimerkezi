// LikeComments.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { ref, onValue, set, runTransaction } from "firebase/database";
import { database } from "../auth/firebase"; // firebase.js dosyasından Firebase ayarlarını içe aktarın

const LikeCommentContext = createContext();

export const useLikeComment = () => {
  const { addLike, addComment, videoLikes, videoComments } = useContext(
    LikeCommentContext
  );

  return { addLike, addComment, videoLikes, videoComments };
};

export const LikeCommentProvider = ({ children }) => {
  const [videoLikes, setVideoLikes] = useState({});
  const [videoComments, setVideoComments] = useState({});

  const addLike = (videoId) => {
    const likesRef = ref(database, `videoLikes/${videoId}`);

    // Beğeni sayısı verisini al
    onValue(likesRef, (snapshot) => {
      const currentLikes = snapshot.val() || 0;

      // Eğer kullanıcı daha önce beğenmemişse işlemi başlat
      if (currentLikes === 0) {
        runTransaction(likesRef, (currentLikes) => {
          // İşlem içinde mevcut beğeni sayısını alın ve bir artırarak geri dönün
          return (currentLikes || 0) + 1;
        })
          .then((transactionResult) => {
            if (transactionResult.committed) {
              console.log("Beğeni işlemi başarılı.");
            } else {
              console.log("Beğeni işlemi iptal edildi.");
            }
          })
          .catch((error) => {
            console.error("Beğeni işlemi sırasında hata oluştu:", error);
          });
      } else {
        console.log("Bu videoyu zaten beğendiniz.");
      }
    });
  };

  // Videoya yorum ekleme işlemi
  // VideoComments.jsx
  const addComment = (videoId, comment) => {
    const commentsRef = ref(database, `videoComments/${videoId}`);

    // Yorumu Firebase veritabanına eklemek için set işlemini kullanabilirsiniz
    set(commentsRef, [...(videoComments[videoId] || []), comment])
      .then(() => {
        console.log("Yorum başarıyla eklendi.");
      })
      .catch((error) => {
        console.error("Yorum eklenirken hata oluştu:", error);
      });
  };

  // Firebase'den verileri al
  useEffect(() => {
    const likesRef = ref(database, "videoLikes");
    const commentsRef = ref(database, "videoComments");

    // Beğeni verilerini dinle
    onValue(likesRef, (snapshot) => {
      setVideoLikes(snapshot.val() || {});
    });

    // Yorum verilerini dinle
    onValue(commentsRef, (snapshot) => {
      setVideoComments(snapshot.val() || {});
    });
  }, []);

  return (
    <LikeCommentContext.Provider
      value={{ addLike, addComment, videoLikes, videoComments }}
    >
      {children}
    </LikeCommentContext.Provider>
  );
};
