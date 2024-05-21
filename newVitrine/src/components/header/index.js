import { HeaderContainer, HeaderTitle, HeaderText } from './elements';

const Header = ({ title, text }) => {
    return (
        <HeaderContainer>
            <HeaderTitle>{title}</HeaderTitle>
            <HeaderText>{text}</HeaderText>
        </HeaderContainer>
    );
};

export default Header;
