var expect = require('chai').expect;
require('expect-webdriverio');
const sinon = require('sinon');
var testVariables = require('../test_variables');

describe('Testing user Landing page', () => {
  before(() => {
    $('~' + testVariables.splashTouchableOpacityButton).click();
    $('~' + testVariables.signScreenUserName).setValue('setanta24');
    $('~' + testVariables.signScreenPassword).setValue('Password_123');
    $('~' + testVariables.signScreenSignInButton).click();
  });

  beforeEach(() => {
    $('~' + testVariables.homeScreenContainer).waitForDisplayed(10000, false);
  });

  it('should have two buttons on home screen 1.take new sample button, 2.view sample', async => {
    expect(
      $('~' + testVariables.homeScreenTakeNewSampleButton).isDisplayed(),
    ).to.equal(true);
    expect(
      $('~' + testVariables.homeScreenViewSampleButton).isDisplayed(),
    ).to.equal(true);
  });

  it('should show search river screen container after clicking take new sample button', async => {
    $('~' + testVariables.homeScreenTakeNewSampleButton).click();
    $('~' + testVariables.searchRiverScreenContainer).waitForDisplayed(10000);
    expect(
      $('~' + testVariables.searchRiverScreenContainer).isDisplayed(),
    ).to.equal(true);
  });
});

describe('Testing search river screen', () => {
  beforeEach(() => {
    $('~' + testVariables.searchRiverScreenContainer).waitForDisplayed(
      10000,
      false,
    );
  });

  it('should show empty locate text input before locate icon is clicked', async => {
    expect($('~' + testVariables.searchRiverLocateInput).getText()).to.equal(
      'Location name or Coordinates',
    );
  });

  it('should show locate text after locate icon is clicked', async => {
    driver.pause(1000);
    driver.setGeoLocation({
      latitude: '53.3542',
      longitude: '-6.35558',
    });
    driver.pause(1000);
    $('~' + testVariables.searchRiverLocateIcon).click();
    driver.pause(1000);
    driver.execute('mobile:acceptAlert', {action: 'accept'});
    driver.pause(1000);
  });

  it('should click a button and show river detail screen', async => {
    driver.pause(1000);
    $('~' + testVariables.searchRiverSearchIcon).click();
    driver.pause(1000);
    const listCells = $$('~' + testVariables.flatlistItem);
    expect(listCells).to.have.length.above(1);
    listCells[0].click();
    $('~' + testVariables.riverDetailContainer).waitForDisplayed(10000, false);
    expect($('~' + testVariables.riverDetailContainer).isDisplayed()).to.equal(
      true,
    );
  });
});

