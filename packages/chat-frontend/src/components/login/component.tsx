import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './styles.css';
import { loginWithCredentials } from './api';

export default function LoginComponent() {
    const [loginErrorMessage, setLoginErrorMessage] = useState('');
    const [formData, setFormData] = useState({ email: 'nicolas@email.com', password: '123' });

    const onInputFormData = (event: any) => {
        setFormData({ ...formData, [event.target.name]: event.target.value, })
    }

    const submitLogin = async (event: any) => {
        event.preventDefault();
        try {
            const result = await loginWithCredentials(formData);
            console.log(`Logged as ${result.token}`);
        } catch (loginError: any) {
            setLoginErrorMessage(loginError.message);
        }
    }

    /**
     * form.text = tentar colocar um wrapper com height pra não mudar a altura do componente.
     */

    return (
        <Form id='login-form'>
            <Form.Text className="text login-error-message">
                {loginErrorMessage ?? ''}
            </Form.Text>
            <hr />
            <Form.Group className='mb-3' controlId='email'>
                <Form.Label>E-mail address:</Form.Label>
                <Form.Control name='email' type='email' placeholder='Enter your e-mail address' value={formData.email} onInput={onInputFormData} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control name='password' type="password" placeholder="Password" value={formData.password} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={submitLogin}>Submit</Button>
        </Form>
      );
}
