import React from 'react';
import ReactDOM from 'react-dom';
import { AppRouter } from '@router';
import * as serviceWorker from './serviceWorker';
import { useInReact } from '$use-in-react';

//使用全局scss
import '@assets/css/blue-component.scss';

useInReact(React);

ReactDOM.render(<AppRouter/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
