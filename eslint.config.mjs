import { eslintConfig } from '@shi-corp/development-utilities'

export default [
    ...eslintConfig,
    {
        'ignores': [
            'bin/',
            'dist/',
            'eslint.config.mjs'
        ]
    }
]
