flagQuiz.service('gameService', ['$q', '$http', function($q, $http){
    // Game Constructor
    function _Game() {
        this.score = 0;
        this.nickname = '';
        this.gameClock = 60;
    }

    // Question Constructor
    function _Question(answer, choices) {
        this.flagSource = 'assets/country-pngs/' + answer.Code.toLowerCase() + '.png';
        this.correctAnswer = answer;
        this.choices = choices;
        this.answer = undefined;
    }

    // Accepts the remaining countries array as an arg, plucks & returns a random country from the array
    function _pluckCountry(countries) {
        return countries.splice(~~(Math.random() * countries.length));
    }

    // Selects 3 decoy countries from the countries array & returns them in an array
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

    // Shuffles the array of possible answers
    // Used so ng-repeat can be used to render w/o the answer in the same place every time
    function _shuffleArray(array) {
        var remainingElements = array.length,
            temp,
            index;
        while (remainingElements) {
            index = Math.floor(Math.random() * remainingElements--);
            temp = array[remainingElements];e
            array[remainingElements] = array[i];
            array[index] = temp;
        }

        return array;
    }

    function _startGame(game, interval) {
        _startTime(gameClock, interval);
    }

    // Start interval for game clock
    function _startTime(gameClock, interval) {
        interval = setInterval(function() { gameClock = gameClock - 1;}, 1000);
    }

    // Prevent Memory Leak via never ending interval
    function _stopTime(interval) {
        clearInterval(interval);
    }

    // Upticks score by 5pts
    function _handleCorrectAnswer(score) {
        score += 5;
    }

    // Downticks score by 5pts, unless score is 0
    function _handleIncorrectAnswer(score) {
        score = score === 0 ? 0 : score -= 5;
    }

    // Handle incoming answers, checks correctness returns promise
    function _handleAnswer (question, answer, quizLog) {
        var deferred = $q.defer();
        question.answer = answer;
        quizLog.push(question);
        if (question.correctAnswer['Country name'] === answer) {
            deferred.resolve(true);
        } else {
            deferred.resolve(false);
        }
        return deferred.promise;
    }

    // Get Countries JSON List
    function _getCountries() {
        var deferred = $q.defer();
        $http.get('data/countries.json').success(function(result){
            deferred.resolve(result);
        });
        return deferred.promise;
    }


    return {
        Game: _Game,
        getCountries: _getCountries,
        handleAnswer: _handleAnswer,
        handleCorrectAnswer: _handleCorrectAnswer,
        handleIncorrectAnswer: _handleIncorrectAnswer,
        pickDecoys: _pickDecoys,
        pluckCountry: _pluckCountry,
        Question: _Question,
        shuffleArray: _shuffleArray,
        startGame: _startGame,
        startTime: _startTime,
        stopTime: _stopTime
    }
}]);