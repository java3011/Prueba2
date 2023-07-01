import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TreatmentService } from 'src/app/services/treatment.service';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.css']
})
export class TreatmentComponent implements OnInit {

  treatmentForm: FormGroup;

  constructor(private fb:FormBuilder, private http:TreatmentService, private route:Router) { 
    this.treatmentForm=this.fb.group({
      treatmentInfo: ["",[Validators.maxLength(100)]],
      numberOfBeams: ["",[Validators.required]]
    });
  }

  ngOnInit(): void {}

  sendDataTreatment(){
    this.http.createTreatment(this.treatmentForm.value).subscribe(res =>{
      console.log('Treatment uploaded successfully');
      this.route.navigate(['/mycases']);
   })
  }

}