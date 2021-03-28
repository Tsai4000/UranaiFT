const TEST_STORE = 'TEST_STORE';
const MIKUJI_STORE = "MIKUJI_STORE"

const initState = {
  testStore: 'init',
  mikuji: null
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case TEST_STORE: {
      return {
        testStore: action.payload,
      };
    }
    case MIKUJI_STORE: {
      return {
        mikuji: action.payload
      }
    }
    default:
      return state;
  }
};

export default reducer;