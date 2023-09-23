
const TextAreaInput = ({value,readonly}) => {
    console.log('isivalue',value)
    return (
        <div className='p-5'>
            <textarea
                className='w-full bg-transparent focus:border-none focus:outline-none resize-none'
                cols={30}
                rows={10}
                value={value}
                disabled={readonly}
            />
        </div>
    );
}

export default TextAreaInput