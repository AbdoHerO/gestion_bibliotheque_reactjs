import React, { Component } from "react";
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
      book:{
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
      <div className="container">
        <div className="row">
          <fieldset className="border p-2">
            {/*Afficher le message si on a reçu une reponse serveur*/}
            {this.state.message.length > 0 && (
              <div className={couleur} role="alert">
                {this.state.message}
              </div>
            )}

            <legend className="w-auto">Add book</legend>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter le nom"
                name="title"
                value={this.state.book.title}
                onChange={(e) => this.changerEtat(e)}
              />
            </div>
            <div className="form-group mb-3">
              <textarea
                className="form-control"
                name="description"
                placeholder="description"
                value={this.state.book.description}
                onChange={(e) => this.changerEtat(e)}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="file"
                className="form-control"
                name="image"
                onChange={this.onFileChange}
              />
            </div>

            <div className="form-group mb-3">
            <select className="form-control" onChange={this.handleCategorieChange}> 
                <option value="⬇️ Select a categorie ⬇️"> -- Select a categorie -- </option>
                {this.state.listeCategories.map((categorie) => <option key={categorie.id} value={categorie.id}>{categorie.libelle}</option>)}
              </select>
            </div>

            <button
              onClick={this.AddBook}
              className="btn btn-secondary btn-block"
            >
              Add
            </button>
          </fieldset>
        </div>
      </div>
    );
  }
}

export default Add;
