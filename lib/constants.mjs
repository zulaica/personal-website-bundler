export const OPTIONS = Object.freeze({
  babel: {
    presets: [
      [
        '@babel/env',
        {
          targets: 'defaults',
          modules: false
        }
      ]
    ],
    babelrc: false,
    comments: false,
    configFile: false,
    minified: true
  },
  postcss: {
    cssnano: {
      preset: [
        'advanced',
        {
          minifyFontValues: false,
          normalizeUrl: false,
          normalizeString: {
            preferredQuote: 'single'
          }
        }
      ]
    },
    url: [
      {
        filter: '**/*.woff2',
        url: 'rebase'
      },
      {
        filter: '**/*.woff',
        url: 'rebase'
      },
      {
        filter: '**/*.ttf',
        url: 'rebase'
      },
      {
        filter: '**/*.webp',
        url: (asset) => asset.relativePath
      },
      {
        filter: '**/*.jpg',
        url: (asset) => asset.relativePath
      }
    ]
  },
  posthtml: {
    htmlnano: {
      collapseWhitespace: 'aggressive',
      minifyJs: false,
      removeComments: 'all',
      removeEmptyAttributes: false
    }
  },
  rollup: {
    input: {
      input: 'source/script.hash.js'
    },
    output: {
      file: 'release/script.hash.js'
    }
  }
});

export const EMOJI = Object.freeze({
  airplaneDeparture: '\ud83d\udeeb',
  artistPalette: '\uD83C\uDFA8',
  barChart: '\uD83D\uDCCA',
  cardFileBox: '\uD83D\uDDC3\uFE0F',
  cardIndexDividers: '\uD83D\uDDC2',
  construction: '\uD83D\uDEA7',
  fileCabinet: '\uD83D\uDDC4 ',
  fileFolder: '\uD83D\uDCC1',
  litterInBinSign: '\ud83d\udeae',
  noEntry: '\u26D4\uFE0F',
  partyPopper: '\uD83C\uDF89',
  wastebasket: '\ud83d\uddd1\ufe0f '
});
