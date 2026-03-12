import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

gsap.registerPlugin(TextPlugin);

@Component({
  selector: 'app-love',
  standalone: true,
  imports: [CommonModule, ButtonModule, DialogModule],
  templateUrl: './love.component.html',
  styleUrl: './love.component.css',
})
export class LoveComponent implements AfterViewInit {

  safeVideoUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/JISlh7et1w4'
    );
  }

  displayDialog = false;
  step = 1;

  notes = [
    { text: 'ငါ တကယ်တောင်းပန်ပါတယ်...', color: '#fff9c4' },
    { text: 'နင်စိတ်ဆိုးနေရင် ငါ့မှာ နေမထိထိုင်မသာဖြစ်လို့ပါ', color: '#ffd1dc' },
    { text: 'ပြန်ချစ်ကြရအောင်နော် ❤️', color: '#d1e9ff' },
  ];

  @ViewChild('noBtn') noBtn!: ElementRef;

  ngAfterViewInit() {

    gsap.from('.note-card', {
      duration: 1.2,
      opacity: 0,
      y: 80,
      scale: 0.8,
      rotation: -5,
      stagger: 0.25,
      ease: 'back.out(1.7)',
    });

    this.startHearts();
  }

  moveButton() {
    const x = Math.random() * (window.innerWidth - 200);
    const y = Math.random() * (window.innerHeight - 120);

    gsap.to(this.noBtn.nativeElement, {
      duration: 0.3,
      left: x + 'px',
      top: y + 'px',
      position: 'fixed',
    });
  }

  openDialog() {
    this.displayDialog = true;
    this.step = 1;

    setTimeout(() => {
      gsap.to('.typewriter-text', {
        duration: 6,
        text:
          'ချစ်လေးရေ... ငါ တကယ်တောင်းပန်ပါတယ်။ နင့်ကို စိတ်ဆိုးအောင် လုပ်မိတဲ့အတွက် ငါ့စိတ်ထဲမှာလည်း အရမ်းနာတယ်။ နင်မရှိဘဲ ငါ့ကမ္ဘာကြီးက အရောင်မရှိသလိုပဲ။ ငါ့ကို ခွင့်လွှတ်ပေးပါနော်။ နင့်ကို အရမ်းချစ်တယ် ❤️',
      });
    }, 500);
  }

  showVideo() {
    this.step = 2;

    setTimeout(() => {
      this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://www.youtube.com/embed/JISlh7et1w4?autoplay=1'
      );
    }, 200);
  }

  startHearts() {

    const container = document.querySelector('.heart-container');

    setInterval(() => {

      const heart = document.createElement('div');

      heart.classList.add('heart');

      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.animationDuration = 3 + Math.random() * 3 + 's';

      container?.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 6000);

    }, 500);

  }

}