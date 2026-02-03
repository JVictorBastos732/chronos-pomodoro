import './styles/global.css';
import './styles/themes.css';

import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';
import { MessageContainer } from './components/MessagesContainer';
import { Router } from './routes/router';

export function App() {
  return (
    <TaskContextProvider>
      <MessageContainer>
        <Router />
      </MessageContainer>
    </TaskContextProvider>
  );
}
