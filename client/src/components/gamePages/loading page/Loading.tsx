import Loader from "react-loader-spinner";
import "./loading.css";

export const Loading = () => {
  return (
    <div className="gifContainer">
      <div>
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      </div>
    </div>
  );
};
