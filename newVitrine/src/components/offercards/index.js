import { OfferCardsContainer, OfferCard, OfferTitle, OfferText, OfferButton, OfferSubtitle, OfferItem } from './elements';
import { Link } from 'react-router-dom';
// import cross icon from react-icons
import { FaTimes, FaCheck } from 'react-icons/fa';


const ItemYes = ({content}) => {
    return (
        <OfferItem>
            <FaCheck />
            <p>{content}</p>
        </OfferItem>
    );
}

const ItemNo = ({content}) => {
    return (
        <OfferItem>
            <FaTimes />
            <p>{content}</p>
        </OfferItem>
    );
}

const OfferCards = () => {

    return (
        <OfferCardsContainer>
            <OfferCard alt={false}>
                <OfferTitle alt={false}>Scandela</OfferTitle>
                <OfferSubtitle alt={false}>Version de démonstration</OfferSubtitle>
                <OfferText alt={false}>Découvrez notre logiciel de visualisation et d'aide à la décision destiné aux professionels de l'éclairage public grâce à cette version gratuite de démonstration.</OfferText>
                <ItemNo content="Nombre de points lumineux illimité" />
                <ItemYes content="Nombre de points lumineux illimité" />
                <ItemNo content="Nombre de points lumineux illimité" />
                <ItemYes content="Nombre de points lumineux illimité" />
                <ItemNo content="Nombre de points lumineux illimité" />
                <ItemYes content="Nombre de points lumineux illimité" />
                <ItemNo content="Nombre de points lumineux illimité" />
                <ItemYes content="Nombre de points lumineux illimité" />
                <ItemNo content="Nombre de points lumineux illimité" />
                <ItemYes content="Nombre de points lumineux illimité" />
            </OfferCard>
            <OfferCard alt={true}>
                <OfferTitle alt={true}>Scandela +</OfferTitle>
                <OfferSubtitle alt={true}>Version complète</OfferSubtitle>
                <OfferText alt={true}>Profitez de l'ensemble des fonctionnalités de Scandela pour une utilisation optimale et complète.</OfferText>
                <OfferText alt={true}></OfferText> {/* empty line don't remove */}
                <ItemNo content="Nombre de points lumineux illimité" />
                <ItemYes content="Nombre de points lumineux illimité" />
                <ItemNo content="Nombre de points lumineux illimité" />
                <ItemYes content="Nombre de points lumineux illimité" />
                <ItemNo content="Nombre de points lumineux illimité" />
                <ItemYes content="Nombre de points lumineux illimité" />
                <ItemNo content="Nombre de points lumineux illimité" />
                <ItemYes content="Nombre de points lumineux illimité" />
                <ItemNo content="Nombre de points lumineux illimité" />
                <ItemYes content="Nombre de points lumineux illimité" />
                <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}><OfferButton alt={true}>En savoir plus</OfferButton></Link>
            </OfferCard>
        </OfferCardsContainer>
    );
}

export default OfferCards;