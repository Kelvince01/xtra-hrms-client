import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProject } from '@models/pm.model';
import { ProjectsService } from '@services/pm.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'xtra-project-card',
  standalone: true,
  imports: [AsyncPipe, NgOptimizedImage, RouterLink],
  template: `
    @if (project$ | async; as project) {
      <div class="card">
        <img
          [ngSrc]="project?.image!"
          width="100"
          height="100"
          loading="eager"
          sizes="100vw, 50vw" />
        <div class="card-body">
          <a [routerLink]="['/pm', project.id]">{{ project.name }}</a>
        </div>
      </div>
    }
  `,
  styles: ``,
  providers: [ProjectsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent implements OnChanges {
  private readonly projectService = inject(ProjectsService);

  @Input({ required: true }) projectId!: number;
  project$: Observable<IProject> | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['projectId']) {
      this.project$ = this.projectService.getById(this.projectId);
    }
  }
}
