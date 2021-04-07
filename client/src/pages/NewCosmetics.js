import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import dataes from "../helpers/info_prueba.json";

const NewCosmetics = () => {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
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

  //console.log(calculateSubtotal());
  const handleSubmit = (values) => {
    console.log(values);
    console.info(item);
    console.log(currentDate);
  };
  const validate = Yup.object({
    client_name: Yup.string().required("Client name required"),
  });
  return (
    <>
      <nav class="navbar navbar-dark bg-dark"></nav>
      <div class="container">
        <div class="row">
          <div class="col-6">
            <h4 className="font-weight-bold display-5 mb-5">Order</h4>
            <Formik
              initialValues={{
                client_name: "",
              }}
              onSubmit={(values) => {
                console.log("Valores");
                console.log(values, "Hello");
                handleSubmit(values);
              }}
            >
              <Form>
                <div></div>
                <label class="input">
                  <input
                    className="input__field mb-3"
                    id="client_name"
                    name="client_name"
                    type="text"
                    placeholder="Jhon Doe"
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
                >
                  <option value="0">Select the product</option>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(NewCosmetics);
