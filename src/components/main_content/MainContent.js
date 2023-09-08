import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../hooks/useGlobalContext";
import { getDoc, destroyDB, addTask, getAllDocs } from "../../db/pouchUtils";
import NewTaskModal from "../modals/new_task_modal/NewTaskModal";
import Task from "./Task";
import SideBar from "../sidebar/SideBar";

const MainContent = () => {

    const { categories, openedTasks, activeCategoryID, isDark, updateCategs } = useContext(GlobalContext);

    const [isNewTaskForm, setIsNewTaskForm] = useState(false);
    const [activeCateg, setActiveCateg] = useState();

    useEffect(() => {
        if (categories.length > 0) {
            const categ = Array.from(categories).filter(category => category._id === String(activeCategoryID))[0];
            setActiveCateg(categ);
            updateCategs();
        }
    }, [categories]);

    return (
        <div id="main-content" className={`w-full overflow-y-hidden relative ${isDark ? 'bg-color4' : 'bg-white'}`}>
            <div
                className=" sm:hidden bg-baseColor h-11 flex items-center box-border p-3"
            >
                <img className="h-[90%]" src="/images/icons/menu-icon.svg" />
            </div>
            <div className="p-5">{activeCateg && <h1 className="m-auto text-4xl font-semi-bold">{activeCateg.name}</h1>}</div>
            <div className="w-full h-[90%] flex relative">

                {
                    openedTasks && <div className="w-full max-w-full h-fit max-h-full p-3 absolute left-0 top-0 flex flex-col box-border overflow-x-hidden overflow-y-auto">
                        {
                            openedTasks.reverse().map(task => <Task task={task} />)
                        }
                    </div>
                }
            </div>

            {
                activeCategoryID && <div
                    // onClick={handleAddTask}
                    onClick={() => setIsNewTaskForm(true)}
                    className="absolute bottom-10 right-10 bg-green-500 hover:bg-green-600 rounded-full w-16 h-16 flex justify-center items-center cursor-pointer select-none"
                >
                    <span className="text-4xl -translate-y-1">+</span>
                </div>
            }
            {
                isNewTaskForm && <NewTaskModal setIsNewTaskForm={setIsNewTaskForm} activeCategoryID={activeCategoryID} categoryName={activeCateg.name} />
            }
        </div>
    );
}

export default MainContent;