import { LitElement, html, css } from 'lit-element';

export class DrumMachine extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      page: { type: String },
      currentSong: {type: String },
      lastButton: {type: Object},
    };
  }
  constructor(){
    super();
  }
  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #1a2b42;
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
      }
      #drum-machine{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 5px 5px;
      }
      #display{
        grid-column: 1/-1;
      }
      .drum-pad{
        --pad-width: auto;
        --pad-height: auto;
        width: var(--pad-width);
        height: var(--pad-height);
      }
      @media (max-width: 500px) {
        .drum-pad{
          --pad-width: 100px;
          --pad-height: 100px;
        }
      }
    `;
  }

  async playSong(e){
    // this.setAttribute("currentSong", e.target.id);
    this.currentSong = e.target.id;
    let audio = e.target.querySelector('audio'); 
    audio.load();
    audio.play();
  }

  connectedCallback() {
    super.connectedCallback();
    const keymap = {
      q: "Chord-1",
      w: "Chord-2",
      e: "Chord-3",
      a: "Shaker",
      s: "Open-HH",
      d: "Closed-HH",
      z: "Punchy-Kick",
      x: "Side-Stick",
      c: "Snare",
    }

    document.addEventListener('keydown', (e)=>{
      const button = this.shadowRoot.querySelector(`#${keymap[e.key]}`);
      button.focus();
      button.click();
    });
  }
  disconnectedCallback(){
     document.removeEventListener('keydown');
  }
  render() {
    return html`
      <main id="drum-machine">
        <section id="display">Last Song played: 
          <div>${this.currentSong}</div>
        </section>
        <button @click="${this.playSong}" class="drum-pad" id="Chord-1">
          <span>Q</span>
          <audio src="https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3" class="clip" id="Q"></audio> 
        </button>
        <button @click="${this.playSong}" class="drum-pad" id="Chord-2">
          <span>W</span>
          <audio src="https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3" class="clip" id="W"></audio> 
        </button>
        <button @click="${this.playSong}" class="drum-pad" id="Chord-3">
          <span>E</span>
          <audio src="https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3" class="clip" id="E"></audio> 
        </button>
        <button @click="${this.playSong}" class="drum-pad" id="Shaker">
          <span>A</span>
          <audio src="https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3" class="clip" id="A"></audio> 
        </button>
        <button @click="${this.playSong}" class="drum-pad" id="Open-HH">
          <span>S</span>
          <audio src="https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3" class="clip" id="S"></audio> 
        </button>
        <button @click="${this.playSong}" class="drum-pad" id="Closed-HH">
          <span>D</span>
          <audio src="https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3" class="clip" id="D"></audio> 
        </button>
        <button @click="${this.playSong}" class="drum-pad" id="Punchy-Kick">
          <span>Z</span>
          <audio src="https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3" class="clip" id="Z"></audio> 
        </button>
        <button @click="${this.playSong}" class="drum-pad" id="Side-Stick">
          <span>X</span>
          <audio src="https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3" class="clip" id="X"></audio> 
        </button>
        <button @click="${this.playSong}" class="drum-pad" id="Snare">
          <span>C</span>
          <audio src="https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3" class="clip" id="C"></audio> 
        </button>
      </main>
      <p>
        Touch one of the buttons or press one of they keys showed
        in the buttons
      </p>
    `;
  }
}
