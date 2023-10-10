export interface repository <T> {
    findAll(): Promise <T[] | undefined>
    findOne(i: { id: string }): Promise <T | undefined>
    add(i: T): Promise <T | undefined>
    update(id:string, i: T): Promise <T | undefined> 
    delete(i: { id: string }): Promise <T | undefined>
}