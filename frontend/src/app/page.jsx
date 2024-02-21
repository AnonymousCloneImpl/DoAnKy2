import RegisterFrom from "../components/register/registerFrom"

import dotenv from 'dotenv';

dotenv.config();

export default function Home() {
    return (
        <div className="mt-50">
            <RegisterFrom></RegisterFrom>
            <RegisterFrom></RegisterFrom>
            <RegisterFrom></RegisterFrom>
            <RegisterFrom></RegisterFrom>
        </div>
    )
}
