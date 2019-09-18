import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'antd-mobile';


//主App节点
function App(props) {

  const [animating, setAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimation(!animating);
    }, 2000);
  }, [animating]);

  return (
    <>
      {props.children}
      {/*loading*/}
      <button className="bc-btn" onClick={() => setAnimation(!animating)}>
        toggle animating
      </button>
      <ActivityIndicator toast text="loading" animating={animating}/>
    </>
  )
}

export default App;
