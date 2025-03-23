import { FaHistory } from "react-icons/fa";
import '../styles/HistoryDrawer.css';
import {NoteBackup} from "../types/noteBackup.ts";
import BackupCard from "./BackupCard.tsx";
import Modal from "./Modal.tsx";
import {useState} from "react";

interface HistoryDrawerProps {
  backups: NoteBackup[];
  onBackup: (backup: NoteBackup) => void;
}

function HistoryDrawer(props: HistoryDrawerProps) {
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState<NoteBackup | null>(null);

  const backupSelected = (backup: NoteBackup) => {
    setSelectedBackup(backup);
    setShowBackupModal(true);
  }

  const closeBackup = () => {setShowBackupModal(false)}

  const handleBackupSelection = (backup: NoteBackup) => {
    props.onBackup(backup);
    closeBackup();
  }

  return (
    <>
      <div className={'history-drawer'}>
        <div className={'title'}>
          <span><FaHistory /></span>
          <h2>Changes history</h2>
        </div>
        <div>
          {props.backups.map((backup) => (
            <BackupCard title={backup.title} content={backup.content} createdAt={backup.createdAt} key={backup.id} onclick={() => backupSelected(backup)}/>
          ))}
        </div>
      </div>
      <Modal open={showBackupModal} title={"Backup to selected changes"} onClose={closeBackup}>
        <div className={'select-backup'}>
          <h4>{selectedBackup && selectedBackup.title}</h4>
          <p>{selectedBackup && selectedBackup.content}</p>
          <button onClick={() => selectedBackup && handleBackupSelection(selectedBackup)}>Confirm</button>
        </div>
      </Modal>
    </>
  );
}


export default HistoryDrawer;