import { useState } from 'react';
import Board from './components/Board';
import Menu from './components/Menu';

function App() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<number>(1);

  return (
    <div>
      {
        isPlaying ?
          <Board difficulty={difficulty} isPlaying={isPlaying} stop={() => setIsPlaying(false)} />
        :
          <Menu difficulty={difficulty} setDifficulty={setDifficulty} play={() => setIsPlaying(true)} />
      }
    </div>
  );
}

export default App;
