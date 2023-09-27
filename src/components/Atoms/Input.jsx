function Input({ type="text", value, id, name="", onChange = () => {},style='px-3 py-2 rounded' ,placeholder='' }) {
    return (
        <>
            <input
                type={type}
                name={name}
                id={id}
                value={value}
                onChange={onChange}
                className={style}
                placeholder={placeholder}
            />
        </>
    );
}

export default Input;
