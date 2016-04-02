import {enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {HomeComponent} from './home/home.component';

enableProdMode();
bootstrap(HomeComponent, []);
