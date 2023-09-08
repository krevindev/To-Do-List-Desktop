import moment from "moment";
import { useRef, useState, useEffect } from "react";

const Task = ({ task }) => {

    const [isOpened, setIsOpened] = useState(false);
    const detailRef = useRef(null);
    const taskRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = e => {
            if (detailRef.current && !detailRef.current.contains(e.target)) {
                setIsOpened(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div
            onClick={() => setIsOpened(prev => !prev)}
            onContextMenu={() => setIsOpened(prev => !prev)}
            className="task-component flex flex-grow flex-col w-full bg-color3 m-1 justify-center items-center rounded-md cursor-pointer z-0"
        >
            <div ref={taskRef} className="flex justify-between w-full p-5 ">
                <div className="flex items-center">
                    <div className={`w-3 h-3 mr-3 border rounded-full ${isOpened && 'bg-white'}`} />
                    <h2 className="text-xl">{task.title}</h2>
                </div>
                {
                    task.due ?
                        <p className="text-xs">{moment(task.due).format('MMM DD, YYYY')}</p>
                        : <p className="text-xs">No Due Date</p>
                }
            </div>
            {
                isOpened && <div
                    className=" w-full p-2 flex flex-col items-center justify-between z-10 cursor-default" ref={detailRef}
                >
                    <p className="w-full py-10 px-5 m-2 border">
                        {task.detail ? task.detail : <p className="flex justify-center">No Details</p>}
                    </p>
                    <div className="w-full h-10 flex justify-end p-2">
                        <button className="w-full flex items-center justify-between bg-blue-800">
                            <img className="h-full hover:saturate-200" src="/images/icons/delete-icon.svg" />
                            <img className="h-full hover:saturate-200" src="/images/icons/exit-icon.svg" />
                        </button>
                    </div>
                    <div>
                        <h3 onClick={() => setIsOpened(false)}>Close</h3>
                    </div>
                </div>
            }
        </div>
    );
}

export default Task;
