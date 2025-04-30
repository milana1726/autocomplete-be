import fs from 'fs';
import { createAutoComplete } from '../../auto-complete/';

export class LoadCities {
    private cities: string[] = [];
    private autoComplete: (prefix: string | null) => string[] = () => [];

    constructor(private citiesFilePath: string) {
        this.loadCities();
    }

    private loadCities(): void {
        const data = fs.readFileSync(this.citiesFilePath, 'utf-8');
        this.cities = JSON.parse(data);
        this.autoComplete = createAutoComplete(this.cities);
    }

    public getSuggestions(prefix: string | null): string[] {
        return this.autoComplete(prefix);
    }
}
