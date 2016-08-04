var ngLamesa = {

// Creates a lamesa model object
model: function (rows, proj) {

  var model = this;

  // Data Rows & Projections
  model.data = {
    rows: [],
    proj: []
  };

  // Set Data Rows & Projections if passed in constructor
  if(rows !== undefined && proj !== undefined) {
    model.data.rows = rows;
    model.data.proj = proj;
  }

  // Binds an array object to the data storage
  model.setData = function setData(arrData, arrProj) {
    model.data.rows = arrData;
    // Set Projection is provided
    if(arrProj !== undefined) {
      model.data.proj = arrProj;
    }
    // Apply filter
    if(model.data.rows !== undefined && model.data.proj !== undefined) {
      model.data.rows = model.applyFilter(model.data.rows, model.data.proj);
    }
  };

  // Sets Projection
  model.setProjection = function setProjection(arrProj) {
    model.data.proj = arrProj;
  }

  // Binds model to the parent controller
  model.bindToController = function bindToController(controller, name) {
    controller[name] = model.data;
  }

  // Applys filter to the data
  model.applyFilter = function applyFilter(arrData, arrProj) {

    var findFilter = function findFilter(proj) {
      return typeof(proj.filter) === 'function';
    }

    // Check if at least on of the field has filter
    if(arrProj.find(findFilter) !== 'undefined') {

      var filters = [];

      for(var j = 0; j < arrProj.length; j++) {
        // Found a valid Filter function
        if(typeof(arrProj[j].filter) !== 'undefined') {
          filters.push(arrProj[j]);
        }
      }

      // Apply filter
      for(var i = 0; i < arrData.length; i++) {
        var row = arrData[i];
        filters.forEach(function(prop) {
          // Check if the field exists
          if(row[prop.field] !== undefined) {
            row[prop.field] = prop.filter(row[prop.field]);
          }
        });

      }

    }
    
    return arrData;

  }

},

// Adds lamesa component to an Angular app
register: function(app) {
  
  // Component avp-table
  app.component('lamesa', {
    // Bindings
    bindings: { model: '=' },

    // Transclusion is enabled
    transclude: true,

    // Controller
    controller: function() { 

    },

    // Template
    template: [
      '<ng-transclude></ng-transclude>',
      '<table>',
        '<tr>',
          '<th ng-repeat="field in $ctrl.model.proj">',
            '{{ field.description }}',
          '</th>',
        '</tr>', 
        '<tr ng-repeat="row in $ctrl.model.rows">',
          '<td ng-repeat="col in $ctrl.model.proj">',
            '{{ row[col.field] }}',
          '</td>',
        '</tr>',
      '</table>'
    ].join('')
      
  });

},

};