import { createContext, useEffect, useState } from "react";
import { addDoc, getAllDocs, addBulk, getDoc } from "../db/pouchUtils";
import moment from "moment";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(true);
    const [categories, setCategories] = useState([]);
    const [activeCategoryID, setActiveCategoryID] = useState(null);
    const [isNLMVisible, setIsNLMVisible] = useState(false); // NLM = New List Modal

    const toggleDark = () => {
        setIsDark(prev => !prev);
    };

    const updateCategs = () => {
        getAllDocs().then(res => {
            setCategories(res.sort((a, b) => moment(a.dateTimeCreated) - moment(b.dateTimeCreated)));
        });
    };

    useEffect(() => {
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