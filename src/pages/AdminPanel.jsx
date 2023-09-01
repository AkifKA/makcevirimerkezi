import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useVideo } from "../context/VideoContext";

function AdminPanel() {
  const {
    categories,
    subcategories,
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    addCategory,
    deleteCategory,
    addSubcategory,
    deleteSubcategory,
    addVideo,
    editCategory, // Yeni eklenen
    editSubcategory, // Yeni eklenen
  } = useVideo();

  const [newCategory, setNewCategory] = useState("");
  const [newSubCategory, setNewSubCategory] = useState("");
  const [newSubCategoryImgUrl, setNewSubCategoryImgUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoImgUrl, setVideoImgUrl] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedSubCategory("");
  };

  const handleCategoryAdd = () => {
    addCategory(newCategory);
    setNewCategory("");
  };

  const handleCategoryDelete = () => {
    if (selectedCategory) {
      deleteCategory(selectedCategory);
      setSelectedCategory("");
    }
  };

  const handleSubCategoryAdd = () => {
    if (selectedCategory) {
      addSubcategory(newSubCategory, selectedCategory, newSubCategoryImgUrl);
      setNewSubCategory("");
      setNewSubCategoryImgUrl("");
    }
  };

  const handleSubCategoryDelete = () => {
    if (selectedSubCategory) {
      deleteSubcategory(selectedSubCategory);
      setSelectedSubCategory("");
    }
  };

  const handleEditCategory = () => {
    if (selectedCategory && newCategory !== "") {
      editCategory(selectedCategory, newCategory);
      setNewCategory("");
    }
  };

  const handleEditSubcategory = () => {
    if (selectedSubCategory && newSubCategory !== "") {
      editSubcategory(selectedSubCategory, newSubCategory);
      setNewSubCategory("");
    }
  };

  const handleVideoAdd = () => {
    if (selectedSubCategory) {
      addVideo(
        videoTitle,
        videoDescription,
        videoUrl,
        videoImgUrl,
        selectedCategory,
        selectedSubCategory
      );
      setVideoTitle("");
      setVideoDescription("");
      setVideoUrl("");
      setVideoImgUrl("");
    }
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Select a Category:</InputLabel>
              <Select value={selectedCategory} onChange={handleCategoryChange}>
                <MenuItem value="">Select a category</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Add New Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button variant="contained" onClick={handleCategoryAdd}>
              Add Category
            </Button>
            <Button variant="contained" onClick={handleCategoryDelete}>
              Delete Category
            </Button>
            <Button variant="contained" onClick={handleEditCategory}>
              Edit Category
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Select a Subcategory:</InputLabel>
              <Select
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
              >
                <MenuItem value="">Select a subcategory</MenuItem>
                {subcategories
                  .filter(
                    (subcategory) => subcategory.categoryId === selectedCategory
                  )
                  .map((filteredSubcategory) => (
                    <MenuItem
                      key={filteredSubcategory.id}
                      value={filteredSubcategory.id}
                    >
                      {filteredSubcategory.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Add New Subcategory"
              value={newSubCategory}
              onChange={(e) => setNewSubCategory(e.target.value)}
            />
            <TextField
              fullWidth
              label="Subcategory Image URL"
              value={newSubCategoryImgUrl}
              onChange={(e) => setNewSubCategoryImgUrl(e.target.value)}
            />
            <Button variant="contained" onClick={handleSubCategoryAdd}>
              Add Subcategory
            </Button>
            <Button variant="contained" onClick={handleSubCategoryDelete}>
              Delete Subcategory
            </Button>
            <Button variant="contained" onClick={handleEditSubcategory}>
              Edit Subcategory
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Video Title"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
            />
            <TextField
              fullWidth
              label="Video Description"
              value={videoDescription}
              onChange={(e) => setVideoDescription(e.target.value)}
            />
            <TextField
              fullWidth
              label="Video URL"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
            <TextField
              fullWidth
              label="Video Image URL"
              value={videoImgUrl}
              onChange={(e) => setVideoImgUrl(e.target.value)}
            />
            <Button variant="contained" onClick={handleVideoAdd}>
              Add Video
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default AdminPanel;
