import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SlaRoutingModule } from "./sla-routing.module";
import { AdminLayoutComponent } from "../layouts/admin-layout/admin-layout.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GenerateMvcComponent } from './generate-mvc/generate-mvc.component';
import {MatStepperModule} from '@angular/material/stepper';
import { FingerprintModalComponent } from './generate-mvc/fingerprint-modal/fingerprint-modal.component';
import { ComponentsModule } from '../components/components.module';
import { VerifyFingerprintComponent } from './generate-mvc/verify-fingerprint/verify-fingerprint.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { telFilter } from '../_pipes/tel.pip';
import { SearchMemberComponent } from './generate-mvc/search-member/search-member.component';
import { SelectDependentComponent } from './generate-mvc/select-dependent/select-dependent.component';
import { PreviewMemberDetailsComponent } from './generate-mvc/preview-member-details/preview-member-details.component';
import { AuthenticationFormComponent } from './generate-mvc/authentication-form/authentication-form.component';
import { ConfirmMvcGenerationComponent } from './generate-mvc/confirm-mvc-generation/confirm-mvc-generation.component';

//Maerial modules
const matModules = [
  MatStepperModule,
]
@NgModule({
  declarations: [
    AdminLayoutComponent,
    FingerprintModalComponent,
    DashboardComponent,
    GenerateMvcComponent,
    telFilter,
    VerifyFingerprintComponent,
    SearchMemberComponent,
    SelectDependentComponent,
    PreviewMemberDetailsComponent,
    AuthenticationFormComponent,
    ConfirmMvcGenerationComponent
  ],
  imports: [CommonModule, FormsModule,NgSelectModule, SlaRoutingModule, ComponentsModule, ReactiveFormsModule, matModules]
})
export class SlaModule {}
