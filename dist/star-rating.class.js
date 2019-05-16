class StarRating extends HTMLElement {
  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.innerHTML = `
  <div class="star-rating_container">

  </div>
<style>.star-rating_star {
  color: var(--star-rating-color, black);
  display: inline-block;
  font-size: var(--star-rating-font-size, 150%);
  height: 1em;
  position: relative;
  width: 1em;
}

.star-rating_star::before {
  content: '\\2606';
  left: 0;
  position: absolute;
  top: 0;
}

.star-rating_solid::before {
  content: '\\2605';
  position: absolute;
  top: 0;
  left: 0;
}</style>`;
    this._rating = 0;
    this._maxScore = parseInt(this.getAttribute('stars'), 10) || 5;
    let html = '';

    for (let i = 1; i <= this._maxScore; i++) {
      html += `<div class="star-rating_star" data-position="${i}"></div>`;
    }

    this.querySelector('.star-rating_container').innerHTML = html;
    this.rating = parseInt(this.getAttribute('rating'), 10) || 0;
    this.addEventListener('click', event => {
      let positionClicked = parseInt(event.target.getAttribute('data-position'), 10);
      this.rating = positionClicked;
    });
  }

  dispatchChange() {
    let event = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: {
        rating: this._rating
      }
    });
    this.dispatchEvent(event);
  }

  set rating(newRating) {
    if (newRating === this._rating) {
      this._rating = 0;
    } else {
      this._rating = newRating;
    }

    for (let i = 1; i < this._maxScore + 1; i++) {
      let star = this.querySelector(`[data-position="${i}"]`);

      if (i > this._rating) {
        star.classList.remove('star-rating_solid');
      } else {
        star.classList.add('star-rating_solid');
      }
    }

    this.dispatchChange();
  }

  querySelector(selector) {
    return this.shadowRoot.querySelector(selector);
  }

  querySelectorAll(selector) {
    return this.shadowRoot.querySelectorAll(selector);
  }

  addEventListener() {
    return this.shadowRoot.addEventListener.apply(this.shadowRoot, arguments);
  }

}

customElements.define('star-rating', StarRating);