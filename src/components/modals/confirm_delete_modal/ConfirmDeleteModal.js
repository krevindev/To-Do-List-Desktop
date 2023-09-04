const ConfirmDeleteModal = ({categName}) => {
    return (
        <div className="w-[40%] h-1/5 bg-color2">
            <h1>Are you sure you want to delete {categName}?</h1>
        </div>
    );
}

export default ConfirmDeleteModal;