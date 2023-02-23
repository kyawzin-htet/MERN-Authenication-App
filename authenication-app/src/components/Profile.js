
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidate } from "../helper/Validate";
import convertToBase64 from "../helper/convert";
import useFetch from "../hooks/fetch.hook";
import { updateUser } from "../helper/helper";

const Profile = () => {

  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError}] = useFetch()

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues:{
      firstName: apiData?.firstName || '',
      lastName: apiData?.lastName || '',
      email: apiData?.email ||'',
      mobile: apiData?.mobile ||'',
      address: apiData?.address ||''
    },
    enableReinitialize: true,
    validate: profileValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values =>{
      values = await Object.assign(values, {profile: file || apiData?.profile || ''})
      let updatePromise = updateUser(values);
      toast.promise(updatePromise, {
        loading: 'Updating...',
        success: <b>Update Successfully</b>,
        error: <b>Could not update</b>
      });
      
    }
  })

  const onUpload = async e =>{
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64)
  }

  function userLogout(){
    localStorage.removeItem('token');
    navigate('/');
  }

  if(isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;

  if(serverError) return <h1 className="text-xl text-red-500">{serverError.message}</h1>
  
  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-2xl font-bold'>Profile</h4>
              <span className='text-1xl text-center text-gray-500'>
                Update your profile
            </span>
          </div>

          <form className='py-0' 
            onSubmit={formik.handleSubmit}
            >
              <div className='profile flex justify-center py-1'>
                  <label htmlFor="profile">
                      <img src={apiData?.profile || file || avatar} className={styles.profile_img} alt="avatar" />
                  </label>
                  <input type="file" id="profile" name="profile" onChange={onUpload} />
              </div>

              <div className="textbox flex flex-col items-center gap-6 py-6">
                <div className="name flex w-3/4 gap-10">
                    <input 
                    {...formik.getFieldProps('firstName')} 
                    className={styles.textbox} type="text" placeholder='Firstname' />
                    <input 
                    {...formik.getFieldProps('lastName')} 
                    className={styles.textbox} type="text" placeholder='Lastname' />
                </div>

                <div className="name flex w-3/4 gap-10">
                    <input 
                    {...formik.getFieldProps('mobile')} 
                    className={styles.textbox} type="text" placeholder='Mobile No' />
                    <input 
                    {...formik.getFieldProps('email')} 
                    className={styles.textbox} type="text" placeholder='Email' />
                </div>

                
                    <input 
                    {...formik.getFieldProps('address')} 
                    className={styles.textbox} type="text" placeholder='Address' />
                     <button className={styles.btn} type='submit'>Update</button>
                

                 
              </div>

              <div className="text-center py-10">
                <span className='text-gray-500'>
                  come back later? 
                  <Link onClick={userLogout} className='text-green-500' to="/">
                    Logout
                  </Link>
                </span>
              </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Profile;
