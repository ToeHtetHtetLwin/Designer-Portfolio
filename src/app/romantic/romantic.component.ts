import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-romantic',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, CardModule],
  templateUrl: './romantic.component.html',
  styleUrl: './romantic.component.css'
})
export class RomanticComponent {
  // 1. Password ပြောင်းလိုက်ပြီ
  readonly secretKey = 'ILOVEYOU'; 
  
  // 2. ပေါ်လာစေချင်တဲ့ Message
  readonly rawMessage = 'မင်းကို ကိုယ်အရမ်းချစ်တယ်ဆိုတာ သိလား? ❤️';
  
  userInput = signal('');
  isDecoded = signal(false);
  displayText = signal('');

  constructor() {
    this.generateGarbage();
  }

  generateGarbage() {
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    let garbage = '';
    for (let i = 0; i < this.rawMessage.length; i++) {
      garbage += symbols[Math.floor(Math.random() * symbols.length)];
    }
    this.displayText.set(garbage);
  }

  decode() {
    // Password ကို space တွေပါရင် ဖယ်ထုတ်ပြီး အကြီးစာလုံးနဲ့ စစ်မယ်
    if (this.userInput().trim().toUpperCase() === this.secretKey) {
      this.isDecoded.set(true);
      this.animateText();
    } else {
      alert('Wrong Password! Hint: I L _ _ _ Y _ _');
    }
  }

  animateText() {
    let currentIteration = 0;
    const interval = setInterval(() => {
      let nextText = this.rawMessage.split('')
        .map((char, index) => {
          if (index < currentIteration) return char;
          const randomSymbols = '!@#$%^&*';
          return randomSymbols[Math.floor(Math.random() * randomSymbols.length)];
        })
        .join('');
      
      this.displayText.set(nextText);
      currentIteration += 1 / 3;

      if (currentIteration >= this.rawMessage.length) {
        this.displayText.set(this.rawMessage);
        clearInterval(interval);
      }
    }, 50);
  }
}