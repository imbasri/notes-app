function Button({
    title,
    type,
    onClick,
    style,
}) {
    return (
        <button type={type ?? "submit"} className={style} onClick={onClick}>
            {title ?? "Submit"}
        </button>
    );
}

export default Button