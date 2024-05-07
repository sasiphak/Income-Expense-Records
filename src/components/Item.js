import '../components/Item.css'
import PropTypes from 'prop-types';
import DataContext from '../data/DataContext';
import { useContext } from 'react';



// Dynamic data
const Item = (props) => {
    const {title,amount} = props

    // แสดงสถานะการเงินที่เก็บเข้ามา  / ? : คือคำสั่งที่จะทำงานเมื่อเงื่อนไขเป็นจริง ข้างหน้าเป็นจริง ข้างหลังเป็นเท็จ
    const Status = amount < 0 ? "expense" : "income"

    // เก็บสัญลักษณ์หน้าตัวเลข Math.abs(amount) => คือการทำให้ค่าติดลบ เป็นค่าบวก
    const symbol =  amount < 0 ? "-" : "+"

    // เรียกมาเลย ใช้แบบ Hook
    // const name = useContext(DataContext);

      //ฟังก์ชั่นแปลงรูปแบบตัวเลข
      const formatNumber=(num)=> {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
return ( 
        <li className={Status}>{title} <span> {symbol} {formatNumber(Math.abs(amount))}  </span>
        
        {/* {name} */}

        {/* <DataContext.Consumer>
         {value=><p>{value}</p>}
      </DataContext.Consumer> */}
        </li>
    );
}

Item.propTypes = {
    title: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired
}

export default Item;