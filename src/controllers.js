const app = angular.module('mainApp', []);

app.controller('mainCtrl', ['$scope', function($scope){

  let startTime = 0;
  let endTime = 0;
  let running = false;
  $scope.elapsedTime = 0;
  let previousElapsedTime = 0;
  let interval;

  // function to update timer
  const updateTime = () => {
    $scope.elapsedTime = previousElapsedTime + new Date().getTime() - startTime;
    $scope.$apply();
  };

  // function to start the watch
  $scope.start = () => {
    if (running) {
      return;
    } else {
      interval = setInterval(updateTime, 10);
      startTime = new Date().getTime();
      running = true;
    }
  };

  // function to stop the watchc
  $scope.stop = () => {
    if (!running) {
      return;
    } else {
      clearInterval(interval);
      endTime = new Date().getTime();
      previousElapsedTime = previousElapsedTime + endTime - startTime;
      $scope.elapsedTime = previousElapsedTime;
      running = false;
    }
  };

  // function to reset the watchc
  $scope.reset = () => {
    running = false;
    startTime = null;
    endTime = null;
    previousElapsedTime = 0;
    $scope.elapsedTime = 0;
    clearInterval(interval);
  };
}]);

// filter to change millisecond into xx:xx:xx:xx format
app.filter( 'mstohhmmssxx', function (){
  return function (input){
    let hh = Math.floor(input/(1000*60*60)) + '';
    if (hh.length < 2) {
        hh = '0' + hh;
    }

    let mm =  Math.floor((input % (1000*60*60))/(1000*60)) + '';
    while (mm.length < 2) {
        mm = '0' + mm;
    }

    let ss = Math.floor((input % ( 1000 * 60)) / 1000) + '';
    while (ss.length < 2) {
        ss = '0' + ss;
    }

    let xx = Math.floor((input % (1000)) / 10) + '';
    while (xx.length < 2) {
        xx = '0' + xx;
    }

    return hh + ':' + mm + ':' + ss + ':' + xx;
  };
});
