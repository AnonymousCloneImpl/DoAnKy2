import Notification from "@/components/notification";

export default function NotificationRender({cartNotifications}) {

    return (
        <>
            {cartNotifications !== [] ? (
                <>
                    {cartNotifications.map((item, index) => (
                        <div key={index}>
                            <Notification notification={item} index={index} />
                        </div>
                    ))}
                </>
            ) : (
                <></>
            )}
        </>
    )
}