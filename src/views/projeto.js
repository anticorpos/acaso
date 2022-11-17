const ProjetoView = {
  components: [
    NavComponent,
  ],
  data() {
    return {
      id: this.$route.params.id,
      shareCode: '',
    }
  },
  mounted() {
    this.shareCode = window.location.href
  },
  methods: {
    copyToClipboard() {
      navigator.clipboard && navigator.clipboard.writeText(this.shareCode)
    },
  },
  template: `
  <div id="projeto" class="nav-view">

    <NavComponent />

    <div class="view">
      <div class="text">
        <h1>PROJETO</h1>
        <p>
          Um outro fim do mundo é possível. Em nossas mãos se encontra inscrito o futuro próximo. Ou melhor, os futuros possíveis. Dizem que na palma de nossas mãos está registrado o destino que nos cabe neste mundo, para aqueles capazes de lê-lo. Mas talvez o futuro que está em nossas mãos pertença mais às suas possíveis ações do que apenas aos sulcos que as atravessam. 
          Questionados sobre quais outros fins do mundo seriam possíveis, os dançarines do coletivo Anticorpos - investigações em dança buscaram construir suas ações poéticas inspiradas em um tarot autoral, construído pelo artista Cláudio Zarco, no qual propõe 3 arcanos, 3 diferentes sequências de cartas. 
          O mesmo tarot é oferecido ao/à jogador/a que acessa o nosso site para que, na escolha das cartas, sejam criadas combinações aleatórias entre os fragmentos dos vídeos pré-gravados, com diferentes efeitos e temporalidades. Neste sentido, o/a jogador/a é então convidado a co-criar um pequeno vídeodança que poderá depois salvar e compartilhar em suas redes sociais, disseminando a sua composição de outros fins de mundo possíveis.
        </p>
      </div>

      <div class="share" v-if="id">
        <span>Compartilhe com o link: </span>
        <input type="text" :value="shareCode" readonly @click="copyToClipboard">
      </div>

      <router-link to="/jogo">começar</router-link>

    </div>
  </div>
  `,
};

