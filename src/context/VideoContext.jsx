import React, { createContext, useContext, useState, useEffect } from "react";
import { getDatabase, ref, push, onValue, set, get } from "firebase/database";
import { useAuth } from "./AuthContext";

const VideoContext = createContext();

export function useVideo() {
  return useContext(VideoContext);
}

export function VideoProvider({ children }) {
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("cartoons");
  const [selectedCategoryInfo, setSelectedCategoryInfo] = useState(null);
  const [filteredVideos, setFilteredVideos] = useState([]);

  const { currentUser } = useAuth();
  const db = getDatabase();

  const videosRef = ref(db, "videos");
  const categoriesRef = ref(db, "categories");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const snapshot = await get(videosRef);
        const videosData = snapshot.val();

        if (videosData) {
          const videosArray = Object.keys(videosData).map((key) => ({
            video_id: key,
            ...videosData[key],
          }));
          setVideos(videosArray);

          const filtered = videosArray.filter(
            (video) => video.category === selectedCategory
          );
          setFilteredVideos(filtered);
        }
      } catch (error) {
        console.error("Error fetching videos:", error.message);
      }
    };

    const fetchCategories = async () => {
      try {
        const snapshot = await get(categoriesRef);
        const categoriesData = snapshot.val();

        if (categoriesData) {
          const categoriesArray = Object.keys(categoriesData).map(
            (categoryId) => ({
              category_id: categoryId,
              name: categoriesData[categoryId].name,
              videos: videos.filter((video) => video.category === categoryId),
            })
          );
          setCategories(categoriesArray);
        }
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchVideos();
    fetchCategories();
  }, [selectedCategory]);

  async function addVideo(video) {
    try {
      const videoWithCategory = { ...video, category: selectedCategory };
      await push(videosRef, videoWithCategory);
    } catch (error) {
      console.error("Error adding video:", error.message);
    }
  }

  async function addComment(videoId, comment) {
    try {
      const commentsRef = ref(db, `videos/${videoId}/comments`);
      await push(commentsRef, {
        userId: currentUser.uid,
        comment,
      });
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  }

  async function toggleLike(videoId) {
    try {
      const videoRef = ref(db, `videos/${videoId}/likes/${currentUser.uid}`);
      const snapshot = await get(videoRef);

      if (snapshot.exists()) {
        await set(videoRef, null);
      } else {
        await set(videoRef, true);
      }
    } catch (error) {
      console.error("Error toggling like:", error.message);
    }
  }

  async function addCategory(newCategory) {
    try {
      await push(categoriesRef, { name: newCategory });
    } catch (error) {
      console.error("Error adding category:", error.message);
    }
  }

  const value = {
    videos: filteredVideos,
    categories,
    selectedCategory,
    selectedCategoryInfo,
    setSelectedCategory,
    setSelectedCategoryInfo,
    addVideo,
    addComment,
    toggleLike,
    addCategory,
  };

  return (
    <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
  );
}
