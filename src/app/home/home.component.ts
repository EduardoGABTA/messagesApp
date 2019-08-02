import {AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {User} from '../interfaces/user';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RequestsService} from '../services/requests.service';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger = new Subject();
  public dtOptions = {
    scrollY: '600px',
    scrollX: true,
    scrollCollapse: true
  };



  friendEmail = '';
  friends: User[];
  query = '';
  user: User;
  constructor(private userService: UserService, private authenticationService: AuthenticationService, private router: Router, private modalService: NgbModal, private requestsService: RequestsService) {
    this.userService.getUsers().valueChanges().subscribe((data: User[]) => {
      this.friends = data;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    }, (error) => {
      console.log(error);
    });
    this.authenticationService.getStatus().subscribe((status) => {
      console.log(status);

      this.userService.getUserById(status.uid).valueChanges().subscribe((data: User) => {
        this.user = data;
        if (this.user.friends) {
          this.user.friends = Object.values(this.user.friends);
          console.log(this.user);
        }
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
  }

  ngOnInit() {
  }


  sendRequest() {
    const request: any = {
      timestamp: Date.now(),
      reciver_email: this.friendEmail,
      sender: this.user.uid,
      senderstatus: 'pending'
    };
    this.requestsService.createRequest(request).then(() => {
      alert('solicitud enviada');
    }).catch((error) => {
      alert('Hubo un errro');
      console.log(error);
    });
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    //  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {

    this.dtTrigger.unsubscribe();
  }

}
