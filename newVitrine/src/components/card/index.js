import { CardContainer, CardPic, CardText, CardTitle } from "./elements";

const Card = ({icon, title, text}) => {
    return (
        <CardContainer>
            <CardPic>{icon}</CardPic>
            <CardTitle>{title}</CardTitle>
            <CardText>{text}</CardText>
        </CardContainer>
    );
}

export default Card;