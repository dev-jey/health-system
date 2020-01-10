import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ServiceProviderService } from 'src/app/_services/ServiceProvider/service-provider.service';
import { AlertService } from 'src/app/_services/shared/alert.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import * as moment from 'moment';
import { FileService } from 'src/app/_services/shared/file.service';


@Component({
  selector: 'app-claim-preauth-layout',
  templateUrl: './claim-preauth-create-layout.component.html',
  styleUrls: ['./claim-preauth-create-layout.component.scss']
})
export class ClaimPreauthCreateLayoutComponent implements OnInit {
  memberData: any = {};
  loading: boolean;
  _type: String = 'create-preauth';
  admissionDate: any;
  dischargeDate: any;
  lengthOfStay: string;
  treatmentDate: any;
  minDate = new Date();
  consultationAmount: number = 0;
  serviceAmount: number = 0;
  prescriptionAmount: number = 0;
  isLinear: boolean = false;
  investigations: Array<any> = [];
  consultations: any = [];
  diagnosis: any = [];
  services: any = [];
  preauthPayload: any = {};
  prescriptions: any = [];
  grandTotal: any = 0;
  outpatientForm: FormGroup;
  admittedForm: FormGroup;
  nhif_rebate: any = null;
  consultationFile: any = {};
  serviceFile: any = {};
  prescriptionFile: any = {};
  invoiceFile: any = {};
  docFile: any = {}
  consultationSubTotal: number = 0;
  serviceSubTotal: number = 0;
  prescriptionSubTotal: number = 0;
  creatingOrEditing: boolean;
  editing: boolean;
  viewing: boolean;
  memberHistory: Array<any> = [];

  constructor(
    private serviceProvider: ServiceProviderService,
    private alert: AlertService,
    private router: Router,
    private ref: ChangeDetectorRef,
    public fileService: FileService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.getPreauthClaimDetails().then(() => {
      this.fetchInvestigations();
      this.initForms();
      this.getHistory();
      if (this._type.startsWith('create')) {
        this.creatingOrEditing = true;
        this.ref.detectChanges()
      }
      if (this._type.startsWith('create-edit')) {
        this.editing = true;
        this.ref.detectChanges()
      }
      if (this._type.startsWith('view')) {
        this.viewing = true;
        this.ref.detectChanges()
      }
    })
    const uploadInitialText = 'File Upload';
    this.consultationFile.filename = uploadInitialText;
    this.invoiceFile.filename = uploadInitialText;
    this.serviceFile.filename = uploadInitialText;
    this.prescriptionFile.filename = uploadInitialText;
    this.docFile.filename = uploadInitialText;
    console.log(this.memberData)
  }

  /**
   * 
   * Get member history
   */
  getHistory() {
    console.log(this.memberData)
    const user = JSON.parse(localStorage.getItem("mediclaimUser"))
    const payload = {
      member_no: this.memberData.user.bls_member.member_id,
      scheme_id: 1,
      user_id: user.userId
    }
    this.serviceProvider.getMemberHistory(payload).subscribe((data) => {
      this.memberHistory = data;
    })
  }

  /**
   * Set current mode to display based on visited url
   */
  setCurrentModeViaUrl(urlArray) {
    const mvc = urlArray[urlArray.length - 1];
    const action = urlArray[4];
    const _model = urlArray[5];
    switch (action) {
      case 'edit':
        if (_model === 'preauth') this._type = 'create-edit-preauth';
        if (_model === 'claim') this._type = 'create-edit-claim';
        break;
      case 'view':
        if (_model === 'preauth') this._type = 'view-preauth';
        if (_model === 'claim') this._type = 'view-claim';
        break;
      case 'create':
        if (_model === 'preauth') this._type = 'create-preauth';
        if (_model === 'claim') this._type = 'create-claim';
        break;
      default:
        break;
    }
    return mvc;
  }


