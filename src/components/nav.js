const NavComponent = {
  props: [
    'home'
  ],
  template: `
    <div id="nav">
      <img class="logo-ac" src="src/imgs/logo-ac-10anos.png" />
      <router-link to="/"><img v-if="!home" src="src/imgs/logo-acaso.png" /></router-link>
      <nav>
        <router-link to="/projeto">início</router-link>
        <router-link to="/grupo">grupo</router-link>
        <router-link to="/creditos">créditos</router-link>
      </nav>
    </div>
  `,
};
