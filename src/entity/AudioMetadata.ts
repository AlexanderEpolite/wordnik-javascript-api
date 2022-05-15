
export default class AudioMetadata {
    
    public constructor(
        public readonly commentCount: number,
        public readonly createdBy: string,
        public readonly createdAt: string,
        public readonly id: number,
        public readonly word: string,
        public readonly duration: number,
        public readonly audioType: string,
        public readonly attributionText: string,
        public readonly attributionUrl: string,
        public readonly fileUrl: string,
    ) {
    }
    
}
