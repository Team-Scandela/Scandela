
interface ProfilProps {
    closeToMainApp: () => void;
}

const Profil: React.FC<ProfilProps> = ( { closeToMainApp } ) => {

    return (
        <div>
            <h1>Profil</h1>
        </div>
    );
}

export default Profil;