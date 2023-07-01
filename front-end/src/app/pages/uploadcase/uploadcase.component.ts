import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CaseService } from 'src/app/services/case.service';
import { CancerService } from 'src/app/services/cancer.service';
import { OrganService } from 'src/app/services/organ.service';
import { OrganCaseService } from 'src/app/services/organcase.service';
import { PrescriptionService } from 'src/app/services/prescription.service';
import { IndexPrescriptionService } from 'src/app/services/indexprescription.service';

@Component({
  selector: 'app-uploadcase',
  templateUrl: './uploadcase.component.html',
  styleUrls: ['./uploadcase.component.css']
})
export class UploadcaseComponent implements OnInit {

  caseForm: FormGroup;
  organForm:FormGroup;

  constructor(private fb:FormBuilder,private route:Router,public http6:IndexPrescriptionService,public http5:PrescriptionService,public http4:OrganCaseService,public http3:OrganService,public http:CaseService, private http2:CancerService) { 
    this.caseForm=this.fb.group({
      caseName: ["",[Validators.required, Validators.maxLength(100)]],
      dataCase: ["", [Validators.maxLength(100)]],
      Noncoplanar: [true,[Validators.required]],
      cancerName: ["",[Validators.required, Validators.maxLength(60)]],
      cancerDescription: ["",[Validators.maxLength(200)]]
    });
    this.organForm=this.fb.group({
      organName: ["",[Validators.required]],
      organType: ["",[Validators.required]],
      Volume: ["",[Validators.required]],
      numberOfVoxels: ["",[Validators.required]],
      minPrescribedDose: ["",[Validators.required]],
      maxPrescribedDose: ["",[Validators.required]],
      indexName: ["",[Validators.required]],
    })
  }

  ngOnInit(): void {}

  get f(){
    return this.caseForm.controls;
  }
  get fo(){
    return this.organForm.controls;
  }

  sendDataCase(){
    this.http.createCase(this.caseForm.value).subscribe(res =>{
      console.log('Case uploaded successfully');
      this.route.navigate(['/mycases']);
    })
    this.http2.createCancer(this.caseForm.value)
  };

  sendDataOrgan(){
    this.http3.createOrgan(this.organForm.value).subscribe(res =>{
      console.log('Organ Added Successfully');
      this.route.navigate(['/uploadcase']);
    })
    this.http4.createOrganCase(this.organForm.value);
    this.http5.createPrescription(this.organForm.value);
    this.http6.createIndexPrescription(this.organForm.value);

  };

}