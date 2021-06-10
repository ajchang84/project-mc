import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Widgets } from "@material-ui/icons";
import BlocksViewer from "./BlocksViewer";
import React from "react";

function App() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography>Minecraft</Typography>
          <Button onClick={handleClickOpen}>
            <Widgets />
          </Button>
        </Toolbar>
      </AppBar>
      <Container style={{ textAlign: "center", padding: 100 }}>
        <Button>Start Game</Button>
      </Container>
      <BlocksViewer open={open} onClose={handleClose} />
    </>
  );
}

export default App;
