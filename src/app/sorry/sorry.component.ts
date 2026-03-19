import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sorry',
  standalone: true, // Angular version သစ်တွေမှာ သုံးဖို့ standalone ဖြစ်အောင် ပြင်ပေးထားပါတယ်
  imports: [CommonModule],
  templateUrl: './sorry.component.html',
  styleUrl: './sorry.component.css'
})
export class SorryComponent implements OnInit {
  joke: string = "";

  jokes: string[] = [
    "စိတ်မ​ကောင်းပါဘူး လိုချင်ရင်လာ၀ယ်ပါ မုန့်ကျ၀ယ်စား​နေပြီး​တော့",
    "ဒီနေရာက ခင်ဗျားအိမ်မဟုတ်ဘူးလေ၊ ပြန်ထွက်သွားပါဦး။ 😂",
    "ဟတ်ကာကြီး လုပ်မလို့လား? ခဏနေဦး.. ထမင်းစားလိုက်ဦးမယ်။",
   
  ];

  ngOnInit() {
    // လူဝင်လာတိုင်း joke တစ်ခုကို random ပြပေးဖို့
    const randomIndex = Math.floor(Math.random() * this.jokes.length);
    this.joke = this.jokes[randomIndex];
  }
}