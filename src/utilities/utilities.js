export function findSelectedUser(user, id){
    return user.find(el => el.id === id);
}

export function updateUser(users, user,id){
    return users.map(el => {
        if(el.id === id){
            Object.keys(user).filter(key => key in el).forEach(key => {
                el[key] = user[key];
            });
        }
        return el;
    });
}