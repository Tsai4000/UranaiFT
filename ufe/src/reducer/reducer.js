const TEST_STORE = 'TEST_STORE';

const initState = {
  testStore: 'init',
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case TEST_STORE: {
      return {
        testStore: action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;