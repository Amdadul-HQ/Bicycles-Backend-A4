import { AppError } from "../../app/errors/AppError";
import { Store } from "../store/store.model";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import mongoose from "mongoose";
import { userSearchableFields } from "../user/user.constant";
import QueryBuilder from "../../app/builder/QueryBuilder";

const getAllStores = async() => {
    const stores = await Store.find().populate("user", "name email role");
    return stores;
}

const approveStore = async (storeId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const store = await Store.findById(storeId).session(session);
    if (!store) {
      throw new AppError(httpStatus.NOT_FOUND, "Store not found");
    }

    if (store.status === "active") {
      throw new AppError(httpStatus.BAD_REQUEST, "Store already approved");
    }

    // ✅ Update store status
    store.status = "active";
    await store.save({ session });

    // ✅ Update user role to 'vendor'
    await User.findByIdAndUpdate(store.user, { role: "vendor" }, { session });

    // ✅ Commit transaction
    await session.commitTransaction();
    session.endSession();

    return store;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};


const getAllUsersFromDB =  async (query: Record<string, unknown>) => {
    const userQuery = new QueryBuilder(
      User.find(),
      query,
    )
      .search(userSearchableFields)
      .filter()
      .sort()
      .paginate()
      .fields();
  
    const meta = await userQuery.countTotal();
    const result = await userQuery.modelQuery;
  
    return {
      meta,
      result,
    };
  };

  const deleteUserFromDB = async (id: string) => {

    const user = await User.isUserExists(id);
    
    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, 'User Not Found!!');
    }
    
    const deletedUser = await User.findByIdAndUpdate(id,{isBlocked:true},{new:true})
  
    return deletedUser
  };

export const AdminService = {
    getAllStores,
    approveStore,
    getAllUsersFromDB,
    deleteUserFromDB
}