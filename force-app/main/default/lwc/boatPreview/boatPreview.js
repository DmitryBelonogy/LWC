import { LightningElement, api } from 'lwc';
import boatImgs from '@salesforce/resourceUrl/boats';

export default class BoatPreview extends LightningElement {
   @api boat;

   selectBoat() {
      this.dispatchEvent(
         new CustomEvent('selectboat', { composed: true, bubbles: true, detail: this.boat })
      );
   }

   renderedCallback() {
      let container = this.template.querySelector('.boatPreviewContainer');
      container.style.backgroundImage = `URL(${boatImgs + '/boats/' + this.boat.Picture__c})`;
      container.style.backgroundRepeat = 'no-repeat';
      container.style.backgroundSize = 'cover';
   }
}