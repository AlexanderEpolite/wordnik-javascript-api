import {PartOfSpeech} from "../struct/PartOfSpeech";
import Label from "./Label";
import Citation from "./Citation";
import RelatedWord from "./RelatedWord";
import ExampleUse from "./ExampleUse";

/**
 * Defines a word.
 */
export default class Word {
    
    /**
     * Constructor for a word.
     * 
     * @param id {string} The id of the word.
     * @param partOfSpeech {PartOfSpeech} The part of speech of the word.
     * @param attributionText {string | undefined} The attribution text of the word.
     * @param attributionUrl {string | undefined} The attribution url of the word.
     * @param sourceDictionary {string | undefined} The source dictionary of the word.
     * @param text {string | undefined} The text definition of the word.
     * @param sequence {string}
     * @param score {number} The score of the word.
     * @param lables {Label[]} Word labels.
     * @param citations {Citation[]} Citations for the word.
     * @param word {string} The word.
     * @param relatedWords {RelatedWord[]} Related words.
     * @param exampleUses {ExampleUse[]} Example uses.
     * @param wordnikUrl {string} The Wordnik url.
     */
    public constructor(
        public readonly id: string,
        public readonly partOfSpeech: PartOfSpeech,
        public readonly attributionText: string | undefined,
        public readonly attributionUrl: string | undefined,
        public readonly sourceDictionary: string | undefined,
        public readonly text: string | undefined,
        public readonly sequence: string,
        public readonly score: number,
        public readonly lables: Label[],
        public readonly citations: Citation[],
        public readonly word: string,
        public readonly relatedWords: RelatedWord[],
        public readonly exampleUses: ExampleUse[],
        public readonly wordnikUrl: string,
    ) {}
    
}
