import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembershipFormComponent } from './membership-form/membership-form.component';
import { MembershipComponent } from './membership/membership.component';
import { NotesComponent } from './notes/notes.component';
import { ApplicantComponent } from './applicant/applicant.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { PasswordComponent } from './password/password.component';
import { ProfileComponent } from './profile/profile.component';
import { DetailsComponent } from './details/details.component';
import { LinkComponent } from './link/link.component';
import { NoticeComponent } from './notice/notice.component';
import { InvoiceTableComponent } from './invoice-table/invoice-table.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { CertiTableComponent } from './certi-table/certi-table.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AdminLandingComponent } from './admin-landing/admin-landing.component';
import { AdminFeedbackComponent } from './admin-feedback/admin-feedback.component';
import { AdreeDisagreeComponent } from './adree-disagree/adree-disagree.component';
import { AdminMembershipCertificateComponent } from './admin-membership-certificate/admin-membership-certificate.component';
import { MembershipDetailComponent } from './membership-detail/membership-detail.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { AdminRenewalComponent } from './admin-renewal/admin-renewal.component';
import { AdminInvoiceComponent } from './admin-invoice/admin-invoice.component';
import { AdminReceiptComponent } from './admin-receipt/admin-receipt.component';
import { AccountStatementComponent } from './account-statement/account-statement.component';
import { ReceiptTableComponent } from './receipt-table/receipt-table.component';
import { PaymentComponent } from './payment/payment.component';
import { MemberListComponent } from './member-list/member-list.component';
import { DetailSByIdComponent } from './detail-sby-id/detail-sby-id.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { MembershipFormWizardComponent } from './membership-form-wizard/membership-form-wizard.component';
import { AddEventsComponent } from './add-events/add-events.component';
import { BookedEventsComponent } from './booked-events/booked-events.component';
import { BookEventsComponent } from './book-events/book-events.component';
import { MembershipProfileComponent } from './membership-profile/membership-profile.component';
import { AdminMeetingComponent } from './admin-meeting/admin-meeting.component';
import { ExternalEventsComponent } from './external-events/external-events.component';
import { EnquiriesComponent } from './enquiries/enquiries.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsDashboardComponent } from './events-dashboard/events-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminNewUserComponent } from './admin-new-user/admin-new-user.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { AppoverNavComponent } from './appover-nav/appover-nav.component';
import { AppoverDashboardComponent } from './appover-dashboard/appover-dashboard.component';
import { ManagerNavComponent } from './manager-nav/manager-nav.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ManagerLandingComponent } from './manager-landing/manager-landing.component';
import { AppoverLandingComponent } from './appover-landing/appover-landing.component';
import { UserMemberslistComponent } from './user-memberslist/user-memberslist.component';
import { GenerateInvoiceComponent } from './generate-invoice/generate-invoice.component';
import { GenerateInvoiceViewComponent } from './generate-invoice-view/generate-invoice-view.component';
// import { WizardStepComponent } from './themes/angularWizard/wizard-step.component';
// import { WizardComponent } from './themes/angularWizard/wizard.component';

const routes: Routes = [
{ path: 'enquires', component: EnquiriesComponent },
{ path: 'dashboard', component: DashboardComponent},
{path:'events-dashboard', component:EventsDashboardComponent},
{ path: 'membership-module', component: MembershipFormComponent },
{ path: 'external-events', component: ExternalEventsComponent},
{ path: 'receipt-table', component: ReceiptTableComponent },
{ path: 'receipt/:id', component:ReceiptComponent },
{ path: 'payment/:amount', component: PaymentComponent },
{ path: 'membership-detail/:id', component: MembershipDetailComponent },
{ path: 'detail-sby-id/:id', component: DetailSByIdComponent },
{ path: 'super-admin', component: SuperAdminComponent },
{ path: 'admin-renewal', component: AdminRenewalComponent },
{ path: 'admin-invoice', component: AdminInvoiceComponent },
{ path: 'admin-receipt', component: AdminReceiptComponent },
{ path: 'account-statement', component: AccountStatementComponent },
{ path: 'allMemberList', component: MemberListComponent },
{ path: 'admin-nav', component: AdminNavComponent },
{ path: 'admin-membership-certificate', component: AdminMembershipCertificateComponent },
{ path: 'adree-disagree', component: AdreeDisagreeComponent },
{ path: 'admin-feedback', component: AdminFeedbackComponent },
{ path: 'admin-landing', component: AdminLandingComponent },
{ path: 'app-membership', component: MembershipComponent },
{ path: 'membershipForm', component: MembershipFormWizardComponent},
{ path: 'app-notes', component: NotesComponent },
{ path: 'app-applicant', component: ApplicantComponent },
{ path: 'app-signIn', component: SignInComponent },
{ path:"", redirectTo:"/app-signIn", pathMatch:"full" },

{ path:"app-signIn", redirectTo:"/app-signIn", pathMatch:"full" },

{ path: 'app-signUp', component: SignUpComponent },
{ path: 'app-feedback', component: FeedbackComponent },
{ path: 'notice/:id', component: NoticeComponent },

{ path: 'app-password', component: PasswordComponent },
{ path: 'app-profile', component: ProfileComponent },
{ path: 'app-details', component: DetailsComponent },
{ path: 'app-link', component: LinkComponent },
{ path: 'invoice/:id', component: InvoiceComponent },
{ path: 'invoice-table', component: InvoiceTableComponent },
{ path: 'certi-table', component: CertiTableComponent },

{ path: 'events', component: AddEventsComponent},
{ path: 'booked-events', component: BookedEventsComponent},
{ path: 'book-event', component: BookEventsComponent},
{ path: 'profile', component:MembershipProfileComponent},
{ path: 'meetings', component:AdminMeetingComponent},

{ path: 'admin-dashboard', component: AdminDashboardComponent},
{ path: 'admin-newuser', component: AdminNewUserComponent },

{ path: 'manager-dashboard', component: ManagerDashboardComponent },
{ path: 'manager-landing', component: ManagerLandingComponent },
{ path: 'manager-nav', component: ManagerNavComponent },

{ path: 'appover-dashboard', component: AppoverDashboardComponent },
{ path: 'appover-landing', component: AppoverLandingComponent },
{ path: 'appover-nav', component: AppoverNavComponent },

{ path: 'Authentication/:id', component: AuthenticationComponent},

{ path: 'members-list', component: UserMemberslistComponent},

{ path: 'generate-invoice', component: GenerateInvoiceComponent},
{ path: 'generate-invoice-view', component: GenerateInvoiceViewComponent}

// {path:"", redirectTo:"/membership-module", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
