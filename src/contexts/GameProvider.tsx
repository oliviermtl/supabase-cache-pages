import { useProperties } from "@/hooks/useProperties";
import { supabase } from "@/lib/supabase/fetch";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useReducer } from "react";

interface IGameContext {
  playerName: string;
  setPlayerName: (name: string) => void;
}

const GameContext = React.createContext<IGameContext | undefined>(undefined);

const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [playerName, setPlayerName] = React.useState<string>("");

  // Save player name in localstorage
  useEffect(() => {
    if (playerName) {
      localStorage.setItem("playerName", playerName);
    }
  }, [playerName]);

  // Load player name from localstorage
  useEffect(() => {
    const name = localStorage.getItem("playerName");
    if (name) {
      setPlayerName(name);
    }
  }, []);

  const { refetch } = useProperties();

  const handleChange = (payload: any) => {
    console.log("Change received!", payload);
    refetch();
  };

  useEffect(() => {
    const properties = supabase.channel("properties");

    properties
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "properties" },
        handleChange
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(properties);
    };
  }, []);

  return (
    <GameContext.Provider
      value={{
        playerName,
        setPlayerName,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

const useGame = (): IGameContext => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

export { GameProvider, useGame };
