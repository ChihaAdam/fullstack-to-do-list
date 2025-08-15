export function getItem(key: string){
    try{
        const item = window.localStorage.getItem(key)
        return item? JSON.parse(item): null
    }catch(err){
        console.error(err)
    }
}
export function setItem<T=any>(key: string,value:T){
    try{
        const stringified = JSON.stringify(value)
        window.localStorage.setItem(key,stringified);
    }catch(err){
        console.error(err)
    }
}