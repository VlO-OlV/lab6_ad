import '../../assets/styles/Menu.css';

interface MenuProps {
  difficulty: number;
  setDifficulty: (value: number) => void;
  play: () => void;
}

function Menu ({ difficulty, setDifficulty, play }: MenuProps) {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    play();
  }

  return (
    <div className='menu'>
      <form className='menu-form' onSubmit={handleSubmit}>
        <h2>Fox and hounds game</h2>
        <div className="input-block">
          <label htmlFor="difficulty">Select difficulty: </label>
          <select className='input_difficulty' name="difficulty" value={difficulty} onChange={(e) => { setDifficulty(parseInt(e.target.value)); }}>
            <option value="1">Easy</option>
            <option value="2">Medium</option>
            <option value="5">Hard</option>
          </select>
        </div>
        <button type="submit" className='menu-form_submit'>Start</button>
      </form>
    </div>
  );
}

export default Menu;