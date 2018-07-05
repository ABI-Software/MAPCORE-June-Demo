require('./styles/apinatomy_layout.css');
require('./styles/w3.css');
var Apinatomy = require("./api_testing");
//var Apinatomy = require("./open-physiology-viewer");

var ApinatomyPanelDialog = function() {
  (require('./physiomeportal').BaseDialog).call(this);
  
  var dataService = undefined;
  var graphData = undefined;
  var module = undefined;
  var component = undefined;
  var selectedSceneObject = undefined;
  var organsViewer = undefined;
  var eventNotifiers = [];
  var _myInstance = this;

  var nameToIndex = {"Post_Surface" : 56, "Ant_Surface" : 54, "Post_Inner" : 57, "Post_Top": 55};
  
  var idToName = function(id) {
    if (id == 60)
      return "Ant_Surface";
    if (id == 61)
      return "Post_Top";    
    if (id == 62)
      return "Post_Surface";    
    if (id == 63)
      return "Post_Inner";   
    return undefined;
  }

  this.setOrgansViewer = function(OrgansViewerIn) {
    organsViewer = OrgansViewerIn;
  }
  
  var lyphToSceneObject = function(lyph) {
    if (component && component.scene && component.scene.children) {
      var sceneObjects = component.scene.children;
      console.log(sceneObjects.length)
      var lyphsObjectArray = undefined;
      for (var i = 0; (i < sceneObjects.length); i++) {
        if (sceneObjects[i].type == "Group") {
          lyphsObjectArray = sceneObjects[i];
        }
      }
      if (lyphsObjectArray && lyphsObjectArray.children) {
        for (var i = 0; i < lyphsObjectArray.children.length; i++) {
          if (lyphsObjectArray.children[i].id == lyph.id) {
            return lyphsObjectArray.children[i];
          }
        }
      }
    }
      
    return undefined;
  }
  
  var selectedCallback = function(){
    return function(obj) {
      console.log(obj)
      if (obj && obj.__data && obj.__data.name) {
        var eventType = require("./physiomeportal").EVENT_TYPE.SELECTED;
        for (var i = 0; i < eventNotifiers.length; i++) {
          eventNotifiers[i].publish(_myInstance, eventType, [obj.__data.name]);
        }
      }
    }
  }
  
  var highlightedCallback = function(){
    return function(obj) {
      console.log(obj)
      if (obj && obj.__data && obj.__data.name) {
        var eventType = require("./physiomeportal").EVENT_TYPE.HIGHLIGHTED;
        for (var i = 0; i < eventNotifiers.length; i++) {
          eventNotifiers[i].publish(_myInstance, eventType, [obj.__data.name]);
        }
      }
    }
  }
  
  this.findLyphByName = function(name) {
    var found = component._graphData.lyphs.find(function(lyph) {
      return lyph.name === name;
    })
    
    return found;
  }
  
  this.getLyphLayerFromLyphName = function(name) {
    var lyph = _myInstance.findLyphByName(name);
    if (lyph)
      return lyph.layerInLyph;
    return lyph;
  }
  
  this.setSelectedByGroupName = function(name) {
    if (name) {
      var obj = _myInstance.findLyphByName(name);
      console.log(obj);
      console.log(obj.layerInLyph);
      if (obj && obj.viewObjects) {
        if (component.selected != obj.viewObjects.main)
          component.selected = obj.viewObjects.main;
      } else
        component.selected = undefined;
    } else {
      component.selected = undefined;
    }
  }
  
  this.setHighlightedByGroupName = function(name) {
    if (name) {
      var obj = _myInstance.findLyphByName(name);
      if (obj && obj.viewObjects) {
        if (component.highlighted != obj.viewObjects.main)
          component.highlighted = obj.viewObjects.main;
      } else
        component.highlighted = undefined;
    } else {
      component.highlighted = undefined;
    }
  }
  
  this.addNotifier = function(eventNotifier) {
    eventNotifiers.push(eventNotifier);
  }
  
  var loadApinatomyComplete = function() {
    if (window.lyphViewerScene === undefined)
      setTimeout(function(){loadApinatomyComplete()}, 5000);
    else {
      component = window.lyphViewerScene.component;
      graphData = component._graphData;
      //left 48, right 50

      component.selectedCallback = selectedCallback();
      component.highlightedCallback = highlightedCallback();
    }
  }
  
  var initialiseApinatomyPanel = function() {
  //  dataService = new Apinatomy.DataService();
  //  dataService.init();
    //var graphData = dataService.graphData;
  //  var componentElement = _myInstance.container[0].getElementsByTagName("webGLScene")[0];
  //  componentElement._graphData = dataService.graphData;
  //  console.log(componentElement);
    

  //  global["Apinatomy"] = Apinatomy;    //sceneComponent = new Apinatomy.WebGLSceneComponent();
    //sceneComponent.graphData = dataService.graphData;
  //  module = Apinatomy.WebGLSceneModule;
  //  console.log(Apinatomy.platformBrowserDynamic().bootstrapModule(module));
    Apinatomy.platformBrowserDynamic().bootstrapModule(Apinatomy.TestAppModule);
    loadApinatomyComplete();
  }

  var initialise = function() {
    _myInstance.create(require("./snippets/apinatomyPanel.html"));
    initialiseApinatomyPanel();
  }
  
  initialise();
}

ApinatomyPanelDialog.prototype = Object.create((require('./physiomeportal').BaseDialog).prototype);
exports.ApinatomyPanelDialog = ApinatomyPanelDialog;

