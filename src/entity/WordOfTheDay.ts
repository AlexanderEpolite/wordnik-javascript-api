import {PartOfSpeech} from "../struct/PartOfSpeech";
import Example from "./Example";

export default class WordOfTheDay {
    
    /**
     * Word of the day constructor.
     * 
     * @param _id {string} the ID of the word.
     * @param word {string} the word.
     * @param contentProvider {{readonly name: string, readonly id: number}} too lazy to make a class for this.
     * @param definitions {{readonly source: string, readonly text: string, readonly note: string | null, readonly partOfSpeech: PartOfSpeech}[]} the definitions.
     * @param publishDate {string} the publish date in ISO8601.
     * @param examples {Example[]} the examples.
     * @param pdd {string} the PDD.
     * @param htmlExtra {string | null} the HTML extra.
     * @param note {string | null} the note.
     */
    public constructor(
        public readonly _id: string,
        public readonly word: string,
        public readonly contentProvider: {readonly name: string, readonly id: number},
        public readonly definitions: {readonly source: string, readonly text: string, readonly note: string | null, readonly partOfSpeech: PartOfSpeech}[],
        public readonly publishDate: string,
        public readonly examples: Example[],
        public readonly pdd: string,
        public readonly htmlExtra: string | null,
        public readonly note: string | null,
    ) {}
    
}
