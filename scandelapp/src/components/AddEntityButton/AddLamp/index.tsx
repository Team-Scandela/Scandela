interface AddLampProps {
    isDark: boolean;
}

interface Bulb {
    name: string;
    intensity: number;
}

interface Lamp {
    name: string;
    address: string;
    lat: number;
    long: number;
    height: number;
    lamptype: string;
    foyertype: string;
}

const AddLamp: React.FC<AddLampProps> = ({ isDark }) => {
    return <div></div>;
};

export default AddLamp;
