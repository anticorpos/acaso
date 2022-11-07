const VideoView = {
  data() {
    return {
      id: this.$route.params.id,
      counter: 0,
      videoPlaying: "",
      videos: [],
      boxWidth: 0,
      boxHeight: 0,
      isLoaded: false,
      isPlaying: false,
    }
  },
  created() {
    this.videos = this.id.split("-").map((id) => videosData.find((v) => v.id == id))

    window.addEventListener("resize", () => {
      this.boxWidth = this.$refs.videoBox.clientWidth
      this.boxHeight = this.$refs.videoBox.clientHeight
    });
  },
  mounted() {

    this.sourceVideos = [
      "acaso_inicio.m4v",
      ...this.videos.map((v) => v.name),
      "acaso_fim.m4v"
    ]
    console.log(this.sourceVideos)
    const video = document.getElementById("player");
    const play = ()=>{
      this.boxWidth = this.$refs.videoBox.clientWidth
      this.boxHeight = this.$refs.videoBox.clientHeight
      if (this.counter == this.sourceVideos.length) {
        this.$router.push({ path: '/' })
      } else {
        video.src = this.videoLink(this.sourceVideos[this.counter]);
        this.counter++;
      }
    };
    // window.onload = ()=>{
    video.addEventListener("ended", play, false);
    play();
    // }
  },
  methods: {
    videoLink(video) {
      return "src/videos/" + video
    }
  },
  template: `
    <div id="video">
      <div id="video-container" ref="videoBox">

        <video
          id="player"
          class="video-js"
          controls
          autoplay
          preload="auto"
          :width="boxWidth"
          :height="boxHeight"
        >
          <p class="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a
            web browser that
            <a href="https://videojs.com/html5-video-support/" target="_blank"
              >supports HTML5 video</a
            >
          </p>
        </video>
      </div>
    </div>
  `
}
