const _ = require('lodash');
const countries = require('../../../config/countries');

module.exports = {
'passport-damaged': {
  legend: {
    value: 'Is your passport damaged?',
    className: 'visuallyhidden'
  },
  options: [
    {value: 'Yes', label: 'Yes'},
    {value: 'No', label: 'No'}
  ],
  validate: [
    'required',
    {
      type:'equal',
      arguments:['No'], /* if Yes is selected */
      redirect:'/../not-eligible'
    }
  ]
},
'expiry-year': {
  labelClassName: 'form-label',
  formatter: 'removehyphens',
    validate: [
        'numeric',
        'required'
    ]
},
'expiry-month': {
    labelClassName: 'form-label',
    formatter: 'removehyphens',
    validate: [
        'numeric',
        'required'
    ]
},
'uncancelled': {
legend: {
  value: 'Do you have any uncancelled passport from a different country?',
  className: 'visuallyhidden'
},
className: 'inline',
options: [
  {value: 'Yes', label: 'Yes', toggle: 'which-passport'},
  {value: 'No', label: 'No'}
],
validate: [
  'required',
  {
    type:'equal',
    arguments:['No'], /* if Yes is selected */
    redirect:'/../not-eligible'
  }
]
},
'dual-national-country': {
  labelClassName: 'visuallyhidden',
    options: [{ value: '', label: ' ' }].concat(_.map(countries, function (c) {
        return {
            value: c.id,
            label: c.name,
            attributes: [
                {
                    attribute: 'data-synonyms', value: Array.isArray(c.altName) ? c.altName.join(',') : c.altName
                }
            ]
        }
    })),
    groupAttributes: [
        { attribute: 'data-previous-value', value: '{{values.typeahead}}' }
    ],
    dependent: {
        field: 'uncancelled',
        value: true
    }
}

};
