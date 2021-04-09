import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

const NewCosmetics = (props) => {
  const { history } = props;
  const [currentOrder, setCurrentOrder] = useState([
    {
      client_name: "",
      item: "",
      quantity: 0,
      subtotal: 0,
      total: 0,
      date: "",
    },
  ]);
  const [products, setProducts] = useState("");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [allSubtotal, setAllSubtotal] = useState(0);
  const [avaible, setAvaible] = useState(0);
  const iva = allSubtotal * 0.19;
  const total = allSubtotal + iva;
  const [orderNumber, setOrderNumber] = useState(0);
  const objecto = Object.values(products);

  const getCurrentDate = () => {
    const dayjs = require("dayjs");
    let today = dayjs();

    let currentDate = today.format("YYYY-MM-DD HH:mm");
    return currentDate;
  };
  let currentDate = getCurrentDate();

  useEffect(() => {
    (async () => {
      await fetch("/items", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
        });
    })();
  }, []);

  useEffect(() => {
    objecto.map((el) => {
      if (el.descripcion === item) {
        const total = quantity * el.precio;
        setSubtotal(total);
        return setAvaible(el.existencia);
      }
    });
  });

  const handleSubmit = (values) => {
    if (quantity > avaible) {
      toast.error("Not enough items avaible!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const newOrder = [
        {
          client_name: values.client_name,
          item: item,
          quantity: quantity,
          subtotal: subtotal,
          total: subtotal,
          date: currentDate,
        },
      ];

      if (currentOrder[0].quantity === 0) {
        setCurrentOrder([...newOrder]);
      } else {
        setCurrentOrder([...currentOrder, ...newOrder]);
      }
      const orders = [...currentOrder, ...newOrder];

      if (!orderNumber) {
        (async () => {
          let data = {
            client_name: values.client_name,
          };
          await fetch("/orders/new", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((data) => {
              setOrderNumber(data.insertId);
            });
        })();
      }

      let resultado = 0;
      for (let i = 0; i < orders.length; i++) {
        if (orders[i].subtotal !== 0) {
          resultado = resultado + orders[i].subtotal;
          setAllSubtotal(resultado);
        }
      }
    }
  };
  const validate = Yup.object({
    client_name: Yup.string()
      .required("Client name required")
      .matches(/^[A-Za-z]+$/, "Only enter letters"),
  });

  const deleteItem = (index) => {
    const newCurrentOrder = [...currentOrder];
    newCurrentOrder.splice(index, 1);
    setCurrentOrder(newCurrentOrder);
    setAllSubtotal(allSubtotal - currentOrder[index].subtotal);
  };

  const finishOrder = () => {
    (async () => {
      let data = {
        order_num: orderNumber,
        subtotal: allSubtotal,
        iva: iva,
        total: total,
      };
      await fetch("http://localhost:4300/orders/edit", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {});
    })();
    history.push("/");
  };
  return (
    <>
      <nav class="navbar navbar-dark bg-dark"></nav>
      <div class="container">
        <div class="row">
          <div class="col-5">
            <h4 className="font-weight-bold display-5 mb-5">Order</h4>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <Formik
              initialValues={{
                client_name: "",
              }}
              validationSchema={validate}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              <Form id="form">
                <div></div>
                <label htmlFor="client_name" class="input">
                  <Field
                    className="input__field mb-3"
                    type="text"
                    placeholder="Jhon Doe"
                    id="client_name"
                    name="client_name"
                    required
                  />
                  <span class="input__label">Your name</span>
                </label>
                <div></div>
                <label htmlFor="date" className="font-weight-bold">
                  Current Date (Not editable)
                </label>
                <div></div>
                <Field
                  type="datetime"
                  name="date"
                  className="disabled input__field p-2 m-3 w-25 d-inline-block date-input"
                  id="date"
                  default={currentDate}
                  value={currentDate}
                  readOnly
                />
                <div></div>
                <div></div>
                <Field
                  as="select"
                  name="item"
                  className="m-4 input__field select-input d-inline-block m-3 minimal"
                  onChange={(e) => {
                    setItem(e.target.value);
                  }}
                  required
                >
                  <option value="">Select the product</option>
                  {objecto.map((e, index) => {
                    return (
                      <option value={e.descripcion} id={index}>
                        {e.descripcion}
                      </option>
                    );
                  })}
                </Field>
                <div></div>

                <label htmlFor="date" className="font-weight-bold">
                  Quantity
                </label>
                <div></div>
                <label className="input">
                  <Field
                    type="number"
                    id="quantity"
                    name="quantity"
                    className="input__field mt-3"
                    required
                    min="0"
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                  />
                </label>
                <h4 className="m-3 font-weight-bold">Subtotal: {subtotal}</h4>
                <button type="submit" className="m-2 submit-button">
                  Submit
                </button>
              </Form>
            </Formik>
          </div>
          <div class="col">
            <h5 className="display-5 mb-4">Order details</h5>
            <h6 className="order-number mb-4">
              Order Number: {orderNumber || "?"}
            </h6>
            <table class="table table-bordered table-cosmectics m-4">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Subtotal</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentOrder.map((e, index) => {
                  if (e.item) {
                    return (
                      <tr id={index}>
                        <th scope="row">{e.item}</th>
                        <td>{e.quantity}</td>
                        <td>{e.subtotal}</td>
                        <td>
                          <button
                            class=" btn-danger btn-sm rounded-lg"
                            type="button"
                            data-toggle="tooltip"
                            onClick={() => deleteItem(index)}
                            data-placement="top"
                            title="Delete"
                          >
                            <i class="fa fa-trash" aria-hidden="true"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
            <table class="table table-bordered table-cosmectics2 m-4 ">
              <tbody>
                <tr>
                  <td>Subtotal: </td>
                  <td>{allSubtotal}</td>
                </tr>
                <tr>
                  <td>Total IVA:</td>
                  <td>{iva}</td>
                </tr>
                <tr>
                  <td>Total:</td>
                  <td>{total}</td>
                </tr>
              </tbody>
            </table>
            <button
              type="submit"
              className="mr-5 submit-button-finish"
              onClick={finishOrder}
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(NewCosmetics);
