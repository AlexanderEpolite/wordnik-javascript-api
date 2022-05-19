import { RelationshipType } from "../struct/RelationshipType";

/**
 * Describes a related word.
 */
export default class RelatedWord {
    
    /**
     * RelatedWord Constructor
     * @param relationshipType {RelationshipType} The relationship type of the related word
     * @param words {string[]} The words that are related
     */
    public constructor(
        public readonly relationshipType: RelationshipType,
        public readonly words: string[],
    ) {}
    
}
