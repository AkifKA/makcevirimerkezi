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
    // Fetch videos from the database
    onValue(videosRef, (snapshot) => {
      const videosData = snapshot.val();
      if (videosData) {
        const videosArray = Object.keys(videosData).map((key) => ({
          video_id: key,
          ...videosData[key],
        }));
        setVideos(videosArray);

        // Filter videos based on selected category
        const filtered = videosArray.filter(
          (video) => video.category === selectedCategory
        );
        setFilteredVideos(filtered);
      }
    });

    // Fetch categories from the database
    onValue(categoriesRef, (snapshot) => {
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
    });
  }, [selectedCategory]);

  function addVideo(video) {
    // Set the category of the video
    const videoWithCategory = { ...video, category: selectedCategory };

    // Push the video to the videos array
    push(videosRef, videoWithCategory);
  }

  function addComment(videoId, comment) {
    // Update the comments for the video in the database
    const commentsRef = ref(db, `videos/${videoId}/comments`);
    push(commentsRef, {
      userId: currentUser.uid,
      comment,
    });
  }

  function toggleLike(videoId) {
    const videoRef = ref(db, `videos/${videoId}/likes/${currentUser.uid}`);

    get(videoRef).then((snapshot) => {
      if (snapshot.exists()) {
        set(videoRef, null);
      } else {
        set(videoRef, true);
      }
    });
  }

  function addCategory(newCategory) {
    // Push the new category with its name as a subproperty
    push(categoriesRef, { name: newCategory });
  }

  const handleSelectedCategoryChange = (categoryName) => {
    // Find the selected category info from the categories array
    const selectedCat = categories.find((cat) => cat.name === categoryName);

    if (selectedCat) {
      setSelectedCategoryInfo(selectedCat);
    } else {
      setSelectedCategoryInfo(null); // Reset if no category is selected
    }
  };

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
    handleSelectedCategoryChange,
  };

  return (
    <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
  );
}
