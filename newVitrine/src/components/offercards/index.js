import { OfferCardsContainer, OfferCard, OfferTitle, OfferText, OfferButton, OfferSubtitle, OfferItem } from './elements';
import { Link } from 'react-router-dom';
import { FaTimes, FaCheck } from 'react-icons/fa';
import { Green, Red } from '../../colors';


const ItemYes = ({content, alt}) => {
    return (
        <OfferItem alt={alt}>
            <FaCheck color={Green}/>
            <p>{content}</p>
        </OfferItem>
    );
}

const ItemNo = ({content, alt}) => {
    return (
        <OfferItem alt={alt}>
            <FaTimes color={Red}/>
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
                <ItemNo alt={false} content="Nombre de points lumineux illimité" />
                <ItemYes alt={false} content="Nombre de points lumineux illimité" />
                <ItemNo alt={false} content="Nombre de points lumineux illimité" />
                <ItemYes alt={false} content="Nombre de points lumineux illimité" />
                <ItemNo alt={false} content="Nombre de points lumineux illimité" />
                <ItemYes alt={false} content="Nombre de points lumineux illimité" />
                <ItemNo alt={false} content="Nombre de points lumineux illimité" />
                <ItemYes alt={false} content="Nombre de points lumineux illimité" />
                <ItemNo alt={false} content="Nombre de points lumineux illimité" />
                <ItemYes alt={false} content="Nombre de points lumineux illimité" />
            </OfferCard>
            <OfferCard alt={true}>
                <OfferTitle alt={true}>Scandela +</OfferTitle>
                <OfferSubtitle alt={true}>Version complète</OfferSubtitle>
                <OfferText alt={true}>Profitez de l'ensemble des fonctionnalités de Scandela pour une utilisation optimale et complète.</OfferText>
                <OfferText alt={true}></OfferText> {/* empty line don't remove */}
                <ItemNo alt={true} content="Nombre de points lumineux illimité" />
                <ItemYes alt={true} content="Nombre de points lumineux illimité" />
                <ItemNo alt={true} content="Nombre de points lumineux illimité" />
                <ItemYes alt={true} content="Nombre de points lumineux illimité" />
                <ItemNo alt={true} content="Nombre de points lumineux illimité" />
                <ItemYes alt={true} content="Nombre de points lumineux illimité" />
                <ItemNo alt={true} content="Nombre de points lumineux illimité" />
                <ItemYes alt={true} content="Nombre de points lumineux illimité" />
                <ItemNo alt={true} content="Nombre de points lumineux illimité" />
                <ItemYes alt={true} content="Nombre de points lumineux illimité" />
                <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}><OfferButton alt={true}>En savoir plus</OfferButton></Link>
            </OfferCard>
        </OfferCardsContainer>
    );
}

export default OfferCards;