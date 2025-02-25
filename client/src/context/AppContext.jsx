import { createContext, useState } from "react";
import {useAuth} from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({children}) =>{

    const [credit, setCredit] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    console.log(backendUrl);

    const { getToken } = useAuth();


    const loadCreditsData = async () => {
        try {
            const token = await getToken();
            console.log("Auth Token:", token); // Debugging token
    
            if (!token) {
                throw new Error("No authentication token found. Please log in.");
            }
    
            const { data } = await axios.get(`${backendUrl}/api/user/credits`, {headers:{token}});
    
            if (data.success) {
                setCredit(data.credits)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)

        }
    };
    
    const value = {
        credit, 
        setCredit, 
        loadCreditsData,
        backendUrl
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}


export default AppContextProvider;