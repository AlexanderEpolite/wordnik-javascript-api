import fetch from "node-fetch";
import {PartOfSpeech} from "./struct/PartOfSpeech";
import Word from "./entity/Word";
import AudioMetadata from "./entity/AudioMetadata";
import Example from "./entity/Example";
import Frequency from "./entity/Frequency";
import Syllable from "./entity/Syllable";
import Phrase from "./entity/Phrase";
import Pronunciation from "./entity/Pronunciation";
import {RelationshipType} from "./struct/RelationshipType";
import RelatedWord from "./entity/RelatedWord";
import RandomWord from "./entity/RandomWord";
import WordOfTheDay from "./entity/WordOfTheDay";

/**
 * Defines the WordnikAPI class.
 */
export default class WordnikAPI {
    
    private static readonly BASE_URL = "https://api.wordnik.com/v4/word.json/";
    private static readonly WORDS_URL = "https://api.wordnik.com/v4/words.json/";
    
    private readonly API_KEY: string;
    
    /**
     * Constructs a new WordnikAPI instance.
     * @param API_KEY {string} The API key to use.
     */
    public constructor(API_KEY: string) {
        this.API_KEY = API_KEY;
        
        if(!API_KEY || API_KEY.length === 0) {
            throw new Error("API_KEY must be defined.  See https://developer.wordnik.com/gettingstarted to obtain one.");
        }
    }
    
    /**
     * Make an API call to the Wordnik API.
     *
     * @param endpoint {string} The endpoint to call.
     * @param params {object} The parameters to pass to the endpoint.
     * @param base_url {string} The base URL to use (optional).
     * 
     * @private
     */
    private async makeRequest(endpoint: string, params: any, base_url: string = WordnikAPI.BASE_URL): Promise<any> {
        //use node-fetch to make the request, all params are passed as query params
        
        //start with the api_key param and append "params" to the url
        let url = `${base_url}${endpoint}?api_key=${this.API_KEY}`;
        
        //loop through the params and append them to the url
        for (let key in params) {
            //the key may be "undefined"
            if (params[key] !== undefined) {
                url += "&" + key + "=" + params[key];
            }
        }
        
        //make the request
        const res = await fetch(url, {
            headers: {
                "Accept": "application/json",
                "User-Agent": "WordnikAPI-EP/1.0.0",
            },
            method: "GET",
            redirect: "error",
        });
        
        if(res.status === 401) {
            console.error("[wordnik-api]: Invalid API key.  If you do not have an API key, go to https://developer.wordnik.com/gettingstarted to get one.");
            throw new Error("Invalid API key.");
        }
        
        //return the response
        return await res.json();
    }
    
    /**
     * Gets the API key.
     * 
     * @returns {string} The API key.
     */
    public getAPIKey(): string {
        return this.API_KEY;
    }
    
    /**
     * Get definitions for a word.
     * 
     * https://developer.wordnik.com/docs#!/word/getDefinitions
     *
     * @param word {string} The word to get definitions for.
     * @param limit {number} The limit of definitions to get.
     * @param partOfSpeech {PartOfSpeech} The part of speech to get definitions for.
     * @param sourceDictionary {"all" | "ahd-5" | "century" | "wiktionary" | "webster" | "wordnet"} The source dictionary to get definitions for.
     * @param useCanonical {boolean} Whether to use the canonical form of the word (e.g. "cats" -> "cat").
     * @param includeTags {boolean} Whether to include tags in the response.
     *
     * @returns {Promise<Word[] | null>} The definitions for the word, or null if the word is not found.
     */
    public async getDefinitions(word: string,
                                limit: number = 1,
                                partOfSpeech: PartOfSpeech | undefined = undefined,
                                sourceDictionary: "all" | "ahd-5" | "century" | "wiktionary" | "webster" | "wordnet" = "all",
                                useCanonical: boolean = false,
                                includeTags: boolean = false): Promise<Word[] | null> {
        try {
            const res = await this.makeRequest(word + "/definitions", {
                limit: limit,
                partOfSpeech: partOfSpeech?.toString(),
                sourceDictionaries: sourceDictionary,
                useCanonical: useCanonical,
                includeTags: includeTags,
            });
            
            //the response body is a JSON array of Word objects
            let words: Word[] = [];
            
            //loop through the JSON array and create Word objects
            for (let w of res) {
                words.push(w);
            }
            
            return words;
            
        } catch (e) {
            return null;
        }
    }
    
