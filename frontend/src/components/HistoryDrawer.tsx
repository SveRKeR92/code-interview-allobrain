import { FaHistory } from "react-icons/fa";
import '../styles/HistoryDrawer.css';

interface HistoryDrawerProps {
  backups: any[];
}

function HistoryDrawer(props: HistoryDrawerProps) {
  return (
    <>
      <div className={'history-drawer'}>
        <div className={'title'}>
          <span><FaHistory /></span>
          <h2>Changes history</h2>
        </div>
        <div className={'history'}>
          {props.backups.map((backup) => (
            <div className={'backup'} key={backup.id}>
              <p>{backup.title}</p>
              <p>{backup.content}</p>
              <footer>
                <p>{backup.createdAt.split(' ')[0]}</p>
              </footer>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}


export default HistoryDrawer;