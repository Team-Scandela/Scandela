import { AlbumContainer, AlbumLine, AlbumPic, AlbumTitle, AlbumBox, AlbumText } from "./elements";


const Album = () => {
    return (
        <AlbumContainer>
            <AlbumLine>
                <AlbumTitle>Notre équipe</AlbumTitle>
                <AlbumBox>
                    <AlbumPic src="https://via.placeholder.com/200" alt=""/>
                    <AlbumText>Nassim Alaimi</AlbumText>
                    <AlbumText>Développeur Fullstack</AlbumText>
                </AlbumBox>
                <AlbumBox>
                    <AlbumPic src="https://via.placeholder.com/200" alt=""/>
                    <AlbumText>Ismael Brossaud</AlbumText>
                    <AlbumText>Développeur Backend</AlbumText>
                </AlbumBox>
                <AlbumBox>
                    <AlbumPic src="https://via.placeholder.com/200" alt=""/>
                    <AlbumText>Titouan Deschanels</AlbumText>
                    <AlbumText>Développeur Fullstack</AlbumText>
                </AlbumBox>
            </AlbumLine>
            <AlbumLine>
                <AlbumBox>
                    <AlbumPic src="https://via.placeholder.com/200" alt=""/>
                    <AlbumText>Victor Harri-Chal</AlbumText>
                    <AlbumText>Développeur Frontend</AlbumText>
                </AlbumBox>
                <AlbumBox>
                    <AlbumPic src="https://via.placeholder.com/200" alt=""/>
                    <AlbumText>Enzo Laurent</AlbumText>
                    <AlbumText>Développeur Backend</AlbumText>
                </AlbumBox>
                <AlbumBox>
                    <AlbumPic src="https://via.placeholder.com/200" alt=""/>
                    <AlbumText>Kéon Savic</AlbumText>
                    <AlbumText>Développeur Backend</AlbumText>
                </AlbumBox>
                <AlbumBox>
                    <AlbumPic src="https://via.placeholder.com/200" alt=""/>
                    <AlbumText>Marvin Verain</AlbumText>
                    <AlbumText>Développeur Frontend</AlbumText>
                </AlbumBox>
            </AlbumLine>
        </AlbumContainer>
    )
}

export default Album;