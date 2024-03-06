import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoaderState } from './loader-spinner.state';

export const LOADER_STATE_NAME = 'loader';
const getLoaderState = createFeatureSelector<LoaderState>(LOADER_STATE_NAME);
export const getLoading = createSelector(getLoaderState, (state) => {
  console.log(state.isLoading);
  return state.isLoading;
});
