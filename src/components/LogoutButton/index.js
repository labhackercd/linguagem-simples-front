import axiosInstance from './../../auth/axiosApi.js'
import React, { Component } from 'react';


export default class LogoutButton extends Component {

    constructor() {
        super();
        this.handleLogout = this.handleLogout.bind(this);
    }

    async handleLogout() {
        try {
            const response = await axiosInstance.post('/blacklist/', {
                "refresh_token": localStorage.getItem("refresh_token")
            });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;
            return response;
        }
        catch (e) {
            console.log(e);
        }
    };

    render() {
        return (
                <div>
                    <button onClick={this.handleLogout}>Logout</button>
                </div>
        );
    };
}
