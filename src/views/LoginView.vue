<template>
  <div class="min-h-screen w-screen bg-gray-1 lg:bg-grid lg:flex">
    <div
      id="loginPlatform"
      class="grid grid-cols-1 sm:grid-cols-2 sm:gap-6 md:gap-12 p-8 sm:px-12 sm:py-24 border-0 lg:border-2 border-solid border-secondary bg-gray-1 m-auto"
    >
      <div class="hidden sm:block">
        <img
          class="h-full w-full"
          src="../assets/login_img.svg"
          alt="MetaWall image"
        />
      </div>
      <div class="flex flex-col items-center">
        <h1 class="font-paytone-one text-5xl md:text-6xl text-primary mb-2">
          MetaWall
        </h1>
        <h2 class="text-xl md:text-2xl font-bold sm:mb-9">
          到元宇宙展開全新社交圈
        </h2>
        <div class="sm:hidden my-6">
          <img
            class="h-full w-full"
            style="max-width: 180px"
            src="../assets/login_img.svg"
            alt="MetaWall image"
          />
        </div>
        <label class="w-full mb-4">
          <span class="sr-only">Email</span>
          <input
            class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border-2 border-secondary px-6 py-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
            placeholder="Email"
            type="email"
            name="email"
          />
        </label>
        <label class="w-full mb-6">
          <span class="sr-only">Email</span>
          <input
            class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border-2 border-secondary px-6 py-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
            placeholder="Password"
            type="password"
            name="password"
          />
        </label>
        <button
          class="w-full py-4 rounded-lg bg-primary hover:bg-blue-700 text-white font-bold text-base mb-4"
        >
          登入
        </button>
        <button class="text-secondary font-bold text-base">註冊帳號</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#loginPlatform {
  @media (min-width: 1024px) {
    position: relative;
    height: 535px;
    width: 869px;
    box-shadow: -8px 8px 0 0 #00040029;
  }
}
</style>
