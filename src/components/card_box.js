const CardBox = {
  props: [
    'cards',
    'blocked',
  ],
  data() {
    return {
      boxWidth: 0,
      selecteds: [],
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
  methods: {
    setQuote(value) {
      if (this.quoteIndex == 0 && value < 0) {
        this.quoteIndex = this.quotes.length
      }
      this.quoteIndex = (this.quoteIndex + value) % this.quotes.length
    },
    getXPosition(index) {
      return -index * 100 + index * (this.boxWidth/this.cards.length) - (100/this.cards.length)*index
    },
    isSelected(card) {
      return this.selecteds.some(id => id === card.id)
    },
    selectCard(card) {
      if (this.blocked) return
      this.selecteds = [card.id]
      this.$emit('pick', card)
    },
  },
  template: `
  <div class="cards-box" ref="cardBox">
    <div
      v-for="(card, index) in cards"
      :key="card.url"
      :id="card.id"
      :name="card.name"
      :style="{
        left: getXPosition(index) + 'px',
        // transform: 'rotate(' + getRotationDeg(index) + 'deg)',
        // bottom: getYPosition(index) + 'px',
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
  `,
};
