import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SlaRoutingModule } from "./sla-routing.module";
import { GenerateMvcComponent } from './generate-mvc/generate-mvc.component';
import { FingerprintModalComponent } from './generate-mvc/fingerprint-modal/fingerprint-modal.component';
import { ComponentsModule } from '../components/components.module';
import { VerifyFingerprintComponent } from './generate-mvc/verify-fingerprint/verify-fingerprint.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { telFilter } from '../_pipes/tel.pip';
import {calculateAge} from '../_pipes/ageCalculator.pip';
import { SearchMemberComponent } from './generate-mvc/search-member/search-member.component';
import { SelectDependentComponent } from './generate-mvc/select-dependent/select-dependent.component';
import { PreviewMemberDetailsComponent } from './generate-mvc/preview-member-details/preview-member-details.component';
import { AuthenticationFormComponent } from './generate-mvc/authentication-form/authentication-form.component';
import { ConfirmMvcGenerationComponent } from './generate-mvc/confirm-mvc-generation/confirm-mvc-generation.component';
import { MvcListComponent } from './mvc-list/mvc-list.component';
import { MaterialModule } from '../modules/material/material.module';
import { MvcTableComponent } from './mvc-list/mvc-table/mvc-table.component';
import { ClaimPreauthCreateLayoutComponent } from './claim-preauth-create-layout/claim-preauth-create-layout.component';
import { ConsultationsComponent } from './claim-preauth-create-layout/consultations/consultations.component';
import { DiagnosisComponent } from './claim-preauth-create-layout/diagnosis/diagnosis.component';
import { ServiceComponent } from './claim-preauth-create-layout/service/service.component';
import { PrescriptionsComponent } from './claim-preauth-create-layout/prescriptions/prescriptions.component';
import { SupportingDocumentsComponent } from './claim-preauth-create-layout/supporting-documents/supporting-documents.component';
import { NhifRebateComponent } from './claim-preauth-create-layout/nhif-rebate/nhif-rebate.component';
import { ClaimPreauthListLayoutComponent } from './claim-preauth-list-layout/claim-preauth-list-layout.component';
import { ClaimPreauthTableComponent } from './claim-preauth-list-layout/claim-preauth-table/claim-preauth-table.component';
import { SchemeRulesComponent } from './scheme-rules/scheme-rules.component';
import { ContractsComponent } from './contracts/contracts.component';
import { BreakdownDialogComponent } from './dashboard/breakdown-dialog/breakdown-dialog.component';
import { GraphsLayoutComponent } from './dashboard/graphs-layout/graphs-layout.component';
import { UidLockPipe } from '../_pipes/uid-lock.pipe';
import { PreauthLockPipe } from '../_pipes/preauth/preauth-lock.pipe';
import { PreauthUnlockPipe } from '../_pipes/preauth/preauth-unlock.pipe';
import { HospitalConfigsPipe } from '../_pipes/hospital-configs.pipe';
import { ClaimLockPipe } from '../_pipes/claim/claim-lock.pipe';
import { ClaimUnlockPipe } from '../_pipes/claim/claim-unlock.pipe';
import { CalculateSubtotalPipe } from '../_pipes/calculate-subtotal.pipe';

@NgModule({
  entryComponents:[BreakdownDialogComponent],
  declarations: [
    FingerprintModalComponent,
    DashboardComponent,
    GenerateMvcComponent,
    telFilter,
    UidLockPipe,
    PreauthLockPipe,
    PreauthUnlockPipe,
    ClaimLockPipe,
    ClaimUnlockPipe,
    HospitalConfigsPipe,
    CalculateSubtotalPipe,
    calculateAge,
    VerifyFingerprintComponent,
    SearchMemberComponent,
    SelectDependentComponent,
    PreviewMemberDetailsComponent,
    AuthenticationFormComponent,
    ConfirmMvcGenerationComponent,
    MvcListComponent,
    MvcTableComponent,
    ClaimPreauthCreateLayoutComponent,
    ConsultationsComponent,
    DiagnosisComponent,
    ServiceComponent,
    PrescriptionsComponent,
    SupportingDocumentsComponent,
    NhifRebateComponent,
    ClaimPreauthListLayoutComponent,
    ClaimPreauthTableComponent,
    SchemeRulesComponent,
    ContractsComponent,
    BreakdownDialogComponent,
    GraphsLayoutComponent,
  ],
  imports: [CommonModule, NgSelectModule, SlaRoutingModule, ComponentsModule, MaterialModule],
  providers: [telFilter]
})
export class SlaModule { }
