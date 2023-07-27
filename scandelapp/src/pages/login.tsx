import * as React from "react";
import LoginModule from "../components/LoginModule";

/** Login page of the app */
const Login: React.FC = () => {
    return (
        <div
            id={"loginPage"}
            style={{ backgroundColor: "#fff", height: "100vh" }}
        >
            <LoginModule />
        </div>
    );
};

export default Login;
