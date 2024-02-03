import {ITraining} from '@models/training.model';

export interface Filter {
  month: number;
  year: number;
  categoryId: number | null;
}

export function filterTrainings(trainings: ITraining[], filter: Filter): ITraining[] {
  return trainings.filter((t) => {
    if (filter.categoryId === null) {
      return createdAtFilter(t, filter) && dateFilter(t, filter) && startEndFilter(t, filter);
    } else {
      return (
        createdAtFilter(t, filter) &&
        dateFilter(t, filter) &&
        startEndFilter(t, filter) &&
        t.categoryId === filter.categoryId
      );
    }
  });
}

function dateFilter(t: ITraining, filter: Filter): boolean {
  const monthFilter = t.date?.getMonth() === filter.month;
  const yearFilter = t.date?.getFullYear() === filter.year;

  switch (t.interval) {
    case 'MONTHLY':
      return true;
    case 'YEARLY':
      return monthFilter;
    default:
      return monthFilter && yearFilter;
  }
}

function createdAtFilter(t: ITraining, filter: Filter): boolean {
  return t.created_at!.getMonth() <= filter.month && t.created_at!.getFullYear() <= filter.year;
}

function startEndFilter(t: ITraining, filter: Filter): boolean {
  if (!!t.start && !!t.end) {
    return (
      t.start.getMonth() <= filter.month &&
      t.start.getFullYear() <= filter.year &&
      t.end.getMonth() >= filter.month &&
      t.end.getFullYear() >= filter.year
    );
  } else {
    return true;
  }
}
