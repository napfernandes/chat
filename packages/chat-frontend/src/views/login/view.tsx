import './styles.css';
import LoginComponent from "../../components/login/component";

export default function LoginView() {
    return (
        <div className='login-view'>
            <div className='login-wrap'>
                <LoginComponent />
            </div>
        </div>
    )
}