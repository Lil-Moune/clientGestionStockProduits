import { Component, OnInit } from '@angular/core';
import { ProduitService } from './produit.service';
import {Produit} from '../shared/produit';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {

  produits: Produit[];
  produitForm: FormGroup;
  operation: string = 'add';
  selectedProduit: Produit;

  constructor(private produitService : ProduitService,private fb: FormBuilder) {
          this.createForm();
   }

createForm(){
  this.produitForm = this.fb.group({
    ref: ['',Validators.required],
    quantite: '',
    prixUnitaire:''
  });
}

  ngOnInit() {
    this.loadProduits();
    this.initProduit();
  }

loadProduits(){
  this.produitService.getProduits().subscribe(
    data => {this.produits = data},
    error => {console.log('An error was occured.')},
    () => {console.log('loading produits was done.')}
  );
}

addProduit(){
  const p = this.produitForm.value;
  this.produitService.addProduit(p).subscribe(
    res => {
      this.initProduit();
      this.loadProduits();
    }
  );
}

updateProduit(){
  this.produitService.updateProduit(this.selectedProduit).subscribe(
    res => {
      this.initProduit();
      this.loadProduits();
    }
  );
}

initProduit(){
  this.selectedProduit = new Produit();
    this.createForm();
}

}
