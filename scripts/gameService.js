flagQuiz.service('gameService', ['', function(){
    function _Game() {
        this.score = 0;
        this.nickname = '';
        this.gameClock = 60;
    }

    function _startTime(gameClock) {
        setInterval(function() {
            gameClock = gameClock - 1;
        }, 1000)
    }

    function _pluckCountry(countries) {
        return countries.splice(~~(Math.random() * countries.length));
    }

    function _pickDecoys(countries) {
        var cache = {},
            decoys = [],
            randomIndex;
        while (decoys.length < 3) {
            randomIndex = ~~(Math.random() * countries.length);
            if (!cache[randomIndex]) {
                cache[randomIndex] = true;
                decoys.push(countries[randomIndex]);
            }
        }
        return decoys;
    }

    function _shuffleArray(array) {
        var m = array.length, t, i;

        // While there remain elements to shuffle
        while (m) {
            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }

        return array;
    }

    function _startGame (game) {
        _startTime(gameClock);
        while(game.gameClock > 0) {

        }
        clearInterval(refreshIntervalId);
    }

    return {
        Game: _Game,
        startGame: _startGame
    }
}]);