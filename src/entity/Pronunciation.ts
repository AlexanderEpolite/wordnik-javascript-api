
/**
 * Describes the pronunciation of a word.
 * 
 * This needs some more documentation, feel free to make a PR.
 */
export default class Pronunciation {
    
    /**
     * Pronunciation constructor.
     * @param seq {number}
     * @param raw {string}
     * @param rawType {string}
     * @param id {string}
     * @param attributionText {string}
     * @param attributionUrl {string}
     */
    public constructor(
        public readonly seq: number,
        public readonly raw: string,
        public readonly rawType: string,
        public readonly id: string,
        public readonly attributionText: string,
        public readonly attributionUrl: string,
    ) {}
    
}
