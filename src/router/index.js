import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
  },
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: {
      title: 'MetaWall',
    },
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/MainView.vue'),
    children: [
      {
        path: '',
        name: 'public',
        component: () => import('../views/PublicView.vue'),
      },
      {
        path: 'profile',
        name: 'edit_profile',
        component: () => import('../views/EditProfile.vue'),
      },
      {
        path: 'space/:id',
        name: 'space',
        component: () => import('../views/SpaceView.vue'),
      },
      {
        path: 'post',
        name: 'post',
        component: () => import('../views/EditPost.vue'),
      },
      {
        path: 'follow',
        name: 'follow',
        component: () => import('../views/FollowList.vue'),
      },
      {
        path: 'likes',
        name: 'likes',
        component: () => import('../views/LikePosts.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  scrollBehavior() {
    return {
      top: 0,
      behavior: 'smooth',
    };
  },
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
