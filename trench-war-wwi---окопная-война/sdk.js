/**
 * Yandex Games SDK (YaGames) Local Fallback & Environment Shim
 * 
 * In production on Yandex Games, the platform server intercepts /sdk.js and provides
 * the official live YaGames SDK with live ads, real cloud saves, and platform telemetry.
 * 
 * This file provides a compliant local fallback when running in development,
 * preview, or alternative store wrappers (e.g. CrazyGames) so that calling
 * YaGames.init(), LoadingAPI, GameplayAPI, showFullscreenAdv, and showRewardedVideo
 * functions seamlessly without network 404s or uncaught exceptions.
 */

(function () {
  if (typeof window !== 'undefined' && !window.YaGames) {
    console.log('[YaGames Shim] Local SDK shim mounted for non-Yandex or dev environments');

    var mockStorage = {};
    try {
      var saved = localStorage.getItem('yagames_cloud_save');
      if (saved) mockStorage = JSON.parse(saved);
    } catch (e) {}

    var eventListeners = {};

    var mockPlayer = {
      getUniqueID: function () {
        return 'local_player_' + Math.floor(Math.random() * 10000);
      },
      getName: function () {
        return 'Commander';
      },
      getPhoto: function (size) {
        return '';
      },
      setData: function (data, flush) {
        return new Promise(function (resolve) {
          try {
            mockStorage = Object.assign({}, mockStorage, data);
            localStorage.setItem('yagames_cloud_save', JSON.stringify(mockStorage));
          } catch (e) {}
          resolve();
        });
      },
      getData: function (keys) {
        return new Promise(function (resolve) {
          try {
            var s = localStorage.getItem('yagames_cloud_save');
            resolve(s ? JSON.parse(s) : mockStorage);
          } catch (e) {
            resolve(mockStorage);
          }
        });
      },
      getStats: function () {
        return Promise.resolve({});
      },
      setStats: function () {
        return Promise.resolve();
      }
    };

    var mockSdk = {
      environment: {
        app: { id: 'trench-war-ww1' },
        browser: { lang: 'ru' },
        i18n: { lang: 'ru', tld: 'ru' }
      },
      features: {
        LoadingAPI: {
          ready: function () {
            console.log('[YaGames] LoadingAPI.ready() invoked - game assets ready');
          }
        },
        GameplayAPI: {
          start: function () {
            console.log('[YaGames] GameplayAPI.start() invoked - player active');
          },
          stop: function () {
            console.log('[YaGames] GameplayAPI.stop() invoked - gameplay paused');
          }
        }
      },
      adv: {
        showFullscreenAdv: function (options) {
          console.log('[YaGames] showFullscreenAdv requested');
          setTimeout(function () {
            if (options && options.callbacks && options.callbacks.onClose) {
              options.callbacks.onClose(true);
            }
          }, 350);
        },
        showRewardedVideo: function (options) {
          console.log('[YaGames] showRewardedVideo requested');
          setTimeout(function () {
            if (options && options.callbacks) {
              if (options.callbacks.onRewarded) options.callbacks.onRewarded();
              if (options.callbacks.onClose) options.callbacks.onClose();
            }
          }, 400);
        }
      },
      getPlayer: function () {
        return Promise.resolve(mockPlayer);
      },
      getStorage: function () {
        return Promise.resolve(window.localStorage);
      },
      on: function (event, handler) {
        if (!eventListeners[event]) eventListeners[event] = [];
        eventListeners[event].push(handler);
      },
      emit: function (event, data) {
        if (eventListeners[event]) {
          eventListeners[event].forEach(function (fn) {
            try { fn(data); } catch (err) { console.error(err); }
          });
        }
      }
    };

    window.YaGames = {
      init: function () {
        return Promise.resolve(mockSdk);
      }
    };
  }
})();
