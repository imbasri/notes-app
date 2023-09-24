import Search from "./Search";

function Header({ dataSearch }) {
  const dataType = (data) => {
    dataSearch(data)
      console.log(data);
      return data
  };
    return (
        <>
            <header className='flex justify-between items-center w-full bg-indigo-200 mx-auto px-20'>
                <h1 className='text-3xl font-bold'>Notes Apps</h1>
                <Search dataSearch={dataType} />
            </header>
        </>
    );
}

export default Header