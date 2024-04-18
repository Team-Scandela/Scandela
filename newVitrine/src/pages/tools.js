import styled from 'styled-components'
import HomeHead from '../components/homehead';
import Menubar from '../components/menubar';

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    padding-top : 80px;
    margin : 0 auto;
`;

const Tools = () => {
    return (
        <div>
            <Menubar />
            <HomeContainer>
                <HomeHead />
                <h1>Welcome to the Tools Page!</h1>
                <h1>Welcome to the Tools Page!</h1>
                <h1>Welcome to the Tools Page!</h1>
                <h1>Welcome to the Tools Page!</h1>
                <h1>Welcome to the Tools Page!</h1>
                <h1>Welcome to the Tools Page!</h1>
                <h1>Welcome to the Tools Page!</h1>
                <h1>Welcome to the Tools Page!</h1>
                <h1>Welcome to the Tools Page!</h1>
            </HomeContainer>
        </div>
    );
};

export default Tools;