    /**
     * Get the audio metadata for a word.
     * 
     * https://developer.wordnik.com/docs#!/word/getAudio
     *
     * @param word {string} The word to get audio metadata for.
     * @param useCanonical {boolean} Whether to use the canonical form of the word (e.g. "cats" -> "cat").
     * @param limit {number} The limit of audio metadata to get.
     *
     * @returns {Promise<AudioMetadata[] | null>} The audio metadata for the word, or null if the word is not found.
     */
    public async getAudio(word: string,
                          useCanonical: boolean = false,
                          limit: number = 1): Promise<AudioMetadata[] | null> {
        try {
            const res = await this.makeRequest(word + "/audio", {
                useCanonical: useCanonical,
                limit: limit,
            });
            
            //the response body is a JSON array of AudioMetadata objects
            let audios: AudioMetadata[] = [];
            
            //loop through the JSON array and create AudioMetadata objects
            for (let a of res) {
                audios.push(a);
            }
            
            return audios;
            
        } catch (e) {
            return null;
        }
    }
    
    /**
     * Get the etymologies for a word.
     * 
     * https://developer.wordnik.com/docs#!/word/getEtymologies
     *
     * @param word {string} The word to get etymologies for.
     * @param useCanonical {boolean} Whether to use the canonical form of the word (e.g. "cats" -> "cat").
     *
     * @returns {Promise<string[] | null>} The etymologies for the word, or null if the word is not found.
     */
    public async getEtymologies(word: string, useCanonical: boolean = false): Promise<string[] | null> {
        try {
            const res = await this.makeRequest(word + "/etymologies", {
                useCanonical: useCanonical,
            });
            
            //the response body is a JSON array of strings
            let etymologies: string[] = [];
            
            //loop through the JSON array and create strings
            for (let e of res) {
                etymologies.push(e);
            }
            
            return etymologies;
            
        } catch (e) {
            return null;
        }
    }
    
    /**
     * Get examples of a word's usage.
     * 
     * https://developer.wordnik.com/docs#!/word/getExamples
     *
     * @param word {string} The word to get examples for.
     * @param includeDuplicates {boolean} Whether to include duplicate examples.
     * @param useCanonical {boolean} Whether to use the canonical form of the word (e.g. "cats" -> "cat").
     * @param skip {number} The number of examples to skip.
     * @param limit {number} The limit of examples to get (max 50).
     *
     * @returns {Promise<Example[] | null>} The examples for the word, or null if the word is not found.
     */
    public async getExamples(word: string,
                             includeDuplicates: boolean = false,
                             useCanonical: boolean = false,
                             skip: number = 0,
                             limit: number = 1): Promise<Example[] | null> {
        try {
            if (limit > 50) {
                limit = 50;
            }
            
            const res = await this.makeRequest(word + "/examples", {
                includeDuplicates: includeDuplicates,
                useCanonical: useCanonical,
                skip: skip,
                limit: limit,
            });
            
            //the response body is a JSON object with an "examples" key (a JSON array of Example objects)
            
            //create an array of Example objects
            let examples: Example[] = [];
            
            //loop through the JSON array and create Example objects
            for (let e of res.examples) {
                examples.push(e);
            }
            
            return examples;
            
        } catch (e) {
            return null;
        }
    }
    
    /**
     * Get the frequency of a word.
     * 
     * https://developer.wordnik.com/docs#!/word/getWordFrequency
     * 
     * @param word {string} The word to get the frequency of.
     * @param useCanonical {boolean} Whether to use the canonical form of the word (e.g. "cats" -> "cat").
     * @param startYear {number} The start year to get the frequency of.
     * @param endYear {number} The end year to get the frequency of.
     *
     * @returns {Promise<Frequency[] | null>} The frequency of the word, or null if the word is not found.
     */
    public async getFrequency(word: string, useCanonical: boolean = false, startYear: number = 1800, endYear: number = 2012): Promise<Frequency[] | null> {
        try {
            const res = await this.makeRequest(word + "/frequency", {
                useCanonical: useCanonical,
                startYear: startYear,
                endYear: endYear,
            });
            
            //the response body is a JSON object with a "frequency" key (a JSON array of Frequency objects)
            
            //create an array of Frequency objects
            let frequencies: Frequency[] = [];
            
            //loop through the JSON array and create Frequency objects
            for (let f of res.frequency) {
                frequencies.push(f);
            }
            
            return frequencies;
            
        } catch (e) {
            return null;
        }
    }
    
