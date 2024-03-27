import Link from "next/link";

export default function Component1() {
    return (
        <div className="top-home-page flex justify-center flex-wrap bg-gray-100 ml-1 mr-1">
            <div
                style={{
                    height: '60%',
                    width: '80%',
                    backgroundImage: 'url("https://images.acer.com/is/image/acer/predator-helios-16-ph16-72-perkey-backlit-on-wp-black-01-1?$Series-Component-XL$")',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: '#F3F2F2',
                    borderRadius: '16px'
                }}
                className="top-home-page-image">
            </div>
            <div className="top-home-page-text flex flex-wrap justify-start w-10/12">
                <p className="text-2xl flex items-center">
                    20% Off On Laptop
                </p>
                <p className="text-base flex flex-wrap">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.
                </p>
                <Link
                    href="/laptop?sale=20"
                    className="h-10 flex flex-wrap bg-black hover:bg-gray-600 rounded-lg"
                >
                    <p className="w-full h-full flex items-center justify-center text-white mx-3">
                        CHECK OUT
                    </p>
                </Link>
            </div>
        </div>
    )
}