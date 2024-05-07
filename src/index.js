import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import HelloComponent from './components/HelloComponent';

// ตอนติดตั้งครั้งแรกเขียนแบบนี้มาให้ มันยาว 
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//  <h1>Hello World</h1>
// );

// const data = ( 
//   <h1> สวัสดี React</h1>
// )

// ReactDOM.render(data,document.getElementById('root'));


/// สามารถเขียนรวบแบบสั้นๆได้ 
///  แทรก  tag html ได้ ถ้าใช้ ReactDOM คือ render ให้ใช้กับ Javascript ได้ 
// ReactDOM.render(<h1>Hello React</h1>,document.getElementById('root'));

// การสร้าง Component
// function HelloComponent(){
//   return <h1> Hello Component</h1>
// }

// ReactDOM.render(<HelloComponent/>,document.getElementById('root'));

// การสร้าง Class Component 
// class HelloComponent extends React.Component{
//   render(){
//     return <h1> Hello Class Component</h1>
//   }

  
// }

// ReactDOM.render(<HelloComponent/>,document.getElementById('root'));


// การสร้าง External Component 
// ต้องมีการ import path ของ component มาด้วย
// ReactDOM.render(<HelloComponent/>,document.getElementById('root'));


ReactDOM.render(<App/>,document.getElementById('root'));

reportWebVitals();
