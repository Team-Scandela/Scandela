import Menubar from '../components/menubar';
import Footer from '../components/footer';
import BackToTop from '../components/backtotop';
import Header from '../components/header';
import {White} from '../colors';

const Page = ({ title, text, children }) => {

    return (
        <div style={{ backgroundColor: White}}>
            <Menubar/>
            <div style={{ marginTop: '100px' }}>
                <Header title={title} text={text} />
                {children}
            </div>
            <Footer/>
            <BackToTop/>
        </div>
    );
};

export default Page;
