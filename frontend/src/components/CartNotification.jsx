import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export default function CartNotification({ cartNotifications }) {

  return (
    <>
      {cartNotifications !== [] ? (
        <>
          {cartNotifications.map((item, index) => (
            <div key={index}>
              <div
                className="cart-notification"
                style={{ bottom: `${10 + index * 40}px`, display: 'block' }}
              >
                <FontAwesomeIcon className="cart-check" icon={faCircleCheck} />
                {item.message}
              </div>
            </div>
          ))}
        </>
      ) : (
        <></>
      )}
    </>
  )
}
