var app = angular.module('app', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter', 'ui.grid.pagination', 'ui.grid.grouping', 'ui.grid.moveColumns','ui.grid.edit', 'ui.grid.cellNav' ]);

app.controller('MainCtrl', ['$scope', '$http', 'uiGridConstants', 'uiGridGroupingConstants', function ($scope, $http, uiGridConstants, uiGridGroupingConstants) {
    
  $scope.gridOptions = {
    enableSorting: true,
    enableFiltering: true,
    paginationPageSizes: [25,50,75],
    paginationPageSize: 25,
    enablePaginationControls: true,
    columnDefs: [ { name: 'ID', field: 'item_id', enableCellEdit: false, menuItems: [{title: 'Grid ID',action: function() {alert('Grid ID: ' + this.grid.id);}}]},
                  { name: 'Item Name', field: 'item_name'},
                  { name: 'Price', field: 'item_price' , cellFilter: 'currency'},
                  { name: '# Sold', field: 'item_sold'},
                  { name: 'Date of Sale', field: 'item_datesold'}/*, 
                  { name: 'Total Sales', enableSorting: false, enableCellEdit: false, cellTemplate: '<div>{{row.entity.item_price * row.entity.item_sold | number: 2}}</div>'}*/],
    enableGridMenu: true,
    enableSelectAll: true,
    exporterCsvFilename: 'table_data.csv',
    exporterMenuPdf: false,
    exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),  
    
    onRegisterApi: function(gridApi){ 
      $scope.gridApi = gridApi;
    }
  };
        
  $http.get('items.json')
  .success(function (data) {
    $scope.gridOptions.data = data;
  });
}]);