describe('Testing tabs with screens', () => {
  before(() => {
    $('~' + testVariables.riverDetailContainer).waitForDisplayed(10000, false);
  });

  it('should display 3 tabs and default river details screen after click choose button', async => {
    expect($('~' + testVariables.riverDetailContainer).isDisplayed()).to.equal(
      true,
    );
    expect(
      $('~' + testVariables.riverDetailChooseRiverButton).isDisplayed(),
    ).to.equal(true);

    $('~' + testVariables.riverDetailChooseRiverButton).click();
    $('~' + testVariables.riverDetailScreen).waitForDisplayed(10000, false);
    expect(
      $('~' + testVariables.riverDetailScreen).isDisplayed(),
      'river details screen should be displayed',
    ).to.be.true;

    expect(
      $('~' + testVariables.mainTabScreenDetailsTab).isDisplayed(),
      'details tab should be displayed',
    ).to.be.true;

    expect(
      $('~' + testVariables.mainTabScreenArduinoTab).isDisplayed(),
      'Arduino tab should be displayed',
    ).to.be.true;

    expect(
      $('~' + testVariables.mainTabScreenInsectTab).isDisplayed(),
      'Insect tab should be displayed',
    ).to.be.true;
  });

  it('should display arduino screen after clicking Arduino tab, ', () => {
    driver.pause(1000);
    expect(
      $('~' + testVariables.mainTabScreenArduinoTab).isDisplayed(),
      'Arduino tab should be displayed',
    ).to.be.true;

    $('~' + testVariables.mainTabScreenArduinoTab).click();
    $('~' + testVariables.arduinoScreenContainer).waitForDisplayed(
      10000,
      false,
    );
    expect(
      $('~' + testVariables.arduinoScreenContainer).isDisplayed(),
      'Arduino Connected Screen is displayed',
    ).to.be.true;
  });

  it('should show Insert Arduino id', () => {
    expect(
      $('~' + testVariables.arduinoScreenIDTextInput).isDisplayed(),
      'arduino ID Text Input should be displayed',
    ).to.be.true;

    $('~' + testVariables.arduinoScreenIDTextInput).setValue('1');

    expect(
      $('~' + testVariables.arduinoScreenIDTextInput).getText(),
      'Arduino id should be 1',
    ).to.equal('1');
  });

  it('should show Arduino connect screen after press search icon button', () => {
    expect(
      $('~' + testVariables.arduinoScreenSearchIconButton).isDisplayed(),
      'search icon button should be displayed',
    ).to.be.true;

    $('~' + testVariables.arduinoScreenSearchIconButton).click();
    $('~' + testVariables.arduinoConnectScreenContainer).waitForDisplayed(
      10000,
      false,
    );
    expect(
      $('~' + testVariables.arduinoConnectScreenContainer).isDisplayed(),
      'Arduino connect screen should be displayed',
    ).to.be.true;
  });

  it('should show sensors data', () => {
    expect(
      $('~' + testVariables.arduinoConnectScreenTemperatureValue).getText(),
      'Temperature Value is not null',
    ).to.not.equal(null);
    expect(
      $('~' + testVariables.arduinoConnectScreenPHValue).getText(),
      'PH Value is not null',
    ).to.not.equal(null);
  });

  // it('should go back to the Arduino Screen ', () => {
  //   expect(
  //     $('~' + testVariables.mainTabScreenInsectTab).isDisplayed(),
  //     'insect tab should be displayed',
  //   ).to.be.true;

  //   driver.back();
  //   driver.pause(1000);
  //   expect(
  //     $('~' + testVariables.arduinoScreenContainer).isDisplayed(),
  //     'Arduino Screen should be displayed',
  //   ).to.be.true;
  // });

  it('should show insect screen after press insect tab', () => {
    expect(
      $('~' + testVariables.mainTabScreenInsectTab).isDisplayed(),
      'insect tab should be displayed',
    ).to.be.true;
    driver.pause(1000);
    expect(
      $('~' + testVariables.mainTabScreenInsectTab).isDisplayed(),
      'insect tab should be displayed',
    ).to.be.true;

    $('~' + testVariables.mainTabScreenInsectTab).click();

    $('~' + testVariables.insectScreenContainer).waitForDisplayed(10000, false);

    expect(
      $('~' + testVariables.insectScreenContainer).isDisplayed(),
      'Insect screen should be displayed',
    ).to.be.true;

    expect(
      $('~' + testVariables.insectScreenSelectInsectButton).isDisplayed(),
      'Select insect button should be displayed',
    ).to.be.true;
    expect(
      $('~' + testVariables.insectScreenAnalyzeInsectButton).isDisplayed(),
      'Analyze insect button should be displayed',
    ).to.be.true;
  });

  it('should show display choose insects screen', () => {
    driver.pause(1000);
    $('~' + testVariables.insectScreenSelectInsectButton).click();

    $('~' + testVariables.chooseInsectScreenContainer).waitForDisplayed(
      10000,
      false,
    );
    expect(
      $('~' + testVariables.chooseInsectScreenContainer).isDisplayed(),
      'Choose insect screen should be displayed',
    ).to.be.true;
  });

  it('should display insects groups', () => {
    expect(
      $('~' + testVariables.groupList).isDisplayed(),
      'Insect group 1 is displayed',
    ).to.be.true;
    expect(
      $$('~' + testVariables.groupList),
      'group 1 List items length > 5',
    ).to.have.length.above(5);
  });

  it('should display selected insect items', () => {
    const groupList = $$('~' + testVariables.groupList);
    const amountTextInput = $('~' + testVariables.groupAmountInput);

    groupList[0].click();
    driver.pause(1000);
    amountTextInput.setValue(5);
    driver.pause(1000);
    expect(amountTextInput.getText(), 'insect amount should be 5').to.equal(
      '5',
    );
    $('~' + testVariables.addAmountIcon).click();
    driver.pause(1000);

    expect(
      $('~' + testVariables.submitInsectsAmountButton).isDisplayed(),
    ).to.equal(true);

    $('~' + testVariables.submitInsectsAmountButton).click();
    driver.pause(1000);
    $('~' + testVariables.insectScreenContainer).waitForDisplayed(10000, false);

    expect(
      $('~' + testVariables.insectScreenContainer).isDisplayed(),
      'Insect screen is displayed',
    ).to.be.true;

    expect(
      $('~' + testVariables.insectScreenSelectedTitle).getText(),
      'selected insects title should be displayed',
    ).to.equal('Selected :');

    expect(
      $$('~' + testVariables.insectScreenSelectedInsects),
      'length selected insects group should > 0',
    ).to.have.length.above(0);
  });

  it('should pop out three options(take photo, choose form library, and cancel', () => {
    driver.pause(1000);

    $('~' + testVariables.insectScreenAnalyzeInsectButton).click();
    driver.pause(1000);
    driver.execute('mobile:acceptAlert', {action: 'accept'});

    $('~' + testVariables.analysisInsectScreenContainer).waitForDisplayed(
      10000,
      false,
    );

    expect(
      $('~' + testVariables.analysisInsectScreenContainer).isDisplayed(),
      'Analysis insect screen should be displayed',
    ).to.be.true;

    $('~' + testVariables.analysisInsectShowOptions).click();
    driver.pause(1000);

    expect(
      $('~' + testVariables.analysisInsectInnerView).isDisplayed(),
      'Options are displayed',
    ).to.be.true;

    expect(
      $('~' + testVariables.takePhotoButton).isDisplayed(),
      'Take photo button is displayed',
    ).to.be.true;

    expect(
      $('~' + testVariables.chooseFormLibraryButton).isDisplayed(),
      'Choose from library button is displayed',
    ).to.be.true;

    expect(
      $('~' + testVariables.cancelButton).isDisplayed(),
      'Cancel button is displayed',
    ).to.be.true;
  });

  // it('should show sampling results', () => {
  //   driver.pause(1000);
  //   $('~' + testVariables.cancelButton).click();
  //   driver.back();

  //   $('~' + testVariables.insectScreenContainer).waitForDisplayed(10000, false);

  //   expect(
  //     $('~' + testVariables.showResultIcon).isDisplayed(),
  //     'should display √ icon',
  //   ).to.be.true;

  //   $('~' + testVariables.showResultIcon).click();

  //   $('~' + testVariables.resultPageContainer).waitForDisplayed(10000, false);
  //   expect(
  //     $('~' + testVariables.resultPageContainer).isDisplayed(),
  //     'should display new sampling results',
  //   ).to.be.true;
  // });
});
