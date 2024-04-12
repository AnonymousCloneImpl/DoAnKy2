import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import '@fortawesome/fontawesome-svg-core/styles.css';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {library} from "@fortawesome/fontawesome-svg-core";
import Image from "next/image";

library.add(faPaperPlane);

export default function RegisterFrom() {
    return (
        <div className="w-full flex justify-center mt-64">
            <div className="w-10/12 flex bg-white rounded-2xl">
                <div className="w-2/12 flex flex-col justify-center items-end">
                    <Image src="/logo/sub-logo.png" width="50" height="50" className="w-8/12 h-4/5"
                           alt="register_logo"/>
                </div>
                <div className="w-6/12 h-2/4 text-center m-auto">
                    <h4 className="text-2xl font-bold">Đăng ký nhận tin</h4>
                    <p>Đăng ký để nhận những chương trình khuyến mại hot nhất của Anonymous Shop</p>
                </div>
                <div className="w-3/12 h-full flex flex-row items-center">
                    <input
                        type="email"
                        className="pl-4 outline-none h-2/6 w-9/12 border rounded-2xl z-1"
                        placeholder="Enter your email..."
                    />
                    <button type="submit" className="h-2/6 w-3/12 border -ml-8 rounded-2xl z-2 bg-blue-600">
                        <FontAwesomeIcon icon="fa-solid fa-paper-plane" style={{color: 'white'}}/>
                    </button>
                </div>
            </div>
        </div>
    )
}