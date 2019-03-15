import {Resolve} from '@angular/router';
import {ProduitService} from './produit.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ProduitResolver implements Resolve<any>{

  constructor(private produitService: ProduitService){

  }
  resolve() {
    return this.produitService.getProduits();
  }

}
