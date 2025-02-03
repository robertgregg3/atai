type ToastPositionsType =  'top' | 'bottom' | 'top-right' | 'bottom-right';
export type ToastStatusType = 'success' | 'error' | 'info';

export interface ToastMessageprops {
    id: number;
    message: string;
    status: ToastStatusType;
    duration?: number; 
    position: ToastPositionsType
}[];