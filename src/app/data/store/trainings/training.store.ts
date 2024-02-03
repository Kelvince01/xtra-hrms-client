import {patchState, signalState} from '@ngrx/signals';
import {computed, inject, Injectable} from '@angular/core';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {exhaustMap, pipe, switchMap, tap} from 'rxjs';
import {Router} from '@angular/router';
import {ITraining} from '@models/training.model';
import {TrainingsService} from '@services/training.model';
import {Filter, filterTrainings} from '@data/filters/training.filter';
import {defaultFilter} from '@data/filters/default-filter';

export interface TrainingState {
  trainings: ITraining[];
  filter: Filter;
  selectedTrainingId: number | null;
}

const initialState: TrainingState = {
  trainings: [],
  filter: defaultFilter(),
  selectedTrainingId: null,
};

const trainingState = signalState(initialState);

@Injectable({providedIn: 'root'})
export class TransactionStore {
  readonly transactions = computed(() =>
    filterTrainings(trainingState.trainings(), trainingState.filter()).sort(
      (a, b) => +b.date - +a.date,
    ),
  );

  readonly totalEarnings = computed(() =>
    this.transactions()
      .filter((t) => t.type === 'EARNING')
      .reduce((sum, t) => sum + t.amount, 0),
  );

  readonly totalSpendings = computed(() =>
    this.transactions()
      .filter((t) => t.type === 'SPENDING')
      .reduce((sum, t) => sum + t.amount, 0),
  );

  readonly selectedTransaction = computed(
    () =>
      trainingState.trainings().find((t) => t.id === trainingState.selectedTrainingId()) ?? null,
  );

  readonly filter = computed(() => trainingState.filter());

  load = rxMethod<void>(
    pipe(
      switchMap(() =>
        this.transactionService
          .get()
          .pipe(tap((transactions) => patchState(trainingState, {trainings: transactions}))),
      ),
    ),
  );

  create = rxMethod<{createTransaction: ITraining; forward?: string}>(
    pipe(
      exhaustMap(({createTransaction, forward}) =>
        this.transactionService.create(createTransaction).pipe(
          tap((transaction) => {
            patchState(trainingState, (state) => ({
              trainings: [...state.trainings, transaction],
            }));

            if (forward) {
              this.router.navigate([forward]);
            }
          }),
        ),
      ),
    ),
  );

  update = rxMethod<{updateTransaction: ITraining; forward?: string}>(
    pipe(
      exhaustMap(({updateTransaction, forward}) =>
        this.transactionService.update(updateTransaction).pipe(
          tap((transaction) => {
            patchState(trainingState, (state) => ({
              trainings: state.trainings.map((t) => (t.id === transaction.id ? transaction : t)),
            }));

            if (forward) {
              this.router.navigate([forward]);
            }
          }),
        ),
      ),
    ),
  );

  delete = rxMethod<{transactionId: number; forward?: string}>(
    pipe(
      exhaustMap(({transactionId, forward}) =>
        this.transactionService.delete(transactionId).pipe(
          tap(() => {
            patchState(trainingState, (state) => ({
              trainings: state.trainings.filter((transaction) => transaction.id !== transactionId),
            }));

            if (forward) {
              this.router.navigate([forward]);
            }
          }),
        ),
      ),
    ),
  );

  updateFilter(filter: Filter) {
    patchState(trainingState, {filter});
  }

  select(transactionId: number) {
    patchState(trainingState, {selectedTrainingId: transactionId});
  }

  deselect() {
    patchState(trainingState, {selectedTrainingId: null});
  }

  private readonly transactionService = inject(TrainingsService);
  private readonly router = inject(Router);
}
