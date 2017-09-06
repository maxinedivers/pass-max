module.exports = {
    '/': {
        backLink: '../intro/photo-retrieved',
        next: '/processing-image'
    },
    '/uploading': {
        backLink: './',
        next: '/prove-your-identity'
    },
    '/processing-image': {
        backLink: './uploading'
    },
    '/photo-uploaded-success': {
        backLink: '../intro/get-photo-code'
    },
    '/photo-uploaded-failure': {
        backLink: '../upload'
    },
    '/plain-expression': {
        fields: ['plain-expression'],
        backLink: './photo-uploaded-failure',
        next: '/expression-need-another-photo'
    },
    '/shadows-face': {
        fields: ['shadows-face'],
        backLink: './plain-expression',
        next: '/you-need-another-photo'
    },
    '/expression-need-another-photo': {
        backLink: './plain-expression',
        next: './'
    },
    '/you-need-another-photo': {
        backLink: './shadows-face',
        next: './'
    },
    '/check-photo-and-submit': {
        backLink: './shadows-face'
    }
};
