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
    <div className='login-page h-screen flex justify-center items-center'>
      <form
        onSubmit={handleSubmit}
        className='border-neutral border-2 rounded p-4 flex flex-col gap-4 items-start'
      >
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
        <Button primary outline type='submit'>
          Entrar
        </Button>
      </form>
    </div>
  );
}
