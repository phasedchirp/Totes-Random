import {config} from './twitter-app-config';
import * as t from './test';
import Twit         = require('twit');
import Rx           = require('rx');
import RNG          = require('tweed-random');

function foo(a: string): string {
  return `${a} foo`;
}

console.log(foo('bar'));
// console.log(config);

// let r = new RNG("hello");
// console.log(r.randomInt(1,20));

// let o = Rx.Observable.from([1,2,3,4]);

// o.subscribe(function(x) {console.log(x);},function(e){console.log(e);},
// function(){console.log("Done"); return null;});
let apiStream = t.twitStream(config);
t.process(apiStream, 3, 5);
