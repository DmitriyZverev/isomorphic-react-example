import React from 'react';

import image from './image.png';
import styles from './App.css';

function App() {
  return (
    <div>
      <h1 className={styles.title}>Hello, world!</h1>
      <img src={image}/>
    </div>
  );
}

export default App;
