"use client";

import * as React from "react";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Drawer from "@mui/joy/Drawer";
import List from "@mui/joy/List";
import ListItemButton from "@mui/joy/ListItemButton";
import ModalClose from "@mui/joy/ModalClose";

export default function Burger() {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <IconButton color="neutral" onClick={() => setOpen(true)}>
        Burger
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
          }}>
          <ModalClose id="close-icon" sx={{ padding: "14px" }} />
        </Box>
        <List
          size="lg"
          component="nav"
          sx={{
            flex: "none",
            fontSize: "xl",
            "& > div": { paddingLeft: "40px" },
          }}>
          <ListItemButton
            sx={{
              paddingTop: "60px",
              fontSize: "20px",
            }}>
            Movies
          </ListItemButton>

          <ListItemButton sx={{ paddingTop: "10px", fontSize: "20px" }}>TV Shows</ListItemButton>
          <ListItemButton sx={{ paddingTop: "10px", fontSize: "20px" }}>My List</ListItemButton>
          <ListItemButton sx={{ paddingTop: "10px", fontSize: "20px" }}>
            My Recommendations
          </ListItemButton>
          <ListItemButton sx={{ paddingTop: "10px", fontSize: "20px" }}>Info</ListItemButton>
        </List>
      </Drawer>
    </React.Fragment>
  );
}