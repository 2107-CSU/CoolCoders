import React, { useState, useEffect } from 'react'
import SingleCartItem from './SingleCartItem'

const Cart = () => {

    const [totalPrice, setTotalPrice] = useState(0);
    const [cartItems, setCartItems] = useState([
        {
            title: "Greatsword",
            description: "A really great sword.",
            price: 1000,
            quantity: 1,
            categoryId: 1,
          },
          {
            title: "Power Armor",
            description: "It makes you feel, like, really powerful, dude.",
            price: 500,
            quantity: 1,
            categoryId: 4,
          },
          {
            title: "Tea - Mint",
            description:
              "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
            price: 54,
            quantity: 2,
            categoryId: 5,
          },
    ])

    // find the total price by multiplying qty*price
    useEffect(() => {
        let total = 0;
        cartItems.map((item) => {
            let itemTotal = item.quantity * item.price;
            total += itemTotal;
        })
        setTotalPrice(total);
    }, [cartItems])

    function removeAllItems(){
      setCartItems([]);
    }


    return (
      <div className='cartBody'>
        <div className='marginTop cartContainer'>
          <div className='Header'>
            <h3 className='Heading'>Shopping Cart</h3>
            <h5 className='Action' onClick={() => removeAllItems()}>Remove all</h5>
          </div>
          <div >
            {
              cartItems.map(item => (
                // change the value of the key! Just using title for testing out
                <SingleCartItem key={item.title} item={item} setCartItems={setCartItems} cartItems={cartItems} />
              ))
            }
          </div>
          <div className='checkout'>
            <div className='total'>
              <div>
                <div className='Subtotal'>Sub-Total</div>
                <div className='items'>{cartItems.length} items</div>
              </div>
              <div className='total-amount'>${totalPrice}.00</div>
            </div>
            <button className='button'>Checkout</button>
          </div>
        </div>
      </div>
    )
}

export default Cart
