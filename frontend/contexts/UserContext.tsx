import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { getVehicles } from "@/services/UserServices";
import { Veiculo } from "@/types/types";

interface UserContextData {
  token: string | null;
  userId: string | null;
  isLoggedIn: boolean;
  userVehicles: Veiculo[];
  setToken: (newToken: string) => void;
  setUserId: (newUserId: string) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUserVehicles: (vehicles: Veiculo[]) => void;
  loadUserVehicles: () => Promise<void>;
}

const UserContext = createContext<UserContextData | null>(null);

interface UserContextProviderProps {
  children: ReactNode;
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
<<<<<<< HEAD
  const [userVehicles, setUserVehicles] = useState<Veiculo[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
=======
    const [contextValues, setContextValues] = useState<UserContextData>({
        token: null,
        userId: null,
        isLoggedIn: false,
        setToken: (newToken: string) => {
            setContextValues((prevContext) => ({
                ...prevContext,
                token: newToken,
            }));
        },
        setUserId: (newUserId: string) => {
            setContextValues((prevContext) => ({
                ...prevContext,
                userId: newUserId,
            }));
        },
        setIsLoggedIn: (isLoggedIn: boolean) => {
            setContextValues((prevContext) => ({
                ...prevContext,
                isLoggedIn: isLoggedIn,
            }));
        },
    });
>>>>>>> 6fdd0eea2d4b2804233c8c2ffc15d81d6c4822f9

  const loadUserVehicles = async () => {
    if (!userId) {
      console.error("User ID not found");
      return;
    }
    try {
      const vehicles = await getVehicles(userId);
      setUserVehicles(vehicles);
    } catch (error) {
      console.error("Error loading user vehicles:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      loadUserVehicles();
    }
  }, [userId]);

  return (
    <UserContext.Provider
      value={{
        token,
        userId,
        isLoggedIn,
        userVehicles,
        setToken,
        setUserId,
        setIsLoggedIn,
        setUserVehicles,
        loadUserVehicles,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
