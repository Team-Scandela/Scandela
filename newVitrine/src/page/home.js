import styled from 'styled-components'
import HomeHead from '../components/homehead';

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    padding-top : 80px;
    margin : 0 auto;
`;

const Home = () => {
    return (
        <HomeContainer>
            <HomeHead />
            <h1>Welcome to the Home Page!</h1>
            <h1>Welcome to the Home Page!</h1>
            <h1>Welcome to the Home Page!</h1>
            <h1>Welcome to the Home Page!</h1>
            <h1>Welcome to the Home Page!</h1>
            <h1>Welcome to the Home Page!</h1>
            <h1>Welcome to the Home Page!</h1>
            <h1>Welcome to the Home Page!</h1>
        </HomeContainer>
    );
};

export default Home;