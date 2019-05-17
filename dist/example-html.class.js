class ExampleHtml extends HTMLElement {
  // Shout out! https://gist.github.com/fernandosavio/5349619
  encode(str) {
    let div = document.createElement("div");
    div["textContent" in div ? "textContent" : "innerText"] = str;
    return div.innerHTML;
  }

  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.innerHTML = `<slot></slot>`;
    setTimeout(() => {
      let codez = this.innerHTML;
      let example = this.encode(codez);
      this.innerHTML = `
<dt><code><pre>${example}</pre></code></dt>
<dd>
${codez}
</dd>
`;
    }, 0);
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

customElements.define('example-html', ExampleHtml);