import { TestBed } from '@angular/core/testing';
import { Action, Store, StoreModule, combineReducers } from '@ngrx/store';
import { LoaderState } from '../loader-spinner.state';
import { LOADER_SELECTOR, getLoading } from './loader-spinner.selector';
import { setLoadingSpinner } from '../loader-spinner.action';
import { of } from 'rxjs';

describe('Loader Selectors', () => {
  let store: Store<{ [LOADER_SELECTOR]: LoaderState }>;

  const initialState = {
    loader: {
      isLoading: false,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          [LOADER_SELECTOR]: combineReducers({
            loader: (state = initialState.loader, action: Action) => {
              switch (action.type) {
                case setLoadingSpinner.type:
                  return { state, isLoading: action };
                default:
                  return state;
              }
            },
          }),
        }),
      ],
    });

    store = TestBed.inject(Store);
  });

  describe('getLoading', () => {
    it('should return isLoading from loader state', () => {
      const mockResult = true;
      spyOn(store, 'select').and.returnValue(of(mockResult));
      let result: boolean | undefined;
      store.select(getLoading).subscribe((loading: boolean) => {
        result = loading;
      });
      expect(result).toBe(mockResult);
    });
  });
});
