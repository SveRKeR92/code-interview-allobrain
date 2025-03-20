import { useNavigate } from "react-router";
import { FaHome } from "react-icons/fa";
import '../styles/Nav.css';

function Nav() {
  const navigate = useNavigate();

  return (
    <nav>
      <button onClick={() => navigate("/")}>
        {/* Unicode for a "back arrow" or "home" symbol */}
        <span>
          <FaHome />
        </span>
      </button>
    </nav>
  );
}

export default Nav;