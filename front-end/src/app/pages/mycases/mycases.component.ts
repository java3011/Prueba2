import { Component, OnInit } from '@angular/core';
import { Cases } from 'src/app/interfaces/cases';
import { CaseService } from 'src/app/services/case.service';

@Component({
  selector: 'app-mycases',
  templateUrl: './mycases.component.html',
  styleUrls: ['./mycases.component.css']
})
export class MycasesComponent implements OnInit {
  listaCases= new Array<Cases>();

  constructor(private http:CaseService ) { }

  ngOnInit(): void {
    this.http.getCase().subscribe(datos =>{
      // console.log(datos);
      for(let i=0;i<datos.length;i++){
        this.listaCases.push(datos[i])
      }
    });

  }
}
