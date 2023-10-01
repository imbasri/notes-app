import React from 'react'
import Button from '../Atoms/Button'

function Modal({title,body,Onclick}) {
  return (
      <div className='absolute z-[9999] bg-slate-100 opacity-90 flex justify-center items-center h-[140vh] m-auto top-0 w-[100vw] font-mono'>
          <div className='flex justify-around items-center bg-blue-200 flex-col h-[300px] w-[300px] m-auto rounded-md p-3 opacity-100'>
              <div className='h-full'>
                  <p className='py-5 text-xl text-center'>{title}</p>
                  <p className='text-base'>
                      {body}
                  </p>
              </div>
              <Button title={'OK'}
                  style={
                      "hover:bg-green-400 rounded font-mono text-base w-full  cursor-pointer py-2 px-2 text-center"
                  }
                  onClick={Onclick}
              />
          </div>
      </div>
  );
}

export default Modal