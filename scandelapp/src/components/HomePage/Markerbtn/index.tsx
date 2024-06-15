import { MarkerButton, MarkerTitle } from './elements';

interface MarkerbtnProps {
    onClick: () => void;
    icon: string | React.ReactNode;
    top: number;
    left: number;
    title : string;
    small : boolean;
}

const Markerbtn: React.FC<MarkerbtnProps> = ({ onClick, icon, top, left, title, small }) => {
    return (
        <div>
            <MarkerButton onClick={onClick} top={top} left={left} small={small}>
                {typeof icon === 'string' ? (
                    <img src={icon} alt="Marker Icon" />
                ) : (
                    icon
                )}
            </MarkerButton>
            <MarkerTitle top={top} left={left} small={small}>
                {title}
            </MarkerTitle>
        </div>
    );
};

export default Markerbtn;
