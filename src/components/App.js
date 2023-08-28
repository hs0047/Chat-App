import './css/App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import ErrorPage from './Error';
import Dashboard from './Dashboard';
import App2 from './testlogin';
import LoginSuccess from './LoginSuccess';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/Dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/login-success"
          element={<LoginSuccess />}
        />
        <Route
          path="/error-page"
          element={<ErrorPage />}
        />
        <Route
          path="/"
          element={<Login />}
          // element={<App2 />}
        />
        {/* <Route
                        path="/redirect"
                        element={ <Navigate to="/error-page" /> }
                    /> */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
