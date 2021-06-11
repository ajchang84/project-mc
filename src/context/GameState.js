import { createContext, useState, useContext } from "react";

const initialGameState = {
  state: 0,
};

const GameStateContext = createContext(undefined);

const GameStateProvider = ({ children }) => {
  const [gameState, setGameState] = useState(initialGameState);
  const handleGameState = (state) => {
    setGameState(state);
  };
  const data = [gameState, handleGameState];
  return (
    <GameStateContext.Provider value={data}>
      {children}
    </GameStateContext.Provider>
  );
};

const useGameState = () => {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error("useGameState can only be used inside GameStateProvider");
  }
  return context;
};

export { GameStateProvider, useGameState };
