var myModules = angular.module("myModule", []);

myModules.controller("myController", function ($scope, $http) {

    // $scope.names = ["Automotive", "Business Support & Supplies", "Computers & Electronics", "Cosmetics", "Education", "Entertainment", "Food & Dining", "Health & Medicine", "Home & Garden", "Manufacturing, Wholesale,Distributionl", "Merchants (Retail)", "Miscellaneous", "Personal Care & Services ", "Real Estate", "Travel & Transportation"];

    // fetch all pitcher card
    $scope.jsonAry = [];
    $scope.doShowAll = function () {
        var url = "/angular-find-all-pitchers?category=" + $scope.selcategoryObj.category + "&revenue=" + $scope.selRev + "&gross=" + $scope.selGross;
        $http.get(url).then(pass, fail);
        function pass(resp) {
            //alert( JSON.stringify(responseKuch.data));
            $scope.jsonAry = resp.data;
        }
        function fail(resp) {
            alert(resp.data);
        }
    }

     // fetch category
     $scope.arr = [];
     $scope.fetchcategory = function () {
         var url = "/fetch-category";
         $http.get(url).then(pass, fail);
         function pass(resp) {
             $scope.categoryAry = resp.data;
         }
         function fail(resp) {
             alert(resp.data);
         }
     }
     $scope.docategory = function () {
         // alert($scope.selCityObj.city);
     }
     
    //  show module
     $scope.doShow=function(index)
     {
         $scope.obj=$scope.jsonAry[index];
     }

    //  fetch city
    //  $scope.arr = [];
    //  $scope.fetchgross = function () {
    //      var url = "/fetch-gross";
    //      $http.get(url).then(pass, fail);
    //      function pass(resp) {
    //          $scope.grossAry = resp.data;
    //      }
    //      function fail(resp) {
    //          alert(resp.data);
    //      }
    //  }
    //  $scope.dogross = function () {
    //      alert($scope.selCityObj.city);
    //  }

      // fetch revenue
    //   $scope.arr = [];
    //   $scope.fetchrevenue = function () {
    //       var url = "/fetch-revenue";
    //       $http.get(url).then(pass, fail);
    //       function pass(resp) {
    //           $scope.revenueAry = resp.data;
    //       }
    //       function fail(resp) {
    //           alert(resp.data);
    //       }
    //   }
    //   $scope.dorevenue = function () {
    //       alert($scope.selCityObj.city);
    //   }
 
});