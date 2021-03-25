var expect = require('chai').expect;
var testVariables = require('../test_variables');

describe('Testing splash landing page', () => {
  // Adding time out to make sure the app is load prior to test is run
  beforeEach(() => {
    $('~' + testVariables.splashContainer).waitForDisplayed(50000, false);
  });

  it('should display splash Container', async => {
    expect($('~' + testVariables.splashContainer).isDisplayed()).to.equal(true);
  });
  it('should display sign Screen Container after clicking splash Touchable Opacity Button', async => {
    $('~' + testVariables.splashTouchableOpacityButton).click();

    $('~signScreenContainer').waitForDisplayed(10000);
    expect($('~' + testVariables.signScreenContainer).isDisplayed()).to.equal(
      true,
    );
  });
});

describe('Testing Sign in activity', () => {
  beforeEach(() => {
    $('~' + testVariables.signScreenContainer).waitForDisplayed(10000, false);
  });
  // it('should fail on signing in (empty username or password)', async => {
  //   $('~' + testVariables.signScreenUserName).setValue('');
  //   $('~' + testVariables.signScreenPassword).setValue('');

  //   $('~' + testVariables.signScreenSignInButton).click();

  //   expect(driver.getAlertText()).to.equal(
  //     'Wrong Input!\nUsername or password field cannot be empty.',
  //   );

  //   driver.execute('mobile:acceptAlert', {action: 'accept'});
  // });

  it('should successful on signing in and show home Screen', async => {
    $('~' + testVariables.signScreenUserName).setValue('setanta24');
    $('~' + testVariables.signScreenPassword).setValue('Password_123');

    $('~' + testVariables.signScreenSignInButton).click();

    $('~' + testVariables.homeScreenContainer).waitForDisplayed(10000);
    expect($('~' + testVariables.homeScreenContainer).isDisplayed()).to.equal(
      true,
    );
  });
});

describe('Testing user sampling history with filters', () => {
  before(() => {
    $('~' + testVariables.homeScreenContainer).waitForDisplayed(50000, false);
  });

  it('should have two buttons on home screen 1.take new sample button, 2.view sample', async => {
    expect(
      $('~' + testVariables.homeScreenTakeNewSampleButton).isDisplayed(),
    ).to.equal(true);
    expect(
      $('~' + testVariables.homeScreenViewSampleButton).isDisplayed(),
    ).to.equal(true);
  });

  it('should show sampling history screen after click view sample button', () => {
    $('~' + testVariables.homeScreenViewSampleButton).click();
    $('~' + testVariables.sampleHistoryScreenContainer).waitForDisplayed(
      5000,
      false,
    );
    expect(
      $('~' + testVariables.sampleHistoryScreenContainer).isDisplayed(),
    ).to.equal(true);
    expect(
      $$('~' + testVariables.sampleHistorySearchedSample),
      'all results should be >= 0',
    ).to.have.length.above(-1);
  });

  it('should filter by River Name such as ST', () => {
    $('~' + testVariables.sampleHistorySearchRiverBar).setValue('ST');
    driver.pause(1000);
    $('~' + testVariables.sampleHistorySearchRiverIcon).click();
    driver.pause(1000);
    expect(
      $$('~' + testVariables.sampleHistorySearchedSample),
    ).to.have.length.above(0);
  });

  it('should show selected sample id', () => {
    const samples = $$('~' + testVariables.sampleHistorySearchedSample);
    samples[0].click();
    $('~' + testVariables.historyListContainer).waitForDisplayed(10000, false);

    expect(
      $('~' + testVariables.historyListContainer).isDisplayed(),
      'History List Container should be displayed',
    ).to.equal(true);

    const listItems = $$('~' + testVariables.historyListItems);

    expect(listItems, 'List item should >=1').to.have.length.above(0);

    listItems[0].click();
    $('~' + testVariables.historyDetailContainer).waitForDisplayed(
      10000,
      false,
    );
    expect(
      $('~' + testVariables.historyDetailContainer).isDisplayed(),
      'Selected history item should be displayed',
    ).to.equal(true);
  });
});
