import './styles/global.css';
import './styles/themes.css';

import { Container } from './components/Container';
import { Heading } from './components/Heading';
import { Logo } from './components/Logo';
import { Menu } from './components/Menu';

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
        <Heading>Contato</Heading>
      </Container>
    </>
  );
};

export { App };