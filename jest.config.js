module.exports = {
    preset: "ts-jest",
    collectCoverage: true,
    coverageDirectory: "coverage",
    coveragePathIgnorePatterns: [
        "/node_modules/"
    ],
    testEnvironment: "node"
};