import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { saveProfile } from '../redux/slice/authSlice';


const LoginSuccess = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const name = queryParams.get('name');
    const email = queryParams.get('email');
    dispatch(saveProfile({ id, name, email }));

    navigate('/dashboard')
  },);



};

export default LoginSuccess;
