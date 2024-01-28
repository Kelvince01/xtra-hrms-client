import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ProjectCardComponent} from '@admin-ui/pm/projects/project-card/project-card.component';
import {AsyncPipe, NgForOf} from '@angular/common';
import {ProjectsService} from '@services/pm.service';

@Component({
  selector: 'xtra-project-list',
  standalone: true,
  imports: [ProjectCardComponent, NgForOf, AsyncPipe],
  template: `
    <div class="row">
      <xtra-project-card *ngFor="let project of projects$ | async" [projectId]="project.id!" />
    </div>
  `,
  styles: ``,
  providers: [ProjectsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectListComponent {
  private readonly projectService = inject(ProjectsService);
  projects$ = this.projectService.get();
}
