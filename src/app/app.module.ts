import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgxIntlTelInputModule} from "ngx-intl-tel-input";
import {BsDropdownModule} from "ngx-bootstrap";
import { BsDatepickerModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

import { OwlDateTimeModule, OwlNativeDateTimeModule,
  DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MembershipFormComponent } from './membership-form/membership-form.component';
import { MembershipComponent } from './membership/membership.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotesComponent } from './notes/notes.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {MatPaginatorModule} from '@angular/material/paginator';
import { ApplicantComponent } from './applicant/applicant.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { PasswordComponent } from './password/password.component';
import { ProfileComponent } from './profile/profile.component';
import { DetailsComponent } from './details/details.component';
import { LinkComponent } from './link/link.component';
import { NoticeComponent } from './notice/notice.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceTableComponent } from './invoice-table/invoice-table.component';
import { CertiTableComponent } from './certi-table/certi-table.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AdminLandingComponent } from './admin-landing/admin-landing.component';
import { AdminFeedbackComponent } from './admin-feedback/admin-feedback.component';
import { ModalModule, BsModalRef  } from 'ngx-bootstrap/modal';
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
import { LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import { MemberListComponent } from './member-list/member-list.component';
import { DetailSByIdComponent } from './detail-sby-id/detail-sby-id.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { MembershipFormWizardComponent } from './membership-form-wizard/membership-form-wizard.component';
import { AddEventsComponent } from './add-events/add-events.component';
import { BookedEventsComponent } from './booked-events/booked-events.component';
import { BookEventsComponent } from './book-events/book-events.component';
import { MembershipProfileComponent } from './membership-profile/membership-profile.component';
import { FormWizardModule } from 'angular2-wizard';
import { NgxEditorModule } from 'ngx-editor';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { AdminMeetingComponent } from './admin-meeting/admin-meeting.component';
import { ExternalEventsComponent } from './external-events/external-events.component';
import { EnquiriesComponent } from './enquiries/enquiries.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsDashboardComponent } from './events-dashboard/events-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminNewUserComponent } from './admin-new-user/admin-new-user.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { ManagerNavComponent } from './manager-nav/manager-nav.component';
import { AppoverNavComponent } from './appover-nav/appover-nav.component';
import { AppoverDashboardComponent } from './appover-dashboard/appover-dashboard.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { GrdFilterPipe } from './grd-filter.pipe';
import { ManagerLandingComponent } from './manager-landing/manager-landing.component';
import { AppoverLandingComponent } from './appover-landing/appover-landing.component';
import { UserMemberslistComponent } from './user-memberslist/user-memberslist.component';
import { GenerateInvoiceComponent } from './generate-invoice/generate-invoice.component';
import { GenerateInvoiceViewComponent } from './generate-invoice-view/generate-invoice-view.component';
// import { WizardStepComponent } from './themes/angularWizard/wizard-step.component';
// import { WizardComponent } from './themes/angularWizard/wizard.component';

export const MY_CUSTOM_FORMATS = {
  fullPickerInput: 'YYYY-MM-DD HH:mm:ss',
  parseInput: 'YYYY-MM-DD HH:mm:ss',
  datePickerInput: 'YYYY-MM-DD HH:mm:ss',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY'
};

@NgModule({
  declarations: [
    AppComponent,
    MembershipFormComponent,
    MembershipComponent,
    NotesComponent,
    ApplicantComponent,
    SignInComponent,
    SignUpComponent,
    FeedbackComponent,
    PasswordComponent,
    ProfileComponent,
    DetailsComponent,
    LinkComponent,
    NoticeComponent,
    InvoiceComponent,
    InvoiceTableComponent,
    CertiTableComponent,
    AdminNavComponent,
    AdminLandingComponent,
    AdminFeedbackComponent,
    AdreeDisagreeComponent,
    AdminMembershipCertificateComponent,
    MembershipDetailComponent,
    SuperAdminComponent,
    AdminRenewalComponent,
    AdminInvoiceComponent,
    AdminReceiptComponent,
    AccountStatementComponent,
    ReceiptTableComponent,
    PaymentComponent,
    MemberListComponent,
    DetailSByIdComponent,
    ReceiptComponent,
    MembershipFormWizardComponent,
    AddEventsComponent,
    BookedEventsComponent,
    BookEventsComponent,
    MembershipProfileComponent,
    AdminMeetingComponent,
    ExternalEventsComponent,
    EnquiriesComponent,
    DashboardComponent,
    EventsDashboardComponent,
    AdminDashboardComponent,
    AdminNewUserComponent,
    ManagerDashboardComponent,
    ManagerNavComponent,
    AppoverNavComponent,
    AppoverDashboardComponent,
    AuthenticationComponent,
    GrdFilterPipe,
    ManagerLandingComponent,
    AppoverLandingComponent,
    UserMemberslistComponent,
    GenerateInvoiceComponent,
    GenerateInvoiceViewComponent,
    // WizardComponent,
    // WizardStepComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    NgxIntlTelInputModule,
    NgxSpinnerModule,
    FormWizardModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    NgxEditorModule,
    UiSwitchModule,
    // MatPaginatorModule,
    NgxPaginationModule
  ],
  providers: [BsModalRef,
    {
      provide: LocationStrategy, 
      useClass: HashLocationStrategy
    },
    { provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_CUSTOM_FORMATS },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
