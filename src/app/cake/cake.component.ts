// import { Component, AfterViewInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ButtonModule } from 'primeng/button';
// import { DialogModule } from 'primeng/dialog';
// import { gsap } from 'gsap';
// import { TextPlugin } from 'gsap/TextPlugin';
// // @ts-ignore
// import confetti from 'canvas-confetti';

// gsap.registerPlugin(TextPlugin);

// @Component({
//   selector: 'app-cake',
//   standalone: true,
//   imports: [CommonModule, ButtonModule, DialogModule],
//   templateUrl: './cake.component.html',
//   styleUrls: ['./cake.component.css'],
// })
// export class CakeComponent implements AfterViewInit {
//   showMessage: boolean = false;
//   floatingElements = ['🎈', '❤️', '✨', '🌸', '💖'];
//   fruits = ['🍓', '🍒', '🫐', '🍓', '🍇'];

//   ngAfterViewInit() {
//     this.startSequence();
//   }

//   startSequence() {
//     const tl = gsap.timeline();

//     // 1. Header Typewriter
//     tl.to('#main-typewriter', {
//       duration: 2.5,
//       text: 'A special day for a special person...',
//       ease: 'none',
//     });

//     // 2. Cake Animates In (Scale 0 ကနေ ပွင့်လာမယ်)
//     tl.from(
//       '.cake-container',
//       {
//         scale: 0,
//         opacity: 0,
//         duration: 1.2,
//         ease: 'back.out(1.7)',
//       },
//       '-=1',
//     );

//     // 3. Fruits Animates In (အပေါ်ကနေ တစ်လုံးချင်း ဖြည်းဖြည်းကျလာမယ်)
//     tl.from(
//       '.topping',
//       {
//         y: -600,
//         rotation: 180,
//         opacity: 0,
//         duration: 4,
//         stagger: 0.8,
//         ease: 'power2.out',
//       },
//       '-=0.5',
//     );

//     // 4. Show Button (Fade In)
//     tl.to('#action-btn', {
//       opacity: 1,
//       y: -10,
//       duration: 0.8,
//     });

//     this.animateBackground();
//   }

//   openSpecialDialog() {
//     this.showMessage = true;
//     setTimeout(() => {
//       gsap.to('#dialog-typewriter', {
//         duration: 6,
//         text: 'မွေးနေ့မှာ အရာရာတိုင်း အဆင်ပြေပါစေ။ မင်းနဲ့ ဆုံတွေ့ရတာ ငါ့ဘဝရဲ့ အကောင်းဆုံး ဆုလာဘ်တစ်ခုပါ။ အများကြီး ချစ်တယ်နော်..❤️',
//         ease: 'none',
//       });
//     }, 500);
//   }

//   popFruit(event: MouseEvent, index: number) {
//     const id = `#fruit-${index}`;
//     gsap.to(id, { scale: 1.8, opacity: 0, duration: 0.3 });
//     confetti({
//       particleCount: 40,
//       spread: 50,
//       origin: {
//         x: event.clientX / window.innerWidth,
//         y: event.clientY / window.innerHeight,
//       },
//     });
//   }

//   animateBackground() {
//     gsap.utils.toArray<HTMLElement>('.floating-item').forEach((item) => {
//       gsap.set(item, {
//         x: gsap.utils.random(0, window.innerWidth),
//         y: window.innerHeight + 50,
//       });
//       gsap.to(item, {
//         y: -100,
//         duration: gsap.utils.random(10, 20),
//         repeat: -1,
//         ease: 'none',
//       });
//     });
//   }
// }
