
export default class Example {
    
    public constructor(
        public readonly provider: {id: number},
        public readonly year: number | undefined,
        public readonly rating: number,
        public readonly url: string,
        public readonly word: string,
        public readonly text: string,
        public readonly documentId: number,
        public readonly exampleId: number,
        public readonly title: string,
        public readonly author: string | undefined,
    ) {
    }
    
}
