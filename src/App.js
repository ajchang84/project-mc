import React from "react";
import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Widgets } from "@material-ui/icons";
import BlocksViewer from "./BlocksViewer";
import Board from "./components/Board";
import { useGameState } from "./context/GameState";

function App() {
  const [open, setOpen] = React.useState(false);
  const [gameState, handleGameState] = useGameState();
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
          <Typography>MC</Typography>
          <Button onClick={handleClickOpen}>
            <Widgets />
          </Button>
        </Toolbar>
      </AppBar>
      {gameState.state === 0 && (
        <Container style={{ textAlign: "center", padding: 100 }}>
          <Button onClick={() => handleGameState({ state: 1 })}>
            Start Game
          </Button>
        </Container>
      )}
      {gameState.state === 1 && <Board />}
      <BlocksViewer open={open} onClose={handleClose} />
    </>
  );
}

export default App;
