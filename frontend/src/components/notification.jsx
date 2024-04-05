import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck} from "@fortawesome/free-solid-svg-icons";

export default function Notification({notification, index}) {
    return (
        <div>
            <div
                className="cart-notification"
                style={{bottom: `${10 + index * 40}px`, display: 'block'}}
            >
                <FontAwesomeIcon className="cart-check" icon={faCircleCheck}/>
                {notification.message}
            </div>
        </div>
    )
}