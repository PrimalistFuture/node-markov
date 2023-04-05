/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns Map of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */
  // Loop over input text
  // if the word is not a key in the object,
  // add it as a key and add the next word as a value.
  // if key in object
  // consider the null scenario
  getChains() {
    // TODO: implement this!
    let wordChain = {};
    for (let i = 0; i < this.words.length; i++) {
      if (wordChain[this.words[i]] === undefined) {
        wordChain[this.words[i]] = [];
      }
      if (i === this.words.length - 1) {
        wordChain[this.words[i]].push(null);
      } else {
        wordChain[this.words[i]].push(this.words[i + 1]);
      }
    }
    return wordChain;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    // TODO: implement this!

    // - start at the first word in the input text
    // - find a random word from the following-words of that markovChain
    // - repeat until reaching the terminal null
    let markovChain = [this.words[0]];

    while (true) {
      let word = randomFrom(markovChain[markovChain.length-1]);
      if (word === null) {
        break;
      } else {
        markovChain.push(word);
      }
    }
  return markovChain;
  }
}

function randomFrom(array) {
  return array[Math.floor(Math.random()*array.length)];
}

let text = new MarkovMachine("I am a very pretty little cat. Cat is a pretty wild animal.");

console.log(text.getText());