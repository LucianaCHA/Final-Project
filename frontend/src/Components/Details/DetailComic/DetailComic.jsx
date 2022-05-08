import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getById } from "../../../Redux/Actions/actions";
import { getByCreators } from "../../../Redux/Actions/FilterOrderActions";
import ReactStars from "react-rating-stars-component";
import MyButton from "../../../Styles/MyButton";
//import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../Navbar/Navbar";
import { Link } from "react-router-dom";

import "./DetailComic.css";

const DetailComic = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const comics = useSelector((state) => state.ComicsReducer);
  let detail = comics.selectedComic;
  const creators = useSelector((state) => state.ComicsReducer.copyComics);

  const [show, setShow] = React.useState(false);

  useEffect(() => {
    dispatch(getById(id));
  }, [dispatch, id]);

  //const [bkg, setBkg] = React.useState("");

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getByCreators(e.target.value));
    setShow(!show);
  };

  return detail.length === 0 ? (
    <Typography component="h3" variant="h3" align="center" color="text.primary">
      Loading...
    </Typography>
  ) : (
    <>
      <div className="container">
        {/* <h4 style={{fontFamily:'Abril Fatface' , textAlign:'center',color:"white"}}>{detail[0].description}</h4>    */}

        <img
          src={detail[0].img}
          class="featured"
          alt={detail[0].title}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            height: "35rem",
            width: "30rem",
            borderRadius: "10px",
            textAlign: "center",
          }}
        />

        {/* <p style={{marginLeft:"auto", marginRight:"auto" , fontFamily:"fantasy" ,color:"white"}}>{detail[0].description} </p>  
          <h3 style={{fontFamily:'Abril Fatface' , textAlign:'center',color:"white"}}>{detail[0].description}
          </h3>
              <h3 style={{fontFamily:'Abril Fatface' , textAlign:'center',color:"white"}}>{detail[0].description}</h3>
            <p style={{marginLeft:"auto", marginRight:"auto" , fontFamily:"fantasy" ,color:"white"}}>{detail[0].description} </p>
            <p  style={{fontFamily:' Helvetica' , textAlign:'center',color:"white"}} >{detail[0].description}</p> */}
        <div style={{ marginLeft: "auto", marginRight: "auto" }}>
          <h1>
            <strong>{detail[0].title}</strong>
          </h1>
          <p
            style={{
              fontFamily: "Abril Fatface",
              textAlign: "center",
              color: "white",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            class="bodytext"
          >
            {detail[0].description}
          </p>

          {/* <p class="bodytext" style={{fontFamily:' Helvetica' , textAlign:'center',color:"white"}}>{detail[0].description}</p> */}
          {detail[0].creators?.map((creator) => (
            <div class="role" key={creator.creatorId}>
              <strong>{creator.creatorRole}</strong>
              <br />
              <button value={creator.creatorId} onClick={handleClick}>
                {creator.creatorName}
              </button>
            </div>
          ))}
          <div class="options">
            <MyButton href="/lecture" style={{ color: "white" }}>
              Read
            </MyButton>
            <MyButton style={{ color: "white" }}>Serie</MyButton>
          </div>
          <div style={{ marginLeft: "auto", marginRight: "auto" }}>
            <ReactStars></ReactStars>
          </div>
        </div>
        <div hide={show} style={{ display: "grid" }}>
          {creators &&
            creators?.map((comic) => (
              <Link
                className="link_card"
                to={`/homeComics/DetailComic/${comic.id}`}
              >
                <img
                  src={comic.profilePic}
                  alt={comic.title}
                  style={{ width: "100px", height: "100px" }}
                />
                <h3>{comic.title}</h3>
              </Link>
            ))}
        </div>
      </div>
      <Navbar />
    </>
  );
};
export default DetailComic;
