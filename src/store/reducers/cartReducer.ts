import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants";

const initialState: any[] = [];

const cartReducer = (state = initialState, action: any = {}) => {
  let newState = [];

  switch (action.type) {
    case ADD_TO_CART:
      let isPresent = false;
      newState = state.map((item) => {
        if (item.productId === action.product?.id) {
          isPresent = true;
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      if (!isPresent) {
        newState.push({
          productId: action.product?.id,
          quantity: 1,
          product: action.product,
        });
      }
      break;
    case REMOVE_FROM_CART:
      newState = state.filter((item) => item.productId !== action.product?.id);
      newState.push({ productId: action.product?.id, quantity: action.count - 1, product: action.product });
      break;
    default:
      break;
  }

  return newState;
};

export default cartReducer;
