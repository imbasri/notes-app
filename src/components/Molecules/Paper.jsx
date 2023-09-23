import Button from "../Atoms/Button";
import TextAreaInput from "../Atoms/TextArea"
import {getInitialData} from '../../utils/index'
import { useEffect } from "react";
function Paper({ id, title, body, archived, createdAt, readonly, onchange, dataDeleted,dataArchived }) {
    const Data = JSON.parse(sessionStorage.getItem("Data"));
     const deletedPaper = () => {
         // Panggil function yang dikirimkan dari komponen induk
         Data.filter((item)=>{
            if(item.id === id){
                 dataDeleted({item})
            }
         })
     };
        const archivedPaper = () => {
            // Panggil function yang dikirimkan dari komponen induk
            Data.filter((item) => {
                if (item.id === id) {
                    dataArchived({ item });
                }
            });
        };
        
    return (
        <div className='bg-red-200 w-80 m-0 shadow-md rounded-md relative'>
            <div className='flex flex-col justify-between py-3 px-5 '>
                <p className='text-lg'>{title}</p>
                <p>{createdAt}</p>
            </div>
            <TextAreaInput value={body} readonly={readonly ?? true} />
            <div
                className={`border-t-2 border-black border border-dashed flex ${
                    onchange ? "justify-between" : "justify-center"
                } absolute bottom-0 w-full`}
            >
                {onchange ? (
                    <Button title={archived ? "Pindahkan" : "Arsipkan"} onClick={archivedPaper} />
                ) : null}
                {onchange ? <Button title={"Deleted"} onClick={deletedPaper} /> : null}
                {onchange ? null : <Button title={'Save'}/>}
            </div>
        </div>
    );
}

export default Paper