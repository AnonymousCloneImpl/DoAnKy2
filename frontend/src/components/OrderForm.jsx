/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';

const OrderForm = ({
  provinces,
  districts,
  wards,
  handleProvinceChange,
  handleDistrictChange,
  setSelectedWardId,
  shippingMethod,
  handleShippingChange,
  paymentMethod,
  handleCheckedPayment,
  handleFormSubmit,
  customerName,
  setCustomerName,
  customerEmail,
  setCustomerEmail,
  houseAddress,
  setHouseAddress,
  customerPhone,
  setCustomerPhone,
  totalPrice
}) => {
  return (
    <form className="order-form" onSubmit={handleFormSubmit}>
      <div className="flex">
        <div className='w-1/2 px-20'>
          <label htmlFor="user">Customer Info</label>
          <div className='user flex justify-between w-full'>
            <span className='input-icon'><FontAwesomeIcon icon={faUser} /></span>
            <input type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="customerName"
              name="customerName"
              placeholder="Example: Ngọc Trinh..."
              id="customerName" required>
            </input>
          </div>

          <label htmlFor="address-selects">Address</label>
          <div className="address-selects">
            <select
              className="province"
              name="province"
              id="province"
              required
              defaultValue=""
              onChange={(e) => handleProvinceChange(e.target.value)}
            >
              <option value="" disabled className='option-css'>--- Province ---</option>
              {provinces.map((province) => (
                <option key={province}
                  value={province[0]}>
                  {province[1]}
                </option>
              ))}
            </select>

            <select
              className="district"
              name="district"
              id="district"
              required
              defaultValue=""
              onChange={(e) => handleDistrictChange(e.target.value)}
            >
              <option value="" disabled className='option-css'>--- District ---</option>
              {districts.map((district) => (
                <option key={district}
                  value={district[0]}>
                  {district[1]}
                </option>
              ))}
            </select>

            <select
              className="ward"
              name="ward"
              id="ward"
              required
              defaultValue=""
              onChange={(e) => setSelectedWardId(e.target.value)}
            >
              <option value="" disabled className='option-css'>--- Ward ---</option>
              {wards.map((ward) => (
                <option key={ward}
                  value={ward[0]}>
                  {ward[1]}
                </option>
              ))}
            </select>
          </div>

          <span className='input-icon'><FontAwesomeIcon icon={faLocationDot} /></span>
          <input type="text"
            value={houseAddress}
            onChange={(e) => setHouseAddress(e.target.value)}
            className="customerName"
            name="houseAddress"
            placeholder="Boulevard, alley, house number,..."
            id="houseAddress" required>
          </input>

          <label htmlFor='contact-block'>Contact Info</label>
          <div className='contact-block justify-between w-full'>
            <div>
              <span className='input-icon'><FontAwesomeIcon icon={faPhone} /></span>
              <input type="tel" className="customerPhone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                name="customerPhone"
                placeholder="Phone number"
                id="customerPhone" required>
              </input>
            </div>

            <div>
              <span className='input-icon'><FontAwesomeIcon icon={faEnvelope} /></span>
              <input type="email" className="customerEmail"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                name="customerEmail"
                placeholder="Example@gmail.com"
                id="customerEmail" required>
              </input>
            </div>
          </div>
        </div>

        <div className='order-line'></div>

        <div className='w-1/2 px-10'>
          <label htmlFor="payment-option">Payment Method</label>
          <div className="payment-option pb-5">
            <div className="payment-item w-full">
              <input
                type="radio"
                className="payment-checkbox"
                id="COD"
                name="payment"
                value="COD"
                checked={paymentMethod === 'COD'}
                onChange={handleCheckedPayment}
              />
              <label htmlFor="COD">
                <img
                  src='https://thanhthinhbui.cdn.vccloud.vn/wp-content/uploads/2020/07/giao-hang-COD-1.png'></img>
              </label>
              <h2 className='text-base font-semibold mt-5 ml-5'>COD (Cash On Delivery)</h2>
            </div>
            <div className="payment-item w-full">
              <input
                type="radio"
                className="payment-checkbox"
                id="PAYPAL"
                name="payment"
                value="PAYPAL"
                checked={paymentMethod === 'PAYPAL'}
                onChange={handleCheckedPayment}
              />
              <label htmlFor="PAYPAL">
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png'></img>
              </label>
              <h2 className='text-base font-semibold mt-5 ml-5'>PayPal</h2>
            </div>

            <div className="payment-item w-full">
              <input
                type="radio"
                className="payment-checkbox"
                id="VNPAY"
                name="payment"
                value="VNPAY"
                checked={paymentMethod === 'VNPAY'}
                onChange={handleCheckedPayment}
              />
              <label htmlFor="VNPAY">
                <img
                  src='https://cdn.bio.link/uploads/profile_pictures/2023-08-09/ZCXnagobVPlSSCAOrumGbLsEQI1KPYsq.png'></img>
              </label>
              <h2 className='text-base font-semibold mt-5 ml-5'>VN Pay</h2>
            </div>

            <div className="payment-item w-full">
              <input
                type="radio"
                className="payment-checkbox"
                id="MOMO"
                name="payment"
                value="MOMO"
                checked={paymentMethod === 'MOMO'}
                onChange={handleCheckedPayment}
              />
              <label htmlFor="MOMO">
                <img src='https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png'></img>
              </label>
              <h2 className='text-base font-semibold mt-5 ml-5'>MoMo</h2>
            </div>
          </div>

          <label htmlFor="shipping-option">Shipping Method</label>
          <div className='shipping-option flex w-full'>
            <div
              className={`shipping-btn ${shippingMethod === 'STANDARD_SHIPPING' ? 'active-shipping' : ''}`}
              onClick={() => handleShippingChange('STANDARD_SHIPPING')}
            >
              Standard Shipping - $50
            </div>
            <div
              className={`shipping-btn ${shippingMethod === 'FAST_SHIPPING' ? 'active-shipping' : ''}`}
              onClick={() => handleShippingChange('FAST_SHIPPING')}
            >
              Fast Shipping - $100
            </div>
          </div>

          <div className='flex float-left font-bold text-lg my-5'>Total Price:
            <p className='text-red-600 ml-3'>${parseFloat(shippingMethod === 'STANDARD_SHIPPING' ? totalPrice + 50 : totalPrice + 100).toFixed(2)}</p>
          </div>
        </div>
      </div>

      <button className='form-btn' type="submit">Confirm Order</button>

    </form>
  );
};

export default OrderForm;
