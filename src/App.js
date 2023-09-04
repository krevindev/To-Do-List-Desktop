import { useContext } from 'react';
import './App.css';
import MainContent from './components/main_content/MainContent';
import SideBar from './components/sidebar/SideBar';
import { GlobalContext } from './hooks/useGlobalContext';
import NewListModal from './components/modals/new_list_modal/NewListModal';
import ModalContainer from './components/modals/ModalContainer';
import ConfirmDeleteModal from './components/modals/confirm_delete_modal/ConfirmDeleteModal';
import DestroyDBButton from './components/dev/DestroyDBButton';

function App() {

  const { isModalVisible, setIsModalVisible, activeModal } = useContext(GlobalContext);

  return (
    <div id='app' className='h-screen flex items-stretch'>
      <SideBar />
      <MainContent />
      {
        isModalVisible && <ModalContainer setIsModalVisible={setIsModalVisible}>
          {
            activeModal == 'new-categ-modal' ? <NewListModal /> : activeModal == 'confirm-delete-modal' ? <ConfirmDeleteModal /> :
              <></>
          }
        </ModalContainer>
      }

      {
        // isModalVisible && <NewListModal setIsModalVisible={setIsModalVisible} />
      }
      <DestroyDBButton/>
    </div>
  );
}

export default App;
