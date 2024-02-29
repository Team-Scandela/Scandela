import { useState } from "react";
import { TrafficTimeContainer, TrafficTimeInput } from "./elements";

interface TrafficTimeProps {
    id: string;
    isDark: boolean;
    trafficTime: string;
    setTrafficTime: (item: string) => void;
}

const TrafficTime: React.FC<TrafficTimeProps> = ({ id, isDark, trafficTime, setTrafficTime }) => {

    return (
        <>
            <TrafficTimeContainer isDark={isDark}>
                <TrafficTimeInput isDark={isDark} value={trafficTime} onChange={(e : any) => setTrafficTime(e.currentTarget.value)} placeholder="00:00" />
            </TrafficTimeContainer>
        </>
    );
}

export default TrafficTime;