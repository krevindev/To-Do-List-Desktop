import { useContext } from "react";
import { GlobalContext } from "../../hooks/useGlobalContext";

const MainContent = () => {

    const { categories, activeCategoryIndex, isDark, toggleDark } = useContext(GlobalContext);

    return (
        <div id="main-content" className={`w-full flex justify-center items-center relative ${isDark ? 'bg-baseColor' : 'bg-white'}`}>
            <h1>{categories[activeCategoryIndex].name}</h1>

            <div className="absolute bottom-10 right-10 bg-green-500 hover:bg-green-600 rounded-full w-16 h-16 flex justify-center items-center cursor-pointer">
                <span className="text-4xl -translate-y-1">+</span>
            </div>
        </div>
    );
}

export default MainContent;