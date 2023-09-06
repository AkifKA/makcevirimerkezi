import React, { createContext, useContext, useState, useEffect } from "react";
import { database } from "../auth/firebase";
import { off, onValue, ref, push, set, remove } from "firebase/database";

const VideoContext = createContext();

export function VideoProvider({ children }) {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImageUrl, setNewCategoryImageUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [newSubcategoryImageUrl, setNewSubcategoryImageUrl] = useState("");
  const [selectedParentCategory, setSelectedParentCategory] = useState("");
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [newVideoDescription, setNewVideoDescription] = useState("");
  const [newVideoImgUrl, setNewVideoImgUrl] = useState("");
  const [newVideoFrameUrl, setNewVideoFrameUrl] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selectedCategoryData] = useState(null);
  const [selectedSubcategoryData] = useState(null);
  const [subcategoryVideos, setSubcategoryVideos] = useState([]);
  const [allVideos, setAllVideos] = useState([]); // Tüm videoları saklamak için

  useEffect(() => {
    const categoriesRef = ref(database, "categories");

    onValue(categoriesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const categoryList = [];
        Object.keys(data).forEach((categoryId) => {
          const category = data[categoryId];
          category.id = categoryId;
          categoryList.push(category);
        });
        setCategories(categoryList);
      }
    });

    return () => {
      off(categoriesRef);
    };
  }, [setCategories]);

  useEffect(() => {
    if (selectedCategory && selectedSubcategory) {
      const videosRef = ref(
        database,
        `categories/${selectedCategory}/subcategories/${selectedSubcategory}/videos`
      );

      onValue(videosRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const videoList = [];
          Object.keys(data).forEach((videoId) => {
            const video = data[videoId];
            video.id = videoId;
            videoList.push(video);
          });
          setVideos(videoList);
          setAllVideos(videoList); // Tüm videoları güncelle
        }
      });

      return () => {
        off(videosRef);
      };
    }
  }, [selectedCategory, selectedSubcategory, setAllVideos, setVideos]);

  useEffect(() => {
    if (selectedSubcategory) {
      const subcategoryVideosRef = ref(
        database,
        `categories/${selectedCategory}/subcategories/${selectedSubcategory}/videos`
      );

      onValue(subcategoryVideosRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const videoList = [];
          Object.keys(data).forEach((videoId) => {
            const video = data[videoId];
            video.id = videoId;
            videoList.push(video);
          });
          setSubcategoryVideos(videoList);
        }
      });

      return () => {
        off(subcategoryVideosRef);
      };
    }
  }, [selectedCategory, selectedSubcategory, setSubcategoryVideos]);

  useEffect(() => {
    const allVideosRef = ref(database, "allVideos");

    onValue(allVideosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const allVideoList = [];
        Object.keys(data).forEach((videoId) => {
          const video = data[videoId];
          if (video) {
            video.id = videoId;

            // Eğer video içinde subCategoryId varsa, subCategories alanına ekliyoruz
            if (video.subCategoryId) {
              video.subCategories.push(video.subCategoryId);
            }

            // Eğer subCategories henüz tanımlanmamışsa, boş bir dizi olarak başlat
            if (!video.subCategories) {
              video.subCategories = [];
            }

            allVideoList.push(video);
          }
        });
        setAllVideos(allVideoList);
      }
    });

    return () => {
      off(allVideosRef);
    };
  }, [selectedCategory, selectedSubcategory, setVideos]);

  function addCategory(categoryName, imageUrl, subcategories) {
    const categoryRef = ref(database, "categories");
    const newCategoryRef = push(categoryRef);

    set(newCategoryRef, {
      name: categoryName,
      img_url: imageUrl,
      subcategories: subcategories,
    });
  }

  function addSubcategory(categoryId, subcategoryName, imageUrl) {
    const subcategoryRef = ref(
      database,
      `categories/${categoryId}/subcategories`
    );
    const newSubcategoryRef = push(subcategoryRef);

    set(newSubcategoryRef, {
      name: subcategoryName,
      img_url: imageUrl,
    });
  }

  function addVideo(
    categoryId,
    subcategoryId,
    title,
    description,
    imgUrl,
    frameUrl,
    likes,
    comments
  ) {
    const videoRef = ref(
      database,
      `categories/${categoryId}/subcategories/${subcategoryId}/videos`
    );
    const newVideoRef = push(videoRef);

    set(newVideoRef, {
      subcategoryId: subcategoryId,
      title: title,
      description: description,
      img_url: imgUrl,
      frame_url: frameUrl,
      likes: 0,
      comments: [],
    });

    const newVideoId = newVideoRef.key;
    set(ref(database, `allVideos/${newVideoId}`), {
      subcategoryId: subcategoryId,
      title: title,
      description: description,
      img_url: imgUrl,
      frame_url: frameUrl,
      likes: 0,
      comments: [],
    });
  }

  function handleDeleteCategory(categoryId) {
    const categoryRef = ref(database, `categories/${categoryId}`);
    remove(categoryRef)
      .then(() => {
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== categoryId)
        );
      })
      .catch((error) => {
        console.error("Kategori silinirken bir hata oluştu: ", error);
      });
  }

  function handleDeleteSubcategory(categoryId, subcategoryId) {
    const subcategoryRef = ref(
      database,
      `categories/${categoryId}/subcategories/${subcategoryId}`
    );
    remove(subcategoryRef)
      .then(() => {
        setCategories((prevCategories) =>
          prevCategories.map((category) => {
            if (category.id === categoryId) {
              const subcategories = { ...category.subcategories };
              delete subcategories[subcategoryId];
              return { ...category, subcategories };
            }
            return category;
          })
        );
      })
      .catch((error) => {
        console.error("Alt kategori silinirken bir hata oluştu: ", error);
      });
  }

  function handleAddCategory() {
    if (!newCategoryName || newCategoryName.trim() === "") {
      return;
    }

    if (!selectedCategory || selectedCategory === "") {
      addCategory(newCategoryName, newCategoryImageUrl, {});
      setSelectedCategory("some-unique-identifier");
    } else {
      if (!selectedParentCategory || selectedParentCategory === "") {
        console.log("Bir ana kategori seçmelisiniz.");
        return;
      }
    }

    setNewCategoryName("");
    setNewCategoryImageUrl("");
  }

  function handleAddSubcategory() {
    if (!newSubcategoryName || newSubcategoryName.trim() === "") {
      return;
    }

    if (!selectedParentCategory || selectedParentCategory === "") {
      console.log("Bir ana kategori seçmelisiniz.");
      return;
    }

    addSubcategory(
      selectedParentCategory,
      newSubcategoryName,
      newSubcategoryImageUrl
    );

    setNewSubcategoryName("");
    setNewSubcategoryImageUrl("");
  }

  function handleAddVideo() {
    if (
      !selectedCategory ||
      selectedCategory === "" ||
      !selectedSubcategory ||
      selectedSubcategory === "" ||
      !newVideoTitle ||
      newVideoTitle.trim() === "" ||
      !newVideoDescription ||
      newVideoDescription.trim() === "" ||
      !newVideoImgUrl ||
      newVideoImgUrl.trim() === "" ||
      !newVideoFrameUrl ||
      newVideoFrameUrl.trim() === ""
    ) {
      return;
    }

    addVideo(
      selectedCategory,
      selectedSubcategory,
      newVideoTitle,
      newVideoDescription,
      newVideoImgUrl,
      newVideoFrameUrl
    );

    setNewVideoTitle("");
    setNewVideoDescription("");
    setNewVideoImgUrl("");
    setNewVideoFrameUrl("");
  }

  return (
    <VideoContext.Provider
      value={{
        newCategoryName,
        setNewCategoryName,
        newCategoryImageUrl,
        setNewCategoryImageUrl,
        selectedCategory,
        setSelectedCategory,
        newSubcategoryName,
        setNewSubcategoryName,
        newSubcategoryImageUrl,
        setNewSubcategoryImageUrl,
        selectedParentCategory,
        setSelectedParentCategory,
        newVideoTitle,
        setNewVideoTitle,
        newVideoDescription,
        setNewVideoDescription,
        newVideoImgUrl,
        setNewVideoImgUrl,
        newVideoFrameUrl,
        setNewVideoFrameUrl,
        selectedSubcategory,
        setSelectedSubcategory,
        categories,
        setCategories,
        videos,
        setVideos,
        selectedCategoryData,
        selectedSubcategoryData,
        subcategoryVideos,
        allVideos, // Tüm videoları ekledik
        addCategory,
        addSubcategory,
        addVideo,
        handleAddCategory,
        handleAddSubcategory,
        handleDeleteSubcategory,
        handleAddVideo,
        handleDeleteCategory,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}

export function useVideo() {
  return useContext(VideoContext);
}
