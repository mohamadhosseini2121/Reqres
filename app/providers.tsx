'use client';
import React, {FC} from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

if (typeof window !== 'undefined') {
  require('bootstrap/dist/js/bootstrap');
}

type props = {
  children: React.ReactNode;
};

const Providers: FC<props> = (props) => {
  return (
    <>
      <ToastContainer />
      {props.children}
    </>
  );
};
export default Providers;
