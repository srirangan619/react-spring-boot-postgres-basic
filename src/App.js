import { DataProvider } from './GlobalState'
import { BrowserRouter } from 'react-router-dom'
import MainPages from './components/mainPages/Pages'


function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <div className="App">
          <MainPages />
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
