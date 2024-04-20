import Page from './page';
import Duotext from '../components/duotext';

const Features = () => {
    return (
        <Page title="Ce que peut faire Scandela" text="Découvrez les outils et fonctionnalités de notre solution.">
            <Duotext
                title={<span dangerouslySetInnerHTML={{__html: "Optimisez la gestion et la maintenance <br/>de votre parc d'éclairage public"}} />}
                text="Economosez du temps et de l'argent en utilisant Scandela pour visualiser, analyser et optimiser votre parc d'éclairage public."
            />

        </Page>
    );
};

export default Features;