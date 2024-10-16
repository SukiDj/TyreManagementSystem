import { createContext, useContext } from "react";
import userStore from "./userStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import BusinessUnitStore from "./businessUnitStore";
import RecordStore from "./productionRecordStore";
import tyreStore from "./tyreStore";

interface Store{
    commonStore : CommonStore;
    modalStore: ModalStore;
    userStore: userStore;
    recordStore: RecordStore
    businessUnitStore: BusinessUnitStore;
    tyreStore: tyreStore;
}

export const store: Store = {
    commonStore : new CommonStore(),
    modalStore: new ModalStore(),
    userStore: new userStore(),
    businessUnitStore: new BusinessUnitStore(),
    recordStore: new RecordStore(),
    tyreStore: new tyreStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}