  /**
   * Fetch current preauth details
   */
  getPreauthClaimDetails = () => {
    return new Promise<Boolean>((resolve) => {
      const urlArray = window.location.href.split("/");
      const mvc = this.setCurrentModeViaUrl(urlArray)
      this.loading = true;
      this.serviceProvider.getPreauthDetails(mvc).subscribe((data) => {
        this.memberData = data;
        if (this.memberData.admission_date) {
          this.admissionDate = moment(this.memberData.admission_date).format('DD/MM/YYYY');
        }
        if (this.memberData.discharge_date) {
          this.dischargeDate = moment(this.memberData.discharge_date).format('DD/MM/YYYY');
        }
        if (this.memberData.treatment_date) {
          this.treatmentDate = moment(this.memberData.treatment_date).format("DD/MM/YYYY");
        }
        this.lengthOfStay = String(moment(this.memberData.discharge_date).diff(moment(this.memberData.admission_date)) / 86400000);
        this.loading = false;
        resolve();
      }, (error) => {
        this.loading = false;
        resolve();
      })
    })
  }

  initForms() {
    this.admittedForm = this.fb.group({
      admission_date: [this.memberData.admission_date ? new Date(this.memberData.admission_date) : null, Validators.required],
      discharge_date: [this.memberData.discharge_date ? new Date(this.memberData.discharge_date) : null, Validators.required],
      nhif_no: [this.memberData.nhif_no],
      discharge: [null]
    });
    this.outpatientForm = this.fb.group({
      treatment_date: [this.memberData.treatment_date ? new Date(this.memberData.treatment_date) : null, Validators.required],
      invoice_no: [this.memberData.invoice_no],
      file: [this.memberData.file && this.memberData.file.filename]
    });
  }


  setFinalDataItems(data) {
    const { consultations, diagnosis, services, prescriptions, nhif_rebate } = data;
    if (consultations) {
      this.consultations = consultations;
      this.consultationSubTotal = 0;
      this.consultations.forEach(consultation => {
        console.log(consultation)
        this.consultationSubTotal += consultation.amount;
      });
    }
    if (diagnosis) this.diagnosis = diagnosis;
    if (services) {
      this.services = services;
      this.serviceSubTotal = 0;
      this.services.forEach(service => {
        this.serviceSubTotal += service.amount;
      });
    }
    if (prescriptions) {
      this.prescriptions = prescriptions;
      this.prescriptionSubTotal = 0;
      this.prescriptions.forEach(prescription => {
        this.prescriptionSubTotal += prescription.amount;
      });
    }
    if (nhif_rebate) this.nhif_rebate = nhif_rebate;
  }

  /**
   * Validate entered fields
   */
  validateDataFields(): Boolean {
    const { admission_date, discharge_date, nhif_no, discharge } = this.admittedForm.value;
    const { file, treatment_date, invoice_no } = this.outpatientForm.value;
    if (this.memberData.department && this.memberData.department.name.toLowerCase() === 'maternity' ||
      this.memberData.department && this.memberData.department.name.toLowerCase() === 'inpatient' ||
      this.memberData.department && this.memberData.department.name.toLowerCase() === 'inpatient follow-up') {
      if (!admission_date || !discharge_date) {
        this.alert.fire('Attention', 'Kindly enter admission date and discharge date to continue', 'info');
        return false;
      } else {
        if (nhif_no) this.preauthPayload.nhif_no = nhif_no;
        if (discharge) this.preauthPayload.discharge = discharge; else delete this.preauthPayload['discharge'];
        this.preauthPayload = {
          ...this.preauthPayload,
          admission_date,
          discharge_date
        }
        return true;
      }
    } else {
      if (!treatment_date) {
        this.alert.fire('Attention', 'Kindly enter a treatment date to continue', 'info');
        return false;
      } else {
        if (file) this.preauthPayload.file = this.invoiceFile;
        if (invoice_no) this.preauthPayload.invoice_no = invoice_no;
        this.preauthPayload = {
          ...this.preauthPayload,
          treatment_date: treatment_date
        }
        return true;
      }
    }
  }


  /**
   * Get final submission data helper
   */
  getSubmissionData() {
    if (this.nhif_rebate) this.preauthPayload.nhif_rebate = this.nhif_rebate;
    return {
      ...this.preauthPayload,
      mcc_id: String(this.memberData.id),
      total: this.grandTotal,
    }
  }

