import Database from "tauri-plugin-sql-api";
import { SimpleObject } from "../types/common";

export class Db {
    static #instance: Db;
    db: Promise<Database>

    public constructor() {
        this.db = Database.load("sqlite:workshop.db");
    }

    public static get instance():Db {
        if (!Db.#instance) {
            Db.#instance = new Db();
        }
        return Db.#instance;
    }
}


export class Model {
    tableName: string

    public constructor(tableName:string) {
        this.tableName = tableName;
    }

    public async getDbInstance() {
        return  await Db.instance.db 
    }

    private getUpdateQuery(params: SimpleObject){
        let keys = Object.keys(params)
        let columnsToUpdate = keys.reduce((accumulator, key, index, arr) => {
            let value = index + 1  
            let stringValue = value != arr.length ? `${key}=$${index+1}, ` : `${key}=$${index+1}`  
            return accumulator + stringValue
        }, '')

        return `UPDATE ${this.tableName} SET ${columnsToUpdate} WHERE id=$${keys.length + 1}`
    }

    private getCreateQuery(params: SimpleObject){
        let keys = Object.keys(params)
        let keysStrings = `(${keys.join(", ")})`
        let values = `(${keys.reduce((accumulator, key, index)=>{
            let value = index + 1
            let stringValue = value != keys.length ?  `$${value}, ` : `$${value}`
            return  accumulator + stringValue 
        }, "")})`

        return ` INSERT into ${this.tableName} ${keysStrings} VALUES ${values}`
    }   


    private async createOrUpdate(sqlQuery:string, params: any){
        let db = await this.getDbInstance()
        return await db.execute(sqlQuery, params);
    }

    public async getAll(){
        let db = await this.getDbInstance()
        return await db.select(`SELECT * from ${this.tableName}`);
    }

    public async filter(){
        let db = await this.getDbInstance()
        return await db.select(`SELECT * from ${this.tableName}`);
    }

    public async update( data: SimpleObject, id: number){
        await this.createOrUpdate(this.getUpdateQuery(data), [Object.values(data), id])
    }

    public async create(data:SimpleObject){
        await this.createOrUpdate(this.getCreateQuery(data), [Object.values(data)])
    }
}


  