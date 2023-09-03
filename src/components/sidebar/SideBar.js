import { useContext, useRef, useState } from 'react';
import './SideBar.css';
import TaskCateg from './TaskCateg';

import { GlobalContext } from '../../hooks/useGlobalContext';

const SideBarDiv = ({ children, className }) => {

    return (
        <div className={`sidebar-div h-14 p-1 flex justify-center items-center box-border ${className}`}>
            {children}
        </div>
    )
}

const SideBar = () => {

    const {
        isDark,
        toggleDark,
        categories,
        setActiveCategoryID,
        activeCategoryID,
        setIsNLMVisible
    } = useContext(GlobalContext);

    return (
        <aside className={`hidden sm:flex flex-col w-60 max-w-[60] max-h-screen items-stretch justify-stretch ${isDark ? 'bg-baseColor' : 'bg-slate-300'} box-border`}>

            <SideBarDiv className="flex-grow-0 flex items-center justify-between p-6">
                <img className="cursor-pointer" src="/images/icons/menu-icon.svg" />
                <img className="cursor-pointer w-7" src={`/images/icons/${isDark ? 'light' : 'dark'}-theme-icon.svg`} onClick={toggleDark} />
            </SideBarDiv>
            <SideBarDiv className="h-1/4 flex-grow-[.1] p-3">
                <input className="rounded-md bg-color2 outline-none text-white p-2" type='Search' placeholder="Search" />
            </SideBarDiv>

            <SideBarDiv className="flex-grow-[.2] flex flex-col justify-end p-1 items-stretch border-b-[.1px] border-color2">

            </SideBarDiv>

            <SideBarDiv className="flex-grow flex-col justify-start items-start overflow-y-auto overflow-x-hidden relative z-0">
                {
                    categories.length > 0 ?
                        <div className="w-full flex flex-col-reverse justify-start absolute top-0 p-1 z-30">
                            {
                                categories.map((task, index) => (
                                    <TaskCateg
                                        key={task._id}
                                        progress={task.progress}
                                        name={task.name}
                                        id={task._id}
                                        setActiveCategoryID={setActiveCategoryID}
                                        isActive={task._id === String(activeCategoryID)}
                                    />))
                            }
                        </div>
                        : <div className="bg-red-400 h-full w-full"><h4>Empty</h4></div>
                }
            </SideBarDiv>

            <SideBarDiv className=" h-1/4 min-h-fit flex-grow-0" >
                <button
                    onClick={() => setIsNLMVisible(prev => !prev)}
                    className='w-full p-2 border text-white hover:text-black hover:bg-white duration-100 transition ease-in-out'>
                    Add List
                </button>
            </SideBarDiv>


        </aside>
    );
};



export default SideBar;