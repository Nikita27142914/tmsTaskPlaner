import {Link} from "react-router-dom";

import "./Login.sass";


export const LoginPage = () => {

    return (
        <>
            <h1>Login Page</h1>
            <Link to="/registration">Зарегестрироваться</Link>
        </>
    );
}
