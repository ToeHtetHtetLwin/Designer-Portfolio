import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { CarouselModule } from 'primeng/carousel';
import { gsap } from 'gsap';

interface LoveCoupon {
  id: number;
  title: string;
  emoji: string;
  description: string;
  isRedeemed: boolean;
}

@Component({
  selector: 'app-happbirthday',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule, TimelineModule, CarouselModule],
  templateUrl: './happbirthday.component.html',
  styleUrls: ['./happbirthday.component.css']
})
export class HappbirthdayComponent implements AfterViewInit {
  showSurprise = false;
  isCandleLit = true;
  cakeBlown = false;

 photos = [
    { image: 'https://i.pinimg.com/736x/ac/9f/94/ac9f94105737d1cb751fedf943c837ee.jpg', caption: 'Your Beautiful Smile' },
    { image: 'https://wallpapers.com/images/hd/korean-couple-on-yellow-flower-field-ma8t17s2xvdmnnqq.jpg', caption: 'Our Best Memories' },
    { image: 'https://i.pinimg.com/736x/51/f9/ee/51f9ee5c108ff0efc3409b54dc5ca61b.jpg', caption: 'Together Forever' }
  ];

  events = [
    { status: 'First Met', date: 'Oct 2023', icon: 'pi pi-heart-fill', color: '#FF6464', desc: 'The day my life found its meaning.' },
    { status: 'First Date', date: 'Nov 2023', icon: 'pi pi-star-fill', color: '#FFD700', desc: 'I knew then, you were the one.' },
    { status: 'Official', date: 'Jan 2024', icon: 'pi pi-check-circle', color: '#4CAF50', desc: 'The start of our forever.' }
  ];

  coupons: LoveCoupon[] = [
    { id: 1, title: 'Free Hug', emoji: '🤗', description: 'Unlimited tight hugs for the whole day!', isRedeemed: false },
    { id: 2, title: 'Dinner Date', emoji: '🍝', description: 'A romantic dinner at your favorite place.', isRedeemed: false },
    { id: 3, title: 'One Whole Day', emoji: '🎡', description: '24 hours of my undivided attention.', isRedeemed: false },
    { id: 4, title: 'Movie Night', emoji: '🎬', description: 'You pick the movie, I bring the popcorn.', isRedeemed: false }
  ];

  ngAfterViewInit() {
    gsap.from('.hero-content', { opacity: 0, scale: 0.8, duration: 1.5, ease: 'back.out' });
  }

  revealSurprise() {
    this.showSurprise = true;
    setTimeout(() => {
      gsap.from('.reveal-item', { y: 100, opacity: 0, stagger: 0.3, duration: 1.2, ease: 'power4.out' });
      this.createFlowers();
      this.createSparkles();
    }, 100);
  }

  blowCandle() {
    this.isCandleLit = false;
    this.cakeBlown = true;
    this.createFireworks();
    
    // Wish Text Animation
    setTimeout(() => {
      gsap.from('.wish-card', { scale: 0, opacity: 0, duration: 1, ease: 'back.out(1.7)' });
      gsap.from('.wish-card p', { opacity: 0, y: 20, stagger: 0.3, duration: 1 });
    }, 100);
  }

  createFlowers() {
    const flowers = ['🌸', '🌹', '🌷', '🌼'];
    for (let i = 0; i < 40; i++) {
      const f = document.createElement('div');
      f.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
      f.className = 'fixed text-2xl z-0 pointer-events-none';
      f.style.left = Math.random() * 100 + 'vw';
      f.style.top = '-50px';
      document.body.appendChild(f);
      gsap.to(f, {
        y: window.innerHeight + 100,
        x: `+=${Math.random() * 200 - 100}`,
        rotation: 720,
        duration: 6 + Math.random() * 4,
        delay: Math.random() * 5,
        onComplete: () => f.remove()
      });
    }
  }

  createSparkles() {
    setInterval(() => {
      if (!this.showSurprise) return;
      const s = document.createElement('div');
      s.innerHTML = '✨';
      s.className = 'fixed text-yellow-300 z-50 pointer-events-none';
      s.style.left = Math.random() * 100 + 'vw';
      s.style.top = Math.random() * 100 + 'vh';
      document.body.appendChild(s);
      gsap.to(s, { scale: 2, opacity: 0, duration: 1.5, onComplete: () => s.remove() });
    }, 400);
  }

  createFireworks() {
    for (let i = 0; i < 20; i++) {
      const fw = document.createElement('div');
      fw.innerHTML = '🎈';
      fw.className = 'fixed text-5xl z-50 pointer-events-none';
      fw.style.left = Math.random() * 100 + 'vw';
      fw.style.top = Math.random() * 100 + 'vh';
      document.body.appendChild(fw);
      gsap.fromTo(fw, { scale: 0, opacity: 1 }, { scale: 4, opacity: 0, duration: 1, onComplete: () => fw.remove() });
    }
  }

  redeemCoupon(event: any, coupon: LoveCoupon) {
    if (coupon.isRedeemed) return;
    coupon.isRedeemed = true;
    gsap.to(event.currentTarget, { rotationY: 360, scale: 0.9, duration: 0.8 });
  }
}