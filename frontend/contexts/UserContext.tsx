import React, {createContext, ReactNode, useContext, useState} from "react";
import {LocationObjectCoords} from "expo-location";


const UserContext = createContext<UserContextData | null>(null);

interface UserContextData {
    //Data
    token: string | null,
    userId: string | null,
    isLoggedIn: boolean,
    //Functions
    setToken: (newToken: string) => void,
    setUserId: (newUserId: string) => void,
    setIsLoggedIn: (isLoggedIn: boolean) => void,
}

interface  UserContextProviderProps{
    children: ReactNode;
}

export function useUserContext(){
    const context = useContext(UserContext);
    if (context === null) {
        throw new Error('useUserContext must be used within a UserContextProvider');
    }
    return context;
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [contextValues, setContextValues] = useState<UserContextData>({
        token: null,
        userId: null,
        isLoggedIn: true,
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

    return(
        <UserContext.Provider value={contextValues}>
            {children}
        </UserContext.Provider>
    )

}