import React from 'react';
import { Link } from 'react-router-dom';

function Index(props) {
  console.log(props);
  return (
    <div>
      <div className="bc-pd-14 bc-t-c">
        Home Index
      </div>

      <div className="bc-t-c">
        <Link to="/components" className="bc-pd-10">
          link to Components
        </Link>
      </div>
    </div>
  );
}

export default Index;