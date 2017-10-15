(function() {
    function AlbumCtrl() {
        this.album = [];
        this.album.push(angular.copy(albumPicasso));
        this.albumData = [];
        for (var i = 0; i < 5; i++) {
        this.albumData.push(angular.copy(albumPicasso));
    }
}

        angular
            .module('blocJams')
            .controller('AlbumCtrl', AlbumCtrl);
})();
