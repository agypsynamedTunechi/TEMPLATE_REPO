export function storeProject(state){
    localStorage.setItem('projects', JSON.stringify(state))

 
}

export function loadProject(){
    const stored = JSON.parse(localStorage.getItem("projects"));
    
    if(stored === null){
        return
    }
    return stored

}
