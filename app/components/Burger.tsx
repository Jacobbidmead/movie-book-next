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
      <IconButton color="neutral" style={{ padding: "20px" }} onClick={() => setOpen(true)}>
        x
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
          <ModalClose id="close-icon" sx={{ padding: "14px" }} />
        </Box>
        <List
          size="lg"
          component="nav"
          sx={{
            flex: "none",
            fontSize: "xl",
            "& > div": { paddingLeft: "40px" },
            backgroundColor: "black",
          }}>
          <ListItemButton
            sx={{
              paddingTop: "50px",
              fontSize: "20px",
            }}></ListItemButton>

          <ListItemButton sx={{ paddingTop: "55px", fontSize: "20px" }}>
            <a
              href="https://github.com/Jacobbidmead"
              target="_blank"
              rel="noreferrer"
              className="burger-link">
              GitHub
            </a>
          </ListItemButton>
        </List>
      </Drawer>
    </React.Fragment>
  );
}
