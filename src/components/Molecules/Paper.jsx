import Button from "../Atoms/Button";
import TextAreaInput from "../Atoms/TextArea";
import { useState } from "react";
import Input from "../Atoms/Input";
import Modal from "./Modal";
function Paper({
    id,
    title,
    body,
    archived,
    createdAt,
    readonly,
    onchange,
    dataDeleted,
    dataArchived,
    dataPost,
}) {
    const Data = JSON.parse(sessionStorage.getItem("Data"));
    const [type, setType] = useState("");
    const [text, setText] = useState("");
    const [showModal, setShowModal] = useState(false)
    const [error, setError] = useState('')
    const deletedPaper = () => {
        // Panggil function yang dikirimkan dari komponen induk
        Data.filter((item) => {
            if (item.id === id) {
                dataDeleted({ item });
            }
        });
    };
    const archivedPaper = () => {
        // Panggil function yang dikirimkan dari komponen induk
        Data.filter((item) => {
            if (item.id === id) {
                dataArchived({ item });
            }
        });
    };

    const onChange = (e) => {
        if (e.target.value.length > 50) {
            setError("karater terlalu banyak max 50");
            setShowModal(true);
            return;
        }
        setType(e.target.value);
    };
    const onChangeText = (e) => {
        setText(e.target.value);
    };
    const onPost = () => {
        if (type?.length === 0) {
            setError('mohon masukkan judul');
            setShowModal(true);
            return;
        }
        if (text?.length === 0) {
            setError('mohon masukkan isi catatan');
            setShowModal(true);
            return;
        }
        const uniqueId = new Date();
        const dataBody = {
            id: uniqueId.valueOf(),
            title: type,
            body: text,
            archived: false,
            createdAt: new Date(),
        };
        dataPost(dataBody,JSON.parse(sessionStorage.getItem("Search")))
        setType("");
        setText("");

    };
     const modalHandler = () => {
        setShowModal(false);
     };

    return (
        <>
            {showModal ? (
                <Modal title='Informasi' body={error} Onclick={modalHandler} />
            ):null}

            <div className='bg-red-200 w-full h-[380px] m-auto shadow-lg rounded-md relative font-mono'>
                <div className='flex flex-col justify-between py-3 px-5 '>
                    {onchange ? null : (
                        <p className='text-base text-right mb-2'>{`sisa karakter limit : ${
                            50 - type?.length
                        }`}</p>
                    )}
                    {onchange ? (
                        <p className='text-lg font-semibold text-ellipsis whitespace-pre-line break-words font-mono'>
                            {title}
                        </p>
                    ) : (
                        <Input
                            style='text-base bg-transparent outline-none focus:outline-none py-2 rounded w-full'
                            type={"text"}
                            size={"100%"}
                            value={type}
                            onChange={onChange}
                            placeholder='ini adalah judul...'
                        />
                    )}
                    <p>{createdAt}</p>
                </div>
                <TextAreaInput
                    style='w-full bg-transparent focus:border-none focus:outline-none resize-none overflow-y-auto '
                    value={`${onchange ? body : text}`}
                    readonly={readonly ?? true}
                    onChange={onChangeText}
                    placeholder='Tuliskan catatanmu di sini...'
                />
                <div
                    className={`p-1 shadow-lg flex ${
                        onchange ? "justify-between" : "justify-center"
                    } absolute bottom-0 w-full`}
                >
                    {onchange ? (
                        <Button
                            title={archived ? "Pindahkan📤" : "Arsipkan📥"}
                            onClick={archivedPaper}
                            style={
                                "bg-transparent hover:bg-blue-300 hover:shadow-md rounded font-mono text-base w-[50%] cursor-pointer py-2 px-4 text-center text-base"
                            }
                        />
                    ) : null}
                    {onchange ? (
                        <Button
                            title={"Deleted❌"}
                            onClick={deletedPaper}
                            style={
                                "bg-transparent hover:bg-red-300 hover:shadow-md rounded font-mono text-base w-[50%] cursor-pointer py-2 px-4 text-center text-base"
                            }
                        />
                    ) : null}
                    {onchange ? null : (
                        <Button
                            title={"Save"}
                            onClick={onPost}
                            style={
                                "bg-transparent hover:bg-green-400 hover:shadow-md rounded font-mono text-base w-[100%] cursor-pointer py-2 px-4 text-center text-base"
                            }
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default Paper;
