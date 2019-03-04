({
    doInit : function(component, event, helper) {
        console.log("start");
        var action = component.get("c.getBoatList");
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                // var label = response.getReturnValue();
                // component.set("v.objLabel", label);
                console.log(response.getReturnValue());
            } else if(state === "ERROR"){
                console.log('Error: ' + JSON.stringify(response.error));
            } else {
                console.log('Unknown problem, state: '+ state + ', error: ' + JSON.stringify(response.error));
            }
        });
        $A.enqueueAction(action);
    }
})
