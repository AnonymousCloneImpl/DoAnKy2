import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const CartIcon = () => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        // Hàm để lấy giá trị từ localStorage
        const getValueFromLocalStorage = () => {
            const storedItemList = JSON.parse(localStorage.getItem('itemList'));
            try {
                setValue(storedItemList.length);
            } catch (e){
                
            }

        };

        // Gọi hàm ban đầu để cập nhật giá trị
        getValueFromLocalStorage();

        // Sử dụng setInterval để cập nhật giá trị mỗi giây
        const intervalId = setInterval(() => {
            getValueFromLocalStorage();
        }, 500);

        // Clear interval khi component unmount để tránh memory leak
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <Link className="main-menu-a hover:text-red-800" href="/cart">
                <FontAwesomeIcon icon={faCartShopping} className="main-menu-i" />
                My cart
            </Link>
            <div className="cart-number-list">{value}</div>
        </>
    );
}

export default CartIcon;
