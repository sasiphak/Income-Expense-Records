import Transaction from "./components/Transaction";
import "./App.css";
import FormComponent from "./components/FormComponent";
import { useState, useEffect, useReducer } from "react";
import DataContext from "./data/DataContext";
import ReportComponent from "./components/ReportComponent";
import { element } from "prop-types";
import Item from "./components/Item";
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link,
} from "react-router-dom";

// const Title = () => <h1>โปรแกรมบัญชีรายรับ - รายจ่าย</h1>
// const Desc = () => <p>บันทึกข้อมูลบัญชีในแต่ละวัน</p>

// const Item = () => <li> ค่าเดินทาง <span>200</span></li>

// ถ้ามีค่าหลายค่าให้ return
// const Transaction = () => {
//   return (
//   <ul>
//       <Item/>
//       <Item/>
//       <Item/>
//     </ul>
//   );
// }

function App() {
  const design = { color: "#5e412f", textAlign: "center", fontSize: "1.5rem" };

  // init กำหนดค่าเริ่มต้น (initialize) ให้กับตัวแปรและอ็อบเจ็กต์ (object)
  const initdata = [
    { id: 1, title: "ค่ารักษาพยาบาล", amount: -2000 },
    { id: 2, title: "ค่าหอ", amount: -5500 },
    { id: 3, title: "ค่าน้ำมัน", amount: -300 },
    { id: 4, title: "เงินเดือน", amount: 18550 },
  ];

  // state นี้ กำหนดค่าเริ่มต้น ใช่ค่าเดียวกับ initdata // เอา initdata ออก ให้เป็น useState([]) => คือ Array เปล่า ก็จะไม่มีข้อมูลเริ่มต้นแสดงโชว์ที่หน้า form
  const [items, setIems] = useState(initdata);

  const [reportIncome, setreportIncome] = useState(0);
  const [reportExpense, setreportExpense] = useState(0);

  const onAddNewItem = (newItem) => {
    // console.log("ข้อมูลที่ส่งมาจาก Form Component =" , newItem);

    //ใช้เมื่อตอนมีการเปลี่ยนแปลงค่าข้อมูลข้างใน state
    setIems((prevItem) => {
      // ข้อมูลที่ส่งมาล่าสุดจากฟอร์มจะมาอยู่บนสุด เลยระบุ newItem ไว้ด้านหน้า
      return [newItem, ...prevItem];
    });
  };

  // คำสั่งที่ดึงเอาตัวเลขใน state items เอาแค่จำนวนเงินมาทำงาน
  useEffect(() => {
    const amounts = items.map((items) => items.amount); // map เข้าถึงตัว items amount ได้ค่าข้อมูลทั้งหมดเก็บใน array amounts
    // console.log(amounts)

    const income = amounts
      .filter((element) => element > 0)
      .reduce((total, element) => (total += element), 0); //การกรองข้อมูลที่อยู่ใน arr amounts เก็บจำนวนเงินที่มีค่ามากกว่า 0 เก็บใน income // reduce เอามาคำนวณ
    console.log("ยอดรายได้ =", income);

    const expense =
      amounts
        .filter((element) => element < 0)
        .reduce((total, element) => (total += element), 0) * -1; // การกรองรายจ่าย ยอดรวมรายจ่ายจะมีติดลบ เลย*-1 ไม่ให้ติดลบ
    console.log("ยอดรายจ่าย =", expense);

    // set ค่าใหม่ tofixed คือทศนิยม 2 ตำแหน่ง
    setreportIncome(income.toFixed(2));
    setreportExpense(expense.toFixed(2));
  }, [items, reportIncome, reportExpense]);

  ///////// Reducer state ///////////

  // const [showReport, setShowReport] = useState(false);

  // const reducer = (state, action) => {
  //   switch (action.type) {
  //     case "SHOW":
  //       return setShowReport(true) //อย่าลืม payload ตรง switch ด้วย
  //     case "HIDE":
  //       return setShowReport(false)
  //     // case "CLEAR":
  //     //   return 0;
  //   }
  // };

  // const [result, dispatch] = useReducer(reducer, showReport);

  // const [count, setCount] = useState(0);
  // const reducer = (state, action) => {
  //   switch (action.type) {
  //     case "ADD":
  //       return state + action.payload; //อย่าลืม payload ตรง switch ด้วย
  //     case "SUB":
  //       return state - action.payload;
  //     // case "CLEAR":
  //     //   return 0;
  //   }
  // };

  // dispatch ส่วนของการเรียกใช้ Reducer เรียก action
  // const [result, dispatch] = useReducer(reducer, count);

  // Provider พ่อครัว ตรงส่วน App.js มีการสร้างข้อมูลกลางมาแล้ว
  return (
    <DataContext.Provider
      value={{
        income: reportIncome,
        expense: reportExpense,
      }}
    >
      <div className="container">
        <h1 style={design}>แอพบัญชีรายรับ - รายจ่าย</h1>
        <Router>
          <div>
            <ul className="horizontal-menu">
              <li>
                {/* แสดงผลที่หน้าแรก / */}
                <Link to="/">ข้อมูลบัญชี</Link>
              </li>
              <li>
                <Link to="/insert">บันทึกข้อมูล</Link>
              </li>
            </ul>

            {/* link แล้วต้องมา routesแทน switch // route path กำหนด component ด้วย */}
             <Routes>
              <Route path="/" element={<ReportComponent />} />
              <Route
                path="/insert"
                element={
                  <div>
                    <FormComponent onAddItem={onAddNewItem} />
                    <Transaction items={items} />
                  </div>
                }
              />
            </Routes>
          </div>
        </Router>

        {/* {showReport && <ReportComponent/>} */}
        {/* <ReportComponent />
        <FormComponent onAddItem={onAddNewItem} />
        <Transaction items={items} /> */}
        {/* <h1>{result}</h1>

          <button onClick={() => dispatch({ type: "SHOW"})}>
            แสดง
          </button>
          <button onClick={() => dispatch({ type: "HIDE"})}>
            ซ่อน
          </button> */}

        {/* ใส่ dispatch type add จะไปเรียกใช้ action add แล้วเก็บในตัวแปร result */}
        {/* ถ้าต้องการให้เพิ่มขึ้นทีละ 10 ลดลงทีละ 5 ให้ใส่ payload  */}
        {/* <button onClick={() => dispatch({ type: "ADD", payload: 10 })}>
            เพิ่ม
          </button>
          <button onClick={() => dispatch({ type: "SUB", payload: 5 })}>
            ลด
          </button> */}
        {/* <button onClick={() => dispatch({ type: "CLEAR" })}>
            ล้างข้อมูล
          </button> */}
      </div>
    </DataContext.Provider>
  );
}

export default App;
