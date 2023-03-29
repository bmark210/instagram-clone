import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import produce from 'immer';

const useUserStore = create(
  persist(
    devtools((set) => ({
      user: null,
      login: (userData) =>
        set(
          produce((draft) => {
            draft.user = userData;
          })
        ),
      logout: () =>
        set(
          produce((draft) => {
            draft.user = null;
          })
        ),
      updateAvatar: (newAvatarUrl) =>
        set(
          produce((draft) => {
            draft.user.avatarUrl = newAvatarUrl;
          })
        ),
      updateFollowings: (newFollowing) =>
        set(
          produce((draft) => {
            draft.user.following.push(newFollowing);
          })
        ),
    })),
    {
      name: 'user-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
export default useUserStore;
