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
    
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                <img
                  alt="..."
                  src={book.image}
                  className="shadow-xl rounded-full  align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                />
              </div>
            </div>
            <div className="w-full px-4 text-center mt-20">
              <div className="flex justify-center py-4 lg:pt-4 pt-8">
                <div className="mr-4 p-3 text-center">
                 
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
              {book.title}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fa-solid fa-bars mr-2 text-lg text-blueGray-400"></i>{" "}
              {book.categorie}
            </div>
            <div className="mb-2 text-blueGray-600 mt-10">
              <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
              Solution Manager - Creative Tim Officer
            </div>
            <div className="mb-2 text-blueGray-600">
              <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
              University of Computer Science
            </div>
          </div>
          <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center">
              
              <div className="w-full lg:w-9/12 px-4">
                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                  {book.description}
                </p>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
