import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CaseService } from 'src/app/services/case.service';

@Component({
  selector: 'app-home-pri',
  templateUrl: './home-pri.component.html',
  styleUrls: ['./home-pri.component.css']
})
export class HomePriComponent implements OnInit {
  
  allCases: any; 
  search!: String;

  constructor(private route: Router, private cas: CaseService) { }

  ngOnInit(): void {
    this.loadCase();
  }

  loadCase(){
    const filter = (typeof this.search == 'string' && this.search.length > 0) ? `?searchBy=${this.search}` : ''
    this.cas.getAll(filter).subscribe(
      (cases) =>{
        this.allCases = cases
      },
      (error) =>{
        console.error('Error -> ', error)
      }
    )
  }
}
