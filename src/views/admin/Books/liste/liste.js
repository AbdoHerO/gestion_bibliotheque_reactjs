import React, { Component } from "react";
import axios from "axios";
import Alert from "@material-tailwind/react/Alert";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
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
    let color = "light"; /* "dark" */
    let couleur = "";
    if (this.state.statusResponse === true) {
      couleur = "alert alert-success";
    } else {
      couleur = "alert alert-danger";
    }

    const columns = [
      {
        field: 'image',
        headerName: 'Avatar',
        width: 240,
        renderCell: (params) => <img className="h-12 w-12 bg-white rounded-full border" src={params.value} />,
      },
      {
        field: 'id',
        headerName: 'Id',
        width: 240,
        editable: true,
      },
      {
        field: 'title',
        headerName: 'Title',
        width: 240,
      },
      {
        field: 'description',
        headerName: 'Description',
        width: 240,
      },
      {
        field: 'categorie',
        headerName: 'Categorie',
        width: 240,
      },
      {
        field: 'Actions',
        headerName: 'Actions',
        width: 340,
        renderCell: (params) => {
          console.log(params);
          return (
            <div style={{margin : "5px"}}>
              <Button
                variant="contained"
                style={{ outline: "none" ,margin : "5px" }}
                color="error"
                onClick={() => this.supprimer(params.id)}
              >
                Supprimer
              </Button>
              <Button
               style={{ outline: "none" ,margin : "5px" }}
                variant="contained"
                href={"/admin/books/" + params.id}
              >
                Details
              </Button>
              <Button
                
                variant="contained"
                color="warning"
                href={"/admin/books/edit/" + params.id}
              >
                Edit
              </Button>
            </div>
          );
        }
      },
    ];

    const initialRows = this.state.listeBook


    return (
      <>
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
            (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
          }
        >
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <div className="flex flex-wrap items-center justify-between flex-column">
                  <h3
                    className={
                      "font-semibold text-lg " +
                      (color === "light" ? "text-blueGray-700" : "text-white")
                    }
                  >
                    List Books
                  </h3>
                  <a
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    href={"/admin/books/add"}
                  >
                    Add Book
                  </a>
                </div>

                <h5 className="mt-5">
                  {this.state.message.length > 0 && (
                    <Alert color="blueGray">{this.state.message}</Alert>
                  )}


                </h5>
              </div>
            </div>
          </div>
          {/* <div className="block w-full overflow-x-auto">
          
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    Title
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    Description
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    Categorie
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.listeBook.map((p) => (
                  <tr>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                      <img
                        src={p.image}
                        className="h-12 w-12 bg-white rounded-full border"
                        alt="..."
                      ></img>{" "}
                      <span
                        className={
                          "ml-3 font-bold " +
                          +(color === "light"
                            ? "text-blueGray-600"
                            : "text-white")
                        }
                      >
                        {p.title}
                      </span>
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {p.description}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {p.categorie}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <button
                        className="bg-red-500 text-white active:bg-red-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => this.supprimer(p.id)}
                      >
                        Delete
                      </button>
                      <a
                        className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        href={"/admin/books/" + p.id}
                      >
                        Details
                      </a>
                      <a
                        className="bg-yellow-500 text-white active:bg-yellow-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        href={"/admin/books/edit/" + p.id}
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
           <div   style={{ height: 400, width: '100%' , backgroundColor : "white" , border : "none",boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}>
          <DataGrid
            columns={columns}
            rows={initialRows}
            components={{
              Toolbar: GridToolbar,
            }}
            
          />
      
        </div>
        </div>
       
      </>
    );
  }
}

export default Liste;
