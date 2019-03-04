import { LightningElement, api } from 'lwc';

export default class BoatLocation extends LightningElement {
   @api location;
   @api zoomLevel;
}