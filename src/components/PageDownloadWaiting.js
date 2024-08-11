import { React } from "react";
import './Components.css';
import { Spin, ConfigProvider} from "antd";

function PageDownloadWaiting() {
  return (
    <Spin
      size="large"
    />
  );
}

export default PageDownloadWaiting;