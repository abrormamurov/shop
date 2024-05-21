import { createSlice } from "@reduxjs/toolkit";

const dataFromLocalStorage = () => {
  return (
    JSON.parse(localStorage.getItem("products")) || {
      products: [],
      amount: 0,
      prise: 0,
    }
  );
};

const productsSlice = createSlice({
  name: "products",
  initialState: dataFromLocalStorage(),
  reducers: {
    addProduct: (state, { payload }) => {
      const item = state.products.find((product) => product.id !== product.id);

      if (item) {
        item.amount += payload.amount;
      } else {
        state.products.push(payload);
      }
      productsSlice.caseReducers.calculateTotal(state);
    },
    removeProduct: (state, { payload }) => {
      state.products = state.products.filter((item) => {
        return item.id != payload;
      });
      productsSlice.caseReducers.calculateTotal(state);
    },
    calculateTotal: (state) => {
      let prise = 0;
      let amount = 0;

      state.products.forEach((item) => {
        prise += item.prise * item.amount;
        amount += item.amount;
      });

      state.amount = amount;
      state.prise = prise;
      localStorage.setItem("products", JSON.stringify(state));
    },
  },
});

export const { addProduct, removeProduct } = productsSlice.actions;
export default productsSlice.reducer;
