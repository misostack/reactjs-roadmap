## Beginner Level

### Setup

- [x] Create New app
- [x] Debug
- [x] Manage assets: styles, images, files
- [x] Format your code
- [x] Using Typescript
- [x] Component Basic
- [x] React Router

- Create new app with [Create React App](https://create-react-app.dev/)

```bash
npx create-react-app my-app
```

- Update create-react-app

```bash
react-scripts@latest
```

> VS Code Extensions

- [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

#### Debug

> Create your .vscode/launch.json

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Debug App with Chrome",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

> Funny things with ReactJS 18.x

- If we use React.StrictMode, your component will be run twice. You can reproduce it by adding your debug breakpoint and see the magic

#### Manage assets

1. [x] Application static assets: images, fonts, static files

> Using public folder

```js
<img src={`${process.env.PUBLIC_URL}/images/logo.png`} />
```

> Importing stylesheets, images, fonts from Javascript, files(pdf,...)

**Important notes from [DataURL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs)**

```js
import "./App.scss";
import { ReactComponent as JSLogo } from "./assets/images/js.svg";
import CustomSVG from "./assets/images/custom.svg";
import countryCodes from "./assets/data/country-codes.json";
import examplePDF from "./assets/files/example.pdf";

<img src={logoImageSrc} alt="ReactJS Roadmap by SONNM" />
<JSLogo />
<p>Filepath: {CustomSVG}</p>
<p>PDF File : {examplePDF}</p>
<p>JSON: {JSON.stringify(countryCodes)}</p>

<iframe title="PDF Preview" src={examplePDF} frameborder="0"></iframe>
```

```js
import { ReactComponent as JSLogo } from "./assets/images/js.svg";
```

> The ReactComponent import name is significant and tells Create React App that you want a React component that renders an SVG, rather than its filename

2. [x] Configure and use SASS in your project

```bash
npm install sass
```

> Rename your **App.css** to **App.scss** and update **src/App.js** to import **src/App.scss**.

3. [x] How to use external CSS Frameworks/Libraries in your application

- [Add tailwindcss to your project](https://tailwindcss.com/docs/guides/create-react-app)

```bash
npm install -D tailwindcss postcss autoprefixer
```

> Configure your template paths **tailwind.config.js**

```js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

#### Using Typescript

```bash
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

> \*.js -> .ts/.tsx

#### Formatting Code Automatically

#### Component Basic

- [x] Hello world
- [ ] JSX
- [ ] Rendering
- [ ] Components and Props
- [ ] State and Lifecycle
- [ ] Handling Events
- [ ] Template: conditional, lists & keys
- [ ] Forms
- [ ] Lifting State Up
- [ ] Composition vs Inheritance
- [ ] Thinking In React

> Exercise: Create Personal's Portal
> **Features:**

- Bookmarks List by Category
- Today's checklist
- Today's notes
