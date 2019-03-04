import { LightningElement, track, api } from 'lwc';
import boatImgs from '@salesforce/resourceUrl/boats';
import getBoatList from '@salesforce/apex/BoatComponentController.getBoatList';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Root extends LightningElement {

   @api zoomLevel;

   @track boats;
   @track boat;
   @track pictureUrl = '';
   @track boatLocation = [];

   constructor() {
      super();
      this.getBoats('');
      this.template.addEventListener('selectboat', this.handleSelectBoat.bind(this));
      this.template.addEventListener('selecttype', this.handleSelectType.bind(this));
   }

   handleSelectBoat(event) {
      this.selectedBoat(event.detail);
   }

   handleSelectType(event) {
      this.getBoats(event.detail);
   }

   // renderedCallback() {
   //    this.template.querySelectorAll('.root')[0].innerHTML = `<h1>Aloha</h1>`;
   // }

   getBoats(param) {
      getBoatList({boatType: param})
         .then(result => {
            this.boats = result;
            this.selectedBoat(this.boats[0]);
            this.showToast('Success', 'Data was goten', 'success');
         })
         .catch(error => {
            this.error = error;
            this.showToast('Error', 'Some error', 'error');
         });
   }

   selectedBoat(boat) {
      this.boat = boat;
      this.pictureUrl = boatImgs + '/boats/' + this.boat.Picture__c;
      this.boatLocation = [
               {
                  location: {
                     Street: this.boat.Street_Address__c,
                     City: this.boat.Sity__c,
                     Country: this.boat.Country__c
                  },
                  title: this.boat.Name,
                  description: this.boat.Description__c
               }
            ];
   }

   showToast(title, message, type) {
      const event = new ShowToastEvent({
          title: title,
          message: message,
          variant: type
      });
      this.dispatchEvent(event);
   }
}