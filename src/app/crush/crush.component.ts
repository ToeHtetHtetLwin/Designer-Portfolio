import { Component, AfterViewInit, ElementRef, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

// Plugin ကို Register လုပ်မယ်
gsap.registerPlugin(TextPlugin);

@Component({
  selector: 'app-crush',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crush.component.html',
  styleUrls: ['./crush.component.css']
})
export class CrushComponent implements AfterViewInit {
  @ViewChild('heartPath') heartPath!: ElementRef<SVGPathElement>;
  @ViewChild('particleContainer') particleContainer!: ElementRef<HTMLDivElement>;

  lyrics: string[] = [
    "မင်းနဲ့ဆုံတဲ့ အချိန်တိုင်းဟာ...",
    "ကမ္ဘာကြီးတစ်ခုလုံး ရပ်တန့်သွားသလိုပဲ။",
    "ဒီရင်ခုန်သံတွေက မင်းအတွက်ပါပဲ ချစ်သူ။",
    "ထာဝရလက်တွဲသွားကြမယ်နော်။ ❤️"
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    // Browser side မှာပဲ run အောင် စစ်ဆေးမယ် (SSR error ကာကွယ်ရန်)
    if (isPlatformBrowser(this.platformId)) {
      this.initRomanticScene();
    }
  }

  initRomanticScene() {
    // --- ၁။ အသည်းပုံ ဆွဲမည့် Animation ---
    const path = this.heartPath.nativeElement;
    const pathLength = path.getTotalLength();

    // အစမှာ ဖျောက်ထားမယ်
    gsap.set(path, { 
      strokeDasharray: pathLength, 
      strokeDashoffset: pathLength 
    });

    // မျဉ်းဆွဲသွားမည့် animation
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 5,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true
    });

    // --- ၂။ Lyrics Typing Animation (Error-Free Version) ---
    const lyricsTl = gsap.timeline({ repeat: -1 });

    this.lyrics.forEach((line) => {
      lyricsTl
        .to("#lyrics-display", {
          duration: 2.5,
          text: line,
          ease: "none",
          delay: 0.5
        })
        .to("#lyrics-display", {
          opacity: 0,
          duration: 1,
          delay: 2
        })
        // onComplete သုံးမည့်အစား .set() ကို သုံးခြင်းဖြင့် Type error ကို ကျော်ဖြတ်မယ်
        .set("#lyrics-display", { text: "", opacity: 1 });
    });

    // --- ၃။ Background Particles ထည့်မယ် ---
    this.createParticles();
  }

  createParticles() {
    const container = this.particleContainer.nativeElement;
    const icons = ['❤️', '💖', '✨', '💕', '🌸'];

    for (let i = 0; i < 40; i++) {
      const el = document.createElement('div');
      el.innerText = icons[Math.floor(Math.random() * icons.length)];
      el.className = 'absolute pointer-events-none opacity-0';
      el.style.fontSize = (Math.random() * 20 + 10) + 'px';
      container.appendChild(el);

      // Random နေရာ သတ်မှတ်မယ်
      gsap.set(el, {
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 50
      });

      // အပေါ်ကို လွင့်တက်သွားမည့် animation
      gsap.to(el, {
        y: -100,
        x: "+=" + (Math.random() * 200 - 100),
        opacity: Math.random() * 0.5 + 0.2,
        duration: Math.random() * 10 + 8,
        repeat: -1,
        delay: Math.random() * 10,
        ease: "none"
      });
    }
  }
}