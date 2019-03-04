import { LightningElement, track } from 'lwc';
import getPicklistvalues from '@salesforce/apex/BoatComponentController.getPicklistvalues';

export default class SearchBar extends LightningElement {
   @track value = '';
   @track options = [];

   //run code after connecting component
   connectedCallback() {
      getPicklistvalues()
         .then(result => {
            let options = [];
            options.push({label: 'All', value: ''})
            result.forEach(element => {
               let option = {};
               option.label = element;
               option.value = element;
               options.push(option);
            });
            this.options = options;
         })
         .catch(error => {
            this.error = error;
         });
   }

   handleChange(event) {
      this.value = event.detail.value;
      this.dispatchEvent(
         new CustomEvent('selecttype', { composed: true, bubbles: true, detail: this.value })
      );
   }
}