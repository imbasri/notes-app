import Header from '../components/Molecules/Header'
import Footer from "../components/Molecules/Footer";

// eslint-disable-next-line react/prop-types
const Layout = ({ children, dataSearching }) => {
    const dataSearch = (data) => {
        // dataSearching(data);
        dataSearching(data);
    };
    return (
        <div className=' min-h-screen w-full'>
            <Header dataSearch={dataSearch} />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;