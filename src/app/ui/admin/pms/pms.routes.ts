/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

/*
api/v1/work-productivity-datasets/
*/

import { Routes } from '@angular/router';
import { PERFORMANCE_ROUTES } from '@admin-ui/pms/performances/performances.routes';
import { QUESTION_ROUTES } from '@admin-ui/pms/questions/questions.routes';
import { QUESTION_TEMPLATE_ROUTES } from '@admin-ui/pms/question-templates/question-templates.routes';
import { QUESTION_OPTION_ROUTES } from '@admin-ui/pms/question-options/question-options.routes';
import { PERIOD_ROUTES } from '@admin-ui/pms/periods/periods.routes';
import { KEY_RESULT_FEEDBACK_ROUTES } from '@admin-ui/pms/key-result-feedbacks/key-result-feedbacks.routes';
import { FEEDBACK_ROUTES } from '@admin-ui/pms/feedbacks/feedbacks.routes';
import { EMPLOYEE_OBJECTIVE_ROUTES } from '@admin-ui/pms/employee-objectives/employee-objectives.routes';
import { EMPLOYEE_KEY_RESULT_ROUTES } from '@admin-ui/pms/employee-key-results/employee-key-results.routes';
import { COMMENT_ROUTES } from '@admin-ui/pms/comments/comments.routes';
import { ANSWER_ROUTES } from '@admin-ui/pms/answers/answers.routes';

export const PMS_ROUTES: Routes = [
  {
    path: '',
    children: PERFORMANCE_ROUTES
  },
  {
    path: 'answers',
    children: ANSWER_ROUTES
  },
  {
    path: 'comments',
    children: COMMENT_ROUTES
  },
  {
    path: 'employee-key-results',
    children: EMPLOYEE_KEY_RESULT_ROUTES
  },
  {
    path: 'employee-objectives',
    children: EMPLOYEE_OBJECTIVE_ROUTES
  },
  {
    path: 'feedbacks',
    children: FEEDBACK_ROUTES
  },
  {
    path: 'key-result-feedbacks',
    children: KEY_RESULT_FEEDBACK_ROUTES
  },
  {
    path: 'periods',
    children: PERIOD_ROUTES
  },
  {
    path: 'question-options',
    children: QUESTION_OPTION_ROUTES
  },
  {
    path: 'question-templates',
    children: QUESTION_TEMPLATE_ROUTES
  },
  {
    path: 'questions',
    children: QUESTION_ROUTES
  }
];
