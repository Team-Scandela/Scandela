import { BackButton } from "./elements";
import { TbArrowBackUp } from "react-icons/tb";


interface BackbtnProps {
    onClick: () => void;
};

const Backbtn: React.FC<BackbtnProps> = ({ onClick }) => {
    return (
        <BackButton onClick={onClick}>
            <TbArrowBackUp />
        </BackButton>
    );
};

export default Backbtn;