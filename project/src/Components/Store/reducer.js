import { createSlice } from "@reduxjs/toolkit";

let dataFromWeb = JSON.parse(localStorage.getItem("cart"));
const createReducer = createSlice({
  name: "cart",
  initialState: dataFromWeb,
  reducers: {
    addItem(state, action) {
      state.push(action.payload);
      localStorage.setItem("cart", JSON.stringify([...state]));
    },
    removeItem(state, action) {
      let item_id = action.payload;
      let dltItem = state.filter((product_Id) => product_Id.id !== item_id);
      localStorage.setItem("cart", JSON.stringify([...dltItem]));
      return dltItem;
    },
  },
});

export default createReducer.reducer;
export let { addItem, removeItem } = createReducer.actions;
