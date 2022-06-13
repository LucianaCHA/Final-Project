import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getComicsByTitle } from "../../../Redux/Actions/actions";
import { FiSearch } from "react-icons/fi";
import swal from "sweetalert";

export default function SearchBarComics() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getComicsByTitle(title));
    setTitle("");
    if (!title) {
      swal({
        title: "Comic not found",
        icon: "error",
      });
    }
  }
  return (
    <div>
      <input
        style={{
          borderRadius: "25px",
          border: "none",
          width: "30%",
          padding: "10px",
          margin: "10px",
        }}
        type="text"
        placeholder="Search for a comic"
        value={title}
        onChange={handleChange}
      />
   
      <button
        style={{
          background: "transparent",
          border: "none",
          width: "5%",
          padding: "10px",
          overflow: "visible",
          /* margin: auto; */
          position: "relative",
          margin: "-81px",
        }}
        type="submit"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        <FiSearch />
      </button>
    </div>
  );
}
