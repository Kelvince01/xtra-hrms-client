import {Routes} from '@angular/router';
import {ProjectListComponent} from '@admin-ui/pm/projects/project-list/project-list.component';
import {ProjectPageComponent} from '@admin-ui/pm/projects/project-page/project-page.component';
import {TimeOffMgtComponent} from '@admin-ui/pm/projects/time-off-mgt/time-off-mgt.component';
import {ProjectGanttComponent} from './project-gantt/project-gantt.component';

export const projectsRoutes: Routes = [
  {path: '', pathMatch: 'full', component: ProjectListComponent},
  {path: ':id', component: ProjectPageComponent},
  {path: 'time-off', component: TimeOffMgtComponent},
  {
    path: 'gantt',
    component: ProjectGanttComponent,
    data: {revalidate: 60},
  },
];
