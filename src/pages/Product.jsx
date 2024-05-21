import { useLoaderData } from "react-router-dom";
import { customFetch } from "../utils/index";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { addProduct } from "../features/productsSlice";

export const loader = async ({ params }) => {
  const req = await customFetch(`/products/${params.id}`);
  const product = req.data;
  return { product };
};

function Product() {
  const dispatch = useDispatch();
  const { product } = useLoaderData();
  const [productAmount, setProductAmount] = useState(1);

  const setAmount = (type) => {
    if (type == "decrease" && productAmount > 1) {
      setProductAmount((prev) => prev - 1);
    } else if (type == "increase") {
      setProductAmount((prev) => prev + 1);
    }
  };

  const addToBag = () => {
    const newProduct = {
      ...product,
      amount: productAmount,
    };
    dispatch(addProduct(newProduct));
  };
  return (
    <>
      <div className="max-w-6xl flex flex-col items-start">
        <div className="carousel carousel-center max-w-full mx-auto p-4 space-x-4 bg-neutral rounded-box">
          {product.images.map((image) => {
            return (
              <div key={image} className="carousel-item">
                <img src={image} className="rounded-box  h-96" />
              </div>
            );
          })}
        </div>{" "}
        <div className="card-4"> </div>
        <div className="bg-text">
          <h1 className=" mb-4 text-3xl font-bold">{product.title}</h1>
          <p className="text-2xl	mb-3">{product.description}</p>
          <div className="text-5xl mb-2	">{product.price}$</div>
          <div className="flex items-center gap-8">
            <button
              onClick={() => setAmount("increase")}
              className="btn btn-secondary"
            >
              +
            </button>
            <h3>{productAmount}</h3>
            <button
              disabled={productAmount == 1 ? true : false}
              onClick={() => setAmount("decrease")}
              className="btn btn-secondary"
            >
              -
            </button>

            <hr />
            <button onClick={addToBag} className="btnn ">
              <a
                href="
"
              >
                {" "}
                Add To Bag
              </a>{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
