import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RecipeService from "../../services/recipe.service";
import { Col, Container, Row, Image } from "react-bootstrap";
import "../style.css";

const RecipePage = () => {
  const [recipe, setRecipe] = useState({name: "", post_time: "", steps: ""});
  const [ingrs, setIngrs] = useState([]);
  const [cats, setCats] = useState([]);
  const {recipeId} = useParams();
  
  useEffect(() => {
    RecipeService.getRecipeItem(recipeId)
    .then(({data}) => {
      setIngrs(data);
    }).catch((err) => {
      console.log(err)
    });

    RecipeService.getRecipeCat(recipeId)
    .then(({data}) => {
      setCats(data);
    }).catch((err) => {
      console.log(err)
    });

    RecipeService.getRecipe(recipeId)
    .then(({data}) => {
      setRecipe(data[0])
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
  const [like, setLike] = useState(false);
  const [nliked, setNliked] = useState(0)
  const cat = cats.map((cat) => cat.name);

  const handleLiked = () => {
    if(like){
      RecipeService.deleteLiked(recipe.id);
      setNliked(nliked-1);
    }
    else{
      RecipeService.addLiked(recipe.id);
      setNliked(nliked+1);
    }
    setLike(!like);
  }

  useEffect(() => {
    if(recipe.nliked)
      setNliked(recipe.nliked)
    if(recipe.id)
      RecipeService.getLiked(recipe.id)
      .then(({data}) => {
        data.length === 0 ? setLike(false) : setLike(true);
      }).catch((err) => {
        console.log(err)
      });
  }, [recipe]);
  return(
    <Container>
      <Row>
        <Col as="h2"> {recipe.name.toUpperCase()} </Col>
        <Col className="text-end">
          <button className="btn btn-round" onClick={handleLiked}>
            {!like && (<i className="bi bi-heart"></i>)}
            {like && (<i className="bi bi-heart-fill text-danger"></i>)}
          </button>
        </Col>
        <hr/>
      </Row>
      <Row>
        <Col as="h5"> Liked: {nliked}</Col>
        <Col className="text-end" as="p">
          <a href={`/recipes/user/${recipe.user}`}>{recipe.user_name}</a>
          , {recipe.post_time.substring(0,10)}
        </Col>
      </Row>
      <Row>
        <Col as="h5"> {cat.join(', ')} </Col>
      </Row>
    </Container>
  );
};

const RecipeImage = () => {
  return(
    <Container className="py-2" style={{"textAlign": "center"}}>
      <Image src="../boba.jpg"/>
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

export default RecipePage;