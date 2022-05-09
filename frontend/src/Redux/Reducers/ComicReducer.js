import { Table } from "semantic-ui-react";
import {
  GET_TITLE,
  GET_BY_ID,
  GET_COMICS,
  GET_USERS,
  FILT_BY_PLAN,
  AUTHENTICATED,
  UPDATE_COMIC,
  DELETE_COMIC,
  CLEAR_COMICS,
  CLEAR_DETAIL,
  ADD_FAVORITE,
  POST_FAVORITE_COMICS,
  POST_FAVORITE_CHARACTERS

} from "../Actions/actions";
import {
  FILT_BY_CHARACTER,
  FILT_BY_CREATOR,
} from "../Actions/FilterOrderActions";

const initialState = {
  Comics: [],
  copyComics: [],
  selectedComic: [],
  users: [],
  copyUsers: [],
  authenticated: false,
  filter:false,
  favoritesComics: [],
  favoritesCharacters: []
};

function ComicsReducer(state = initialState, { type, payload }) {
  // eslint-disable-next-line default-case
  switch (type) {
    case GET_TITLE:
      let comicss = [...state.Comics];
      let filtComic = comicss?.filter((comic) =>
        comic.title.toLowerCase().includes(payload.toLowerCase())
      );
      return {
        ...state,
        copyComics: filtComic,
      };

    case GET_BY_ID: {
      return {
        ...state,
        selectedComic: payload,
      };
    }
    case GET_COMICS:
      return {
        ...state,
        Comics: payload,
        copyComics: payload,
      };
    case FILT_BY_CHARACTER:
      
      return {
        ...state,
        copyComics: [],
      };
    case FILT_BY_CREATOR:
      console.log(payload)
     
      return {
        ...state,
        filter :true,
        copyComics: payload,
        
      };

   
      case AUTHENTICATED:
      return {
        ...state,
        authenticated: payload,
      };
    case GET_USERS:
      return {
        ...state,
        users: payload,
        copyUsers: payload,
      };
    case UPDATE_COMIC:
      const comicEdit = state.Comics.findIndex((c) => c.id === type.payload.id);
      state.Comics[comicEdit] = type.payload;
      console.log(comicEdit);
      return {
        ...state,
        copyComics: [...state.Comics],
      };
    case DELETE_COMIC:
      let deletedComic = state.Comics.filter((c) => c.id !== type.payload.id);
      return {
        ...state,
        copyComics: [...deletedComic],
      };
    case FILT_BY_PLAN:
      const backUp = [...state.users];
      const filtered = backUp.filter((user) => user.plan === payload);
      return {
        ...state,
        copyUsers: filtered,
      };  

    case CLEAR_COMICS:
        return{
          ...state,
          copyComics: [],

        }
    case CLEAR_DETAIL:
        return{
          ...state,
          selectedComic: [],
        }
        case POST_FAVORITE_COMICS:
            console.log(state.favorites)
            if(state.favorites?.find(e => e.id === payload.id)){
                alert("Already exists in favorites")
                return{
                    ...state
                }
            } else {
                alert("Add to favourites succesfully")
                return{
                ...state,
                favorites: [...state.favorites, payload]
            }
            } 
            case POST_FAVORITE_CHARACTERS:
              return{...state
              }

       /* case REMOVE_FAVORITE:
            var remove = state.favorites.filter(e => e.id !== payload)
            return{
                ...state,
                favorites: remove
            } */
    default:
      return { ...state };
  }
}
export default ComicsReducer;
