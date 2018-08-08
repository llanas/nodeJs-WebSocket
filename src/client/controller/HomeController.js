function HomeController($scope) {
    
    this.$scope     = $scope;

    console.info('MazeController have been created');
}

HomeController.prototype.constructor = HomeController;