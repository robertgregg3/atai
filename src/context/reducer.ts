import { CsvDataProps } from '@components/charts/chart.types';
import firebase from 'firebase/compat/app';

export enum stateEnums {
  SET_USER='SET_USER',
  SET_DATA='SET_DATA',
  TOGGLE_SIDEBAR='TOGGLE_SIDEBAR',
}

export interface InitialStateProps {
  user: firebase.User | null;
  data: CsvDataProps[];
  displayName: string;
  sidebarOpen: boolean;
}

export type ActionProps = 
  | { type: stateEnums.SET_USER, payload: { user: any, displayName: string} }
  | { type: stateEnums.SET_DATA, payload: any }
  | { type: stateEnums.TOGGLE_SIDEBAR, payload: boolean }

export const initialState: InitialStateProps = {
  user: null,
  data: [],
  displayName: "",
  sidebarOpen: false,
};

const stateReducer = (state: InitialStateProps, action: ActionProps) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
        displayName: action.payload.displayName,
      };
    case "SET_DATA":
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        sidebarOpen: action.payload,
      };
  }
};

export default stateReducer;
