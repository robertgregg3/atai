import { CsvDataProps } from '@components';
import { ToastMessageprops } from '@components';
import firebase from 'firebase/compat/app';
import React from 'react';

export enum stateEnums {
  SET_USER='SET_USER',
  SET_DATA='SET_DATA',
  TOGGLE_SIDEBAR='TOGGLE_SIDEBAR',
  TOGGLE_USE_OTHERS_PERCENTAGE='TOGGLE_USE_OTHERS_PERCENTAGE',
  OTHERS_PERCENTAGE='OTHERS_PERCENTAGE',
  SET_LOADING='SET_LOADING',
  ADD_TOAST='ADD_TOAST',
  REMOVE_TOAST='REMOVE_TOAST',
  SHOW_DIALOG='SHOW_DIALOG',
  SET_DIALOG_CONTENT='SET_DIALOG_CONTENT',
  SHOW_SETTINGS='SHOW_SETTINGS',
}

export interface InitialStateProps {
  user: firebase.User | null;
  data: CsvDataProps[] | null;
  displayName: string;
  sidebarOpen: boolean;
  showTopProducts?: boolean;
  topProductsPercentage?: number;
  isLoading: boolean;
  toasts: ToastMessageprops[];
  showDialog: boolean;
  dialogContent: React.ReactNode | null;
  showSettings?: boolean;
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
  | { type: stateEnums.SHOW_DIALOG, payload: boolean}
  | { type: stateEnums.SET_DIALOG_CONTENT, payload: React.ReactNode | null}
  | { type: stateEnums.SHOW_SETTINGS, payload: boolean}

export const initialState: InitialStateProps = {
  user: null,
  data: [],
  displayName: "",
  sidebarOpen: false,
  showTopProducts: true,
  topProductsPercentage: 1,
  isLoading: true,
  toasts: [],
  showDialog: false,
  dialogContent: null,
  showSettings: false,
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
    case stateEnums.SHOW_DIALOG:
      return {
        ...state,
        showDialog: action.payload
      }
    case stateEnums.SET_DIALOG_CONTENT:
      return {
        ...state,
        dialogContent: action.payload
      }
    case stateEnums.SHOW_SETTINGS:
      return {
        ...state,
        showSettings: action.payload
      }
    default:
    return state;
  }
};

export default stateReducer;
