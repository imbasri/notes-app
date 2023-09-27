import { useEffect, useState } from "react";
import Search from "./Search";

function Header({ dataSearch }) {
    const dataType = (data) => {
        dataSearch(data);
        return data;
    };

    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <header
                className={`flex justify-between items-center w-full flex-col pt-5 md:flex-row ${
                    scrollPosition > 20 ? "bg-transparent" : "bg-slate-300"
                } mx-auto px-10 font-mono sticky top-0 z-50 shadow-md transition-all duration-500`}
            >
                <h1 className='text-3xl font-bold '>📒Notes Apps</h1>
                <Search dataSearch={dataType} scrollPosition={scrollPosition} />
            </header>
        </>
    );
}

export default Header;
