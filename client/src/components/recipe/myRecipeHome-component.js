import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Nav } from "react-bootstrap";
import MyRecipeService from "../../services/myrecipe.service";
import "../style.css";

const MyRecipeHome = () => {
  const [liked, setLiked] = useState(false);

  return(
    <main>
      <Container className="py-5">
        <NavBar setLiked={setLiked}/>
        {!liked && (<MyRecipe/>)}
        {liked && (<LikedRecipe/>)}
      </Container>
    </main>
  )
};

const NavBar = ({setLiked}) => {
  return(
    <Container>
      <Row>
        <Nav variant="tabs" defaultActiveKey="1">
          <Nav.Item>
            <Nav.Link eventKey="1" onClick={() => setLiked(false)}> 
              <h2>MY RECIPES</h2>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="2" onClick={() => setLiked(true)}>
              <h2>LIKED RECIPES</h2>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Row>
    </Container>
  )
};

const Recipe = ({recipe, liked, url}) => {
  const navigate = useNavigate()
  return(
    <Col>
      <Button className="p-1" variant="outline-secondary" 
       onClick={() => navigate(`/${url}/${recipe.id}`)}>
        <Card>
          {!liked && (<Card.Img variant="top" src="myboba.jpeg" />)}
          {liked && (<Card.Img variant="top" src="boba.jpg" />)}
          <Card.Body>
            <Card.Title as="h4"> {recipe.name.toUpperCase()} </Card.Title>
          </Card.Body>
        </Card>
      </Button>
    </Col>
  );
};

const MyRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    MyRecipeService.getAllRecipe()
    .then(({data}) => {
      setRecipes(data);
    })
    .catch((err) => {
      console.log(err)
    });
  }, [])

  return(
    <Container className="py-2">
      <Row className="py-1" >
        <button className="btn btn-round" onClick={() => navigate("/myrecipe/newrecipe")}>
          <i className="bi bi-plus-lg" style={{"fontSize": "1rem"}}></i>
        </button>
      </Row>
      <Row xs={1} md={3} className="g-4">
        {recipes.map((recipe, idx) => (
          <Recipe key={idx} recipe={recipe} liked={false} url={"myrecipe"}/>
        ))}
      </Row>
    </Container>
  );
};

const LikedRecipe = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    MyRecipeService.getMyLiked()
    .then(({data}) => {
      setRecipes(data);
    })
    .catch((err) => {
      console.log(err)
    });
  }, [])

  return(
    <Container className="py-2">
      <Row xs={1} md={3} className="g-4">
        {recipes.map((recipe, idx) => (
          <Recipe key={idx} recipe={recipe} liked={true} url={"recipes"}/>
        ))}
      </Row>
    </Container>
  );
};

export default MyRecipeHome;