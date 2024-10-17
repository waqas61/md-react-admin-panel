const SET_LOADING = 'SET_LOADING';

export const setLoading = (isLoading) => ({
    type: SET_LOADING,
    isLoading: isLoading,
});

const initialState = {
    isLoading: false,
};

const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            };
        default:
            return state;
    }
};

export default loadingReducer;
