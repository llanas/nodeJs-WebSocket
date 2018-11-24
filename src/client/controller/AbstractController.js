class AbstractController extends EventEmitter {
    
    constructor($scope) {
        super();    
        this.$scope = $scope;
    }
}