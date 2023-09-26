export interface repository <T> {
    findAll(): T[] | undefined
    findOne(i: { id: string }): T | undefined
    add(i: T): T | undefined
    update(i: T): T | undefined 
    delete(i: { id: string }): T | undefined
}