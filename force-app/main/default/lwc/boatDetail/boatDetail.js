import { LightningElement, track, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class BoatDetail extends NavigationMixin(LightningElement) {
   @api boat;
   @track error;
   @api picture;

   navigateToPage() {
      this[NavigationMixin.Navigate]({
         type: "standard__recordPage",
         attributes: {
            recordId: this.boat.Id,
            actionName: "view"
         }
      });
   }
}