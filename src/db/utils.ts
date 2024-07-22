import { message } from 'antd'
import Database from 'tauri-plugin-sql-api'
import { SimpleObject } from '../types/common'

export class Db {
    static #instance: Db
    db: Promise<Database>

    public constructor() {
        this.db = Database.load('sqlite:workshop.db')
    }

    public static get instance(): Db {
        if (!Db.#instance) {
            Db.#instance = new Db()
        }
        return Db.#instance
    }
}

export class Model {
    tableName: string

    public constructor(tableName: string) {
        this.tableName = tableName
    }

    public async getDbInstance() {
        return await Db.instance.db
    }

    private getUpdateQuery(params: SimpleObject) {
        let keys = Object.keys(params)
        let columnsToUpdate = keys.reduce((accumulator, key, index, arr) => {
            let value = index + 1
            let stringValue =
                value != arr.length
                    ? `${key}=$${index + 1}, `
                    : `${key}=$${index + 1}`
            return accumulator + stringValue
        }, '')

        return `UPDATE ${this.tableName} SET ${columnsToUpdate} WHERE id=$${
            keys.length + 1
        }`
    }

    private getCreateQuery(params: SimpleObject) {
        let keys = Object.keys(params)
        let keysStrings = `(${keys.join(', ')})`
        let values = `(${keys.reduce((accumulator, key, index) => {
            let value = index + 1
            let stringValue = value != keys.length ? `$${value}, ` : `$${value}`
            return accumulator + stringValue
        }, '')})`

        return ` INSERT INTO ${this.tableName} ${keysStrings} VALUES ${values}`
    }

    private async createOrUpdate(sqlQuery: string, params: any) {
        let db = await this.getDbInstance()
        return await db.execute(sqlQuery, params)
    }

    public async getAll() {
        let db = await this.getDbInstance()
        return await db.select(`SELECT * FROM ${this.tableName}`)
    }

    public async filter() {
        let db = await this.getDbInstance()
        return await db.select(`SELECT * FROM ${this.tableName}`)
    }

    public async update(data: SimpleObject, id: number) {
        return new Promise(async (resolve, reject) => {
            this.createOrUpdate(this.getUpdateQuery(data), [
                ...Object.values(data),
                id,
            ])
                .then((res) => {
                    message.success('Aggiornamento andato a buon fine')
                    resolve(res)
                })
                .catch((err) => {
                    message.error(err)
                    reject(err)
                })
        })
    }

    public async create(data: SimpleObject) {
        return new Promise(async (resolve, reject) => {
            this.createOrUpdate(this.getCreateQuery(data), Object.values(data))
                .then((res) => {
                    message.success('Creazione andata a buon fine')
                    resolve(res)
                })
                .catch((err) => {
                    message.error(err)
                    reject(err)
                })
        })
    }

    public async delete(id: number) {
        let db = await this.getDbInstance()
        return new Promise(async (resolve, reject) => {
            await db
                .execute(`DELETE FROM ${this.tableName} WHERE id=$1`, [id])
                .then((res) => {
                    message.success('Eliminazione andata a buon fine')
                    resolve(res)
                })
                .catch((err) => {
                    message.error(err)
                    reject(err)
                })
        })
    }
}
