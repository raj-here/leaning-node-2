import mongoose from "mongoose";

interface IRead<T> {
    retrieve: (query: any, callback: (error: any, result: any) => void) => void;
    findById: (id: string, callback: (error: any, result: T) => void) => void;
    count: (query: any, callback: (error: any, result: any) => void) => void;
    paginate: (query: any, sort: any, limit: number, skip: number, callback: (error: any, result: T) => void) => void;
}

interface IWrite<T> {
    create: (item: T, callback: (error: any, result: any) => void) => void;
    update: (_id: mongoose.Types.ObjectId, item: T, options: any, callback: (error: any, result: any) => void) => void;
    delete: (_id: string, callback: (error: any, result: any) => void) => void;
}

export default class RepositoryBase<T extends mongoose.Document> implements IRead<T>, IWrite<T> {

    private _model: mongoose.Model<mongoose.Document>;

    constructor(schemaModel: mongoose.Model<mongoose.Document>) {
        this._model = schemaModel;
    }

    create(item: T): Promise<mongoose.Document> {
        return this._model.create(item);
    }

    retrieve(query: any = {}): Promise<Pick<mongoose.Document, "_id">[]> {
        return this._model.find(query).lean().exec();
    }

    retrieveLatestByKey(key: string, query: any = {}): Promise<Pick<mongoose.Document, "_id"> | null> {
        return this._model.findOne(query).sort({ key: -1 }).lean().exec();
    }

    update(_id: mongoose.Types.ObjectId, item: T, options: any = {}): Promise<Pick<mongoose.Document, "_id"> | null> {
        return this._model.findOneAndUpdate({ _id: _id }, item, options).lean().exec();
    }

    async delete(_id: string): Promise<number> {
        const res = await this._model.remove({ _id });
        return res.deletedCount || 0; // Number of documents removed if 0 means Not deleted
    }

    findById(_id: string): Promise<Pick<mongoose.Document, "_id"> | null> {
        return this._model.findById(_id).lean().exec();
    }

    paginate(query: any = {}, sort: any = {}, limit: number, skip: number): Promise<Pick<mongoose.Document, "_id">[]> {
        return this._model.find(query).sort(sort).limit(limit).skip(skip).lean().exec();
    }

    count(query: any = {}): Promise<number> {
        return this._model.countDocuments(query).exec();
    }

    private toObjectId(_id: string): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(_id)
    }
}