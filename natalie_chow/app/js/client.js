const angular  = require('angular');
const moment = require('moment');

const timeApp = angular.module('timeApp', []);

timeApp.controller('timeController', ['$scope', ($scope) => {
  var timezone = moment().utcOffset() / 60;
  // save instances of setInterval to avoid lag
  var updateInterval;

  $scope.timezoneBackward = () => {
    timezone -= 1;
    if (timezone < -12) timezone = 14;
    restartUpdate();
  };

  $scope.timezoneForward = () => {
    timezone += 1;
    if (timezone > 14) timezone = -12;
    restartUpdate();
  };

  function decToHex(str) {
    return ('0' + parseInt(str).toString(16)).slice(-2);
  }

  function updateTime() {
    var now = moment().utcOffset(timezone);

    var timeHex = '#' + decToHex(now.format('HH'))
    + decToHex(now.format('mm'))
    + decToHex(now.format('ss'));

    $scope.timezone = now.format('Z');
    $scope.currentTime = now.format('HH:mm:ss');
    $scope.timeHex = timeHex;
    document.body.style.backgroundColor = timeHex;
  }

  function restartUpdate() {
    updateTime();
    clearInterval(updateInterval);
    updateInterval = setInterval(() => {
      $scope.$apply(() => {
        updateTime();
      });
    }, 1000);
  }

  restartUpdate();
}]);
