const VideoView = {
  data() {
    return {
      id: this.$route.params.id,
      boxWidth: 0,
      boxHeight: 0,
      isLoaded: false,
      isPlaying: false,
    }
  },
  computed: {
    videoLink() {
      return "./src/videos/output" + this.id + ".mp4"
    }
  },
  created() {
    window.addEventListener("resize", () => {
      this.boxWidth = this.$refs.videoBox.clientWidth
      this.boxHeight = this.$refs.videoBox.clientHeight
    });
  },
  mounted() {
    this.$refs.video.addEventListener('loadeddata', () => {
      if (this.$refs.video.readyState === 4) {
        this.isLoaded = true
      }
    });
    this.$refs.video.addEventListener('ended', () => {
      this.$router.push({ path: '/jogo' })
    });
  },
  methods: {
    playVideo() {
      this.isPlaying = true
      setTimeout(() => {
        this.boxWidth = this.$refs.videoBox.clientWidth
        this.boxHeight = this.$refs.videoBox.clientHeight
        this.$refs.video.play()
      }, 1000)
    }
  },
  template: `
    <div id="video">
      <div class="loader" v-if="!isPlaying">
        <p v-if="!isLoaded">Carregando...</p>
        <p v-if="isLoaded">Carregado</p>
        <button v-if="isLoaded" @click="playVideo()">Seguir</button>
      </div>
      <div class="video-container" ref="videoBox" v-show="isPlaying">
        <video :width="boxWidth" :height="boxHeight" autoplay ref="video">
          <source :src="videoLink" type="video/mp4" />
        </video>
      </div>
    </div>
  `
}