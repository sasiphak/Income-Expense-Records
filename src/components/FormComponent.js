import { useState, useEffect } from 'react';
import './FormComponent.css';
import { v4 as uuidv4 } from 'uuid'; // key id auto

const FormComponent = (props) => {

    // console.log("Render Form Component") // จะเกิดขึ้นเหมือน Form Component เปลี่ยนแปลง (ใส่ข้อใน form)
    //สร้าง state 
    const [title, setTitle] = useState(''); //title => ค่า useState('') ที่เรากำหนดใน () ส่วน setState จะเป็นการกำหนดค่าใหม่ให้
    const [amount, setAmount] = useState(0);
    const [formValid, setformValid] = useState(false); // เอามาเช็คปุ่มเพิ่มข้อมูล ดัก 

    const inputTitle = (event) => {
        setTitle(event.target.value) // ให้ค่าที่ส่งเข้ามาเก็บใน state ต้องใช้ setTitle เพราะเป็นค่าใหม่ จากนั้นจะนำมาถูกเก็บไว้ที่ state => title เป็นค่าใหม่
    }

    const inputAmount = (event) => {
        setAmount(event.target.value)
        // console.log(event.target.value) // แสดงค่าที่กรอกเข้ามาให้ดู 

    }

    const saveItem = (event) => {
        event.preventDefault() // ไม่ให้จอมันรีเฟรชใหม่ ข้อมูลจะได้แสดงผลให้เราดู
        // console.log("บันทึกข้อมูลเรียบร้อย")

        // obj นี้เป็นตัวเก็บข้อมูลของ state title , amount ทำให้เก็บข้อมูลมาทั้งหมด ไม่ได้เก็บแยกกันแล้ว
        const itemData = {
            id: uuidv4(),
            title: title,
            amount: Number(amount) // ระบุเป็น number ตามที่เรา propType จากไฟล์ Item ที่เรากำหนดชนิดตัวแปรไว้ ถ้าไม่ใส่ไว้ ใน clg จะแสดงเป็น "500" string 
        }
        // console.log(itemData); //แสดงข้อมูลที่ส่งมาจาก itemdata

        props.onAddItem(itemData); 
        // เมื่อเรากดเพิ่มข้อมูลแล้ว ให้เคลียร์ค่าภายใน state ตรง hook component ค่าไม่ค้างข้อมูลเดิมที่ส่งไป จะรีเฟชใหม่เป็นค่าเริ่มต้น ข้อมูลเก็บใน state
        setTitle('');
        setAmount(0);
    }

    // จะถูกเรียกใช้ตลอด Re-Render เมื่อมีการเปลี่ยนแปลงค่าด้านในฟอร์ม state, props
    useEffect(()=>{

        // console.log("Call useEffect")


        // เช็ค title => เมื่อทำการลบช่องว่างทางด้านซ้ายด้านขวาเรียบร้อย มีความยาวมากกว่า 0 (ต้องไม่เป็นค่าว่าง)
        // เช็ค amount => มีค่าไม่ให้เท่ากับ 0 
        const checkData = title.trim().length > 0 && amount!==0
        
        // เงื่อนไขดัก amount แบบเดิม
        // if(amount !==0){
        //     setformValid(true) // จาก false => true เอาไปผูกกับปุ่มเพิ่มข้อมูลเพื่อดัก
        // }

        // ดักแบบ ค่าเป็น boolean
        // setFormValid(checkData)

        // ดักแบบ รวมตัวแปร 
        if(checkData){
            setformValid(true)
            
        }

    },[title, amount]) // ดักจับ Array State amount เมื่อมีกปป. clg จะขึ้น

    // value ใน tag คือการผูก state value ไว้ใน form ถ้า state เปลี่ยนข้อมูลที่อยู่ในแบบ form ก็จะเปลี่ยนไปด้วย => อันนี้คือให้ค่ามันว่างเหมือนตอนเริ่มต้นใน form

    // disabled={!formValid} คือ ปุ่มเพิ่มข้อมูลของเราจะสามารถกดได้ก็ต่อเมื่อค่าที่ป้อนเข้ามาใน state amount มีค่าไม่เท่ากับ เลข 0 
    return (
        <div>
            <form onSubmit={saveItem}>
                <div className="form-control">
                    <label>ชื่อรายการ</label>
                    <input type="text" placeholder="ระบุชื่อรายการของคุณ" onChange={inputTitle} value={title}/>
                </div>
                <div className="form-control">
                    <label>จำนวนเงิน</label>
                    <input type="number" placeholder="(+ รายรับ , - รายจ่าย)" onChange={inputAmount} value={amount}/>
                </div>
                <div>
                    <button type="submit" className="btn" disabled={!formValid}>เพิ่มข้อมูล</button> 
                </div>
            </form>
        </div>

    )

}

export default FormComponent;