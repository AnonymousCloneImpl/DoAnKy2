
export default function Loading() {
    return (
        <div
            className="flex w-full items-center justify-center"
            style={{
                height: '300px'
            }}>
            <div className={"text-center flex flex-wrap justify-center"}>
                <div className="loading-spinner"/>
                <p className="w-full relative">
                    Loading...
                </p>
            </div>
        </div>
    )
}