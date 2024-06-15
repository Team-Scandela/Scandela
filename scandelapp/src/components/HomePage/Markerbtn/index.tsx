import { MarkerButton } from "./elements";

interface MarkerbtnProps {
    onClick: () => void;
};

const Markerbtn: React.FC<MarkerbtnProps> = ({ onClick }) => {
    return (
        <div>
            <MarkerButton onClick={onClick}>Signaler un problème</MarkerButton>
        </div>
    );
};

export default Markerbtn;