import React from 'react';
//import { connect } from 'dva';
import styles from './Home.css';

class Home extends React.Component {
  render() {
    return (
      <div className={styles.normal}>
        <h1 className={styles.title}>Welcome to student-status!</h1>
        <div className={styles.welcome} />
      </div>
    );
  };  
}

export default Home;
