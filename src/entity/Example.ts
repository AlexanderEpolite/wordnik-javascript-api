/**
 * Example definition of a word.
 */
export default class Example {
    
    /**
     * Example constructor
     * @param provider {string} the provider of the example.
     * @param year {number | undefined} the year of the example.
     * @param rating {number} the rating of the example.
     * @param url {string} the url of the example.
     * @param word {string} the example word.
     * @param text {string} example text.
     * @param documentId {number}
     * @param exampleId {number}
     * @param title {string}
     * @param author {string | undefined}
     */
    public constructor(
        public readonly provider: {id: number},
        public readonly year: number | undefined,
        public readonly rating: number,
        public readonly url: string,
        public readonly word: string,
        public readonly text: string,
        public readonly documentId: number,
        public readonly exampleId: number,
        public readonly title: string,
        public readonly author: string | undefined,
    ) {
    }
    
}
