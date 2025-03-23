import '../styles/BackupCard.css'

interface BackupCardProps {
  title: string;
  content: string;
  createdAt: string;
  onclick: () => void;
}

export default function BackupCard(props: BackupCardProps) {
  return (
    <div className={'backup'} onClick={props.onclick}>
      <p>{props.title}</p>
      <p>{props.content}</p>
      <footer>
        <p>{props.createdAt.split(' ')[0]}</p>
      </footer>
    </div>
  )
}