import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getById,
  postFavoriteComics,
  getFavorites,
} from "../../../Redux/Actions/actions";
import { getByCreators } from "../../../Redux/Actions/FilterOrderActions";
import ReactStars from "react-rating-stars-component";
import MyButton from "../../../Styles/MyButton";
import Navbar from "../../Navbar/Navbar";
import { Link } from "react-router-dom";
import "./DetailComic.scss";
import Loading from "../../Loading/Loading";
import { useAuth0 } from "@auth0/auth0-react";
import swal from 'sweetalert';
import Carousel from 'react-bootstrap/Carousel';

const DetailComic = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, isLoading, isAuthenticated } = useAuth0();
  const comics = useSelector((state) => state.ComicsReducer);
  let detail = comics.selectedComic;
  const creators = useSelector((state) => state.ComicsReducer.copyComics);

  const [show, setShow] = React.useState(true);

const postFavorite = useSelector((state) => state.ComicsReducer)

const [input, setInput] = React.useState({})

  useEffect(() => {
    dispatch(getById(id));
    setShow(true);
  }, [dispatch]);

  useEffect(() => {
    if (user.email) {
      dispatch(getFavorites(user.email));
    }
  }, [ postFavorite.loginUser.id]);

  // if(postFavorite.loginUser.id&&!postFavorite.favoritesComics){
  //   dispatch(getFavorites(postFavorite.loginUser.id));
  // }

 const handleClick = (e) => {

let arrayIds = [...postFavorite.favoritesComics]
arrayIds=arrayIds.map(e=>e.idPrincipal)
console.log("arrayIds")
console.log(arrayIds)
if (!arrayIds.includes(postFavorite.selectedComic[0].idPrincipal)) {
  // setSelect([...select, event.target.value]);

  arrayIds = [...arrayIds,postFavorite.selectedComic[0].idPrincipal]
  console.log("arrayIds")
  console.log(arrayIds)
  
  dispatch(postFavoriteComics(arrayIds,postFavorite.user.email))

  swal({
    title: "Add  from Favorite, Successfully!",
    icon: "success",
  });

} else {
  let fil= arrayIds.filter((e) => e !== postFavorite.selectedComic[0].idPrincipal)
  // console.log([...postFavorite.favoritesComics,postFavorite.selectedComic[0]])
 console.log("fil")
 console.log(fil)
 dispatch(postFavoriteComics(fil,postFavorite.user.email))
 swal({
  title: "Removed from Favorites!",
  icon: "error",
});

  }

// dispatch(postFavoriteComics(postFavorite.loginUser.id,postFavorite.favoritesComics) )

  };
  
  const handleCreator = (e) =>{
    e.preventDefault();
    setShow(true);
    dispatch(getByCreators(e.target.value));
    setShow(false);
    console.log('detail en get by creator',detail[0]);
  }

  const img = (comic) => {
    let img = null;
    if (comic.images) {
      img = `${comic.images[0]?.path}.${comic.images[0]?.extension}`;
      return img;
    }
    if (comic.img) {
      return comic.img;
    }
  };
  return detail.length === 0 ? (
    <Loading />
  ) : (
    <>
      <div className="randomchar__block">
        <img
          className="randomchar__img"
          src={detail[0].img}
          alt={detail[0].title}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            height: "35rem",
            width: "30rem",
            borderRadius: "10px",
          }}
        />
        <div className="randomchar">
          <div className="randomchar__block">
            <br></br>
            <div className="randomchar__name" class="options">
              <p className="randomchar__name">{detail[0].title}</p>
              <p className="randomchar__descr" class="bodytext">
                {detail[0].description}
              </p>
              <MyButton
                className="randomchar__name"
                variant="contained"
                href={`/lectures/${postFavorite.selectedComic[0].idPrincipal}`}
                style={{ color: "red" }}
              >
                Read
              </MyButton>{" "}
              <br></br>
              <br></br>
              <MyButton
                className="randomchar__name"
                variant="contained"
                style={{ color: "red" }}
              >
                Serie
              </MyButton>
              <br></br>
              <br></br>
              <ReactStars></ReactStars>
              <div> <br></br><br></br>
              <MyButton className="randomchar__name" variant="contained"  style={{ color: "red" }}  onClick={(e) => handleClick(e)}> Add to favourites⭐</MyButton>
              </div>
            </div>
          </div>
          <div className="randomchar__block">
          
            
              {!id.includes("-") &&
                detail[0].creators?.map((creator) => (
                  <div key={creator.creatorId}>
                    <p className="randomchar__descr">{creator.creatorRole}</p>

                    <button
                      className="button button__main"
                      value={creator.creatorId}
                      onClick={handleCreator}
                    >
                      {creator.creatorName}
                    </button>
                  </div>
                ))}
              {id.includes("-") && (
                <h3 className="randomchar__descr">Creators</h3>
              )}
              {id.includes("-") &&
                detail[0].creators?.map((creator) => (
                  <div key={creator}>
                    <button
                      className="button button__main"
                      value={creator}
                      onClick={handleCreator}
                    >
                      {creator}
                    </button>
                  </div>
                ))}
                               
  <div style={{display:'flex', width:'300px'}}>
        <div style={{overflow:'hidden', maxHeight: '700px'}}>
        <div style={{overflow:'scroll' , maxHeight: '700px'}}>

        <div style={{scrollBehavior:'smooth'}}>
              {show                
                ? null
                : creators &&
                  creators?.map((comic) => (
                    <Link
                      className="link_card"
                      to={`/homeComics/DetailComic/${
                        comic.id || comic.idPrincipal
                      }`}
                    >
                      <img
                        src={img(comic)}
                        alt="Not available"
                        style={{ width: "100px", height: "100px" }}
                      />
                      <h3>{comic.title}</h3>
                    </Link>
                   
                  ))}
                  </div> 
                  </div>
                  </div>
                  </div>
                  </div>          
            </div>

          {/* <p class="bodytext" style={{fontFamily:' Helvetica' , textAlign:'center',color:"white"}}>{detail[0].description}</p> */}
        
      </div>
      <Navbar />
      
    </>
  );
};

export default DetailComic;
