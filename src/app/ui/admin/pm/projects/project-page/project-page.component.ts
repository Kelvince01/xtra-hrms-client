import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  numberAttribute,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {Observable} from 'rxjs';
import {ProjectsService} from '@services/pm.service';
import {IProject} from '@models/pm.model';
import {ProjectCardComponent} from '@admin-ui/pm/projects/project-card/project-card.component';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'xtra-project-page',
  standalone: true,
  imports: [ProjectCardComponent, AsyncPipe, NgIf, NgForOf],
  template: `
    <div class="project-details">
      <h3>Project Details</h3>
      <div *ngIf="project$ | async as project">
        <span>Project Name: {{ project.name }}</span>
        <span>Project Description: {{ project.description }}</span>
        <span>Logo: {{ project.image }}</span>
        <div class="subprojects">
          <span>Subprojects:</span>
          <xtra-project-card
            *ngFor="let subProjectId of project.subProjectIds"
            [projectId]="subProjectId"
          ></xtra-project-card>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  providers: [ProjectsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectPageComponent implements OnChanges {
  @Input({transform: numberAttribute}) id!: number;
  private readonly projectService = inject(ProjectsService);
  project$: Observable<IProject> | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id']) {
      this.project$ = this.projectService.getById(this.id);
    }
  }
}
