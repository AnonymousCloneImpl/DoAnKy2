import dotenv from 'dotenv';
import AnimationCarousel from "@/components/slider";

dotenv.config();

export default function Home() {
    return (
        <div className="slider">
            <AnimationCarousel />
        </div>
    )
}
