(function() {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};

        /**
        *@desc get the album information
        *@type {object}
        */
        var currentAlbum = Fixtures.getAlbum();

        // Private Attributes

        /**
        *@desc Buzz object audio file
        *@type {object}
        */
        var currentBuzzObject = null;

        // Private function
        /**
        * @function setSong
        *@desc Stops currently playing song and loads new audio file as currentBuzzObject
        *@param {object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                // currentBuzzObject.stop();
                // SongPlayer.currentSong.playing = null;
                stopSong(song);
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();  
                });
            });

            SongPlayer.currentSong = song;

            /**
            * @desc Current playback time (in seconds) of currently playing song
            * @type {Number}
            */
            SongPlayer.currentTime = null;
        };

        /**
        * @function playSong
        *@desc Plays the song object
        *@param {object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };

        var stopSong = function(song) {
            currentBuzzObject.stop();
            // song.playing = null;
            SongPlayer.currentSong.playing = null;
        }

        // Public Methods (SongPlayer.play and SongPlayer.pause)
        /**
        *@desc Gets the index of the song
        *@param {object} song
        *@return index
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };

        /**
        *@desc Active song object from list of songs
        *@type {object}
        */
        SongPlayer.currentSong = null;

        /**
        * @function SongPlayer.play
        *@desc Plays the song if it is not the current song or if it is paused.
        *@param {object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {

            setSong(song);

            playSong(song);

          } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                }
            }
        };

        /**
        * @function SongPlayer.pause
        *@desc Pauses the current song that is playing
        *@param {object} song
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        /**
        *@desc get previous song
        *
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                // currentBuzzObject.stop();
                // SongPlayer.currentSong.playing = null;
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            console.log(currentSongIndex);

            if (currentSongIndex == currentAlbum.songs.length) {
                // currentBuzzObject.stop();
                // SongPlayer.currentSong.playing = null;
                stopSong(song);
            } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
            }

        };

        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
