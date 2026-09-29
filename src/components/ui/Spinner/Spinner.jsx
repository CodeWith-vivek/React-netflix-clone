import "./Spinner.css";
import netflix_spinner from "@/assets/images/netflix_spinner.gif";

const Spinner = () => {
  return (
    <div className="login-spinner">
      <img src={netflix_spinner} alt="Loading..." />
    </div>
  );
};

export default Spinner;
