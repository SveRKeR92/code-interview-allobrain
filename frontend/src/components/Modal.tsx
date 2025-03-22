import {ReactElement} from "react";
import '../styles/Modal.css';
import { IoCloseOutline } from "react-icons/io5";

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactElement;
}

export default function Modal(props: ModalProps) {
  return (
    <div
      className={`${"modal"} ${props.open ? "display-block" : "display-none"}`}
    >
      <div className="modal-main">
        <div className="modal-head">
          <h2>{props.title}</h2>
        </div>
        <div className="modal-body">{props.children}</div>
        <div className="btn-container">
          <button type="button" className="btn" onClick={props.onClose}>
            <IoCloseOutline />
          </button>
        </div>
      </div>
    </div>
  );
}