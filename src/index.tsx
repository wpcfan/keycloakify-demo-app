import ReactDOM from "react-dom";
import { kcContext } from "./KcApp/kcContext";
import { KcWrapper } from "./KcApp";
import "./index.scss";

ReactDOM.render(
  <KcWrapper kcContext={kcContext!} />,
  document.getElementById("root")
);