    /**
     * Get the word's hyphenation.
     * 
     * https://developer.wordnik.com/docs#!/word/getHyphenation
     *
     * @param word {string} The word to get the hyphenation of.
     * @param useCanonical {boolean} Whether to use the canonical form of the word (e.g. "cats" -> "cat").
     * @param sourceDictionary {string} The source dictionary to get the hyphenation of.
     * @param limit {number} The limit of hyphenations to get.
     *
     * @returns {Promise<Syllable[] | null>} The word's hyphenation.
     */
    public async getHyphenation(word: string,
                                useCanonical: boolean = false,
                                sourceDictionary: "all" | "ahd-5" | "century" | "wiktionary" | "webster" | "wordnet" = "all",
                                limit: number = 1): Promise<Syllable[] | null> {
        try {
            const res = await this.makeRequest(word + "/hyphenation", {
                useCanonical: useCanonical,
                sourceDictionary: sourceDictionary,
                limit: limit,
            });
            
            //the response body is a JSON array of Syllable objects
            
            //create an array of Syllable objects
            let syllables: Syllable[] = [];
            
            //loop through the JSON array and create Syllable objects
            for (let s of res) {
                syllables.push(s);
            }
            
            return syllables;
            
        } catch (e) {
            return null;
        }
    }
    
    /**
     * Get word phrases
     * 
     * https://developer.wordnik.com/docs#!/word/getPhrases
     * 
     * @param word {string} The word to get the phrases of.
     * @param useCanonical {boolean} Whether to use the canonical form of the word (e.g. "cats" -> "cat").
     * @param limit {number} The limit of phrases to get.
     * 
     * @returns {Promise<Phrase[] | null>} The word's phrases.
     */
    public async getPhrases(word: string, useCanonical: boolean = false, limit: number = 1): Promise<Phrase[] | null> {
        try {
            const res = await this.makeRequest(word + "/phrases", {
                useCanonical: useCanonical,
                limit: limit,
            });
            
            //the response body is a JSON array of Phrase objects
            
            //create an array of Phrase objects
            let phrases: Phrase[] = [];
            
            //loop through the JSON array and create Phrase objects
            for (let p of res) {
                phrases.push(p);
            }
            
            return phrases;
            
        } catch (e) {
            return null;
        }
    }
    
    /**
     * Get the word's Pronunciation.
     * 
     * https://developer.wordnik.com/docs#!/word/getTextPronunciations
     * 
     * @param word {string} The word to get the pronunciation of.
     * @param useCanonical {boolean} Whether to use the canonical form of the word (e.g. "cats" -> "cat").
     * @param sourceDictionary {string} The source dictionary to get the pronunciation of.
     * @param typeFormat {string} The type of pronunciation to get.
     * @param limit {number} The limit of pronunciations to get.
     * 
     * @returns {Promise<Pronunciation[] | null>} The word's Pronunciation.
     */
    public async getPronunciation(word: string,
                                  useCanonical: boolean = false,
                                  sourceDictionary: "ahd-5" | "century" | "wiktionary" | "webster" | "wordnet" | undefined = undefined,
                                  typeFormat: "ahd-5" | "arpabet" | "gcide-diacritical" | "IPA" | undefined = undefined,
                                  limit: number = 1): Promise<Pronunciation[] | null> {
        try {
            const res = await this.makeRequest(word + "/pronunciation", {
                limit: limit,
                useCanonical: useCanonical,
                sourceDictionary: sourceDictionary,
                typeFormat: typeFormat,
            });
            
            //the response body is a JSON array of Pronunciation objects
            
            //create an array of Pronunciation objects
            let pronunciations: Pronunciation[] = [];
            
            //loop through the JSON array and create Pronunciation objects
            for (let p of res) {
                pronunciations.push(p);
            }
            
            return pronunciations;
            
        } catch (e) {
            return null;
        }
    }
    
