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
import { ReactComponent as JSLogo } from './assets/images/js.svg';
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
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {}
  },
  plugins: []
};
```

#### Using Typescript

```bash
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

> \*.js -> .ts/.tsx

#### Formatting Code Automatically

- [Eslint Typescript](https://typescript-eslint.io/docs/)
- [Eslint Config sample](https://eslint.org/docs/latest/user-guide/configuring/configuration-files)

```bash
npx eslint --init
npm install -D eslint-plugin-jest
```

> .eslintignore

```bash
**/node_modules
node_modules
```

> .eslintrc.js

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true
  },
  extends: ['plugin:react/recommended', 'standard'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'jest'],
  rules: {
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error'
  }
};
```

> package.json : lint script

```json
"lint": "eslint . --ext .tsx --ext .ts -c .eslintrc.js --fix",
```

```bash
npm run lint
```

**Husky**

```bash
npm install husky -D
npx husky install
# add this line to package.json scripts
# "prepare": "husky install"
npx husky add .husky/pre-commit "npm run lint && npm run build"
```

> Sometimes, you need to by pass the pre commit to do quick fix or rebase, ...etc.

```bash
git commit --no-verify
```

#### Component Basic

##### Stateless or Dump Component Example

**JSX**

> Fundamentally, JSX just provides syntactic sugar for the React.createElement(component, props, ...children) function

- [Prop Type Check](https://reactjs.org/docs/typechecking-with-proptypes.html)

```js
npm install prop-types --save
```

> Define custom type is value in array

```ts
import React from 'react';
import PropTypes from 'prop-types';

export const COLORS = [
  'gray',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple'
] as const;

Tag.propTypes = {
  color: PropTypes.oneOf(COLORS)
};

type Color = typeof COLORS[number];

function Tag(props: { color: Color; children: React.ReactNode }) {
  const { color, children } = props;
  return <span className={`bg-${color}-400`}>{children || ''}</span>;
}

export default Tag;
```

> Tailwind: Dynamically build classnames in tailwindcss

```js
const buttonConfig = {
  // Colors
  primary: {
    bgColor: 'bg-primary-500',
    color: 'text-white',
    outline:
      'border-primary-500 text-primary-500 bg-opacity-0 hover:bg-opacity-10'
  },
  secondary: {
    bgColor: 'bg-secondary-500',
    color: 'text-white',
    outline:
      'border-secondary-500 text-secondary-500 bg-opacity-0 hover:bg-opacity-10'
  },

  // Sizes
  small: 'px-3 py-2',
  medium: 'px-4 py-2',
  large: 'px-5 py-2'
};
```

> Or [self-listing class](https://tailwindcss.com/docs/content-configuration#safelisting-classes)

```js
const tailwindColors = require('./node_modules/tailwindcss/colors');
const colorSafeList = [];

// Skip these to avoid a load of deprecated warnings when tailwind starts up
const deprecated = [
  'lightBlue',
  'warmGray',
  'trueGray',
  'coolGray',
  'blueGray'
];

for (const colorName in tailwindColors) {
  if (deprecated.includes(colorName)) {
    continue;
  }

  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

  const pallette = tailwindColors[colorName];

  if (typeof pallette === 'object') {
    shades.forEach(shade => {
      if (shade in pallette) {
        colorSafeList.push(`text-${colorName}-${shade}`);
        colorSafeList.push(`bg-${colorName}-${shade}`);
      }
    });
  }
}

// tailwind.config.js
module.exports = {
  safelist: colorSafeList,
  content: ['{pages,app}/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: tailwindColors
    }
  },
  plugins: []
};
```

##### JSX Syntax

```tsx
const appName = 'ReactJS Roadmap';
const displayTagName = (color: string) => {
  return `${color}`.toUpperCase();
};

<h1 className="App">{appName}</h1>;
<div className="flex justify-around">
  {COLORS.map(c => (
    <Tag key={c} color={c}>
      {displayTagName(c)}
    </Tag>
  ))}
</div>;
```

> How to render HTML with JSX

```jsx
const htmlContent =
  '<a href="javascript:console.log(localStorage.setItem(`XSS`, new Date().toString())); var values={ ...localStorage }; alert(`XSS attack` + JSON.stringify(values));">HTML Content</h3>';
<div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>;

// XSS Attack
<a
  className="p-4 bg-red-600 inline-block"
  href={
    'javascript:console.log(localStorage.setItem("XSS", new Date().toString())); var values={ ...localStorage }; alert("XSS attack" + JSON.stringify(values));'
  }
>
  XSS attack
</a>;
```

#### [x] Rendering

> React elements are **immutable**. Once you create an element, you can’t change its children or attributes. An element is like a single frame in a movie: it represents the UI at a certain point in time.

> In practice, most React apps only call root.render() once

```jsx
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

#### [x] Components and Props

> Function and Class Components

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

When working with components, we always:

- Composing Components : stack related components together
- Extracting Components: split components into smaller components

##### Props are Read-Only

> All React components must act like pure functions with respect to their props.

> Question: what's happened?

```jsx
export const COLORS = ['gray', 'red', 'orange'];

function Tag(props: { color: Color, children: React.ReactNode }) {
  props.color = 'cyan';
  const { color, children } = props;
  return <span className={`bg-${color}-400 p-4`}>{children || ''}</span>;
}

function App() {
  return (
    <div className="flex justify-around">
      {COLORS.map(c => (
        <Tag key={c} color={c}>
          {displayTagName(c)}
        </Tag>
      ))}
    </div>
  );
}
```

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
