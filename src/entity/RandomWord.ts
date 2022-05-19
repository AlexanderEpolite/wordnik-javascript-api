
export default class RandomWord {
    
    public constructor(
        public readonly canonicalForm: string | undefined,
        public readonly id: number,
        public readonly originalWord: string | undefined,
        public readonly suggestions: string[] | undefined,
        public readonly vulgar: string | undefined,
        public readonly word: string,
    ) {}
    
}
