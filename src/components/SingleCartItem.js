import React from 'react'

const SingleCartItem = ({ item, setCartItems, cartItems, setTotalPrice }) => {

    function removeSingleItem(){
        const { title } = item;
        // --------------- TODO -----------------
        // need to update this to reflect item.id NOT item.title
        const updatedCartItems = cartItems.filter((item) => item.title !== title);
        if (updatedCartItems.length === 0) setTotalPrice(0);
        setCartItems(updatedCartItems);
    }

    function addCartQty(itemToUpdate){
        const updatedCartItems = cartItems.map((item) => {
            if (item.title === itemToUpdate.title) {
                itemToUpdate.quantity++
            }
            return item;
        })
        setCartItems(updatedCartItems);
    }

    function decreaseCartQty(itemToUpdate){
      if (item.quantity > 1) {
        const updatedCartItems = cartItems.map((item) => {
            if (item.title === itemToUpdate.title) {
                itemToUpdate.quantity--;
            }
            return item;
        })
        setCartItems(updatedCartItems);
      } 
    }

    function saveForLater(){
        // move off of cartItems to wishListItems?
    }

    return (
        <div className='cartItems'>
            <div className='about'>
                <h1 className='title'>{item.title}</h1>
                <h3 className='subtitle'>{item.description.length > 25 ? item.description.slice(0, 25) + '...' : item.description}</h3>
            </div>
            <div className='counter'>

                <div className='btn' onClick={() => addCartQty(item)}>+</div>
                <div className='count' value={item.quantity}>{item.quantity}</div>
                <div className='btn' onClick={() => decreaseCartQty(item)}>-</div>
            </div>
            <div className='prices'>
                <div className='amount'>${item.price * item.quantity}.00</div>
                <div className='save'><u>Save for later</u></div>
                <div className='remove' onClick={() => removeSingleItem()}><u>Remove</u></div>
            </div>
        </div>
    )
}

export default SingleCartItem
