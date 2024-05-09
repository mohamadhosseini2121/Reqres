'use client';
import React, {FC, useRef} from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {makeStore, AppStore} from '@/lib/store';
import {Provider} from 'react-redux';

if (typeof window !== 'undefined') {
  require('bootstrap/dist/js/bootstrap');
}

type props = {
  children: React.ReactNode;
};

const Providers: FC<props> = (props) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <ToastContainer />
      {props.children}
    </Provider>
  );
};
export default Providers;
