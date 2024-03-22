import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MyRecipeService from "../../services/myrecipe.service";
import { Col, Container, Row, Image } from "react-bootstrap";
import "../style.css";

const MyRecipePage = () => {
  const [recipe, setRecipe] = useState({name: "", post_time: "", steps: "", desc: ""});
  const [ingrs, setIngrs] = useState([]);
  const [cats, setCats] = useState([]);
  const {recipeId} = useParams();
  
  useEffect(() => {
    MyRecipeService.getRecipeItem(recipeId)
    .then(({data}) => {
      setIngrs(data);
    }).catch((err) => {
      console.log(err)
    });

    MyRecipeService.getRecipeCat(recipeId)
    .then(({data}) => {
      setCats(data);
    }).catch((err) => {
      console.log(err)
    });

    MyRecipeService.getMyRecipe(recipeId)
    .then(({data}) => {
      setRecipe(data[0])
      console.log(data[0]);
    }).catch((err) => {
      console.log(err)
    });
  }, [recipeId]);

  return (
    <main>
      <Container className="py-5">
        <Title recipe={recipe} cats={cats}/>
        <RecipeImage />
        <Description desc={recipe.desc}/>
        <Ingredients ingrs={ingrs}/>
        <Steps steps={recipe.steps}/>
      </Container>
    </main>
  );
};

const Title = ({recipe, cats}) => {
  const cat = cats.map((cat) => cat.name);
  const navigate = useNavigate();
  return(
    <Container>
      <Row>
        <Col as="h2"> {recipe.name.toUpperCase()} </Col>
        <Col className="text-end">
          <button className="btn btn-round" onClick={() => navigate(`/myrecipe/${recipe.id}/edit`)}>
            <i className="bi bi-pencil-fill"></i>
          </button>
        </Col>
        <hr/>
      </Row>
      <Row as="h5"> Liked: {recipe.nliked}</Row>
      <Row as="h5"> {cat.join(', ')}</Row>
    </Container>
  );
};

const RecipeImage = () => {
  return(
    <Container className="py-2" style={{"textAlign": "center"}}>
      <Image src="../myboba.jpeg"/>
    </Container>
  )
}

const Description = ({desc}) => {
  return(
    <Container className="py-2 px-5" style={{"fontSize": "15pt"}}>
      <Row as="h3"> Description: </Row>
      <Row className="px-3"> {desc} </Row>
    </Container>
  );
};

const Ingredients = ({ingrs}) => {
  const ingrsName = ingrs.map((ingr) => ingr.name);
  return(
    <Container className="py-2 px-5" style={{"fontSize": "15pt"}}>
      <Row as="h3"> Ingredients: </Row>
      <Row className="px-3"> {ingrsName.join(', ')} </Row>
    </Container>
  );
};

const Steps = ({steps}) => {
  return(
    <Container className="py-2 px-5" style={{"fontSize": "15pt"}}>
      <Row as="h3"> Steps: </Row>
      <Row className="px-3"> 
        <ol>
          {steps.split('\n').map((step, idx) =>
            <li key={idx}> {step} </li>
          )}
        </ol>
      </Row>
    </Container>
  );
};

export default MyRecipePage;