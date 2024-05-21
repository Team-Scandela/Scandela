import Page from './page';
import OfferCards from '../components/offercards';

const Offers = () => {
    return (
        <Page
            title="Nos offres"
            text="Découvrez nos offres et trouvez celle qui vous convient le mieux. Tout changement d'offre se fera directement sur notre application après vous être connecté !"
            header={true}
        >
            <OfferCards />
        </Page>
    );
};

export default Offers;
