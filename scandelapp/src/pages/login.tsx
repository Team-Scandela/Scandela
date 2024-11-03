import LoginModule from '../components/LoginModule';
import React, { useEffect } from 'react';

interface LoginProps {
    setOptimisationTemplateData: (data: any) => void;
    addItemToOptimisationTemplate: (data: any) => Promise<void>;
}

/** Login page of the app */
const Login: React.FC<LoginProps> = ({
    setOptimisationTemplateData,
    addItemToOptimisationTemplate,
}) => {
    // on efface le localstorage sur le login pour empecher le bypass par sauvegarde du token
    useEffect(() => {
        localStorage.clear();
    }, []);

    return (
        <div
            id={'loginPage'}
            style={{ backgroundColor: '#444444', height: '100vh' }}
        >
            <LoginModule
                setOptimisationTemplateData={setOptimisationTemplateData}
                addItemToOptimisationTemplate={addItemToOptimisationTemplate}
            />
        </div>
    );
};

export default Login;
