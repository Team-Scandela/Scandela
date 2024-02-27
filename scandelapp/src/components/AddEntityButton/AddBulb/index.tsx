interface AddBulbProps {
    isDark: boolean;
}

interface Bulb {
    name: string;
    intensity: number;
}

const AddBulb: React.FC<AddBulbProps> = ({ isDark }) => {
    return <div></div>;
};

export default AddBulb;
