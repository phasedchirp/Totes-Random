import {config} from './twitter-app-config';

function foo(a: string): string {
  return `${a} foo`;
}

console.log(foo('bar'));
console.log(config);
