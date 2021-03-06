import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

const Cosmetics = (props) => {
  const { history } = props;
  const [orders, setOrders] = useState([{}]);
  useEffect(() => {
	  console.clear();
    (async () => {
	    console.clear();
      await fetch("/orders", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setOrders(data);
        });
    })();
  }, []);
  return (
    <>
      <nav class="navbar navbar-dark bg-dark"></nav>
      <div className="container p-5 mb-5">
        <h4 className="font-weight-bold display-5 mb-5">Orders</h4>
        <table class="table table-bordered p-5 m-2">
          <thead>
            <tr>
              <th scope="col">Order number</th>
              <th scope="col">Client name</th>
              <th scope="col">Subtotal</th>
              <th scope="col">IVA</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((e, index) => {
              return (
                <tr>
                  <td>{e.order_num}</td>
                  <td>{e.client_name}</td>
                  <td>{e.subtotal}</td>
                  <td>{e.iva}</td>
                  <td>{e.total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button
          className="submit-button m-5 go-back"
          onClick={() => {
            history.push("/");
          }}
        >
          Go Back
        </button>
      </div>
    </>
  );
};

export default withRouter(Cosmetics);
