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
                <ItemYes alt={false} content="Une carte intéractive de notre ville de démonstration" />
                <ItemYes alt={false} content="Une visualisation des lampadaires de la ville" />
                <ItemYes alt={false} content="Une visualisation des zones d'éclairage" />
                <ItemYes alt={false} content="Les états des ampoules de chaque lampadaires" />
                <ItemYes alt={false} content="Le traffic de la ville" />
                <ItemYes alt={false} content="Les armoires éléctriques de la ville" />
                <ItemNo alt={false} content="L'aide à la décision de Scandela" />
                <ItemNo alt={false} content="Les 3 indicateurs d'états de Scandela" />
                <ItemNo alt={false} content="Les prix et gains des optimisations choisies en temps réel" />
                <ItemNo alt={false} content="Exportation de vos décisions en pdf" />
            </OfferCard>
            <OfferCard alt={true}>
                <OfferTitle alt={true}>Scandela +</OfferTitle>
                <OfferSubtitle alt={true}>Version complète</OfferSubtitle>
                <OfferText alt={true}>Profitez de l'ensemble des fonctionnalités de Scandela pour une utilisation optimale et complète.</OfferText>
                <OfferText alt={true}></OfferText> {/* empty line don't remove */}
                <ItemYes alt={true} content="Toutes les fonctionnalités de la version démo" />
                <ItemYes alt={true} content="L'aide à la décision de Scandela" />
                <ItemYes alt={true} content="Des propositions d'optimisations sur vos lampadaires" />
                <ItemYes alt={true} content="Un indicateur d'état sur la qualité d'éclairage" />
                <ItemYes alt={true} content="Un indicateur d'état sur l'impact environnemental" />
                <ItemYes alt={true} content="Un indicateur d'état sur la consommation énergétique" />
                <ItemYes alt={true} content="Les prix et gains des optimisations choisies en temps réel" />
                <ItemYes alt={true} content="Exportation de vos décisions sous la forme d'un bilan" />
                <ItemYes alt={true} content="Un suivi de vos lampadaires en votre absence" />
                <ItemYes alt={true} content="Le coût en temps réel de l'éléctricité en France" />
                <Link to="/features" style={{ textDecoration: 'none', color: 'inherit' }}><OfferButton alt={true}>En savoir plus</OfferButton></Link>
            </OfferCard>
        </OfferCardsContainer>
    );
}

export default OfferCards;