import { act } from 'react-test-renderer'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

const InitialState = {
    currentQuestionIndex: 0,
    answers: [],
    selectionHandlers: []
}

export const resetSurveyForm = () => ({
    type: 'RESET_SURVEY_FORM'
})


export const updateQIndex = (index) => ({
    type: 'UPDATE_INDEX',
    payload: index
})


export const updateAnswers = answer => ({
    type: 'UPDATE_VALUE',
    payload: answer
})

export const updateSelectionHandlers = (index, selection) => {
    return dispatch => {
        let handlers = store.getState().surveyForm.selectionHandlers;
        handlers[index] = selection;
        dispatch({
            type: 'UPDATE_SELECTION_HANDLERS',
            payload: handlers
        })
    }
}

function surveyForm(state = InitialState, action) {
    switch (action.type) {
        case 'RESET_SURVEY_FORM':
            return {
                currentQuestionIndex: 0,
                answers: [],
                selectionHandlers: []
            };
        case 'UPDATE_VALUE':
            return { ...state, answers: action.payload }
        case 'UPDATE_SELECTION_HANDLERS':
            return { ...state, selectionHandlers: action.payload }
        case 'UPDATE_INDEX':
            return { ...state, currentQuestionIndex: action.payload }
        default:
            return state
    }
}


const reducers = combineReducers({
    surveyForm,
})
const store = createStore(
    reducers,
    applyMiddleware(thunk));
export default store;