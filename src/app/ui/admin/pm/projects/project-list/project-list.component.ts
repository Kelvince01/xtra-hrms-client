import { ProjectCardComponent } from '@admin-ui/pm/projects/project-card/project-card.component';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProjectsService } from '@services/pm.service';

@Component({
  selector: 'xtra-project-list',
  standalone: true,
  imports: [ProjectCardComponent, AsyncPipe],
  template: `
    <div class="row">
      @for (project of projects$ | async; track project) {
        <xtra-project-card [projectId]="project.id!" />
      }
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
