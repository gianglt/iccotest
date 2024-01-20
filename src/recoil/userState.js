import { atom, selector } from "recoil";
import {
  getUserInfo,
  getAccessToken,
  followOA,
  openWebview,
} from "zmp-sdk/apis";

export const userState = atom({
  key: "user",
  default: {
    id: '12345678',
    name: 'Zalo',
    avatar: 'ZA',
  }
})


const getZaloUserInfo = async () => {
  try {
      const user = await getUserInfo({ avatarType: "normal" });
      const { userInfo } = user;
      return Promise.resolve(userInfo);
  } catch (err) {
      return Promise.reject(err);
  }
};



export const getZaloUser = selector({
  key: 'getZaloUser',
  get: async ({get}) => {

    var u = get(userState);
    try
    {
      u = await getZaloUserInfo();
      console.log('U', u);
      //set(userState, user);
    }
    catch
    {

    }
    return u;
  },
});

