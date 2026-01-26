/** @returns {Promise<import('jest').Config>} */
export default {
    transform: {
        '.(ts|tsx)$': 'ts-jest',
    },
    testRegex: '(/__test__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    verbose: false
};