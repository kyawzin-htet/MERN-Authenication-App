
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import toast,{ Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidate } from "../helper/Validate";
import convertToBase64 from "../helper/convert";
import { registerUser } from "../helper/helper";

const Register = () => {

  const [file, setFile] = useState()
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues:{
      email: '',
      username: '',
      password: ''
    },
    validate: registerValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values =>{
      values = await Object.assign(values, {profile: file || ''})
      console.log(values)
      let registerPromise = registerUser(values)
      toast.promise(registerPromise, {
        loading: 'Creating...',
        success: <b>Register success</b>,
        error: <b>Could not Register.</b>
      });
      registerPromise.then(function(){ navigate('/')})
    }
  })

  const onUpload = async e =>{
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64)
  }
  
  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-2xl font-bold'>Register</h4>
          </div>

          <form className='py-0' 
            onSubmit={formik.handleSubmit}
            >
              <div className='profile flex justify-center py-1'>
                  <label htmlFor="profile">
                      <img src={file || avatar} className={styles.profile_img} alt="avatar" />
                  </label>
                  <input type="file" id="profile" name="profile" onChange={onUpload} />
              </div>

              <div className="textbox flex flex-col items-center gap-6 py-6">
                  <input 
                    {...formik.getFieldProps('email')} 
                    className={styles.textbox} type="text" placeholder='Email*' />
                    <input 
                    {...formik.getFieldProps('username')} 
                    className={styles.textbox} type="text" placeholder='Username*' />
                    <input 
                    {...formik.getFieldProps('password')} 
                    className={styles.textbox} type="password" placeholder='Password' />
                  <button className={styles.btn} type='submit'>Register</button>
              </div>

             

          </form>
          <div className="text-center py-5">
                <span className='text-gray-500'>Already register? <Link className='text-green-500' to="/">Login</Link></span>
              </div>

        </div>
      </div>
    </div>
  );
};

export default Register;
