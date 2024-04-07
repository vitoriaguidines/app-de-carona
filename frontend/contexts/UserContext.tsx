import React, {createContext, ReactNode, useContext, useState} from "react";


const UserContext = createContext<UserContextData | null>(null);

interface UserContextData {
    //Data
    token: string | null,
    isLoggedIn: boolean,
    //Functions
    setToken: (newToken: string) => void,
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
        isLoggedIn: false,
        setToken: (newToken: string) => {
            setContextValues((prevContext) => ({
                ...prevContext,
                token: newToken,
            }));
        },
        setIsLoggedIn: (isLoggedIn: boolean) => {
            setContextValues((prevContext) => ({
                ...prevContext,
                isLoggedIn: isLoggedIn,
            }));
        }
    });

    return(
        <UserContext.Provider value={contextValues}>
            {children}
        </UserContext.Provider>
    )

}