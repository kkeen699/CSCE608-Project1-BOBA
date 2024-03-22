import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import RecipeService from "../../services/recipe.service";
import "../style.css";

const UserRecipePage = () => {
  const [recipes, setRecipes] = useState([]);
  const {userId} = useParams();

  useEffect(() => {
    RecipeService.getUserRecipe(userId)
    .then(({data}) => {
      setRecipes(data);
    })
    .catch((err) => {
      console.log(err)
    });
  }, [userId])

  return(
    <main>
      <Container className="py-5">
        <Row> 
          {recipes[0] && (<h2> {recipes[0].user_name.toUpperCase()} </h2>)}
          <hr/>
        </Row>
        <Row xs={1} md={3} className="g-4">
          {recipes.map((recipe, idx) => (
            <Recipe key={idx} recipe={recipe}/>
          ))}
        </Row>
      </Container>
    </main>
  );
};

const Recipe = ({recipe}) => {
  const navigate = useNavigate()
  return(
    <Col>
      <Button className="p-1" variant="outline-secondary" 
       onClick={() => navigate(`/recipes/${recipe.id}`)}>
        <Card>
          <Card.Img variant="top" src="../../boba.jpg"/>
          <Card.Body>
            <Card.Title as="h4"> {recipe.name.toUpperCase()} </Card.Title>
          </Card.Body>
        </Card>
      </Button>
    </Col>
  );
};

export default UserRecipePage;