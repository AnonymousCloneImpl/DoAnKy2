import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';

const OrderForm = ({
  provinces,
  districts,
  wards,
  handleProvinceChange,
  handleDistrictChange,
  setSelectedWardId,
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
  setCustomerPhone
}) => {
  return (
    <form className="order-form" onSubmit={handleFormSubmit}>
      <div className='flex justify-between'>
        <div className='phone-ship'>
          <label htmlFor="customerPhone">Contact Info</label>
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
        <div className='phone-ship'>
          <div className="email-label"></div>
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

      <div className='flex justify-between'>
        <div className='phone-ship'>
          <div className="phone-wrapper">
            <span className='input-icon'><FontAwesomeIcon icon={faPhone} /></span>
            <input type="tel" className="customerPhone"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              name="customerPhone"
              placeholder="Phone number"
              id="customerPhone" required>
            </input>
          </div>
        </div>

        <div className='phone-ship'>
          <div className="ship">
            <select
              className="shipping"
              name="shipping"
              id="shipping"
              required
              defaultValue=""
              onChange={(e) => handleShippingChange(e)}
            >
              <option value="" disabled className='option-css'>--- Shipping Method ---</option>
              <option value="STANDARD">Standard Shipping - $50</option>
              <option value="FAST">Fast Shipping - $100</option>
            </select>
          </div>
        </div>
      </div>

      <div className="payment-label">Payment Method</div>
      <div className="payment-option">
        <div>
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
            <img src='https://thanhthinhbui.cdn.vccloud.vn/wp-content/uploads/2020/07/giao-hang-COD-1.png'></img>
          </label>
        </div>
        <div>
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
            <img src='https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png'></img>
          </label>
        </div>

        <div>
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
            <img src='https://cdn.bio.link/uploads/profile_pictures/2023-08-09/ZCXnagobVPlSSCAOrumGbLsEQI1KPYsq.png'></img>
          </label>
        </div>

        <div>
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
        </div>
      </div>

      <button type="submit">Confirm Order</button>
    </form>
  );
};

export default OrderForm;
