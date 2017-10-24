(function() {
    function SongPlayer() {
        var SongPlayer = {};

        // Private Attributes
        /**
        *@desc Current song playing
        *@type {object}
        */
        var currentSong = null;

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
                currentBuzzObject.stop();
                currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
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

        // Public Methods (SongPlayer.play and SongPlayer.pause)
        /**
        * @function SongPlayer.play
        *@desc Plays the song if it is not the current song or if it is paused.
        *@param {object} song
        */
        SongPlayer.play = function(song) {
            if (currentSong !== song) {

            setSong(song);

            playSong(song);

          } else if (currentSong === song) {
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
            currentBuzzObject.pause();
            song.playing = false;
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
