import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../hooks/useGlobalContext";
import { getDoc, destroyDB, addTask, getAllDocs } from "../../db/pouchUtils";

const MainContent = () => {

    const { categories, activeCategoryID, isDark, updateCategs } = useContext(GlobalContext);
    const [activeCateg, setActiveCateg] = useState();

    const updateTasks = () => {
        if (categories.length > 0) {
            const categ = Array.from(categories).filter(category => category._id === String(activeCategoryID))[0];
            setActiveCateg(categ);
        }
    }

    useEffect(() => {
        updateTasks();
    }, [activeCategoryID]);

    const handleAddTask = () => {
        addTask(activeCateg._id, activeCateg._rev, 'Task 123')
            .then(res => {
                updateTasks();
                updateCategs();
            })
            .catch(err => console.log(err));
    };

    return (
        <div id="main-content" className={`w-full overflow-y-hidden relative ${isDark ? 'bg-color2' : 'bg-white'}`}>
            <div className="p-5">{activeCateg && <h1 className="m-auto text-4xl font-semi-bold">{activeCateg.name}</h1>}</div>
            <div className="w-full h-[90%] flex relative">


                {
                    activeCateg && <div className="w-full max-w-full h-fit max-h-full p-3 absolute left-0 top-0 flex flex-col box-border overflow-x-hidden overflow-y-auto">
                        {
                            activeCateg.tasks.reverse().map(task => (
                                <h4 className="flex flex-grow w-full h-10 bg-gray-900 m-1 p-10 justify-center items-center rounded-md">{task}</h4>
                            ))
                        }
                    </div>
                }
            </div>

            {
                activeCateg && <div
                    onClick={handleAddTask}
                    className="absolute bottom-10 right-10 bg-green-500 hover:bg-green-600 rounded-full w-16 h-16 flex justify-center items-center cursor-pointer"
                >
                    <span className="text-4xl -translate-y-1">+</span>
                </div>
            }

        </div>
    );
}

export default MainContent;