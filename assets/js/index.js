const words = [
  {
    word: 'design and code beautiful UX',
    translateX: '10px',
    rotate: '-2deg',
    top: '80px',
    delay: '0s',
  },
  {
    word: 'live in the front and backend',
    translateX: '-80px',
    rotate: '-15deg',
    top: '110px',
  },
  {
    word: 'put accessibility first',
    translateX: '100px',
    rotate: '2deg',
    top: '90px',
  },
  {
    word: 'reach for html, sass and typescript',
    translateX: '-50px',
    rotate: '-15deg',
    top: '115px',
  },
  {
    word: 'adore user testing',
    translateX: '-50px',
    rotate: '8deg',
    top: '130px',
  },
  {
    word: 'am at home in the cloud',
    translateX: '30px',
    rotate: '10deg',
    top: '85px',
  },
  {
    word: 'test all of the things',
    translateX: '-70px',
    rotate: '1deg',
    top: '115px',
  },
  {
    word: 'write pixel perfect css',
    translateX: '-25px',
    rotate: '-12deg',
    top: '195px',
  },
  {
    word: 'prototype and mockup in Figma',
    translateX: '25px',
    rotate: '35deg',
    top: '140px',
  },
  {
    word: 'adore slackbots',
    translateX: '-25px',
    rotate: '4deg',
    top: '110px',
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
  return new Promise((resolve, reject) => {
    const makeElHeight = document.querySelector('.make').offsetHeight;
    wordData.el.style = `
      color: rgba(255, 255, 255, 0);
      transform: rotate(${wordData.rotate}) translateX(${wordData.translateX});
      top: calc(${makeElHeight}px - ${wordData.top});
      transition: top 2s cubic-bezier(.98,.09,.95,1.1) 1s, transform 2s cubic-bezier(0.1, -0.6, 0.2, 1) 0.8s, color 7s cubic-bezier(.76,.05,.86,.06) 1.6s;
      `;
      setTimeout(() => {
        wordData.el.classList.remove('falling-text-prompt');
        togglePrompt();
      }, 800)
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
      { word: 'am stoked you\'ve swung by :) ', el: placeholderText },
      words.length + 1
    );
    return;
  }
  typeWord(words[i], i)
    .then(moveWord)
    .then(() => {
      startWordDrop(i + 1);
    })
    .catch((err) => console.log(err));
};

setTimeout(() => {
  startWordDrop(0);
}, 2000)
