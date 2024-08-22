import { styled } from '@mui/material';
import SignUpModal from './components/modals/SignUpModal';

function App() {
  return (
    <Main>
      Hello World
      <SignUpModal />
    </Main>
  );
}

const Main = styled('main')({
  width: '100%',
  height: '100dvh',
  position: 'relative',
});

export default App;
