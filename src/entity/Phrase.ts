
export default class Phrase {
    
    /**
     * Constructor for Phrase.
     * 
     * @param count {number}
     * @param gram1 {string}
     * @param gram2 {string}
     * @param mi {number}
     * @param wlmi {number}
     */
    public constructor(
        public readonly count: number,
        public readonly gram1: string,
        public readonly gram2: string,
        public readonly mi: number,
        public readonly wlmi: number,
    ) {
    }
    
}
