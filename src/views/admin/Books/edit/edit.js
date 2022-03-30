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
    <>

      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">

            {/*Afficher le message si on a reçu une reponse serveur*/}
            {message.length > 0 && (
              <div className={colorAlert} role="alert">
                {message}
              </div>
            )

            }
           


            <h6 className="text-blueGray-700 text-xl font-bold"> Book</h6>

          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Book Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter le nom"
                    name="title"
                    value={book.title}
                    onChange={(e) => changerEtat(e)}
                    className="border-0 px-3 py-3 m-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

                  />
                </div>
              </div>
              <div className="w-full lg:12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Descreption
                  </label>
                  <textarea
                    rows="5"
                    name="description"
                    placeholder="description"
                    value={book.description}
                    onChange={(e) => changerEtat(e)}
                    className="border-0 px-3 py-3 m-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

                  />
                </div>
              </div>
              <div className="w-full lg:12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    image
                  </label>
                  <img src={book.image} className="m-2 " alt="image" style={{ width: "150px", height: "150px" }} />
                  <input
                    type="file"
                    className="border-0 px-3 py-3 m-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    name="image"
                    onChange={onFileChange}
                  />
                </div>
              </div>
              <div className="w-full lg:12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Categorie
                  </label>
                  <select className="w-full lg:12 m-2 px-4 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={handleCategorieChange} value={book.id_categorie}>
                    {listeCategories.map((categorie) => (
                      <option key={categorie.id} value={categorie.id}>
                        {categorie.libelle}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex  flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative flex mt-10 justify-center w-full mb-3">
                  <button
                    onClick={EditBook}
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-12 py-4 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Modifie Book
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Edit;
