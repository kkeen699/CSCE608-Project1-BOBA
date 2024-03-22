import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IngrService from "../../services/ingr.service";
import CategoryService from "../../services/category.service";
import Select from 'react-select';
import {Modal, Form, Button} from 'react-bootstrap';
import "../style.css";
import MyRecipeService from "../../services/myrecipe.service";

const NewRecipePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [newIngrs, setNewIngrs] = useState([]);
  const [newCats, setNewCats] = useState([]);
  const [steps, setSteps] = useState('');
  const [allIngrs, setAllIngrs] = useState([]);
  const [allCats, setAllCats] = useState([]);


  const save = async () => {
    const date = new Date();
    const offset = date.getTimezoneOffset();
    const new_recipe = {
      name: name,
      desc: desc,
      steps: steps,
      post_time: new Date(date.getTime() - (offset*60*1000)).toISOString().substring(0,10)
    }
    const {data} = await MyRecipeService.addRecipe(new_recipe);
    if(newIngrs.length)
      await MyRecipeService.addItem(data.insertId, newIngrs);
    if(newCats.length)
      await MyRecipeService.addCat(data.insertId, newCats);
    navigate(`/myrecipe/${data.insertId}`);
  }
  
  useEffect(() => {
    IngrService.getAll()
    .then(({data}) => {
      const temp = data.map((element) => {return {value: element.id, label: element.name}});
      setAllIngrs(temp);
    }).catch((err) => {
      console.log(err)
    });

    CategoryService.getAll()
    .then(({data}) => {
      const temp = data.map((element) => {return {value: element.id, label: element.name}});
      setAllCats(temp);
    }).catch((err) => {
      console.log(err)
    });
  }, []);

  return (
    <main>
      <Modal show={true} centered scrollable size='xl' 
        backdrop="static" onHide={() => navigate("/myrecipe")}>
        <Modal.Header closeButton>
          <Modal.Title> Write Recipe </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label> Name </Form.Label>
              <Form.Control type="name" defaultValue={name} onChange={(e) => setName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="cats">
              <Form.Label> Categories </Form.Label>
              <Select
                name="cats"
                className="basic-multi-select"
                classNamePrefix="select"
                options={allCats}
                value={newCats}
                isMulti
                closeMenuOnSelect={false}
                onChange={(value) => setNewCats(value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="desc">
              <Form.Label> Desciption </Form.Label>
              <Form.Control as="textarea" rows={3} type="desc" defaultValue={desc} onChange={(e) => setDesc(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="ingrs">
              <Form.Label> Ingredients </Form.Label>
              <Select
                name="ingrs"
                className="basic-multi-select"
                classNamePrefix="select"
                options={allIngrs}
                value={newIngrs}
                isMulti
                closeMenuOnSelect={false}
                onChange={(value) => setNewIngrs(value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="steps">
              <Form.Label> Steps </Form.Label>
              <Form.Control as="textarea" rows={10} defaultValue={steps} onChange={(e) => setSteps(e.target.value)}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => navigate("/myrecipe")}>
            Cancel
          </Button>
          <Button variant="primary" onClick={save}>
            Save
          </Button>
        </Modal.Footer>
      </Modal> 
    </main>
  );
};

export default NewRecipePage;