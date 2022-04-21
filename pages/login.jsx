import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../components/Button';
import Input from '../components/Input';
import { handleLogin } from '../store/reducers/user';

export default function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(handleLogin({ login, password }));
    console.log(router);
    router.push(router.asPath || '/');
  }

  return (
    <div className='login-page'>
      <form onSubmit={ handleSubmit }>
        <Input
          id='login-input'
          label='Login'
          value={ login }
          placeholder='your email or username'
          handleChange={ setLogin } />
        <Input
          id='password-input'
          label='Password'
          type='password'
          placeholder='your password ****'
          handleChange={ setPassword } />
        <Button type='submit'>Login</Button>
      </form>
    </div>
  )
}
