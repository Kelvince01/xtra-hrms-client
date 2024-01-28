import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Type,
} from '@angular/core';
import {ICandidate} from '@models/recruitments.model';
import {CvEvaluationComponent} from '@admin-ui/recruitments/components/cv-evaluation/cv-evaluation.component';
import {InterviewPreparationComponent} from '@admin-ui/recruitments/components/interview-preparation/interview-preparation.component';
import {InterviewFeedbackComponent} from '@admin-ui/recruitments/components/interview-feedback/interview-feedback.component';
import {RejectionLetterComponent} from '@admin-ui/recruitments/components/rejection-letter/rejection-letter.component';
import {OnboardingPreparationComponent} from '@admin-ui/recruitments/components/onboarding-preparation/onboarding-preparation.component';
import {CandidateFinalizationComponent} from '@admin-ui/recruitments/components/candidate-finalization/candidate-finalization.component';
import {NgComponentOutlet} from '@angular/common';

@Component({
  selector: 'xtra-candidate-page',
  standalone: true,
  imports: [NgComponentOutlet],
  template: `
    <div class="candidate-details">
      <div>
        <h2>{{ candidate.firstName }} {{ candidate.lastName }}</h2>
        <p>Email: {{ candidate.email }}</p>
        <p>{{ candidate.position }}</p>
      </div>
      <ng-container
        *ngComponentOutlet="actionsSection; inputs: {candidateId: candidate.id}"
      ></ng-container>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidatePageComponent implements OnChanges {
  @Input() candidate!: ICandidate;
  actionsSection: Type<any> | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['candidate']) {
      this.actionsSection = this.selectActionsComponent();
    }
  }

  private selectActionsComponent(): Type<any> {
    switch (this.candidate.status) {
      case 'CV evaluation':
        return CvEvaluationComponent;
      case 'Interview preparation':
        return InterviewPreparationComponent;
      case 'Interview Feedback':
        return InterviewFeedbackComponent;
      case 'Rejected':
        return RejectionLetterComponent;
      case 'Approved':
        return this.candidate.offerAccepted
          ? OnboardingPreparationComponent
          : CandidateFinalizationComponent;
      default:
        throw new Error(`Unknown candidate status: ${this.candidate.status}`);
    }
  }
}
