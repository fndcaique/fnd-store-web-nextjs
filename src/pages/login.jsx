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
    dispatch(
      handleLogin({
        login,
        password
      })
    );
    router.push(router.asPath || '/');
  };

  return (
    <div className='login-page'>
      <form onSubmit={handleSubmit}>
        <Input
          id='login-input'
          label='Login'
          value={login}
          placeholder='seu email ou nome de usuário'
          handleChange={setLogin}
        />
        <Input
          id='password-input'
          label='Senha'
          type='password'
          placeholder='your password ****'
          handleChange={setPassword}
        />
        <Button type='submit'>Entrar</Button>
      </form>
    </div>
  );
}
