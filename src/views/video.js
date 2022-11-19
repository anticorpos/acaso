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
      isShared: this.$route.params.share,
      musicId: 0,
      audio: null,
    }
  },
  created() {
    const videosIds = this.id.split("-")
    this.musicId = videosIds.pop()
    this.videos = videosIds.map((id) => videosData.find((v) => v.id == id))
    console.log(this.musicId)

    window.addEventListener("resize", () => {
      this.boxWidth = this.$refs.videoBox.clientWidth
      this.boxHeight = this.$refs.videoBox.clientHeight
    });
  },
  mounted() {

    this.sourceVideos = [
      "acaso_vinheta.m4v",
      ...this.videos.map((v) => v.name),
      "acaso_fim.m4v"
    ]
    console.log(this.sourceVideos)
    const video = document.getElementById("player");

    const play = () => {
      this.boxWidth = this.$refs.videoBox.clientWidth
      this.boxHeight = this.$refs.videoBox.clientHeight

      // play music
      if (this.counter == 1) {
        this.audio = new Audio('src/musicas/' + this.musicId + '.mp3')
        this.audio.play()
      }
      // fade out music
      if (this.counter == this.sourceVideos.length - 1) {
        const interval = setInterval(()=>{
          const newVolume = this.audio.volume - 0.1;
          if(newVolume >= 0){
            this.audio.volume = newVolume;
          }
          else{
            // Stop fade
            clearInterval(interval);
            this.audio.pause();
            this.audio.volume = 1;
          }
        }, 3000);
      }

      // play video
      if (this.counter == this.sourceVideos.length) {
        if (this.isShared) {
          this.$router.push({ path: '/' })
        } else {
          this.$router.push({ path: '/projeto/' + this.id + '/1' })
        }
      } else {
        video.src = this.videoLink(this.sourceVideos[this.counter]);
        this.counter++;
      }
    };
    video.addEventListener("ended", play, false);
    play();

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
        <video id="cache" width="0" height="0"></video>
      </div>
    </div>
  `
}
