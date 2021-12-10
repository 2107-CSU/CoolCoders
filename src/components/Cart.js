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

    return (
        <div>
            <h1>Shopping Cart</h1>
            <table style={{border: 1 + 'px solid black'}}>
                <thead>
                  <tr>
                    <th scope='col'>Item:</th>
                    <th scope='col'>Quantity:</th>
                    <th scope='col'>Price:</th>
                  </tr>
                </thead>
                <tbody>
                {cartItems.map(item => (
                        // change the value of the key! Just using title for testing out
                        <SingleCartItem key={item.title} item={item} />
                    ))}
                </tbody>
            </table>
            <h3>Cart Total: $ {totalPrice}</h3>
        </div>
    )
}

export default Cart
