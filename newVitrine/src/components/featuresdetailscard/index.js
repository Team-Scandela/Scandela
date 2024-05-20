import { FeaturesCardsDetailContainer } from './elements';
import Card from '../card';
import { Green, Yellow, Red } from '../../colors';
import { IoMdDownload } from 'react-icons/io';
import { MdOutlineHistory } from 'react-icons/md';
import { LuGaugeCircle } from 'react-icons/lu';
import { CiBadgeDollar } from 'react-icons/ci';

const FeaturesCardsDetail = () => {
    return (
        <FeaturesCardsDetailContainer>
            <Card
                title="Export de données"
                text="Exportez les données de votre parc d'éclairage public pour les utiliser directement sur le terrain"
                icon={<IoMdDownload color={Yellow} />}
            />
            <Card
                title="Historique des actions"
                text="Consultez l'historique de toutes les actions effectuées sur votre parc d'éclairage public"
                icon={<MdOutlineHistory color={Red} />}
            />
            <Card
                title="Indicateurs d'états"
                text="Visualisez les indicateurs d'états de votre parc d'éclairage public pour une meilleure compréhension globale"
                icon={<LuGaugeCircle color={Green} />}
            />
            <Card
                title="Bilan économique"
                text="Accèdez aux coûts à courts termes et gains à longs termes des actions choisies par vos soins."
                icon={<CiBadgeDollar color={Yellow} />}
            />
        </FeaturesCardsDetailContainer>
    );
};

export default FeaturesCardsDetail;
