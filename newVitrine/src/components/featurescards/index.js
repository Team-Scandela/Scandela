import { FeaturesCardsContainer} from './elements';
import Card from '../card';
import { Green, Yellow, Red } from '../../colors';
import { FaMap } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { MdOutlineAutoGraph } from "react-icons/md";

const FeaturesCards = () => {
    return (
        <FeaturesCardsContainer>
            <Card title="Visualisation" text="Visualisez votre parc d'éclairage public sur une carte interactive." icon={<FaMap color={Green}/>} />
            <Card title="Analyse" text="Analysez les données de votre parc d'éclairage public pour en tirer des informations utiles." icon={<FaGear color={Yellow}/>} />
            <Card title="Optimisation" text="Optimisez votre parc d'éclairage public grâce à des simulations et des recommandations." icon={<MdOutlineAutoGraph color={Red}/>} />
        </FeaturesCardsContainer>
    );
}

export default FeaturesCards;