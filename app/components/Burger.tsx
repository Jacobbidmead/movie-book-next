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
import BookmarkBorderTwoToneIcon from "@mui/icons-material/BookmarkBorderTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

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
        <MenuOutlinedIcon className='p-1' />
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
            backgroundColor: "#0B1215",
          }}>
          <ModalClose id='close-icon' sx={{ padding: "14px" }} />
        </Box>
        <List
          size='lg'
          component='nav'
          sx={{
            flex: "none",
            fontSize: "sm",
            "& > div": { paddingLeft: "40px" },

            color: "rgba(224, 211, 218, 0.26)",
          }}>
          <ListItemButton
            onClick={handleToggleMediaView}
            sx={{
              paddingTop: "40px",
              fontSize: "16px",

              "&:hover": {
                backgroundColor: "transparent",
              },
            }}>
            {toggleMedia === "movies" ? (
              <>
                <LiveTvOutlinedIcon />
                <span className='pt-[2px]'> Search for Shows</span>
              </>
            ) : (
              <>
                <MovieOutlinedIcon />
                <span className='pt-[2px]'> Search for Movies</span>
              </>
            )}
          </ListItemButton>

          <ListItemButton
            onClick={handleShowMedia}
            sx={{
              paddingTop: "10px",
              fontSize: "16px",
              color: "rgba(224, 211, 218, 0.26)",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}>
            {screenState === "userMedia" ? (
              <div>
                <SearchTwoToneIcon /> Search{" "}
              </div>
            ) : (
              <div>
                <BookmarkBorderTwoToneIcon /> My list
              </div>
            )}
          </ListItemButton>

          <ListItemButton
            onClick={handleShowRecommendations}
            sx={{
              paddingTop: "10px",
              fontSize: "16px",
              color: "rgba(224, 211, 218, 0.26)",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}>
            <AutoFixHighOutlinedIcon /> My Recommendations
          </ListItemButton>

          <ListItemButton
            sx={{
              paddingTop: "10px",
              fontSize: "16px",
              color: "rgba(224, 211, 218, 0.26)",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}>
            <InfoOutlinedIcon /> Info
          </ListItemButton>
        </List>
      </Drawer>
    </React.Fragment>
  );
}
