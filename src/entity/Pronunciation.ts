
export default class Pronunciation {
    
    public constructor(
        public readonly seq: number,
        public readonly raw: string,
        public readonly rawType: string,
        public readonly id: string,
        public readonly attributionText: string,
        public readonly attributionUrl: string,
    ) {
    }
    
}