  /**
   * Save Preauth after all details are entered
   */
  async savePreauth() {
    if (!this.validateDataFields()) return;
    if (this.diagnosis.length === 0) {
      this.alert.fire('Attention', 'Kindly enter diagnosis details to proceed', 'info');
      return;
    }
    const payload = this.getSubmissionData();
    this.serviceProvider.createPreauth(payload).subscribe(data => {
      if (data.error) {
        this.alert.fire('Error', data.error, 'error')
      } else {
        this.savePreauthAndClaimDetails().then(() => {
          const message = `
        Preauth number ${data.id} for MVC number ${payload.mcc_id}
        Amounting to ${payload.total} has been sent on 
        ${moment(data.created_at).format("DD/MM/YYYY")} at ${moment(data.created_at).format("h:mma")}
        `
          this.alert.fire('Success', message, 'success').then(() => { this.router.navigateByUrl("/sla/mvc/list") });
        }).catch(() => {
          this.alert.fire('Error', 'An error occured while processing the request', 'error');
        })
      }
    })

  }

  /**
   * Save Claim
   */
  saveClaim() {
    if (!this.validateDataFields()) return;
    if (this.diagnosis.length === 0) {
      this.alert.fire('Attention', 'Kindly enter diagnosis details to proceed', 'info');
      return;
    }
    const payload = this.getSubmissionData();
    this.serviceProvider.createClaim(payload).subscribe(async data => {
      if (data.error) {
        this.alert.fire('Error', data.error, 'error')
      } else {
        this.savePreauthAndClaimDetails().then(() => {
          const message = `
        Claim number ${data.id} for MVC number ${payload.mcc_id}
        Amounting to ${payload.total} has been sent on 
        ${moment(data.created_at).format("DD/MM/YYYY")} at ${moment(data.created_at).format("h:mma")}
        `
          this.alert.fire('Success', message, 'success').then(() => { this.router.navigateByUrl("/sla/mvc/list") });
        }).catch(() => {
          this.alert.fire('Error', 'An error occured while processing the request', 'error');
        });
      }
    })

  }

  /**
   * Edit Preauth
   */

  editPreauth() {
    if (!this.validateDataFields()) return;
    if (this.diagnosis.length === 0) {
      this.alert.fire('Attention', 'Kindly enter diagnosis details to proceed', 'info');
      return;
    }
    const payload = this.getSubmissionData();
    this.serviceProvider.editPreauth(payload.mcc_id, payload).subscribe(async data => {
      if (data.error) {
        this.alert.fire('Error', data.error, 'error')
      } else {
        this.savePreauthAndClaimDetails().then(() => {
          const message = `
        Preauth number ${data.id} for MVC number ${payload.mcc_id}
        Amounting to ${payload.total} has been sent on 
        ${moment(data.created_at).format("DD/MM/YYYY")} at ${moment(data.created_at).format("h:mma")}
        `
          this.alert.fire('Success', message, 'success');
        }).catch(() => {
          this.alert.fire('Error', 'An error occured while processing the request', 'error');
        })
      }
    })
  }

  /**
   * Edit Claim
   */

  editClaim() {
    if (!this.validateDataFields()) return;
    if (this.diagnosis.length === 0) {
      this.alert.fire('Attention', 'Kindly enter diagnosis details to proceed', 'info');
      return;
    }
    const payload = this.getSubmissionData();
    this.serviceProvider.editClaim(payload.mcc_id, payload).subscribe(async data => {
      if (data.error) {
        this.alert.fire('Error', data.error, 'error')
      } else {
        this.savePreauthAndClaimDetails().then(() => {
          const message = `
        Claim number ${data.id} for MVC number ${payload.mcc_id}
        Amounting to ${payload.total} has been sent on 
        ${moment(data.created_at).format("DD/MM/YYYY")} at ${moment(data.created_at).format("h:mma")}
        `
          this.alert.fire('Success', message, 'success');
        }).catch(() => {
          this.alert.fire('Error', 'An error occured while processing the request', 'error');
        });

      }
    })

  }


  /**
   * Save details of the prescription, consultation, diagnosis and services
   */
  savePreauthAndClaimDetails() {
    return Promise.all([new Promise((resolve, reject) => {
      // Save consultations if present
      if (this.consultations.length > 0) {
        this.consultations.forEach(consultation => {
          this.serviceProvider.addConsultation(consultation).subscribe((data) => {
            resolve();
          }, error => {
            reject(error);
          });
        })
      }
    }),
    new Promise((resolve, reject) => {
      //Save Diagnosis data
      this.diagnosis.forEach(diagnosis => {
        this.serviceProvider.addDiagnosis(diagnosis).subscribe((data) => {
          resolve();
        }, error => {
          reject(error);
        });
      })
    }),
    new Promise((resolve, reject) => {
      // Save services if present
      if (this.services.length > 0) {
        this.services.forEach(service => {
          this.serviceProvider.addInvestigation(service).subscribe((data) => {
            resolve();
          }, error => {
            reject(error);
          });
        })
      }
    }),
    new Promise((resolve, reject) => {
      // Save prescriptions if present
      if (this.prescriptions.length > 0) {
        this.prescriptions.forEach(presc => {
          this.serviceProvider.addPrescription(presc).subscribe((data) => {
            resolve();
          }, error => {
            reject(error);
          });
        })
      }
    })])
  }

