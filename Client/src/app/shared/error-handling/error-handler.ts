import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

// import { Router } from '@angular/router';

// import { ErrorService } from './error.service';
// import { NotificationService } from '../../services/notification/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: Error | HttpErrorResponse) {

    console.error(error);

    // const notificationService = this.injector.get(NotificationService);
    // const errorService = this.injector.get(ErrorService);
    // const router = this.injector.get(Router);

    // if (error instanceof HttpErrorResponse) {
    //   if (!navigator.onLine) {
    //     return notificationService.notify('No Internet Connection');
    //   }
    //   errorService
    //     .log(error)
    //     .subscribe();
    //   // Show notification to the user
    //   return notificationService.notify(`${error.status} - ${error.message}`);

    // } else {
    //   console.error('Angular Error, reference error');
    //   errorService
    //     .log(error)
    //     .subscribe(errorWithContextInfo => {
    //       router.navigate(['/error'], { queryParams: errorWithContextInfo });
    //     });
    // }
  }
}


