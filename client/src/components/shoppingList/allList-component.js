import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListService from "../../services/list.service";
import { Col, Container, Row } from "react-bootstrap";
import "../style.css";

const AllList = () => {
  return (
    <main>
      <Container className="py-5">
        <Lists/>
      </Container>
    </main>
  );
};


const Lists = () => {
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();

  const addList = () => {
    const name = `New List ${lists.length+1}`;
    ListService.addList(name, 'This is a new shopping list.')
    .then(({data}) => {
      navigate(`/mylist/${data.insertId}`);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const deleteList = (id) => {
    setLists(lists.filter(list => list.id !== id));
    ListService.deleteList(id);
  }

  useEffect(() => {
    ListService.getAll()
    .then(({data}) => {
      setLists(data);
    })
    .catch((err) => {
      console.log(err)
    });
  }, [])

  return(
    <>
    <Row>
      <h2>
        MY SHOPPING LISTS
        <button className="btn btn-round" onClick={addList}>
          <i className="bi bi-plus-lg"></i>
        </button> 
      </h2>
      <hr/>
    </Row>
    <Container>
      {lists.map((list, idx) =>
        <List key={idx} list={list} deleteList={deleteList}/>
      )}
    </Container>
    </>
  )
}

const List = ({list, deleteList}) => {
  return(
    <Row className="py-1">
      <Col sm={1}> 
        <button className="btn btn-round" onClick={() => {deleteList(list.id)}}>
          <i className="bi bi-x-lg"></i>
        </button>
      </Col>
      <Col>  
        <a href={`/mylist/${list.id}`} style={{"fontSize": "15pt"}}>{list.name}</a>
      </Col>
    </Row>
  )
}

export default AllList;