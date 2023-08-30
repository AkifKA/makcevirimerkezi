import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useVideo } from "../context/VideoContext";
import { useAuth } from "../context/AuthContext";

function AdminPanel() {
  const {
    addVideo,
    categories,
    addCategory,
    selectedCategoryInfo,
    handleSelectedCategoryChange,
  } = useVideo();

  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const { isAdmin } = useAuth();
  const handleUpload = () => {
    const newVideo = {
      category,
      title,
      description,
      url,
    };

    addVideo(newVideo);
    // Burada sayfa yönlendirmesi veya başka bir işlem yapabilirsiniz
  };

  const handleAddCategory = () => {
    if (newCategory) {
      addCategory(newCategory);
      setNewCategory("");
    }
  };

  if (!isAdmin) {
    return (
      <Typography textAlign={"center"} variant="h3" mt={3}>
        Bu sayfaya yalnızca yöneticiler erişebilir...
      </Typography>
    );
  }

  return (
    <Card style={{ maxWidth: "400px", margin: "0 auto", marginTop: "20px" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Upload a Video
        </Typography>
        <FormControl fullWidth style={{ marginBottom: "20px" }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              handleSelectedCategoryChange(e.target.value);
            }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.category_id} value={cat.name}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedCategoryInfo && (
          <div style={{ marginBottom: "20px" }}>
            <Typography variant="h6">Selected Category Info</Typography>
            <Typography>Category Name: {selectedCategoryInfo.name}</Typography>
            <Typography>Videos:</Typography>
            <ul>
              {selectedCategoryInfo.videos.map((video) => (
                <li key={video.video_id}>
                  <Typography>Title: {video.title}</Typography>
                  <Typography>Description: {video.description}</Typography>
                  <Typography>URL: {video.url}</Typography>
                </li>
              ))}
            </ul>
          </div>
        )}

        <TextField
          label="New Category"
          fullWidth
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Button
          onClick={handleAddCategory}
          variant="contained"
          color="primary"
          style={{ marginBottom: "20px" }}
        >
          Add Category
        </Button>
        <TextField
          label="Video Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Video Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Video URL"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ marginBottom: "20px" }}
        />
        <Button
          onClick={handleUpload}
          variant="contained"
          color="primary"
          fullWidth
        >
          Upload
        </Button>
      </CardContent>
    </Card>
  );
}

export default AdminPanel;
