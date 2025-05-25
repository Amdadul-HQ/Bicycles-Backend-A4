import { AppError } from "../../app/errors/AppError";
import { IStore } from "./store.interface";
import { Store } from "./store.model";
import httpStatus from 'http-status';

const createStore = async (storeData: IStore): Promise<IStore> => {
  const existingStore = await Store.findOne({ user: storeData.user });
  if (existingStore) {
    throw new AppError(httpStatus.BAD_REQUEST,"User already has a store.");
  }

  const newStore = await Store.create(storeData);
  return newStore;
};


export const StoreService = {
    createStore
}