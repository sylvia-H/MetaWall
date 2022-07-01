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
              <div v-if="isEdit === post._id">
                <select
                  v-model="post.privacy"
                  class="border border-secondary focus:border-indigo-300 text-sm"
                >
                  <option value="private">只限本人</option>
                  <option value="public">公開</option>
                </select>
              </div>
              <div v-else>
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
                <li @click="isEdit = post._id" class="hover:bg-gray-100 mb-2">
                  編輯貼文
                </li>
                <li @click="delPost(post)" class="hover:bg-gray-100">
                  刪除貼文
                </li>
              </ul>
            </div>
          </div>
        </button>
      </div>
      <!-- 貼文 -->
      <div>
        <!-- 貼文編輯框 -->
        <div v-if="isEdit === post._id">
          <textarea
            class="mb-4 placeholder:italic placeholder:text-slate-400 block bg-white w-full border-2 border-secondary py-3 px-4 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
            placeholder="輸入您的貼文內容"
            name="post"
            rows="5"
            v-model="post.content"
          />
        </div>
        <!-- 貼文內容 -->
        <p v-else class="font-noto-sans-tc text-base mb-4">
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
      <!-- 貼圖編輯框 -->
      <div v-if="isEdit === post._id" class="mb-4">
        <label for="uploadImg" class="relative block mb-5">
          <input
            type="text"
            name="uploadImg"
            class="p-2 placeholder:italic placeholder:text-slate-400 placeholder:text-sm w-full block bg-white border border-slate-300 rounded-md focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
            aria-label="請輸入圖片網址或上傳圖檔"
            placeholder="請輸入圖片連結位址"
            v-model="post.image"
          />
        </label>
        <div class="flex justify-between">
          <label
            for="file"
            class="relative mb-4 flex items-center justify-center text-white bg-black w-30 h-10"
          >
            <input
              @change="uploadImg"
              type="file"
              class="absolute top-0 left-0 cursor-pointer opacity-0 w-full h-full"
            />
            <button type="button" class="whitespace-nowrap py-1 px-6">
              上傳圖片檔
            </button>
          </label>
          <!-- 完成編輯貼文按鈕 -->
          <button
            type="button"
            @click="editPost(post)"
            class="bg-blue-600 text-white whitespace-nowrap py-1 px-6 w-30 h-10"
          >
            完成編輯
          </button>
        </div>
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
              v-model="commentBody[post._id]"
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
      commentBody: {},
      isEdit: '',
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
      if (post.likes.includes(this.user._id)) {
        httpStatus = 'DELETE';
      } else {
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
        comment: this.commentBody[post._id],
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
    setEditStatus(id) {
      console.log(id);
      this.isEdit = id;
    },
    delPost(post) {
      const url = `${import.meta.env.VITE_BASE_API}/posts/${post._id}`;
      const token = document.cookie
        .split(`AUTH_TOKEN=`)
        .pop()
        .split(';')
        .shift();

      this.$swal
        .fire({
          title: `確定要刪除此篇貼文嗎？`,
          text: '貼文刪除後將無法恢復。',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: '確定刪除！',
          cancelButtonText: '取消',
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.isLoading = true;
            this.axios({
              method: 'DELETE',
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
                this.$swal.fire({
                  icon: 'error',
                  title: '失敗！',
                  text: '請再試一次',
                });
                console.dir(err);
              });
          }
        });
    },
    uploadImg(e) {
      this.isLoading = true;
      let url = `${import.meta.env.VITE_BASE_API}/upload`;
      const token = document.cookie
        .split(`AUTH_TOKEN=`)
        .pop()
        .split(';')
        .shift();
      let data = new FormData();
      const file = e.target.files[0];
      data.append('file', file);
      this.axios({
        method: 'POST',
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data,
      })
        .then((res) => {
          this.isLoading = false;
          this.errorMsg = '';
          this.post.image = res.data.imgUrl;
        })
        .catch((err) => {
          this.isLoading = false;
          this.errorMsg = err.response.data.message;
        });
    },
    editPost(post) {
      let url = `${import.meta.env.VITE_BASE_API}/posts/${post._id}`;
      const token = document.cookie
        .split(`AUTH_TOKEN=`)
        .pop()
        .split(';')
        .shift();
      const data = {
        content: post.content,
        image: post.image,
        privacy: post.privacy,
      };
      this.axios({
        method: 'PATCH',
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data,
      })
        .then(() => {
          this.isLoading = false;
          this.getPosts('desc', '', '', false);
        })
        .catch((err) => {
          this.isLoading = false;
          console.dir(err);
        });

      // 恢復未編輯狀態
      this.isEdit = '';
    },
  },
};
</script>
