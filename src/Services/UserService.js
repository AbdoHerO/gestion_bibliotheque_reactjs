import axois from 'axios';

const ApiUrl = 'http://localhost:8083/apis/';

export const UserService = {
    login(email, password) {
        return axois.post(ApiUrl + 'login', {
            email: email,
            password: password
        });
    },
    register(formData) {
        return axois.post(ApiUrl + 'register', {
            formData : formData,
        },{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}
