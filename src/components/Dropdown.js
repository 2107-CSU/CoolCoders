import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { DetectOutsideClick } from "./DetectOutsideClick";

const Dropdown = () => {
    const dropdownRef = useRef(null)
    const [isActive, setIsActive] = DetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);

useEffect(() => {
    const pageClickEvent = (e) => {
        console.log(e);

        if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
            setIsActive(!isActive);
        }
    };

    if (isActive) {
        window.addEventListener('click', pageClickEvent);
    }

    return() => {
        window.removeEventListener('click', pageClickEvent);
    }

}, [isActive]);

    return (
        <div className='menu-container'>
            <button onClick={onClick} className="menu-trigger" >
            Products
            </button>
            <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
                <ul>
                    <li><Link to="/products" className="nav-link" >All Products </Link></li>
                    <li><a href='products/shirts'>Shirts</a></li>
                    <li><a href='products/athleticwear'>Athletic Wear</a></li>
                    <li><a href='products/shoes'>Shoes</a></li>
                    <li><a href='products/accessories'>Accessories</a></li>
                    <li><a href='products/kids'>Kids</a></li>
                    <li><a href='products/misc'>Misc</a></li>
                    <li><a href='products/homeandbeauty'>Home and Beauty</a></li>
                </ul>
            </nav>
        </div>
    );
};

export default Dropdown;