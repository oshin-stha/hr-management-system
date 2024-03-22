export interface LoaderState {
  isLoading: boolean;
  success: boolean;
  error: string;
}
export const initialState: LoaderState = {
  isLoading: false,
  success: false,
  error: '',
};
