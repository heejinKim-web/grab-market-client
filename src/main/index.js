import React from "react";
import "./index.css";
import axios from "axios";
import { Link } from "react-router-dom";

function MainPage() {
  const [products, setProducts] = React.useState([]);
  React.useEffect(function () {
    axios
      .get("http://localhost:8080/products")
      .then(function (result) {
        const products = result.data.products;
        setProducts(products);
      })
      .catch(function (error) {
        console.log("에러 발생 : ", error);
      });
  }, []);

  return (
    <div>
      <div id="banner">
        <img src="images/banners/banner1.png" alt="" />
      </div>
      <h1>판매되는 상품들</h1>
      <div id="product_list">
        {products.map(function (product, index) {
          return (
            <div className="product_card" key={product.name}>
              <Link to={"/products/" + product.id} className="product_link">
                <div>
                  <img className="product_img" src={product.imageUrl} />
                </div>
                <div className="product-content">
                  <span className="product_name">{product.name}</span>
                  <span className="product_price">{product.price}원</span>
                </div>
                <div className="product_seller">
                  <img
                    className="product_avatar"
                    src="images/icons/avatar.png"
                    alt=""
                  />
                  <span>{product.seller}</span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default MainPage;
