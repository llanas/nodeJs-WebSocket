function MazeController($scope, client) {


    this.client     = client;
    this.$scope     = $scope;

    console.info('MazeController have been created');
}

MazeController.prototype.constructor = MazeController;