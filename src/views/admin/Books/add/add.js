import React, { Component, } from "react";
import axios from "axios";

class Add extends Component {

  constructor(props) {
    super(props);


    /*Créer le state du component*/
    this.state = {
      listeCategories: [],
      id_categorie: '',
      book: {
        id: null,
        title: "",
        description: "",
        id_categorie: 5,
        image: "",
      },
      message: "",
      statusResponse: "",
      selectedFile: null

    };

  }
  componentDidMount() {
    this.GetAllCategories();
  }
  GetAllCategories = () => {
    axios
      .get("http://localhost:8083/apis/admin/categories/")
      .then((response) => {
        this.setState({ listeCategories: response.data });
      });
  };

  onFileChange = event => {
    // Update the state 
    this.setState({ selectedFile: event.target.files[0] });
  };

  changerEtat(event) {
    this.setState({
      book: {
        ...this.state.book,
        [event.target.name]: event.target.value,
      },
    });
  }



  handleCategorieChange = event => {
    this.setState({
      id_categorie: event.target.value,
      book: {
        ...this.state.book,
        id_categorie: event.target.value,
      }
    });

    console.log(this.state.book);
    console.log(this.state.id_categorie);

  }

  AddBook = async (e) => {
    console.log(this.state.book);

    const formData = new FormData();
    formData.append("file", this.state.selectedFile);
    // formData.append("fileName", this.state.selectedFile.name);
    formData.append("bookInfo", JSON.stringify(this.state.book));
    console.log(formData);

    await axios
      .post("http://localhost:8083/apis/admin/books/add", formData)
      .then((response) => {
        //Changer le State
        this.setState({
          statusResponse: response.data.status,
          message: response.data.message,
        });
        /*le book est bien ajouté initialiser les input et l'objet book du sate*/
        if (this.state.statusResponse === true) {
          this.setState({
            book: {
              ...this.state.book,
              title: "",
              description: "",
              id_categorie: "",
              image: "",
            },
          });
        }
      });
  };

  render() {
    let couleur = "";
    if (this.state.statusResponse === true) {
      couleur = "alert alert-success";
    }
    if (this.state.statusResponse === false) {
      couleur = "alert alert-danger";
    }

    return (

      <>


        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              {/*Afficher le message si on a reçu une reponse serveur*/}
              {this.state.message.length > 0 && (
                <div className={couleur} role="alert">
                  {this.state.message}
                </div>
              )}
              <h6 className="text-blueGray-700 text-xl font-bold">Add Book</h6>

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
                      value={this.state.book.title}
                      onChange={(e) => this.changerEtat(e)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

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
                      value={this.state.book.description}
                      onChange={(e) => this.changerEtat(e)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

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
                    <input
                      type="file"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="image"
                      onChange={this.onFileChange}
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
                    <select className="w-full lg:12 px-4 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={this.handleCategorieChange}>
                      <option value="⬇️ Select a categorie ⬇️"> -- Select a categorie -- </option>
                      {this.state.listeCategories.map((categorie) => <option key={categorie.id} value={categorie.id}>{categorie.libelle}</option>)}
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex  flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative flex mt-10 justify-center w-full mb-3">
                    <button
                      onClick={this.AddBook}
                      className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-12 py-4 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Add Book
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


}

export default Add;