    /**
     * Get related words.
     * 
     * https://developer.wordnik.com/docs#!/word/getRelatedWords
     * 
     * @param word {string} The word to get related words for.
     * @param useCanonical {boolean} Whether to use the canonical form of the word (e.g. "cats" -> "cat").
     * @param relationshipTypes {RelationshipType | undefined} The relationship types to get.
     * @param limitPerRelationshipType {number} The limit of related words to get per relationship type.
     * @returns {Promise<RelatedWord[] | null>} The related words or null if an error occurred.
     */
    public async getRelatedWords(word: string,
                                 useCanonical: boolean = false,
                                 relationshipTypes: RelationshipType | undefined = undefined,
                                 limitPerRelationshipType: number | undefined = undefined): Promise<RelatedWord[] | null> {
        try {
            const res = await this.makeRequest(word + "/relatedWords", {
                useCanonical: useCanonical,
                relationshipTypes: relationshipTypes,
                limitPerRelationshipType: limitPerRelationshipType,
            });
            
            //the response body is a JSON array of RelatedWord objects
            
            //create an array of RelatedWord objects
            let relatedWords: RelatedWord[] = [];
            
            //loop through the JSON array and create RelatedWord objects
            for (let r of res) {
                relatedWords.push(r);
            }
            
            return relatedWords;
            
        } catch (e) {
            return null;
        }
    }
    
    /**
     * Get the scrabble score of a word.
     * You may want to lowercase the word before passing it in.
     * 
     * https://developer.wordnik.com/docs#!/word/getScrabbleScore
     * 
     * @param word {string} The word to get the scrabble score of.
     * 
     * @returns {Promise<number | null>} The scrabble score of the word, or null if the word is not found.
     */
    public async getScrabbleScore(word: string): Promise<number | null> {
        try {
            const res = await this.makeRequest(word + "/scrabbleScore", {});
            
            return res.value;
            
        } catch (e) {
            return null;
        }
    }
    
    /**
     * Get the top example of a word.
     * 
     * https://developer.wordnik.com/docs#!/word/getTopExample
     * 
     * @param word {string} The word to get the top example of.
     * @param useCanonical {boolean} Whether to use the canonical form of the word (e.g. "cats" -> "cat").
     * 
     * @returns {Promise<Example | null>} The top example of the word, or null if the word is not found.
     */
    public async getTopExample(word: string, useCanonical: boolean = false): Promise<Example | null> {
        try {
            return await this.makeRequest(word + "/topExample", {
                useCanonical: useCanonical,
            });
        } catch (e) {
            return null;
        }
    }
    
    /**
     * Get a random word.
     * 
     * https://developer.wordnik.com/docs#!/words/getRandomWord
     * 
     * @param hasDictionaryDef {"true" | "false"} Only return words with dictionary definitions
     * @param includePartOfSpeech {PartOfSpeech | undefined} Only return words with the specified part of speech.
     * @param excludePartOfSpeech {PartOfSpeech | undefined} Only return words without the specified part of speech.
     * @param minCorpusCount {number | undefined} Minimum corpus frequency for terms
     * @param maxCorpusCount {number | undefined} Maximum corpus frequency for terms
     * @param minDictionaryCount {number | undefined} Minimum dictionary count
     * @param maxDictionaryCount {number | undefined} Maximum dictionary count
     * @param minLength {number | undefined} Minimum word length
     * @param maxLength {number | undefined} Maximum word length
     */
    public async getRandomWord(hasDictionaryDef: "true" | "false" = "true",
                               includePartOfSpeech: PartOfSpeech | undefined = undefined,
                               excludePartOfSpeech: PartOfSpeech | undefined = undefined,
                               minCorpusCount: number | undefined = undefined,
                               maxCorpusCount: number | undefined = undefined,
                               minDictionaryCount: number | undefined = undefined,
                               maxDictionaryCount: number | undefined = undefined,
                               minLength: number | undefined = undefined,
                               maxLength: number | undefined = undefined): Promise<RandomWord | null> {
        try {
            return await this.makeRequest("randomWord", {
                hasDictionaryDef: hasDictionaryDef,
                includePartOfSpeech: includePartOfSpeech,
                excludePartOfSpeech: excludePartOfSpeech,
                minCorpusCount: minCorpusCount,
                maxCorpusCount: maxCorpusCount,
                minDictionaryCount: minDictionaryCount,
                maxDictionaryCount: maxDictionaryCount,
                minLength: minLength,
                maxLength: maxLength,
            }, WordnikAPI.WORDS_URL);
        } catch (e) {
            return null;
        }
    }
    
