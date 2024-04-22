import HomeHead from '../components/homehead';
import Page from './page';
import DuoRect from '../components/duorect';
import Title from '../components/title';
import FeaturesCards from '../components/featurescards';
import HomeContact from '../components/homecontact';

const Home = () => {
    return (
        <Page>
            <HomeHead />
            <DuoRect
                img="https://via.placeholder.com/300x300.png"
                title="Simplifier la gestion de votre parc d'éclairage public"
                text="Scandela vous permet de gérer votre parc d'éclairage public de manière simple et efficace. Il vous aide à prendre les bonnes décisions pour optimiser votre parc et économiser du temps et de l'argent."
                switchValue={true}
            />
            <Title title="Votre solution de demain" />
            <FeaturesCards />
            <DuoRect
                img="https://via.placeholder.com/300x300.png"
                title="Visualisation et aide à la décision"
                text="Scandela est un logiciel de visualisation et d'aide à la décision destiné aux professionnels de l'éclairage public. Il permet de visualiser des données lumineuses et de les analyser pour prendre des décisions éclairées."
                switchValue={false}
                altBckg={true}
            />
            <HomeContact />

        </Page>
    );
};

export default Home;