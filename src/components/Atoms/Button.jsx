function Button({
    title,
    type,
    onClick,
    color,
}) {
    return (
        <button
            type={type ?? 'submit'}
            className={`${color ?? "bg-blue-400"} mx-4 px-5 py-2 rounded text-white cursor-pointer`}
            onClick={onClick}
        >
            {title ?? 'Submit'}
        </button>
    );
}

export default Button