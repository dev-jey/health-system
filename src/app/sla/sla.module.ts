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
import { ClaimPreauthLayoutComponent } from './claim-preauth-layout/claim-preauth-layout.component';
import { CreateClaimComponent } from './create-claim/create-claim.component';
import { CreatePreauthComponent } from './create-preauth/create-preauth.component';
@NgModule({
  declarations: [
    FingerprintModalComponent,
    DashboardComponent,
    GenerateMvcComponent,
    telFilter,
    calculateAge,
    VerifyFingerprintComponent,
    SearchMemberComponent,
    SelectDependentComponent,
    PreviewMemberDetailsComponent,
    AuthenticationFormComponent,
    ConfirmMvcGenerationComponent,
    MvcListComponent,
    MvcTableComponent,
    ClaimPreauthLayoutComponent,
    CreateClaimComponent,
    CreatePreauthComponent,
  ],
  imports: [CommonModule, NgSelectModule, SlaRoutingModule, ComponentsModule, MaterialModule]
})
export class SlaModule { }
