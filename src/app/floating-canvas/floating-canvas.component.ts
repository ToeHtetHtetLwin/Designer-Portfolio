import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Password input အတွက် လိုအပ်သည်
import { gsap } from 'gsap';

@Component({
  selector: 'app-floating-canvas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './floating-canvas.component.html',
  styleUrl: './floating-canvas.component.css',
})
export class FloatingCanvasComponent implements AfterViewInit {
  @ViewChild('particleContainer')
  particleContainer!: ElementRef<HTMLDivElement>;
  @ViewChildren('floatingItem') floatingItems!: QueryList<ElementRef>;

  // Data များ
  photos = [
    'https://cdn.vectorstock.com/i/1000v/27/17/cartoon-young-couple-of-girl-and-boy-in-love-vector-54522717.jpg',
    'https://i.pinimg.com/474x/df/43/40/df4340128e467697f5f1aaafe3b15f28.jpg',
    'https://i.pinimg.com/736x/20/93/92/20939295f347eb948bc058088e29b5ea.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRACqoq0K_surjPEVgNrH1tWNcbGuMFlVrzQg&s',
    'https://i.pinimg.com/236x/ed/91/78/ed917899e62451bf42a1b6ed1f22e7fc.jpg',
    'https://i.pinimg.com/736x/24/21/6b/24216b2c902278740b897242f601092b.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgTFbfRo6TctsNMn0hrfuGBwthZOjVdJ5feA&s',
   
  ];
  messages = [
    'Hello!',
    'Be Happy',
    'Keep Shining',
    'Stay Positive',
    'Love Life',
    'I Love You',
    'You are my World',
    'Babe',
    'miss u'
  ];
  emojis = ['🌸', '✨', '💖', '🍀', '🌟', '🌈', '💫'];

  // Password ထိန်းချုပ်မှု
  isUnlocked = false;
  passwordInput = '';
  correctPassword = '123';

  private trailDots: HTMLDivElement[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit() {}

  checkPassword() {
    if (this.passwordInput === this.correctPassword) {
      this.isUnlocked = true;
      // DOM ပေါ်လာပြီးနောက် Animation စတင်ရန်
      setTimeout(() => {
        this.initFloatingElements();
        this.initFallingPetals();
     
      }, 100);
    } else {
      alert('Wrong Password! Try 123');
    }
  }

initFloatingElements() {
    this.floatingItems.forEach((item) => {
      const el = item.nativeElement;
      // Duration ကို တိုးလိုက်ခြင်းဖြင့် ပိုနှေးကွေးသွားပါမယ်
      const randomDuration = 20 + Math.random() * 10; 
      
      gsap.set(el, { x: `${Math.random() * 80 + 5}vw`, y: '110vh', scale: 0.8 + Math.random() * 0.2 });

      gsap.to(el, {
        y: '-20vh',
        duration: randomDuration,
        repeat: -1,
        ease: 'sine.inOut', // 'none' ထက် ပိုပြီး ပျော့ပျောင်းတဲ့ လှုပ်ရှားမှုကို ရစေပါတယ်
        delay: Math.random() * 15,
        modifiers: { 
          // x ရွေ့လျားမှုကိုလည်း ပိုနှေးအောင် လုပ်ထားပါတယ်
          x: (x) => `${parseFloat(x) + Math.sin(parseFloat(x) / 100) * 20}px` 
        }
      });
    });
  }
  initFallingPetals() {
    for (let i = 0; i < 15; i++) {
      const petal = document.createElement('div');
      petal.className =
        'absolute w-3 h-3 bg-pink-300 rounded-full blur-[1px] opacity-30';
      this.particleContainer.nativeElement.appendChild(petal);
      const animatePetal = () => {
        gsap.set(petal, { x: Math.random() * window.innerWidth, y: -20 });
        gsap.to(petal, {
          y: window.innerHeight + 20,
          rotation: 360,
          duration: 8 + Math.random() * 7,
          ease: 'none',
          onComplete: animatePetal,
        });
      };
      animatePetal();
    }
  }

  
}
