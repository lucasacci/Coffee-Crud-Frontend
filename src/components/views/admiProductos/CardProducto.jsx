import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { consultarAPI } from "../../helpers/queries";

const CardProducto = () => {
  const [productos, setProductos] = useState([]);
  
  useEffect(() => {
    consultarAPI().then(
      (respuesta) => {
        //la respuesta es exitosa
        setProductos(respuesta);
      },
      (reason) => {
        console.log(reason);
        //mostrar un mensaje al usuario
        Swal.fire(
          "Ocurrio un error",
          "Intentelo nuevamente en unos minutos",
          "error"
        );
      }
    );
  }, []);

 
  return (
    <>
      {productos.map((el, i) => {
        return (
          <Card key={el._id} className="m-4">
            <Card.Img variant="top" src={el.imagen} className="img-fluid" />
            <Card.Body>
              <Card.Title>{el.nombreProducto}</Card.Title>
              <Card.Text>Precio: ${el.precio}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <Link className="btn btn-danger"  to={`/detalle-producto/${el._id}`}>
          Ver mas
        </Link>
            </Card.Footer>
          </Card>
        );
      })}
    </>
  );
};

export default CardProducto;
