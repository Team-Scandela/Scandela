import { FeaturesCardsContainer} from './elements';
import Card from '../card';
import { Green, Yellow, Red } from '../../colors';
import { FaMap, FaHandsHelping, FaPaintBrush } from "react-icons/fa";
import { MdFilter } from "react-icons/md";

const MainPageFeaturesCards = () => {
    return (
        <FeaturesCardsContainer>
            <Card title="Interface moderne" text="Visualisez votre parc d'éclairage public via une interface peaufinée par nos soins." icon={<FaPaintBrush color={Yellow}/>} />
            <Card title="Conseils personnalisés" text="Accèdez à nos propositions d'optimisations personnalisées pour les lampadaires de votre ville." icon={<FaHandsHelping color={Green}/>} />
            <Card title="Mode de visualisations variés" text="Profitez des nombreux filtres proposés par Scandela afin d'analyser sous différents angles votre parc d'éclairage." icon={<MdFilter color={Red}/>} />
        </FeaturesCardsContainer>
    );
}

export default MainPageFeaturesCards;