import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  data: localStorage.getItem('cartItem') ? JSON.parse(localStorage.getItem('cartItem')) : [],
}

const itemPresent=(state,action)=>{
  let cartProduct=action.payload;
      console.log("cart product is ",cartProduct);
      
      let index=state.data.findIndex((item)=>item.id===cartProduct.id);
      console.log(index);
      return index;
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    increment: (state,action) => {
      let index=itemPresent(state,action);

      if(index>=0){
        if (state.data[index].quantity !== action.payload.itemQuantity) {
          state.data[index].quantity++;
          alert("item added to cart")
        } else {
          alert("Quantity limit reached"); // Show message
        }
      }
       else{
        // action.payload.quantity++;

        let itemUpdated=action.payload;
        if(!itemUpdated.hasOwnProperty('quantity')){
          itemUpdated.quantity=0;
        }

          itemUpdated.quantity++;
        state.data.push(itemUpdated);
        alert("item added to cart")
       }  
       localStorage.setItem('cartItem',JSON.stringify(state.data));  
    },

    remove:(state,action)=>{
      let index=itemPresent(state,action);

      if(index>=0){
          state.data.splice(index,1)
          localStorage.setItem("cartItem",JSON.stringify(state.data))
      }

    },

    incrementQuantity:(state,action)=>{
      let index=itemPresent(state,action);

      if(index>=0){
          let item_id=action.payload.id;
           console.log("item id is",item_id);
           
           if(state.data[index].quantity!=action.payload.itemQuantity){
               state.data[index].quantity++;
           }
           else{
            alert("Quantity limit reached");
              
           }
           localStorage.setItem("cartItem",JSON.stringify(state.data))

      }

    },

    decrementQuantity:(state,action)=>{
      let index=itemPresent(state,action);

      if(index>=0){
        if(state.data[index].quantity>1){
           state.data[index].quantity--;
        }
        else{
          state.data.splice(index,1)
        }
        localStorage.setItem("cartItem",JSON.stringify(state.data))
      }

    },

    resetCart: (state) => {
      console.log("Entering....");
      
      state.data = []
      localStorage.removeItem("cartItem")
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, remove,incrementQuantity ,decrementQuantity,resetCart} = cartSlice.actions

export default cartSlice.reducer