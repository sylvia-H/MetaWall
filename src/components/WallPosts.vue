<template>
  <VLoading :active="isLoading" :z-index="3000">
    <VueLoader></VueLoader>
  </VLoading>
  <div
    v-for="post in posts"
    :key="post._id"
    class="dialogue w-full border-2 border-secondary bg-white rounded-lg mb-4"
  >
    <div class="p-6">
      <!-- 發文者資訊 -->
      <div class="flex justify-between mb-4">
        <div class="flex">
          <RouterLink :to="`/main/space/${post.author._id}`">
            <div
              class="h-11 w-11 border-2 border-secondary rounded-full overflow-hidden mr-2.5"
            >
              <img
                class="object-cover w-full h-full"
                :src="post.author.avatar"
                :alt="`${post.author.name}'s avatar`"
              />
            </div>
          </RouterLink>
          <div>
            <RouterLink :to="`/main/space/${post.author._id}`">
              <p class="font-noto-sans-tc font-bold text-base mb-1">
                {{ post.author.name }}
              </p>
            </RouterLink>
            <div class="flex items-center">
              <p
                class="font-baloo-da-2 text-sm text-brown-1 align-baseline mr-2"
              >
                {{ $filters.transferToDate(post.createdAt) }}
              </p>
              <span
                v-if="post.privacy === 'private'"
                class="iconify block text-sm text-gray-500 align-top"
                data-icon="bxs:lock"
              ></span>
              <span
                v-else
                class="iconify block text-sm text-gray-500 align-top"
                data-icon="eva:globe-2-fill"
              ></span>
            </div>
          </div>
        </div>
        <!-- 編輯貼文按鈕 -->
        <button v-if="post.author._id === user._id" type="button">
          <div class="group relative">
            <div class="block group-hover:hidden group-focus:hidden">
              <span
                class="iconify text-2xl font-extrabold text-primary"
                data-icon="clarity:note-edit-line"
              ></span>
            </div>
            <div class="hidden group-hover:block group-focus:block">
              <span
                class="iconify text-2xl font-extrabold text-primary"
                data-icon="bxs:edit"
              ></span>
            </div>
            <div
              class="absolute hidden group-hover:block w-30 py-3 top-6 left-0 shadow-lg rounded-lg bg-white z-50"
            >
              <ul class="w-full text-center">
                <li class="hover:bg-gray-100 mb-2">編輯貼文</li>
                <li class="hover:bg-gray-100">刪除貼文</li>
              </ul>
            </div>
          </div>
        </button>
      </div>
      <!-- 貼文 -->
      <div>
        <p class="font-noto-sans-tc text-base mb-4">
          {{ post.content }}
        </p>
      </div>
      <!-- 貼圖 -->
      <div
        v-if="post.image"
        class="w-full h-40 border-2 border-secondary rounded-lg overflow-hidden mb-4"
      >
        <img
          class="object-cover w-full h-full"
          :src="post.image"
          alt="post image"
        />
      </div>
      <!-- 按讚數 -->
      <div class="flex items-center mb-4">
        <!-- 有讚數 -->
        <div v-if="post.likes.length" class="flex items-center">
          <div class="group mr-2">
            <button type="button" class="group-hover:hidden group-focus:hidden">
              <!-- <i
                class="bi bi-hand-thumbs-up text-xl font-extrabold text-primary"
              ></i> -->
              <span
                class="iconify text-xl font-extrabold text-primary"
                data-icon="bi:hand-thumbs-up"
              ></span>
            </button>
            <button
              @click="addLikes(post)"
              type="button"
              class="hidden group-hover:block group-focus:block"
            >
              <!-- <i
                class="bi bi-hand-thumbs-up-fill text-xl font-extrabold text-primary"
              ></i> -->
              <span
                class="iconify text-xl font-extrabold text-primary"
                data-icon="bi:hand-thumbs-up-fill"
              ></span>
            </button>
          </div>
          <span class="font-baloo-da-2 text-base text-secondary">
            {{ post.likes.length }}
          </span>
        </div>
        <!-- 沒有讚數 -->
        <div v-else class="flex items-center">
          <button
            @click="addLikes(post._id)"
            type="button"
            class="group-hover:hidden group-focus:hidden mr-1"
          >
            <!-- <i
              class="bi bi-hand-thumbs-up text-xl font-extrabold text-brown-1"
            ></i> -->
            <span
              class="iconify text-xl font-extrabold text-brown-1"
              data-icon="bi:hand-thumbs-up"
            ></span>
          </button>
          <span class="font-baloo-da-2 text-base text-brown-1">
            成為第一個按讚的朋友
          </span>
        </div>
      </div>
      <!-- 留言框 -->
      <div class="flex">
        <div
          class="h-10 w-10 border-2 border-secondary rounded-full overflow-hidden mr-2.5"
        >
          <img
            class="object-cover w-full h-full"
            :src="user.avatar"
            :alt="`${user.name}'s avatar`"
          />
        </div>
        <div class="grow">
          <div
            class="input-group relative flex items-stretch w-full border-2 border-secondary"
          >
            <input
              v-model="commentBody"
              type="text"
              class="form-control relative flex-auto min-w-0 block w-full py-2 px-4 text-base font-bold text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="留言..."
              aria-label="Comment"
              aria-describedby="button-comment"
            />
            <button
              class="btn w-32 px-4 py-2 bg-primary text-white border-l-2 border-secondary hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              type="button"
              id="button-comment"
              @click="addComment(post)"
            >
              留言
            </button>
          </div>
        </div>
      </div>
      <!-- 留言串 -->
      <div
        v-for="item in post.comments"
        :key="item._id"
        class="flex bg-gray-1 rounded-xl py-4.5 px-4 mt-4"
      >
        <!-- 回文者資訊 -->
        <div class="flex">
          <div
            class="h-10 w-10 border-2 border-secondary rounded-full overflow-hidden mr-2.5"
          >
            <RouterLink :to="`/main/space/${item.author._id}`">
              <img
                class="object-cover w-full h-full"
                :src="item.author.avatar"
                :alt="`${item.author.name}'s avatar`"
              />
            </RouterLink>
          </div>
          <div>
            <p class="font-noto-sans-tc font-bold text-base mb-1">
              {{ item.author.name || '暫時無法顯示' }}
            </p>
            <p class="font-baloo-da-2 text-xs text-brown-1 mb-1">
              {{ $filters.transferToDate(item.createdAt) }}
            </p>
            <p class="font-noto-sans-tc text-base">
              {{ item.comment || '暫時無法顯示' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueLoader from '@/components/LoadingOverlay.vue';
import { mapState, mapActions } from 'pinia';
import { userStore, statusStore, postStore } from '@/stores';

export default {
  components: {
    VueLoader,
  },
  data() {
    return {
      commentBody: '',
    };
  },
  props: ['authorID'],
  inject: ['emitter'],
  computed: {
    ...mapState(userStore, ['user']),
    ...mapState(statusStore, ['isLoading']),
    ...mapState(postStore, ['posts']),
  },
  methods: {
    ...mapActions(postStore, ['getPosts']),
    addLikes(post) {
      this.isLoading = true;
      let url = `${import.meta.env.VITE_BASE_API}/posts/${post._id}/like`;
      let httpStatus;
      if(post.likes.includes(this.user._id)){
        httpStatus = 'DELETE';
      }else{
        httpStatus = 'POST';
      }
      const token = document.cookie
        .split(`AUTH_TOKEN=`)
        .pop()
        .split(';')
        .shift();
      this.axios({
        method: httpStatus,
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          this.isLoading = false;
          this.getPosts(
            'desc',
            '',
            this.authorID,
            this.authorID == this.user._id
          );
        })
        .catch((err) => {
          this.isLoading = false;
          console.dir(err);
        });
    },
    addComment(post) {
      this.isLoading = true;
      const comment = {
        article_id: post['_id'],
        author: this.user['_id'],
        comment: this.commentBody,
      };
      const url = `${import.meta.env.VITE_BASE_API}/comments`;
      const token = document.cookie
        .split(`AUTH_TOKEN=`)
        .pop()
        .split(';')
        .shift();
      this.axios({
        method: 'POST',
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: comment,
      })
        .then(() => {
          this.isLoading = false;
          // this.$emit('get-posts');
          this.getPosts(
            'desc',
            '',
            this.authorID,
            this.authorID == this.user._id
          );
        })
        .catch((err) => {
          this.isLoading = false;
          console.dir(err);
        });
      this.commentBody = '';
    },
  },
};
</script>
