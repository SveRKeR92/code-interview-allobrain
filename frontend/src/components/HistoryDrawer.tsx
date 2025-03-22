import { FaHistory } from "react-icons/fa";
import '../styles/HistoryDrawer.css';
import {useEffect, useState} from "react";

function HistoryDrawer({ note_id } : { note_id: number }) {
  const [backups, setBackups] = useState<any[]>([]);

  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
    fetch(`${API_BASE_URL}/note_backup/${note_id}`)
      .then(r => r.json())
      .then((json: any[]) =>
        setBackups(json.map(
          data => ({
            title: data.title,
            content: data.content,
            createdAt: data.created_at,
          })))
      )
      .catch(e => console.error(e))
  }, [note_id])

  return (
    <>
      <div className={'history-drawer'}>
        <div className={'title'}>
          <span><FaHistory /></span>
          <h2>Changes history</h2>
        </div>
        <div className={'history'}>
          {backups.map((backup) => (
            <div className={'backup'}>
              <p>{backup.title}</p>
              <p>{backup.content}</p>
              <footer>
                <p>{backup.createdAt.split('.')[0]}</p>
              </footer>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}


export default HistoryDrawer;