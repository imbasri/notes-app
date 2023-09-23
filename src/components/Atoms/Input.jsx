import React from "react";

function Input({ type = "text", value, id = "", name = "", onChange = () => {}, size = "250px" }) {
    console.log('inivalue',value)

    return (
        <>
            <input
                type={type}
                name={name}
                id={id}
                value={value}
                onChange={onChange}
                className={`mx-4 px-3 py-2 rounded`}
                style={{ width: size }}
            />
        </>
    );
}

export default Input;