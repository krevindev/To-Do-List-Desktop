import { useEffect, useRef } from "react";
import styles from './ProfileMenu.module.css';
import { Link } from "react-router-dom";
import useClickOutside from "../../hooks/useClickOutside";


const ProfileBtn = ({ name, iconName, to, onClick }) => {
    return (
        <Link to={to} className={styles['profile-menu-item']} onClick={onClick}>
            <img src={`/images/icons/${iconName}.svg`} />
            <span>{name}</span>
        </Link>
    )
}

const ProfileMenu = ({ className, setIsProfileMenu }) => {
    const profileMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = e => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
                setIsProfileMenu(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    return (
        <div
            ref={profileMenuRef}
            id="profile-menu"
            className={`absolute top-[120%] h-fit w-fit min-w-[250px] border bg-color2 z-20 rounded-2xl flex flex-col items-center justify-start p-5` + className}
        >
            <div className="w-full h-10 flex items-center justify-end">
                <button
                    onClick={() => setIsProfileMenu(false)}
                    className="h-8 w-8 mr-2 p-2 hover:bg-baseColor rounded-full"
                >
                    <img className="h-[60%] m-auto" src="/images/icons/exit-icon.svg" />
                </button>
            </div>
            {/* <div className="w-full flex flex-col justify-center items-center">
                <div className="rounded-full bg-purple-400 w-11 h-11 flex items-center justify-center mb-3">
                    <h1 className="font-bold">K</h1>
                </div>
                <h1>Kyle Revin</h1>
            </div> */}
            <div className="w-full flex flex-col items-stretch m-3">
                <ProfileBtn name="Settings" iconName="settings-icon" to="/settings" onClick={() => setIsProfileMenu(false)} />
                {/* <ProfileBtn name="Sign Out" iconName="add-icon"/> */}
            </div>

        </div >
    );
}

export default ProfileMenu;