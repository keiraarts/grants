import { StoreProvider, createStore, persist, action } from 'easy-peasy';

export const StoreComponent = StoreProvider;
export const store = createStore(
  persist({
    user: {
      auth: {},
      setAuth: action((state, payload) => {
        return {
          ...state,
          auth: payload
        }
      }),
    },
    app: {
      small: window.innerWidth <= 1440,
      setSmall: action((state, payload) => {
        return {
          ...state,
          small: payload
        }
      }),
      cols: '1',
      setCols: action((state, payload) => {
        return {
          ...state,
          cols: payload
        }
      }),
    },
    grantees: {
      data: [],
      setGrantees: action((state, payload) => {
        return {
          ...state,
          data: payload
        }
      }),
    },
    nominees: {
      data: [],
      setNominees: action((state, payload) => {
        return {
          ...state,
          data: payload
        }
      }),
    },
  },
  {
    storage: 'localStorage'
  }),
);
