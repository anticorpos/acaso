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
    this.shareCode = window.location.href.replace("projeto", "video")
  },
  methods: {
    copyToClipboard() {
      console.log(this.shareCode)
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
        Um outro fim do mundo é possível. Em nossas mãos se encontra inscrito o futuro próximo. Ou melhor, os futuros possíveis. Dizem que na palma de nossas mãos está registrado o destino que nos cabe neste mundo, para aqueles capazes de lê-lo. Mas talvez o futuro que está em nossas mãos pertença mais às suas possíveis ações do que apenas aos sulcos que as atravessam. Questionados sobre quais outros fins do mundo seriam possíveis, as dançarines do coletivo Anticorpos - investigações em dança buscaram construir suas ações poéticas inspiradas em um tarot autoral, construído pelo artista Cláudio Zarco, no qual propõe 3 arcanos, 3 diferentes sequências de cartas. O mesmo tarot é oferecido ao/à jogador/a que acessa o nosso site para que, na escolha das cartas, sejam criadas combinações aleatórias entre os fragmentos dos vídeos pré-gravados. Cada fileira de cartas corresponde a uma parte do corpo, bem como a diferentes efeitos e temporalidades da imagem. Ao final, de forma aleatória, é incluída uma das músicas do artista Ayrala. Neste sentido, o/a jogador/a é então convidado a co-criar um pequeno videodança que poderá depois salvar e compartilhar em suas redes sociais, disseminando a sua composição de outros fins de mundo possíveis.
        </p>
      </div>

      <div class="share" v-if="id" @click="copyToClipboard">
        <img src="src/imgs/logo-acaso.png" />
        <p>Clique na imagem para copiar o link e compartilhar o seu vídeo</p>
      </div>

      <router-link to="/jogo">começar</router-link>

    </div>
  </div>
  `,
};

