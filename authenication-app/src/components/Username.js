import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from "../helper/Validate";
import {useAuthStore} from "../store/store";

const Username = () => {

  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);

  // useEffect(() =>{
  //   console.log(username)
  // })
  const formik = useFormik({
    initialValues:{
      username: ''
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values =>{
      console.log("values", values)
      setUsername(values.username);
      navigate('/password')
    }
  })
  
  return (
    <div className="container mx-auto">

      <Toaster position='top-right' reverseOrder={false} className={styles.toaster}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-2xl font-bold'>Hello Again!</h4>
          </div>

          <form className='py-0' 
            onSubmit={formik.handleSubmit}
            >
              <div className='profile flex justify-center py-1'>
                  <img src={avatar} className={styles.profile_img} alt="avatar" />
              </div>

              <div className="textbox flex flex-col items-center gap-6 py-6">
                  <input 
                    {...formik.getFieldProps('username')} 
                    className={styles.textbox} type="text" placeholder='Username' />
                  <button className={styles.btn} type='submit'>Let's Go</button>
              </div>

              <div className="text-center py-10">
                <span className='text-gray-500'>Not a Member <Link className='text-green-500' to="/register">Register Now</Link></span>
              </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Username;
