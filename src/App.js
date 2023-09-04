import { useContext } from 'react';
import './App.css';
import MainContent from './components/main_content/MainContent';
import SideBar from './components/sidebar/SideBar';
import { GlobalContext } from './hooks/useGlobalContext';
import NewListModal from './components/modals/new_list_modal/NewListModal';

function App() {

  const {isNLMVisible, setIsNLMVisible} = useContext(GlobalContext);

  return (
    <div id='app' className='h-screen flex items-stretch'>
      <SideBar />
      <MainContent />


      {
        isNLMVisible && <NewListModal setIsNLMVisible={setIsNLMVisible} />
      }
    </div>
  );
}

export default App;
