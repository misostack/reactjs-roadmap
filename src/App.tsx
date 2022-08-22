import './App.scss';
import React from 'react';

import { StateCheckboxListExample } from './components/StateCheckboxListExample';
import { StateArrayExample } from './components/StateArrayExample';
// import { StateMutationHookExample } from './components/StateMutationHookExample';
// import { LifeCycleExample } from './components/LifeCycleExample';
// import { StateMutateExample } from './components/StateMutateExample';
// import { StateExample } from './components/StateExample';
// import { ContextExample } from './components/ContextExample';
// import { MultiLevelMenuExample } from './components/MultiLevelMenuExample';
// import { StateUpdateExample } from './components/StateUpdateExample';
// import { SyntheticEventExample } from './components/SyntheticEventExample';

function App() {
  return (
    <>
      <h1>Demo</h1>

      <StateArrayExample values={[1, 2, 3, 4, 5]}></StateArrayExample>

      <StateCheckboxListExample
        options={[
          {
            text: 'Option 1',
            value: '1'
          },
          {
            text: 'Option 2',
            value: '2'
          },
          {
            text: 'Option 3',
            value: '3'
          }
        ]}
      ></StateCheckboxListExample>
    </>
  );
}

export default App;

// import { ReactComponent as JSLogo } from './assets/images/js.svg';
// import CustomSVG from './assets/images/custom.svg';
// import countryCodes from './assets/data/country-codes.json';
// import examplePDF from './assets/files/example.pdf';
// import Tag, { COLORS } from './components/Tag';

// function App() {
//   const appName = 'ReactJS Roadmap';
//   const displayTagName = (color: string) => {
//     return `${color}`.toUpperCase();
//   };

//   const logoImageSrc = `${process.env.PUBLIC_URL}/images/logo.png`;
//   const htmlContent =
//     '<a href="javascript:console.log(localStorage.setItem(`XSS`, new Date().toString())); var values={ ...localStorage }; alert(`XSS attack` + JSON.stringify(values));">HTML Content</h3>';
//   const dangerousHref =
//     'javascript:console.log(localStorage.setItem("XSS", new Date().toString())); var values={ ...localStorage }; alert("XSS attack" + JSON.stringify(values));';
//   return (
//     <>
//       <h1 className="App">{appName}</h1>
//       <div className="m-2">
//         <a className="p-4 bg-red-600 inline-block" href={dangerousHref}>
//           XSS attack
//         </a>
//         <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
//       </div>
//       <div className="flex justify-around">
//         {COLORS.map(c => (
//           <Tag key={c} color={c}>
//             {displayTagName(c)}
//           </Tag>
//         ))}
//       </div>
//       <img src={logoImageSrc} alt="ReactJS Roadmap by SONNM" />
//       <JSLogo />
//       <p>Filepath: {CustomSVG}</p>
//       <p>PDF File : {examplePDF}</p>
//       <p>JSON: {JSON.stringify(countryCodes)}</p>

//       <iframe title="PDF Preview" src={examplePDF} frameBorder="0"></iframe>
//     </>
//   );
// }
