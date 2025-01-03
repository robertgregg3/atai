import { CsvDataProps } from '@components/charts/chart.types';
import firebase from 'firebase/compat/app';

export enum stateEnums {
  SET_USER='SET_USER',
  SET_DATA='SET_DATA',
  TOGGLE_SIDEBAR='TOGGLE_SIDEBAR',
  TOGGLE_USE_OTHERS_PERCENTAGE='TOGGLE_USE_OTHERS_PERCENTAGE',
  OTHERS_PERCENTAGE='OTHERS_PERCENTAGE',
  SET_LOADING='SET_LOADING',
}

export interface InitialStateProps {
  user: firebase.User | null;
  data: CsvDataProps[] | null;
  displayName: string;
  sidebarOpen: boolean;
  showTopProducts?: boolean;
  topProductsPercentage?: number;
  isLoading: boolean;
}

export type ActionProps = 
  | { type: stateEnums.SET_USER, payload: { user: any, displayName: string} }
  | { type: stateEnums.SET_DATA, payload: any }
  | { type: stateEnums.TOGGLE_SIDEBAR, payload: boolean }
  | { type: stateEnums.TOGGLE_USE_OTHERS_PERCENTAGE, payload: boolean }
  | { type: stateEnums.OTHERS_PERCENTAGE, payload: number }
  | { type: stateEnums.SET_LOADING, payload: boolean };

export const initialState: InitialStateProps = {
  user: null,
  data: [],
  displayName: "",
  sidebarOpen: false,
  showTopProducts: true,
  topProductsPercentage: 1,
  isLoading: true
};

const stateReducer = (state: InitialStateProps, action: ActionProps) => {
  switch (action.type) {
    case stateEnums.SET_USER:
      return {
        ...state,
        user: action.payload.user,
        displayName: action.payload.displayName,
      };
    case stateEnums.SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case stateEnums.TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarOpen: action.payload,
      };
    case stateEnums.TOGGLE_USE_OTHERS_PERCENTAGE:
      return {
        ...state,
        showTopProducts: !state.showTopProducts,
      }
    case stateEnums.OTHERS_PERCENTAGE:
      return {
        ...state,
        topProductsPercentage: action.payload,
      }
    case stateEnums.SET_LOADING: 
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
    return state;
  }
};

export default stateReducer;
