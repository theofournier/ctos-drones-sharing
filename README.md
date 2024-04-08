# ctOS drones sharing

## Description

ctOS drones sharing allow you to rent a drone in the stations across London for a short period of time and use them according to a severe End User License Agreement.

---

## How to install

To launch the project you will need the following in your PC :

- Install [GIT](https://git-scm.com/downloads)
- Install [NodeJs](https://nodejs.org/en/download/)
- Install [VS Code](https://code.visualstudio.com/download)
- Install [Expo](https://docs.expo.dev/get-started/installation/)
- Install [Yarn](https://classic.yarnpkg.com/en/docs/install/)
- Clone this repository

### Install the dependencies

- Run `yarn install` in the project folder `ctos-drone-sharing`.
- It installs all the dependencies in the package.json and create a `node_modules/` folder in the project.

### Visual Studio Code (optional)

Add extension for better development experience :

- ESLint
- Prettier
- ES7 React/Redux/GraphQL/React Native snippets
- Color Highlight
- vscode-styled-components

---

## Expo and Typescript

This app has been created with [Expo](https://expo.dev/) using [Typescript](https://www.typescriptlang.org/).

---

## ESLint

The project is using [ESLint](https://eslint.org/).

The rules are set in this file [.eslintrc](./.eslintrc). It extends @react-native-community.

---

## Launch the app

- Open emulators or connect your phone to your laptop (iOS or Android)
- Run `yarn start`. The expo server will launch and run the app on the connected devices
- For Android only : `yarn start --android`
- For iOS only : `yarn start --ios`

---

## Test

The project is using [Jest](https://jestjs.io/fr/docs/tutorial-react-native) and [Testing Library](https://testing-library.com/docs/react-native-testing-library/intro/).

- To run the test: `yarn test`
- To generate the code coverage report: `yarn test --coverage --watchAll=false`
- Open the code coverage report [here](./test-coverage/lcov-report/index.html): `./test-coverage/lcov-report/index.html`

---

## Folder Structure

```
ctos-drone-sharing/
  README.md
  node_modules/
  assets/ --> App icons and splash screen
  src/
    components/ --> All the components used by the app
    context/ --> App context and reducer
    screens/ --> Screens of the app
    services/ --> Class making the connection with the database
  App.tsx --> App main file
  package.json --> Dependencies and scripts
```

## Libraries

### React-native-paper

A UI library of customizable components following Google’s Material Design guidelines.

### Styled-components

Utilising tagged template literals and the power of CSS, it allows writing actual CSS code to style the components.

### Moment

A library to manipulate date and time easily.

### @testing-library/react-native

Simple and complete testing utilities that encourage good testing practices.

## Futur improvement

- Map: display a map of the city with the station pined
- Push notifications: of the countdown and when the drone crash
- Course history: list of all the drone rented
