import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import Hello from './page/Hello';
import Students from './page/P7';
import P8Tage from './page/P8';
import A1 from './page/A1';
import A2 from './page/A2';
import A7 from './page/A7';
import MyRouter from './router/MyRouter';
import { BrowserRouter } from 'react-router-dom';
import A8Login from './page/A8Login';
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <Students/> */}
    {/* <h1>hello</h1> */}
    {/* <P8Tage/> */}
    {/* <A1></A1> */}
    {/* <A2></A2> */}
    {/* <A7></A7> */}

    {/* To use a router, it needs to be placed inside a BrowserRouter.*/}
    {/* <BrowserRouter> */}
    <HashRouter>
    {/* Because we use lazy loading, we need suspense */}
    <Suspense fallback={<h3>Loading...</h3>}>
      <MyRouter></MyRouter>
    </Suspense>
    </HashRouter>
      
    {/* </BrowserRouter> */}
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// import React, { Suspense } from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// // import Hello from './page/Hello';
// import Students from './page/P7';
// import P8Tage from './page/P8';
// import A1 from './page/A1';
// import A2 from './page/A2';
// import A7 from './page/A7';
// import MyRouter from './router/MyRouter';
// import { BrowserRouter } from 'react-router-dom';

// ReactDOM.render(
//   <React.StrictMode>
//     {/* <Students/> */}
//     {/* <h1>hello</h1> */}
//     {/* <P8Tage/> */}
//     {/* <A1></A1> */}
//     {/* <A2></A2> */}
//     {/* <A7></A7> */}

//     <BrowserRouter>
//       <Suspense fallback={<h3>Loading...</h3>}>
//         <MyRouter></MyRouter>
//       </Suspense>
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
