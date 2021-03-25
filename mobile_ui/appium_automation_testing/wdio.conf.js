var path = require('path');
var absolutePath = path.resolve(
  '../android/app/build/outputs/apk/debug/app-debug.apk',
);

exports.config = {
  services: ['appium'],
  port: 4723,
  runner: 'local',
  // specs: ['./test_cases/take_new_sample.test.js'],
  specs: ['./test_cases/**/*.js'],
  capabilities: [
    {
      maxInstances: 1,
      appiumVersion: '1.13.0',
      platformName: 'Android',
      platformVersion: '11',
      deviceName: 'Android 3a XL',
      app: absolutePath,
      automationName: 'UiAutomator2',
    },
  ],
  logLevel: 'trace',
  bail: 0,
  waitforTimeout: 50000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
};
