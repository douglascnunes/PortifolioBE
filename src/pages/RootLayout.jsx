import { Outlet } from 'react-router-dom';
import MainNavBar from '../components/common/MainNavBar';

import styles from './RootLayout.module.css';


function RootLayout() {
  return (
    <>
      <MainNavBar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  )
};


export default RootLayout;