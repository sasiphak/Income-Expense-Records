import Item from "./Item";
import "../components/Transaction.css";
// import { v4 as uuidv4 } from 'uuid'; // key id auto
import DataContext from "../data/DataContext";
import { useContext } from "react";

const Transaction = (props) => {
  const { items } = props;


  // เรียกค่ามาเลย {name}
  // const name = useContext(DataContext)

  // const data = [
  //   {title: "ค่ารักษาพยาบาล", amount: 2000},
  //   {title: "ค่าหอ", amount: 5500},
  //   {title: "ค่าน้ำมัน", amount: 300},
  //   {title: "เงินเดือน", amount: 18550},

  // ]

  // Consumer แม่ค้า การรับข้อมูลกลางจากพ่อครัว Provider มาใช้
  return (
    <div>
      <ul className="item-list">
        {items.map((element) => {
          // return <Item title={element.title} amount={element.amount} />

          // แบบกระชับ Props & Spread Operator
          return <Item {...element} key={element.id} />;
        })}
      </ul>

     

      {/* {name} */}

      {/* <DataContext.Consumer>
         {value=><p>{value}</p>}
      </DataContext.Consumer> */}
    </div>
  );
};

export default Transaction;
