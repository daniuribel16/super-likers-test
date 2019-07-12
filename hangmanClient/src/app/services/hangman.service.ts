import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HangmanService {

  constructor(private _http: HttpClient) { }

  fetchNewWord() {
    return this._http.get('http://localhost:3000/words').pipe(map(r => r));
  }

  fetchGameHistory(userId) {
    return this._http.get(`http://localhost:3000/game_histories/${userId}`).pipe(map(r => r));
  }

  finishGame(game) {
    return this._http.post('http://localhost:3000/game_histories', game).pipe(map(r => r));
  }
}
