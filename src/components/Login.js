import { Button } from "@mui/base";
import { useDispatch, useSelector } from "react-redux";
// import logo from "../assets/images/monica.png";
import { LOGIN_URL } from "../redux/Urls";
import "./css/Login.css";

function Login() {
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state);
  const handleLogin = ()=>{
dispatch()
  }
  return (
    <div className="app-container">
      <a href={LOGIN_URL} className="google-login-button">
        <span className="google-login-button__icon"></span>
        <span className="google-login-button__text">Login with Google</span>
      </a>
    </div >
  );
}

export default Login;
