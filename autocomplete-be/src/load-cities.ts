import fs from 'fs';
import { createAutoComplete } from '../../auto-complete/';

export class LoadCities {
    private cities: string[] = [];
    private lastModified = '';
    private autoComplete: (prefix: string | null) => string[] = () => [];

    constructor(private citiesFilePath: string) {
        this.loadCities();
    }

    private loadCities(): void {
        const data = fs.readFileSync(this.citiesFilePath, 'utf-8');
        this.cities = JSON.parse(data);
        this.autoComplete = createAutoComplete(this.cities);

        const stats = fs.statSync(this.citiesFilePath);
        this.lastModified = stats.mtime.toUTCString();
    }

    public getSuggestions(prefix: string | null): string[] {
        return this.autoComplete(prefix);
    }

    public getLastModified(): string {
        return this.lastModified;
    }
}
