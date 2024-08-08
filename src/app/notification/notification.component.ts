import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  messages: string[] = [];

  showMessage(message: string, delay: number = 3000) {
    this.messages.push(message);
    setTimeout(() => this.messages.shift(), delay);
  }

  showUpdatingMessage() {
    this.showMessage("Updating...", 1500);
  }
}
