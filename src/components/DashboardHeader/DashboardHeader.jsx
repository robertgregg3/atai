import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./DashboardHeader.css";
import { useStateValue } from "../../Context/StateProvider";

const DashboardHeader = ({ chartTitle }) => {
  const [{ displayName }] = useStateValue();

  return (
    <header>
      <h6>{chartTitle}</h6>
      <div className="user-info">
        <span>
          Hi, {displayName} <AccountCircleIcon />
        </span>
      </div>
    </header>
  );
};

export default DashboardHeader;
