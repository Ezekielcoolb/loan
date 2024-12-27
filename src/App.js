
import './App.css';
import Routess from "./Routes";
import { Toaster } from 'react-hot-toast';
import { AppProvider } from "./Context/Context";
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
    <AppProvider>
    <Toaster position='top-right'/>
    <div className="App">
     <BrowserRouter>
      <Routess />
     </BrowserRouter>
    
    </div>
    </AppProvider>
    </>
  );
}

export default App;
