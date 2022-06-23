import './styles.css';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { loginWithCredentials } from './actions';

export default function LoginComponent() {
    const [formData] = useState({ email: 'nicolas12@email.com', password: '123' });
    const [loginErrorMessage, setLoginErrorMessage] = useState('');

    const submitLogin = async (event: any) => {
        event.preventDefault();
        try {
            const result = await loginWithCredentials(formData);
            console.log(`Logged as ${result.token}`);
        } catch (loginError: any) {
            setLoginErrorMessage(loginError.message);
        }
    }

    return (
        <Form id='login-form'>
            {
                loginErrorMessage && 
                <Form.Text className="text login-error-message">
                    {loginErrorMessage}
                </Form.Text>
            }
            <hr />
            <Form.Group className='mb-3' controlId='email'>
                <Form.Label>E-mail address:</Form.Label>
                <Form.Control type='email' placeholder='Enter your e-mail address' value={formData.email} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Password" value={formData.password} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={submitLogin}>Submit</Button>
        </Form>
      );
}
