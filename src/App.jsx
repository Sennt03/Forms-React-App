import { Route, Routes } from 'react-router-dom';
import { HomePage } from './modules/home';
import { FormPage } from './modules/formManagment';

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/form" element={<FormPage />} />
    </Routes>
  );
}

export default App
