import { useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeProduct } from "../features/productsSlice";
import { Link } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  console.log(products);
  if (products.length == 0) {
    return (
      <div className="bosh">
        {" "}
        <p id="error">
          E <span>r</span>ror
        </p>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto container ">
      <table className="table cart-1">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Name/Type</th>
            <th>Description</th>
            <th>Prise</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {products.map((product) => {
            return (
              <tr className="tr-1" key={product.id}>
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox border-slate-100	"
                    />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={product.category.image} alt={product.title} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{product.title}</div>
                      <div className="text-sm opacity-50">
                        {product.category.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <br />
                  <span className="">
                    {product.description.substring(0, 190)}...
                  </span>
                </td>
                <td>
                  {new Intl.NumberFormat("us-US", {
                    currency: "USD",
                    style: "currency",
                  }).format(product.price)}{" "}
                  x {product.amount}
                </td>
                <th className="flex items-center mt-5">
                  <button
                    onClick={() => dispatch(removeProduct(product.id))}
                    className="btn btn-ghost btn-xs"
                  >
                    {<FaTrash className="w-5 h-5" />}
                  </button>
                </th>
              </tr>
            );
          })}
          {/* row 2 */}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Cart;
