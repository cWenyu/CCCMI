# Aquality 2.0 React Native app

This is the [Aquality 2.0]() app built with [React Native](https://facebook.github.io/react-native/) app for our project.

## Setup

To set up the development environment on your desktop, follow the tutorial [Setting up the development environment](https://reactnative.dev/docs/environment-setup) by React Native.

## Install the app

After setting up the environment, run `npm i` to install dependencies.

## Table of Contents

- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run ios](#npm-run-ios)
  - [npm run android](#npm-run-android)
  - [npm run eject](#npm-run-eject)
- [Writing and Running Tests](#writing-and-running-tests)
- [UI Testing](#ui-testing)

## Available Scripts

If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.

### `npm start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start -- --reset-cache
# or
yarn start -- --reset-cache
```

#### `npm test`

Runs the [jest](https://github.com/facebook/jest) test runner on your tests.

#### `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). We also recommend installing Genymotion as your Android emulator. Once you've finished setting up the native build environment, there are two options for making the right copy of `adb` available to Create React Native App:

#### `npm run eject`

This will start the process of "ejecting" from Create React Native App's build scripts. You'll be asked a couple of questions about how you'd like to build your project.

**Warning:** Running eject is a permanent action (aside from whatever version control system you use). An ejected app will require you to have an [Xcode and/or Android Studio environment](https://facebook.github.io/react-native/docs/getting-started.html) set up.

## Writing and Running Tests

This project is set up to use [jest](https://facebook.github.io/jest/) for tests. You can configure whatever testing strategy you like, but jest works out of the box. Create test files in directories called `__tests__` or with the `.test` extension to have the files loaded by jest. See the [the template project](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/App.test.js) for an example test. The [jest documentation](https://facebook.github.io/jest/docs/en/getting-started.html) is also a wonderful resource, as is the [React Native testing tutorial](https://facebook.github.io/jest/docs/en/tutorial-react-native.html).

## UI Testing

The UI testing runs on [Appium](http://appium.io/) and test scripts wrote by [WebDriverIO](https://webdriver.io/), the Appium has set up in the project, or you can using [Appium Desktop](https://github.com/appium/appium-desktop) as server.

End-to-end testing is a technique that tests the entire software product from beginning to end to ensure the application flow behaves as expected. It defines the product’s system dependencies and ensures all integrated pieces work together as expected.

The main purpose of End-to-end (E2E) testing is to test from the end user’s experience by simulating the real user scenario and validating the system under test and its components for integration and data integrity.

1. The E2E test scripts are inside folder mobile_ui/appium_automation_testing, make sure you have got into correct folder

2. Use the package manager to install dependencies for E2E test

   ```bash
   npm install 
   ```

3. Go back mobile_ui folder to start Appium server, or if prefer using Appium Desktop, just run Appium server before the testing

   ```bash
   appium 
   ```

4. Launch Application on Android Device

   ```bash
   yarn android
   ```

5. Get into mobile_ui/appium_automation_testing folder and run test scripts 

   ```bash
   npm run testandroid
   ```

6. If you want to save report into local file, please make sure you have a folder called reports inside appium_automation_testing, then run test scripts 

   ```bash
   npm run testandroidwithreport
   ```
