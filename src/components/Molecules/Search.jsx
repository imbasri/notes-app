import { useState } from 'react';
import Button from '../Atoms/Button';
import Input from '../Atoms/Input';

function Search() {
  const [type, setType] = useState('')
  const onChange = (e) => {
    setType(e.target.value)
  }
  const onSearch = (e) => {
    e.preventDefault()
    console.log('inivaluuuee',type)
  }
  return (
      <form className='flex justify-center items-center mt-5 p-3'>
          <Input type={"text"} size={"400px"} value={type} onChange={onChange} />
          <Button
              title='Search'
              type='submit'
              color='bg-blue-400'
              hover='bg-blue-900'
              onClick={onSearch}
          />
      </form>
  );
}

export default Search