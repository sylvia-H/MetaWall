<template>
  <h2 class="text-xl md:text-2xl font-bold sm:mb-9">註冊</h2>
  <div class="sm:hidden my-6">
    <img
      class="h-full w-full"
      style="max-width: 180px"
      src="../assets/login_img.svg"
      alt="MetaWall image"
    />
  </div>
  <label class="w-full mb-4">
    <span class="sr-only">Nickname</span>
    <input
      class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border-2 border-secondary px-6 py-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
      placeholder="暱稱"
      type="text"
      name="nickname"
    />
  </label>
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
    <span class="sr-only">Password</span>
    <input
      class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border-2 border-secondary px-6 py-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
      placeholder="Password"
      type="password"
      name="password"
    />
  </label>
  <button
    class="w-full py-4 rounded-lg bg-gray-2 border-2 border-gray-4 hover:bg-blue-700 text-white font-bold text-base mb-4"
  >
    註冊
  </button>
  <button class="text-secondary font-bold text-base">登入</button>
</template>
