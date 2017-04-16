import { handleActions } from 'redux-actions';
import immutable from 'seamless-immutable';
import ActionTypes from 'redux/constants/ActionTypes';
import { AsyncState, prepareStateRequest, prepareStateSuccess, prepareStateFail } from 'objects/AsyncState.js';

const initialState = immutable.from({
    test: false,
    async: {
        getLatestRates: new AsyncState()
    }
});

export default handleActions({
    [ActionTypes.App.setTest]: (state, action) => {
        //return {...state, test: action.payload}
        return immutable.set(state, 'test', action.payload)
    },

    [ActionTypes.App.async.getLatestRatesRequest]: state => {
        return immutable.merge(state, {
            async: {
                getLatestRates: prepareStateRequest(state.async.getLatestRates)
            }
        })
    },
    [ActionTypes.App.setTest]: (state, action) => {
        return immutable.merge(state, {
            async: {
                getLatestRates: prepareStateSuccess(state.async.getLatestRates, action.payload)
            }
        })
    },
    [ActionTypes.App.setTest]: (state, action) => {
        return immutable.merge(state, {
            async: {
                getLatestRates: prepareStateFail(state.async.getLatestRates, action.payload)
            }
        })
    },
}, initialState);