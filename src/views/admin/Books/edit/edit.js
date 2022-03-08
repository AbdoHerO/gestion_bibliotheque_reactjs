/*eslint-disable*/
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Edit() {
  const { id } = useParams();
  var [listeCategories, setCategorieAll] = useState([]);
  var [book, setBook] = useState({});
  var [categorie, setCategorie] = useState({});
  var [message, setMessage] = useState("");
  var [colorAlert, setColorAlert] = useState("");
  var [statusResponse, setStatusResponse] = useState("");
  var [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    detailsBook();
    detailsCategorie();
    GetAllCategories();
  }, []);

  const detailsBook = async () => {
    var p = await axios.get(
      "http://localhost:8083/apis/admin/books/details/" + id
    );
    setBook(p.data.response);
  };

  const GetAllCategories = async () => {
    var p = await axios.get("http://localhost:8083/apis/admin/categories/");
    setCategorieAll(p.data);
  };

  const onFileChange = async (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const detailsCategorie = async () => {
    var p = await axios.get(
      "http://localhost:8083/apis/admin/categories/details/" + book.id_categorie
    );
    setCategorie(p.data.response);
  };

  const handleCategorieChange = async (event) => {
    setBook((book) => ({
      ...book,
      id_categorie: event.target.value,
    }));
  };

  const changerEtat = async (event) => {
    setBook((book) => ({
      ...book,
      [event.target.name]: event.target.value,
    }));

    
  };

  const EditBook = async (e) => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("bookInfo", JSON.stringify(book));

    var p = await axios.post(
      "http://localhost:8083/apis/admin/books/edit/" + book.id,
      formData
    );
    setStatusResponse(p.data.status);
    setMessage(p.data.message);
    if (p.data.status === true) {
      setColorAlert("alert alert-success");
    } else if (p.data.status === false) {
      setColorAlert("alert alert-danger");
    } else {
      setColorAlert("alert alert-info");
    }


    if (statusResponse === true) {
      setBook((book) => ({
        ...book,
        title: "",
        description: "",
        id_categorie: "",
        image: "",
      }));
    }
  };

  return (
    <div className="container">
      <div className="row">
        <fieldset className="border p-2">
          {/*Afficher le message si on a reçu une reponse serveur*/}
          {message.length > 0 && (
            <div className={colorAlert} role="alert">
              {message}
            </div>
          )}

          <legend className="w-auto">Edit book</legend>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter le nom"
              name="title"
              value={book.title}
              onChange={(e) => changerEtat(e)}
            />
          </div>
          <div className="form-group mb-3">
            <textarea
              className="form-control"
              name="description"
              placeholder="description"
              value={book.description}
              onChange={(e) => changerEtat(e)}
            />
          </div>

          <div className="form-group mb-3">
            <select className="form-control" onChange={handleCategorieChange} value={book.id_categorie}>
              {listeCategories.map((categorie) => (
                <option key={categorie.id} value={categorie.id}>
                  {categorie.libelle}
                </option>
              ))}
            </select>
          </div>

          
          <div className="form-group mb-3">
              <img src={book.image} alt="image"  style={{width: "150px",height: "150px"}}/> 
          </div>
          
          <div className="form-group mb-3">
            <input
              type="file"
              className="form-control"
              name="image"
              onChange={onFileChange}
            />
          </div>

          <button onClick={EditBook} className="btn btn-secondary btn-block">
            Edit
          </button>
        </fieldset>
      </div>
    </div>
  );
}

export default Edit;
