import './new_list_modal/NewListModal';



const ModalContainer = ({ children, setIsModalVisible }) => {

    const handleClickOutside = e => {
        if (e.target.id == 'modal-container') {
            setIsModalVisible(false);
        }
    }

    return (
        <div
            id="modal-container"
            onClick={handleClickOutside}
            className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 flex justify-center items-center"
        >
            {children}
        </div>
    );
}

export default ModalContainer;