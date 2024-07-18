import { Model } from "./utils";

export class Customers extends Model {
    public constructor(){
        super("customers");
    }
}

export class Cars extends Model {
    public constructor(){
        super("cars");
    }
}