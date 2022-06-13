import React from "react";
import { Button, Image } from "semantic-ui-react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../Loading/Loading";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import "./Profile.css";
import { Link } from "react-router-dom";

const Profile = () => {
  const login = useSelector((state) => state);
  const logged = login.ComicsReducer.user;

  const favoriteComics = useSelector(
    (state) => state.ComicsReducer.favoritesComics
  );
  console.log("favoriteComics", favoriteComics);
  const favoriteCharacters = useSelector(
    (state) => state.ComicsReducer.favoritesCharacters
  );
  console.log("favoriteCharacters", favoriteCharacters);
  const favourites = [...favoriteComics, ...favoriteCharacters];
  console.log("favourites", favourites);
  const { user } = useAuth0();

  const navigate = useNavigate();

  return !logged.email ? (
    <Loading />
  ) : (
    <div>
      {logged.role === "ROLE_SUPER_ADMIN" ? (
        <Button className="button" onClick={() => navigate("/admin")}>
          ADMIN
        </Button>
      ) : null}
      <Navbar />
      <h2>Welcome {logged.name}!</h2>
      <div className="perfil_container">
        <Image
          src={user.picture}
          size="medium"
          circular
          style={{ margin: "30px" }}
        />
        <div className="col-md text-center text-md-left">
          <p className="lead text-muted">{logged.email}</p>

          <br />
          <h2>
            Plan:
            {logged.plan_id
              ? logged.plan_id
              : logged.role !== "ROLE_USER_PRIME"
              ? "free"
              : "7USD"}
          </h2>
          {logged.role === "ROLE_USER_PRIME" ? (
            <h2>
              Billing:{" "}
              {
                new Date(
                  new Date(logged.updated_at).setMonth(
                    new Date(logged.updated_at).getMonth() + 1
                  )
                )
              }
            </h2>
          ) : null}
          <div className="card-container">
            <h2> Latest favourites:</h2>
            {favourites?.map((favourite) => (
              <div className="card" key={favourite.id}>
                <Link
                  to={`/homeComics/DetailComic/${
                    favourite.id || favourite.idPrincipal
                  }`}
                >
                  <img
                    src={favourite.img}
                    style={{ width: "75px", height: "100px" }}
                    className="card-img-top"
                    alt={favourite.title}
                  />
                  <h6>{favourite.title}</h6>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="row">
        <button
          onClick={() => navigate("/profile/edit")}
          className="btn btn-primary btn-block"
        >
          Edit{" "}
        </button>
        <button
          className="btn btn-primary btn-block"
          onClick={() => navigate("/homeComics")}
        >
          {" "}
          Go back{" "}
        </button>
      </div>
    </div>
  );
};
export default withAuthenticationRequired(Profile, {
  onRedirecting: () => (
    <div>
      Acces not allowed, taking you to log in <Loading />
    </div>
  ),
});
