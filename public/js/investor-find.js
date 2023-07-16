var myModules = angular.module("myModule", []);
myModules.controller("myController", function ($scope, $http) {
    // $scope.names = ["Automotive", "Business Support & Supplies", "Computers & Electronics", "Cosmetics", "Education", "Entertainment", "Food & Dining", "Health & Medicine", "Home & Garden", "Manufacturing, Wholesale,Distributionl", "Merchants (Retail)", "Miscellaneous", "Personal Care & Services ", "Real Estate", "Travel & Transportation"];
    // fetch all sharks card
    $scope.jsonAry = [];
    $scope.doShowAll = function () {
        var url = "/angular-find-all-sharks?city=" + $scope.selCityObj.city + "&domain=" + $scope.selDomain + "&no=" + $scope.selNo;
        // alert(url)
        $http.get(url).then(pass, fail);

        function pass(resp) {
            //alert( JSON.stringify(responseKuch.data));
            $scope.jsonAry = resp.data;
        }
        function fail(resp) {
            alert(resp.data);
        }
    }
    // fetch city
    $scope.arr = [];
    $scope.fetchCity = function () {
        var url = "/fetch-city";
        $http.get(url).then(pass, fail);
        function pass(resp) {
            $scope.cityAry = resp.data;
        }
        function fail(resp) {
            alert(resp.data);
        }
    }
    $scope.doCity = function () {
        // alert($scope.selCityObj.city);
    }
    //show details without repeat
    $scope.doShow=function(index)
    {
        $scope.obj=$scope.jsonAry[index];
    }
});
