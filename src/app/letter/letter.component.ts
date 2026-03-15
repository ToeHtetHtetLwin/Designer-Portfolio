import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

gsap.registerPlugin(TextPlugin);

@Component({
  selector: 'app-letter',
  standalone: true,
  imports: [CommonModule, ButtonModule, DialogModule],
  templateUrl: './letter.component.html',
  styleUrl: './letter.component.css',
})
export class LetterComponent implements AfterViewInit {
  showMessage: boolean = false;
  showButton: boolean = false;
  videoUrl: SafeResourceUrl;

  // ဆွဲဆောင်မှုရှိတဲ့ Bright Icons များ
  floatingElements = ['✨', '💖', '🌸', '🔮', '🎈', '💜'];

  constructor(private sanitizer: DomSanitizer) {
    
    const videoId = 'HnGs62NueDA'; 
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}?autoplay=1`
    );
  }

  ngAfterViewInit() {
    this.startSequence();
  }

  startSequence() {
    const tl = gsap.timeline();
    tl.to('#main-typewriter', {
      duration: 3,
      text: 'For my dearest, I have a secret to share...',
      ease: 'power2.out',
    });
    this.animateBackground();
  }

  openSpecialDialog() {
    this.showMessage = true;
    setTimeout(() => {
      gsap.to('#dialog-typewriter', {
        duration: 8,
        text: `"နာကျင်မှုလှလှက​လေးကိုထုတ်ကြည့်မိတာကလွဲ လို့ ကျန်တဲ့အ​ကြောင်းပြချက်မရှိပါဘူး။ သံသရာတစ်​ကွေ့မှာပြန်ဆုံဖြစ်မယ်ဆိုရင်​တော့ ငါ့​နေရာမှာ မင်းကို ​နေ​စေချင်တယ်။" 💌✨`,
        ease: 'none',
      });
    }, 500);
  }

  animateBackground() {
    gsap.utils.toArray<HTMLElement>('.floating-item').forEach((item) => {
      gsap.set(item, {
        x: gsap.utils.random(0, window.innerWidth),
        y: window.innerHeight + 100,
        color: gsap.utils.random(['#ff71ce', '#b967ff', '#01cdfe', '#05ffa1', '#fffb96']) // Neon colors
      });
      gsap.to(item, {
        y: -200,
        x: '+=100',
        duration: gsap.utils.random(10, 20),
        repeat: -1,
        ease: 'sine.inOut'
      });
    });
  }

  showActionButton(): void {
    this.showButton = true;
    gsap.to('.bottle-container', { scale: 0.9, duration: 0.2, yoyo: true, repeat: 1 });
  }
}