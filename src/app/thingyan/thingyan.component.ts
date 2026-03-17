import { CommonModule } from '@angular/common';
import { Component, signal, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

@Component({
  selector: 'app-thingyan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './thingyan.component.html',
  styleUrl: './thingyan.component.css'
})
export class ThingyanComponent implements AfterViewInit {
  missLevel = signal(99);
  isSplashing = signal(false);
  isCardVisible = signal(false);
  isMusicPlaying = false;
  
  videoUrl: SafeResourceUrl;
  wishText = "အဝေးမှာရှိပေမယ့် ရေစက်တွေကတစ်ဆင့် ဆုတောင်းပေးလိုက်တယ်နော်...ကိုယ်တို့​ဝေး​နေ​ပေမယ့် မင်းကို ပထမဆုံး​ရေ​လောင်းခွင့်ရတဲ့သူဟာကိုပဲဖြစ်ချင်တယ်🩷";
  flowers = new Array(40).fill(0);

  // Audio Objects ကို Global အနေနဲ့ ကြေညာထားပါ
  bgMusic = new Audio('assets/thingyan-song.mp3');
  splashSound = new Audio('assets/splash-sound.mp3');

  constructor(private sanitizer: DomSanitizer) {
    const videoId = 'K2FAoUg_Q3E'; // သင်သုံးချင်တဲ့ Video ID ထည့်ပါ
    
    // Autoplay ဖြစ်ဖို့အတွက် mute=0 နဲ့ playlist parameter ထည့်ပေးရပါတယ်
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&loop=1&playlist=${videoId}&enablejsapi=1`
    );
  }

  ngAfterViewInit() {
    this.startFlowerFlow();
  }

  startFlowerFlow() {
    gsap.to('.flower', {
      y: '110vh',
      x: 'random(-150, 150)',
      rotation: 'random(0, 360)',
      duration: 'random(3, 7)',
      repeat: -1,
      ease: 'none',
      stagger: { amount: 5, from: 'random' }
    });
  }

  onPotClick() {
    // ၁။ နှိပ်လိုက်တာနဲ့ Splash Sound ကို ချက်ချင်းဖွင့်ပါ (ဒါက Audio ကို Unlock လုပ်တာပါ)
    this.splashSound.play().catch(e => console.log("Splash audio error"));

    // ၂။ Splash GIF ပြမယ်
    this.isSplashing.set(true);

    // ၃။ GIF ပြနေတုန်းမှာ Background Music ကို အသံတိုးတိုးလေးနဲ့ စဖွင့်ထားပါမယ်
    if (!this.isMusicPlaying) {
      this.bgMusic.volume = 0.5;
      this.bgMusic.loop = true;
      this.bgMusic.play().catch(e => console.log("BG Music error"));
      this.isMusicPlaying = true;
    }

    // ၄။ ၃ စက္ကန့်ကြာရင် Card ပေါ်လာပြီး Video Autoplay ဖြစ်ပါလိမ့်မယ်
    setTimeout(() => {
      this.isSplashing.set(false);
      this.isCardVisible.set(true);

      setTimeout(() => {
        gsap.fromTo('.message-box', 
          { y: 50, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 1.2, ease: 'back.out' }
        );

        gsap.to('.typewriter-text', {
          duration: 4,
          text: this.wishText,
          ease: "none"
        });
      }, 100);
    }, 3000);
  }
}