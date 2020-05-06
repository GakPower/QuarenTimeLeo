export abstract class Hashfunction {
    static movieLength: number = 97423;
    static APIids: number[] = new Array(97423);
    static internalIds: number[] = new Array(9742 * 3);



    static hash(key: number) {
        var hashValue = 0;
        const stringTypeKey = `${key}${typeof key}`;

        for (var index = 0; index < stringTypeKey.length; index++) {
            const charCode = stringTypeKey.charCodeAt(index);
            hashValue += charCode << (index * 8);
        }

        return hashValue % this.movieLength;
    }

    static put(key: number, val: number): void {
        var i: number = this.hash(key);
        while (this.APIids[i] != null)//loop to find the right spot
            i = (i + 1) % this.movieLength;
        this.APIids[i] = key;
        this.internalIds[i] = val;
    }

    static get(key: number): number {
        for (var i = this.hash(key); this.APIids[i] != null; i = (i + 1) % this.movieLength) {
            if (this.APIids[i] == key)
                return this.internalIds[i];
        }
        return -1;
    }
}