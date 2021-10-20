const words = [
  {
    word: 'make web apps',
    translateX: '-10px',
    rotate: '-5deg',
    top: '40px',
    delay: '0s',
  },
  {
    word: 'live in the front and backend',
    translateX: '40px',
    rotate: '-20deg',
    top: '90px',
  },
  {
    word: 'care about accessibility',
    translateX: '100px',
    rotate: '10deg',
    top: '80px',
  },
  {
    word: 'make solid UX',
    translateX: '100px',
    rotate: '10deg',
    top: '80px',
  },
  {
    word: 'write tidy javascript',
    translateX: '40px',
    rotate: '-20deg',
    top: '90px',
  },
  {
    word: 'love user testing',
    translateX: '-30px',
    rotate: '10deg',
    top: '110px',
  },
  {
    word: 'prefer typescript',
    translateX: '40px',
    rotate: '-20deg',
    top: '90px',
  },
  {
    word: 'unit, integration and end to end test',
    translateX: '40px',
    rotate: '15deg',
    top: '90px',
  },
  {
    word: 'write clean sass and css',
    translateX: '-35px',
    rotate: '-10deg',
    top: '230px',
  },
  {
    word: 'prototype and mockup in Figma',
    translateX: '70px',
    rotate: '30deg',
    top: '180px',
  },
  {
    word: 'adore slackbots',
    translateX: '-50px',
    rotate: '-20deg',
    top: '120px',
  },
];

const placeholderText = document.getElementById('placeholder-text');

const createFallingWrapper = (i) => {
  return new Promise((resolve, reject) => {
    const span = document.createElement('span');
    span.classList.add('falling-text');
    const id = `falling-text-${i}`;
    span.id = id;
    placeholderText.insertAdjacentElement('afterend', span);
    return resolve(id);
  });
};

const typeWord = (wordData, i) => {
  return new Promise((resolve, reject) => {
    createFallingWrapper(i).then((wordId) => {
      wordData.el = document.getElementById(wordId);
      wordData.el.classList.add('falling-text-prompt');
      if (!wordData.el) {
        return reject('no el');
      }
      const letters = wordData.word.split('');
      letters.forEach((l, i) => {
        setTimeout(() => {
          wordData.el.innerText = wordData.el.innerHTML + l;
          if (i === letters.length - 1) {
            return resolve(wordData);
          }
        }, 100 * (i + 1));
      });
    });
  });
};

const moveWord = (wordData) => {
  // togglePrompt();
  return new Promise((resolve, reject) => {
    wordData.el.classList.remove('falling-text-prompt');
    wordData.el.style = `
      color: rgba(255, 255, 255, 0.3);
      transform: rotate(${wordData.rotate}) translateX(${wordData.translateX});
      top: calc(100% - ${wordData.top});
      transition: top 2s ease-in 1s, transform 2s cubic-bezier(0.1, -0.6, 0.2, 1) 0.8s, color 8s ease-in 3s;
      `;
      setTimeout(() => {
        togglePrompt();
      }, 1200)
      setTimeout(() => {
        resolve(true);
    }, 2500);
  });
};

const togglePrompt = () => {
  const promptEl = document.querySelector('.prompt')
  promptEl.classList.toggle('hidden');
}

const startWordDrop = (i) => {
  togglePrompt()
  if (!words[i]) {
    typeWord(
      { word: 'lots of things :) ', el: placeholderText },
      words.length + 1
    );
    return;
  }
  typeWord(words[i], i)
    .then(moveWord)
    .then(() => {togglePrompt
      startWordDrop(i + 1);
    })
    .catch((err) => console.log(err));
};

setTimeout(() => {
  startWordDrop(0);
}, 1000)
