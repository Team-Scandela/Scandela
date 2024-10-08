import Page from './page';
import Duotext from '../components/duotext';
import DuoRect from '../components/duorect';
import FeaturesCards from '../components/featurescards';
import FeaturesCardsDetail from '../components/featuresdetailscard';
import decisionPannelImg from '../assets/aide-a-la-decision.PNG';
import pinFilterImg from '../assets/pin-filter.PNG';

const Features = () => {
    return (
        <Page
            title="Qu'est-ce que Scandela ?"
            text="Découvrez la plus-value et les fonctionnalités de notre solution."
            header={true}
        >
            <Duotext
                title={
                    <span
                        dangerouslySetInnerHTML={{
                            __html: "Optimisez la gestion et la maintenance <br/>de votre parc d'éclairage public",
                        }}
                    />
                }
                text="Economisez du temps et de l'argent en utilisant Scandela."
            />
            <FeaturesCards />
            <DuoRect
                title="Aide à la décision"
                text="Scandela vous aide à prendre les bonnes décisions pour votre parc d'éclairage public grâce à des recommandations spécifiques et personnalisées."
                img={decisionPannelImg}
                imgSize={'800px'}
                switchValue={true}
            />
            <DuoRect
                title="Filtres de visualisation"
                text="Grâce à des filtres, vous pouvez afficher uniquement les données qui vous intéressent et avoir des vues détaillées de votre parc d'éclairage public."
                img={pinFilterImg}
                imgSize={'800px'}
                switchValue={false}
            />
            <FeaturesCardsDetail />
        </Page>
    );
};

export default Features;
