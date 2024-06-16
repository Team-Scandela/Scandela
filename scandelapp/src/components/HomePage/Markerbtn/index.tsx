import { MarkerButton, MarkerTitle } from './elements';

interface MarkerbtnProps {
    onClick: () => void;
    icon: string | React.ReactNode;
    title: string;
    small: boolean;
}

const Markerbtn: React.FC<MarkerbtnProps> = ({ onClick, icon, title, small }) => {
    return (
        <div>
            <MarkerTitle small={small}>
                {title}
            </MarkerTitle>
            <MarkerButton onClick={onClick} small={small}>
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
