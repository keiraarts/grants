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
  },
  {
    storage: 'localStorage'
  }),
);
