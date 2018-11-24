class StarterController extends AbstractController {

    constructor($scope, client) {
        super($scope);

        this.client     = client;
        this.$scope     = $scope;

        console.info('StarterController have been created');
    }
}