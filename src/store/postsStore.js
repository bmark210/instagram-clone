import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import produce from 'immer';

const usePostsStore = create(
  persist(
    devtools((set) => ({
      posts: null,
      savePosts: (postsData) =>
        set(
          produce((draft) => {
            draft.posts = postsData;
          })
        ),
    })),
    {
      name: 'posts-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export { usePostsStore };
