import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { LoginCredentials } from "../../../models/security/user-credentials"
import authenticationService from "../../../services/authentication-service"
import { login } from "../../../store/features/authentication-slice"
import { useAppDispatch } from "../../../store/hooks"
import loginGuys from '../../../assets/login-characters.png';
import './Login.css'

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    const [username, setUserName] = useState<string>()
    const [password, setPassword] = useState<string>()

    async function loginHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const credentials = new LoginCredentials()
        credentials.username = username!
        credentials.password = password!

        const authUser = await authenticationService.login(credentials);

        dispatch(login(authUser))
        navigate('/')
    }

    return (
        <div className="page-box">
            <img id="login-guys" src={loginGuys} width="1792" height="930" />

            <div className="login-box">
                <h2 id="login-title">Login</h2>

                <div id="login-form">
                    <form className="mb-3" onSubmit={loginHandler} method="post">
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input type="text" className="form-control" name="username" id="username"
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="password">Password:</label>
                            <input type="password" className="form-control" name="password" id="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        
                        <div className="login">
                            <button className="btn btn-success mt-3" type="submit">Login</button>
                        </div>
                    </form>
                </div>
                
                <div id="register-link" className="register">
                    <Link to="/register">Register as new user</Link>
                </div>
            </div>
        </div>
    )
}