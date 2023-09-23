import Header from '../components/Molecules/Header'
import Footer from "../components/Molecules/Footer";

// eslint-disable-next-line react/prop-types
const Layout = ({children})=>{
    return (
        <div className=' min-h-screen w-full'>
            <Header/>
            {children}
            <Footer/>
        </div>
    )
}

export default Layout;