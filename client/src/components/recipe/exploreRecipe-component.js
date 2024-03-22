import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import RecipeService from "../../services/recipe.service";
import IngrService from "../../services/ingr.service";
import CategoryService from "../../services/category.service"
import Select from 'react-select';
import "../style.css";

const ExploreRecipe = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    RecipeService.getAllRecipe()
    .then(({data}) => {
      setRecipes(data);
    })
    .catch((err) => {
      console.log(err)
    });
  }, [])

  return(
    <main>
      <Container className="py-5">
        <Row> 
          <h2> EXPLORE RECIPES </h2>
          <hr/>
        </Row>
        <SearchBar setRecipes={setRecipes}/>
        <Row xs={1} md={3} className="g-4">
          {recipes.slice(0, 51).map((recipe, idx) => (
            <Recipe key={idx} recipe={recipe}/>
          ))}
        </Row>
      </Container>
    </main>
  )
};

const SearchBar = ({setRecipes}) => {
  const [state, setState] = useState(1);
  const [ingrs, setIngrs] = useState([]);
  const [cats, setCats] = useState([]);

  const selectIngr = async (value) => {
    const {data} = value.length ? await RecipeService.getByIngrs(value) 
                                : await RecipeService.getAllRecipe();
    setRecipes(data);
  }

  const selectCat = async (value) => {
    const {data} = value.length ? await RecipeService.getByCats(value) 
                                : await RecipeService.getAllRecipe();
    setRecipes(data);
  }

  useEffect(() => {
    IngrService.getAll()
    .then(({data}) => {
      const temp = data.map((element) => {return {value: element.id, label: element.name}});
      setIngrs(temp);
    }).catch((err) => {
      console.log(err)
    });

    CategoryService.getAll()
    .then(({data}) => {
      const temp = data.map((element) => {return {value: element.id, label: element.name}});
      setCats(temp);
    }).catch((err) => {
      console.log(err)
    });
  }, []);

  return(
    <>
    <Row className="mb-1">
    <Form>
      <Form.Check
        inline
        label="Most Liked"
        name="SearchBar"
        type="radio"
        id="1"
        defaultChecked
        onChange={() => setState(1)}
      />
      <Form.Check
        inline
        label="Search By Ingredients"
        name="SearchBar"
        type="radio"
        id="2"
        onChange={() => setState(2)}
      />
      <Form.Check
        inline
        label="Search By Categories"
        name="SearchBar"
        type="radio"
        id="3"
        onChange={() => setState(3)}
      />
    </Form>
    </Row>
    <Row className="mb-3">
      {state === 1 && (
        <Select isDisabled />
      )}
      {state === 2 && (<Select
        name="ingrs"
        className="basic-multi-select"
        classNamePrefix="select"
        options={ingrs}
        isMulti
        closeMenuOnSelect={false}
        onChange={selectIngr}
      />)}
      {state === 3 && (<Select
        name="cats"
        className="basic-multi-select"
        classNamePrefix="select"
        options={cats}
        isMulti
        closeMenuOnSelect={false}
        onChange={selectCat}
      />)}
    </Row>
    </>
  )
}

const Recipe = ({recipe}) => {
  const navigate = useNavigate()
  return(
    <Col>
      <Button className="p-1" variant="outline-secondary" 
       onClick={() => navigate(`/recipes/${recipe.id}`)}>
        <Card>
          <Card.Img variant="top" src="boba.jpg"/>
          <Card.Body>
            <Card.Title as="h4"> {recipe.name.toUpperCase()} </Card.Title>
          </Card.Body>
        </Card>
      </Button>
    </Col>
  );
};



export default ExploreRecipe;