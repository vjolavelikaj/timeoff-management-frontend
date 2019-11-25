import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../_models';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getUsers() {
        return this.http.get<User[]>(`/server/api/v1/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`/users/${id}`);
    }

    register(user: User) {
        return this.http.post<User>(`/users/register`, user);
    }

    update(user: User) {
        return this.http.put<User>(`/users/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`/users/${id}`);
    }
}