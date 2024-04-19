import Page from './page';
import Timeline from '../components/timeline';
import DuoRect from '../components/duorect';
import Album from '../components/album';
import logo from '../assets/logo-128x128-yellow.png';

const About = () => {
    return (
        <Page>
            <DuoRect
                img={logo}
                title="L'histoire de Scandela"
                text="Nous sommes un groupe de 7 étudiants nantais, passionnés par le développement web et le design. Pour notre projet de fin d'études, nous avons décidé de créer Scandela, un logiciel de visualisation et d'aide à la décision destiné aux professionels de l'éclairage public."
                switchValue={false}
            />
            <Timeline />
            <Album />
        </Page>
    );
};

export default About;