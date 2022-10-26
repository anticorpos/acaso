const CardsView = {
  data() {
    return {
      cards: cardsData,
      quotes: quotesData,
      quoteIndex: 0,
      selecteds: [],
      boxWidth: 0,
    }
  },
  created() {
    window.addEventListener("resize", () => {
      this.boxWidth = this.$refs.cardBox.clientWidth
    });
  },
  mounted() {
    this.boxWidth = this.$refs.cardBox.clientWidth;
  },
  computed: {
    quote() {
      return this.quotes[this.quoteIndex]
    },
  },
  methods: {
    setQuote(value) {
      if (this.quoteIndex == 0 && value < 0) {
        this.quoteIndex = this.quotes.length
      }
      this.quoteIndex = (this.quoteIndex + value) % this.quotes.length
    },
    getXPosition(index) {
      return -index * 100 + (index + 1) * (this.boxWidth/this.cards.length) - (100/this.cards.length)*(index + 1)
    },
    getYPosition(index) {
      return -0.4*Math.pow((index-(this.cards.length/2)), 2)
    },
    getRotationDeg(index) {
      return 1.2*(index-(this.cards.length/2))
    },
    isSelected(card) {
      return this.selecteds.some(id => id === card.id)
    },
    selectCard(card) {
      if (this.isSelected(card)) {
        this.selecteds = this.selecteds.filter((value) => value !== card.id)
      } else if (this.selecteds.length < 3) {
        this.selecteds.push(card.id)
      }
    },
    goToVideo() {
      this.$router.push({ path: '/video/9' })
    }
  },
  template: `
  <div id="cardpick">
    <div class="quotes">
      <button @click="setQuote(-1)"> &lt; </button>
      <div class="quote" id="quote.id">
        <p>{{ quote.quote }}</p>
      </div>
      <button @click="setQuote(+1)"> &gt; </button>
    </div>
    <div class="continue" v-if="selecteds.length === 3">
      <button @click="goToVideo()"> Seguir </button>
    </div>
    <div class="deck-cards">
      <div class="cards-box" ref="cardBox">
        <div
          v-for="(card, index) in cards"
          :key="card.url"
          :id="card.id"
          :name="card.name"
          :style="{
            left: getXPosition(index) + 'px',
            transform: 'rotate(' + getRotationDeg(index) + 'deg)',
            bottom: getYPosition(index) + 'px',
          }"
          @click="selectCard(card)"
          :class="{ selected: isSelected(card)}"
          class="deck-card draggable-card reverse"
        >
          <div class="card-wrapper">
              <div class="front">
                <img :src="card.url" />
              </div>
              <div class="back">
                <img src="src/imgs/cards/back.jpeg" />
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
};
