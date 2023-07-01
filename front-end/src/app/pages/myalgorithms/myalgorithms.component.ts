import { Component, OnInit } from '@angular/core';
import { Alg } from 'src/app/interfaces/alg';
import { AlgService } from 'src/app/services/alg.service';

@Component({
  selector: 'app-myalgorithms',
  templateUrl: './myalgorithms.component.html',
  styleUrls: ['./myalgorithms.component.css']
})
export class MyalgorithmsComponent implements OnInit {
  listaAlgorithm= new Array<Alg>();

  constructor(private http:AlgService) { }

  ngOnInit(): void {
    this.http.getAlg().subscribe(datos =>{
      console.log(datos);
      for(let i=0;i<datos.length;i++){
        this.listaAlgorithm.push(datos[i])
      }
    });
  }

}