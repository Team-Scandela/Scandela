import { FeaturesCardsDetailContainer} from './elements';
import Card from '../card';
import { Green, Yellow, Red, Grey } from '../../colors';
import { IoMdDownload } from "react-icons/io";
import { MdOutlineHistory, MdControlPoint } from "react-icons/md";
import { PiSquareHalfBottomFill } from "react-icons/pi";

const FeaturesCardsDetail = () => {
    return (
        <FeaturesCardsDetailContainer>
            <Card title="Export de données" text="Exportez les données de votre parc d'éclairage public pour les utiliser directement sur le terrain" icon={<IoMdDownload color={Yellow}/>} />
            <Card title="Historique des actions" text="Consultez l'historique de toutes les actions effectuées sur votre parc d'éclairage public" icon={<MdOutlineHistory color={Red}/>} />
            <Card title="Indicateurs d'états" text="Visualisez les indicateurs d'états de votre parc d'éclairage public pour une meilleure compréhension globale" icon={<PiSquareHalfBottomFill color={Grey}/>} />
            <Card title="Plein d'autres fonctionnalités" text="Découvrez toutes les fonctionnalités de Scandela pour une gestion optimale de votre parc d'éclairage public" icon={<MdControlPoint color={Green}/>} />
        </FeaturesCardsDetailContainer>
    );
}

export default FeaturesCardsDetail;