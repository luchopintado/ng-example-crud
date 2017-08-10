import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

const endPoint = 'http://jsonplaceholder.typicode.com/users';

@Injectable()
export class DataService {


    constructor (public http: Http) {
    }

    getUsers () {
        return this.http
            .get(endPoint)
            .map(res => res.json());
    }

    addUser (user) {
        return this.http
            .post(endPoint, user)
            .map(res => res.json());
    }

    deleteUser (id) {
        return this.http
            .delete(`${endPoint}/${id}`)
            .map(res => res.json());
    }

    updateUser (user) {
        return this.http
            .put(`${endPoint}/${user.id}`, user)
            .map(res => res.json());
    }
}
