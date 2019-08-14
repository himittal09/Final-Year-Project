import { Injectable, Injector} from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

// Cool library to deal with errors: https://www.stacktracejs.com
// import * as StackTraceParser from 'error-stack-parser';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private injector: Injector) { }

  // log(error) {
  //   const fakeHttpService = this.injector.get(HttpClient);
  //   // Log the error to the console
  //   console.error(error);
  //   // Send error to server
  //   const errorToSend = this.addContextInfo(error);
  //   return fakeHttpService.post('backend url', errorToSend);
  // }

  // addContextInfo(error) {
  //   // All the context details that you want (usually coming from other services; Constants, UserService...)
  //   const name = error.name || null;
  //   const appId = 'shthppnsApp';
  //   const user = 'ShthppnsUser';
  //   const time = new Date().getTime();
  //   const id = `${appId}-${user}-${time}`;
  //   const location = this.injector.get(LocationStrategy);
  //   const url = location instanceof PathLocationStrategy ? location.path() : '';
  //   const status = error.status || null;
  //   const message = error.message || error.toString();
  //   const stack = error instanceof HttpErrorResponse ? null : StackTraceParser.parse(error);

  //   const errorToSend = {name, appId, user, time, id, url, status, message, stack};
  //   return errorToSend;
  // }

}
