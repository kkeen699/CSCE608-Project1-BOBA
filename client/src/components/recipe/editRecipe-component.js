import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MyRecipeService from "../../services/myrecipe.service";
import IngrService from "../../services/ingr.service";
import CategoryService from "../../services/category.service";
import Select from 'react-select';
import {Modal, Form, Button} from 'react-bootstrap';
import "../style.css";


const EditRecipePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [newIngrs, setNewIngrs] = useState([]);
  const [steps, setSteps] = useState('');
  const [newCats, setNewCats] = useState([]);
  const [allIngrs, setAllIngrs] = useState([]);
  const [allCats, setAllCats] = useState([]);
  const {recipeId} = useParams();
  let ingrs = useRef([]);
  let cats = useRef([]);

  const save = async () => {
    const date = new Date();
    const offset = date.getTimezoneOffset();
    const new_recipe = {
      name: name,
      desc: desc,
      steps: steps,
      post_time: new Date(date.getTime() - (offset*60*1000)).toISOString().substring(0,10)
    }
    await MyRecipeService.updateRecipe(recipeId, new_recipe);
    const addIngrs = newIngrs.filter(x => !ingrs.current.includes(x));
    const deleteIngrs = ingrs.current.filter(x => !newIngrs.includes(x));
    if(addIngrs.length){
      await MyRecipeService.addItem(recipeId, addIngrs);
    }
    if(deleteIngrs.length){
      await MyRecipeService.deleteItem(recipeId, deleteIngrs);
    }
    const addCats = newCats.filter(x => !cats.current.includes(x));
    const deleteCats = cats.current.filter(x => !newCats.includes(x));
    if(addCats.length){
      await MyRecipeService.addCat(recipeId, addCats);
    }
    if(deleteCats.length){
      await MyRecipeService.deleteCat(recipeId, deleteCats);
    }
    navigate(`/myrecipe/${recipeId}`);
  }

  const deleteRecipe = async () => {
    await MyRecipeService.deleteRecipe(recipeId);
    navigate("/myrecipe");
  }
  
  useEffect(() => {
    MyRecipeService.getMyRecipe(recipeId)
    .then(({data}) => {
      setName(data[0].name);
      setDesc(data[0].desc);
      setSteps(data[0].steps);
    }).catch((err) => {
      console.log(err)
    });

    MyRecipeService.getRecipeItem(recipeId)
    .then(({data}) => {
      const temp = data.map((element) => {return {value: element.ingr, label: element.name}});
      setNewIngrs(temp);
      ingrs.current = temp;
    }).catch((err) => {
      console.log(err)
    });

    MyRecipeService.getRecipeCat(recipeId)
    .then(({data}) => {
      const temp = data.map((element) => {return {value: element.cat, label: element.name}});
      setNewCats(temp);
      cats.current = temp;
    }).catch((err) => {
      console.log(err)
    });

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
  }, [recipeId]);

  return (
    <main>
      <Modal show={true} centered scrollable size='xl' 
        backdrop="static" onHide={() => navigate(`/myrecipe/${recipeId}`)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Recipe</Modal.Title>
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
          <Button variant="secondary" onClick={() => navigate(`/myrecipe/${recipeId}`)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteRecipe}>
            Delete
          </Button>
          <Button variant="primary" onClick={save}>
            Save
          </Button>
        </Modal.Footer>
      </Modal> 
    </main>
  );
};

export default EditRecipePage;