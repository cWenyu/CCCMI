import React, { Component } from 'react';
import { StyleSheet, Button, ScrollView, Text, TextInput, View } from 'react-native';
import { SimpleSurvey } from 'react-native-simple-survey';
import { COLORS } from '../components/validColors';

const GREEN = 'rgba(141,196,63,1)';
const CHOSENBUTTON = 'rgba(0,204,188,1)';
const BGCOLOR = 'rgba(255, 255, 255, 1)';
const BUTTONCOLOR = 'rgba(2, 171, 158,1)';

const survey = [
  {
    questionType: 'Info',
    questionText: 'Finish survey to take new sample.'
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
      '2/21\nPrincipal Type of Substratum Sampled:\n\nGravel?',
      questionId: 'b',
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
      '3/21\nPrincipal Type of Substratum Sampled:\n\nSand?',
      questionId: 'c',
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
      '4/21\nPrincipal Type of Substratum Sampled:\n\nSilt or Mud?',
      questionId: 'd',
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
      questionId: 'e',
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
      questionId: 'f',
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
      questionId: 'g',
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
    questionId: 'h',
    placeholderText: 'Please leave comment...',
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '9/21\nWhich of these describe the land next to the stream bank?\n\nGrassland?',
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
      questionId: 'i',
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
      questionId: 'j',
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
      '13/21\nWhich of these describe the land next to the stream bank?\n\nBog/Heath/Moorland?',
      questionId: 'l',
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
      questionId: 'm',
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
      questionId: 'n',
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
      questionId: 'o',
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
      questionId: 'p',
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
      questionId: 'q',
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
      questionId: 'r',
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
      questionId: 's',
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
      questionId: 't',
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
  // {
  //   questionType: 'NumericInput',
  //   questionText: 'It also supports numeric input. Enter your favorite number here!',
  //   questionId: 'favoriteNumber',
  //   placeholderText: '42',
  // },
  // {
  //   questionType: 'NumericInput',
  //   questionText: 'New to 3.0, default values!\n\nHow many balls can you juggle at once?',
  //   questionId: 'jugglingBalls',
  //   defaultValue: '0'
  // },
  // {
  //   questionType: 'MultipleSelectionGroup',
  //   questionText:
  //     'Select two or three of your favorite foods!',
  //   questionId: 'favoriteFoods',
  //   questionSettings: {
  //     maxMultiSelect: 3,
  //     minMultiSelect: 2,
  //   },
  //   options: [
  //     {
  //       optionText: 'Sticky rice dumplings',
  //       value: 'sticky rice dumplings'
  //     },
  //     {
  //       optionText: 'Pad Thai',
  //       value: 'pad thai'
  //     },
  //     {
  //       optionText: 'Steak and Eggs',
  //       value: 'steak and eggs'
  //     },
  //     {
  //       optionText: 'Tofu',
  //       value: 'tofu'
  //     },
  //     {
  //       optionText: 'Ice cream!',
  //       value: 'ice cream'
  //     },
  //     {
  //       optionText: 'Injera',
  //       value: 'injera'
  //     },
  //     {
  //       optionText: 'Biryani',
  //       value: 'biryani'
  //     },
  //     {
  //       optionText: 'Tamales',
  //       value: 'tamales'
  //     },
  //   ]
  // },
  // {
  //   questionType: 'MultipleSelectionGroup',
  //   questionText:
  //     'Simple Survey can auto advance after a question has been answered. Select two things you do to relax:',
  //   questionId: 'relax',
  //   questionSettings: {
  //     maxMultiSelect: 2,
  //     minMultiSelect: 2,
  //     autoAdvance: true,
  //   },
  //   options: [
  //     {
  //       optionText: 'Reading a good book',
  //       value: 'reading'
  //     },
  //     {
  //       optionText: 'Going on vacation',
  //       value: 'vacations'
  //     },
  //     {
  //       optionText: 'Eating meals with family',
  //       value: 'meals'
  //     },
  //     {
  //       optionText: 'Heading to the ocean',
  //       value: 'ocean'
  //     }
  //   ]
  // },
  // {
  //   questionType: 'SelectionGroup',
  //   questionText:
  //     'Simple Survey can also simulate radio button behavior. Pick from below: ',
  //   questionId: 'radio',
  //   questionSettings: {
  //     allowDeselect: false,
  //   },
  //   options: [
  //     {
  //       optionText: 'I was forced to pick option 1',
  //       value: 'option 1'
  //     },
  //     {
  //       optionText: 'I have to pick option 2',
  //       value: 'option 2'
  //     },
  //     {
  //       optionText: 'I guess option 3',
  //       value: 'option 3'
  //     }
  //   ]
  // },
  // {
  //   questionType: 'SelectionGroup',
  //   questionText:
  //     'Simple Survey also supports default selections: ',
  //   questionId: 'singleDefault',
  //   questionSettings: {
  //     defaultSelection: 0
  //   },
  //   options: [
  //     {
  //       optionText: 'This is the default option',
  //       value: 'default'
  //     },
  //     {
  //       optionText: 'This is the alternative option',
  //       value: 'alternative'
  //     },
  //   ]
  // },
  // {
  //   questionType: 'MultipleSelectionGroup',
  //   questionText:
  //     'And of course it supports multiple defaults: ',
  //   questionId: 'multipleDefaults',
  //   questionSettings: {
  //     defaultSelection: [0, 2],
  //     maxMultiSelect: 2,
  //     minMultiSelect: 2,
  //   },
  //   options: [
  //     {
  //       optionText: 'This is the first default option',
  //       value: 'first default'
  //     },
  //     {
  //       optionText: 'This is the first alternate option',
  //       value: 'first alternative'
  //     },
  //     {
  //       optionText: 'This is the second default option',
  //       value: 'second default'
  //     },
  //     {
  //       optionText: 'This is the second alternate option',
  //       value: 'second alternative'
  //     },
  //   ]
  // },
  {
    questionType: 'Info',
    questionText: 'Tap finish to take new sample.'
  },
];

export default class SurveyScreen extends Component {
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
      }
    };
  }

  constructor(props) {
    super(props);
    this.state = { backgroundColor: BGCOLOR, answersSoFar: '' };
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

    const infoQuestionsRemoved = [...answers];

    // Convert from an array to a proper object. This won't work if you have duplicate questionIds
    const answersAsObj = {};
    for (const elem of infoQuestionsRemoved) { answersAsObj[elem.questionId] = elem.value; }
      console.log(answersAsObj);
    this.props.navigation.navigate('SearchRiverScreen', { surveyAnswers: answersAsObj });
  }

  /**
   *  After each answer is submitted this function is called. Here you can take additional steps in response to the 
   *  user's answers. From updating a 'correct answers' counter to exiting out of an onboarding flow if the user is 
   *  is restricted (age, geo-fencing) from your app.
   */
  onAnswerSubmitted(answer) {
    this.setState({ answersSoFar: JSON.stringify(this.surveyRef.getAnswers(), 2) });
    switch (answer.questionId) {
      case 'favoriteColor': {
        if (COLORS.includes(answer.value.toLowerCase())) {
          this.setState({ backgroundColor: answer.value.toLowerCase() });
        }
        break;
      }
      default:
        break;
    }
  }

  renderPreviousButton(onPress, enabled) {
    return (
      <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 15, marginBottom: 10 }}>
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
      <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 15, marginBottom: 10 }}>
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
      <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 15, marginBottom: 10 }}>
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
        style={{ alignSelf:'center', width:'85%', marginTop: 5, marginBottom: 5, justifyContent: 'flex-start' }}
      >
        <Button
          title={data.optionText}
          onPress={onPress}
          color={isSelected ? CHOSENBUTTON : BUTTONCOLOR}
          style={isSelected ? { fontWeight: 'bold' } : {}}
          key={`button_${index}`}
        />
      </View>
    );
  }

  renderQuestionText(questionText) {
    return (
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        <Text numLines={1} style={styles.questionText}>{questionText}</Text>
      </View>
    );
  }

  renderTextBox(onChange, value, placeholder, onBlur) {
    return (
      <View>
        <TextInput
          style={styles.textBox}
          onChangeText={text => onChange(text)}
          numberOfLines={1}
          underlineColorAndroid={'white'}
          placeholder={placeholder}
          placeholderTextColor={'rgba(184,184,184,1)'}
          value={value}
          multiline
          onBlur={onBlur}
          blurOnSubmit
          returnKeyType='done'
        />
      </View>
    );
  }

  renderNumericInput(onChange, value, placeholder, onBlur) {
    return (<TextInput
      style={styles.numericInput}
      onChangeText={text => { onChange(text); }}
      underlineColorAndroid={'white'}
      placeholderTextColor={'rgba(184,184,184,1)'}
      value={String(value)}
      placeholder={placeholder}
      keyboardType={'numeric'}
      onBlur={onBlur}
      maxLength={3}
    />);
  }

  renderInfoText(infoText) {
    return (
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        <Text style={styles.infoText}>{infoText}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={[styles.background, { backgroundColor: this.state.backgroundColor }]}>
        <View style={styles.container}>
          <SimpleSurvey
            ref={(s) => { this.surveyRef = s; }}
            survey={survey}
            renderSelector={this.renderButton.bind(this)}
            containerStyle={styles.surveyContainer}
            selectionGroupContainerStyle={styles.selectionGroupContainer}
            navButtonContainerStyle={{ flexDirection: 'row', justifyContent: 'space-around' }}
            renderPrevious={this.renderPreviousButton.bind(this)}
            renderNext={this.renderNextButton.bind(this)}
            renderFinished={this.renderFinishedButton.bind(this)}
            renderQuestionText={this.renderQuestionText}
            onSurveyFinished={(answers) => this.onSurveyFinished(answers)}
            //onAnswerSubmitted={(answer) => this.onAnswerSubmitted(answer)}
            renderTextInput={this.renderTextBox}
            renderNumericInput={this.renderNumericInput}
            renderInfo={this.renderInfoText}
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


    width: 'auto'
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
    fontSize: 20
  },
  textBox: {
    borderWidth: 1,
    borderColor: 'rgba(204,204,204,1)',
    backgroundColor: 'white',
    borderRadius: 10,

    padding: 10,
    textAlignVertical: 'top',
    marginLeft: 10,
    marginRight: 10
  },
  numericInput: {
    borderWidth: 1,
    borderColor: 'rgba(204,204,204,1)',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    marginLeft: 10,
    marginRight: 10
  },
  infoText: {
    marginBottom: 20,
    fontSize: 20,
    marginLeft: 10
  },
});