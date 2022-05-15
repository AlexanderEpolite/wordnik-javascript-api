import { RelationshipType } from "../struct/RelationshipType";

export default class RelatedWord {
    
    public constructor(
        public readonly relationshipType: RelationshipType,
        public readonly words: string[],
    ) {
    }
    
}
