import { createContext, useState } from "react";
import {useAuth} from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({children}) =>{

    const [credit, setCredit] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    console.log(backendUrl);

    const {getToken} = useAuth();


    // const loadCreditsData = async() =>{
    //     try {
            
    //         const token = await getToken();
    //         const {data} = await axios.get(backendUrl+'/api/user/credits', {headers: {token}})
    //         if(data.success){
    //             setCredit(data.credits);
    //             console.log(data.credits);
    //         }

    //     } catch (error) {
    //         console.log(error);
    //         toast.error(error.message) 

    //     }
    // }

    const loadCreditsData = async () => {
        try {
            const token = await getToken();
            console.log("Auth Token:", token); // Debugging token
    
            if (!token) {
                throw new Error("No authentication token found. Please log in.");
            }
    
            const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            console.log("API Response Data:", data); // Debugging API response
    
            if (!data || !data.success) {
                throw new Error(data?.message || "Invalid response from server");
            }
    
            if (!data.creditsBalance) {
                throw new Error("Missing 'creditsBalance' field in API response");
            }
    
            setCredit(data.creditsBalance);
            console.log("Credits Balance:", data.creditsBalance);
        } catch (error) {
            console.error("Error fetching credits:", error);
            toast.error(error.response?.data?.message || error.message || "Something went wrong");
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