function StarterController($scope, client) {


    this.client     = client;
    this.$scope     = $scope;

    console.info('StarterController have been created');
}

StarterController.prototype.constructor = StarterController;