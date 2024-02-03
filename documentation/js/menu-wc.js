'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">xtra-hrms-client documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="contributing.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CONTRIBUTING
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                        <li class="link">
                            <a href="todo.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>TODO
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AboutComponent.html" data-type="entity-link" >AboutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AccountComponent.html" data-type="entity-link" >AccountComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AddressComponent.html" data-type="entity-link" >AddressComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AdminComponent.html" data-type="entity-link" >AdminComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AllowanceListComponent.html" data-type="entity-link" >AllowanceListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AllowanceUpsertComponent.html" data-type="entity-link" >AllowanceUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AmsComponent.html" data-type="entity-link" >AmsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AnswerListComponent.html" data-type="entity-link" >AnswerListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AnswerUpsertComponent.html" data-type="entity-link" >AnswerUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ArticleListComponent.html" data-type="entity-link" >ArticleListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ArticlePageComponent.html" data-type="entity-link" >ArticlePageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ArticlesComponent.html" data-type="entity-link" >ArticlesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AssetAssignComponent.html" data-type="entity-link" >AssetAssignComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AssetCategoryListComponent.html" data-type="entity-link" >AssetCategoryListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AssetCategoryPageComponent.html" data-type="entity-link" >AssetCategoryPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AssetListComponent.html" data-type="entity-link" >AssetListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AssetLotListComponent.html" data-type="entity-link" >AssetLotListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AssetLotPageComponent.html" data-type="entity-link" >AssetLotPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AssetPageComponent.html" data-type="entity-link" >AssetPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AssetRequestListComponent.html" data-type="entity-link" >AssetRequestListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AssetRequestPageComponent.html" data-type="entity-link" >AssetRequestPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AttendanceActivityListComponent.html" data-type="entity-link" >AttendanceActivityListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AttendanceActivityUpsertComponent.html" data-type="entity-link" >AttendanceActivityUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AttendanceLateComeEarlyOutListComponent.html" data-type="entity-link" >AttendanceLateComeEarlyOutListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AttendanceLateComeEarlyOutUpsertComponent.html" data-type="entity-link" >AttendanceLateComeEarlyOutUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AttendanceListComponent.html" data-type="entity-link" >AttendanceListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AttendanceOvertimeListComponent.html" data-type="entity-link" >AttendanceOvertimeListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AttendanceOvertimeUpsertComponent.html" data-type="entity-link" >AttendanceOvertimeUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AttendanceUpsertComponent.html" data-type="entity-link" >AttendanceUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AttendanceValidationConditionListComponent.html" data-type="entity-link" >AttendanceValidationConditionListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AttendanceValidationConditionUpsertComponent.html" data-type="entity-link" >AttendanceValidationConditionUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AuthComponent.html" data-type="entity-link" >AuthComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AvailableLeaveListComponent.html" data-type="entity-link" >AvailableLeaveListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AvailableLeaveUpsertComponent.html" data-type="entity-link" >AvailableLeaveUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AvatarComponent.html" data-type="entity-link" >AvatarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BankListComponent.html" data-type="entity-link" >BankListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BankUpsertComponent.html" data-type="entity-link" >BankUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BasePageComponent.html" data-type="entity-link" >BasePageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BranchListComponent.html" data-type="entity-link" >BranchListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BranchPageComponent.html" data-type="entity-link" >BranchPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BreadcrumbsComponent.html" data-type="entity-link" >BreadcrumbsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ButtonComponent.html" data-type="entity-link" >ButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CandidateFinalizationComponent.html" data-type="entity-link" >CandidateFinalizationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CandidateListComponent.html" data-type="entity-link" >CandidateListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CandidatePageComponent.html" data-type="entity-link" >CandidatePageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CandidateStageListComponent.html" data-type="entity-link" >CandidateStageListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CandidateStageUpsertComponent.html" data-type="entity-link" >CandidateStageUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CandidateTaskListComponent.html" data-type="entity-link" >CandidateTaskListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CandidateTaskUpsertComponent.html" data-type="entity-link" >CandidateTaskUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CareersPortalComponent.html" data-type="entity-link" >CareersPortalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ChatBotComponent.html" data-type="entity-link" >ChatBotComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ChatComponent.html" data-type="entity-link" >ChatComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ChatListComponent.html" data-type="entity-link" >ChatListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CmsComponent.html" data-type="entity-link" >CmsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CommentListComponent.html" data-type="entity-link" >CommentListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CommentUpsertComponent.html" data-type="entity-link" >CommentUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CommsComponent.html" data-type="entity-link" >CommsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ComposeMailComponent.html" data-type="entity-link" >ComposeMailComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ConfirmationDialogComponent.html" data-type="entity-link" >ConfirmationDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ConfirmDialogComponent.html" data-type="entity-link" >ConfirmDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ContactComponent.html" data-type="entity-link" >ContactComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ContactDetailsComponent.html" data-type="entity-link" >ContactDetailsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ContractListComponent.html" data-type="entity-link" >ContractListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ContractUpsertComponent.html" data-type="entity-link" >ContractUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CurrencyListComponent.html" data-type="entity-link" >CurrencyListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CvEvaluationComponent.html" data-type="entity-link" >CvEvaluationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DashboardComponent.html" data-type="entity-link" >DashboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DashboardComponent-1.html" data-type="entity-link" >DashboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DashboardComponent-2.html" data-type="entity-link" >DashboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DashboardComponent-3.html" data-type="entity-link" >DashboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DeductionListComponent.html" data-type="entity-link" >DeductionListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DeductionUpsertComponent.html" data-type="entity-link" >DeductionUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DeptListComponent.html" data-type="entity-link" >DeptListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DeptPageComponent.html" data-type="entity-link" >DeptPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DynamicFormComponent.html" data-type="entity-link" >DynamicFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmailDetailComponent.html" data-type="entity-link" >EmailDetailComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmailListComponent.html" data-type="entity-link" >EmailListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmailPageComponent.html" data-type="entity-link" >EmailPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmailsComponent.html" data-type="entity-link" >EmailsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmailSettingsComponent.html" data-type="entity-link" >EmailSettingsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmailSettingsV2Component.html" data-type="entity-link" >EmailSettingsV2Component</a>
                            </li>
                            <li class="link">
                                <a href="components/EmployeeKeyResultListComponent.html" data-type="entity-link" >EmployeeKeyResultListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmployeeKeyResultUpsertComponent.html" data-type="entity-link" >EmployeeKeyResultUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmployeeListComponent.html" data-type="entity-link" >EmployeeListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmployeeListItemComponent.html" data-type="entity-link" >EmployeeListItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmployeeObjectiveListComponent.html" data-type="entity-link" >EmployeeObjectiveListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmployeeObjectiveUpsertComponent.html" data-type="entity-link" >EmployeeObjectiveUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmployeePageComponent.html" data-type="entity-link" >EmployeePageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmployeePortalComponent.html" data-type="entity-link" >EmployeePortalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmployeesComponent.html" data-type="entity-link" >EmployeesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmployeeShiftListComponent.html" data-type="entity-link" >EmployeeShiftListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmployeeShiftScheduleListComponent.html" data-type="entity-link" >EmployeeShiftScheduleListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmployeeShiftScheduleUpsertComponent.html" data-type="entity-link" >EmployeeShiftScheduleUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmployeeShiftUpsertComponent.html" data-type="entity-link" >EmployeeShiftUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ErrorComponent.html" data-type="entity-link" >ErrorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ErrorMessageComponent.html" data-type="entity-link" >ErrorMessageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EventDetailComponent.html" data-type="entity-link" >EventDetailComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EventListComponent.html" data-type="entity-link" >EventListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EventsComponent.html" data-type="entity-link" >EventsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EventUpsertComponent.html" data-type="entity-link" >EventUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FederalTaxListComponent.html" data-type="entity-link" >FederalTaxListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FederalTaxUpsertComponent.html" data-type="entity-link" >FederalTaxUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FeedbackListComponent.html" data-type="entity-link" >FeedbackListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FeedbackUpsertComponent.html" data-type="entity-link" >FeedbackUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FileInputComponent.html" data-type="entity-link" >FileInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FileUploadComponent.html" data-type="entity-link" >FileUploadComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FilingStatusListComponent.html" data-type="entity-link" >FilingStatusListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FilingStatusUpsertComponent.html" data-type="entity-link" >FilingStatusUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FinanceComponent.html" data-type="entity-link" >FinanceComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FinancePortalComponent.html" data-type="entity-link" >FinancePortalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FooterComponent.html" data-type="entity-link" >FooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ForgotPasswordComponent.html" data-type="entity-link" >ForgotPasswordComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormLayoutComponent.html" data-type="entity-link" >FormLayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HolidayItemComponent.html" data-type="entity-link" >HolidayItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HolidayListComponent.html" data-type="entity-link" >HolidayListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HolidayUpsertComponent.html" data-type="entity-link" >HolidayUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HrDetailListComponent.html" data-type="entity-link" >HrDetailListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HrDetailPageComponent.html" data-type="entity-link" >HrDetailPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InputComponent.html" data-type="entity-link" >InputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InputComponent-1.html" data-type="entity-link" >InputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InterviewFeedbackComponent.html" data-type="entity-link" >InterviewFeedbackComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InterviewPreparationComponent.html" data-type="entity-link" >InterviewPreparationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/JobRoleListComponent.html" data-type="entity-link" >JobRoleListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/JobRoleUpsertComponent.html" data-type="entity-link" >JobRoleUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/KeyResultFeedbackListComponent.html" data-type="entity-link" >KeyResultFeedbackListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/KeyResultFeedbackUpsertComponent.html" data-type="entity-link" >KeyResultFeedbackUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LangComponent.html" data-type="entity-link" >LangComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LeaveDetailComponent.html" data-type="entity-link" >LeaveDetailComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LeaveListComponent.html" data-type="entity-link" >LeaveListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LeaveListComponent-1.html" data-type="entity-link" >LeaveListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LeaveRequestItemComponent.html" data-type="entity-link" >LeaveRequestItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LeaveRequestListComponent.html" data-type="entity-link" >LeaveRequestListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LeaveRequestUpsertComponent.html" data-type="entity-link" >LeaveRequestUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LeavesComponent.html" data-type="entity-link" >LeavesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LeaveTypeListComponent.html" data-type="entity-link" >LeaveTypeListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LeaveTypeUpsertComponent.html" data-type="entity-link" >LeaveTypeUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LeaveUpsertComponent.html" data-type="entity-link" >LeaveUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ListComponent.html" data-type="entity-link" >ListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ListErrorsComponent.html" data-type="entity-link" >ListErrorsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LmsComponent.html" data-type="entity-link" >LmsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoaderComponent.html" data-type="entity-link" >LoaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MsgIconBtnComponent.html" data-type="entity-link" >MsgIconBtnComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NavbarComponent.html" data-type="entity-link" >NavbarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OfflineComponent.html" data-type="entity-link" >OfflineComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OnboardingComponent.html" data-type="entity-link" >OnboardingComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OnboardingPortalListComponent.html" data-type="entity-link" >OnboardingPortalListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OnboardingPortalUpsertComponent.html" data-type="entity-link" >OnboardingPortalUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OnboardingPreparationComponent.html" data-type="entity-link" >OnboardingPreparationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OnboardingStageListComponent.html" data-type="entity-link" >OnboardingStageListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OnboardingStageUpsertComponent.html" data-type="entity-link" >OnboardingStageUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OnboardingTaskListComponent.html" data-type="entity-link" >OnboardingTaskListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OnboardingTaskUpsertComponent.html" data-type="entity-link" >OnboardingTaskUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OrganizationLeaveListComponent.html" data-type="entity-link" >OrganizationLeaveListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OrganizationLeaveUpsertComponent.html" data-type="entity-link" >OrganizationLeaveUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OrgChartComponent.html" data-type="entity-link" >OrgChartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OrgDetailComponent.html" data-type="entity-link" >OrgDetailComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OrgPageComponent.html" data-type="entity-link" >OrgPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OrgsComponent.html" data-type="entity-link" >OrgsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OtpInputComponent.html" data-type="entity-link" >OtpInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PageComponent.html" data-type="entity-link" >PageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PageNotFoundComponent.html" data-type="entity-link" >PageNotFoundComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PagerComponent.html" data-type="entity-link" >PagerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PaginationComponent.html" data-type="entity-link" >PaginationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PasswordComponent.html" data-type="entity-link" >PasswordComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PayrollListComponent.html" data-type="entity-link" >PayrollListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PayrollSettingListComponent.html" data-type="entity-link" >PayrollSettingListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PayrollSettingUpsertComponent.html" data-type="entity-link" >PayrollSettingUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PayrollUpsertComponent.html" data-type="entity-link" >PayrollUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PayslipListComponent.html" data-type="entity-link" >PayslipListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PayslipUpsertComponent.html" data-type="entity-link" >PayslipUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PerformanceListComponent.html" data-type="entity-link" >PerformanceListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PerformanceUpsertComponent.html" data-type="entity-link" >PerformanceUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PeriodListComponent.html" data-type="entity-link" >PeriodListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PeriodUpsertComponent.html" data-type="entity-link" >PeriodUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PermissionAssignComponent.html" data-type="entity-link" >PermissionAssignComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PermissionListComponent.html" data-type="entity-link" >PermissionListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PermissionPageComponent.html" data-type="entity-link" >PermissionPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PmComponent.html" data-type="entity-link" >PmComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PmsComponent.html" data-type="entity-link" >PmsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PositionListComponent.html" data-type="entity-link" >PositionListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PositionsComponent.html" data-type="entity-link" >PositionsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PositionUpsertComponent.html" data-type="entity-link" >PositionUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PrivacyPolicyComponent.html" data-type="entity-link" >PrivacyPolicyComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProfileComponent.html" data-type="entity-link" >ProfileComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProfileComponent-1.html" data-type="entity-link" >ProfileComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProjectCardComponent.html" data-type="entity-link" >ProjectCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProjectGanttComponent.html" data-type="entity-link" >ProjectGanttComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProjectListComponent.html" data-type="entity-link" >ProjectListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProjectPageComponent.html" data-type="entity-link" >ProjectPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/QuestionListComponent.html" data-type="entity-link" >QuestionListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/QuestionOptionListComponent.html" data-type="entity-link" >QuestionOptionListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/QuestionOptionUpsertComponent.html" data-type="entity-link" >QuestionOptionUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/QuestionTemplateListComponent.html" data-type="entity-link" >QuestionTemplateListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/QuestionTemplateUpsertComponent.html" data-type="entity-link" >QuestionTemplateUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/QuestionUpsertComponent.html" data-type="entity-link" >QuestionUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RecruitmentListComponent.html" data-type="entity-link" >RecruitmentListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RecruitmentPageComponent.html" data-type="entity-link" >RecruitmentPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RecruitmentsComponent.html" data-type="entity-link" >RecruitmentsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RecruitmentSurveyAnswerListComponent.html" data-type="entity-link" >RecruitmentSurveyAnswerListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RecruitmentSurveyAnswerUpsertComponent.html" data-type="entity-link" >RecruitmentSurveyAnswerUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RecruitmentSurveyListComponent.html" data-type="entity-link" >RecruitmentSurveyListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RecruitmentSurveyUpsertComponent.html" data-type="entity-link" >RecruitmentSurveyUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RejectionLetterComponent.html" data-type="entity-link" >RejectionLetterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ResetPasswordComponent.html" data-type="entity-link" >ResetPasswordComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RichTextEditorComponent.html" data-type="entity-link" >RichTextEditorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RoleListComponent.html" data-type="entity-link" >RoleListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RolePageComponent.html" data-type="entity-link" >RolePageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RotatingShiftAssignListComponent.html" data-type="entity-link" >RotatingShiftAssignListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RotatingShiftAssignUpsertComponent.html" data-type="entity-link" >RotatingShiftAssignUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RotatingShiftListComponent.html" data-type="entity-link" >RotatingShiftListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RotatingShiftUpsertComponent.html" data-type="entity-link" >RotatingShiftUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RotatingWorkTypeAssignListComponent.html" data-type="entity-link" >RotatingWorkTypeAssignListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RotatingWorkTypeAssignUpsertComponent.html" data-type="entity-link" >RotatingWorkTypeAssignUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RotatingWorkTypeListComponent.html" data-type="entity-link" >RotatingWorkTypeListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RotatingWorkTypeUpsertComponent.html" data-type="entity-link" >RotatingWorkTypeUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SettingsComponent.html" data-type="entity-link" >SettingsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ShiftRequestListComponent.html" data-type="entity-link" >ShiftRequestListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ShiftRequestUpsertComponent.html" data-type="entity-link" >ShiftRequestUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SidenavComponent.html" data-type="entity-link" >SidenavComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SidenavComponent-1.html" data-type="entity-link" >SidenavComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SidenavComponent-2.html" data-type="entity-link" >SidenavComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SidenavComponent-3.html" data-type="entity-link" >SidenavComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SidenavLinkComponent.html" data-type="entity-link" >SidenavLinkComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SidenavListItemComponent.html" data-type="entity-link" >SidenavListItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SignInComponent.html" data-type="entity-link" >SignInComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SignInComponent-1.html" data-type="entity-link" >SignInComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SignUpComponent.html" data-type="entity-link" >SignUpComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SimpleDialogComponent.html" data-type="entity-link" >SimpleDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SimplePageComponent.html" data-type="entity-link" >SimplePageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SmsComponent.html" data-type="entity-link" >SmsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SmsListComponent.html" data-type="entity-link" >SmsListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SmsListComponent-1.html" data-type="entity-link" >SmsListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SmsPageComponent.html" data-type="entity-link" >SmsPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/StageListComponent.html" data-type="entity-link" >StageListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/StageNoteListComponent.html" data-type="entity-link" >StageNoteListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/StageNoteUpsertComponent.html" data-type="entity-link" >StageNoteUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/StageUpsertComponent.html" data-type="entity-link" >StageUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SvgDefinitionsComponent.html" data-type="entity-link" >SvgDefinitionsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SvgIconComponent.html" data-type="entity-link" >SvgIconComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TableComponent.html" data-type="entity-link" >TableComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TableV2Component.html" data-type="entity-link" >TableV2Component</a>
                            </li>
                            <li class="link">
                                <a href="components/TaskAssignmentListComponent.html" data-type="entity-link" >TaskAssignmentListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TaskAssignmentUpsertComponent.html" data-type="entity-link" >TaskAssignmentUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TaskListComponent.html" data-type="entity-link" >TaskListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TaskUpsertComponent.html" data-type="entity-link" >TaskUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TelComponent.html" data-type="entity-link" >TelComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TermsOfServiceComponent.html" data-type="entity-link" >TermsOfServiceComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TextareaComponent.html" data-type="entity-link" >TextareaComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TimeOffMgtComponent.html" data-type="entity-link" >TimeOffMgtComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TitleComponent.html" data-type="entity-link" >TitleComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TrainingListComponent.html" data-type="entity-link" >TrainingListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TrainingResourceListComponent.html" data-type="entity-link" >TrainingResourceListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TrainingResourceUpsertComponent.html" data-type="entity-link" >TrainingResourceUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TrainingScheduleListComponent.html" data-type="entity-link" >TrainingScheduleListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TrainingScheduleUpsertComponent.html" data-type="entity-link" >TrainingScheduleUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TrainingsComponent.html" data-type="entity-link" >TrainingsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TrainingUpsertComponent.html" data-type="entity-link" >TrainingUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UamComponent.html" data-type="entity-link" >UamComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UiSpacerComponent.html" data-type="entity-link" >UiSpacerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserAvatarComponent.html" data-type="entity-link" >UserAvatarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserCardComponent.html" data-type="entity-link" >UserCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserListComponent.html" data-type="entity-link" >UserListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserListComponent-1.html" data-type="entity-link" >UserListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserPageComponent.html" data-type="entity-link" >UserPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UsersComponent.html" data-type="entity-link" >UsersComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/VerifyOtpComponent.html" data-type="entity-link" >VerifyOtpComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WindowComponent.html" data-type="entity-link" >WindowComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WorkRecordListComponent.html" data-type="entity-link" >WorkRecordListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WorkRecordUpsertComponent.html" data-type="entity-link" >WorkRecordUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WorkTypeListComponent.html" data-type="entity-link" >WorkTypeListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WorkTypeRequestListComponent.html" data-type="entity-link" >WorkTypeRequestListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WorkTypeRequestUpsertComponent.html" data-type="entity-link" >WorkTypeRequestUpsertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WorkTypeUpsertComponent.html" data-type="entity-link" >WorkTypeUpsertComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#directives-links"' :
                                'data-bs-target="#xs-directives-links"' }>
                                <span class="icon ion-md-code-working"></span>
                                <span>Directives</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"' }>
                                <li class="link">
                                    <a href="directives/AutofocusDirective.html" data-type="entity-link" >AutofocusDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/ButtonDirective.html" data-type="entity-link" >ButtonDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/DynamicFieldDirective.html" data-type="entity-link" >DynamicFieldDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/EmailValidatorDirective.html" data-type="entity-link" >EmailValidatorDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/EmployeeNotAvailableDirective.html" data-type="entity-link" >EmployeeNotAvailableDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/HasPermissionDirective.html" data-type="entity-link" >HasPermissionDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/LoaderDirective.html" data-type="entity-link" >LoaderDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/MinLengthDirective.html" data-type="entity-link" >MinLengthDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NgMatTableQueryReflectorDirective.html" data-type="entity-link" >NgMatTableQueryReflectorDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/TooltipDirective.html" data-type="entity-link" >TooltipDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/TruncateDirective.html" data-type="entity-link" >TruncateDirective</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ControlErrorStateMatcher.html" data-type="entity-link" >ControlErrorStateMatcher</a>
                            </li>
                            <li class="link">
                                <a href="classes/DataUtil.html" data-type="entity-link" >DataUtil</a>
                            </li>
                            <li class="link">
                                <a href="classes/DateUtil.html" data-type="entity-link" >DateUtil</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileInput.html" data-type="entity-link" >FileInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileInputBase.html" data-type="entity-link" >FileInputBase</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileValidator.html" data-type="entity-link" >FileValidator</a>
                            </li>
                            <li class="link">
                                <a href="classes/FormProvider.html" data-type="entity-link" >FormProvider</a>
                            </li>
                            <li class="link">
                                <a href="classes/LabLogWriter.html" data-type="entity-link" >LabLogWriter</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeaveListDataSource.html" data-type="entity-link" >LeaveListDataSource</a>
                            </li>
                            <li class="link">
                                <a href="classes/LogWriter.html" data-type="entity-link" >LogWriter</a>
                            </li>
                            <li class="link">
                                <a href="classes/MyTel.html" data-type="entity-link" >MyTel</a>
                            </li>
                            <li class="link">
                                <a href="classes/PasswordValidator.html" data-type="entity-link" >PasswordValidator</a>
                            </li>
                            <li class="link">
                                <a href="classes/PhoneValidator.html" data-type="entity-link" >PhoneValidator</a>
                            </li>
                            <li class="link">
                                <a href="classes/Photo.html" data-type="entity-link" >Photo</a>
                            </li>
                            <li class="link">
                                <a href="classes/UsernameValidator.html" data-type="entity-link" >UsernameValidator</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AllowancesService.html" data-type="entity-link" >AllowancesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AnalyticsService.html" data-type="entity-link" >AnalyticsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AnswersService.html" data-type="entity-link" >AnswersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ApiService.html" data-type="entity-link" >ApiService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppLogsService.html" data-type="entity-link" >AppLogsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppTranslateService.html" data-type="entity-link" >AppTranslateService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ArticlesService.html" data-type="entity-link" >ArticlesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AssetAssignmentsService.html" data-type="entity-link" >AssetAssignmentsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AssetCategoriesService.html" data-type="entity-link" >AssetCategoriesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AssetLotsService.html" data-type="entity-link" >AssetLotsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AssetRequestsService.html" data-type="entity-link" >AssetRequestsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AssetService.html" data-type="entity-link" >AssetService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AttendanceActivitiesService.html" data-type="entity-link" >AttendanceActivitiesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AttendanceLateComeEarlyOutsService.html" data-type="entity-link" >AttendanceLateComeEarlyOutsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AttendanceOvertimesService.html" data-type="entity-link" >AttendanceOvertimesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AttendanceService.html" data-type="entity-link" >AttendanceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AttendanceValidationConditionsService.html" data-type="entity-link" >AttendanceValidationConditionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthEffects.html" data-type="entity-link" >AuthEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthFacade.html" data-type="entity-link" >AuthFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService-1.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AvailableLeavesService.html" data-type="entity-link" >AvailableLeavesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BanksService.html" data-type="entity-link" >BanksService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BaseService.html" data-type="entity-link" >BaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BranchesService.html" data-type="entity-link" >BranchesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CacheService.html" data-type="entity-link" >CacheService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CandidatesService.html" data-type="entity-link" >CandidatesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CandidateStagesService.html" data-type="entity-link" >CandidateStagesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CandidateTasksService.html" data-type="entity-link" >CandidateTasksService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChatService.html" data-type="entity-link" >ChatService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChatWebsocketService.html" data-type="entity-link" >ChatWebsocketService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CommentsService.html" data-type="entity-link" >CommentsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CommonService.html" data-type="entity-link" >CommonService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ContractsService.html" data-type="entity-link" >ContractsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CookieService.html" data-type="entity-link" >CookieService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CsvService.html" data-type="entity-link" >CsvService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeductionsService.html" data-type="entity-link" >DeductionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DepartmentsService.html" data-type="entity-link" >DepartmentsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DialogService.html" data-type="entity-link" >DialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmailService.html" data-type="entity-link" >EmailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmailSettingsService.html" data-type="entity-link" >EmailSettingsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmployeeFacade.html" data-type="entity-link" >EmployeeFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmployeeKeyResultsService.html" data-type="entity-link" >EmployeeKeyResultsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmployeeObjectivesService.html" data-type="entity-link" >EmployeeObjectivesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmployeeShiftSchedulesService.html" data-type="entity-link" >EmployeeShiftSchedulesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmployeeShiftsService.html" data-type="entity-link" >EmployeeShiftsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmployeesService.html" data-type="entity-link" >EmployeesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventsService.html" data-type="entity-link" >EventsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FederalTaxsService.html" data-type="entity-link" >FederalTaxsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FeedbacksService.html" data-type="entity-link" >FeedbacksService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilesService.html" data-type="entity-link" >FilesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilingStatussService.html" data-type="entity-link" >FilingStatussService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FormErrorsService.html" data-type="entity-link" >FormErrorsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HolidaysService.html" data-type="entity-link" >HolidaysService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HrDetailsService.html" data-type="entity-link" >HrDetailsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpErrorHandler.html" data-type="entity-link" >HttpErrorHandler</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JobPositionsService.html" data-type="entity-link" >JobPositionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JobRolesService.html" data-type="entity-link" >JobRolesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JsonReaderService.html" data-type="entity-link" >JsonReaderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/KeyResultFeedbacksService.html" data-type="entity-link" >KeyResultFeedbacksService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LeaveRequestsService.html" data-type="entity-link" >LeaveRequestsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LeavesService.html" data-type="entity-link" >LeavesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LeaveTypesService.html" data-type="entity-link" >LeaveTypesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStorageJwtService.html" data-type="entity-link" >LocalStorageJwtService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerService.html" data-type="entity-link" >LoggerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MockServerService.html" data-type="entity-link" >MockServerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MpesaService.html" data-type="entity-link" >MpesaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NgrxFormsFacade.html" data-type="entity-link" >NgrxFormsFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationsStore.html" data-type="entity-link" >NotificationsStore</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OnboardingPortalsService.html" data-type="entity-link" >OnboardingPortalsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OnboardingStagesService.html" data-type="entity-link" >OnboardingStagesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OnboardingTasksService.html" data-type="entity-link" >OnboardingTasksService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrganizationService.html" data-type="entity-link" >OrganizationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrgLeavesService.html" data-type="entity-link" >OrgLeavesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PayrollSettingsService.html" data-type="entity-link" >PayrollSettingsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PayrollsService.html" data-type="entity-link" >PayrollsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PayslipsService.html" data-type="entity-link" >PayslipsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PerformancesService.html" data-type="entity-link" >PerformancesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PeriodsService.html" data-type="entity-link" >PeriodsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PermissionEffect.html" data-type="entity-link" >PermissionEffect</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PermissionsService.html" data-type="entity-link" >PermissionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProfileService.html" data-type="entity-link" >ProfileService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProjectsService.html" data-type="entity-link" >ProjectsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QuestionOptionsService.html" data-type="entity-link" >QuestionOptionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QuestionsService.html" data-type="entity-link" >QuestionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QuestionTemplatesService.html" data-type="entity-link" >QuestionTemplatesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RecruitmentsService.html" data-type="entity-link" >RecruitmentsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RecruitmentSurveyAnswersService.html" data-type="entity-link" >RecruitmentSurveyAnswersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RecruitmentSurveysService.html" data-type="entity-link" >RecruitmentSurveysService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RolesService.html" data-type="entity-link" >RolesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RotatingShiftAssignsService.html" data-type="entity-link" >RotatingShiftAssignsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RotatingShiftsService.html" data-type="entity-link" >RotatingShiftsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RotatingWorkTypeAssignsService.html" data-type="entity-link" >RotatingWorkTypeAssignsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RotatingWorkTypesService.html" data-type="entity-link" >RotatingWorkTypesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SeoService.html" data-type="entity-link" >SeoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SeoService-1.html" data-type="entity-link" >SeoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SettingsStoreService.html" data-type="entity-link" >SettingsStoreService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ShiftRequestsService.html" data-type="entity-link" >ShiftRequestsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SidenavService.html" data-type="entity-link" >SidenavService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SidenavService-1.html" data-type="entity-link" >SidenavService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SmsService.html" data-type="entity-link" >SmsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StageNotesService.html" data-type="entity-link" >StageNotesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StagesService.html" data-type="entity-link" >StagesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StateService.html" data-type="entity-link" >StateService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskAssignmentsService.html" data-type="entity-link" >TaskAssignmentsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TasksService.html" data-type="entity-link" >TasksService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ThemeService.html" data-type="entity-link" >ThemeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TimeOffManagementService.html" data-type="entity-link" >TimeOffManagementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TitleService.html" data-type="entity-link" >TitleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TrainingResourcesService.html" data-type="entity-link" >TrainingResourcesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TrainingSchedulesService.html" data-type="entity-link" >TrainingSchedulesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TrainingsService.html" data-type="entity-link" >TrainingsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransactionStore.html" data-type="entity-link" >TransactionStore</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserFacade.html" data-type="entity-link" >UserFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ViewportService.html" data-type="entity-link" >ViewportService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WindowService.html" data-type="entity-link" >WindowService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WorkProductivityDatasetsService.html" data-type="entity-link" >WorkProductivityDatasetsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WorkRecordsService.html" data-type="entity-link" >WorkRecordsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WorkTypeRequestsService.html" data-type="entity-link" >WorkTypeRequestsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WorkTypesService.html" data-type="entity-link" >WorkTypesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/XmlService.html" data-type="entity-link" >XmlService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interceptors-links"' :
                            'data-bs-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/InternetInterceptor.html" data-type="entity-link" >InternetInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/SecureInnerPagesGuard.html" data-type="entity-link" >SecureInnerPagesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Address.html" data-type="entity-link" >Address</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppState.html" data-type="entity-link" >AppState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ArticleListConfig.html" data-type="entity-link" >ArticleListConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ArticleListState.html" data-type="entity-link" >ArticleListState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Articles.html" data-type="entity-link" >Articles</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthState.html" data-type="entity-link" >AuthState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BaseModel.html" data-type="entity-link" >BaseModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChangePassword.html" data-type="entity-link" >ChangePassword</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChatContent.html" data-type="entity-link" >ChatContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Company.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CompanyListItem.html" data-type="entity-link" >CompanyListItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfirmableDecoratorOptions.html" data-type="entity-link" >ConfirmableDecoratorOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfirmDialogData.html" data-type="entity-link" >ConfirmDialogData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Element.html" data-type="entity-link" >Element</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EmailVerifyOtp.html" data-type="entity-link" >EmailVerifyOtp</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EmployeeModel.html" data-type="entity-link" >EmployeeModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EmployeeState.html" data-type="entity-link" >EmployeeState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ErrorHandlerState.html" data-type="entity-link" >ErrorHandlerState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Errors.html" data-type="entity-link" >Errors</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Errors-1.html" data-type="entity-link" >Errors</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Field.html" data-type="entity-link" >Field</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FieldAttrs.html" data-type="entity-link" >FieldAttrs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FileInputConfig.html" data-type="entity-link" >FileInputConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Filter.html" data-type="entity-link" >Filter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Filter-1.html" data-type="entity-link" >Filter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Filters.html" data-type="entity-link" >Filters</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Filters-1.html" data-type="entity-link" >Filters</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ForgotPassword.html" data-type="entity-link" >ForgotPassword</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GenericError.html" data-type="entity-link" >GenericError</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GenericErrorModel.html" data-type="entity-link" >GenericErrorModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Geo.html" data-type="entity-link" >Geo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Address.html" data-type="entity-link" >I_Address</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAccount.html" data-type="entity-link" >IAccount</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAccountType.html" data-type="entity-link" >IAccountType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAddress.html" data-type="entity-link" >IAddress</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAllowance.html" data-type="entity-link" >IAllowance</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAnswer.html" data-type="entity-link" >IAnswer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAppLog.html" data-type="entity-link" >IAppLog</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IArticle.html" data-type="entity-link" >IArticle</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAsset.html" data-type="entity-link" >IAsset</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAssetAssignment.html" data-type="entity-link" >IAssetAssignment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAssetCategory.html" data-type="entity-link" >IAssetCategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAssetLot.html" data-type="entity-link" >IAssetLot</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAttendance.html" data-type="entity-link" >IAttendance</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAttendanceActivity.html" data-type="entity-link" >IAttendanceActivity</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAttendanceLateComeEarlyOut.html" data-type="entity-link" >IAttendanceLateComeEarlyOut</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAttendanceOvertime.html" data-type="entity-link" >IAttendanceOvertime</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAttendanceValidationCondition.html" data-type="entity-link" >IAttendanceValidationCondition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAvailableLeave.html" data-type="entity-link" >IAvailableLeave</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBank.html" data-type="entity-link" >IBank</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBankBranch.html" data-type="entity-link" >IBankBranch</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBranch.html" data-type="entity-link" >IBranch</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICandidate.html" data-type="entity-link" >ICandidate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICandidateStage.html" data-type="entity-link" >ICandidateStage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICandidateTask.html" data-type="entity-link" >ICandidateTask</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICategory.html" data-type="entity-link" >ICategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IChatService.html" data-type="entity-link" >IChatService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICity.html" data-type="entity-link" >ICity</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IComment.html" data-type="entity-link" >IComment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IComment-1.html" data-type="entity-link" >IComment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IContact.html" data-type="entity-link" >IContact</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IContract.html" data-type="entity-link" >IContract</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICountry.html" data-type="entity-link" >ICountry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICounty.html" data-type="entity-link" >ICounty</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICounty-1.html" data-type="entity-link" >ICounty</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICurrency.html" data-type="entity-link" >ICurrency</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDeduction.html" data-type="entity-link" >IDeduction</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDepartment.html" data-type="entity-link" >IDepartment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDepartmentSection.html" data-type="entity-link" >IDepartmentSection</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEmail.html" data-type="entity-link" >IEmail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEmail-1.html" data-type="entity-link" >IEmail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEmailSetting.html" data-type="entity-link" >IEmailSetting</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEmployee.html" data-type="entity-link" >IEmployee</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEmployeeBank.html" data-type="entity-link" >IEmployeeBank</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEmployeeBankAccount.html" data-type="entity-link" >IEmployeeBankAccount</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEmployeeInfo.html" data-type="entity-link" >IEmployeeInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEmployeeKeyResult.html" data-type="entity-link" >IEmployeeKeyResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEmployeeObjective.html" data-type="entity-link" >IEmployeeObjective</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEmployeeShift.html" data-type="entity-link" >IEmployeeShift</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEmployeeShiftDay.html" data-type="entity-link" >IEmployeeShiftDay</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEmployeeShiftSchedule.html" data-type="entity-link" >IEmployeeShiftSchedule</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEmployeeV2.html" data-type="entity-link" >IEmployeeV2</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEvent.html" data-type="entity-link" >IEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IExportColumn.html" data-type="entity-link" >IExportColumn</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFederalTax.html" data-type="entity-link" >IFederalTax</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFeedback.html" data-type="entity-link" >IFeedback</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFilingStatus.html" data-type="entity-link" >IFilingStatus</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IForgotPassword.html" data-type="entity-link" >IForgotPassword</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IForgotPasswordResponse.html" data-type="entity-link" >IForgotPasswordResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGoogle.html" data-type="entity-link" >IGoogle</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGroup.html" data-type="entity-link" >IGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IHoliday.html" data-type="entity-link" >IHoliday</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IHrDetail.html" data-type="entity-link" >IHrDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IJobPosition.html" data-type="entity-link" >IJobPosition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IJobPosition-1.html" data-type="entity-link" >IJobPosition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IJobRole.html" data-type="entity-link" >IJobRole</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IKeyResultFeedback.html" data-type="entity-link" >IKeyResultFeedback</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILeave.html" data-type="entity-link" >ILeave</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILeaveRequest.html" data-type="entity-link" >ILeaveRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILeaveRequestAddDto.html" data-type="entity-link" >ILeaveRequestAddDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILeaveRequestUpdateDto.html" data-type="entity-link" >ILeaveRequestUpdateDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILeaveType.html" data-type="entity-link" >ILeaveType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILocation.html" data-type="entity-link" >ILocation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILogin.html" data-type="entity-link" >ILogin</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILoginResponse.html" data-type="entity-link" >ILoginResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMessage.html" data-type="entity-link" >IMessage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/INotification.html" data-type="entity-link" >INotification</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/INotificationV2.html" data-type="entity-link" >INotificationV2</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IOnboardingPortal.html" data-type="entity-link" >IOnboardingPortal</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IOnboardingStage.html" data-type="entity-link" >IOnboardingStage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IOnboardingTask.html" data-type="entity-link" >IOnboardingTask</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IOptions.html" data-type="entity-link" >IOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IOrganization.html" data-type="entity-link" >IOrganization</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IOrganizationInfo.html" data-type="entity-link" >IOrganizationInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IOrganizationLeave.html" data-type="entity-link" >IOrganizationLeave</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPaymentMethod.html" data-type="entity-link" >IPaymentMethod</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPaymentProviderService.html" data-type="entity-link" >IPaymentProviderService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPaymentTransaction.html" data-type="entity-link" >IPaymentTransaction</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPaypalPayment.html" data-type="entity-link" >IPaypalPayment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPayroll.html" data-type="entity-link" >IPayroll</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPayrollSetting.html" data-type="entity-link" >IPayrollSetting</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPayslip.html" data-type="entity-link" >IPayslip</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPerformance.html" data-type="entity-link" >IPerformance</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPeriod.html" data-type="entity-link" >IPeriod</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPermission.html" data-type="entity-link" >IPermission</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPosition.html" data-type="entity-link" >IPosition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IProfile.html" data-type="entity-link" >IProfile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IProject.html" data-type="entity-link" >IProject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IQuestion.html" data-type="entity-link" >IQuestion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IQuestionOption.html" data-type="entity-link" >IQuestionOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IQuestionTemplate.html" data-type="entity-link" >IQuestionTemplate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IReaction.html" data-type="entity-link" >IReaction</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRecruitment.html" data-type="entity-link" >IRecruitment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRecruitmentList.html" data-type="entity-link" >IRecruitmentList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRecruitmentSurvey.html" data-type="entity-link" >IRecruitmentSurvey</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRecruitmentSurveyAnswer.html" data-type="entity-link" >IRecruitmentSurveyAnswer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRefundablePaymentProviderService.html" data-type="entity-link" >IRefundablePaymentProviderService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRegister.html" data-type="entity-link" >IRegister</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRequestAsset.html" data-type="entity-link" >IRequestAsset</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IResetPassword.html" data-type="entity-link" >IResetPassword</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IResetPasswordResponse.html" data-type="entity-link" >IResetPasswordResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IResponse.html" data-type="entity-link" >IResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRole.html" data-type="entity-link" >IRole</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRotatingShift.html" data-type="entity-link" >IRotatingShift</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRotatingShiftAssign.html" data-type="entity-link" >IRotatingShiftAssign</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRotatingWorkType.html" data-type="entity-link" >IRotatingWorkType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRotatingWorkTypeAssign.html" data-type="entity-link" >IRotatingWorkTypeAssign</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISection.html" data-type="entity-link" >ISection</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IShiftRequest.html" data-type="entity-link" >IShiftRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISms.html" data-type="entity-link" >ISms</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStage.html" data-type="entity-link" >IStage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStageNote.html" data-type="entity-link" >IStageNote</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStatus.html" data-type="entity-link" >IStatus</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITableColumn.html" data-type="entity-link" >ITableColumn</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITag.html" data-type="entity-link" >ITag</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITask.html" data-type="entity-link" >ITask</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITaskAssigment.html" data-type="entity-link" >ITaskAssigment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITaxBracket.html" data-type="entity-link" >ITaxBracket</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITeam.html" data-type="entity-link" >ITeam</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITitle.html" data-type="entity-link" >ITitle</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITraining.html" data-type="entity-link" >ITraining</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITrainingResource.html" data-type="entity-link" >ITrainingResource</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITrainingSchedule.html" data-type="entity-link" >ITrainingSchedule</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITransaction.html" data-type="entity-link" >ITransaction</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser-1.html" data-type="entity-link" >IUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IWorkProductivityDataset.html" data-type="entity-link" >IWorkProductivityDataset</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IWorkRecord.html" data-type="entity-link" >IWorkRecord</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IWorkSheet.html" data-type="entity-link" >IWorkSheet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IWorkType.html" data-type="entity-link" >IWorkType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IWorkTypeRequest.html" data-type="entity-link" >IWorkTypeRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Leave.html" data-type="entity-link" >Leave</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LeaveListItem.html" data-type="entity-link" >LeaveListItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LeaveType.html" data-type="entity-link" >LeaveType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoggedInUser.html" data-type="entity-link" >LoggedInUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Login.html" data-type="entity-link" >Login</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginUser.html" data-type="entity-link" >LoginUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginUserRequest.html" data-type="entity-link" >LoginUserRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuItem.html" data-type="entity-link" >MenuItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NavItem.html" data-type="entity-link" >NavItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NewDepartment.html" data-type="entity-link" >NewDepartment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NewEmployee.html" data-type="entity-link" >NewEmployee</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NewEmployeeModel.html" data-type="entity-link" >NewEmployeeModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NewOrganization.html" data-type="entity-link" >NewOrganization</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NewPosition.html" data-type="entity-link" >NewPosition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NewUser.html" data-type="entity-link" >NewUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NewUser-1.html" data-type="entity-link" >NewUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NewUserRequest.html" data-type="entity-link" >NewUserRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgrxFormsState.html" data-type="entity-link" >NgrxFormsState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Paginated.html" data-type="entity-link" >Paginated</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaymentSourceModel.html" data-type="entity-link" >PaymentSourceModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PeriodicElement.html" data-type="entity-link" >PeriodicElement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PeriodicElement-1.html" data-type="entity-link" >PeriodicElement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PeriodicElement-2.html" data-type="entity-link" >PeriodicElement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PermissionModel.html" data-type="entity-link" >PermissionModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PermissionState.html" data-type="entity-link" >PermissionState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PhoneLogin.html" data-type="entity-link" >PhoneLogin</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PhoneVerifyOtp.html" data-type="entity-link" >PhoneVerifyOtp</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Profile.html" data-type="entity-link" >Profile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProfileResponse.html" data-type="entity-link" >ProfileResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RecruitmentListConfig.html" data-type="entity-link" >RecruitmentListConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RecruitmentListState.html" data-type="entity-link" >RecruitmentListState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Recruitments.html" data-type="entity-link" >Recruitments</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RecruitmentState.html" data-type="entity-link" >RecruitmentState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RefreshToken.html" data-type="entity-link" >RefreshToken</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Register.html" data-type="entity-link" >Register</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegisterResponse.html" data-type="entity-link" >RegisterResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResetPassword.html" data-type="entity-link" >ResetPassword</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response.html" data-type="entity-link" >Response</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TrainingState.html" data-type="entity-link" >TrainingState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdateDepartment.html" data-type="entity-link" >UpdateDepartment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdateEmployee.html" data-type="entity-link" >UpdateEmployee</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdateEmployeeModel.html" data-type="entity-link" >UpdateEmployeeModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdateOrganization.html" data-type="entity-link" >UpdateOrganization</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdatePosition.html" data-type="entity-link" >UpdatePosition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdateUser.html" data-type="entity-link" >UpdateUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User-1.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserInterface.html" data-type="entity-link" >UserInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserModel.html" data-type="entity-link" >UserModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserResponse.html" data-type="entity-link" >UserResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserState.html" data-type="entity-link" >UserState</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#pipes-links"' :
                                'data-bs-target="#xs-pipes-links"' }>
                                <span class="icon ion-md-add"></span>
                                <span>Pipes</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="pipes-links"' : 'id="xs-pipes-links"' }>
                                <li class="link">
                                    <a href="pipes/ByteFormatPipe.html" data-type="entity-link" >ByteFormatPipe</a>
                                </li>
                                <li class="link">
                                    <a href="pipes/DataPropertyGetterPipe.html" data-type="entity-link" >DataPropertyGetterPipe</a>
                                </li>
                                <li class="link">
                                    <a href="pipes/LineBreakPipe.html" data-type="entity-link" >LineBreakPipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});