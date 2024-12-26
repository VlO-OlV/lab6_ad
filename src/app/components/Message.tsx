import '../../assets/styles/Message.css';

interface MessageProps {
  winner: string | null;
  closeMessage: () => void;
}

function Message ({ winner, closeMessage }: MessageProps) {
  return (
    <div className="message-block">
      <p className="message">{winner === 'F' ? 'Fox won!' : winner === 'H' ? 'Hounds won!' : 'lololol'}</p>
      <button className="message_close" onClick={closeMessage}>{winner === 'F' ? 'Oh no' : winner === 'H' ? 'Yeah' : 'LOLOLO'}</button>
    </div>
  );
}
export default Message;