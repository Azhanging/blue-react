import React from 'react';
import { Link } from 'react-router-dom';
import BrLayoutView from '@components/public/BrLayoutView';
import BrHeader from '$components/BrHeader';
import history from '@router';

function List() {
  const list = [];
  for (let i = 0; i < 30; i++) {
    list.push((
      <div className="bc-t-c bc-pd-50" key={i}>
        {i}
      </div>
    ));
  }

  return (
    <ul className="bc-reset-ul">
      {list}
    </ul>
  );
}

function Index(props) {
  console.log(history.location.query);
  return (
    <BrLayoutView routes={props.routes}>

      <BrHeader centerControl={{
        title: '首页'
      }}/>

      <div>
        <div className="bc-pd-14 bc-t-c">
          Home Index
        </div>

        <div className="bc-t-c bc-pd-tb-50">
          <Link to="/index-children" className="bc-pd-10">
            link to Index Children
          </Link>
        </div>

        <div className="bc-t-c bc-pd-tb-50">
          <Link to="/components" className="bc-pd-10">
            link to Components
          </Link>
        </div>

        <div className="bc-t-c bc-pd-tb-50">
          <Link to="/components/2/3" className="bc-pd-10">
            link to Components
          </Link>
        </div>

        <div className="bc-t-c bc-pd-10">
          <button type="button" className="bc-btn bc-btn-primary" onClick={(e) => {
            React.$antd.showLoading();
          }}>
            loading...
          </button>
        </div>
        <List/>
      </div>
    </BrLayoutView>
  );
}

export default Index;