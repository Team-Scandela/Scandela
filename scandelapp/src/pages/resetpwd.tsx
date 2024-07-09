import { useParams } from "react-router-dom";
import ResetPwdModule from "../components/ResetPwdModule";


interface ResetPwdProps {
}

/** Reset password page of the app */
const ResetPwd: React.FC<ResetPwdProps> = () => {

    // get /:uuid from the URL
    const { uuid } = useParams<{ uuid: string }>();

    return (
        <ResetPwdModule uuid={uuid} />
    );
};

export default ResetPwd;