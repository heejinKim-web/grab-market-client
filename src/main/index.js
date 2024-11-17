import React from "react";
import "./index.css";
import axios from "axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { API_URL } from "../config/constants.js";
import { Carousel } from "antd";

dayjs.extend(relativeTime);

function MainPage() {
  const [products, setProducts] = React.useState([]);
  const [banners, setBanners] = React.useState([]);
  React.useEffect(function () {
    axios
      .get(`${API_URL}/products`)
      .then(function (result) {
        const products = result.data.products;
        setProducts(products);
      })
      .catch(function (error) {
        console.log("에러 발생 : ", error);
      });

    axios
      .get(`${API_URL}/banners`)
      .then(function (result) {
        const banners = result.data.banners;
        setBanners(banners);
      })
      .catch(function (error) {
        console.error("에러 발생 : ", error);
      });
  }, []);

  return (
    <div>
      <Carousel autoplay autoPlaySpeed={3000}>
        {banners.map((banner, index) => {
          return (
            <Link to={banner.href}>
              <div id="banner">
                <img src={`${API_URL}/${banner.imageUrl}`} />
              </div>
            </Link>
          );
        })}
      </Carousel>
      <h1 id="product-headline">판매되는 상품들</h1>
      <div id="product_list">
        {products.map(function (product, index) {
          return (
            <div className="product_card" key={product.name}>
              {product.soldout === 1 && <div className="product-blur" />}
              <Link to={"/products/" + product.id} className="product_link">
                <div>
                  <img
                    className="product_img"
                    src={`${API_URL}/${product.imageUrl}`}
                  />
                </div>
                <div className="product-content">
                  <span className="product_name">{product.name}</span>
                  <span className="product_price">{product.price}원</span>
                </div>
                <div className="product_footer">
                  <div className="product_seller">
                    <img
                      className="product_avatar"
                      src="images/icons/avatar.png"
                      alt=""
                    />
                    <span>{product.seller}</span>
                  </div>
                  <span className="product-date">
                    {dayjs(product.createdAt).fromNow()}
                  </span>
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
