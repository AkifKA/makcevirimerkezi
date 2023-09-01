import React, { createContext, useContext, useState, useEffect } from "react";
import { database } from "../auth/firebase"; // Firebase bağlantısını içe aktarın
import {
  child,
  onChildAdded,
  onChildChanged,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";

// Firebase veritabanı referanslarını burada tanımlayın
const categoriesRef = ref(database, "categories"); // Ref işlevini kullanarak veritabanı referansını alın
const subcategoriesRef = ref(database, "subcategories"); // Ref işlevini kullanarak veritabanı referansını alın
const videosRef = ref(database, "videos"); // Ref işlevini kullanarak veritabanı referansını alın

// VideoContext'i oluşturun
const VideoContext = createContext();

// VideoProvider bileşenini oluşturun
export const VideoProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // Yeni eklenen
  const [selectedSubCategory, setSelectedSubCategory] = useState(""); // Yeni eklenen

  useEffect(() => {
    // Kategorileri Firebase'den dinle
    const categoriesListener = onValue(categoriesRef, (snapshot) => {
      const categoryData = snapshot.val();
      if (categoryData) {
        const categoryList = Object.keys(categoryData).map((key) => ({
          id: key,
          name: categoryData[key].name,
        }));
        setCategories(categoryList);
      } else {
        setCategories([]);
      }
    });

    // Alt kategorileri Firebase'den dinle
    const subcategoriesListener = onValue(subcategoriesRef, (snapshot) => {
      const subcategoryData = snapshot.val();
      if (subcategoryData) {
        const subcategoryList = Object.keys(subcategoryData).map((key) => ({
          id: key,
          name: subcategoryData[key].name,
          url: subcategoryData[key].url,
          categoryId: subcategoryData[key].categoryId,
        }));
        setSubcategories(subcategoryList);
      } else {
        setSubcategories([]);
      }
    });

    // Videoları Firebase'den dinle
    const videosListener = onValue(videosRef, (snapshot) => {
      const videoData = snapshot.val();
      if (videoData) {
        const videoList = Object.keys(videoData).map((key) => ({
          id: key,
          title: videoData[key].title,
          description: videoData[key].description,
          url: videoData[key].url,
          imgUrl: videoData[key].imgUrl,
          categoryId: videoData[key].categoryId,
          subcategoryId: videoData[key].subcategoryId,
        }));
        setVideos(videoList);
      } else {
        setVideos([]);
      }
    });

    // useEffect'in temizleme işlevi ile dinleyicileri kaldırın
    return () => {
      categoriesListener();
      subcategoriesListener();
      videosListener();
    };
  }, [setCategories, setSubcategories, setVideos]);
  // Kategori ekleme işlemi için bir işlev
  const addCategory = (newCategory) => {
    push(categoriesRef, { name: newCategory });
  };

  // Kategori silme işlemi için bir işlev
  const deleteCategory = (categoryId) => {
    remove(child(categoriesRef, categoryId));
  };

  // Alt kategori ekleme işlemi için bir işlev
  const addSubcategory = (newSubcategory, categoryId, newSubCategoryUrl) => {
    push(subcategoriesRef, {
      name: newSubcategory,
      categoryId,
      url: newSubCategoryUrl,
    });
  };

  // Alt kategori silme işlemi için bir işlev
  const deleteSubcategory = (subcategoryId) => {
    remove(child(subcategoriesRef, subcategoryId));
  };

  // Kategori seçme işlemi için bir işlev
  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory("");
  };

  // Alt kategori seçme işlemi için bir işlev
  const handleSelectSubCategory = (subcategoryId) => {
    setSelectedSubCategory(subcategoryId);
  };
  // Kategori düzenleme işlemi için bir işlev
  // Kategori düzenleme işlemi için bir işlev
  const editCategory = (categoryId, newName) => {
    const categoryRef = child(categoriesRef, categoryId);
    set(categoryRef, { name: newName });
  };

  // Alt kategori düzenleme işlemi için bir işlev
  const editSubcategory = (subcategoryId, newName) => {
    const subcategoryRef = child(subcategoriesRef, subcategoryId);
    set(subcategoryRef, { name: newName });
  };

  // Video ekleme işlemi için bir işlev
  const addVideo = (
    title,
    description,
    url,
    imgUrl,
    categoryId,
    subcategoryId
  ) => {
    push(videosRef, {
      title,
      description,
      url,
      imgUrl,
      categoryId,
      subcategoryId,
    });
  };

  return (
    <VideoContext.Provider
      value={{
        categories,
        subcategories,
        videos,
        addCategory,
        deleteCategory,
        addSubcategory,
        deleteSubcategory,
        addVideo,
        selectedCategory,
        setSelectedCategory, // Bu değerin doğru şekilde iletilmesi gerekiyor
        selectedSubCategory,
        handleSelectCategory,
        handleSelectSubCategory,
        setSelectedSubCategory,
        editCategory,
        editSubcategory,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

// VideoContext'i kullanmak için özelleştirilmiş bir hook oluşturun
export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideoContext must be used within a VideoProvider");
  }
  return context;
};
