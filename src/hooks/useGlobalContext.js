import { createContext, useEffect, useState } from "react";
import { addDoc, getAllDocs, addBulk, getDoc } from "../db/pouchUtils";

export const GlobalContext = createContext();
// const TaskCategs = [
//     { name: 'Web Redesign', count: 10, progress: 60 },
//     { name: 'Shopping List', count: 10, progress: 60 },
//     { name: 'School', count: 10, progress: 60 },
//     { name: 'Test 102', count: 10, progress: 60 },
//     { name: 'Another List', count: 10, progress: 80 },
// ];

// addBulk(TaskCategs).then(res => console.log(res)).catch(err => console.log(err));


export const GlobalContextProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(true);
    const [categories, setCategories] = useState([]);
    const [activeCategoryID, setActiveCategoryID] = useState(0);
    const [isNLMVisible, setIsNLMVisible] = useState(false); // NLM = New List Modal

    const toggleDark = () => {
        setIsDark(prev => !prev);
    };

    const updateCategs = () => {
        getAllDocs().then(res => {
            setCategories(res);
        });
    };

    useEffect(() => {
        // getDoc(String(activeCategoryID)).then(res => console.log(res.name));
    }, [activeCategoryID]);

    useEffect(() => {
        updateCategs();
    }, []);

    return (
        <GlobalContext.Provider value={
            {
                isDark,
                categories,
                activeCategoryID,
                isNLMVisible,
                toggleDark,
                setActiveCategoryID,
                setIsNLMVisible,
                updateCategs
            }}>
            {children}
        </GlobalContext.Provider>
    )
};