import './styles/global.css';
import './styles/themes.css';

import { Container } from './components/Container';
import { Logo } from './components/Logo';
import { Menu } from './components/Menu';
import { CountDown } from './components/CountDown';
import { Form } from './components/Form';

function App() {
  return (
    <>
      <Container>
        <Logo></Logo>
      </Container>

      <Container>
        <Menu />
      </Container>

      <Container>
        <CountDown />
      </Container>

      <Container>
        <Form></Form>
      </Container>
    </>
  );
};

export { App };