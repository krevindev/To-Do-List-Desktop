import { useContext, useEffect } from 'react';
import './App.css';
import MainContent from './components/main_content/MainContent';
import SideBar from './components/sidebar/SideBar';
import { GlobalContext } from './hooks/useGlobalContext';
import NewListModal from './components/modals/new_list_modal/NewListModal';
import ModalContainer from './components/modals/ModalContainer';
import ConfirmDeleteModal from './components/modals/confirm_delete_modal/ConfirmDeleteModal';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SettingsContent from './components/settings_content/SettingsContent';

function App() {

  const { isModalVisible, setIsModalVisible, activeModal } = useContext(GlobalContext);

  useEffect(() => {
    document.addEventListener('contextmenu', e => e.preventDefault());
  }, []);

  return (
    <Router>
      <div id='app' className='h-screen flex items-stretch'>
        <SideBar />
        <Routes>
          <Route path='/' element={<MainContent />} />
          <Route path='/settings' element={<SettingsContent />} />
        </Routes>
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
      </div>
    </Router>
  );
}

export default App;
