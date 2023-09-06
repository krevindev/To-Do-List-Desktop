import { useContext, useEffect, useRef, useState } from 'react';
import './SideBar.css';
import TaskCateg from './TaskCateg';

import { GlobalContext } from '../../hooks/useGlobalContext';
import ProfileMenu from '../profile_menu/ProfileMenu';

import UseAnimations from "react-useanimations";
import menu3 from 'react-useanimations/lib/menu3';

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
        displayModal
    } = useContext(GlobalContext);

    const [isProfileMenu, setIsProfileMenu] = useState(false);

    return (
        <aside
            className={`hidden sm:flex flex-col w-60 max-w-[60] max-h-screen items-stretch justify-stretch ${isDark ? 'bg-baseColor' : 'bg-slate-300'} box-border`}
        >

            <SideBarDiv className="flex-grow-0 flex items-center justify-between p-6 select-none">
                <div className="relative">
                    {/* <img className="cursor-pointer hover:brightness-150" src="/images/icons/menu-icon.svg" onClick={() => setIsProfileMenu(prev => !prev)} /> */}
                    <UseAnimations
                        reverse
                        key={isProfileMenu}
                        className="cursor-pointer"
                        size={35}
                        speed={1000}
                        animation={menu3}
                        strokeColor="gray"
                        autoplay={isProfileMenu}
                        onClick={() => setIsProfileMenu(prev => !prev)}
                        wrapperStyle={{ marginTop: '5px' }}
                    />                 {
                        isProfileMenu && <ProfileMenu
                            setIsProfileMenu={setIsProfileMenu} />
                    }
                </div>
                <div>
                    <img className=" w-7  cursor-not-allowed" src={`/images/icons/${isDark ? 'light' : 'dark'}-theme-icon.svg`} />
                </div>
            </SideBarDiv>
            <SideBarDiv className="h-1/4 flex-grow-[.1] p-3">
                <input className="rounded-md bg-color2 outline-none text-white p-2" type='Search' placeholder="Search" />
            </SideBarDiv>

            <SideBarDiv className="flex-grow-[.2] flex flex-col justify-end p-1 items-stretch border-b-[.1px] border-gray-700">
                {
                    categories.length > 0 && <div className='h-full flex justify-center items-center'><h5>No Deadlines Today</h5></div>
                }
                {

                }
            </SideBarDiv>

            <SideBarDiv className="flex-grow flex-col justify-start items-start overflow-y-auto overflow-x-hidden relative z-0">
                {
                    categories.length > 0 ?
                        <div className="w-full flex flex-col-reverse justify-start absolute top-0 p-1 z-30">
                            {
                                categories.map((task, index) => (
                                    <TaskCateg
                                        key={task._id}
                                        tasksLeft={task.tasks.length}
                                        progress={0}
                                        name={task.name}
                                        id={task._id}
                                        setActiveCategoryID={setActiveCategoryID}
                                        isActive={task._id === String(activeCategoryID)}
                                    />))
                            }
                        </div>
                        : <div className="bg-color2 h-[80%] w-[90%] flex flex-col items-center justify-center select-none">
                            <img className="w-[30%] pointer-events-none" src="/images/resting.svg" />
                            <h4 className='m-5 text-gray-400'>No Tasks</h4>
                        </div>
                }
            </SideBarDiv>

            <SideBarDiv className=" h-1/4 min-h-fit flex-grow-0 select-none relative" >
                {categories.length > 0 && <div className="absolute bottom-[100%] h-24 w-full bg-gradient-to-t from-baseColor to-[rgba(0,0,0,0)] pointer-events-none" />}
                <button
                    onClick={() => displayModal('new-categ-modal')}
                    className='w-full p-2 border text-white hover:text-black hover:bg-white duration-100 transition ease-in-out'>
                    Add Category
                </button>
            </SideBarDiv>

        </aside>
    );
};



export default SideBar;