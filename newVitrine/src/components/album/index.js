import {
    AlbumContainer,
    AlbumLine,
    AlbumPic,
    AlbumTitle,
    AlbumBox,
    AlbumText,
} from './elements';
import ib from '../../assets/portrait/ib.jpeg';
import na from '../../assets/portrait/na.jpg';
import td from '../../assets/portrait/td.jpeg';
import vh from '../../assets/portrait/vh.jpeg';
import ks from '../../assets/portrait/ks.jpeg';

const Album = () => {
    return (
        <AlbumContainer>
            <AlbumLine>
                <AlbumTitle>Notre équipe</AlbumTitle>
                <AlbumBox>
                    <AlbumPic src={na} alt="" />
                    <AlbumText>Nassim Alaimi</AlbumText>
                    <AlbumText>Développeur Fullstack</AlbumText>
                </AlbumBox>
                <AlbumBox>
                    <AlbumPic src={ib} alt="" />
                    <AlbumText>Ismael Brossaud</AlbumText>
                    <AlbumText>Développeur Backend</AlbumText>
                </AlbumBox>
                <AlbumBox>
                    <AlbumPic src={td} alt="" />
                    <AlbumText>Titouan Deschanels</AlbumText>
                    <AlbumText>Développeur Fullstack</AlbumText>
                </AlbumBox>
            </AlbumLine>
            <AlbumLine>
                <AlbumBox>
                    <AlbumPic src={vh} alt="" />
                    <AlbumText>Victor Harri-Chal</AlbumText>
                    <AlbumText>Développeur Frontend</AlbumText>
                </AlbumBox>
                <AlbumBox>
                    <AlbumPic src="https://via.placeholder.com/200" alt="" />
                    <AlbumText>Enzo Laurent</AlbumText>
                    <AlbumText>Développeur Backend</AlbumText>
                </AlbumBox>
                <AlbumBox>
                    <AlbumPic src={ks} alt="" />
                    <AlbumText>Kéon Savic</AlbumText>
                    <AlbumText>Développeur Backend</AlbumText>
                </AlbumBox>
                <AlbumBox>
                    <AlbumPic src="https://via.placeholder.com/200" alt="" />
                    <AlbumText>Marvin Verain</AlbumText>
                    <AlbumText>Développeur Frontend</AlbumText>
                </AlbumBox>
            </AlbumLine>
        </AlbumContainer>
    );
};

export default Album;
