var main = function() {
  var physiomeportal = require("./physiomeportal");
  var modelsLoader = new physiomeportal.ModelsLoader();
  modelsLoader.initialiseLoading();
  var organsViewer = new physiomeportal.OrgansViewer(modelsLoader);
  var organsViewerDialog = new physiomeportal.OrgansViewerDialog(organsViewer);
  var apinatomyPanelDialog = new (require("./apinatomy_panel").ApinatomyPanelDialog)();
  var eventNotifier =  new physiomeportal.EventNotifier();
  
  var findOrgansObjectsFromLyphName = function(name) {
    var foundObjects = organsViewer.findObjectsByGroupName(name);
    if (foundObjects.length == 0) {
      var layer = apinatomyPanelDialog.getLyphLayerFromLyphName(name);
      if (layer && layer.name)
        return organsViewer.findObjectsByGroupName(layer.name);
    }
    return foundObjects;
  }
  
  var selectionCallback = function() {
    return function(event) {
      if (event.eventType === require("./physiomeportal").EVENT_TYPE.SELECTED) {
        if (event.identifiers.length > 0) {
          var objects = findOrgansObjectsFromLyphName(event.identifiers[0]);
          if (organsViewer.setSelectedByObjects(objects, false))
            organsViewer.alignCameraWithSelectedObject(1000);
          apinatomyPanelDialog.setSelectedByGroupName(event.identifiers[0]);
        } else {
          organsViewer.setSelectedByObjects([], false);
          apinatomyPanelDialog.setSelectedByGroupName(undefined);
        }
      }
      if (event.eventType === require("./physiomeportal").EVENT_TYPE.HIGHLIGHTED) {
        if (event.identifiers.length > 0) {
          var objects = findOrgansObjectsFromLyphName(event.identifiers[0]);
          organsViewer.setHighlightedByObjects(objects, false);
          apinatomyPanelDialog.setHighlightedByGroupName(event.identifiers[0]);
        } else {
          organsViewer.setHighlightedByObjects([], false);
          apinatomyPanelDialog.setHighlightedByGroupName(undefined);
        }
      }
    }
  }
  
  organsViewer.addNotifier(eventNotifier);
  apinatomyPanelDialog.addNotifier(eventNotifier);
  eventNotifier.suscribe(this, selectionCallback());
  
  apinatomyPanelDialog.setWidth("50%");
  apinatomyPanelDialog.setHeight("100%");
  apinatomyPanelDialog.setLeft("0px");
  apinatomyPanelDialog.setTop("0px");
  organsViewer.loadOrgans("human", "Cardiovascular", "ScaffoldHeart");
  organsViewerDialog.setWidth("50%");
  organsViewerDialog.setHeight("100%");
  organsViewerDialog.setLeft("50%");
  organsViewerDialog.setTop("0px");
};

window.document.addEventListener('DOMContentLoaded', main);
