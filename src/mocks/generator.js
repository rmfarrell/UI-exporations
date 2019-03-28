import { LoremIpsum } from 'lorem-ipsum';
import uuid from 'uuid/v4';

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 20,
      min: 4
    }
  }),
  TOPICS = ['Trade', 'Government', 'Regulation', 'Environment', 'Crime'],
  TYPES = [
    'Article',
    'Policy Document',
    'Analysis',
    'Opinion',
    'Media',
    'Data'
  ];

// -- Models

function teaser() {
  return {
    id: uuid(),
    contentType: 'Article',
    title: lorem.generateSentences(1),
    source: capitalize(lorem.generateWords(3)),
    author: capitalize(lorem.generateWords(2)),
    date: date(),
    country: capitalize(lorem.generateWords(2)),
    issues: issues(),
    summary: lorem.generateSentences(3),
    image: image(),
    type: type()
  };
}

function SocialMediaItem() {
  return {
    id: uuid(),
    contentType: 'Social Media Item',
    source: pickRandomFromArray(['Twitter', 'Facebook', 'Instagram']),
    text: '',
    author: '',
    image: image(),
    date: date()
  };
}

function DeepDive() {
  return {
    id: uuid(),
    title: lorem.generateSentences(2),
    issues: issues(),
    summary: lorem.generateSentences(3),
    image: image(),
    type: type()
  };
}

// aliases
const Article = teaser;
const articles = teasers;

// -- Multiples
function teasers(n = 1) {
  const out = [];
  for (let x = 0; x < n; x++) {
    out.push(teaser());
  }
  return out;
}

function multiple(n = 0, type = 'Article') {
  const out = [];
  for (let x = 0; x < n; x++) {
    switch (type) {
      case 'article':
        out.push(Article());
        break;
      case 'social':
        out.push(SocialMediaItem());
        break;
      case 'mixed':
        break;
      default:
        out.push(Article());
    }
    out.push(teaser());
  }
  return out;
}

// -- Field Generators

// For now, this combines Entities & Countries, primaries come first
function issues() {
  const count = randomInt(1, 3);
  return pickRandomFromArray(TOPICS.slice(0), count);
}

function type() {
  return TYPES[randomInt(0, TYPES.length)];
}

function image() {
  return {
    color: randomColor(),
    ratio: randomInt(50, 50)
  };
}

function date() {
  return 'November 31, 2019';
}

// -- Helpers/utilities

function capitalize(str = '') {
  return str
    .split(' ')
    .map(s => {
      return s.charAt(0).toUpperCase() + s.slice(1);
    })
    .join(' ');
}

function randomColor() {
  return `rgb(${randomInt(0, 150)}, 
  ${50}, 
  ${randomInt(0, 150)})`;
}

function randomInt(min = 0, max = 100) {
  return Math.floor(Math.random() * Math.floor(max)) + min;
}

function pickRandomFromArray(arr = [null], n = 1) {
  const out = [];
  for (let x = 0; x < n; x++) {
    let filtered = arr.filter(t => !out.includes(t));
    out.push(filtered[randomInt(0, filtered.length - 1)]);
  }
  return out;
}

export {
  teaser,
  teasers,
  randomColor,
  TYPES,
  TOPICS,
  Article,
  SocialMediaItem,
  articles,
  multiple
};
