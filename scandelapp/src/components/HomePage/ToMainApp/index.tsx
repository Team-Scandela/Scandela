import { ToMainAppContainer, ToMainAppRectangle } from "./elements";

interface ToMainAppProps {}

const ToMainApp: React.FC<ToMainAppProps> = ({}) => {
    return (
        <ToMainAppContainer>
            <ToMainAppRectangle />
        </ToMainAppContainer>
    );
};

export default ToMainApp;