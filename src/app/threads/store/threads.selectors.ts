import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

export const selectThreads = (state: AppState) => state.threads;

export const selectAllThreads = createSelector(
  selectThreads,
  (state) => state.threads,
);

export const selectAddStatus = createSelector(
  selectThreads,
  (state) => state.addStatus,
);

export const selectLoadStatus = createSelector(
  selectThreads,
  (state) => state.loadStatus,
);
