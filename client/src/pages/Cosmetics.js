import React from "react";
import { withRouter } from "react-router-dom";

const Cosmetics = () => {
  return (
    <>
      <nav class="navbar navbar-dark bg-dark"></nav>
      <div className="container-cosmectics">
        <table class="table table-bordered p-5 m-2">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default withRouter(Cosmetics);
