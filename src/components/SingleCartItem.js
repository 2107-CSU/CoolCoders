import React, { useEffect } from 'react'


const SingleCartItem = ({ item, setCartItems, cartItems }) => {

    function removeSingleItem(){
        const { title } = item;
        console.log(title);
        // need to update this to reflect item.id NOT item.title
        const updatedCartItems = cartItems.filter((item) => item.title !== title);
        setCartItems(updatedCartItems);
    }

    function addCartQty(){
        // the console.log shows that the items quantity is being increased
        // now I need that to reflect on the page without refreshing...
        item.quantity++;
        console.log(item.quantity);
    }

    function decreaseCartQty(){
      // the console.log shows that the items quantity is being increased
      // now I need that to reflect on the page without refreshing...
      // also need to manage qty so that it cannot go below 1
      item.quantity--;
      console.log(item.quantity);
    }

    function saveForLater(){
        // move off of cartItems to wishListItems?
    }


    return (
        <div className='cartItems'>
            <div className='about'>
                <h1 className='title'>{item.title}</h1>
                <h3 className='subtitle'>{item.description.length > 50 ? item.description.slice(0, 50) + '...' : item.description}</h3>
            </div>
            <div className='counter'>
                <div className='btn' onClick={() => addCartQty()}>+</div>
                <div className='count'>{item.quantity}</div>
                <div className='btn' onClick={() => decreaseCartQty()}>-</div>
            </div>
            <div className='prices'>
                <div className='amount'>${item.price}.00</div>
                <div className='save'><u>Save for later</u></div>
                <div className='remove' onClick={() => removeSingleItem()}><u>Remove</u></div>
                </div>
        </div>
    )
}

export default SingleCartItem
