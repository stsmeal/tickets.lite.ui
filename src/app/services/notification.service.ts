import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';


export class SnackBarMessage {
  message: string;
  action: string = null;
  config: MatSnackBarConfig = null;
}

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  private messages: SnackBarMessage[] = [];
  private isActive: boolean = false;
  private snackBarRef: MatSnackBarRef<SimpleSnackBar>;

  constructor(public snackBar: MatSnackBar) { }

  public add(message: string, action?: string, config?: MatSnackBarConfig): void {
    if (!config) {
      config = new MatSnackBarConfig();
      config.duration = 1000;
    }

    let sbMessage = new SnackBarMessage();
    sbMessage.message = message;
    sbMessage.action = action;
    sbMessage.config = config;

    this.messages.push(sbMessage);
    if (!this.isActive) {
      this.showNext();
    }
  }

  private showNext(): void {
    if (this.messages && this.messages.length) {
      let message = this.messages.shift();

      this.isActive = true;
      this.snackBarRef = this.snackBar.open(message.message, message.action, message.config);
      this.snackBarRef.afterDismissed().subscribe(() => {
        this.isActive = false;
        this.showNext();
      });
    }
  }


  public info(message: string, timeout: number = 5000) {
    let config = new MatSnackBarConfig();
    config.duration = timeout;
    config.panelClass = ['info-snackbar'];
  
    this.add(message, 'Dismiss', config);
  }

  public success(message: string, timeout: number = 5000) {
    let config = new MatSnackBarConfig();
    config.duration = timeout;
    config.panelClass = ['success-snackbar'];

    this.add(message, 'Dismiss', config);
  }

  public warning(message: string, timeout: number = 5000) {
    let config = new MatSnackBarConfig();
    config.duration = timeout;
    config.panelClass = ['warning-snackbar'];

    this.add(message, 'Dismiss', config);
  }

  public error(message: any, timeout: number = 5000) {
    let config = new MatSnackBarConfig();
    config.duration = timeout;
    config.panelClass = ['error-snackbar'];

    if (message._body && message._body.length > 0
      && message._body.split('"', 4)[3].length > 0) {
      this.add(message._body.split('"', 4)[3], 'Dismiss', config);
    } else {
      this.add(message, 'Dismiss', config);
    }
  }
}