// cartSelectors.js

export const isProductInCart = (state, productId) => {
    console.log(state.data,productId);
    
    return state.data.some(item => item.id === productId);
  };
  