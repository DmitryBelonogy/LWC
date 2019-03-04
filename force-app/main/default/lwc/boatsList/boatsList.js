import { LightningElement, track, api } from 'lwc';

export default class BoatsList extends LightningElement {
   @api boats = [];
   @track error;
}