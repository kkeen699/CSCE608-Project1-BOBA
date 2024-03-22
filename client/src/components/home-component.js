import React, { useState, useEffect } from "react";
import FridgeService from "../services/fridge.service";
import IngrService from "../services/ingr.service";
import DatePicker from "react-datepicker";
import { Col, Container, Row } from "react-bootstrap";
import "./style.css";
import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
  return (
    <main>
      <Container className="py-5">
        <Row> 
          <h2> MY FRIDGE</h2>
          <hr/>
        </Row>
        <FridgeTable/>
      </Container>
    </main>
  );
};

const FridgeTable = () => {
  const today = new Date();
  const [fridge, setFridge] = useState([]);
  const [add, setAdd] = useState();

  const addItem = async (item) => {
    // FridgeService.addFridge(item)
    // .then(({data}) => {
    //   item.id = data.insertId;
    //   const new_fridge = [...fridge, item];
    //   setFridge(new_fridge);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
    const {data} = await FridgeService.addFridge(item);
    if(data){
      setAdd(data.insertId);
    }
  }

  const updateQty = (itemId, new_qty) => {
    const new_fridge = fridge.map(item => {
      if(item.id === itemId){
        item.qty = new_qty;
      } 
      return item;
    })
    setFridge(new_fridge);
    FridgeService.updateFridge(itemId, new_qty);
  }

  const deleteItem = (itemId) => {
    setFridge(fridge.filter(item => item.id !== itemId));
    FridgeService.deleteFridge(itemId);
  }

  useEffect(() => {
    FridgeService.getFridge()
    .then(({data}) => {
      setFridge(data);
    })
    .catch((err) => {
      console.log(err)
    });
  }, [add])

  return(
    <Container >
      <Row className="py-2">
        <Col md={2} as="h3">  </Col>
        <Col md={4} as="h3"> Ingredients </Col>
        <Col md={1} as="h3"> Qty </Col>
        <Col md={2} as="h3"> Date </Col>
        <Col md={2} as="h3"> EXP Date </Col>
      </Row>
      {fridge.map((item, idx) => 
        <FridgeItem key={idx} item={item} today={today} deleteItem={deleteItem} updateQty={updateQty}/>
      )}
      <NewRow addItem={addItem}/>
    </Container>
  )
}

const FridgeItem = ({item, today, deleteItem, updateQty}) => {
  const diffTime = new Date(item.exp_date) - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  let color = "";
  if(diffDays <= 0)
    color = "text-danger";
  else if(diffDays <= 3)
    color = "text-warning";

  return(
    <Row className={"py-1".concat(" ", color)} style={{"fontSize": "15pt"}}>
      <Col sm={2}> 
        <button className="btn btn-round" onClick={() => deleteItem(item.id)}>
          <i className="bi bi-x-lg"></i>
        </button>  
      </Col>
      <Col sm={4}> {item.name} </Col>
      <Col sm={1}> 
        <QtySelect qty={item.qty} itemId={item.id} updateQty={updateQty}/>
      </Col>
      <Col sm={2}> {item.date.substring(0,10)} </Col>
      <Col sm={2}> {item.exp_date.substring(0,10)} </Col>
    </Row>
  )
}

const QtySelect = ({qty, itemId, updateQty}) => {
  const handleChange = (e) => {
    const new_qty = parseInt(e.target.value);
    updateQty(itemId, new_qty);
  }
  const options = [];
  for(var i = 1; i <= 15; i++) {
    options.push({value: i, label: i});
  }
  return (
    <select value={qty} onChange={handleChange}>
      {options.map(({value, label}, idx) => (<option key={idx} value={value}> {label} </option>))}
    </select>
  )
};

const NewRow= ({addItem}) => {
  const [add, setAdd] = useState(false);
  const [ingrIdx, setIngrIdx] = useState('');
  const [qty, setQty] = useState(1);
  const [date, setDate] = useState(new Date());
  const [expDate, setExpDate] = useState(new Date());
  const [ingrs, setIngrs] = useState([]);

  const cancel = () => {
    setAdd(false);
    setIngrIdx('');
    setQty(1);
    setDate(new Date());
    setExpDate(new Date());
  }

  const save = () => {
    const offset = date.getTimezoneOffset();
    const newItem = {
      ingr: parseInt(ingrs[ingrIdx].id),
      name: ingrs[ingrIdx].name,
      qty: qty,
      date: new Date(date.getTime() - (offset*60*1000)).toISOString().substring(0,10),
      exp_date: new Date(expDate.getTime() - (offset*60*1000)).toISOString().substring(0,10)
    }
    addItem(newItem);
    cancel();
  }

  const handleSelect = (e) => {
    setIngrIdx(e.target.value);
    var exp = new Date(date);
    const ingr = ingrs[e.target.value];
    exp.setDate(exp.getDate() + ingr.exp);
    setExpDate(exp);
  }

  useEffect(() => {
    IngrService.getAll()
    .then(({data}) => {
      setIngrs(data);
    })
    .catch((err) => {
      console.log(err)
    });
  }, [])

  return(
    <Row className="py-1" style={{"fontSize": "15pt"}}>
      <Col sm={2}> 
        {add && (
          <>
          <button className="btn btn-round" onClick={save}>
            <i className="bi bi-check-lg"></i>
          </button>
          <button className="btn btn-round" onClick={cancel}>
            <i className="bi bi-x-lg"></i>
          </button> 
          </>
        )}
        {!add && (
          <button className="btn btn-round" onClick={() => setAdd(true)}>
            <i className="bi bi-plus-lg"></i>
          </button>  
        )}
      </Col>
      {add && (
        <>
        <Col sm={4}>
          <select style={{"width": "90%"}} value={ingrIdx} onChange={handleSelect}>
            <option disabled value=''></option>
            {ingrs.map((ingr, idx) => (<option key={idx} value={idx}> {ingr.name} </option>))}
          </select>
        </Col>
        <Col sm={1}> 
          <QtySelect qty={qty} updateQty={(_, new_qty) => setQty(new_qty)}/>  
        </Col>
        <Col sm={2}>
          <DatePicker selected={date} onChange={(date) => setDate(date)} />
        </Col>
        <Col sm={2}>
          <DatePicker selected={expDate} onChange={(date) => setExpDate(date)} />
        </Col>
        </>
      )}
    </Row>
  )
}

export default Home;