  /**
   *  Get all investigations from database
   */
  fetchInvestigations() {
    this.loading = true;
    this.serviceProvider.getInvestigations().subscribe((data) => {
      this.loading = false;
      this.investigations = data;
    }, error => {
      this.loading = false;
    })
  }

  /**
   * 
   * Calculate totals helper function
   */

  calculateSubTotals(form) {
    let { units, unit_price } = form.value;
    if (!units) units = 0;
    if (!unit_price) unit_price = 0;
    return parseInt(units) * parseFloat(unit_price);
  }

  /**
   * Calculate total amount for individual steps and the grand total
   */
  calculateAmount(value) {
    const { consultationForm, serviceForm, prescriptionForm } = value;
    if (consultationForm) {
      this.consultationAmount = this.calculateSubTotals(consultationForm);
    }
    if (serviceForm) {
      this.serviceAmount = this.calculateSubTotals(serviceForm)
    }
    if (prescriptionForm) {
      this.prescriptionAmount = this.calculateSubTotals(prescriptionForm)
    }
    this.grandTotal = this.consultationSubTotal + this.consultationAmount
      + this.serviceAmount + this.serviceSubTotal
      + this.prescriptionAmount + this.prescriptionSubTotal;
  }

  /**
   * Deduct total on delete item
   */
  deductSubTotalAmount(data) {
    const { index, _type } = data;
    switch (_type) {
      case 'consultation':
        this.consultations.forEach(consultation => {
          if (this.consultations.indexOf(consultation) === index) {
            this.consultationSubTotal -= consultation.amount;
            this.grandTotal -= consultation.amount;
          }
        })
        break;
      case 'service':
        this.services.forEach(service => {
          if (this.services.indexOf(service) === index) {
            this.serviceSubTotal -= service.amount;
            this.grandTotal -= service.amount;
          }
        })
        break;

      case 'prescription':
        this.prescriptions.forEach(prescription => {
          if (this.prescriptions.indexOf(prescription) === index) {
            this.prescriptionSubTotal -= prescription.amount;
            this.grandTotal -= prescription.amount;
          }
        })
        break;

      default:
        break;
    }
  }

  /**
   * Remove a specific item index from an array
   */
  deleteItem(data) {
    const { index, array } = data;
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  /**
   * Convert image to base64
   */
  convertFileToBase64(event: any): void {
    if (typeof event === 'string') {
      const fileUpload = { filename: 'File Upload' }
      switch (event) {
        case 'consultation':
          this.consultationFile = fileUpload
          break;

        case 'service':
          this.serviceFile = fileUpload
          break;
        case 'prescription':
          this.prescriptionFile = fileUpload
          break;

        default:
          break;
      }
      return;
    }
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.setRequestFiles(event.target.name, file, reader);
      };
    }
  }

  /**
   * File structure for file uploads to API
   */
  setFileStructure(file, reader) {
    return {
      filename: file.name,
      filetype: file.type,
      base64: (<string>reader.result).split(',')[1],
      filesize: file.size
    }
  }


  /**
   * Set files based on request
   */
  setRequestFiles(name, file, reader) {
    switch (name) {
      case 'consultationFile':
        this.consultationFile = this.setFileStructure(file, reader);
        break;
      case 'serviceFile':
        this.serviceFile = this.setFileStructure(file, reader);
        break;
      case 'prescriptionFile':
        this.prescriptionFile = this.setFileStructure(file, reader);
        break;
      case 'invoiceFile':
        this.invoiceFile = this.setFileStructure(file, reader);
        break;
      case 'docFile':
        this.docFile = this.setFileStructure(file, reader);
      default:
        break;
    }
  }

}
