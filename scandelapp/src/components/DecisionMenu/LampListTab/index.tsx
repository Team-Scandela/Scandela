import {
    LampListContainer,
} from './elements';

interface LampListTabProps {
    isDark: boolean;
}

const LampListTab: React.FC<LampListTabProps> = ({ isDark }) => {

    return (
        <div>
            <LampListContainer />
        </div>
    );
}

export default LampListTab;