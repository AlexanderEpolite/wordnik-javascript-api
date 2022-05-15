
/**
 * Defines a citation for words.
 */
export default class Citation {
    
    /**
     * Constructs a new citation.
     * 
     * @param source {string} The source of the citation.
     * @param cite {string} The citation.
     */
    public constructor(
        public readonly source: string,
        public readonly cite: string,
    ) {}
}
