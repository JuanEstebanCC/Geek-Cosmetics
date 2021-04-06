import React from "react";
import { withRouter } from "react-router-dom";
import "../styles/styles.css";
import Ilustration from "../undraw_empty_cart_co35.svg";
import Github from "../GitHub-Mark-64px.png";

const Home = () => {
  return (
    <>
      <nav class="navbar navbar-dark bg-dark"></nav>
      <div class="container">
        <div class="row">
          <div class="col-6">
            <h3 className="title-home">Geek Cosmetics.</h3>
            <div>
              <h5 className="text-home">
                Developed by: Juan Esteban Cifuentes
              </h5>
              <a href="https://github.com/JuanEstebanCC">
                <img src={Github} alt="Github" className="icon-git mt-5" />
              </a>
            </div>
            <div className="m-4">
              <button class="fancy m-5">
                <span class="top-key"></span>
                <a href="/cosmetics/new">Buy items</a>
                <span class="bottom-key-1"></span>
                <span class="bottom-key-2"></span>
              </button>
              <button class="fancy">
                <span class="top-key"></span>
                <a href="/cosmetics/new">See orders</a>
                <span class="bottom-key-1"></span>
                <span class="bottom-key-2"></span>
              </button>
            </div>
          </div>
          <div class="col">
            <div className="photo-home">
              <img
                src={Ilustration}
                width="400em"
                height="350em"
                alt="A eshop"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default withRouter(Home);
