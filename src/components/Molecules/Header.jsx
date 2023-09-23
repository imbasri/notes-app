import Search from "./Search";

function Header() {
  return (
      <>
          <header className="flex justify-between items-center w-full bg-indigo-200 mx-auto px-20">
            <h1 className="text-3xl font-bold">Notes Apps</h1>
            <Search />
          </header>
      </>
  );
}

export default Header