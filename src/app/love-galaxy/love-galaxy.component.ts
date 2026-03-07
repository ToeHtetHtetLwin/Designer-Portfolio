import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, HostListener } from '@angular/core';
@Component({
  selector: 'app-love-galaxy',
  imports: [],
  templateUrl: './love-galaxy.component.html',
  styleUrl: './love-galaxy.component.css'
})
export class LoveGalaxyComponent {
@ViewChild('galaxyCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D;
  private particles: any[] = [];
  private numParticles = 1500;
  private centerX = 0;
  private centerY = 0;

  ngAfterViewInit() {
    this.initCanvas();
    this.createParticles();
    this.animate();
  }

  private initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
  }

  @HostListener('window:resize')
  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.centerX = canvas.width / 2;
    this.centerY = canvas.height / 2;
  }

  private createParticles() {
    this.particles = [];
    for (let i = 0; i < this.numParticles; i++) {
      // Galaxy ဝဲဂယက် ပုံစံ တွက်ချက်ခြင်း
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * Math.min(window.innerWidth, window.innerHeight) * 0.4;
      const speed = 0.002 + Math.random() * 0.005;
      const size = 0.5 + Math.random() * 2;
      
      // အရောင် (Pink, Purple, White စပ်ထားမယ်)
      const colors = ['#ff0080', '#ff85a2', '#9b5de5', '#ffffff'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      this.particles.push({
        angle,
        radius,
        speed,
        size,
        color,
        // 3D လို ပေါ်အောင် ရှေ့တိုးနောက်ငင် အတွက်
        z: Math.random() * 2
      });
    }
  }

  private animate() {
    // Background ကို နည်းနည်းစီ ဖျက်ပြီး Trail (အမြီး) ကျန်အောင် လုပ်မယ်
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    this.ctx.fillRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

    this.particles.forEach(p => {
      p.angle += p.speed;

      // 3D Perspective တွက်ချက်ခြင်း
      const cos = Math.cos(p.angle);
      const sin = Math.sin(p.angle);
      
      // ပတ်ချာလည် ဝဲနေမယ့် နေရာ (X, Y)
      const x = this.centerX + cos * p.radius;
      const y = this.centerY + sin * p.radius * 0.4; // 0.4 က ဝဲဂယက်ကို ပြားပြားလေး ဖြစ်စေတယ်

      // နှလုံးသားပုံစံ အစက်ကလေးတွေ ဆွဲမယ်
      this.drawHeart(x, y, p.size * (sin + 1.5), p.color);
    });

    requestAnimationFrame(() => this.animate());
  }

  // အစက်ကလေးတွေကို နှလုံးသားပုံ ဖြစ်အောင် ဆွဲတဲ့ function
  private drawHeart(x: number, y: number, size: number, color: string) {
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    // ရိုးရိုး အစက်လေးတွေထက် နှလုံးသားပုံ ဖြစ်အောင် ရေးလို့ရပေမဲ့ 
    // Performance အတွက် Glow ပါတဲ့ အစက်လေးတွေက ပိုလှပါတယ်
    const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, size);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, 'transparent');
    this.ctx.fillStyle = gradient;
    this.ctx.arc(x, y, size, 0, Math.PI * 2);
    this.ctx.fill();
  }
}
