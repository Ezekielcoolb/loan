
import './App.css';
import Routess from "./Routes";
import { AppProvider } from "./Context/Context";
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
    <AppProvider>
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
