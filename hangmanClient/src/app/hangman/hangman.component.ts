import { Component, OnInit } from '@angular/core';
import { HangmanService } from '../services/hangman.service';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';

const oportunities = 5;

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.sass']
})
export class HangmanComponent implements OnInit {
  word: Array<string> = [];
  hiddenWord: Array<string> = [];
  userInput: Array<string> = [];
  history: Array<any> = [];

  constructor(private _hangmanServices: HangmanService,
    private _router: Router) { }

  ngOnInit() {
    const u = localStorage.getItem('user');
    if (!u) this._router.navigate(['/login']);
    this.fetchNewWord();
    this.fetchGameHistory();
  }

  fetchNewWord() {
    this._hangmanServices.fetchNewWord().subscribe((word:any) => {
      console.log(word);
      this.word = word.random_word.toUpperCase().split("");
      this.hiddenWord = this.word.map(x => '');
      this.userInput = [];
    });
  }

  fetchGameHistory() {
    this._hangmanServices.fetchGameHistory("daniel").subscribe((history:any) => {
      this.history = history;
    });
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(ev: KeyboardEvent) {
    const key = ev.key.toUpperCase();
    let found = false;
    for(let i = 0; i < this.word.length; i += 1) {
        if (this.word[i].toUpperCase() === key) {
          this.hiddenWord[i] = key;
          found = true;
        }
    }
    if (!found) { this.userInput.push(key) }
    this.checkGame();
  }

  formatDate(date) {
    const dateTime = date.split('T');
    const d = dateTime[0].split('-');
    const t = dateTime[1].substring(0, 8);
    return `${d[2]}/${d[1]}/${d[0]} ${t}`;
  }

  checkGame() {
    if (this.userInput.length === oportunities) {
      confirm('Lo sentimos, has perdido!');
      this.finishGame(false);
    }

    if (this.hiddenWord.indexOf('') === -1) {
      confirm('Felicitaciones, Ganaste!');
      this.finishGame(true);
    }
  }

  finishGame(won) {
    this._hangmanServices.finishGame({ user: 'daniel', date: new Date(Date.now()), won }).subscribe((res:any) => {
      this.fetchNewWord();
      this.fetchGameHistory();
    });
  }

  logout() {
    localStorage.removeItem('user');
    this._router.navigate(['/login']);
  }
}
