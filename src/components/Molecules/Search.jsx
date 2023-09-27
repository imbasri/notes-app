import { useState } from 'react';
import Button from '../Atoms/Button';
import Input from '../Atoms/Input';

function Search({ dataSearch,scrollPosition }) {
    const [type, setType] = useState("");
    const onChange = (e) => {
        setType(e.target.value);
    };
    const onSearch = (e) => {
        e.preventDefault();
        sessionStorage.setItem("Search", JSON.stringify(type));
        dataSearch(type);
    };
    return (
        <form className='flex justify-center items-center p-3'>
            <Input
                type={"text"}
                value={type}
                onChange={onChange}
                placeholder='🔍search'
                style={`px-3 py-2 rounded w-[90%] lg:w-[400px] md:w-[300px] sm:w-[200px] ${
                    scrollPosition > 20 ? "bg-slate-300" : "bg-bg-white"
                } placeholder:text-slate-900 focus:border-none focus:outline-none`}
            />
            <Button
                title='Search'
                type='submit'
                onClick={onSearch}
                style={`hover:bg-slate-400 rounded font-mono text-base w-[1/2] cursor-pointer py-2 px-4 text-center shadow-md ml-2 ${
                    scrollPosition > 20 ? "bg-slate-300" : "bg-white border border-slate-600"
                }`}
            />
        </form>
    );
}

export default Search