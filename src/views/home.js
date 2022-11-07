const HomeView = {
  components: [
    NavComponent,
  ],
  template: `
  <div id="home" class="nav-view">
    <NavComponent :home="true" />
    <div class="view">
      <div class="logo">
        <img src="src/imgs/logo-acaso.png" />
      </div>
    </div>
  </div>
  `
}