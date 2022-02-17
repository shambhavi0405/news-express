import { Injectable } from "@angular/core";
import Swal from 'sweetalert2';
@Injectable({
  providedIn: "root",
})
export class NotificationService {
  constructor() {}
  public openErrorAlert(message?:string, title?: string): void{
    Swal.fire({
      title: title,
      text: message,
      type: 'error',
      confirmButtonText: 'Ok'
    } as any);
  }

  }
