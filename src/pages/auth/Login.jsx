import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import secretlogin from "../../api/auth";

import styles from './Login.module.css';

import Button from '../../components/common/Button';
import { authenticateStorage } from "../../util/auth";


export default function LoginPage() {
  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <h1>Acesso ao Painel Administrativo</h1>
        <span>Acesso Restrito</span>
        <span>Somente pessoas autorizadas</span>
      </div>

      {data && data.data && (
        <ul>
          {Object.values(data.data).map(
            (err => <li key={err.path}>{err.msg}</li>)
          )}
        </ul>
      )}
      {data && data.message && <p>{data.message}</p>}


      <Form method="POST">
        <input id="email" name="email" type="email" className={styles.input} placeholder="Email" required />
        <input id="password" name="password" type="password" className={styles.input} placeholder="Sua senha" required />
        <Button disabled={isSubmitting}>
          {isSubmitting ? 'Carregando' : 'Entrar'}
        </Button>
      </Form>

    </div>
  )
};



export async function action({ request }) {
  const data = await request.formData();

  const loginData = {
    password: data.get('password'),
  }

  const response = await secretlogin(loginData);

  if (response.status === 422 || response.status === 401) {
    return response;
  };

  authenticateStorage(response);

  return redirect('/admin')
};