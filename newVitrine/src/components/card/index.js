import { CardContainer, CardPic, CardTitle, CardText } from './elements';

const Card = ({ title, description, pic }) => {
    return (
        <CardContainer>
            <CardPic src={pic} alt=""/>
            <CardTitle>{title}</CardTitle>
            <CardText>{description}</CardText>
        </CardContainer>
    );
};

export default Card;