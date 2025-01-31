import { CsvDataProps } from '@components';
import { ToastMessageprops } from '@components/ui/ToastMessage/ToastMessage';
import firebase from 'firebase/compat/app';

export enum stateEnums {
  SET_USER='SET_USER',
  SET_DATA='SET_DATA',
  TOGGLE_SIDEBAR='TOGGLE_SIDEBAR',
  TOGGLE_USE_OTHERS_PERCENTAGE='TOGGLE_USE_OTHERS_PERCENTAGE',
  OTHERS_PERCENTAGE='OTHERS_PERCENTAGE',
  SET_LOADING='SET_LOADING',
  ADD_TOAST='ADD_TOAST',
  REMOVE_TOAST='REMOVE_TOAST'
}

export interface InitialStateProps {
  user: firebase.User | null;
  data: CsvDataProps[] | null;
  displayName: string;
  sidebarOpen: boolean;
  showTopProducts?: boolean;
  topProductsPercentage?: number;
  isLoading: boolean;
  toasts: ToastMessageprops[]
}

export type ActionProps = 
  | { type: stateEnums.SET_USER, payload: { user: any, displayName: string} }
  | { type: stateEnums.SET_DATA, payload: any }
  | { type: stateEnums.TOGGLE_SIDEBAR, payload: boolean }
  | { type: stateEnums.TOGGLE_USE_OTHERS_PERCENTAGE, payload: boolean }
  | { type: stateEnums.OTHERS_PERCENTAGE, payload: number }
  | { type: stateEnums.SET_LOADING, payload: boolean }
  | { type: stateEnums.ADD_TOAST, payload: ToastMessageprops }
  | { type: stateEnums.REMOVE_TOAST, payload: number}

export const initialState: InitialStateProps = {
  user: null,
  data: [],
  displayName: "",
  sidebarOpen: false,
  showTopProducts: true,
  topProductsPercentage: 1,
  isLoading: true,
  toasts: []
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
    case stateEnums.ADD_TOAST:
      return {
        ...state,
        toasts: [...state.toasts, action.payload]
      };
    case stateEnums.REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload)
      }
    default:
    return state;
  }
};

export default stateReducer;
