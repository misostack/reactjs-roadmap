import "./App.scss";
import { ReactComponent as JSLogo } from "./assets/images/js.svg";
import CustomSVG from "./assets/images/custom.svg";
import countryCodes from "./assets/data/country-codes.json";
import examplePDF from "./assets/files/example.pdf";

function App() {
  const appName = "ReactJS Roadmap";
  const logoImageSrc = `${process.env.PUBLIC_URL}/images/logo.png`;
  return (
    <>
      <h1 className="App">{appName}</h1>
      <img src={logoImageSrc} alt="ReactJS Roadmap by SONNM" />
      <JSLogo />
      <p>Filepath: {CustomSVG}</p>
      <p>PDF File : {examplePDF}</p>
      <p>JSON: {JSON.stringify(countryCodes)}</p>

      <iframe title="PDF Preview" src={examplePDF} frameBorder="0"></iframe>
    </>
  );
}

export default App;
