import { useContext, useEffect, useRef, useState } from "react";
import { getDoc, addTask } from "../../../db/pouchUtils";
import { GlobalContext } from "../../../hooks/useGlobalContext";

const NewTaskModal = ({ setIsNewTaskForm, activeCategoryID, categoryName }) => {

    const [isSaving, setIsSaving] = useState(false);
    const formRef = useRef(null);

    const { updateDataRender } = useContext(GlobalContext);

    useEffect(() => {
        const handleClickOutside = e => {
            if (formRef.current && !formRef.current.contains(e.target)) {
                setIsNewTaskForm(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const styles = {
        input: "h-10 my-2 text-white bg-baseColor box-border p-3 focus:outline outline-emerald-800"
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const title = e.target.elements['task-title'].value;
        const detail = e.target.elements['task-detail'].value;
        const due = e.target.elements['task-due'].value;



        const newTaskObj = { title: title, detail: detail, due: due };

        setIsSaving(true);
        getDoc(activeCategoryID).then(doc => {
            addTask(activeCategoryID, doc._rev, newTaskObj)
                .then(res => {
                    setIsSaving(false);
                    updateDataRender();
                })
                .then(res => {
                    setIsNewTaskForm(false);
                });
        })
    };

    return (
        <div
            className="fixed left-0 top-0 w-full h-full bg-[rgba(0,0,0,.6)] flex items-center justify-center overflow-hidden"
        >
            <div
                ref={formRef}
                className="w-[30%] min-w-[350px] h-fit pb-5 rounded-lg bg-color2 flex flex-col justify-center items-center"
            >
                <div className="bg-emerald-700 h-10 flex items-center w-full pl-4 box-border mb-5">{categoryName}</div>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-center w-[90%] h-full"
                >
                    <div className="w-full flex flex-col my-3">
                        <label htmlFor="task-title">Title:</label>
                        <input name="task-title" className={styles.input} required />
                    </div>
                    <div className="w-full flex flex-col my-3">
                        <label htmlFor="task-detail">Detail:</label>
                        <textarea name="task-detail" className="bg-baseColor my-2 p-3 h-fit min-h-[150px] resize-none overflow-y-auto focus:outline outline-emerald-800" />
                    </div>
                    <div className="w-full flex flex-col my-3">
                        <label htmlFor="task-due">Due Date:</label>
                        <input name="task-due" className="my-1 w-fit bg-baseColor px-3 focus:outline outline-emerald-800" type="date"
                        />
                    </div>

                    <div className="w-full h-10 mt-10 flex justify-end">
                        <button className="w-28  hover:bg-red-500 border-opacity-100 hover:border-opacity-0 rounded-md" onClick={() => setIsNewTaskForm(false)}>Cancel</button>
                        {
                            !isSaving ? <button className="bg-emerald-600 hover:bg-emerald-700 w-28 ml-2 rounded-md" type="submit">Save</button>
                                :
                                <div className="w-28 flex justify-center items-center">
                                    <img className="w-5 h-5" src="/images/gif/loading-gif.gif" />
                                </div>
                        }
                    </div>
                </form>

            </div>
        </div>
    );
}

export default NewTaskModal;