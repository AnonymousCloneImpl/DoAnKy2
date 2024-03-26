import Link from "next/link";

export default function Component1() {
    return (
        <div
            style={{
                height: '550px',
                backgroundImage: 'url("https://images.acer.com/is/image/acer/predator-helios-16-ph16-72-perkey-backlit-on-wp-black-01-1?$Series-Component-XL$")',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#F3F2F2',
                borderRadius: '16px'
            }}
            className="bg-gray-100 relative ml-1 mr-1">
            <div className="absolute bottom-12 left-10">
                <p className="text-2xl h-16 flex items-center">
                    20% Off On Laptop
                </p>
                <p className="text-base flex flex-wrap w-5/6 h-16">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.
                </p>
                <Link
                    href="/laptop?sale=20"
                    className="w-1/3 h-10 flex flex-wrap bg-black hover:bg-gray-600 rounded-lg"
                >
                    <p className="w-full h-full flex items-center justify-center text-white">
                        CHECK OUT
                    </p>
                </Link>
            </div>
        </div>
    )
}