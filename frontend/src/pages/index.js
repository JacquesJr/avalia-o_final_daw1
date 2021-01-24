<<<<<<< HEAD
const Home = () => {
  return (
    <div>
      <h1>IFTM</h1>
    </div>
=======
import Link from 'next/link';
import { Form } from '@unform/web';
import { FiCheckCircle, FiLock, FiLogIn, FiUser } from 'react-icons/fi';

import { Container, Content, Background } from '../styles/Home';
import Input from '../components/Input';
import Button from '../components/Button';

const Home = () => {
  return (
    <Container>
      <Background />
      <Content>
        <Form onSubmit={(data) => console.log(data)}>
          <h1>Faça seu login</h1>

          <Input name="cpf" icon={FiUser} placeholder="CPF" />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">
            <FiCheckCircle size={21} />
            Entrar
          </Button>
          
          <Link href="/signup">
            <a>
              <FiLogIn />
              Criar Conta
            </a>
          </Link>
        </Form>
      </Content>
    </Container>
>>>>>>> b85bc1f949fc11d2c3634e228731576edeec2222
  )
}

export default Home;