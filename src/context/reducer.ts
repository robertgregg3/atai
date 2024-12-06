import { CsvDataProps } from '@components/charts/chart.types';
import firebase from 'firebase/compat/app';

export enum stateEnums {
  SET_USER='SET_USER',
  SET_DATA='SET_DATA',
  TOGGLE_SIDEBAR='TOGGLE_SIDEBAR',
  TOGGLE_USE_OTHERS_PERCENTAGE='TOGGLE_USE_OTHERS_PERCENTAGE',
  OTHERS_PERCENTAGE='OTHERS_PERCENTAGE',
}

export interface InitialStateProps {
  user: firebase.User | null;
  data: CsvDataProps[];
  displayName: string;
  sidebarOpen: boolean;
  useOthersPercentage?: boolean;
  othersPercentage?: number;
}

export type ActionProps = 
  | { type: stateEnums.SET_USER, payload: { user: any, displayName: string} }
  | { type: stateEnums.SET_DATA, payload: any }
  | { type: stateEnums.TOGGLE_SIDEBAR, payload: boolean }
  | { type: stateEnums.TOGGLE_USE_OTHERS_PERCENTAGE, payload: boolean }
  | { type: stateEnums.OTHERS_PERCENTAGE, payload: number };

export const initialState: InitialStateProps = {
  user: null,
  data: [],
  displayName: "",
  sidebarOpen: false,
  useOthersPercentage: true,
  othersPercentage: 1,
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
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        sidebarOpen: action.payload,
      };
    case "TOGGLE_USE_OTHERS_PERCENTAGE":
      return {
        ...state,
        useOthersPercentage: !state.useOthersPercentage,
      }
    case "OTHERS_PERCENTAGE":
      return {
        ...state,
        othersPercentage: action.payload,
      }
    default:
    return state;
  }
};

export default stateReducer;
