import { createContext, useEffect, useState } from "react";
import { addDoc, getAllDocs, addBulk, getDoc } from "../db/pouchUtils";
import moment from "moment";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(true);
    const [categories, setCategories] = useState([]);
    const [activeCategoryID, setActiveCategoryID] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false); // NLM = New List Modal
    const [activeModal, setActiveModal] = useState('');

    const toggleDark = () => {
        setIsDark(prev => !prev);
    };

    const updateCategs = () => {
        getAllDocs().then(res => {
            console.log(res);
            setCategories(res.sort((a, b) => moment(a.dateTimeCreated) - moment(b.dateTimeCreated)));
        });
    };

    const displayModal = (modalType) => {
        setActiveModal(modalType);
        setIsModalVisible(true);
    }

    useEffect(() => {
        updateCategs();
    }, []);

    return (
        <GlobalContext.Provider value={
            {
                isDark,
                categories,
                activeCategoryID,
                isModalVisible,
                activeModal,
                toggleDark,
                setActiveCategoryID,
                setIsModalVisible,
                updateCategs,
                setActiveModal,
                displayModal
            }}>
            {children}
        </GlobalContext.Provider>
    )
};