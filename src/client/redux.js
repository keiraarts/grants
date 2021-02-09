import { StoreProvider, createStore } from 'easy-peasy';

export const StoreComponent = StoreProvider;
export const store = createStore({
  player: {
    mobile: window.innerWidth <= 600,
    setMobile: (state, payload) => {
      return {
        ...state,
        mobile: payload.mobile
      }
    },
    volume: 1,
    setVolume: (state, payload) => {
      return {
        ...state,
        volume: payload.volume
      }
    },
    levels: 0,
    setLevels: (state, payload) => {
      return {
        ...state,
        levels: payload.levels
      }
    },
    user: {},
    setUser: (state, payload) => {
      return {
        ...state,
        user: payload,
        isRoom: false
      }
    },
    setProfileLive: (state, payload) => {
      return {
        ...state,
        user: { ...state.user, live: payload }
      }
    },
    room: {},
    isRoom: false,
    setRoom: (state, payload) => {
      return {
        ...state,
        room: payload,
        isRoom: true
      }
    },
    setRoomUrl: (state, payload) => {
      return {
        ...state,
        room: {
          ...state.room,
          currentUrl: payload,
        },
        isRoom: true
      }
    },
    schedule: [],
    setSchedule: (state, payload) => {
      return {
        ...state,
        schedule: payload
      }
    },
    updateSchedule: (state) => {
      const newSchedule = [...state.schedule];
      newSchedule.shift();
      return {
        ...state,
        schedule: newSchedule
      }
    },
    playingState: 'stopped',
    setPlayingState: (state, payload) => {
      return {
        ...state,
        playingState: payload.playingState
      }
    },
    liveState: 'countdown',
    setLiveState: (state, payload) => {
      return {
        ...state,
        liveState: payload.liveState
      }
    },
    timeLeft: 0,
    setTimeLeft: (state, payload) => {
      return {
        ...state,
        timeLeft: payload.timeLeft
      }
    },
    timeUntil: 0,
    setTimeUntil: (state, payload) => {
      return {
        ...state,
        timeUntil: payload
      }
    },
    modalState: 'closed',
    setModalState: (state, payload) => {
      return {
        ...state,
        modalState: payload
      }
    },
  }
});
