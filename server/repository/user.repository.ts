import RepositoryBase from "./base.repository";
import { UserModel } from "../model/user.model";
import { IUserModel } from "../IModel/user.imodel";

class UserRepository extends RepositoryBase<IUserModel> {
    constructor() {
        super(UserModel);
    }
}
export { UserRepository };