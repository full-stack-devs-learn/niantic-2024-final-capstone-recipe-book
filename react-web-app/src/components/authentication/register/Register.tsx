import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import authenticationService from "../../../services/authentication-service"
import { Registration } from "../../../models/security/user-credentials"
import registerGuys from '../../../assets/register-characters.png';
import './Register.css'

export default function Register() {
    const navigate = useNavigate()

    const [username, setUserName] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [confirmPassword, setConfirmPassword] = useState<string>()
    const [role, setRole] = useState<string>('USER')

    async function loginHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const registration = new Registration()
        registration.username = username!
        registration.password = password!
        registration.confirmPassword = confirmPassword!
        registration.role = role!

        await authenticationService.register(registration);

        navigate('/login')
    }

    return (
        <div className="page-box">
            <img id="login-guys" src={registerGuys} width="1792" height="930" />

            <div className="login-box">
                <h2 id="login-title">Register</h2>

                <div id="login-form">
                    <form className="mb-4" onSubmit={loginHandler} method="post">
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

                        <div>
                            <label htmlFor="confirm-password">Confirm Password:</label>
                            <input type="password" className="form-control" name="confirm-password" id="confirm-password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="role">Select Role:</label>
                            <select className="form-select" name="role" id="role" onChange={(e) => setRole(e.target.value)}>
                                <option value="USER">User</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                        <div className="register">
                            <button className="btn btn-success mt-3" type="submit">Register</button>
                        </div>
                    </form>
                </div>
                <div id="login-link" className="login" >
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    )
}