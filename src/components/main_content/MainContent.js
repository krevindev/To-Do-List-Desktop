import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../hooks/useGlobalContext";
import { getDoc } from "../../db/pouchUtils";

const MainContent = () => {

    const { categories, activeCategoryID, isDark, toggleDark } = useContext(GlobalContext);
    const [title, setTitle] = useState(undefined);

    useEffect(() => {
        if (categories.length > 0) {
            const newTitle = Array.from(categories).filter(category => category._id === String(activeCategoryID))[0].name;
            setTitle(newTitle);
        }
    }, [activeCategoryID]);


    useEffect(() => {
        console.log(title)
    }, [title]);

    return (
        <div id="main-content" className={`w-full flex justify-center items-center relative ${isDark ? 'bg-color2' : 'bg-white'}`}>
            {
                title ? <h1>{title}</h1> : <div className="flex flex-col items-center">
                    <img className=" w-11" src="/images/icons/stack-icon.svg" />
                    <h3>Add Task</h3>
                </div>
            }
            <div className="absolute bottom-10 right-10 bg-green-500 hover:bg-green-600 rounded-full w-16 h-16 flex justify-center items-center cursor-pointer">
                <span className="text-4xl -translate-y-1">+</span>
            </div>
        </div>
    );
}

export default MainContent;