const JogoView = {
  components: [
    CardBox,
    NavComponent,
  ],
  data() {
    return {
      cards: cardsData,
      hand: {
        count: 0,
        corpo: null,
        movimento: null,
        encanto: null,
      },
      removeds: [],
      videos: [],
      isPaused: true,
      isPlay: false,
      maxVideos: 5,
      thumbs: '',
    }
  },
  computed: {
    corpoCards() {
      return this.cards.filter((e) => e.type == 'corpo' && !this.removeds.includes(e.id) )
    },
    encantoCards() {
      return this.cards.filter((e) => e.type == 'encanto' && !this.removeds.includes(e.id) )
    },
    movimentoCards() {
      return this.cards.filter((e) => e.type == 'movimento' && !this.removeds.includes(e.id) )
    },
  },
  methods: {
    selectCard(card) {
      this.hand[card.type] = card
      this.hand.count += 1
      if ( this.hand.count == 3 ) {
        this.isPaused = false
      }
    },
    getVideoId() {
      const corpo = {
        cabeca: ["Cabeça", "Boca", "Nariz", "Olhos", "Orelhas"],
        torco: ["Coluna", "Mãos", "Braços", "Torço"],
        bacia: ["Pernas", "Pés", "Quadril"],
      }

      const movimento = {
        nofilter: ["Fluxo", "Ritmo", "Tempo"],
        invertido: ["Espaço", "Repetição", "Tensão"],
        peb: ["Deslocamento", "Níveis"],
        sobreposicao: ["Direção", "Peso"],
        negativo: ["Eixo", "Queda"],
      }

      let limit = 0;
      let videoFilename = "";
      if (corpo.cabeca.includes(this.hand.corpo.name)) {
        videoFilename += 'cabeca';
        limit = 11;
      }
      if (corpo.torco.includes(this.hand.corpo.name)) {
        videoFilename += 'torco';
        limit = 17;
      }
      if (corpo.bacia.includes(this.hand.corpo.name)) {
        videoFilename += 'bacia';
        limit = 12;
      }

      if (movimento.nofilter.includes(this.hand.movimento.name)) {
        videoFilename += '_';
      }
      if (movimento.invertido.includes(this.hand.movimento.name)) {
        if (videoFilename == 'bacia') {
          limit = 11
        }
        if (videoFilename == 'torco') {
          limit = 16
        }
        if (videoFilename == 'cabeca') {
          videoFilename += '_invertida_';
        } else {
          videoFilename += '_invertido_';
        }
      }
      if (movimento.peb.includes(this.hand.movimento.name)) {
        if (videoFilename == 'bacia') {
          limit = 11
          videoFilename += '_peb_alt_';
        } else if (videoFilename == 'cabeca') {
          videoFilename += '_peb_alt_';
        } else {
          videoFilename += '_peb_';
        }
      }
      if (movimento.sobreposicao.includes(this.hand.movimento.name)) {
        if (videoFilename == 'bacia') {
          limit = 11
          videoFilename += '_sobreposicao_alt_';
        } else if (videoFilename == 'cabeca') {
          videoFilename += '_sobreposicao_alt_';
        } else {
          videoFilename += '_sobreposicao_';
        }
      }
      if (movimento.negativo.includes(this.hand.movimento.name)) {
        if (videoFilename == 'cabeca') {
          videoFilename += '_negativa_';
        } else {
          videoFilename += '_negativo_';
        }
      }

      videoFilename += Number(this.hand.encanto.id) % limit;
      this.thumbs = videoFilename + '.gif';
      console.log(this.thumbs)
      videoFilename += '.m4v';

      const videoId = videosData.find((e) => e.name == videoFilename).id
      console.log(videoId, videoFilename)
      return videoId
    },
    nextVideo() {
      if (this.videos.length < this.maxVideos) {
        this.videos.push(this.getVideoId())
        this.isPaused = true;
        this.removeds.push(this.hand.corpo.id)
        this.removeds.push(this.hand.movimento.id)
        this.removeds.push(this.hand.encanto.id)
        this.hand = {
          count: 0,
          corpo: null,
          movimento: null,
          encanto: null,
        }
        if (this.videos.length == this.maxVideos) {
          this.isPlay = true
        }
      } else {
        this.goToVideo()
      }
    },
    goToVideo() {
      const musicId = Math.floor(Math.random() * 9)
      this.videos.push(musicId)
      const finalIds = this.videos.join('-')
      console.log(finalIds)
      this.$router.push({ path: '/video/'+finalIds })
    }
  },
  template: `
<div id="game" class="nav-view">

  <NavComponent />
  <div class="view">

    <div class="main">

      <div class="container">

        <div class="deck-cards">
          <CardBox :cards="corpoCards" @pick="selectCard" :blocked="isPlay" />
          <CardBox :cards="encantoCards" @pick="selectCard" :blocked="isPlay" />
          <CardBox :cards="movimentoCards" @pick="selectCard" :blocked="isPlay" />
        </div>

        <div class="control">
          <div class="cards-hand">
            <div class="card-wrapper">
              <img v-if="hand.corpo" :src="hand.corpo.url" />
              <img v-else src="src/imgs/cards/back.jpeg" />
            </div>
            <div class="card-wrapper">
              <img v-if="hand.encanto" :src="hand.encanto.url" />
              <img v-else src="src/imgs/cards/back.jpeg" />
            </div>
            <div class="card-wrapper">
              <img v-if="hand.movimento" :src="hand.movimento.url" />
              <img v-else src="src/imgs/cards/back.jpeg" />
            </div>
          </div>
          
          <div class="preview">
            <div class="thumbs">
              <div v-if="thumbs">
                <img :src="'src/videos/thumbs/'+thumbs" />
              </div>
              <div v-else>
                <p style="color: red;"><b>Instruções:</b></p>
                <p>1) Faça uma combinação escolhendo uma carta de cada fileira;</p>
                <p>2) Aperte play para incluir o vídeo resultante na timeline;</p>
                <p>3) Repita o procedimento por 5 vezes, até completar a timeline;</p>
                <p>4) Aperte o play para assistir ao vídeo final;</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="timeline">
        <div class="line">
          <div
            class="progress" 
            :style="{
              width: 20 * videos.length + '%',
            }"
          >
          </div>
        </div>
        <button class="play" :class="{ paused: isPaused && !isPlay }" @click="nextVideo()"></button>
      </div>

    </div>
  </div>
</div>
  `,
};
