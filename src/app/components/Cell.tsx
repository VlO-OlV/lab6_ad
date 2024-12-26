import '../../assets/styles/Cell.css';

interface CellProps {
  state: string | null;
  order: number;
  isAvailable: boolean;
  onClick: () => void;
}

function Cell ({ state, order, isAvailable, onClick }: CellProps) {
  const cellClassName = `board-cell ${order % 2 === 0 ? 'cell-even' : 'cell-odd'} ${state === 'F' ? 'cell-fox' : state === 'H' ? 'cell-hound' : ''} ${isAvailable ? 'cell-active' : ''}`;
  return (
    <div className={cellClassName} onClick={onClick}>
      
    </div>
  );
}

export default Cell;