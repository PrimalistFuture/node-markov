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
      if (!(this.words[i] in wordChain)) {
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

    let word;
    while (true) {
      word = MarkovMachine.randomFrom(this.chains[markovChain[markovChain.length - 1]]);
      if (word === null) {
        break;
      } else {
        markovChain.push(word);
      }
    }
    return markovChain.join(' ');
  }

  /** Static method to return a random value from an array */
  static randomFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

}


let text = new MarkovMachine(`Four score and seven years ago our fathers brought forth on this continent, a
new nation, conceived in Liberty, and dedicated to the proposition that all men
[sic] are created equal.

Now we are engaged in a great civil war, testing whether that nation, or any
nation so conceived and so dedicated, can long endure. We are met on a great
battlefield of that war. We have come to dedicate a portion of that field, as
a final resting place for those who here gave their lives that that nation
might live. It is altogether fitting and proper that we should do this.

But, in a larger sense, we can not dedicate -- we can not consecrate -- we can
not hallow -- this ground. The brave men, living and dead, who struggled here,
have consecrated it, far above our poor power to add or detract. The world will
little note, nor long remember what we say here, but it can never forget what
they did here. It is for us the living, rather, to be dedicated here to the
unfinished work which they who fought here have thus far so nobly advanced. It
is rather for us to be here dedicated to the great task remaining before us --
that from these honored dead we take increased devotion to that cause for which
they gave the last full measure of devotion -- that we here highly resolve that
these dead shall not have died in vain -- that this nation, under God, shall
have a new birth of freedom -- and that government of the people, by the
people, for the people, shall not perish from the earth.`);

console.log(text.getText());