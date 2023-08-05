import { createReducer, on } from '@ngrx/store';

import { Thread } from '../interfaces';

import {
  addThreadStart,
  addThreadSuccess,
  appendThreadsStart,
  appendThreadsSuccess,
  loadThreadsStart,
  loadThreadsSuccess,
} from './threads.actions';

export interface ThreadsState {
  threads: Thread[];
  error?: string;
  loadStatus: boolean;
  addStatus: boolean;
}

export const initialState: ThreadsState = {
  threads: [],
  error: undefined,
  loadStatus: false,
  addStatus: false,
};

export const threadsReducer = createReducer(
  // Supply the initial state
  initialState,
  on(addThreadStart, (state) => ({
    ...state,
    addStatus: true,
  })),
  on(addThreadSuccess, (state, { newThread }) => ({
    ...state,
    threads: [newThread, ...state.threads],
    addStatus: false,
  })),

  // Trigger loading the threads
  on(loadThreadsStart, (state) => ({ ...state, loadStatus: true })),
  // Handle successfully loaded threads
  on(loadThreadsSuccess, (state, { threads }) => ({
    ...state,
    threads,
    error: undefined,
    loadStatus: false,
  })),

  on(appendThreadsStart, (state) => ({ ...state, loadStatus: true })),

  on(appendThreadsSuccess, (state, { threads }) => ({
    ...state,
    threads: [...state.threads, ...threads],
    loadStatus: false,
  })),
);
