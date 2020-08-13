var cacheFiles = ['./index.html', './main.js'];

var cacheName = '202008301740'; // 打包出的hash值

// 监听install事件，来进行相关文件的缓存操作：
self.addEventListener('install', function (e) {
  console.log('Service Worker 状态： install')
  // https://developer.mozilla.org/zh-CN/docs/Web/API/CacheStorage 你可以通过 caches 属性访问 CacheStorage .
  // 返回一个 Promise ，resolve为匹配  cacheName （如果不存在则创建一个新的cache）的 Cache 对象
  var cacheOpenPromise = caches.open(cacheName).then(function (cache) {
    return cache.addAll(cacheFiles);
  })
  // 在一个与 install 事件相关联的 EventHandler 被调用时，它延迟将被安装的worker视为 installing ，直到传递的 Promise 被成功地resolve。
  // 这主要用于确保：服务工作线程在所有依赖的核心cache被缓存之前都不会被安装。
  e.waitUntil(cacheOpenPromise)
})

// 监听fetch事件来使用缓存数据
self.addEventListener('fetch', function (e) {
  // console.log('现在正在请求：' + e.request.url)

  e.respondWith(
    // 判断当前请求是否需要缓存
    caches.match(e.request).then(function (cache) {
      // console.log(e.request.url, '获取的cache>>>>', cache);
      // 有缓存就用缓存，没有就从新发请求获取
      return cache || fetch(e.request)
    }).catch(function (err) {
      console.log(err)
      // 缓存报错还直接从新发请求获取
      return fetch(e.request)
    })
  )
})

// 监听activate事件，激活后通过cache的key来判断是否更新cache中的静态资源
self.addEventListener('activate', function (e) {
  console.log('Service Worker 状态： jiba')
  // var cachePromise = caches.keys().then(function (keys) {
  //   // 遍历当前scope使用的key值
  //   return Promise.all(keys.map(function (key) {
  //     // 如果新获取到的key和之前缓存的key不一致，就删除之前版本的缓存
  //     if (key !== cacheName) {
  //       return caches.delete(key)
  //     }
  //   }))
  // })
  // e.waitUntil(cachePromise)
  // // 保证第一次加载fetch触发
  // return self.clients.claim()
})