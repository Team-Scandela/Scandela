import { MarkerButton } from "./elements";

interface MarkerbtnProps {
    onClick: () => void;
    icon: string | React.ReactNode;
    top : number;
    left : number;
};

const Markerbtn: React.FC<MarkerbtnProps> = ({ onClick, icon, top, left }) => {
    return (
        <div>
            <MarkerButton onClick={onClick} top={top} left={left}>
                {typeof icon === 'string' ? (
                    <img src={icon} alt="Marker Icon" />
                ) : (
                    icon
                )}
            </MarkerButton>
        </div>
    );
};

export default Markerbtn;