import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import dataes from "../helpers/info_prueba.json";

const NewCosmetics = () => {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [currentOrder, setCurrentOrder] = useState([{}]);
  const objecto = Object.values(dataes);
  const getCurrentDate = () => {
    const dayjs = require("dayjs");
    let today = dayjs();

    let currentDate = today.format("YYYY-MM-DD HH:mm");
    return currentDate;
  };
  let currentDate = getCurrentDate();

  useEffect(() => {
    objecto.map((el) => {
      if (el.descripcion === item) {
        const total = quantity * el.precio;
        return setSubtotal(total);
      }
    });
  });

  let orders = [...currentOrder];
  //console.log(calculateSubtotal());
  const handleSubmit = (values) => {
    console.log(values.client_name);
    console.info(item);
    console.log(currentDate);
    console.log(currentOrder);

    console.log(currentOrder.length);
    const newOrder = [
      {
        client_name: values.client_name,
        item: item,
        quantity: quantity,
        subtotal: subtotal,
        date: currentDate,
      },
    ];
    orders = [...currentOrder, ...newOrder];
    console.log(orders, "THE ORDERS");
    for (let i = 0; i <= currentOrder.length; i++) {}
    setCurrentOrder([...currentOrder, ...newOrder]);
    console.log(currentOrder);
  };
  const validate = Yup.object({
    client_name: Yup.string().required("Client name required"),
  });

  const deleteItem = (index) => {
    console.log(orders[index], "JAVI", orders.length);
    for (let i = 0; i < orders.length; i++) {
      console.log(orders[i]);
      if (orders[i] === index) {
        orders.splice(i, 1);
      }
    }
  };
  return (
    <>
      <nav class="navbar navbar-dark bg-dark"></nav>
      <div class="container">
        <div class="row">
          <div class="col-5">
            <h4 className="font-weight-bold display-5 mb-5">Order</h4>
            <Formik
              initialValues={{
                client_name: "",
              }}
              validationSchema={validate}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              <Form>
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
                  {objecto.map((e) => {
                    return (
                      <option value={e.descripcion}>{e.descripcion}</option>
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
            <h5 className="display-5 mb-5">Order details</h5>
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
                {orders.map((e, index) => {
                  return (
                    <tr id={index}>
                      <th scope="row">
                        {e.item} y {index}
                      </th>
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
                })}
              </tbody>
            </table>
            <button type="submit" className=" m-5 submit-button">
              Finish
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(NewCosmetics);
