class UserService {
    getUserId() {
        const data = JSON.parse(localStorage.getItem('userData')!)
        if(!data) return
        return data.userId
    }
}

export default new UserService()