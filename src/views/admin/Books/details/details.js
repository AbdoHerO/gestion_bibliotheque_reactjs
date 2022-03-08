/*eslint-disable*/
import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
/*useParams est un hook :une fonction react qui permet de simplificier la gestion des req.params*/
import { useParams } from "react-router-dom";

function Details() {
  const { id } = useParams();
  //console.log(id);
  var [book, setBook] = useState({});
  useEffect(() => {
    details();
  }, []);
  const details = async () => {
    var p = await axios.get("http://localhost:8083/apis/admin/books/details/" + id);

    setBook(p.data.response);
  };

  return (
    
    <div>
      <h3>Detail of books</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Categorie</th>
            <th scope="col">image</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{book.id}</td>
            <td>{book.title}</td>
            <td>{book.description}</td>
            <td>{book.categorie}</td>
            <td>{book.image}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Details;
