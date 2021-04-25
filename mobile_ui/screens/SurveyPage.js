import React, {Component} from 'react';
import {Alert} from 'react-native';
import {
  StyleSheet,
  Button,
  Text,
  TextInput,
  View,
  BackHandler,
} from 'react-native';
import SurveyComponent from '../components/SurveyComponent';
import {COLORS} from '../components/validColors';
import {connect} from 'react-redux';
import {resetSurveyForm, saveSampleData} from '../components/reduxStore';
import {useTheme} from '@react-navigation/native';

const GREEN = 'rgba(141,196,63,1)';
const CHOSENBUTTON = 'rgba(0,204,188,1)';
const BGCOLOR = 'rgba(255, 255, 255, 1)';
const BUTTONCOLOR = 'rgba(2, 171, 158,1)';

const survey = [
  {
    questionType: 'Info',
    questionText: 'Start survey for river surroundings.',
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '1/21\nPrincipal Type of Substratum Sampled:\n\nCobble/ Large Stones?',
    questionId: 'a',
    questionSettings: {
      maxMultiSelect: 1,
      minMultiSelect: 1,
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'None',
        value: 'none',
      },
      {
        optionText: 'Present',
        value: 'present',
      },
      {
        optionText: 'Moderate',
        value: 'moderate',
      },
      {
        optionText: 'Dominant',
        value: 'dominant',
      },
    ],
  },
  {
    questionType: 'SelectionGroup',
    questionText: '2/21\nPrincipal Type of Substratum Sampled:\n\nGravel?',
    questionId: 'b',
    questionSettings: {
      maxMultiSelect: 1,
      minMultiSelect: 1,
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'None',
        value: 'none',
      },
      {
        optionText: 'Present',
        value: 'present',
      },
      {
        optionText: 'Moderate',
        value: 'moderate',
      },
      {
        optionText: 'Dominant',
        value: 'dominant',
      },
    ],
  },
  {
    questionType: 'SelectionGroup',
    questionText: '3/21\nPrincipal Type of Substratum Sampled:\n\nSand?',
    questionId: 'c',
    questionSettings: {
      maxMultiSelect: 1,
      minMultiSelect: 1,
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'None',
        value: 'none',
      },
      {
        optionText: 'Present',
        value: 'present',
      },
      {
        optionText: 'Moderate',
        value: 'moderate',
      },
      {
        optionText: 'Dominant',
        value: 'dominant',
      },
    ],
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '4/21\nPrincipal Type of Substratum Sampled:\n\nSilt or Mud?',
    questionId: 'pt_silt_mud',
    questionSettings: {
      maxMultiSelect: 1,
      minMultiSelect: 1,
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'None',
        value: 'none'
      },
      {
        optionText: 'Present',
        value: 'present'
      },
      {
        optionText: 'Moderate',
        value: 'moderate'
      },
      {
        optionText: 'Dominant',
        value: 'dominant'
      },
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '5/21\nDegree of Siltation:\n\n(Is silt released when you take a kick sample?)',
    questionId: 'degree_silt',
    questionSettings: {
      maxMultiSelect: 1,
      minMultiSelect: 1,
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Clean',
        value: 'clean'
      },
      {
        optionText: 'Slight',
        value: 'slight'
      },
      {
        optionText: 'Moderate',
        value: 'moderate'
      },
      {
        optionText: 'Heavy',
        value: 'heavy'
      },
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '6/21\nDepth of Mud on Bottom:',
    questionId: 'depth_mud',
    questionSettings: {
      maxMultiSelect: 1,
      minMultiSelect: 1,
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'No Mud',
        value: 'no mud'
      },
      {
        optionText: '< 1 cm',
        value: 'less than one'
      },
      {
        optionText: '1–5 cm',
        value: 'one to five'
      },
      {
        optionText: '5–10 cm',
        value: 'five to ten'
      },
      {
        optionText: '> 10 cm',
        value: 'greater than ten'
      },
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '7/21\nDo Cattle or other Farm Animals have access to the stream?',
    questionId: 'farm_animals_selection',
    questionSettings: {
      maxMultiSelect: 1,
      minMultiSelect: 1,
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Full Access',
        value: 'full access'
      },
      {
        optionText: 'Semi-Controlled Drinking Point',
        value: 'semi-controlled drinking point'
      },
      {
        optionText: 'No Animal Access',
        value: 'no animal access'
      }
    ]
  },
  {
    questionType: 'TextInput',
    questionText: '8/21\nDo Cattle or other Farm Animals have access to the stream? \n\nComment',
    questionId: 'farm_animals_text',
    placeholderText: 'Please leave comment...',
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '9/21\nWhich of these describe the land next to the stream bank?\n\nGrassland?',
    questionId: 'describe_grassland',
    questionSettings: {
      maxMultiSelect: 1,
      minMultiSelect: 1,
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Present',
        value: 'present'
      },
      {
        optionText: 'Moderate',
        value: 'moderate'
      },
      {
        optionText: 'Abundant',
        value: 'abundant'
      },
      {
        optionText: 'Other',
        value: 'other'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '10/21\nWhich of these describe the land next to the stream bank?\n\nTillage Crops?',
    questionId: 'describe_tillage_crops',
    questionSettings: {
      maxMultiSelect: 1,
      minMultiSelect: 1,
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Present',
        value: 'present'
      },
      {
        optionText: 'Moderate',
        value: 'moderate'
      },
      {
        optionText: 'Abundant',
        value: 'abundant'
      },
      {
        optionText: 'Other',
        value: 'other'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '11/21\nWhich of these describe the land next to the stream bank?\n\nUrban?',
    questionId: 'describe_urban',
    questionSettings: {
      maxMultiSelect: 1,
      minMultiSelect: 1,
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Present',
        value: 'present'
      },
      {
        optionText: 'Moderate',
        value: 'moderate'
      },
      {
        optionText: 'Abundant',
        value: 'abundant'
      },
      {
        optionText: 'Other',
        value: 'other'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '12/21\nWhich of these describe the land next to the stream bank?\n\nForest?',
    questionId: 'describe_forest',
    questionSettings: {
      maxMultiSelect: 1,
      minMultiSelect: 1,
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Present',
        value: 'present'
      },
      {
        optionText: 'Moderate',
        value: 'moderate'
      },
      {
        optionText: 'Abundant',
        value: 'abundant'
      },
      {
        optionText: 'Other',
        value: 'other'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '12/21\nWhich of these describe the land next to the stream bank?\n\nForest?',
    questionId: 'k',
    questionSettings: {
      maxMultiSelect: 1,
      minMultiSelect: 1,
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Present',
        value: 'present',
      },
      {
        optionText: 'Moderate',
        value: 'moderate',
      },
      {
        optionText: 'Abundant',
        value: 'abundant',
      },
      {
        optionText: 'Other',
        value: 'other',
      },
    ],
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '13/21\nWhich of these describe the land next to the stream bank?\n\nBog/Heath/Moorland?',
    questionId: 'describe_bog_heath_moorland',
    questionSettings: {
      maxMultiSelect: 1,
      minMultiSelect: 1,
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Present',
        value: 'present'
      },
      {
        optionText: 'Moderate',
        value: 'moderate'
      },
      {
        optionText: 'Abundant',
        value: 'abundant'
      },
      {
        optionText: 'Other',
        value: 'other'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '14/21\nWater Clarity',
    questionId: 'water_clarity',
    questionSettings: {
      maxMultiSelect: 1,
      minMultiSelect: 1,
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Clear',
        value: 'clear'
      },
      {
        optionText: 'Slightly Turbid or Coloured',
        value: 'slightly turbid or coloured'
      },
      {
        optionText: 'Very Turbid or Coloured',
        value: 'very turbid or coloured'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '15/21\nCan you see any rubbish in the stream?',
    questionId: 'rubish_in_stream',
    questionSettings: {
      maxMultiSelect: 1,
      minMultiSelect: 1,
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'No',
        value: 'no'
      },
      {
        optionText: 'Present',
        value: 'present'
      },
      {
        optionText: 'Moderate',
        value: 'moderate'
      },
      {
        optionText: 'Abundant',
        value: 'abundant'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '16/21\nWater Velocity',
    questionId: 'water_velocity',
    questionSettings: {
      maxMultiSelect: 1,
      minMultiSelect: 1,
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Present',
        value: 'present'
      },
      {
        optionText: 'Moderate',
        value: 'moderate'
      },
      {
        optionText: 'Abundant',
        value: 'abundant'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '17/21\nRiffle Glide Pool?',
    questionId: 'riffle_glide_pool',
    questionSettings: {
      maxMultiSelect: 1,
      minMultiSelect: 1,
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Present',
        value: 'present'
      },
      {
        optionText: 'Moderate',
        value: 'moderate'
      },
      {
        optionText: 'Abundant',
        value: 'abundant'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '18/21\nSelect the Best Matches for Your Stream Site.\n\nUrban/Suburban:',
    questionId: 'select_match_urban_suburban',
    questionSettings: {
      maxMultiSelect: 1,
      minMultiSelect: 1,
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Present',
        value: 'present'
      },
      {
        optionText: 'Moderate',
        value: 'moderate'
      },
      {
        optionText: 'Abundant',
        value: 'abundant'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '19/21\nSelect the Best Matches for Your Stream Site.\n\nNative Woodland or Moorland:',
    questionId: 'select_match_nativewoodland_moorland',
    questionSettings: {
      maxMultiSelect: 1,
      minMultiSelect: 1,
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Present',
        value: 'present'
      },
      {
        optionText: 'Moderate',
        value: 'moderate'
      },
      {
        optionText: 'Abundant',
        value: 'abundant'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '20/21\nSelect the Best Matches for Your Stream Site.\n\nPresence of Trees:',
    questionId: 'select_match_presence_trees',
    questionSettings: {
      maxMultiSelect: 1,
      minMultiSelect: 1,
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Present',
        value: 'present'
      },
      {
        optionText: 'Moderate',
        value: 'moderate'
      },
      {
        optionText: 'Abundant',
        value: 'abundant'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '21/21\nSelect the Best Matches for Your Stream Site.\n\nGrassland and Crops:',
    questionId: 'select_match_grassland_crops',
    questionSettings: {
      maxMultiSelect: 1,
      minMultiSelect: 1,
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Present',
        value: 'present'
      },
      {
        optionText: 'Moderate',
        value: 'moderate'
      },
      {
        optionText: 'Abundant',
        value: 'abundant'
      }
    ]
  },

  
  {
    questionType: 'Info',
    questionText: 'Finish survey?',
  },
];

class SurveyScreen extends Component {
  static navigationOptions = () => {
    return {
      headerStyle: {
        backgroundColor: GREEN,
        height: 40,
        elevation: 5,
      },
      headerTintColor: '#fff',
      headerTitle: 'Sample Survey',
      headerTitleStyle: {
        flex: 1,
      },
    };
  };

  constructor(props) {
    super(props);
    this.state = {backgroundColor: BGCOLOR, answersSoFar: ''};
    this.baseState = this.state;
    this.onNavigateBack = this.onNavigateBack.bind(this);
    this.backAction = this.backAction.bind(this);
    props.resetSurveyForm();
  }

  backAction = () => {
    if (this.props.navigation.isFocused()) {
      // The screen is not focused, so don't do anything
      // return false;
      Alert.alert(
        'Hold on!',
        'Go back to Home will not save your proccess of taking sample.',
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'BACK',
            onPress: () => {
              this.props.resetSurveyForm();
              //this.props.navigation.popToTop();
              this.props.navigation.navigate('HomeScreen');
            },
          },
        ],
      );
    } else {
      this.props.navigation.navigate('HomeScreen');
    }
    return true;
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  onSurveyFinished(answers) {
    /**
     *  By using the spread operator, array entries with no values, such as info questions, are removed.
     *  This is also where a final cleanup of values, making them ready to insert into your DB or pass along
     *  to the rest of your code, can be done.
     *
     *  Answers are returned in an array, of the form
     *  [
     *  {questionId: string, value: any},
     *  {questionId: string, value: any},
     *  ...
     *  ]
     *  Questions of type selection group are more flexible, the entirity of the 'options' object is returned
     *  to you.
     *
     *  As an example
     *  {
     *      questionId: "favoritePet",
     *      value: {
     *          optionText: "Dogs",
     *          value: "dog"
     *      }
     *  }
     *  This flexibility makes SelectionGroup an incredibly powerful component on its own. If needed it is a
     *  separate NPM package, react-native-selection-group, which has additional features such as multi-selection.
     */

    let surveyData = [];
    const infoQuestionsRemoved = [...answers];

    // Convert from an array to a proper object. This won't work if you have duplicate questionIds
    const answersAsObj = {};
    for (const elem of infoQuestionsRemoved) {
      answersAsObj[elem.questionId] = elem.value;
    }
    surveyData.push({survey: answersAsObj});
    // this.props.navigation.navigate('SearchRiverScreen', {
    //   surveyData: surveyData,
    // });

    this.props.saveSampleData({...this.props.sampleData, surveyData: surveyData});
    this.props.navigation.navigate('SurroundingsPhotoScreen', {
      surveyData: surveyData,
    });
    // this.props.navigation.navigate('SearchRiverScreen', { surveyData: surveyData });

    // this.setState(this.baseState)
    // this.props.navigation.navigate('SearchRiverScreen', { surveyAnswers: answersAsObj });
  }

  onSurveyStart() {
    this.props.navigation.navigate('HomeScreen');
  }

  /**
   *  After each answer is submitted this function is called. Here you can take additional steps in response to the
   *  user's answers. From updating a 'correct answers' counter to exiting out of an onboarding flow if the user is
   *  is restricted (age, geo-fencing) from your app.
   */
  onAnswerSubmitted(answer) {
    this.setState({
      answersSoFar: JSON.stringify(this.surveyRef.getAnswers(), 2),
    });
    switch (answer.questionId) {
      case 'favoriteColor': {
        if (COLORS.includes(answer.value.toLowerCase())) {
          this.setState({backgroundColor: answer.value.toLowerCase()});
        }
        break;
      }
      default:
        break;
    }
  }

  renderPreviousButton(onPress, enabled) {
    return (
      <View
        style={{flexGrow: 1, maxWidth: 100, marginTop: 15, marginBottom: 10}}>
        <Button
          color={GREEN}
          onPress={onPress}
          disabled={!enabled}
          backgroundColor={GREEN}
          title={'Previous'}
        />
      </View>
    );
  }

  renderNextButton(onPress, enabled) {
    return (
      <View
        style={{flexGrow: 1, maxWidth: 100, marginTop: 15, marginBottom: 10}}>
        <Button
          color={GREEN}
          onPress={onPress}
          disabled={!enabled}
          backgroundColor={GREEN}
          title={'Next'}
        />
      </View>
    );
  }

  renderFinishedButton(onPress, enabled) {
    return (
      <View
        style={{flexGrow: 1, maxWidth: 100, marginTop: 15, marginBottom: 10}}>
        <Button
          title={'Finished'}
          onPress={onPress}
          disabled={!enabled}
          color={GREEN}
        />
      </View>
    );
  }

  renderButton(data, index, isSelected, onPress) {
    return (
      <View
        key={`selection_button_view_${index}`}
        style={{
          alignSelf: 'center',
          width: '85%',
          marginTop: 5,
          marginBottom: 5,
          justifyContent: 'flex-start',
        }}>
        <Button
          title={data.optionText}
          onPress={onPress}
          color={isSelected ? CHOSENBUTTON : BUTTONCOLOR}
          style={isSelected ? {fontWeight: 'bold'} : {}}
          key={`button_${index}`}
        />
      </View>
    );
  }

  renderQuestionText(questionText) {
    return (
      <View style={{marginLeft: 10, marginRight: 10}}>
        <Text
          numLines={1}
          style={[styles.questionText, {color: this.props.theme.colors.text}]}>
          {questionText}
        </Text>
      </View>
    );
  }

  renderTextBox(onChange, value, placeholder, onBlur) {
    return (
      <View>
        <TextInput
          style={[styles.textBox, {color: this.props.theme.colors.text}]}
          onChangeText={text => onChange(text)}
          numberOfLines={1}
          placeholder={placeholder}
          placeholderTextColor={'rgba(184,184,184,1)'}
          value={value}
          multiline
          onBlur={onBlur}
          blurOnSubmit
          returnKeyType="done"
        />
      </View>
    );
  }

  renderNumericInput(onChange, value, placeholder, onBlur) {
    return (
      <TextInput
        style={[styles.numericInput, {color: this.props.theme.colors.text}]}
        onChangeText={text => {
          onChange(text);
        }}
        underlineColorAndroid={'white'}
        placeholderTextColor={'rgba(184,184,184,1)'}
        value={String(value)}
        placeholder={placeholder}
        keyboardType={'numeric'}
        onBlur={onBlur}
        maxLength={3}
      />
    );
  }

  renderInfoText(infoText) {
    return (
      <View style={{marginLeft: 10, marginRight: 10}}>
        <Text style={[styles.infoText, {color: this.props.theme.colors.text}]}>
          {infoText}
        </Text>
      </View>
    );
  }

  onNavigateBack() {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View
        style={[
          styles.background,
          {backgroundColor: this.props.theme.colors.backgroundColor},
        ]}>
        <View style={styles.container}>
          <SurveyComponent
            key={'survey'}
            ref={s => {
              this.surveyRef = s;
            }}
            survey={survey}
            renderSelector={this.renderButton.bind(this)}
            containerStyle={[
              styles.surveyContainer,
              {backgroundColor: this.props.theme.colors.border},
            ]}
            selectionGroupContainerStyle={[
              styles.selectionGroupContainer,
              {backgroundColor: this.props.theme.colors.border},
            ]}
            navButtonContainerStyle={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
            renderPrevious={this.renderPreviousButton.bind(this)}
            renderNext={this.renderNextButton.bind(this)}
            renderFinished={this.renderFinishedButton.bind(this)}
            renderQuestionText={this.renderQuestionText.bind(this)}
            onSurveyFinished={answers => this.onSurveyFinished(answers)}
            onSurveyStart={this.onSurveyStart.bind(this)}
            //onAnswerSubmitted={(answer) => this.onAnswerSubmitted(answer)}
            renderTextInput={this.renderTextBox.bind(this)}
            renderNumericInput={this.renderNumericInput.bind(this)}
            renderInfo={this.renderInfoText.bind(this)}
            onNavigateBack={this.onNavigateBack}
            theme={this.color}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignItems: 'stretch',
    justifyContent: 'center',
    borderRadius: 10,
    flex: 1,
  },
  answersContainer: {
    width: '90%',
    maxHeight: '20%',
    marginTop: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    backgroundColor: 'white',
    elevation: 20,
    borderRadius: 10,
  },
  surveyContainer: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    alignContent: 'center',
    padding: 5,
    flexGrow: 0,
    elevation: 20,
  },
  selectionGroupContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    alignContent: 'flex-end',
  },
  navButtonText: {
    margin: 10,
    fontSize: 20,
    color: 'white',
    width: 'auto',
  },
  answers: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  navigationButton: {
    minHeight: 40,
    backgroundColor: GREEN,
    padding: 0,
    borderRadius: 100,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    marginBottom: 20,
    fontSize: 20,
  },
  textBox: {
    borderWidth: 1,
    borderColor: 'rgba(204,204,204,1)',
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    marginLeft: 10,
    marginRight: 10,
  },
  numericInput: {
    borderWidth: 1,
    borderColor: 'rgba(204,204,204,1)',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    marginLeft: 10,
    marginRight: 10,
  },
  infoText: {
    marginBottom: 20,
    fontSize: 20,
    marginLeft: 10,
  },
});

const mapDispatchToProps = {resetSurveyForm, saveSampleData};
const mapStateToProps = (state) =>{
  return {
    samepleData: state.surveyForm.sampleData,
  }
}

const ReduxSurveyForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SurveyScreen);

export default function(props) {
  const theme = useTheme();
  var MyTheme = {
    ...useTheme,
    colors: {
      border: 'rgb(60, 60, 60)',
      text: 'rgb(250, 250, 250)',
    },
  };
  if (!theme.dark) {
    MyTheme = {
      ...useTheme,
      colors: {
        background: 'rgb(255, 255, 255)',
        border: 'rgb(244, 244, 244)',
      },
    };
  }

  return <ReduxSurveyForm {...props} theme={MyTheme} />;
}
