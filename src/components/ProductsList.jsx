import { useLoaderData, Link } from "react-router-dom";

function ProductsList() {
  const { products } = useLoaderData();
  console.log(products);
  return (
    <ul className="flex-wrap justify-center flex">
      {products.map((product) => {
        return (
          <Link key={product.id} to={`/product/${product.id}`}>
            <li className="card shadow mb-3">
              <div className="container">
                <div className="card">
                  <h3 className="title">{product.title}</h3>
                  <img src={product.images} alt="" />
                  <div className="bar">
                    <div className="emptybar"></div>
                    <div className="filledbar"></div>
                  </div>
                </div>
              </div>
            </li>
          </Link>
        );
      })}
    </ul>
  );
}

export default ProductsList;
