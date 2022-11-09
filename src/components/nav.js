const NavComponent = {
  props: [
    'home'
  ],
  template: `
    <div id="nav">
      <img class="logo-ac" src="src/imgs/logo-ac-10anos.png" />
      <img v-if="!home" src="src/imgs/logo-acaso.png" />
      <nav>
        <router-link to="/jogo">começar</router-link>
        <router-link to="/projeto">projeto</router-link>
        <router-link to="/grupo">grupo</router-link>
        <router-link to="/creditos">créditos</router-link>
      </nav>
    </div>
  `,
};
