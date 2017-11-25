import Twit         = require('twit');
import Rx           = require('rx');
import RNG          = require('tweed-random');
import config = require('./twitter-app-config');

// set upper and lower bounds for integer generation
let maxVal = Number.MAX_VALUE;
let minVal = Number.MIN_VALUE;

// stolen shamelessly from https://stackoverflow.com/a/35447304 , consider replacing.
function hashCode(s: String){
  var hash = 0;
        for (var i = 0; i < s.length; i++) {
            hash = ~~(((hash << 5) - hash) + s.charCodeAt(i));
        }
        return hash;
}

function twitStream(config, filt? : string[]){
  let T = new Twit(config);
  if (filt) {
    return Rx.Observable.create(function(obs){
      T.stream('statuses/filter',filt)
      .on('tweet', function(t){obs.onNext(t);});
    });
  } else {
    return Rx.Observable.create(function(obs){
      T.stream('statuses/sample')
      .on('tweet',function(t){obs.onNext(t);});
    });
  }
};

function process(stream: Rx.Observable, n: number, size: number) {
  stream.filter(x => {return x.lang == 'en';})
        .map(x => x.text)
        .bufferCount(n)
        .take(size)
        .subscribe(
          function(x) {console.log(x)}
          , function(e) {console.log(e)}
          , function() {console.log('Completed'); return null;}
        )
};
//     function process(stream, gen, n, size){
//       stream
//       .filter((x) => {return x.lang === 'en';})
//       .map(x => f(x,gen))
//       .map(x => x.rand)
//       .bufferCount(n)
//       .take(size)
//       .subscribe(
//         // function (x) {console.log(x.reduce((a,b) => a ^ b));}
//         function(x) {console.log(x)}
//         ,function (e) {console.log('Error %s', e);}
//         ,function () {console.log('Completed'); return null;}
//         )
//     };
//     var    apiStream = twitStream('./twitter-app-config'),
//         subscription = process(apiStream, RNG, 3, 5),
//         apiStream2 = twitStream('./twitter-app-config'
//                                 ,{track: ['surprise','random']}),
//         subscription2 = process(apiStream2,RNG,3,5);
// }());
