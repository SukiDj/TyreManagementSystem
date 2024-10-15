import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../models/User";
import { store } from "./store";
import { router } from "../router/Routes";


export default class userStore{
    user: User | null = null;
    refreshTokenTimeout?: number;


    constructor(){
        makeAutoObservable(this);
    }

    get isLoggedIn(){
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try{
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);//ovo treba da pozovemo svuda kad dobijemo usera od server
            runInAction(()=> this.user = user);
            router.navigate('/');
            store.modalStore.closeModal();
        } catch(error){
            throw error;
        }
        
    }

    loguot = () =>{
        store.commonStore.setToken(null);
        this.user = null;
        router.navigate('/');
    }

    private startRefreshTokenTimer(user: User){
        const jwToken = JSON.parse(atob(user.token.split('.')[1]));//atob vadi info iz tokena
        const expires = new Date(jwToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (30 * 1000);//tajmaut od 30 sekunde
        this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);//kad istekne token pozivam ovu metodu iznad da nam server da novi token
        console.log({refreshTimeout: this.refreshTokenTimeout});
    }

    refreshToken = async () => {
        this.stopRefreshTokenTimer();
        try
        {
            const user = await agent.Account.refreshToken();
            runInAction(() => this.user = user);
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);//ovo treba da pozovemo svuda kad dobijemo usera od server
        }
        catch(error)
        {
            console.log(error);
        }
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout)
    }

}
