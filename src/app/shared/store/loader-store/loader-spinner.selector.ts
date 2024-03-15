import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoaderState } from './loader-spinner.state';

export const LOADER_SELECTOR = 'loader';
const getLoaderState = createFeatureSelector<LoaderState>(LOADER_SELECTOR);
export const getLoading = createSelector(getLoaderState, (state) => {
  return state.isLoading;
});
