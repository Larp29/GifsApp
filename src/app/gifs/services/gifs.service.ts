import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';


@Injectable({providedIn: 'root'})
export class GifsService {

    public gifList: Gif[] = [];

    private _tagsHistory:   string[] = [];
    private _apiKey:        string = '3gRnARxc9RCEWdCcMvTLMdd6gG4ErpqH';
    private _baseUrl:       string = 'https://api.giphy.com/v1/gifs';

    constructor( private _http: HttpClient ) {}

    get tagsHistory(): string[] {
        return [...this._tagsHistory];
    }

    searchTag(tag:string): void {
        if(tag.length === 0) return; 
        this.organizeHistory(tag);

        const params = new HttpParams()
        .set('api_key', this._apiKey)
        .set('q', tag)
        .set('limit', '10');

        this._http.get<SearchResponse>(`${this._baseUrl}/search`, { params })
        .subscribe( resp => {
            this.gifList = resp.data;
        });

    }

    private organizeHistory(tag:string):void{
        tag = tag.toLowerCase();
        if(this._tagsHistory.includes(tag)){
            this._tagsHistory = this._tagsHistory.filter((oldtag) => oldtag !== tag);
        }
        this._tagsHistory.unshift(tag);
        this._tagsHistory = this._tagsHistory.splice(0,10);
    }
    
}