import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IContact } from 'src/app/models/iContact';
import { IGroup } from 'src/app/models/iGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {

  public contactId: string | null = null;
  public loading: boolean = false;
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;
  public group: IGroup = {} as IGroup;

  constructor(private contactService: ContactService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( (param: ParamMap) => {
      this.contactId = param.get('contactId');
    })
    if(this.contactId){
      this.loading = false;
      this.contactService.getContact(this.contactId).subscribe((data: IContact)=>{
        this.contact = data;
        this.loading = false;
        this.contactService.getGroup(data).subscribe((data: IGroup)=>{
          this.group = data;
        }, (error) => {
          this.errorMessage = error;
          this.loading = false;
        });
      }, (error) => {
        this.errorMessage = error;
        this.loading = false;
      });
    }
  }

  public isNotEmpty(){
    return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0;;
  }

}
