public with sharing class BoatComponentController {

    @AuraEnabled
    public static List<Boat__c> getBoatList(String boatType) {
        String param = '%' + boatType + '%';
        return [SELECT Id, Name, Boat_type__c, Description__c, Picture__c, Year_build__c, Street_Address__c, Sity__c, Country__c
                FROM Boat__c
                WHERE Boat_type__c LIKE :param
                LIMIT 1000];
    }

    @AuraEnabled(cacheable=true)
    public static List<String> getPicklistvalues(){
        List<String> optionList = new List<String>();

        Map<String,Schema.SObjectType> globalDescribe = Schema.getGlobalDescribe(); 
        Map<String, Schema.SObjectField> fieldMap = globalDescribe.get('Boat__c'.toLowerCase()).getDescribe().fields.getMap();

        List<Schema.PicklistEntry> picklistValues = fieldMap.get('Boat_type__c').getDescribe().getPickListValues();

        for (Schema.PicklistEntry picklistValue : picklistValues) {
            optionList.add(picklistValue.getValue());
        }
        return optionList;
    }
}
