import { AppError } from "../../app/errors/AppError";
import { User } from "../user/user.model";
import { IStore } from "./store.interface";
import { Store } from "./store.model";
import httpStatus from 'http-status';

const createStore = async (storeData: IStore): Promise<IStore> => {
  const existingStore = await Store.findOne({ user: storeData.user });
  if (existingStore) {
    throw new AppError(httpStatus.BAD_REQUEST,"User already has a store.");
  }

  const newStore = (await Store.create(storeData));
  return newStore;
};


const getMyStore = async(id:string) => {
  const user = await User.findById(id);

  if(!user?.hasStore){
    throw new AppError(httpStatus.BAD_REQUEST,"User Store not Found")
  }
  
  const store = await Store.findById(user?.store)
  .populate("orders")
  .populate("orders")

  return store;
} 

const updateStore = async (id:string,storeData:Partial<IStore>) => {
  const result = await Store.findByIdAndUpdate(id,{...storeData})
  return result
}


export const StoreService = {
    createStore,
    getMyStore,
    updateStore
}