    /**
     * Get random words.
     * 
     * https://developer.wordnik.com/docs#!/words/getRandomWords
     * 
     * @param hasDictionaryDef {"true" | "false"} Only return words with dictionary definitions
     * @param includePartOfSpeech {PartOfSpeech[] | undefined} Only return words with the specified part of speech.
     * @param excludePartOfSpeech {PartOfSpeech[] | undefined} Only return words without the specified part of speech.
     * @param minCorpusCount {number | undefined} Minimum corpus frequency for terms
     * @param maxCorpusCount {number | undefined} Maximum corpus frequency for terms
     * @param minDictionaryCount {number | undefined} Minimum dictionary count
     * @param maxDictionaryCount {number | undefined} Maximum dictionary count
     * @param minLength {number | undefined} Minimum word length
     * @param maxLength {number | undefined} Maximum word length
     * @param sortBy {"alpha" | "count" | undefined} Sort by
     * @param sortOrder {"asc" | "desc" | undefined} Sort order
     * @param limit {number | undefined} Limit
     * 
     * @returns {Promise<RandomWord[]>} Random words, or an empty array if no words were found.
     */
    public async getRandomWords(hasDictionaryDef: "true" | "false" = "true",
                             includePartOfSpeech: PartOfSpeech[] | undefined = undefined,
                             excludePartOfSpeech: PartOfSpeech[] | undefined = undefined,
                             minCorpusCount: number | undefined = undefined,
                             maxCorpusCount: number | undefined = undefined,
                             minDictionaryCount: number | undefined = undefined,
                             maxDictionaryCount: number | undefined = undefined,
                             minLength: number | undefined = undefined,
                             maxLength: number | undefined = undefined,
                             sortBy: "alpha" | "count" | undefined = undefined,
                             sortOrder: "asc" | "desc" | undefined = undefined,
                             limit: number = 10): Promise<RandomWord[]> {
        //this returns an array of random words
        try {
            return await this.makeRequest("randomWords", {
                hasDictionaryDef: hasDictionaryDef,
                includePartOfSpeech: includePartOfSpeech,
                excludePartOfSpeech: excludePartOfSpeech,
                minCorpusCount: minCorpusCount,
                maxCorpusCount: maxCorpusCount,
                minDictionaryCount: minDictionaryCount,
                maxDictionaryCount: maxDictionaryCount,
                minLength: minLength,
                maxLength: maxLength,
                sortBy: sortBy,
                sortOrder: sortOrder,
                limit: limit,
            }, WordnikAPI.WORDS_URL);
        } catch (e) {
            return [];
        }
    }
    
    /**
     * Get the word of the day.
     * 
     * https://developer.wordnik.com/docs#!/words/getWordOfTheDay
     * 
     * @param date {Date | string | undefined} the Date to get the word of the day for, a string in the format yyyy-MM-dd, or undefined to get the word of the day for today.
     * @returns {Promise<WordOfTheDay | null>}
     */
    public async getWordOfTheDay(date: string | Date | undefined = undefined): Promise<WordOfTheDay | null> {
        //the date should be in the format yyyy-MM-dd, validate that it is if it is a string, otherwise use the date
        if(date && typeof date === "string") {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
                throw new Error("Invalid date format, should be yyyy-MM-dd");
            }
        } else if(date && date instanceof Date) {
            date = date.toISOString().substring(0, 10);
        }
        
        try {
            return await this.makeRequest("wordOfTheDay", {
                date: date,
            }, WordnikAPI.WORDS_URL);
        } catch (e) {
            return null;
        }
    }
    
}

new WordnikAPI("asasd").getRandomWord().then(console.log).catch(console.error);
