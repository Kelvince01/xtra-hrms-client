import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {ICity, ICountry, ICounty} from '@models/common.model';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  http = inject(HttpClient);

  // Method to get all countries
  getCountries(): Observable<ICountry[]> {
    //You can call your custom apis here
    //I am using static data for demo
    return this.http.get<ICountry[]>('./assets/data/countries.json');
  }

  // Method to get states by country name
  getCountiesByCountry(country: ICountry): Observable<ICounty[]> {
    //You can call your custom apis here
    //I am using static data for demo
    return this.http.get<ICounty[]>('./assets/data/counties.json').pipe(
      map((counties) =>
        //Filtering due to passed static data
        counties.filter((county) => county.country_id === country.id),
      ),
    );
  }

  // Method to get cities by state name
  getCitiesByCounty(county: ICounty): Observable<ICity[]> {
    //You can call your custom apis here
    return this.http.get<ICity[]>('/assets/json/cities.json').pipe(
      map((cities) =>
        //Filtering due to passed static data
        cities.filter((city) => city.county_id === county.id),
      ),
    );
  }
}
