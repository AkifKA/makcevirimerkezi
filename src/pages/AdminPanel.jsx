import React, { useState } from "react";
import { useVideo } from "../context/VideoContext";
import {
  Typography,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Button,
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  TablePagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function AdminPanel() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState("title");
  const [order, setOrder] = useState("asc");

  const {
    categories,
    newCategoryName,
    newCategoryImageUrl,
    newSubcategoryName,
    newSubcategoryImageUrl,
    selectedCategory,
    selectedParentCategory,
    newVideoTitle,
    newVideoDescription,
    newVideoImgUrl,
    newVideoFrameUrl,
    selectedSubcategory,
    videos,
    handleDeleteCategory,

    handleAddCategory,
    handleAddSubcategory,
    handleAddVideo,
    setNewCategoryName,
    setNewCategoryImageUrl,
    setSelectedCategory,
    setNewSubcategoryName,
    setNewSubcategoryImageUrl,
    setSelectedParentCategory,
    setSelectedSubcategory,
    setNewVideoTitle,
    setNewVideoDescription,
    setNewVideoImgUrl,
    setNewVideoFrameUrl,
  } = useVideo();

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedVideos = stableSort(videos, getComparator(order, orderBy));

  return (
    <div>
      <Typography variant="h4">Kategoriler</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleSort("name")}
                >
                  Kategori Adı
                </TableSortLabel>
              </TableCell>
              <TableCell>Kategori Resim Url</TableCell>
              <TableCell>Alt Kategorileri</TableCell>
              <TableCell>Alt Kategori Resim URL</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  {category.img_url ? category.img_url : "Yok"}
                </TableCell>
                <TableCell>
                  {Object.keys(category.subcategories || {}).map(
                    (subcategoryId, index) => {
                      const subcategory = category.subcategories[subcategoryId];
                      return (
                        <div key={subcategoryId}>
                          {" "}
                          {`${index + 1}. ${subcategory.name}`}
                        </div>
                      );
                    }
                  )}
                </TableCell>
                <TableCell>
                  {" "}
                  {Object.keys(category.subcategories || {}).map(
                    (subcategoryId, index) => {
                      const subcategory = category.subcategories[subcategoryId];
                      return (
                        <div key={subcategoryId}>
                          {" "}
                          {`${index + 1}. ${subcategory.img_url}`}
                        </div>
                      );
                    }
                  )}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteCategory(category.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Paper elevation={3} style={{ padding: "16px", margin: "16px 0" }}>
        <Typography variant="h5">Yeni Kategori Ekle</Typography>
        <Box marginBottom="16px">
          <TextField
            type="text"
            placeholder="Kategori Adı"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            fullWidth
          />
        </Box>
        <Box marginBottom="16px">
          <TextField
            type="text"
            placeholder="Kategori Resim URL"
            value={newCategoryImageUrl}
            onChange={(e) => setNewCategoryImageUrl(e.target.value)}
            fullWidth
          />
        </Box>

        <Box marginTop={"16px"}>
          <FormControl fullWidth>
            <InputLabel>Kategori Seç:</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="">Ana Kategori</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box marginTop={"16px"}>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              handleAddCategory(newCategoryName, newCategoryImageUrl)
            }
          >
            Kategori Ekle
          </Button>
        </Box>
      </Paper>
      <Paper elevation={3} style={{ padding: "16px", margin: "16px 0" }}>
        <Typography variant="h5">Yeni Alt Kategori Ekle</Typography>
        <Box marginBottom="16px">
          <TextField
            type="text"
            placeholder="Alt Kategori Adı"
            value={newSubcategoryName}
            onChange={(e) => setNewSubcategoryName(e.target.value)}
            fullWidth
          />
        </Box>
        <Box marginBottom="16px">
          <TextField
            type="text"
            placeholder="Alt Kategori Resim URL"
            value={newSubcategoryImageUrl}
            onChange={(e) => setNewSubcategoryImageUrl(e.target.value)}
            fullWidth
          />
        </Box>

        <Box marginTop={"16px"}>
          <FormControl fullWidth>
            <InputLabel>Alt Kategori Seç:</InputLabel>
            <Select
              value={selectedParentCategory}
              onChange={(e) => setSelectedParentCategory(e.target.value)}
            >
              <MenuItem value="">Ana Kategori Seçin</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box marginTop={"16px"}>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              handleAddSubcategory(
                selectedParentCategory,
                newSubcategoryName,
                newSubcategoryImageUrl
              )
            }
          >
            Alt Kategori Ekle
          </Button>
        </Box>
      </Paper>
      <Paper elevation={3} style={{ padding: "16px", margin: "16px 0" }}>
        <Typography variant="h5">Video Verileri Ekle</Typography>
        <FormControl fullWidth>
          <InputLabel>Alt Kategori Seç:</InputLabel>
          <Select
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
          >
            <MenuItem value="">Alt Kategori Seçin</MenuItem>
            {categories.map((category) => {
              if (category.id === selectedCategory) {
                return Object.keys(category.subcategories || {}).map(
                  (subcategoryId) => {
                    const subcategory = category.subcategories[subcategoryId];
                    return (
                      <MenuItem key={subcategoryId} value={subcategoryId}>
                        {subcategory.name}
                      </MenuItem>
                    );
                  }
                );
              }
              return null;
            })}
          </Select>
        </FormControl>

        <Box marginBottom="16px">
          <TextField
            type="text"
            placeholder="Video Başlığı"
            value={newVideoTitle}
            onChange={(e) => setNewVideoTitle(e.target.value)}
            fullWidth
          />
        </Box>
        <Box marginBottom="16px">
          <TextField
            type="text"
            placeholder="Video Açıklaması"
            value={newVideoDescription}
            onChange={(e) => setNewVideoDescription(e.target.value)}
            fullWidth
          />
        </Box>
        <Box marginBottom="16px">
          <TextField
            type="text"
            placeholder="Video Resim URL"
            value={newVideoImgUrl}
            onChange={(e) => setNewVideoImgUrl(e.target.value)}
            fullWidth
          />
        </Box>
        <Box marginBottom="16px">
          <TextField
            type="text"
            placeholder="Video Frame URL"
            value={newVideoFrameUrl}
            onChange={(e) => setNewVideoFrameUrl(e.target.value)}
            fullWidth
          />
        </Box>
        <Box marginBottom="16px">
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              handleAddVideo(
                selectedCategory,
                selectedSubcategory,
                newVideoTitle,
                newVideoDescription,
                newVideoImgUrl,
                newVideoFrameUrl
              )
            }
          >
            Video Ekle
          </Button>
        </Box>
      </Paper>
      <Typography variant="h4">Alt Kategoriye Ait Videolar</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "title"}
                  direction={orderBy === "title" ? order : "asc"}
                  onClick={() => handleSort("title")}
                >
                  Başlık
                </TableSortLabel>
              </TableCell>
              <TableCell>Resim URL</TableCell>
              <TableCell>Açıklama</TableCell>
              <TableCell>Frame URL</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "likes"}
                  direction={orderBy === "likes" ? order : "asc"}
                  onClick={() => handleSort("likes")}
                >
                  Likes
                </TableSortLabel>
              </TableCell>
              <TableCell>Yorumlar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedVideos
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((video) => (
                <TableRow key={video.id}>
                  <TableCell>{video.title}</TableCell>
                  <TableCell>{video.img_url ? video.img_url : "Yok"}</TableCell>
                  <TableCell>{video.description}</TableCell>
                  <TableCell>{video.frame_url}</TableCell>
                  <TableCell>{video.likes}</TableCell>
                  <TableCell>
                    {video.comments?.map((comment, index) => (
                      <div key={index}>{comment}</div>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={videos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default AdminPanel;

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function getComparator(order, orderBy) {
  return (a, b) => {
    if (order === "desc") {
      [a, b] = [b, a];
    }
    if (orderBy === "title") {
      return a.title.localeCompare(b.title);
    }
    if (orderBy === "likes") {
      return a.likes - b.likes;
    }
    return 0;
  };
}
