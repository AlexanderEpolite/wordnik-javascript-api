import AudioMetadata from "./entity/AudioMetadata";
import Citation from "./entity/Citation";
import Example from "./entity/Example";
import ExampleUse from "./entity/ExampleUse";
import Frequency from "./entity/Frequency";
import Label from "./entity/Label";
import Phrase from "./entity/Phrase";
import Pronunciation from "./entity/Pronunciation";
import RandomWord from "./entity/RandomWord";
import RelatedWord from "./entity/RelatedWord";
import Syllable from "./entity/Syllable";
import Word from "./entity/Word";
import WordOfTheDay from "./entity/WordOfTheDay";
import { PartOfSpeech } from "./struct/PartOfSpeech";
import { RelationshipType } from "./struct/RelationshipType";
import WordnikAPI from "./WordnikAPI";

export {
    //entities
    Word, Label, Citation, RelatedWord, ExampleUse, AudioMetadata, Example, Frequency, Syllable, Phrase, Pronunciation,
    RandomWord, WordOfTheDay,
    
    //api
    WordnikAPI,
    
    //struct (enums)
    PartOfSpeech, RelationshipType,
};
