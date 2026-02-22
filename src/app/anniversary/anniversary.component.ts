import {
  Component,
  AfterViewInit,
  ElementRef,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-anniversary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './anniversary.component.html',
  styleUrls: ['./anniversary.component.css'],
})
export class AnniversaryComponent implements AfterViewInit {
  private el = inject(ElementRef);

  stories = signal([
    {
      title: 'The Beginning',
      text: 'မင်းနဲ့စတွေ့တဲ့နေ့က ကမ္ဘာကြီးတစ်ခုလုံး ရပ်တန့်သွားသလိုပဲ။',
      date: '12 May 2024',
    },
    {
      title: 'First Date',
      text: 'အတူတူ ကော်ဖီသောက်ရင်း ရယ်မောခဲ့ကြတဲ့ အချိန်တွေ...',
      date: '20 June 2024',
    },
    {
      title: 'Forever Us',
      text: 'ဘယ်လိုအခက်အခဲပဲရှိရှိ မင်းလက်ကို အမြဲမြဲမြံစွာ ဆုပ်ကိုင်ထားမယ်။',
      date: 'Today',
    },
    {
      title: 'My Number One',
      text: 'မင်းကငါ့အတွက် ပထမဆုံး ​သော အရာပါ,မင်းမရှိပဲ ရှင်သန်နိုင်မယ်မထင်ဘူး',
      date: 'Today',
    },
    {
      title: 'The most beautiful creature',
      text: 'လောကမှာ အလှဆုံးအရာ​တွေဆိုတာမင်းကို ရူံးနိမ့်ပြီးသားပါ',
      date: 'Today',
    },
  ]);

  photos = signal([
    'https://ourmomento.sg/wp-content/uploads/2023/08/korean-couple-photoshoot-outdoor-singapore-photography-services-korea-style-by-our-momento-2.jpeg',
    'https://images.stockcake.com/public/2/c/9/2c93c307-d9c6-49b8-b498-8c9ed97f343d_large/cozy-coffee-date-stockcake.jpg',
    'https://images.unsplash.com/photo-1564020435666-f67ed5319a32?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cGxlJTIwaG9sZGluZyUyMGhhbmR8ZW58MHx8MHx8fDA%3D',
    'https://images.stockcake.com/public/0/c/6/0c66db9c-7066-496b-9c1b-9daa65d7e01f_large/silhouette-love-moment-stockcake.jpg',
    'https://images.stockcake.com/public/c/3/7/c37ac26c-4083-4e3f-94ad-b6bc7a886fca_large/romantic-sunset-embrace-stockcake.jpg',
  ]);

  ngAfterViewInit() {
    this.setupAnimations();
    this.createHearts();
  }

  setupAnimations() {
    const ctx = gsap.context(() => {
      gsap.from('.hero-content', {
        y: 100,
        opacity: 0,
        duration: 2,
        ease: 'power4.out',
      });

      gsap.utils.toArray('.photo-card').forEach((card: any, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top bottom-=100' },
          y: 50,
          opacity: 0,
          rotation: i % 2 === 0 ? -5 : 5,
          duration: 1.5,
        });
      });
    }, this.el.nativeElement);
  }

  createHearts() {
    setInterval(() => {
      const heart = document.createElement('div');
      heart.innerHTML = '❤️';
      heart.className = 'fixed text-pink-500/50 pointer-events-none z-50';
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.top = '-20px';
      document.body.appendChild(heart);
      gsap.to(heart, {
        y: window.innerHeight + 50,
        x: (Math.random() - 0.5) * 200,
        rotation: 360,
        duration: Math.random() * 3 + 4,
        ease: 'none',
        onComplete: () => heart.remove(),
      });
    }, 500);
  }
}
