const TextAreaInput = ({ value, readonly, placeholder, onChange = () => {} }, style) => {
    return (
        <div className={readonly ? "w-full" : style}>
            <textarea
                className='w-full bg-transparent focus:border-none border-none outline-none focus:outline-none resize-none overflow-y-auto hover:outline px-5'
                cols={30}
                rows={9}
                value={value}
                disabled={readonly}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
};

export default TextAreaInput;
