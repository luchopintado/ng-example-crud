// tslint:disable:no-inferrable-types
import {Component} from '@angular/core';
import {DataService} from '../services/data.service';

const emptyUser = {
    id: '',
    name: '',
    email: '',
    phone: ''
};

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'sandbox',
    template: `
        <div class="col-12">
            <h1>Observable and http requests</h1>
            <br />

            <form (submit)="onSubmit(isEdit)">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" [(ngModel)]="user.name" name="name"/>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="text" class="form-control" [(ngModel)]="user.email" name="email"/>
                </div>
                <div class="form-group">
                    <label>Phone</label>
                    <input type="text" class="form-control" [(ngModel)]="user.phone" name="phone"/>
                </div>
                <input type="submit" value="{{isEdit ? 'Update' : 'Submit'}}" class="btn {{isEdit ? 'btn-primary' : 'btn-success'}}" />
                <input *ngIf="isEdit" type="button" value="Cancel" class="btn btn-default" (click)="onCancelEdit()" />
            </form>
            <br/>
            <ul class="list-group">
                <li class="list-group-item" *ngFor="let user of users">
                    {{ user.name }} &nbsp;&nbsp; <small><strong>{{user.email}}</strong> - [{{user.phone}}]</small>

                    <div class="ml-auto">
                        <button type="button" class="btn btn-primary btn-sm" (click)="onEdit(user)">
                            <i class="fa fa-pencil"></i>
                        </button>
                        <button type="button" class="btn btn-danger btn-sm" (click)="onDelete(user.id)">
                            <i class="fa fa-trash-o"></i>
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    `
})

export class SandboxComponent {

    users: any[] = [];
    user = emptyUser;
    isEdit: boolean = false;

    constructor (public dataService: DataService) {
        this.dataService.getUsers().subscribe(users => {
            console.log(users);
            this.users = users;
        });
    }

    onSubmit (isEdit) {
        if (isEdit) {
            this.dataService.updateUser(this.user).subscribe(user => {
                for (let i = 0; i < this.users.length; i++) {
                    if (this.users[i].id === this.user.id) {
                        this.users.splice(i, 1);
                    }
                }
                this.users.unshift(this.user);
                this.isEdit = false;
                this.user = emptyUser;
            });
        } else {
            this.dataService.addUser(this.user).subscribe(user => {
                console.log(user);
                this.users.unshift(user);
            });
        }
    }

    onDelete (id) {
        console.log('on delete', id);
        this.dataService.deleteUser(id).subscribe(res => {
            console.log(res);
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].id === id) {
                    this.users.splice(i, 1);
                }
            }
        });
    }

    onEdit (user) {
        this.user = user;
        this.isEdit = true;
    }

    onCancelEdit () {
        this.user = emptyUser;
        this.isEdit = false;
    }

}
