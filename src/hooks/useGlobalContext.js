import { createContext, useState } from "react";

export const GlobalContext = createContext();
const TaskCategs = [
    { name: 'Web Redesign', count: 10, isToday: false },
    { name: 'Shopping List', count: 10, isToday: true },
    { name: 'School', count: 10, isToday: false },
    { name: 'Test 102', count: 10, isToday: false },
    { name: 'Another List', count: 10, isToday: false },
];


export const GlobalContextProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(true);
    const [categories, setCategories] = useState(TaskCategs);
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
    const [isNLMVisible, setIsNLMVisible] = useState(false); // NLM = New List Modal

    const addCategory = (newCategory) => {
        setCategories(prev => [...prev, newCategory]);
    }
    const removeCategory = (targetIndex) => {
        setCategories(categories.filter((_, index) => index !== targetIndex));
    }

    const toggleDark = () => {
        setIsDark(prev => !prev);
    };

    return (
        <GlobalContext.Provider value={
            {
                isDark,
                categories,
                activeCategoryIndex,
                isNLMVisible,
                toggleDark,
                addCategory,
                removeCategory,
                setActiveCategoryIndex,
                setIsNLMVisible
            }}>
            {children}
        </GlobalContext.Provider>
    )
};