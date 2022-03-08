import React, { Component } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

class Liste extends Component {
  constructor(props) {
    super(props);
    /*Créer une state avec un tableau vide qui sera remplir par le backend*/
    this.state = {
      listeBook: [],
      message: "" /*Stocker le message reçu du backEnd*/,
      statusResponse:
        "" /*Stocker le type (true=>OK,false=>Error) du message reçu du backEnd*/,
    };
  }
  /*récupérer la liste des produit from le backEndproject*/
  componentDidMount() {
    this.afficherAll();
  }
  /*Supprimer un produit*/
  supprimer = (id) => {
    //demander l'api
    axios
      .get("http://localhost:8083/apis/admin/books/delete/" + id)
      //attend er recevoir la réponse du serveur
      .then((response) => {
        this.setState({
          message: response.data.message,
          statusResponse: response.data.status,
        });
        if (this.state.statusResponse === true) {
          /*Actualiser la liste des produits*/
          this.afficherAll();
        }
      });
  };

  /*Appler l'api pour récupérer la liste des produit da la base de donnes*/
  afficherAll = () => {
    //demander l'api
    axios
      .get("http://localhost:8083/apis/admin/books/")
      //attend er recevoir la réponse du serveur
      .then((response) => {
        //changer l'état du state afin de remplir le tableau listeBook
        this.setState({ listeBook: response.data });
      });
  };

  render() {
    /*Selo le type du message reçu on afficher une notification*/
    let couleur = "";
    if (this.state.statusResponse === true) {
      couleur = "alert alert-success";
    } else {
      couleur = "alert alert-danger";
    }

    return (
      <div>
        <h3>List of books</h3>
        {/*Afficher le message si on a reçu une reponse serveur*/}
        {this.state.message.length > 0 && (
          <div className={couleur} role="alert">
            {this.state.message}
          </div>
        )}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Categorie</th>
              <th>image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.listeBook.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.title}</td>
                <td>{p.description}</td>
                <td>{p.categorie}</td>
                <td>{p.image}</td>
                <td>
                  {/*Appler la méthode supprimer en passant l'id du produit à supprimer*/}
                  <button
                    onClick={() => this.supprimer(p.id)}
                    className="btn btn-danger btn-block"
                  >
                    Delete
                  </button>
                  <a href={"/books/" + p.id} className="btn btn-info">
                    Details
                  </a>
                  <a href={"/books/edit/" + p.id} className="btn btn-info">
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Liste;
