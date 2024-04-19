import Menubar from '../components/menubar';
import Footer from '../components/footer';
import BackToTop from '../components/backtotop';
import {White} from '../colors';

const Page = ({ children }) => {

    return (
        <div style={{ backgroundColor: White}}>
            <Menubar/>
            <div style={{ marginTop: '100px' }}>
                {children}
            </div>
            <Footer/>
            <BackToTop/>
        </div>
    );
};

export default Page;
