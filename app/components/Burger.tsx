"use client";

import * as React from "react";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Drawer from "@mui/joy/Drawer";
import List from "@mui/joy/List";
import ListItemButton from "@mui/joy/ListItemButton";
import ModalClose from "@mui/joy/ModalClose";
import useMediaStore from "../store/useMediaStore";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

export default function Burger() {
  const { toggleMedia, handleToggleMedia, showMedia, screenState, setScreenState, showRecs } =
    useMediaStore();
  const [open, setOpen] = React.useState(false);

  const handleShowMedia = () => {
    if (screenState === "userMedia") {
      setScreenState("movies");
    } else setScreenState("userMedia");
    showMedia();
  };

  const handleToggleMediaView = () => {
    if (screenState === "movies" || "shows") {
      setScreenState("movies");
    }
    handleToggleMedia();
  };

  const handleShowRecommendations = () => {
    setScreenState("recommendations");
    showRecs();
  };

  return (
    <React.Fragment>
      <IconButton onClick={() => setOpen(true)}>
        <MenuOutlinedIcon className='pb-2' />
      </IconButton>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            ml: "auto",
            mt: 1,
            mr: 2,
            backgroundColor: "black",
          }}>
          <ModalClose id='close-icon' sx={{ padding: "14px" }} />
        </Box>
        <List
          size='lg'
          component='nav'
          sx={{
            flex: "none",
            fontSize: "xl",
            "& > div": { paddingLeft: "40px" },
            backgroundColor: "black",
          }}>
          <ListItemButton
            onClick={handleToggleMediaView}
            sx={{
              paddingTop: "40px",
              fontSize: "20px",
            }}>
            {toggleMedia === "movies" ? (
              <span>Search for Shows</span>
            ) : (
              <span>Search for Movies</span>
            )}
          </ListItemButton>

          <ListItemButton onClick={handleShowMedia} sx={{ paddingTop: "10px", fontSize: "20px" }}>
            {screenState === "userMedia" ? "Search" : "My List"}
          </ListItemButton>

          <ListItemButton
            onClick={handleShowRecommendations}
            sx={{ paddingTop: "10px", fontSize: "20px" }}>
            My Recommendations
          </ListItemButton>

          <ListItemButton sx={{ paddingTop: "10px", fontSize: "20px" }}>Info</ListItemButton>
        </List>
      </Drawer>
    </React.Fragment>
  );
}
