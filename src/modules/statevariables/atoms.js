import {atom} from 'recoil'

export const walletState = atom({
    key:"WalletState",
    default:[],
});
export const networkState=atom({
    key:"networkState",
    default:null,
})