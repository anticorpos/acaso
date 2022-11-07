const data = [
  "cards",
  "videos",
]
const components = [
  "nav",
  "card_box",
]
const views = [
  "home",
  "game",
  "video",
  "creditos",
  "grupo",
  "projeto",
]


function startApp() {

  const routes = [
    { path: "/", component: HomeView },
    { path: "/jogo", component: JogoView },
    { path: "/creditos", component: CreditoView },
    { path: "/projeto", component: ProjetoView },
    { path: "/grupo", component: GrupoView },
    {
      path: "/video/:id",
      name: "video",
      component: VideoView,
    },
  ];
  
  const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
  });
  
  const app = Vue.createApp({
    template: `
    <div class="wrapper">
      <main>
        <router-view></router-view>
      </main>
    </div>
    `
  });
  app.use(router);
  app.component('NavComponent', NavComponent);
  app.component('CardBox', CardBox);
  app.mount("#app");

}

const scriptNames = [
  ...data.map((e) => `src/js/data/${e}.js`),
  ...components.map((e) => `src/components/${e}.js`),
  ...views.map((e) => `src/views/${e}.js`),
];

(() => {
  const loadScript = (i) => {
    if (i < scriptNames.length) {
      var script = document.createElement('script');
      script.src = scriptNames[i];
      script.onload = () => {
        if (i < scriptNames.length) {
          loadScript(i + 1);
        }
      }
      document.body.appendChild(script);
    } else {
      startApp();
    }
  }
  loadScript(0);
})();