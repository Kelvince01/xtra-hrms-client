import {Routes} from '@angular/router';
import {TASK_ROUTES} from './tasks/tasks.routes';
import {TASK_ASSIGNMENT_ROUTES} from './task-assignments/task-assignments.routes';

export const pmRoutes: Routes = [
  {
    path: '',
    loadChildren: () => {
      return import('./projects/projects.routes').then((r) => r.projectsRoutes);
    },
  },
  {
    path: 'tasks',
    children: TASK_ROUTES,
  },
  {
    path: 'task-assignments',
    children: TASK_ASSIGNMENT_ROUTES,
  },
];
