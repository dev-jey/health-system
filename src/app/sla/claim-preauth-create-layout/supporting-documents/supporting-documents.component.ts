import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ServiceProviderService } from 'src/app/_services/ServiceProvider/service-provider.service';
import { FileService } from 'src/app/_services/shared/file.service';


@Component({
  selector: 'app-supporting-documents',
  templateUrl: './supporting-documents.component.html',
  styleUrls: ['./supporting-documents.component.scss']
})
export class SupportingDocumentsComponent implements OnInit {
  @Output() setUpload = new EventEmitter();
  @Input() memberData;
  @Input() _type;
  @Input() docFile;
  @Output() deleteItem = new EventEmitter();
  @Output() convertFileToBase64 = new EventEmitter();
  @Input() creatingOrEditing: boolean;
  @Input() editing: boolean;
  @Input() viewing: boolean;


  docsForm: FormGroup;
  docsFormSubmitted: Boolean;
  docsFormErrors: Object = {
    required: 'Field is Required'
  };
  loading: boolean;
  memberFiles: Array<any> = [];
  deleting: boolean;

  constructor(
    private fb: FormBuilder,
    private serviceProvider: ServiceProviderService,
    public fileService: FileService
  ) { }

  ngOnInit() {
    this.memberData.files ? this.memberFiles = this.memberData.files : null;
    this.initForms()
  }

  initForms() {
    this.docsForm = this.fb.group({
      file: [null, Validators.required]
    });
  }

  /**
   * Add files to array for viewing before submission
   */
  addDocs() {
    this.docsFormSubmitted = true;
    if (this.docsForm.invalid) return;
    let payload = {
      file: this.docFile,
      mcc_id: this.memberData.id,
      name: this.docFile.filename
    }
    this.loading = true;
    this.serviceProvider.uploadFile(payload).subscribe(async () => {
      this.getMemberData().then(() => {
        this.loading = false;
        this.docsForm.value.file = null;
      });
    })
  }

  /**
   * Get member data to retrieve member files
   */
  getMemberData() {
    return new Promise((resolve) => {
      this.serviceProvider.getPreauthDetails(this.memberData.id).subscribe((info) => {
        this.memberFiles = info.files;
        resolve();
      }, error => {
        resolve()
      })
    })
  }


  /**
   * Totally remove current file from database
   */
  deleteCurrentFile(id) {
    this.deleting = true;
    this.serviceProvider.deleteFile(id).subscribe(() => {
      this.getMemberData().then(() => {
        this.deleting = false;
      });
    }, error => {
      this.getMemberData().then(() => {
        this.deleting = false;
      });
    })
  }

  /**
   * View Supporting attachment File
   */
  viewDoc(id) {
    this.serviceProvider.getFile(id).subscribe(info => {
      this.fileService.viewFile(info.file)
    })
  }

}
