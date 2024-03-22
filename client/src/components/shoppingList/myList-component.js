import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import ListService from "../../services/list.service";
import IngrService from "../../services/ingr.service";
import { Col, Container,Form, Row } from "react-bootstrap";
import "../style.css";

const MyList = () => {
  const {listId} = useParams();
  return (
    <main>
      <Container className="py-5">
        <ListForm listId={listId}/>
        <ListTable listId={listId}/>
      </Container>
    </main>
        
  );
};

const ListForm = ({listId}) => {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [edit, setEdit] = useState(false);

  const save = () => {
    setEdit(false);
    ListService.updateList(listId, name, notes);
  }

  useEffect(() => {
    ListService.getList(listId)
    .then(({data}) => {
      setName(data[0].name);
      setNotes(data[0].notes);
    })
    .catch((err) => {
      console.log(err)
    });
  }, [])
  
  return(
    <Container>
      <Row as="h2">
        {!edit && (
          <>
          {name} 
          <button className="btn btn-round" onClick={() => {setEdit(true)}}>
            <i className="bi bi-pencil-fill"></i>
          </button>
          </>
        )}
        {edit && (
          <>
          <label>
            <input value={name} onChange={e => setName(e.target.value)} />
            <button className="btn btn-round" onClick={save}>
              <i className="bi bi-check-lg"></i>
            </button>
          </label>
          </>
        )}
        <hr/>
      </Row>
      <Row style={{"fontSize": "15pt"}}>
        {!edit && (<>{notes}</>)}
        {edit && (
          <label>
            <textarea rows="3" style={{"width": "100%"}} value={notes} onChange={e => setNotes(e.target.value)} />
          </label>
        )}
      </Row>
    </Container>
  )        
}



const ListTable = ({listId}) => {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    ListService.addItem(listId, item)
    .then(({data}) => {
      item.id = data.insertId;
      const new_items = [...items, item];
      setItems(new_items);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const updateQty = (itemId, new_qty) => {
    const new_items = items.map(item => {
      if(item.id == itemId){
        item.qty = new_qty;
      } 
      return item;
    })
    setItems(new_items);
    console.log("update");
    ListService.updateItem(itemId, new_qty);
  }

  const deleteItem = (itemId) => {
    setItems(items.filter(item => item.id !== itemId));
    ListService.deleteItem(itemId);
  }

  useEffect(() => {
    ListService.getItem(listId)
    .then(({data}) => {
      setItems(data);
    })
    .catch((err) => {
      console.log(err)
    });
  }, [])

  const row = items.map((item, idx) => 
    <ListItem key={idx} item={item} deleteItem={deleteItem} updateQty={updateQty}/>
  );

  return(
    <Container className="py-3">
      <Row className="py-2">
        <Col sm={2} as="h3"> </Col>
        <Col sm={7} as="h3"> Ingredients </Col>
        <Col as="h3"> Qty </Col>
      </Row>
        {items.map((item, idx) => 
          <ListItem key={idx} item={item} deleteItem={deleteItem} updateQty={updateQty} />
        )}
        <NewRow addItem={addItem}/>
    </Container>
  )
}

const ListItem = ({item, deleteItem, updateQty}) => {
  return(
    <Row className="py-1" style={{"fontSize": "15pt"}}>
      <Col sm={2}> 
        <button className="btn btn-round" onClick={() => deleteItem(item.id)}>
          <i className="bi bi-x-lg"></i>
        </button> 
      </Col>
      <Col sm={7}> {item.name} </Col>
      <Col> <QtySelect qty={item.qty} itemId={item.id} updateQty={updateQty}/> </Col>
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
  const [ingrs, setIngrs] = useState([]);

  const cancel = () => {
    setAdd(false);
    setIngrIdx('');
    setQty(1);
  }

  const save = () => {
    const newItem = {
      ingr: parseInt(ingrs[ingrIdx].id),
      qty: qty,
      name: ingrs[ingrIdx].name
    }
    addItem(newItem);
    cancel();
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
        <Col sm={7}>
          <select value={ingrIdx} onChange={(e) => setIngrIdx(e.target.value)}>
            <option disabled value=''></option>
            {ingrs.map((ingr, idx) => (<option key={idx} value={idx}> {ingr.name} </option>))}
          </select>
        </Col>
        <Col>
          <QtySelect qty={qty} updateQty={(_, new_qty) => setQty(new_qty)}/>
        </Col>
        </>
      )}
    </Row>
  )
}

export default MyList;