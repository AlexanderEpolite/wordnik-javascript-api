
/**
 * Defines word labels.
 */
export default class Label {
    
    /**
     * Constructor.
     * 
     * @param text {string} The text of the label.
     * @param type {string} The type of the label.
     */
    public constructor(
        public readonly text: string,
        public readonly type: string,
    ) {
    }
    
}
